'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ImagePlus, Lock, Crown, Settings, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useItems } from '@/app/contexts/ItemsContext';
import { uploadFileToItemsData } from '@/lib/helpers/supabaseStorageHelpers';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/app/contexts/AuthContext';
import { supabase } from '@/Clients/supabase/client';
import DotLoader from '../../../Loaders/DotLoader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { usePaymentGateway } from '@/app/contexts/PaymentGatewayContext';
import EaseBuzzPaymentGateway from '../../../../app/[tenant]/components/payment/EaseBuzzPaymentGateway';
import CheckoutAuthenticationDialog from '../../../../app/[tenant]/components/CheckoutAuthenticationDialog';
import { useCheckoutAuth } from '@/app/contexts/CheckoutAuthContext';
import { useTenantSubscription } from '@/app/contexts/TenantSubscriptionContext';

export default function NestedCard({
  card,
  itemId,
  isEditing,
  tenant = false,
  isTenantHovered,
  themeData,
}) {
  const router = useRouter();
  const { user } = useAuth();
  const { updateItemContent } = useItems();
  const { isAuthenticated, currentMerchant, setMerchant } = useCheckoutAuth();
  
  // Use tenant subscription context for checking access (only in tenant view)
  const tenantSubscriptionContext = tenant ? (() => {
    try {
      return useTenantSubscription();
    } catch {
      return null; // Context not available in edit mode
    }
  })() : null;

  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Subscription-related state
  const [requiresSubscription, setRequiresSubscription] = useState(card?.requiresSubscription || false);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(card?.subscriptionId || '');
  const [availableSubscriptions, setAvailableSubscriptions] = useState([]);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false);
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [hasSubscriptionAccess, setHasSubscriptionAccess] = useState(null); // null = checking, true = has access, false = no access
  const [subscriptionJustCompleted, setSubscriptionJustCompleted] = useState(false); // Flag to prevent re-checking after subscription
  
  // Tenant subscription form state
  const [showTenantSubscriptionForm, setShowTenantSubscriptionForm] = useState(false);
  const [tenantSubscriptionData, setTenantSubscriptionData] = useState(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('form'); // 'form' | 'payment_gateway'
  const [pendingSubscriptionData, setPendingSubscriptionData] = useState(null);
  
  const { paymentGateways } = usePaymentGateway();

  const [imageUrl, setImageUrl] = useState(
    card?.image ||
      [
        '/shop/gradients/shopGradient1.jpg',
        '/shop/gradients/shopGradient2.jpg',
        '/shop/gradients/shopGradient3.jpg',
        '/shop/gradients/shopGradient4.jpg',
      ][Math.floor(Math.random() * 3)]
  );
  const [caption, setCaption] = useState(card?.caption || '');

  // --------------------------
  // Drag detection
  // --------------------------
  const handleMouseDown = () => setIsDragging(false);
  const handleMouseMove = () => setIsDragging(true);

  // --------------------------
  // Handle caption changes
  // --------------------------
  const handleCaptionChange = (value) => {
    setCaption(value);
    updateItemContent(itemId, { caption: value });
  };

  const handleChange = (type, value) => {
    if (type === 'image') {
      setImageUrl(value);
      updateItemContent(itemId, { image: value });
    } else {
      updateItemContent(itemId, { [type]: value });
    }
  };

  // --------------------------
  // Upload a new image
  // --------------------------
  const handleMediaUpload = async (e) => {
    if (!user?.username) {
      console.warn('User not logged in. Cannot upload.');
      return;
    }
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const fileType = file.type.split('/')[0];

      if (fileType !== 'image') {
        toast.error('Only images allowed in nested card.', {
          style: {
            backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303 )',
            color: 'white',
            borderRadius: '8px',
          },
        });
        return;
      }

      setIsUploading(true);
      try {
        const downloadURL = await uploadFileToItemsData(
          user?.username,
          'nestedCard',
          file
        );
        handleChange('image', downloadURL);
      } catch (error) {
        toast.error('Error uploading image.', {
          style: {
            backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303 )',
            color: 'white',
            borderRadius: '8px',
          },
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Fetch available merchant subscriptions
  useEffect(() => {
    if (isEditing && user?.username) {
      fetchMerchantSubscriptions();
    }
  }, [isEditing, user?.username]);

  // Check subscription access for tenant view using context
  useEffect(() => {
    if (tenant && requiresSubscription && selectedSubscriptionId && !subscriptionJustCompleted) {
      if (tenantSubscriptionContext) {
        const hasAccess = tenantSubscriptionContext.hasSubscription(selectedSubscriptionId);
        setHasSubscriptionAccess(hasAccess);
        console.log('Subscription access check via context:', {
          subscriptionId: selectedSubscriptionId,
          hasAccess,
          userEmail: tenantSubscriptionContext.userEmail
        });
      } else {
        // Fallback to database check if context not available
        checkSubscriptionAccess(selectedSubscriptionId).then(setHasSubscriptionAccess);
      }
    } else if (tenant) {
      setHasSubscriptionAccess(true); // No subscription required
    }
  }, [tenant, requiresSubscription, selectedSubscriptionId, subscriptionJustCompleted, tenantSubscriptionContext]);

  const fetchMerchantSubscriptions = async () => {
    if (!user?.username) return;
    
    setLoadingSubscriptions(true);
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('uuid, subscription_name, subscription_description, is_paid, price, currency')
        .eq('username', user.username);
      
      if (error) {
        console.error('Error fetching subscriptions:', error);
        toast.error('Failed to load subscriptions');
      } else {
        setAvailableSubscriptions(data || []);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to load subscriptions');
    } finally {
      setLoadingSubscriptions(false);
    }
  };

  // Handle subscription toggle
  const handleSubscriptionToggle = (checked) => {
    setRequiresSubscription(checked);
    updateItemContent(itemId, { requiresSubscription: checked });
    
    if (checked && availableSubscriptions.length === 0) {
      toast.error('No subscriptions available. Create a subscription first.');
      setRequiresSubscription(false);
      updateItemContent(itemId, { requiresSubscription: false });
    } else if (checked && availableSubscriptions.length > 0) {
      setShowSubscriptionDialog(true);
    } else {
      // Clear subscription when toggled off
      setSelectedSubscriptionId('');
      updateItemContent(itemId, { subscriptionId: '' });
    }
  };

  // Handle subscription selection
  const handleSubscriptionSelect = (subscriptionId) => {
    setSelectedSubscriptionId(subscriptionId);
    updateItemContent(itemId, { subscriptionId });
    setShowSubscriptionDialog(false);
  };

  // Check if user has subscription access (for tenant view)
  const checkSubscriptionAccess = async (requiredSubscriptionId) => {
    if (!requiredSubscriptionId || !tenant) return false;
    
    try {
      // Get the current path to extract tenant username
      const pathParts = window.location.pathname.split('/');
      const tenantUsername = pathParts[1]; // First part after domain
      
      if (!tenantUsername) return false;
      
      // First, get subscription data
      const { data: subscriptionData, error } = await supabase
        .from('subscriptions')
        .select('subscribed, subscription_name')
        .eq('uuid', requiredSubscriptionId)
        .eq('username', tenantUsername)
        .single();
      
      if (error || !subscriptionData) {
        console.error('Error checking subscription:', error);
        return false;
      }
      
      const subscribedUsers = subscriptionData.subscribed || [];
      
      // Check multiple sources for user identification
      let userEmails = [];
      
      // 1. Check localStorage for subscriber email (from previous subscriptions)
      const storedEmail = localStorage.getItem('subscriber_email');
      if (storedEmail) userEmails.push(storedEmail.toLowerCase());
      
      // 2. Check localStorage for tenant-specific subscription
      const tenantSubscriptionKey = `subscription_${tenantUsername}_${requiredSubscriptionId}`;
      const tenantSubscription = localStorage.getItem(tenantSubscriptionKey);
      if (tenantSubscription) {
        try {
          const subscriptionInfo = JSON.parse(tenantSubscription);
          if (subscriptionInfo.email) {
            userEmails.push(subscriptionInfo.email.toLowerCase());
          }
        } catch (e) {
          console.warn('Failed to parse tenant subscription data');
        }
      }
      
      // 3. If user is logged in, check their email
      if (user?.email) {
        userEmails.push(user.email.toLowerCase());
      }
      
      // Remove duplicates
      userEmails = [...new Set(userEmails)];
      
      if (userEmails.length === 0) return false;
      
      // Check if user has subscription access via multiple methods
      const checkoutEmail = typeof window !== 'undefined' ? sessionStorage.getItem('checkout_user_email') : null;
      
      const isSubscribed = subscribedUsers.some(subscriber => {
        // Method 1: Check by user ID using same checkout logic
        if (checkoutEmail) {
          const expectedUserId = `user_${checkoutEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
          if (subscriber.user_id && subscriber.user_id === expectedUserId) {
            return true;
          }
        }
        
        // Method 2: Check by email matching (fallback for older subscriptions)
        if (userEmails.includes(subscriber.email?.toLowerCase())) {
          return true;
        }
        
        return false;
      });
      
      // If subscribed, store the subscription info for future reference
      if (isSubscribed && storedEmail) {
        localStorage.setItem(tenantSubscriptionKey, JSON.stringify({
          email: storedEmail,
          subscriptionId: requiredSubscriptionId,
          subscriptionName: subscriptionData.subscription_name,
          subscribedAt: new Date().toISOString()
        }));
      }
      
      return isSubscribed;
    } catch (error) {
      console.error('Error checking subscription access:', error);
      return false;
    }
  };

  // --------------------------
  // Navigate to edit page on double-click
  // --------------------------
  const handleClick = async () => {
    if (isEditing || isDragging) return;

    // Check subscription access for tenant view
    if (tenant && requiresSubscription && selectedSubscriptionId) {
      // First check the cached state to avoid unnecessary database calls
      if (hasSubscriptionAccess === false) {
        // We know they don't have access, show subscription modal
        showSubscriptionModal();
        return;
      } else if (hasSubscriptionAccess === null) {
        // We haven't checked yet, check now
        const hasAccess = await checkSubscriptionAccess(selectedSubscriptionId);
        if (!hasAccess) {
          // Show subscription required message and redirect to subscribe
          showSubscriptionModal();
          return;
        }
      }
      // If hasSubscriptionAccess === true, just continue to open the card
    }

    const currentPath = window.location.pathname;

    console.log('currentPath: ', currentPath);

    // Ensure no duplicate slashes when appending
    let newPath = currentPath;

    // Check if the current path ends with an ID (numeric format)
    const pathParts = currentPath.split('/');
    if (pathParts.length > 1 && !isNaN(pathParts[pathParts.length - 1])) {
      pathParts.pop(); // Remove the last segment (ID)
      newPath = pathParts.join('/');
    }

    // Append the new card ID
    newPath = `${newPath}/${card.i}`;
    setIsLoading(true);

    if (tenant) {
      router.push(newPath);
      setIsLoading(false);
    } else if (router) {
      router.push(newPath);
      setIsLoading(false);
    }
  };

  // Parse form fields when subscription data changes
  useEffect(() => {
    if (tenantSubscriptionData && tenantSubscriptionData.form_fields) {
      try {
        const parsedFields =
          typeof tenantSubscriptionData.form_fields === 'string'
            ? JSON.parse(tenantSubscriptionData.form_fields)
            : tenantSubscriptionData.form_fields;

        const fields = Object.entries(parsedFields).map(
          ([fieldId, fieldConfig]) => ({
            key: fieldId,
            label: fieldConfig.label,
            type: fieldConfig.type,
            placeholder: fieldConfig.placeholder,
            required: fieldConfig.required || false,
            isDefault: fieldConfig.isDefault || false,
            options: fieldConfig.options || [],
            paymentProvider: fieldConfig.paymentProvider || null,
          })
        );

        setFormFields(fields);

        const initialData = {};
        fields.forEach((field) => {
          initialData[field.label] = '';
        });
        setFormData(initialData);
      } catch (err) {
        console.error('Error parsing form fields:', err);
        setFormFields([]);
        setFormData({});
      }
    } else {
      setFormFields([]);
      setFormData({});
    }
  }, [tenantSubscriptionData]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubscribe = async () => {
    if (!tenantSubscriptionData) {
      toast.error('No subscription selected.');
      return;
    }

    // Authentication is already checked before this form is shown
    // Find email field
    const emailField = formFields.find((field) => field.type === 'email');
    const userEmail = emailField ? formData[emailField.label] : null;

    if (!userEmail) {
      toast.error('Email is required');
      return;
    }

    const missingFields = formFields
      .filter((field) => field.required && !formData[field.label])
      .map((field) => field.label);

    if (missingFields.length > 0) {
      toast.error(`Missing Required Fields: ${missingFields.join(', ')}`);
      return;
    }

    // Check if this is a paid subscription
    if (tenantSubscriptionData.is_paid && tenantSubscriptionData.price && tenantSubscriptionData.price > 0) {
      // Trigger payment flow for paid subscriptions
      await handlePaidSubscription(tenantSubscriptionData, userEmail);
      return;
    }

    // Handle free subscription
    await handleFreeSubscription(tenantSubscriptionData, userEmail);
  };

  const handleFreeSubscription = async (subscription, userEmail) => {
    setLoading(true);
    try {
      // Get current subscribed data
      const { data: currentSubscription, error: fetchError } = await supabase
        .from('subscriptions')
        .select('subscribed')
        .eq('uuid', subscription.uuid)
        .single();

      if (fetchError) throw fetchError;

      // Parse existing subscribed data or create new array
      let currentSubscribed = currentSubscription.subscribed || [];
      
      // Ensure currentSubscribed is always an array
      if (!Array.isArray(currentSubscribed)) {
        currentSubscribed = [];
      }

      // Create unique user ID (unused in this implementation)
      // const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Add new subscriber to the subscribed object with user information
      const updatedSubscribed = [
        ...currentSubscribed,
        {
          email: userEmail,
          ...formData,
          source: 'nested card subscription',
          subscribed_at: new Date().toISOString(),
          // Add authenticated user information for better tracking (same as checkout)
          user_id: (() => {
            // Use the same logic as checkout - get email from session storage
            const checkoutEmail = typeof window !== 'undefined' ? sessionStorage.getItem('checkout_user_email') : null;
            const verifiedEmail = checkoutEmail || userEmail.toLowerCase();
            // Create consistent user ID based on email (same pattern as checkout)
            return `user_${verifiedEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
          })(),
          user_email: (() => {
            const checkoutEmail = typeof window !== 'undefined' ? sessionStorage.getItem('checkout_user_email') : null;
            return checkoutEmail || userEmail;
          })(),
          user_name: user?.name || user?.username || formData.name || null,
          authenticated_via: 'checkout_auth',
          subscription_type: 'free',
        },
      ];

      // Update the subscription with new subscriber
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({
          subscribed: updatedSubscribed,
        })
        .eq('uuid', subscription?.uuid);

      if (updateError) {
        console.error('Error updating subscription:', updateError);
      }

      // Store subscription info locally
      const pathParts = window.location.pathname.split('/');
      const tenantUsername = pathParts[1];
      const tenantSubscriptionKey = `subscription_${tenantUsername}_${subscription.uuid}`;
      localStorage.setItem(tenantSubscriptionKey, JSON.stringify({
        email: userEmail,
        subscriptionId: subscription.uuid,
        subscriptionName: subscription.subscription_name,
        subscribedAt: new Date().toISOString(),
        user_id: (() => {
          const checkoutEmail = typeof window !== 'undefined' ? sessionStorage.getItem('checkout_user_email') : null;
          const verifiedEmail = checkoutEmail || userEmail.toLowerCase();
          return `user_${verifiedEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
        })(),
        user_email: (() => {
          const checkoutEmail = typeof window !== 'undefined' ? sessionStorage.getItem('checkout_user_email') : null;
          return checkoutEmail || userEmail;
        })(),
        authenticated_via: 'checkout_auth'
      }));
      localStorage.setItem('subscriber_email', userEmail);

      toast.success("You've been subscribed!");
      setShowTenantSubscriptionForm(false);
      setTenantSubscriptionData(null);
      setHasSubscriptionAccess(true);
      setSubscriptionJustCompleted(true); // Prevent useEffect from re-checking
      
      // Refresh subscription context if available
      if (tenantSubscriptionContext?.refreshSubscriptions) {
        tenantSubscriptionContext.refreshSubscriptions();
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaidSubscription = async (subscription, userEmail) => {
    setIsPaymentProcessing(true);
    
    try {
      // Find the payment gateway configuration
      const gateway = paymentGateways.find(g => g.id === subscription.payment_gateway);
      
      if (!gateway) {
        throw new Error('Payment gateway not found');
      }

      // Create subscription order first
      const subscriptionOrder = await createSubscriptionOrder(subscription, userEmail, gateway);
      
      if (!subscriptionOrder.success) {
        throw new Error(subscriptionOrder.error || 'Failed to create subscription order');
      }

      // Store pending subscription data and switch to payment gateway step
      setPendingSubscriptionData({
        subscription,
        userEmail,
        gateway,
        orderDetails: subscriptionOrder,
      });
      setPaymentStep('payment_gateway');
      setIsPaymentProcessing(false);
      
    } catch (error) {
      setIsPaymentProcessing(false);
      toast.error('Payment initialization failed: ' + error.message);
      console.error('Payment error:', error);
    }
  };

  const createSubscriptionOrder = async (subscription, userEmail, gateway) => {
    try {
      // Generate unique order number for subscription
      const orderNumber = `SUB-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      
      // Generate shorter receipt for Razorpay (max 40 chars)
      const shortReceipt = `SUB${Date.now().toString().slice(-8)}${Math.random().toString(36).substring(2, 8)}`;
      
      const requestBody = {
        key_id: gateway.api_key,
        key_secret: gateway.salt_value,
        amount: subscription.price,
        currency: subscription.currency || 'INR',
        receipt: shortReceipt,
        notes: {
          subscription_id: subscription.uuid,
          subscription_name: subscription.subscription_name,
          customer_email: userEmail,
          payment_type: 'nested_card_subscription',
          full_order_number: orderNumber,
        },
      };

      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error('Non-JSON Response:', responseText);
        throw new Error('Invalid response from payment gateway');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to create subscription order');
      }

      return {
        success: true,
        order: data.order,
        key_id: data.key_id,
        orderNumber,
      };
    } catch (error) {
      console.error('Error creating subscription order:', error);
      return {
        success: false,
        error: error.message || 'Failed to create subscription order',
      };
    }
  };

  const handleSubscriptionPaymentSuccess = async (response) => {
    if (!pendingSubscriptionData) return;
    
    const { subscription, userEmail, gateway } = pendingSubscriptionData;
    
    try {
      setLoading(true);
      setIsPaymentProcessing(true);

      // Verify payment with backend
      const verifyResponse = await fetch('/api/razorpay', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          key_secret: gateway.salt_value,
        }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        throw new Error('Payment verification failed');
      }

      // Payment verified successfully, now update subscription
      await updateSubscriptionAfterPayment(subscription, userEmail, response, verifyData);

      toast.success(`Welcome! You've successfully subscribed to ${subscription.subscription_name}`);
      
      setShowTenantSubscriptionForm(false);
      setTenantSubscriptionData(null);
      setPaymentStep('form');
      setPendingSubscriptionData(null);
      setHasSubscriptionAccess(true);
      setSubscriptionJustCompleted(true); // Prevent useEffect from re-checking
      
      // Refresh subscription context if available
      if (tenantSubscriptionContext?.refreshSubscriptions) {
        tenantSubscriptionContext.refreshSubscriptions();
      }
      
    } catch (error) {
      console.error('Payment verification failed:', error);
      toast.error('Payment verification failed. Please contact support with your payment ID.');
    } finally {
      setLoading(false);
      setIsPaymentProcessing(false);
    }
  };

  const handleSubscriptionPaymentFailure = () => {
    setPaymentStep('form');
    setPendingSubscriptionData(null);
    setIsPaymentProcessing(false);
    setLoading(false);
    
    toast.error('Payment failed. Please try again or contact support if the issue persists.');
  };

  const handlePaymentGatewayClose = () => {
    setPaymentStep('form');
    setPendingSubscriptionData(null);
    setIsPaymentProcessing(false);
  };

  const updateSubscriptionAfterPayment = async (subscription, userEmail, paymentResponse, verifyData) => {
    try {
      // Get current subscribed data
      const { data: currentSubscription, error: fetchError } = await supabase
        .from('subscriptions')
        .select('subscribed')
        .eq('uuid', subscription.uuid)
        .single();

      if (fetchError) throw fetchError;

      let currentSubscribed = currentSubscription.subscribed || [];
      
      // Ensure currentSubscribed is always an array
      if (!Array.isArray(currentSubscribed)) {
        currentSubscribed = [];
      }

      // Add new subscriber with verified payment info and user information
      const updatedSubscribed = [
        ...currentSubscribed,
        {
          email: userEmail,
          ...formData,
          source: 'paid nested card subscription',
          subscribed_at: new Date().toISOString(),
          // Payment information
          payment_status: 'verified',
          payment_id: paymentResponse.razorpay_payment_id,
          order_id: paymentResponse.razorpay_order_id,
          payment_signature: paymentResponse.razorpay_signature,
          amount_paid: subscription.price,
          currency: subscription.currency || 'INR',
          payment_verified_at: new Date().toISOString(),
          verification_data: verifyData,
          // Add authenticated user information for better tracking (same as checkout)
          user_id: (() => {
            // Use the same logic as checkout - get email from session storage
            const checkoutEmail = typeof window !== 'undefined' ? sessionStorage.getItem('checkout_user_email') : null;
            const verifiedEmail = checkoutEmail || userEmail.toLowerCase();
            // Create consistent user ID based on email (same pattern as checkout)
            return `user_${verifiedEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
          })(),
          user_email: (() => {
            const checkoutEmail = typeof window !== 'undefined' ? sessionStorage.getItem('checkout_user_email') : null;
            return checkoutEmail || userEmail;
          })(),
          user_name: user?.name || user?.username || formData.name || null,
          authenticated_via: 'checkout_auth',
          subscription_type: 'paid',
        },
      ];

      // Update the subscription with new verified subscriber
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({
          subscribed: updatedSubscribed,
        })
        .eq('uuid', subscription.uuid);

      if (updateError) throw updateError;

      // Store subscription info locally
      const pathParts = window.location.pathname.split('/');
      const tenantUsername = pathParts[1];
      const tenantSubscriptionKey = `subscription_${tenantUsername}_${subscription.uuid}`;
      localStorage.setItem(tenantSubscriptionKey, JSON.stringify({
        email: userEmail,
        subscriptionId: subscription.uuid,
        subscriptionName: subscription.subscription_name,
        subscribedAt: new Date().toISOString(),
        paymentId: paymentResponse.razorpay_payment_id,
        user_id: (() => {
          const checkoutEmail = typeof window !== 'undefined' ? sessionStorage.getItem('checkout_user_email') : null;
          const verifiedEmail = checkoutEmail || userEmail.toLowerCase();
          return `user_${verifiedEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
        })(),
        user_email: (() => {
          const checkoutEmail = typeof window !== 'undefined' ? sessionStorage.getItem('checkout_user_email') : null;
          return checkoutEmail || userEmail;
        })(),
        authenticated_via: 'checkout_auth',
        subscription_type: 'paid'
      }));
      localStorage.setItem('subscriber_email', userEmail);

      return { success: true };
    } catch (error) {
      console.error('Error updating subscription after payment:', error);
      throw error;
    }
  };

  // Show subscription modal for locked content
  const showSubscriptionModal = async () => {
    const pathParts = window.location.pathname.split('/');
    let tenantUsername = pathParts[1];
    
    // If we're on dashboard, get the username from user context
    if (tenantUsername === 'dashboard' && user?.username) {
      tenantUsername = user.username;
    }
    
    // If path-based doesn't work, try subdomain
    if (!tenantUsername) {
      const hostname = window.location.hostname;
      const hostParts = hostname.split('.');
      if (hostParts.length > 1 && hostParts[0] !== 'localhost' && hostParts[0] !== 'www') {
        tenantUsername = hostParts[0];
      }
    }
    
    if (!selectedSubscriptionId || !tenantUsername) {
      toast.error('Subscription information not found.');
      return;
    }

    // STEP 1: Check authentication first
    if (!isAuthenticated) {
      // Set up merchant context before showing auth dialog
      if (tenantUsername && setMerchant) {
        setMerchant({
          username: tenantUsername,
          name: tenantUsername,
        });
      }
      
      // Show authentication dialog first
      setIsAuthDialogOpen(true);
      return;
    }

    // STEP 2: Check if user already has subscription (after auth)
    if (tenantSubscriptionContext) {
      const hasAccess = tenantSubscriptionContext.hasSubscription(selectedSubscriptionId);
      if (hasAccess) {
        // User already has subscription - allow access
        setHasSubscriptionAccess(true);
        toast.success('Access granted! You already have this subscription.');
        return;
      }
    }

    // STEP 3: User is authenticated but doesn't have subscription - show form
    try {
      // Fetch the specific subscription data
      const { data: subscriptionData, error } = await supabase
        .from('subscriptions')
        .select('uuid, subscription_name, subscription_description, form_fields, is_paid, price, currency, payment_gateway, payment_type')
        .eq('uuid', selectedSubscriptionId)
        .eq('username', tenantUsername)
        .single();

      if (error || !subscriptionData) {
        console.error('Error fetching subscription:', error);
        toast.error('Failed to load subscription details.');
        return;
      }

      setTenantSubscriptionData(subscriptionData);
      setShowTenantSubscriptionForm(true);
    } catch (error) {
      console.error('Error loading subscription:', error);
      toast.error('Failed to load subscription form.');
    }
  };

  // Handle authentication success
  const handleAuthSuccess = () => {
    // Close auth dialog
    setIsAuthDialogOpen(false);
    
    // Refresh subscription context to get latest user subscriptions
    if (tenantSubscriptionContext?.refreshSubscriptions) {
      tenantSubscriptionContext.refreshSubscriptions();
    }
    
    // Show success message and let user click Subscribe Now again
    toast.success('Successfully signed in! You can now subscribe.');
  };

  // Get tenant username for auth dialog
  const getTenantUsername = () => {
    const pathParts = window.location.pathname.split('/');
    let tenantUsername = pathParts[1];
    
    if (tenantUsername === 'dashboard' && user?.username) {
      tenantUsername = user.username;
    }
    
    if (!tenantUsername) {
      const hostname = window.location.hostname;
      const hostParts = hostname.split('.');
      if (hostParts.length > 1 && hostParts[0] !== 'localhost' && hostParts[0] !== 'www') {
        tenantUsername = hostParts[0];
      }
    }
    
    return tenantUsername;
  };

  return (
    <div
      className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-gray-100 shadow-lg transition-all duration-300 dark:bg-gray-800"
      style={{ background: card?.showPreview ? card?.background : 'inherit' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={tenant && handleClick}
      onMouseEnter={() => !tenant && setIsHovered(true)}
      onMouseLeave={() => !tenant && setIsHovered(false)}
    >
      {/* Image / Placeholder */}
      <img
        src={imageUrl}
        alt="Nested Card"
        className="h-full w-full object-cover transition-opacity duration-300"
      />

      {/* Hover Overlay: "Open" - Only show when not editing and not showing subscription dialog */}
      {isHovered && !isEditing && !showSubscriptionDialog && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50 transition-opacity duration-300">
          <span
            onClick={(e) => {
              handleClick(e);
            }}
            className="text-lg font-semibold text-white"
          >
            {isLoading ? (
              <DotLoader />
            ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                variant="default"
              >
                Open
              </Button>
            )}
          </span>
        </div>
      )}
      {/* Tenant Hover Overlay: "Open" - Only show when not editing and not showing subscription dialog */}
      {isTenantHovered && !isEditing && !showSubscriptionDialog && (
        <div
          onClick={(e) => {
            handleClick(e);
          }}
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/50 transition-opacity duration-300"
        >
          {isLoading ? (
            <DotLoader />
          ) : (
            <Button
              className={'z-50'}
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              variant="default"
            >
              Open
            </Button>
          )}
        </div>
      )}

      {/* Caption */}
      <div
        style={{ maxWidth: '80%' }}
        className={`absolute bottom-2 left-2 ${
          (caption || isEditing) && 'bg-white'
        } rounded-lg p-2 text-xs text-white`}
      >
        {isEditing ? (
          <input
            type="text"
            value={caption}
            placeholder="Add a caption"
            onChange={(e) => {
              handleCaptionChange(e.target.value);
            }}
            onMouseDown={(e) => e.stopPropagation()}
            className="border-none bg-transparent text-black focus:outline-none"
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          />
        ) : (
          caption && (
            <span className="relative line-clamp-2 text-[12px] text-black">
              {caption}
            </span>
          )
        )}
      </div>

      {/* Editing tools */}
      {isEditing && (
        <div className="absolute right-2 top-2 z-50 flex flex-col items-end gap-2">
          {/* Upload new image */}
          <Button
            asChild
            size="icon"
            variant="secondary"
            className="rounded-full bg-gradient-to-tr from-transparent via-gray-500 to-transparent text-white shadow-lg"
          >
            <label onClick={(e) => e.stopPropagation()}>
              <ImagePlus className="h-4 w-4" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleMediaUpload(e)}
                className="hidden"
              />
            </label>
          </Button>
          
          {/* Subscription settings */}
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-gradient-to-tr from-transparent via-purple-500 to-transparent text-white shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              setShowSubscriptionDialog(true);
            }}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* Subscription Settings Dialog */}
      <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
        <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Subscription Settings
            </DialogTitle>
            <DialogDescription>
              Lock this nested card behind a subscription tier
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Subscription Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="subscription-toggle" className="text-sm font-medium">
                  Require Subscription
                </Label>
                <p className="text-xs text-gray-500">
                  Users need to subscribe to access this card
                </p>
              </div>
              <Switch
                id="subscription-toggle"
                checked={requiresSubscription}
                onCheckedChange={handleSubscriptionToggle}
              />
            </div>
            
            {/* Subscription Selection */}
            {requiresSubscription && (
              <div className="space-y-2">
                <Label htmlFor="subscription-select" className="text-sm font-medium">
                  Select Subscription <span className="text-red-500">*</span>
                </Label>
                {loadingSubscriptions ? (
                  <p className="text-sm text-gray-500">Loading subscriptions...</p>
                ) : availableSubscriptions.length === 0 ? (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                    <p className="text-sm text-amber-700">
                      No subscriptions available. Create a subscription first.
                    </p>
                  </div>
                ) : (
                  <Select
                    value={selectedSubscriptionId}
                    onValueChange={handleSubscriptionSelect}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a subscription tier" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSubscriptions.map((subscription) => (
                        <SelectItem key={subscription.uuid} value={subscription.uuid}>
                          <div className="flex items-center gap-2">
                            {subscription.is_paid ? (
                              <Crown className="h-4 w-4 text-amber-500" />
                            ) : (
                              <div className="h-4 w-4 rounded-full bg-green-500" />
                            )}
                            <span>{subscription.subscription_name}</span>
                            {subscription.is_paid && subscription.price && (
                              <span className="text-sm text-gray-500">
                                (₹{subscription.price} {subscription.currency || 'INR'})
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                
                {selectedSubscriptionId && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                    <p className="text-sm text-green-700">
                      ✓ This card will be locked for non-subscribers
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Subscription Lock Indicator for Edit Mode */}
      {requiresSubscription && selectedSubscriptionId && !isEditing && !tenant && (
        <div className="absolute left-2 top-2">
          <div className="flex items-center gap-1 rounded-md bg-purple-600 px-2 py-1 text-xs text-white">
            <Lock className="h-3 w-3" />
            <span>Locked</span>
          </div>
        </div>
      )}

      {/* Subscription Lock Overlay for Tenant View */}
      {tenant && requiresSubscription && selectedSubscriptionId && hasSubscriptionAccess === false && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="rounded-full bg-purple-600 p-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white">Subscription Required</h3>
              <p className="text-sm text-gray-200 max-w-48">
                Subscribe to access this exclusive content
              </p>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                showSubscriptionModal();
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              size="sm"
            >
              <Crown className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </div>
      )}

      {/* Loading overlay for subscription check */}
      {tenant && requiresSubscription && selectedSubscriptionId && hasSubscriptionAccess === null && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-2 text-white">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
            <p className="text-sm">Checking access...</p>
          </div>
        </div>
      )}
      
      {/* Uploading Overlay */}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <p className="text-sm text-white">Uploading...</p>
        </div>
      )}
      
      {/* Tenant Subscription Form Dialog */}
      <Dialog open={showTenantSubscriptionForm} onOpenChange={(isOpen) => {
        setShowTenantSubscriptionForm(isOpen);
        if (!isOpen) {
          // Reset all subscription related state when dialog is closed
          setTenantSubscriptionData(null);
          setFormData({});
          setFormFields([]);
          setError(null);
          setPaymentStep('form');
          setPendingSubscriptionData(null);
          // Also close auth dialog if it's open
          setIsAuthDialogOpen(false);
        }
      }}>
        <DialogContent className="w-[95vw] rounded-lg p-0 md:max-w-md">
          <DialogHeader className="border-b p-6">
            <DialogTitle>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {tenantSubscriptionData?.subscription_name}
                </h2>
              </div>
            </DialogTitle>
            <DialogDescription className="pt-1 text-sm text-gray-500">
              {tenantSubscriptionData?.subscription_description || 'Enter your details to subscribe.'}
            </DialogDescription>
          </DialogHeader>

          <div className="flex w-full items-start justify-center px-4 pb-4">
            {paymentStep === 'payment_gateway' && pendingSubscriptionData ? (
              renderPaymentGateway()
            ) : error ? (
              <p className="py-8 text-center text-red-600">{error}</p>
            ) : (
              renderFormFields()
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Authentication Dialog */}
      <CheckoutAuthenticationDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        tenant={getTenantUsername()}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
  
  // Render form fields for subscription
  function renderFormFields() {
    return (
      <div className="space-y-4 w-full">
        {formFields.length === 0 ? (
          <p className="py-4 text-center text-gray-500">
            No form fields available.
          </p>
        ) : (
          formFields.map((field) => (
            <div key={field.key}>
              <Label htmlFor={field.key}>
                {field.label}
                {field.required && <span className="ml-1 text-red-500">*</span>}
              </Label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.key}
                  value={formData[field.label] || ''}
                  onChange={(e) => handleInputChange(field.label, e.target.value)}
                  placeholder={
                    field.placeholder || `Enter ${field.label.toLowerCase()}`
                  }
                  required={field.required}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  rows={3}
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.key}
                  value={formData[field.label] || ''}
                  onChange={(e) => handleInputChange(field.label, e.target.value)}
                  required={field.required}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">
                    {field.placeholder || `Select ${field.label}`}
                  </option>
                  {field.options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id={field.key}
                  type={
                    field.type === 'email'
                      ? 'email'
                      : field.type === 'number'
                        ? 'number'
                        : field.type === 'date'
                          ? 'date'
                          : 'text'
                  }
                  value={formData[field.label] || ''}
                  onChange={(e) => handleInputChange(field.label, e.target.value)}
                  placeholder={
                    field.placeholder || `Enter ${field.label.toLowerCase()}`
                  }
                  required={field.required}
                  className="mt-1"
                />
              )}
            </div>
          ))
        )}
        <DialogFooter className="mt-6 sm:justify-start">
          <Button
            onClick={handleSubscribe}
            disabled={loading || isPaymentProcessing}
            className={`w-full text-white sm:w-auto ${
              tenantSubscriptionData?.is_paid 
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800' 
                : 'bg-gradient-to-r from-bento-violetLight to-bento-violet'
            }`}
          >
            {loading || isPaymentProcessing 
              ? (tenantSubscriptionData?.is_paid ? 'Processing Payment...' : 'Subscribing...') 
              : (tenantSubscriptionData?.is_paid
                  ? `Subscribe Now - ₹${tenantSubscriptionData.price}`
                  : 'Subscribe'
                )
            }
          </Button>
        </DialogFooter>
      </div>
    );
  }
  
  // Render payment gateway for paid subscriptions
  function renderPaymentGateway() {
    if (!pendingSubscriptionData) return null;
    
    const { gateway, orderDetails } = pendingSubscriptionData;
    const gatewayName = gateway.gateway_name?.toLowerCase();
    
    // Format order details to match what the payment gateway components expect
    const formattedOrderDetails = {
      orderNumber: orderDetails.orderNumber,
      total: orderDetails.order.amount / 100, // Convert from paise to rupees
      razorpayOrderId: orderDetails.order.id, // Pre-created order ID
      isPreCreated: true, // Flag to indicate order is already created
      ...orderDetails.order
    };
    
    if (gatewayName === 'razorpay') {
      return (
        <RazorpaySubscriptionPayment
          orderDetails={formattedOrderDetails}
          gateway={gateway}
          onSuccess={handleSubscriptionPaymentSuccess}
          onFailure={handleSubscriptionPaymentFailure}
        />
      );
    } else if (gatewayName === 'easebuzz') {
      return (
        <EaseBuzzPaymentGateway
          orderDetails={formattedOrderDetails}
          onSuccess={handleSubscriptionPaymentSuccess}
          onFailure={handleSubscriptionPaymentFailure}
          onTemporaryClose={handlePaymentGatewayClose}
        />
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
          <h3 className="text-xl font-semibold text-amber-600 mb-2">
            Payment Gateway Not Supported
          </h3>
          <p className="text-gray-600 text-center mb-6">
            The selected payment gateway is not supported for subscriptions yet.
          </p>
          <Button onClick={() => setPaymentStep('form')}>Go Back</Button>
        </div>
      );
    }
  }

  // Dedicated Razorpay component for subscriptions
  function RazorpaySubscriptionPayment({ orderDetails, gateway, onSuccess, onFailure }) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const transactionCompletedRef = useRef(false);

    const loadRazorpayScript = () => {
      return new Promise((resolve, reject) => {
        if (window.Razorpay) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject('Failed to load Razorpay script');
          document.head.appendChild(script);
        }
      });
    };

    const handleRazorpayPayment = async () => {
      try {
        transactionCompletedRef.current = false;

        if (!window.Razorpay) {
          await loadRazorpayScript();
        }

        const subscription = pendingSubscriptionData?.subscription;
        const userEmail = pendingSubscriptionData?.userEmail;
        
        const options = {
          key: gateway.api_key,
          amount: orderDetails.amount,
          currency: orderDetails.currency,
          name: `Subscribe to ${subscription?.subscription_name}`,
          description: subscription?.subscription_description || `One-time payment for ${subscription?.subscription_name}`,
          order_id: orderDetails.id,
          prefill: {
            email: userEmail,
            name: formData.name || '',
          },
          theme: {
            color: themeData?.color || '#9C40FF',
          },
          handler: async (response) => {
            if (transactionCompletedRef.current) {
              return;
            }

            transactionCompletedRef.current = true;

            try {
              await onSuccess(response);
            } catch (error) {
              console.error('Error processing payment success:', error);
            }
          },
          modal: {
            ondismiss: () => {
              if (!transactionCompletedRef.current) {
                setTimeout(() => {
                  onFailure('user_cancelled');
                }, 500);
              }
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error('Error making payment:', error);
        setError(error.message || 'Payment initialization failed');
        onFailure('initialization_failed');
      }
    };
    
    useEffect(() => {
      if (!orderDetails || !orderDetails.id) {
        setError('Order details are missing');
        setIsLoading(false);
        return;
      }

      const initializeAndPay = async () => {
        try {
          setIsLoading(true);
          setError(null);

          transactionCompletedRef.current = false;

          await loadRazorpayScript();

          setTimeout(() => {
            handleRazorpayPayment();
          }, 50);
        } catch (error) {
          console.error('Error initializing Razorpay payment:', error);
          setError('Failed to initialize payment gateway');
          setIsLoading(false);
        }
      };

      initializeAndPay();

      return () => {
        setIsLoading(false);
        setError(null);
      };
    }, [orderDetails?.id]);

    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="mb-4 h-12 w-12 animate-spin text-purple-600" />
          <p className="font-medium text-gray-600">Initializing payment...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <AlertTriangle className="mb-4 h-12 w-12 text-red-500" />
          <h3 className="mb-2 text-xl font-semibold text-red-600">Payment Error</h3>
          <p className="mb-6 text-gray-600">{error}</p>
          <Button onClick={() => setPaymentStep('form')}>Go Back</Button>
        </div>
      );
    }

    return null;
  }
}
