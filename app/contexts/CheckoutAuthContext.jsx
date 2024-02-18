'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { supabase } from '@/Clients/supabase/client';
import Cookies from 'js-cookie';

// Storage keys
const AUTH_TOKEN_KEY = 'pocketlink_auth_token';
const AUTH_SESSION_KEY = 'pocketlink_auth_session';
const AUTH_SUCCESS_EVENT = 'pocketlink_auth_success';
const MERCHANT_KEY = 'pocketlink_current_merchant';
const USER_MERCHANTS_KEY = 'pocketlink_user_merchants';

// Create context
const CheckoutAuthContext = createContext();

// Enhanced API call wrapper with retries and better error handling
const safeApiCall = async (url, options, retries = 2) => {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);

      // Handle HTTP errors explicitly
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.error ||
          errorData.message ||
          `HTTP error ${response.status}`;

        // If it's a server error (5xx), try again
        if (response.status >= 500 && attempt < retries) {
          await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
          continue;
        }

        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      lastError = error;

      // Only retry on network errors or server errors, not on client errors
      if (error.name !== 'TypeError' && attempt >= retries) {
        break;
      }

      // Wait with exponential backoff before retrying
      await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
    }
  }

  // If we get here, all retries failed
  throw lastError || new Error(`API call failed after ${retries} retries`);
};

// Generate a simple device fingerprint
const generateDeviceFingerprint = () => {
  if (typeof window === 'undefined') return null;

  try {
    // Use a combination of browser and device information
    const screenData = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
    const timeZone = new Date().getTimezoneOffset();
    const language = navigator.language;
    const platform = navigator.platform;

    // Create a hash from these values
    const fingerprintSource = `${screenData}|${timeZone}|${language}|${platform}|${navigator.userAgent}`;

    // Generate a hash-like identifier
    let hashCode = 0;
    for (let i = 0; i < fingerprintSource.length; i++) {
      hashCode = (hashCode << 5) - hashCode + fingerprintSource.charCodeAt(i);
      hashCode = hashCode & hashCode; // Convert to 32bit integer
    }

    return `dev_${Math.abs(hashCode).toString(16)}_${Date.now().toString(36)}`;
  } catch (error) {
    return `dev_fallback_${Date.now().toString(36)}`;
  }
};

// Safe cookie management functions
const getCookie = (name) => {
  try {
    // First try js-cookie
    let value = Cookies.get(name);

    // If that fails, try manual cookie parsing
    if (!value && typeof document !== 'undefined') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          value = cookie.substring(name.length + 1);
          break;
        }
      }
    }

    return value;
  } catch (error) {
    return null;
  }
};

const setCookie = (name, value, options = {}) => {
  try {
    const hostname = window.location.hostname;
    const isLocalhost =
      hostname === 'localhost' ||
      hostname.endsWith('.localhost') ||
      hostname.startsWith('127.0.0.1') ||
      /^\d+\.\d+\.\d+\.\d+$/.test(hostname);

    const expires = new Date();
    expires.setDate(expires.getDate() + (options.expires || 30));

    if (isLocalhost) {
      // For subdomains of .localhost, set domain to .localhost
      if (hostname.endsWith('.localhost')) {
        document.cookie = `${name}=${value}; path=/; domain=.localhost; expires=${expires.toUTCString()}; samesite=lax`;
      } else {
        // For plain localhost or IP address, don't set domain
        document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}; samesite=lax`;
      }
    } else {
      // Production environment
      const domainParts = hostname.split('.');
      if (domainParts.length >= 2) {
        const rootDomain = '.' + domainParts.slice(-2).join('.');
        Cookies.set(name, value, {
          expires: options.expires || 30,
          path: '/',
          domain: rootDomain,
          sameSite: 'lax',
        });
      } else {
        Cookies.set(name, value, {
          expires: options.expires || 30,
          path: '/',
          sameSite: 'lax',
        });
      }
    }
    return true;
  } catch (error) {
    return false;
  }
};

const removeCookie = (name) => {
  try {
    const hostname = window.location.hostname;

    // For .localhost subdomains, clear with .localhost domain
    if (hostname.endsWith('.localhost')) {
      document.cookie = `${name}=; path=/; domain=.localhost; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    // For plain localhost, clear without domain
    else if (hostname === 'localhost' || hostname.startsWith('127.0.0.1')) {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    // For production domains
    else {
      // Remove with js-cookie for normal cases
      Cookies.remove(name, { path: '/' });

      // Also try removing with root domain
      const domainParts = hostname.split('.');
      if (domainParts.length >= 2) {
        const rootDomain = '.' + domainParts.slice(-2).join('.');
        Cookies.remove(name, { path: '/', domain: rootDomain });
      }
    }
    return true;
  } catch (error) {
    return false;
  }
};

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

const safeSetStorage = (key, value, storage = 'local') => {
  try {
    const store = storage === 'local' ? localStorage : sessionStorage;
    store.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

const safeRemoveStorage = (key, storage = 'local') => {
  try {
    const store = storage === 'local' ? localStorage : sessionStorage;
    store.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

const safeParse = (str, defaultValue = null) => {
  try {
    return str ? JSON.parse(str) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

// Provider component
export const CheckoutAuthProvider = ({ children }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [deviceFingerprint, setDeviceFingerprint] = useState(null);
  // New state variables for cross-merchant support
  const [currentMerchant, setCurrentMerchant] = useState(null);
  const [userMerchants, setUserMerchants] = useState([]);

  // Cache for merchant lookups to avoid repeated database calls
  const [merchantCache, setMerchantCache] = useState(new Map());

  // OTP session state
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [otpSession, setOtpSession] = useState(null);
  const [otpError, setOtpError] = useState(null);
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);

  // Update the auth status and emit events
  const updateAuthStatus = (isAuth, email, merchant = null) => {
    // Update state
    setIsAuthenticated(isAuth);
    if (email) setUserEmail(email);

    // If authenticated, update local storage and cookies
    if (isAuth && email) {
      // Store in local storage
      safeSetStorage(
        'pocketlink_user',
        JSON.stringify({
          email: email,
          lastVerified: new Date().toISOString(),
        })
      );

      // Create a new auth token with email info encoded
      // Format: authToken|emailHash - using a simple hash to avoid exposing email directly
      const authToken = uuidv4();
      const emailHash = btoa(email).split('').reverse().join('');
      const cookieValue = `${authToken}|${emailHash}`;

      // Set the cookie
      setCookie('pocketlink_auth', cookieValue);
      setAuthToken(authToken);

      // Write a flag to sessionStorage to share auth state across tabs
      safeSetStorage('pocketlink_auth_active', 'true', 'session');
      safeSetStorage('checkout_user_email', email, 'session');

      // Initialize a checkout session for the authenticated user if there's a current merchant
      if (merchant && merchant.id) {
        initializeEmptyCheckoutSession(email, merchant).catch(() => {
          // Fail silently - this isn't critical for auth
        });
      }
    } else {
      // Clear auth data
      removeCookie('pocketlink_auth');
      safeRemoveStorage('pocketlink_user');
      safeRemoveStorage('pocketlink_auth_active', 'session');
      safeRemoveStorage('checkout_user_email', 'session');
      setAuthToken(null);
    }

    // Emit auth state for other components
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('pocketlink_auth_update', {
            detail: {
              isAuthenticated: isAuth,
              email: email,
              merchant: merchant || currentMerchant,
            },
          })
        );
      }
    }, 100);
  };

  // Record merchant visit for tracking cross-merchant usage
  const recordMerchantVisit = async (
    userEmail,
    merchantId,
    merchantUsername
  ) => {
    if (!userEmail || !merchantId) {
      return false;
    }

    try {
      // First, update local storage of user's merchant history
      let userMerchantsList = [];
      try {
        const storedMerchants = safeGetStorage(USER_MERCHANTS_KEY);
        userMerchantsList = safeParse(storedMerchants, []);

        // Add or update this merchant
        const existingIndex = userMerchantsList.findIndex(
          (m) => m.id === merchantId
        );
        const now = new Date().toISOString();

        if (existingIndex >= 0) {
          userMerchantsList[existingIndex] = {
            ...userMerchantsList[existingIndex],
            lastVisit: now,
            visitCount: (userMerchantsList[existingIndex].visitCount || 0) + 1,
          };
        } else {
          userMerchantsList.push({
            id: merchantId,
            username: merchantUsername || merchantId,
            lastVisit: now,
            visitCount: 1,
          });
        }

        // Sort by most recent
        userMerchantsList.sort(
          (a, b) => new Date(b.lastVisit) - new Date(a.lastVisit)
        );

        // Save updated list
        safeSetStorage(USER_MERCHANTS_KEY, JSON.stringify(userMerchantsList));
        setUserMerchants(userMerchantsList);
      } catch (err) {
        // Continue execution - we don't want to block on localStorage issues
      }

      // Ensure we have a valid UUID for merchant_id (for database schema compatibility)
      // If it's not a valid UUID, generate one
      let effectiveMerchantId = merchantId;

      // Simple regex to check for UUID format: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(merchantId)) {
        effectiveMerchantId = uuidv4();
      }

      // Safely attempt the database operation with retry logic
      try {
        // First, check if the record already exists to get the current visit_count
        const { data: existingRecord, error: fetchError } = await supabase
          .from('user_merchants')
          .select('visit_count')
          .eq('user_email', userEmail)
          .eq('merchant_id', effectiveMerchantId)
          .single();

        // Set the visit_count - either increment existing count or set to 1 for new records
        const visit_count = existingRecord
          ? (parseInt(existingRecord.visit_count) || 0) + 1
          : 1;

        // Now perform the upsert with the correct visit_count
        await supabase.from('user_merchants').upsert(
          {
            user_email: userEmail,
            merchant_id: effectiveMerchantId,
            merchant_username: merchantUsername,
            last_visit: new Date().toISOString(),
            visit_count: visit_count,
          },
          {
            onConflict: 'user_email, merchant_id',
            ignoreDuplicates: false,
          }
        );
      } catch (dbError) {
        // Database error is not critical for the authentication flow
        // We can still return true even if the database operation fails
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  // Check cross-merchant authentication
  const checkCrossMerchantAuth = async (merchant) => {
    if (!merchant || !merchant.id || !merchant.username) {
      return false;
    }

    // Check for auth cookie
    let authCookie = getCookie('pocketlink_auth');

    if (!authCookie) {
      return false;
    }

    // Check if cookie is in old format (just UUID) and needs migration
    if (!authCookie.includes('|')) {
      // Try to find email from storage to migrate cookie
      let migrationEmail = safeGetStorage('checkout_user_email', 'session');

      if (!migrationEmail) {
        const userData = safeGetStorage('pocketlink_user');
        const parsed = safeParse(userData);
        migrationEmail = parsed?.email;
      }

      // If we found an email, migrate the cookie
      if (migrationEmail) {
        // Create the new cookie value with email hash
        const emailHash = btoa(migrationEmail).split('').reverse().join('');
        const newCookieValue = `${authCookie}|${emailHash}`;

        // Update the cookie with the new format
        setCookie('pocketlink_auth', newCookieValue);

        // Update authCookie with the new format for the rest of this function
        authCookie = newCookieValue;
      }
    }

    // Check for email in cookie value (format: token|emailHash)
    let email = null;
    if (authCookie.includes('|')) {
      try {
        const parts = authCookie.split('|');
        if (parts.length > 1) {
          // Decode the email hash (reverse the encoding we did when setting the cookie)
          const emailHash = parts[1];
          const decodedEmailHash = emailHash.split('').reverse().join('');
          email = atob(decodedEmailHash);
        }
      } catch (err) {
        // Error decoding email from cookie
      }
    }

    // If email not in cookie, check multiple storage sources as backup
    if (!email) {
      email = safeGetStorage('checkout_user_email', 'session');
      if (!email) {
        const userData = safeGetStorage('pocketlink_user');
        const parsed = safeParse(userData);
        email = parsed?.email;
      }
    }

    // Even if we don't find an email but have a cookie, we should still try
    // the API which can validate based on the cookie alone
    if (!email && authCookie) {
      email = 'cookie_auth_check';
    }

    if (!email) {
      return false;
    }

    try {
      // Use the enhanced safeApiCall for better resilience
      const data = await safeApiCall(
        '/api/getCrossMerchantAuthStatus',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            deviceFingerprint,
            merchantId: merchant.id,
            merchantUsername: merchant.username,
            authCookie: authCookie, // Send the full cookie value to the API
          }),
        },
        2
      ); // 2 retries

      if (data.isAuthenticated) {
        // Update auth state - importantly, update with the email from the response
        // in case we didn't have it locally
        updateAuthStatus(true, data.email || email, merchant);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // Don't update auth state on error to prevent loops
      return false;
    }
  };

  // Lookup merchant ID from stores table by merchant_username with caching
  const lookupMerchantId = async (merchantUsername) => {
    // Check cache first
    if (merchantCache.has(merchantUsername)) {
      return merchantCache.get(merchantUsername);
    }

    try {
      const { data, error } = await supabase
        .from('stores')
        .select('id, name')
        .eq('merchant_username', merchantUsername)
        .single();

      let result = null;
      if (!error && data) {
        result = { id: data.id, name: data.name };
      }

      // Cache the result (even if null) to avoid repeated lookups
      setMerchantCache((prev) => new Map(prev).set(merchantUsername, result));
      return result;
    } catch (err) {
      // Cache the null result to avoid repeated failed lookups
      setMerchantCache((prev) => new Map(prev).set(merchantUsername, null));
      return null;
    }
  };

  // Set current merchant function (synchronous, but triggers async lookup in background)
  const setMerchant = (merchant) => {
    if (!merchant || !merchant.username) return;

    try {
      // Generate a valid UUID for the merchant ID if not provided or not a valid UUID
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const merchantId =
        merchant.id && uuidRegex.test(merchant.id) ? merchant.id : uuidv4();

      // Don't update if the merchant is the same as current to prevent infinite loops
      if (
        currentMerchant &&
        currentMerchant.id === merchantId &&
        currentMerchant.username === merchant.username
      ) {
        return;
      }

      // Ensure we're following the correct pattern
      const merchantData = {
        id: merchantId, // Initially use UUID, will be updated if real ID found
        username: merchant.username,
        name: merchant.name || merchant.username,
      };

      // Save to localStorage
      safeSetStorage(MERCHANT_KEY, JSON.stringify(merchantData));

      // Update state
      setCurrentMerchant(merchantData);

      // Trigger async lookup of real merchant ID in background
      (async () => {
        try {
          const storeData = await lookupMerchantId(merchant.username);
          if (storeData && storeData.id !== merchantData.id) {
            // Update with real merchant ID from database
            const updatedMerchantData = {
              ...merchantData,
              id: storeData.id,
              name: storeData.name,
            };

            // Update state and localStorage with real ID
            setCurrentMerchant(updatedMerchantData);
            safeSetStorage(MERCHANT_KEY, JSON.stringify(updatedMerchantData));
          }
        } catch (err) {
          // Fail silently - keep using the UUID
        }
      })();

      // Always check for cross-merchant authentication regardless of current auth state
      // This ensures we verify auth when switching between merchants
      // Safely check cross-merchant auth
      (async () => {
        try {
          await checkCrossMerchantAuth(merchantData);
        } catch (authError) {
          // Continue execution - we don't want to block UI on auth failure
        }
      })();

      // Record visit if already authenticated - in a safe way
      if (isAuthenticated && userEmail) {
        (async () => {
          try {
            await recordMerchantVisit(
              userEmail,
              merchantData.id,
              merchantData.username
            );
          } catch (visitError) {
            // Continue execution - this is not critical
          }
        })();
      }

      // Broadcast merchant change
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('pocketlink_merchant_change', {
            detail: { merchant: merchantData },
          })
        );
      }
    } catch (err) {
      // Error handled silently
    }
  };

  // Helper function to create an empty checkout session during authentication
  const initializeEmptyCheckoutSession = async (email, merchant) => {
    if (!email || !merchant || !merchant.id) {
      return false;
    }

    try {
      // Generate a session ID
      const sessionId = uuidv4();

      // Create a minimal session object
      const session = {
        id: sessionId,
        user_email: email,
        merchant_id: merchant.id,
        merchant_username: merchant.username || merchant.id,
        items: [],
        subtotal: 0,
        shipping_fee: 0,
        tax: 0,
        total: 0,
        status: 'initialized', // Special status to indicate it's just initialized
        created_at: new Date().toISOString(),
        expires_at: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(), // 7 days expiry
      };

      // Insert the session into the database
      await supabase.from('checkout_sessions').insert(session);
      return true;
    } catch (err) {
      return false;
    }
  };

  // Recover OTP session in case of page refresh or navigation
  const recoverOtpSession = () => {
    try {
      const sessionData = safeGetStorage('otpSession', 'session');
      if (sessionData) {
        const parsedSession = safeParse(sessionData);
        if (!parsedSession) return false;

        const now = new Date();
        const sessionTime = new Date(parsedSession.created);

        // Check if the session is still valid (less than 10 minutes old)
        if (now - sessionTime < 10 * 60 * 1000) {
          setOtpSession(parsedSession);
          return true;
        } else {
          safeRemoveStorage('otpSession', 'session');
        }
      }
      return false;
    } catch (error) {
      safeRemoveStorage('otpSession', 'session');
      return false;
    }
  };

  // Send OTP email
  const sendEmailOTP = async (email) => {
    try {
      setSendingOTP(true);
      setOtpError(null);

      // Clear any existing local session data first
      safeRemoveStorage('otpSession', 'session');
      setOtpSession(null);

      // Include merchant information with the request
      const payload = {
        contact: email,
        // Add merchant info if available
        merchant: currentMerchant
          ? {
              id: currentMerchant.id,
              username: currentMerchant.username || currentMerchant.id,
              name: currentMerchant.name || currentMerchant.id,
            }
          : null,
        // Include device fingerprint for security
        deviceFingerprint,
      };

      // Use enhanced API call
      const data = await safeApiCall(
        '/api/sendOtpEmail',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
        1
      ); // Only 1 retry for email to avoid duplicate emails

      // Store session ID for verification later (without OTP)
      const sessionData = {
        id: data.sessionId,
        email: email,
        merchant: currentMerchant,
        created: new Date().toISOString(),
      };

      // Store in state and session storage
      setOtpSession(sessionData);
      safeSetStorage('otpSession', JSON.stringify(sessionData), 'session');

      return {
        success: true,
        message: 'Verification code sent',
        sessionId: data.sessionId,
      };
    } catch (error) {
      setOtpError(error.message || 'Failed to send verification code');
      return {
        success: false,
        message: error.message || 'Failed to send verification code',
      };
    } finally {
      setSendingOTP(false);
    }
  };

  // Verify OTP
  const verifyOTP = async (otp) => {
    try {
      setVerifyingOTP(true);

      // Ensure we have an email
      if (!otpSession || !otpSession.email) {
        setOtpError('Session expired. Please try again.');
        setVerifyingOTP(false);
        return false;
      }

      const email = otpSession.email;

      // Send verification request using enhanced API call
      const data = await safeApiCall(
        '/api/verifyOtp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
            sessionId: otpSession.id,
            merchant: currentMerchant
              ? {
                  id: currentMerchant.id,
                  username: currentMerchant.username,
                }
              : null,
            deviceFingerprint,
          }),
        },
        2
      );

      if (!data.success) {
        setOtpError(data.message || 'Invalid verification code');
        setVerifyingOTP(false);
        return false;
      }

      // Update auth state
      updateAuthStatus(true, email, currentMerchant);

      // Reset OTP state
      setOtpSession(null);
      safeRemoveStorage('otpSession', 'session');
      setVerifyingOTP(false);
      setIsAuthenticating(false);

      // Broadcast authentication success event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent(AUTH_SUCCESS_EVENT, {
            detail: { email, merchant: currentMerchant },
          })
        );
      }

      return true;
    } catch (error) {
      setOtpError(error.message || 'Failed to verify code');
      setVerifyingOTP(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    updateAuthStatus(false, null);
    toast.success('Successfully logged out');
  };

  // Initialize auth state from storage and create device fingerprint
  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates after unmount

    const init = async () => {
      try {
        // First, set loading state
        setIsLoading(true);

        // Set device fingerprint
        const fingerprint = generateDeviceFingerprint();
        if (isMounted) setDeviceFingerprint(fingerprint);

        // Try to load auth token from storage
        if (typeof window !== 'undefined') {
          // STAGE 1: LOAD LOCAL DATA - No async operations to Supabase yet
          try {
            // First check for the Pocketlink auth cookie
            const cookieToken = getCookie('pocketlink_auth');

            const userData = safeGetStorage('pocketlink_user');

            // Try to load current merchant
            const merchantData = safeGetStorage(MERCHANT_KEY);
            if (merchantData) {
              try {
                const parsedMerchant = safeParse(merchantData);
                if (isMounted && parsedMerchant)
                  setCurrentMerchant(parsedMerchant);
              } catch (err) {
                // Invalid merchant data
              }
            }

            // Try to load user's merchant history
            const merchantsData = safeGetStorage(USER_MERCHANTS_KEY);
            if (merchantsData) {
              try {
                const parsedMerchants = safeParse(merchantsData);
                if (isMounted && Array.isArray(parsedMerchants))
                  setUserMerchants(parsedMerchants);
              } catch (err) {
                // Invalid merchant history data
              }
            }

            // STAGE 2: PROCESS AUTH STATE - Still no Supabase operations
            if (cookieToken && userData) {
              try {
                // Parse the user data from localStorage
                const parsedUser = safeParse(userData);

                // Set auth state - only if component is still mounted
                if (isMounted && parsedUser?.email) {
                  setIsAuthenticated(true);
                  setAuthToken(cookieToken);
                  setUserEmail(parsedUser.email);
                }

                // Write a flag to sessionStorage to share auth state across tabs
                safeSetStorage('pocketlink_auth_active', 'true', 'session');
                safeSetStorage(
                  'checkout_user_email',
                  parsedUser.email,
                  'session'
                );

                // STAGE 3: DISPATCH EVENTS - After state is set
                // Slight delay to ensure state updates have propagated
                setTimeout(() => {
                  if (!isMounted) return; // Don't dispatch if unmounted

                  // Broadcast authentication event
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(
                      new CustomEvent(AUTH_SUCCESS_EVENT, {
                        detail: {
                          email: parsedUser.email,
                          merchant: currentMerchant,
                        },
                      })
                    );

                    // Emit auth state for other components
                    window.dispatchEvent(
                      new CustomEvent('pocketlink_auth_update', {
                        detail: {
                          isAuthenticated: true,
                          email: parsedUser.email,
                          merchant: currentMerchant,
                        },
                      })
                    );
                  }
                }, 100);

                // STAGE 4: DATABASE OPERATIONS - Last step, after everything else is ready
                setTimeout(() => {
                  if (!isMounted) return; // Don't proceed if unmounted

                  // Record merchant visit if available - in a safe way
                  if (
                    currentMerchant &&
                    currentMerchant.id &&
                    parsedUser.email
                  ) {
                    // Use a separate try-catch for database operations
                    (async () => {
                      try {
                        await recordMerchantVisit(
                          parsedUser.email,
                          currentMerchant.id,
                          currentMerchant.username || currentMerchant.id
                        );
                      } catch (visitError) {
                        // Continue execution - this is not critical
                      }
                    })();
                  }
                }, 300);
              } catch (error) {
                safeRemoveStorage('pocketlink_user');
                removeCookie('pocketlink_auth');
                if (isMounted) setIsAuthenticated(false);
              }
            } else {
              // No valid auth data found
              if (isMounted) setIsAuthenticated(false);
            }
          } catch (localDataError) {
            if (isMounted) setIsAuthenticated(false);
          }
        }
      } catch (error) {
        if (isMounted) setIsAuthenticated(false);
      } finally {
        // Always set loading state to false if still mounted
        if (isMounted) setIsLoading(false);
      }
    };

    init();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []);

  // Listen for auth state changes from other tabs/windows
  useEffect(() => {
    const handleAuthStateChange = (event) => {
      if (event.detail && event.detail.isAuthenticated !== undefined) {
        setIsAuthenticated(event.detail.isAuthenticated);

        // Also update email if available
        if (event.detail.email) {
          setUserEmail(event.detail.email);
        }

        // Update merchant if available
        if (event.detail.merchant) {
          setCurrentMerchant(event.detail.merchant);
          // Record visit if authenticated
          if (event.detail.isAuthenticated && event.detail.email) {
            recordMerchantVisit(
              event.detail.email,
              event.detail.merchant.id,
              event.detail.merchant.username || event.detail.merchant.id
            );
          }
        }
      }
    };

    window.addEventListener('pocketlink_auth_update', handleAuthStateChange);

    return () => {
      window.removeEventListener(
        'pocketlink_auth_update',
        handleAuthStateChange
      );
    };
  }, []);

  // Listen for force auth check events
  useEffect(() => {
    const handleForceAuthCheck = (event) => {
      if (event.detail && event.detail.tenant) {
        const tenant = event.detail.tenant;

        // Create a merchant object (setMerchant will handle ID generation and lookup)
        const merchant = {
          username: tenant,
          name: tenant,
        };

        // Try to get any stored email
        let email = safeGetStorage('checkout_user_email', 'session');
        if (!email) {
          const userData = safeGetStorage('pocketlink_user');
          const parsed = safeParse(userData);
          email = parsed?.email;
        }

        // Check for auth cookie
        const hasAuthCookie = getCookie('pocketlink_auth');

        // If we have an auth cookie but no session, try to restore auth state
        if (hasAuthCookie) {
          if (!isAuthenticated) {
            // Force check cross-merchant auth
            checkCrossMerchantAuth(merchant);
          }
        }
      }
    };

    window.addEventListener('force-auth-check', handleForceAuthCheck);

    return () => {
      window.removeEventListener('force-auth-check', handleForceAuthCheck);
    };
  }, [isAuthenticated, userEmail]);

  // Check for interrupted auth on page load
  useEffect(() => {
    if (!isAuthenticated && !isAuthenticating) {
      // Try to recover OTP session if there was an interrupted authentication
      const recovered = recoverOtpSession();
      if (recovered) {
        setIsAuthenticating(true);
      }
    }
  }, [isAuthenticated, isAuthenticating]);

  // Context value with new functions
  const value = {
    isAuthenticated,
    isLoading,
    userEmail,
    setUserEmail,
    deviceFingerprint,
    authToken,
    isAuthenticating,
    otpSession,
    otpError,
    verifyingOTP,
    sendingOTP,
    sendEmailOTP,
    verifyOTP,
    logout,
    AUTH_SUCCESS_EVENT,
    // Cross-merchant support
    currentMerchant,
    setMerchant,
    userMerchants,
  };

  return (
    <CheckoutAuthContext.Provider value={value}>
      {children}
    </CheckoutAuthContext.Provider>
  );
};

// Custom hook for accessing context
export const useCheckoutAuth = () => {
  const context = useContext(CheckoutAuthContext);
  if (context === undefined) {
    throw new Error(
      'useCheckoutAuth must be used within a CheckoutAuthProvider'
    );
  }
  return context;
};
