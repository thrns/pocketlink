'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, ListChecks, X, CreditCard, DollarSign, Loader2, AlertTriangle } from 'lucide-react';
import { supabase } from '@/Clients/supabase/client';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { usePaymentGateway } from '@/app/contexts/PaymentGatewayContext';
import EaseBuzzPaymentGateway from './payment/EaseBuzzPaymentGateway';
import CheckoutAuthenticationDialog from './CheckoutAuthenticationDialog';
import { useCheckoutAuth } from '@/app/contexts/CheckoutAuthContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { useTenantSubscription } from '@/app/contexts/TenantSubscriptionContext';

const TenantSubscribeButton = ({ username, tenantTheme }) => {
  const [availableSubscriptions, setAvailableSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [formData, setFormData] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('form'); // 'form' | 'payment_gateway'
  const [pendingSubscriptionData, setPendingSubscriptionData] = useState(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  // Subscription checking state (like NestedCard)
  const [subscriptionCheckComplete, setSubscriptionCheckComplete] = useState(false);
  const [userHasAnySubscription, setUserHasAnySubscription] = useState(false);

  const { paymentGateways } = usePaymentGateway();
  const { isAuthenticated, setMerchant } = useCheckoutAuth();
  const { user } = useAuth();
  const { hasSubscription, userSubscriptions, userEmail, refreshSubscriptions } = useTenantSubscription();

  // Check subscription access on page load (like NestedCard)
  useEffect(() => {
    const checkUserSubscriptions = async () => {
      if (!username) {
        setSubscriptionCheckComplete(true);
        return;
      }

      // Set up merchant context for checkout auth
      if (setMerchant) {
        setMerchant({
          username: username,
          name: username,
        });
      }

      try {
        // Check if user is authenticated
        if (isAuthenticated && userEmail) {
          // User is authenticated, check subscriptions
          const hasAnySubscription = userSubscriptions.size > 0;
          setUserHasAnySubscription(hasAnySubscription);
        } else {
          // User not authenticated, check local storage like NestedCard
          const storedEmail = localStorage.getItem('subscriber_email');
          if (storedEmail) {
            // Check if this stored email has any subscriptions for this tenant
            const hasLocalSubscription = await checkLocalSubscriptions(storedEmail, username);
            setUserHasAnySubscription(hasLocalSubscription);
          } else {
            setUserHasAnySubscription(false);
          }
        }
      } catch (error) {
        console.error('Error checking user subscriptions:', error);
        setUserHasAnySubscription(false);
      } finally {
        setSubscriptionCheckComplete(true);
      }
    };

    checkUserSubscriptions();
  }, [username, isAuthenticated, userEmail, userSubscriptions]);

  // Helper function to check local subscriptions (like NestedCard logic)
  const checkLocalSubscriptions = async (email, tenantUsername) => {
    try {
      const { data: subscriptions, error } = await supabase
        .from('subscriptions')
        .select('uuid, subscribed')
        .eq('username', tenantUsername);

      if (error || !subscriptions) return false;

      // Check if user has any subscription for this tenant
      return subscriptions.some(subscription => {
        const subscribedUsers = subscription.subscribed || [];

        return subscribedUsers.some(subscriber => {
          // Check by email matching
          if (subscriber.email?.toLowerCase() === email.toLowerCase()) {
            return true;
          }

          // Check by user_id using checkout logic
          const expectedUserId = `user_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
          if (subscriber.user_id && subscriber.user_id === expectedUserId) {
            return true;
          }

          return false;
        });
      });
    } catch (error) {
      console.error('Error checking local subscriptions:', error);
      return false;
    }
  };

  // Handle button click to check authentication before opening dialog
  const handleSubscribeButtonClick = async () => {
    if (!username) return;

    // STEP 1: Check authentication FIRST (like NestedCard)
    if (!isAuthenticated) {
      // Set up merchant context before showing auth dialog
      if (username && setMerchant) {
        setMerchant({
          username: username,
          name: username,
        });
      }

      // Show authentication dialog FIRST - subscription dialog stays closed
      setIsAuthDialogOpen(true);
      return;
    }

    // STEP 2: User is authenticated, open subscription dialog
    setOpen(true);
  };

  // Fetch subscriptions when dialog opens (only for authenticated users)
  useEffect(() => {
    const handleDialogOpen = async () => {
      if (!open || !username || !isAuthenticated) return;

      // User is authenticated and dialog is open, fetch subscriptions
      await fetchAvailableSubscriptions();
    };

    handleDialogOpen();
  }, [username, open, isAuthenticated]);

  const fetchAvailableSubscriptions = async () => {
    if (!username) {
      setLoadingSubscriptions(false);
      return;
    }
    setLoadingSubscriptions(true);
    setError(null);
    setAvailableSubscriptions([]);
    setSelectedSubscription(null);

    try {
      const { data, error: subscriptionsError } = await supabase
        .from('subscriptions')
        .select(
          'uuid, subscription_name, subscription_description, form_fields, is_paid, price, currency, payment_gateway, payment_type'
        )
        .eq('username', username);

      if (subscriptionsError) {
        console.error('Error fetching subscriptions:', subscriptionsError);
        setError('Could not load subscription options.');
        setAvailableSubscriptions([]);
      } else {
        setAvailableSubscriptions(data || []);
        if (data && data.length === 1) {
          setSelectedSubscription(data[0]);
        }
      }
    } catch (err) {
      console.error('Unexpected error fetching subscriptions:', err);
      setError('An unexpected error occurred.');
      setAvailableSubscriptions([]);
    } finally {
      setLoadingSubscriptions(false);
    }
  };

  useEffect(() => {
    const subscription =
      selectedSubscription ||
      (availableSubscriptions.length === 1 ? availableSubscriptions[0] : null);

    if (subscription && subscription.form_fields) {
      try {
        const parsedFields =
          typeof subscription.form_fields === 'string'
            ? JSON.parse(subscription.form_fields)
            : subscription.form_fields;

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
  }, [selectedSubscription, availableSubscriptions]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelectSubscription = (subscription) => {
    setSelectedSubscription(subscription);
  };

  const handleBackToSubscriptionSelection = () => {
    setSelectedSubscription(null);
    setFormFields([]);
    setFormData({});
  };

  const handleSubscribe = async () => {
    const subscription =
      selectedSubscription ||
      (availableSubscriptions.length === 1 ? availableSubscriptions[0] : null);

    if (!subscription) {
      toast.error('No subscription selected.');
      return;
    }

    // Check if user already has this subscription
    if (hasSubscription(subscription.uuid)) {
      toast.success('You already have this subscription!');
      setOpen(false);
      return;
    }

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
      toast.error('Missing Required Fields', {
        description: `Please fill in: ${missingFields.join(', ')}`,
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
          color: 'white',
          borderRadius: '8px',
        },
      });
      return;
    }

    // Check if this is a paid subscription
    if (subscription.is_paid && subscription.price && subscription.price > 0) {
      // Trigger payment flow for paid subscriptions
      await handlePaidSubscription(subscription, userEmail);
      return;
    }

    // Handle free subscription
    await handleFreeSubscription(subscription, userEmail);
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

      // Parse existing subscribed data or create new object
      const currentSubscribed = currentSubscription.subscribed || [];

      // Create unique user ID (you might want to use actual user auth ID if available)
      const userId = `user_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // Add new subscriber to the subscribed object with user information
      const updatedSubscribed = [
        ...currentSubscribed,
        {
          email: userEmail,
          ...formData,
          source: 'subscription form',
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

      toast.success('Subscription Successful', {
        description: "You've been subscribed!",
        style: {
          backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD)',
          color: 'white',
          borderRadius: '8px',
        },
      });

      // Refresh subscription context
      if (refreshSubscriptions) {
        refreshSubscriptions();
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('storage', { detail: { key: 'subscriber_email' } }));
      }

      // Update local subscription status
      setUserHasAnySubscription(true);

      setOpen(false);
      setSelectedSubscription(null);
    } catch (error) {
      console.error('Subscription failed:', error);
      toast.error('Subscription Failed', {
        description: error.message || 'Something went wrong. Please try again.',
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
          color: 'white',
          borderRadius: '8px',
        },
      });
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

      // Create subscription order first (like ecommerce checkout)
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
      const orderNumber = `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Generate shorter receipt for Razorpay (max 40 chars)
      const shortReceipt = `SUB${Date.now().toString().slice(-8)}${Math.random().toString(36).substr(2, 6)}`;
      
      const requestBody = {
        key_id: gateway.api_key,
        key_secret: gateway.salt_value,
        amount: subscription.price,
        currency: subscription.currency || 'INR',
        receipt: shortReceipt, // Use shorter receipt
        notes: {
          subscription_id: subscription.uuid,
          subscription_name: subscription.subscription_name,
          customer_email: userEmail,
          payment_type: 'subscription',
          full_order_number: orderNumber, // Store full order number in notes
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

      // Verify payment with backend (same as ecommerce checkout)
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

      toast.success('Payment Successful!', {
        description: `Welcome! You've successfully subscribed to ${subscription.subscription_name}`,
        style: {
          backgroundImage: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          borderRadius: '8px',
        },
      });

      // Refresh subscription context
      if (refreshSubscriptions) {
        refreshSubscriptions();
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('storage', { detail: { key: 'subscriber_email' } }));
      }

      // Update local subscription status
      setUserHasAnySubscription(true);

      setOpen(false);
      setSelectedSubscription(null);
      setPaymentStep('form');
      setPendingSubscriptionData(null);
      
    } catch (error) {
      console.error('Payment verification failed:', error);
      toast.error('Payment verification failed', {
        description: 'Please contact support with your payment ID.',
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
          color: 'white',
          borderRadius: '8px',
        },
      });
    } finally {
      setLoading(false);
      setIsPaymentProcessing(false);
    }
  };

  const handleSubscriptionPaymentFailure = (reason) => {
    setPaymentStep('form');
    setPendingSubscriptionData(null);
    setIsPaymentProcessing(false);
    setLoading(false);
    
    toast.error('Payment failed', {
      description: 'Please try again or contact support if the issue persists.',
      style: {
        backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
        color: 'white',
        borderRadius: '8px',
      },
    });
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

      const currentSubscribed = currentSubscription.subscribed || [];

      // Add new subscriber with verified payment info and user information
      const updatedSubscribed = [
        ...currentSubscribed,
        {
          email: userEmail,
          ...formData,
          source: 'paid subscription',
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

      return { success: true };
    } catch (error) {
      console.error('Error updating subscription after payment:', error);
      throw error;
    }
  };


  const renderFormFields = () => (
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
        {availableSubscriptions.length > 1 && selectedSubscription && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBackToSubscriptionSelection}
            className="mr-2"
          >
            Back to Subscriptions
          </Button>
        )}
        <Button
          onClick={handleSubscribe}
          disabled={loading || isPaymentProcessing}
          className={`w-full text-white sm:w-auto ${
            selectedSubscription?.is_paid 
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800' 
              : 'bg-gradient-to-r from-bento-violetLight to-bento-violet'
          }`}
        >
          {loading || isPaymentProcessing 
            ? (selectedSubscription?.is_paid ? 'Processing Payment...' : 'Subscribing...') 
            : (selectedSubscription?.is_paid 
                ? `Subscribe Now - ₹${selectedSubscription.price}`
                : 'Subscribe'
              )
          }
        </Button>
      </DialogFooter>
    </div>
  );

  const renderSubscriptionSelection = () => (
    <ScrollArea className="max-h-[60vh]">
      <div className="space-y-3">
        {availableSubscriptions.map((subscription) => (
          <button
            key={subscription.uuid}
            onClick={() => handleSelectSubscription(subscription)}
            className="w-full rounded-lg border bg-gray-50 p-4 text-left transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {subscription.subscription_name}
                </h3>
                <p className="line-clamp-2 text-sm text-gray-600">
                  {subscription.subscription_description || 'No description'}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge 
                    variant={subscription.is_paid ? "secondary" : "outline"}
                    className={subscription.is_paid ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}
                  >
                    {subscription.is_paid ? 'Paid' : 'Free'}
                  </Badge>
                  {subscription.is_paid && subscription.price && (
                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                      ₹{subscription.price} {subscription.currency || 'INR'}
                    </div>
                  )}
                </div>
              </div>
              {subscription.is_paid && (
                <div className="ml-4 text-right">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );

  // Dedicated Razorpay component for subscriptions that uses pre-created orders
  const RazorpaySubscriptionPayment = ({ orderDetails, gateway, onSuccess, onFailure }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Add a ref to track if a transaction has been completed (like ecommerce)
    const transactionCompletedRef = useRef(false);

    // Function to load Razorpay checkout script (like ecommerce)
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
        // Reset transaction completed flag when starting a new payment
        transactionCompletedRef.current = false;

        // We already loaded the script in useEffect, but let's make sure it's available
        if (!window.Razorpay) {
          await loadRazorpayScript();
        }

        const subscription = pendingSubscriptionData?.subscription;
        const userEmail = pendingSubscriptionData?.userEmail;
        
        // Razorpay checkout options
        const options = {
          key: gateway.api_key,
          amount: orderDetails.amount,
          currency: orderDetails.currency,
          name: `Subscribe to ${subscription?.subscription_name}`,
          description: subscription?.subscription_description || `One-time payment for ${subscription?.subscription_name}`,
          order_id: orderDetails.id, // Use pre-created order ID
          prefill: {
            email: userEmail,
            name: formData.name || '',
          },
          theme: {
            color: tenantTheme?.color || '#9C40FF',
          },
          handler: async (response) => {
            // Only process the response if we haven't already processed a response
            // for this transaction attempt
            if (transactionCompletedRef.current) {
              return;
            }

            // Mark transaction as completed
            transactionCompletedRef.current = true;
            setIsProcessing(false);

            try {
              await onSuccess(response);
            } catch (error) {
              console.error('Error processing payment success:', error);
            }
          },
          modal: {
            ondismiss: () => {
              // Only handle dismiss if we haven't already processed a response
              if (!transactionCompletedRef.current) {
                setIsProcessing(false);
                
                setTimeout(() => {
                  onFailure('user_cancelled');
                }, 500);
              }
            },
          },
        };

        // Create and open Razorpay checkout
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        setIsProcessing(false);
        console.error('Error making payment:', error);
        setError(error.message || 'Payment initialization failed');
        onFailure('initialization_failed');
      }
    };
    
    // Initialize payment and automatically trigger Razorpay payment when component mounts (like ecommerce)
    useEffect(() => {
      if (!orderDetails || !orderDetails.id) {
        setError('Order details are missing');
        setIsLoading(false);
        return;
      }

      const initializeAndPay = async () => {
        try {
          // Set both loading and processing to true to prevent UI flicker
          setIsLoading(true);
          setIsProcessing(true);
          setError(null);

          // Reset transaction completed flag when starting a new payment
          transactionCompletedRef.current = false;

          // Load the Razorpay script
          await loadRazorpayScript();

          // Just continue directly to payment without changing loading state
          // to prevent UI flicker between states
          setTimeout(() => {
            handleRazorpayPayment();
          }, 50);
        } catch (error) {
          console.error('Error initializing Razorpay payment:', error);
          setError('Failed to initialize payment gateway');
          setIsLoading(false);
          setIsProcessing(false);
        }
      };

      initializeAndPay();

      // Add cleanup function to ensure we reset states when unmounting
      return () => {
        setIsLoading(false);
        setIsProcessing(false);
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
  };

  const renderPaymentGateway = () => {
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
  };

  // Handle authentication success (like NestedCard)
  const handleAuthSuccess = async () => {
    // Close auth dialog
    setIsAuthDialogOpen(false);

    // Refresh subscription context to get latest user subscriptions
    if (refreshSubscriptions) {
      refreshSubscriptions();
    }

    // Re-check user subscriptions after authentication
    setTimeout(async () => {
      const hasAnySubscription = userSubscriptions.size > 0;
      setUserHasAnySubscription(hasAnySubscription);

      if (hasAnySubscription) {
        toast.success('Successfully signed in! You already have subscriptions with this creator.');
        // Don't open subscription dialog since user already has subscriptions
      } else {
        toast.success('Successfully signed in! You can now subscribe.');
        // NOW open the subscription dialog after successful authentication
        setOpen(true);
      }
    }, 500);
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            // Only reset selectedSubscription if there are multiple subscriptions
            if (availableSubscriptions.length !== 1) {
              setSelectedSubscription(null);
            }
            setAvailableSubscriptions([]);
            setFormData({});
            setFormFields([]);
            setError(null);
          }
        }}
      >
        <Button
          onClick={handleSubscribeButtonClick}
          style={
            tenantTheme?.textMode === 'dark'
              ? { color: 'black', backgroundColor: 'white' }
              : { color: 'white', backgroundColor: 'black' }
          }
          variant="ghost"
          className="relative mr-2 flex items-center gap-2 rounded-full border px-4 py-2"
        >
          <Bell
            size={16}
            className={
              subscriptionCheckComplete && userHasAnySubscription
                ? ""
                : subscriptionCheckComplete
                  ? "animate-pulse"
                  : "animate-spin"
            }
          />
          <p className="text-sm">
            {!subscriptionCheckComplete
              ? 'Checking...'
              : userHasAnySubscription
                ? 'Subscribed'
                : 'Subscribe'
            }
          </p>
        </Button>

        <DialogContent className="w-[95vw] rounded-lg p-0 md:max-w-md">
          <DialogHeader className="border-b p-6">
            <DialogTitle>
              {selectedSubscription || availableSubscriptions.length === 1 ? (
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    {selectedSubscription?.subscription_name ||
                      availableSubscriptions[0]?.subscription_name}
                  </h2>
                  {availableSubscriptions.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBackToSubscriptionSelection}
                      className="-mr-2 text-gray-600"
                    >
                      <ListChecks size={16} className="mr-1.5" /> Change
                    </Button>
                  )}
                </div>
              ) : (
                'Subscribe for Updates'
              )}
            </DialogTitle>
            <DialogDescription className="pt-1 text-sm text-gray-500">
              {selectedSubscription || availableSubscriptions.length === 1
                ? (selectedSubscription || availableSubscriptions[0])
                    ?.subscription_description ||
                  'Enter your details to subscribe.'
                : 'Choose a subscription option:'}
            </DialogDescription>
          </DialogHeader>

          <div className="flex w-full items-start justify-center px-4 pb-4">
            {paymentStep === 'payment_gateway' && pendingSubscriptionData ? (
              renderPaymentGateway()
            ) : loadingSubscriptions ? (
              <p className="py-8 text-center">Loading subscriptions...</p>
            ) : error ? (
              <p className="py-8 text-center text-red-600">{error}</p>
            ) : availableSubscriptions.length === 0 ? (
              <p className="py-8 text-center text-gray-600">
                No subscription options are currently available from this
                creator.
              </p>
            ) : selectedSubscription || availableSubscriptions.length === 1 ? (
              renderFormFields()
            ) : (
              renderSubscriptionSelection()
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Authentication Dialog */}
      <CheckoutAuthenticationDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        tenant={username}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default TenantSubscribeButton;
