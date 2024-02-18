'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { supabase } from '@/Clients/supabase/client';
import { useCheckoutAuth } from './CheckoutAuthContext';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

// Create context
const CheckoutContext = createContext();

// Safe storage operations
const safeGetStorage = (key, storage = 'local') => {
  try {
    const store = storage === 'local' ? localStorage : sessionStorage;
    const value = store.getItem(key);
    return value ? value : null;
  } catch (error) {
    return null;
  }
};

const safeParse = (str, defaultValue = null) => {
  try {
    return str ? JSON.parse(str) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

// Safe database operations
const safeSupabaseQuery = async (
  query,
  errorMessage = 'Database operation failed'
) => {
  try {
    const result = await query;
    return result;
  } catch (error) {
    return {
      data: null,
      error: { message: errorMessage, originalError: error },
    };
  }
};

// Provider Component
export const CheckoutProvider = ({ children }) => {
  // User state
  const [userProfile, setUserProfile] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Reference to current merchant
  const [currentMerchant, setCurrentMerchant] = useState(null);

  // Get pathname for merchant extraction
  const pathname = usePathname();

  // Extract merchant username from pathname - first segment after /
  const pathMerchantUsername = React.useMemo(() => {
    if (pathname) {
      const segments = pathname.split('/').filter(Boolean);
      return segments.length > 0 ? segments[0] : null;
    }
    return null;
  }, [pathname]);

  // Checkout flow state
  const [currentCheckoutStep, setCurrentCheckoutStep] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState(null);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [checkoutSession, setCheckoutSession] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);

  // Add the isCheckoutOpen state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Get authentication context
  const {
    isAuthenticated,
    userEmail,
    currentMerchant: authMerchant,
  } = useCheckoutAuth();

  // Get the effective user email from context or storage
  const getEffectiveUserEmail = () => {
    if (userEmail) return userEmail;

    // Try session storage first (most reliable for recent auth)
    const sessionEmail = safeGetStorage('checkout_user_email', 'session');
    if (sessionEmail) {
      return sessionEmail;
    }

    // Try localStorage pocketlink_user as fallback
    const userData = safeGetStorage('pocketlink_user');
    const parsed = safeParse(userData);
    if (parsed?.email) {
      // Store in session storage for future use
      try {
        sessionStorage.setItem('checkout_user_email', parsed.email);
      } catch (e) {
        // Ignore storage errors
      }
      return parsed.email;
    }

    return null;
  };

  // Direct database fetch for profile data
  const fetchProfileFromDB = React.useMemo(() => {
    return async (email) => {
      if (!email) {
        return null;
      }

      try {
        // Get user profile from database
        const { data, error } = await safeSupabaseQuery(
          supabase
            .from('user_profiles')
            .select('*')
            .eq('email', email)
            .single(),
          'Failed to fetch user profile'
        );

        // Handle the "no rows returned" error gracefully
        if (error) {
          // PGRST116 is the "no rows returned" error code
          if (error.code === 'PGRST116') {
            return null;
          }
          return null;
        }

        return data;
      } catch (error) {
        return null;
      }
    };
  }, []);

  // Load user profile from session, local storage, or database
  const loadUserProfile = React.useMemo(() => {
    return async () => {
      setIsLoadingProfile(true);

      try {
        // Get the user's email
        const email = getEffectiveUserEmail();

        if (!email) {
          setIsLoadingProfile(false);
          return null;
        }

        // Try to load from database
        const profile = await fetchProfileFromDB(email);

        if (profile) {
          // Update local state
          setUserProfile(profile);

          // Return the profile
          setIsLoadingProfile(false);
          return profile;
        } else {
          // Create a minimal profile if not found
          const minimalProfile = {
            email: email,
            created_at: new Date().toISOString(),
          };

          // Try to create the profile in the database
          try {
            console.log(
              `[CheckoutContext] Attempting to create user profile for:`,
              email
            );
            console.log(`[CheckoutContext] Profile data:`, minimalProfile);

            const { data: newProfile, error } = await safeSupabaseQuery(
              supabase
                .from('user_profiles')
                .upsert(minimalProfile)
                .select()
                .single(),
              'Failed to create user profile'
            );

            console.log(`[CheckoutContext] Profile creation result:`, {
              newProfile,
              error,
            });

            if (!error && newProfile) {
              console.log(
                `[CheckoutContext] Successfully created user profile:`,
                newProfile
              );
              setUserProfile(newProfile);
              setIsLoadingProfile(false);
              return newProfile;
            } else {
              console.error(
                `[CheckoutContext] Failed to create user profile:`,
                error
              );
            }
          } catch (e) {
            console.error(
              `[CheckoutContext] Exception creating user profile:`,
              e
            );
            // Continue with minimal profile on error
          }

          // If all else fails, just use the minimal profile in memory
          setUserProfile(minimalProfile);
          setIsLoadingProfile(false);
          return minimalProfile;
        }
      } catch (error) {
        setIsLoadingProfile(false);
        return null;
      }
    };
  }, [getEffectiveUserEmail, fetchProfileFromDB]);

  // Initialize or update merchant from auth context
  useEffect(() => {
    // Only update if authMerchant exists and is different from current merchant
    // Also check that the IDs are actually different to prevent unnecessary updates
    if (
      authMerchant &&
      (!currentMerchant ||
        (authMerchant.id !== currentMerchant.id &&
          authMerchant.username !== currentMerchant.username))
    ) {
      setCurrentMerchant(authMerchant);
    }
  }, [authMerchant, currentMerchant]);

  // Ensure store exists when merchant changes
  useEffect(() => {
    const setupMerchantStore = async () => {
      if (currentMerchant?.username) {
        console.log(
          '🏪 [MERCHANT_CHANGE] Ensuring store exists for new merchant:',
          currentMerchant.username
        );
        try {
          const store = await ensureStoreExists(currentMerchant.username);
          if (!store) {
            console.error(
              '❌ [MERCHANT_CHANGE] Failed to setup store for merchant:',
              currentMerchant.username
            );
          }
        } catch (error) {
          console.error(
            '💥 [MERCHANT_CHANGE] Error setting up merchant store:',
            error
          );
        }
      }
    };

    setupMerchantStore();
  }, [currentMerchant?.username]);

  // Effect to load user data when authenticated
  useEffect(() => {
    // Check for authentication status from cookie/local storage on mount
    const checkAuthStatus = async () => {
      const pocketlinkAuth = Cookies.get('pocketlink_auth');
      const userData = safeGetStorage('pocketlink_user');

      if (pocketlinkAuth && userData) {
        try {
          // Load profile, addresses and payment methods
          await loadUserProfile();
          await loadUserAddresses();
        } catch (err) {
          // Silent fail - don't block rendering on error
        }
      }
    };

    checkAuthStatus();
  }, []);

  // Listen for auth update events
  useEffect(() => {
    const handleAuthUpdate = (event) => {
      if (event.detail && event.detail.isAuthenticated) {
        // Clear existing checkout data to avoid using stale data
        setSelectedAddress(null);
        setSelectedPaymentGateway(null);

        // Load fresh profile and data with a small delay to ensure auth is complete
        setTimeout(() => {
          loadUserProfile().catch(() => {});
          loadUserAddresses().catch(() => {});
        }, 200);
      } else {
        // User is logged out, clear user data
        setUserProfile(null);
        setUserAddresses([]);
        setSelectedAddress(null);
        setSelectedPaymentGateway(null);
      }

      // Update merchant if included in event
      if (event.detail && event.detail.merchant) {
        setCurrentMerchant(event.detail.merchant);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('pocketlink_auth_update', handleAuthUpdate);

      return () => {
        window.removeEventListener('pocketlink_auth_update', handleAuthUpdate);
      };
    }
  }, [loadUserProfile]);

  // Listen for merchant change events - add proper dependencies
  useEffect(() => {
    const handleMerchantChange = (event) => {
      if (event.detail && event.detail.merchant) {
        setCurrentMerchant(event.detail.merchant);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener(
        'pocketlink_merchant_change',
        handleMerchantChange
      );

      return () => {
        window.removeEventListener(
          'pocketlink_merchant_change',
          handleMerchantChange
        );
      };
    }
  }, []);

  // Load addresses for the current user
  const loadUserAddresses = async () => {
    const email = getEffectiveUserEmail();

    if (!email) {
      setIsLoadingAddresses(false);
      return Promise.resolve([]);
    }

    setIsLoadingAddresses(true);

    try {
      const response = await fetch(
        `/api/checkout/address?email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        console.error('[Address] Failed to load addresses:', response.status);
        setIsLoadingAddresses(false);
        return [];
      }

      const result = await response.json();
      const addresses = result.addresses || [];

      setUserAddresses(addresses);

      // Set a default address if one exists and none selected
      if (addresses && addresses.length > 0 && !selectedAddress) {
        // First try to find the default address
        const defaultAddress = addresses.find((addr) => addr.is_default);

        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        } else {
          // Otherwise just use the first one
          setSelectedAddress(addresses[0]);
        }
      }

      setIsLoadingAddresses(false);
      return addresses;
    } catch (error) {
      console.error('[Address] Error loading addresses:', error);
      setIsLoadingAddresses(false);
      return [];
    }
  };

  // Helper to update other addresses when setting a new default
  const updateOtherAddressesDefault = async (email, excludeId) => {
    try {
      // Using email as the primary identifier to find user's addresses
      await safeSupabaseQuery(
        supabase
          .from('user_addresses')
          .update({ is_default: false })
          .eq('user_email', email) // Key relationship using email
          .neq('id', excludeId),
        'Failed to update address defaults'
      );
      return true;
    } catch (err) {
      return false;
    }
  };

  // Add a new address
  const addNewAddress = async (addressData) => {
    const email = getEffectiveUserEmail();

    if (!email) {
      console.error('[Address] No email found for address creation');
      return null;
    }

    console.log('[Address] Adding address with email:', email);

    try {
      // Use the checkout/address API route instead of direct Supabase calls
      const response = await fetch('/api/checkout/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          addressData: {
            name: addressData.name,
            line1: addressData.line1,
            line2: addressData.line2 || null,
            city: addressData.city,
            state: addressData.state,
            postal_code: addressData.postalCode,
            country: addressData.country || 'US',
            phone: addressData.phone,
          },
          setAsDefault: addressData.isDefault || false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[Address] API error:', errorData);
        toast.error(errorData.error || 'Failed to save address');
        return null;
      }

      const result = await response.json();
      console.log('[Address] Address saved successfully:', result);

      const newAddress = result.address;

      // Update local state - add to existing addresses or replace if duplicate
      const existingIndex = userAddresses.findIndex(
        (addr) => addr.id === newAddress.id
      );
      let updatedAddresses;

      if (existingIndex >= 0) {
        // Update existing
        updatedAddresses = userAddresses.map((addr, index) =>
          index === existingIndex ? newAddress : addr
        );
      } else {
        // Add new
        updatedAddresses = [...userAddresses, newAddress];
      }

      setUserAddresses(updatedAddresses);

      // If this address is set as default or it's the first address, select it
      if (newAddress.is_default || userAddresses.length === 0) {
        setSelectedAddress(newAddress);
      }

      return newAddress;
    } catch (error) {
      console.error('[Address] Error adding address:', error);
      toast.error('Failed to save address');
      return null;
    }
  };

  // Delete an address
  const deleteAddress = async (addressId) => {
    // For optimistic UI updates, remove locally first
    const updatedAddresses = userAddresses.filter(
      (addr) => addr.id !== addressId
    );
    const wasSelected = selectedAddress && selectedAddress.id === addressId;
    const wasDefault = userAddresses.find(
      (a) => a.id === addressId
    )?.is_default;
    const userEmail = getEffectiveUserEmail();

    if (!userEmail) {
      return false;
    }

    setUserAddresses(updatedAddresses);

    // If the deleted address was selected, select another one
    if (wasSelected) {
      const newSelected =
        updatedAddresses.find((a) => a.is_default) ||
        updatedAddresses[0] ||
        null;
      setSelectedAddress(newSelected);
    }

    try {
      // Delete from database by ID
      const { error } = await safeSupabaseQuery(
        supabase.from('user_addresses').delete().eq('id', addressId),
        'Failed to delete address'
      );

      if (error) {
        // Revert optimistic update
        setUserAddresses(userAddresses);
        if (wasSelected) {
          setSelectedAddress(
            userAddresses.find((a) => a.id === addressId) || null
          );
        }

        return false;
      }

      // If this was the default and we have other addresses, set a new default
      if (wasDefault && updatedAddresses.length > 0) {
        const newDefaultId = updatedAddresses[0].id;
        await safeSupabaseQuery(
          supabase
            .from('user_addresses')
            .update({ is_default: true })
            .eq('id', newDefaultId),
          'Failed to set new default address'
        );

        // Update local state even if the database update failed
        setUserAddresses((prevAddresses) =>
          prevAddresses.map((addr) =>
            addr.id === newDefaultId ? { ...addr, is_default: true } : addr
          )
        );
      }

      return true;
    } catch (error) {
      // Revert optimistic update
      setUserAddresses(userAddresses);
      if (wasSelected) {
        setSelectedAddress(
          userAddresses.find((a) => a.id === addressId) || null
        );
      }

      return false;
    }
  };

  // Ensure store exists in database before creating checkout sessions
  const ensureStoreExists = async (merchantUsername) => {
    console.log(
      '🏪 [ENSURE_STORE] Checking/creating store for merchant:',
      merchantUsername
    );

    if (!merchantUsername) {
      console.error('❌ [ENSURE_STORE] No merchant username provided');
      return null;
    }

    try {
      // First check if store already exists
      const { data: existingStore, error: checkError } =
        await safeSupabaseQuery(
          supabase
            .from('stores')
            .select('id, merchant_username, name')
            .eq('merchant_username', merchantUsername)
            .single(),
          'Failed to check existing store'
        );

      if (!checkError && existingStore) {
        console.log('✅ [ENSURE_STORE] Store already exists:', existingStore);
        return {
          id: existingStore.id,
          username: existingStore.merchant_username,
          name: existingStore.name,
        };
      }

      console.log(
        "🆕 [ENSURE_STORE] Store doesn't exist, creating new store..."
      );

      // Generate UUID for new store
      const newStoreId = uuidv4();
      const storeData = {
        id: newStoreId,
        merchant_username: merchantUsername,
        name:
          merchantUsername.charAt(0).toUpperCase() + merchantUsername.slice(1),
        created_at: new Date().toISOString(),
      };

      console.log('🆕 [ENSURE_STORE] Creating store with data:', storeData);

      // Create the store
      const { data: newStore, error: createError } = await safeSupabaseQuery(
        supabase
          .from('stores')
          .insert(storeData)
          .select('id, merchant_username, name')
          .single(),
        'Failed to create store'
      );

      if (createError) {
        console.error('❌ [ENSURE_STORE] Failed to create store:', createError);
        return null;
      }

      console.log('✅ [ENSURE_STORE] Store created successfully:', newStore);
      return {
        id: newStore.id,
        username: newStore.merchant_username,
        name: newStore.name,
      };
    } catch (error) {
      console.error('💥 [ENSURE_STORE] Error ensuring store exists:', error);
      return null;
    }
  };

  // Validate checkout session exists in database
  const validateCheckoutSession = async (sessionId) => {
    console.log(
      '🔍 [VALIDATE_SESSION] Checking session exists in database:',
      sessionId
    );
    try {
      const { data: sessionData, error: sessionError } =
        await safeSupabaseQuery(
          supabase
            .from('checkout_sessions')
            .select('id, status, user_email, merchant_username, created_at')
            .eq('id', sessionId)
            .single(),
          'Failed to validate checkout session'
        );

      console.log('🔍 [VALIDATE_SESSION] Validation result:', {
        found: !!sessionData,
        error: sessionError?.message,
        sessionData: sessionData,
      });

      if (sessionError || !sessionData) {
        return { exists: false, error: sessionError };
      }

      return { exists: true, data: sessionData };
    } catch (error) {
      console.error('❌ [VALIDATE_SESSION] Validation error:', error);
      return { exists: false, error: error };
    }
  };

  // Process payment and create order
  const processPayment = async (payload) => {
    console.log('🔄 [PROCESS_PAYMENT] Starting payment processing...');
    console.log('🔄 [PROCESS_PAYMENT] Payload:', {
      ...payload,
      items: `${payload.items?.length || 0} items`,
    });

    try {
      setIsProcessingPayment(true);

      // 1. Validate user is authenticated
      const email = getEffectiveUserEmail();
      console.log('👤 [PROCESS_PAYMENT] User validation:', {
        email,
        isAuthenticated,
      });
      if (!email) {
        throw new Error('User must be authenticated to process payment');
      }

      // 1.5. Ensure user profile exists in database before creating order
      console.log('👤 [PROCESS_PAYMENT] User profile check:', {
        userProfile: !!userProfile,
      });
      if (!userProfile) {
        try {
          console.log('👤 [PROCESS_PAYMENT] Loading user profile...');
          const profile = await loadUserProfile();
          console.log('👤 [PROCESS_PAYMENT] Profile loaded:', {
            profile: !!profile,
          });
          if (!profile) {
            throw new Error('Failed to create user profile');
          }
        } catch (profileError) {
          console.error('❌ [PROCESS_PAYMENT] Profile error:', profileError);
          throw new Error('Failed to load or create user profile');
        }
      }

      // 1.5. Ensure user profile exists in database before creating order
      console.log('👤 [PROCESS_PAYMENT] User profile check:', {
        userProfile: !!userProfile,
      });
      if (!userProfile) {
        try {
          console.log('👤 [PROCESS_PAYMENT] Loading user profile...');
          const profile = await loadUserProfile();
          console.log('👤 [PROCESS_PAYMENT] Profile loaded:', {
            profile: !!profile,
          });
          if (!profile) {
            throw new Error('Failed to create user profile');
          }
        } catch (profileError) {
          console.error('❌ [PROCESS_PAYMENT] Profile error:', profileError);
          throw new Error('Failed to load or create user profile');
        }
      }

      // 2. Check if we have all required data
      // Only require shipping address for non-digital orders
      console.log('📦 [PROCESS_PAYMENT] Validating order requirements...');
      if (!payload.isDigitalOnly && !selectedAddress) {
        console.error(
          '❌ [PROCESS_PAYMENT] Missing shipping address for non-digital order'
        );
        throw new Error('No shipping address selected');
      }

      // 3. Check payment gateway only if total > 0
      const totalAmount = Number(payload.amount || 0);
      console.log('💰 [PROCESS_PAYMENT] Payment validation:', {
        totalAmount,
        selectedPaymentGateway,
      });
      if (totalAmount > 0 && !selectedPaymentGateway) {
        console.error(
          '❌ [PROCESS_PAYMENT] Missing payment gateway for paid order'
        );
        throw new Error('No payment Gateway selected');
      }

      // 4. Checkout session validation - CRITICAL SECTION
      console.log('🛒 [PROCESS_PAYMENT] Checkout session validation...');
      console.log('🛒 [PROCESS_PAYMENT] Current checkoutSession:', {
        exists: !!checkoutSession,
        id: checkoutSession?.id,
        status: checkoutSession?.status,
        merchant_username: checkoutSession?.merchant_username,
        user_email: checkoutSession?.user_email,
      });

      if (!checkoutSession) {
        console.error('❌ [PROCESS_PAYMENT] No active checkout session found!');
        throw new Error('No active checkout session');
      }

      // CRITICAL: Ensure store exists BEFORE processing payment
      console.log(
        '🏪 [PROCESS_PAYMENT] Ensuring store exists for merchant:',
        checkoutSession.merchant_username
      );
      const verifiedStore = await ensureStoreExists(
        checkoutSession.merchant_username
      );

      if (!verifiedStore) {
        console.error(
          '❌ [PROCESS_PAYMENT] Failed to verify/create store for:',
          checkoutSession.merchant_username
        );
        throw new Error('Store verification failed - cannot process payment');
      }

      console.log(
        '✅ [PROCESS_PAYMENT] Store verified for payment processing:',
        verifiedStore
      );

      // Initialize the session variable that we'll use throughout the function
      // We'll assign it based on existence checks below
      let finalSession = {
        ...checkoutSession,
        // Ensure we have the correct merchant data from verified store
        merchant_id: verifiedStore.id,
        merchant_username: verifiedStore.username,
      };
      console.log('🛒 [PROCESS_PAYMENT] Initial finalSession:', {
        id: finalSession.id,
        status: finalSession.status,
      });

      try {
        console.log(
          '🔍 [PROCESS_PAYMENT] Verifying checkout session exists in database...'
        );
        // First verify that the checkout session exists in the database
        const validationResult = await validateCheckoutSession(
          checkoutSession.id
        );

        console.log('🔍 [PROCESS_PAYMENT] Session verification result:', {
          found: validationResult.exists,
          error: validationResult.error?.message,
          sessionData: validationResult.data,
        });

        if (!validationResult.exists) {
          console.warn(
            '⚠️ [PROCESS_PAYMENT] Session not found in DB, attempting recovery...'
          );
          // Try to find any active session for this user/merchant
          const { data: existingSessions, error: findError } =
            await safeSupabaseQuery(
              supabase
                .from('checkout_sessions')
                .select('id, status, created_at')
                .eq('user_email', email)
                .eq('merchant_username', checkoutSession.merchant_username)
                .eq('status', 'active')
                .order('created_at', { ascending: false })
                .limit(1),
              'Failed to find existing checkout session'
            );

          console.log('🔍 [PROCESS_PAYMENT] Existing session search:', {
            found: existingSessions?.length > 0,
            error: findError?.message,
            sessions: existingSessions,
          });

          console.log('🔍 [PROCESS_PAYMENT] Existing session search:', {
            found: existingSessions?.length > 0,
            error: findError?.message,
            sessions: existingSessions,
          });

          if (!findError && existingSessions && existingSessions.length > 0) {
            console.log(
              '✅ [PROCESS_PAYMENT] Found existing session, updating...'
            );
            // Update the session with the found ID
            finalSession = { ...finalSession, id: existingSessions[0].id };
            setCheckoutSession(finalSession);
          } else {
            console.log(
              '🆕 [PROCESS_PAYMENT] Creating new checkout session in database...'
            );
            // Try to create the session in the database if it doesn't exist
            const sessionToCreate = {
              ...checkoutSession,
              created_at: new Date().toISOString(),
              expires_at: new Date(
                Date.now() + 24 * 60 * 60 * 1000
              ).toISOString(),
            };
            console.log(
              '🆕 [PROCESS_PAYMENT] Session to create:',
              sessionToCreate
            );

            const { data: newSession, error: createError } =
              await safeSupabaseQuery(
                supabase
                  .from('checkout_sessions')
                  .insert(sessionToCreate)
                  .select()
                  .single(),
                'Failed to create checkout session'
              );

            console.log('🆕 [PROCESS_PAYMENT] Session creation result:', {
              success: !!newSession,
              error: createError?.message,
              newSession: newSession,
            });

            console.log('🆕 [PROCESS_PAYMENT] Session creation result:', {
              success: !!newSession,
              error: createError?.message,
              newSession: newSession,
            });

            if (createError) {
              console.error(
                '❌ [PROCESS_PAYMENT] Failed to create checkout session:',
                createError
              );
              throw new Error(
                'Checkout session could not be verified or created in the database'
              );
            }

            if (newSession) {
              console.log(
                '✅ [PROCESS_PAYMENT] Session created successfully, updating state...'
              );
              finalSession = newSession;
              setCheckoutSession(newSession);
            }
          }
        } else {
          console.log(
            '✅ [PROCESS_PAYMENT] Session verified successfully in database'
          );
        }
      } catch (sessionVerifyError) {
        console.error(
          '❌ [PROCESS_PAYMENT] Session verification error:',
          sessionVerifyError
        );
        // Continue with the original session if verification fails
        console.warn(
          '⚠️ [PROCESS_PAYMENT] Continuing with original session despite verification error'
        );
      }

      console.log('🛒 [PROCESS_PAYMENT] Final session to use:', {
        id: finalSession.id,
        status: finalSession.status,
        merchant_username: finalSession.merchant_username,
      });

      // 3. Extract IDs from objects if needed
      let shippingAddressId = null;

      console.log('🏠 [PROCESS_PAYMENT] Processing shipping address...');
      // Only process shipping address for non-digital orders
      if (!payload.isDigitalOnly) {
        if (typeof payload.shipping === 'string') {
          shippingAddressId = payload.shipping;
        } else if (selectedAddress && typeof selectedAddress === 'string') {
          shippingAddressId = selectedAddress;
        } else if (selectedAddress && typeof selectedAddress === 'object') {
          shippingAddressId = selectedAddress.id;
        } else {
          console.error(
            '❌ [PROCESS_PAYMENT] Invalid shipping address:',
            selectedAddress
          );
          throw new Error(
            `Invalid shipping address: ${JSON.stringify(selectedAddress)}`
          );
        }

        // Validate that we have valid IDs for non-digital orders
        if (!shippingAddressId || typeof shippingAddressId !== 'string') {
          console.error(
            '❌ [PROCESS_PAYMENT] Invalid shipping address ID:',
            shippingAddressId
          );
          throw new Error(
            `Invalid shipping address ID: ${JSON.stringify(shippingAddressId)}`
          );
        }
      } else {
        // For digital-only orders, use existing address if available but don't require it
        if (payload.shipping && typeof payload.shipping === 'string') {
          shippingAddressId = payload.shipping;
        } else if (selectedAddress && typeof selectedAddress === 'object') {
          shippingAddressId = selectedAddress.id;
        }
        // Note: shippingAddressId can be null for digital-only orders
      }

      console.log('🏠 [PROCESS_PAYMENT] Shipping address processed:', {
        shippingAddressId,
      });

      const paymentGatewayName = selectedPaymentGateway || 'unknown';

      // Validate that we have valid IDs
      if (
        (!shippingAddressId || typeof shippingAddressId !== 'string') &&
        !payload.isDigitalOnly
      ) {
        console.error(
          '❌ [PROCESS_PAYMENT] Final shipping validation failed:',
          shippingAddressId
        );
        throw new Error(
          `Invalid shipping address ID: ${JSON.stringify(shippingAddressId)}`
        );
      }

      // Calculate shipping and total - ensure all values are parsed as numbers
      const shippingAmount =
        typeof payload.shipping === 'object'
          ? 0
          : Number(payload.shippingCost || shippingFee || 0);

      // Use specific amount from payload or calculate from cart items
      // const totalAmount = Number(payload.amount || 0); // Already declared above

      // Calculate subtotal by subtracting shipping from total
      const subtotalAmount = Math.max(0, totalAmount - shippingAmount);

      console.log('💰 [PROCESS_PAYMENT] Order calculations:', {
        subtotalAmount,
        shippingAmount,
        totalAmount,
        paymentGatewayName,
      });

      // Ensure all expected numeric values are actually numbers
      if (
        isNaN(shippingAmount) ||
        isNaN(subtotalAmount) ||
        isNaN(totalAmount)
      ) {
        console.error('❌ [PROCESS_PAYMENT] Invalid numeric values:', {
          shippingAmount,
          subtotalAmount,
          totalAmount,
        });
        throw new Error('Invalid numeric values for order');
      }

      // Generate an order number
      const orderNumber = `PL-${Date.now().toString(36).toUpperCase()}`;
      console.log('📋 [PROCESS_PAYMENT] Generated order number:', orderNumber);

      // Insert the order record - ensure all numeric fields are properly parsed to numbers
      const orderDataToInsert = {
        id: uuidv4(),
        order_number: orderNumber,
        user_email: email, // Using email as primary identifier
        checkout_session_id: finalSession.id,
        merchant_id: finalSession.merchant_id,
        merchant_username: finalSession.merchant_username,
        items: payload.items,
        subtotal: subtotalAmount,
        shipping_fee: shippingAmount,
        tax: 0,
        total: totalAmount,
        currency: 'INR',
        status:
          totalAmount === 0
            ? 'completed'
            : payload.isEasebuzzPayment || payload.isRazorpayPayment
              ? 'pending_payment'
              : 'pending', // Complete order directly if total is 0
        shipping_address_id: shippingAddressId, // Can be null for digital-only orders
        billing_address_id: shippingAddressId, // Use same address for billing for now, can be null for digital-only
        payment_gateway_name:
          totalAmount === 0 ? 'free_order' : paymentGatewayName,
        payment_status:
          totalAmount === 0
            ? 'completed'
            : payload.isEasebuzzPayment || payload.isRazorpayPayment
              ? 'awaiting_gateway'
              : 'pending', // Complete payment if total is 0
        created_at: new Date().toISOString(),
      };

      console.log('📋 [PROCESS_PAYMENT] Order data to insert:', {
        ...orderDataToInsert,
        items: `${orderDataToInsert.items?.length || 0} items`,
        checkout_session_id: orderDataToInsert.checkout_session_id,
        user_email: orderDataToInsert.user_email,
      });

      // For zero amount orders, complete the order directly
      if (totalAmount === 0) {
        console.log('🆓 [PROCESS_PAYMENT] Processing free order...');
        // Insert the order data to Supabase
        const { data: orderData, error: orderError } = await safeSupabaseQuery(
          supabase.from('orders').insert(orderDataToInsert).select(),
          'Failed to create order'
        );

        console.log('🆓 [PROCESS_PAYMENT] Free order creation result:', {
          success: !!orderData,
          error: orderError?.message,
        });

        if (orderError) {
          console.error(
            '❌ [PROCESS_PAYMENT] Free order creation failed:',
            orderError
          );
          throw new Error(`Failed to create order: ${orderError.message}`);
        }

        console.log(
          '🆓 [PROCESS_PAYMENT] Updating checkout session to completed...'
        );
        // Update checkout session to completed
        await safeSupabaseQuery(
          supabase
            .from('checkout_sessions')
            .update({ status: 'completed' })
            .eq('id', finalSession.id),
          'Failed to update checkout session status'
        );

        // Clear the checkout session
        setCheckoutSession(null);

        // Reset the checkout step
        setCurrentCheckoutStep(null);

        setIsProcessingPayment(false);

        console.log('✅ [PROCESS_PAYMENT] Free order completed successfully');
        return {
          success: true,
          orderNumber: orderNumber,
        };
      }

      // For EaseBuzz payments, we'll return order info without completing the checkout yet
      if (payload.isEasebuzzPayment) {
        console.log('🏪 [PROCESS_PAYMENT] Processing EaseBuzz payment...');
        // Insert the order data to Supabase
        const { data: orderData, error: orderError } = await safeSupabaseQuery(
          supabase.from('orders').insert(orderDataToInsert).select(),
          'Failed to create order'
        );

        console.log('🏪 [PROCESS_PAYMENT] EaseBuzz order creation result:', {
          success: !!orderData,
          error: orderError?.message,
        });

        if (orderError) {
          console.error(
            '❌ [PROCESS_PAYMENT] EaseBuzz order creation failed:',
            orderError
          );
          // setIsProcessingPayment(false);
          throw new Error(`Failed to create order: ${orderError.message}`);
        }

        console.log(
          '✅ [PROCESS_PAYMENT] EaseBuzz order created, returning for gateway processing'
        );
        // Now return the data needed for EaseBuzz payment flow
        return {
          success: true,
          orderNumber: orderNumber,
          orderData: orderDataToInsert,
          requiresGateway: true,
          gatewayType: 'easebuzz',
          total: totalAmount,
        };
      }

      // For Razorpay payments, we'll return order info without completing the checkout yet
      if (payload.isRazorpayPayment) {
        console.log('💎 [PROCESS_PAYMENT] Processing Razorpay payment...');
        // Insert the order data to Supabase
        const { data: orderData, error: orderError } = await safeSupabaseQuery(
          supabase.from('orders').insert(orderDataToInsert).select(),
          'Failed to create order'
        );

        console.log('💎 [PROCESS_PAYMENT] Razorpay order creation result:', {
          success: !!orderData,
          error: orderError?.message,
        });

        if (orderError) {
          console.error(
            '❌ [PROCESS_PAYMENT] Razorpay order creation failed:',
            orderError
          );
          throw new Error(`Failed to create order: ${orderError.message}`);
        }

        console.log(
          '✅ [PROCESS_PAYMENT] Razorpay order created, returning for gateway processing'
        );
        // Now return the data needed for Razorpay payment flow
        return {
          success: true,
          orderNumber: orderNumber,
          orderData: orderDataToInsert,
          requiresGateway: true,
          gatewayType: 'razorpay',
          total: totalAmount,
        };
      }

      console.log('💳 [PROCESS_PAYMENT] Processing regular payment...');
      // For other payments, insert the order data to Supabase
      const { data: orderData, error: orderError } = await safeSupabaseQuery(
        supabase.from('orders').insert(orderDataToInsert).select(),
        'Failed to create order'
      );

      console.log('💳 [PROCESS_PAYMENT] Regular order creation result:', {
        success: !!orderData,
        error: orderError?.message,
      });

      if (orderError) {
        console.error(
          '❌ [PROCESS_PAYMENT] Regular order creation failed:',
          orderError
        );
        throw new Error(`Failed to create order: ${orderError.message}`);
      }

      console.log(
        '💳 [PROCESS_PAYMENT] Updating checkout session to completed...'
      );
      // Update checkout session to completed
      await safeSupabaseQuery(
        supabase
          .from('checkout_sessions')
          .update({ status: 'completed' })
          .eq('id', finalSession.id),
        'Failed to update checkout session status'
      );

      // Clear the checkout session
      setCheckoutSession(null);

      // Reset the checkout step
      setCurrentCheckoutStep(null);

      setIsProcessingPayment(false);

      console.log(
        '✅ [PROCESS_PAYMENT] Regular payment completed successfully'
      );
      return {
        success: true,
        orderNumber: orderNumber,
      };
    } catch (error) {
      console.error('💥 [PROCESS_PAYMENT] Payment processing failed:', error);
      console.error('💥 [PROCESS_PAYMENT] Error stack:', error.stack);
      setIsProcessingPayment(false);
      return {
        success: false,
        error: error.message,
      };
    }
  };

  const handlePaymentSuccess = async (orderNumber, gatewayResponse = {}) => {
    try {
      if (!orderNumber) {
        console.error(
          '[Checkout] Cannot update order: No order number provided'
        );
        return { success: false, error: 'No order number provided' };
      }

      // Update the order status in the database
      const { data, error } = await supabase
        .from('orders')
        .update({
          status: 'completed', // Change from pending_payment to pending
          payment_status: 'completed',
        })
        .eq('order_number', orderNumber)
        .select()
        .single();

      if (error) {
        console.error(
          'Error updating order status after payment success:',
          error
        );
        return { success: false, error: error.message };
      }

      // Update checkout session to completed if it exists
      if (checkoutSession) {
        const { error: sessionError } = await supabase
          .from('checkout_sessions')
          .update({ status: 'completed' })
          .eq('id', checkoutSession.id);

        if (sessionError) {
          console.error('Error updating checkout session:', sessionError);
        }

        // Clear the checkout session
        setCheckoutSession(null);
      }

      return {
        success: true,
        orderData: data,
        orderNumber: orderNumber,
      };
    } catch (err) {
      console.error('Error processing payment success:', err);
      return {
        success: false,
        error: 'Failed to process payment success',
      };
    } finally {
      setIsProcessingPayment(false); // Always runs, success or fail
    }
  };

  // Handle gateway payment failure
  const handlePaymentFailure = async (
    orderNumber,
    reason = 'Unknown error'
  ) => {
    try {
      if (!orderNumber) {
        console.error(
          '[Checkout] Cannot update order failure: No order number provided'
        );
        return { success: false, error: 'No order number provided' };
      }

      // Update the order status in database
      const { error } = await supabase
        .from('orders')
        .update({
          status: 'payment_failed',
          payment_status: 'failed',
          // gateway_error: reason || "Unknown error",
          // updated_at: new Date().toISOString(),
        })
        .eq('order_number', orderNumber);

      if (error) {
        console.error('Error updating order failure status:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      console.error('Error processing payment failure:', err);
      return {
        success: false,
        error: 'Failed to process payment failure',
      };
    } finally {
      setIsProcessingPayment(false); // Always runs, success or fail
    }
  };

  // Initialize a new checkout session
  const initializeCheckoutSession = async (items) => {
    console.log(
      '🚀 [INIT_SESSION] Starting checkout session initialization...'
    );
    const email = getEffectiveUserEmail();

    if (!email && isAuthenticated) {
      console.error(
        '[Checkout] Cannot initialize session: No user email despite being authenticated'
      );
      // Try to reload user profile
      const profile = await loadUserProfile();
      if (!profile || !profile.email) {
        return null;
      }
    }

    try {
      // Calculate totals
      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Extract merchant from URL using Next.js usePathname
      let merchantUsername = pathMerchantUsername;
      console.log(
        '🏪 [INIT_SESSION] Extracted merchant username:',
        merchantUsername
      );

      // Fallback to currentMerchant if available and pathMerchantUsername not found
      if (!merchantUsername && currentMerchant?.username) {
        merchantUsername = currentMerchant.username;
        console.log(
          '🏪 [INIT_SESSION] Using currentMerchant username:',
          merchantUsername
        );
      }

      // If still no merchant username, try to extract from hostname or create a default
      if (!merchantUsername) {
        try {
          // Try to extract from hostname or location
          if (typeof window !== 'undefined') {
            const hostname = window.location.hostname;
            if (hostname.includes('.')) {
              const subdomain = hostname.split('.')[0];
              if (
                subdomain &&
                subdomain !== 'www' &&
                subdomain !== 'localhost'
              ) {
                merchantUsername = subdomain;
                console.log(
                  '🏪 [INIT_SESSION] Extracted from hostname:',
                  merchantUsername
                );
              } else {
                // Use a default value if no merchant can be determined
                merchantUsername = 'default_merchant';
                console.log('🏪 [INIT_SESSION] Using default merchant');
              }
            } else {
              // Use a default value if no merchant can be determined
              merchantUsername = 'default_merchant';
              console.log(
                '🏪 [INIT_SESSION] Using default merchant (no domain)'
              );
            }
          }
        } catch (err) {
          // Ensure we have a fallback even if there's an error
          merchantUsername = 'default_merchant';
          console.log(
            '🏪 [INIT_SESSION] Error extracting merchant, using default'
          );
        }
      }

      // CRITICAL: Ensure store exists BEFORE creating checkout session
      console.log(
        '🏪 [INIT_SESSION] Ensuring store exists for:',
        merchantUsername
      );
      const verifiedMerchant = await ensureStoreExists(merchantUsername);

      if (!verifiedMerchant) {
        console.error(
          '❌ [INIT_SESSION] Failed to create or verify store for:',
          merchantUsername
        );
        return null;
      }

      console.log(
        '✅ [INIT_SESSION] Store verified/created:',
        verifiedMerchant
      );

      // Create checkout session
      const sessionId = uuidv4();
      const session = {
        id: sessionId,
        user_email: email || null, // Using email as primary identifier
        items: items,
        subtotal: subtotal,
        shipping_fee: 0, // Will be calculated later
        tax: 0, // Calculate tax if needed
        total: subtotal, // Will update with shipping
        status: 'active',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hour expiry
        merchant_id: verifiedMerchant.id,
        merchant_username: verifiedMerchant.username,
      };

      console.log('🛒 [INIT_SESSION] Creating checkout session:', {
        id: session.id,
        merchant_username: session.merchant_username,
        merchant_id: session.merchant_id,
        user_email: session.user_email,
        items_count: session.items.length,
      });

      // Always insert into database, regardless of authentication status
      // This ensures that we don't get foreign key constraint errors when creating orders
      const { data, error } = await safeSupabaseQuery(
        supabase.from('checkout_sessions').insert(session).select().single(),
        'Failed to create checkout session'
      );

      if (error) {
        console.error(
          '❌ [INIT_SESSION] Failed to create checkout session in database:',
          error
        );
        // Store in state anyway for checkout to work
        setCheckoutSession(session);
        return session;
      }

      console.log(
        '✅ [INIT_SESSION] Checkout session created successfully in database'
      );
      setCheckoutSession(data);
      return data;
    } catch (error) {
      console.error(
        '💥 [INIT_SESSION] Error initializing checkout session:',
        error
      );
      return null;
    }
  };

  // Calculate shipping cost based on address and items
  const calculateShipping = async (address, cartItems) => {
    if (!address) {
      return 0; // Free shipping if no address
    }

    try {
      // In a real implementation, call shipping API here
      // For now, use a simple calculation based on region
      let baseFee = 5.0; // Base shipping fee

      // Check if we have merchant-specific shipping settings
      if (currentMerchant && currentMerchant.id) {
        try {
          const { data: storeData, error } = await safeSupabaseQuery(
            supabase
              .from('stores')
              .select('shipping_settings')
              .eq('id', currentMerchant.id)
              .single(),
            'Failed to fetch store shipping settings'
          );

          if (!error && storeData && storeData.shipping_settings) {
            // Parse shipping settings
            const settings =
              typeof storeData.shipping_settings === 'string'
                ? safeParse(storeData.shipping_settings, {})
                : storeData.shipping_settings;

            // Check for free shipping threshold
            if (settings.freeShippingThreshold) {
              const subtotal = cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );
              if (subtotal >= settings.freeShippingThreshold) {
                setShippingFee(0);

                // Update checkout session with shipping
                if (checkoutSession) {
                  const updatedSession = {
                    ...checkoutSession,
                    shipping_fee: 0,
                    total: checkoutSession.subtotal,
                  };

                  setCheckoutSession(updatedSession);

                  // Update in database if authenticated
                  if (getEffectiveUserEmail()) {
                    await safeSupabaseQuery(
                      supabase
                        .from('checkout_sessions')
                        .update({
                          shipping_fee: 0,
                          total: checkoutSession.subtotal,
                        })
                        .eq('id', checkoutSession.id),
                      'Failed to update checkout session shipping'
                    );
                  }
                }

                return 0;
              }
            }

            // Check for region-specific rates
            if (settings.regionRates) {
              const region = settings.regionRates.find(
                (r) =>
                  r.state === address.state || r.country === address.country
              );

              if (region) {
                baseFee = region.rate;
              }
            }
          }
        } catch (err) {
          // Continue with default shipping calculation
        }
      }

      // Apply distance multiplier based on state/region
      // This is a simplified example - in reality you'd call a shipping API
      let multiplier = 1.0;

      // Simple region-based pricing
      if (address.country !== 'US') {
        multiplier = 2.5; // International shipping
      } else {
        // US state-based pricing (simplified)
        const westCoast = ['CA', 'OR', 'WA'];
        const eastCoast = [
          'NY',
          'MA',
          'CT',
          'NJ',
          'PA',
          'MD',
          'VA',
          'NC',
          'SC',
          'GA',
          'FL',
        ];
        const midwest = [
          'OH',
          'MI',
          'IN',
          'IL',
          'WI',
          'MN',
          'IA',
          'MO',
          'KS',
          'NE',
          'SD',
          'ND',
        ];

        if (westCoast.includes(address.state)) {
          multiplier = 1.0;
        } else if (eastCoast.includes(address.state)) {
          multiplier = 1.2;
        } else if (midwest.includes(address.state)) {
          multiplier = 1.1;
        } else {
          // Other states
          multiplier = 1.3;
        }
      }

      const fee = baseFee * multiplier;

      // Round to 2 decimal places
      const shippingFee = Math.round(fee * 100) / 100;
      setShippingFee(shippingFee);

      // Update checkout session with shipping
      if (checkoutSession) {
        const updatedSession = {
          ...checkoutSession,
          shipping_fee: shippingFee,
          total: checkoutSession.subtotal + shippingFee,
        };

        setCheckoutSession(updatedSession);

        // Update in database if authenticated
        if (getEffectiveUserEmail()) {
          await safeSupabaseQuery(
            supabase
              .from('checkout_sessions')
              .update({
                shipping_fee: shippingFee,
                total: checkoutSession.subtotal + shippingFee,
              })
              .eq('id', checkoutSession.id),
            'Failed to update checkout session with shipping'
          );
        }
      }

      return shippingFee;
    } catch (error) {
      return 0;
    }
  };

  // Set an address as default
  const setDefaultAddress = async (addressId) => {
    const userEmail = getEffectiveUserEmail();

    if (!userEmail) {
      return false;
    }

    try {
      // First update all the user's addresses to not be default
      await updateOtherAddressesDefault(userEmail, addressId);

      // Then set this one as default
      const { error } = await safeSupabaseQuery(
        supabase
          .from('user_addresses')
          .update({ is_default: true })
          .eq('id', addressId)
          .eq('user_email', userEmail), // Ensure we're updating the right user's address
        'Failed to set default address'
      );

      if (error) {
        return false;
      }

      // Update local state
      setUserAddresses((prevAddresses) =>
        prevAddresses.map((addr) =>
          addr.id === addressId
            ? { ...addr, is_default: true }
            : { ...addr, is_default: false }
        )
      );

      // Also update selected address if needed
      if (selectedAddress?.id === addressId) {
        setSelectedAddress((prev) => ({ ...prev, is_default: true }));
      } else {
        // Select the new default address
        const newDefaultAddress = userAddresses.find(
          (addr) => addr.id === addressId
        );
        if (newDefaultAddress) {
          setSelectedAddress({ ...newDefaultAddress, is_default: true });
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  // ======== Context Provider ======== //
  // Provide context value with memoized objects to optimize performance
  const value = React.useMemo(
    () => ({
      // User data
      userProfile,
      isLoadingProfile,
      loadUserProfile: loadUserProfile,

      // Authentication-related
      isAuthenticated,
      userEmail,

      // Addresses
      userAddresses,
      selectedAddress,
      setSelectedAddress,
      isLoadingAddresses,
      addNewAddress,
      deleteAddress,
      loadUserAddresses, // Include for direct access

      // Payment Gateway
      selectedPaymentGateway,
      setSelectedPaymentGateway,

      // Checkout
      currentCheckoutStep,
      setCurrentCheckoutStep,
      checkoutSession,
      initializeCheckoutSession,
      ensureStoreExists,
      validateCheckoutSession,
      isProcessingPayment,
      setIsProcessingPayment,
      processPayment,
      calculateShipping,
      handlePaymentSuccess,
      handlePaymentFailure,

      // Helper to open auth dialog
      openAuthDialog: () => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('open-auth-dialog'));
        }
      },
    }),
    [
      userProfile,
      isLoadingProfile,
      loadUserProfile,
      isAuthenticated,
      userEmail,
      userAddresses,
      selectedAddress,
      isLoadingAddresses,
      selectedPaymentGateway,
      currentCheckoutStep,
      checkoutSession,
      isProcessingPayment,
    ]
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

// ======== Custom Hook ======== //
// Custom hook for accessing context
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
