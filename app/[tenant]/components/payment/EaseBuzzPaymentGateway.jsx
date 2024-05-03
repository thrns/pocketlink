'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useCheckout } from '@/app/contexts/CheckoutContext';
import { usePaymentGateway } from '@/app/contexts/PaymentGatewayContext';
import { useCheckoutAuth } from '@/app/contexts/CheckoutAuthContext';
import { Loader2, AlertTriangle, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const EaseBuzzPaymentGateway = ({
  onSuccess,
  onFailure,
  orderDetails,
  onTemporaryClose,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Add a ref to track if a transaction has been completed
  const transactionCompletedRef = useRef(false);

  const { userProfile, selectedAddress } = useCheckout();
  const { paymentGateways } = usePaymentGateway();
  const { userEmail } = useCheckoutAuth();

  // Get EaseBuzz credentials from the payment gateways
  const easebuzzGateway = paymentGateways.find(
    (gateway) => gateway.gateway_name?.toLowerCase() === 'easebuzz'
  );

  const easebuzzCreds = easebuzzGateway || {};

  // Function to load EaseBuzz script
  const loadEasebuzzScript = () => {
    return new Promise((resolve, reject) => {
      if (window.EasebuzzCheckout) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src =
          'https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/v2.0.0/easebuzz-checkout-v2.min.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject('Failed to load Easebuzz script');
        document.body.appendChild(script);
      }
    });
  };

  // Create a custom event for reopening checkout with status
  const reopenCheckoutWithStatus = (status, details = {}) => {
    // Use a custom event that only CheckoutDialog will handle
    window.dispatchEvent(
      new CustomEvent('force-checkout-open-easebuzz', {
        detail: {
          source: 'easebuzz_payment_complete',
          paymentStatus: status,
          orderNumber: orderDetails?.orderNumber,
          ...details,
        },
      })
    );
  };

  const handleEasebuzzPayment = async () => {
    try {
      // Reset transaction completed flag when starting a new payment
      transactionCompletedRef.current = false;

      // We already loaded the script in useEffect, but let's make sure it's available
      if (!window.EasebuzzCheckout) {
        await loadEasebuzzScript();
      }

      // Get current URL for success and failure redirects
      const currentUrl = window.location.href;

      // Create EaseBuzz checkout instance
      if (!easebuzzCreds?.api_key) {
        throw new Error('EaseBuzz API key is missing');
      }

      if (!easebuzzCreds?.salt_value) {
        throw new Error('EaseBuzz salt value is missing');
      }

      window.easebuzzCheckout = new window.EasebuzzCheckout(
        easebuzzCreds.api_key,
        'prod'
      );

      // Get customer information
      const customerName =
        userProfile?.name || selectedAddress?.name || 'Customer';
      const customerPhone = selectedAddress?.phone || '0000000000';
      const customerEmail =
        userEmail || userProfile?.email || 'customer@example.com';

      // Validate order details
      if (!orderDetails?.orderNumber || !orderDetails?.total) {
        throw new Error('Invalid order details');
      }

      const requestBody = {
        key: easebuzzCreds.api_key,
        txnid: orderDetails.orderNumber,
        amount: orderDetails.total.toFixed(2),
        productinfo: `Order ${orderDetails.orderNumber}`,
        firstname: customerName,
        phone: customerPhone,
        email: customerEmail,
        surl: currentUrl,
        furl: currentUrl,
        salt: easebuzzCreds.salt_value,
      };

      // Call API to initialize payment with better error handling
      const response = await fetch('/api/easebuzz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Check if response is ok and content-type is JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`
        );
      }

      // Check content type before parsing JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error('Non-JSON Response:', responseText);
        throw new Error(
          'The payment gateway API is not responding properly. Please try again later.'
        );
      }

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('JSON Parse Error:', jsonError);
        throw new Error(
          'Invalid response from payment gateway. Please try again.'
        );
      }

      if (!data.success) {
        const errorMessage = data.error || 'Failed to initialize payment';
        console.error('EaseBuzz API Error:', errorMessage);
        throw new Error(errorMessage);
      }

      if (!data.data) {
        throw new Error('Failed to get access key from payment gateway');
      }

      const ACCESS_KEY = data.data;
      console.log('EaseBuzz Access Key received:', ACCESS_KEY ? 'Yes' : 'No');

      // Close the checkout modal temporarily before initiating payment
      if (onTemporaryClose && typeof onTemporaryClose === 'function') {
        onTemporaryClose();
      }

      const options = {
        access_key: ACCESS_KEY,
        onResponse: async (response) => {
          // Only process the response if we haven't already processed a response
          // for this transaction attempt
          if (transactionCompletedRef.current) {
            return;
          }

          // Mark transaction as completed
          transactionCompletedRef.current = true;

          setIsProcessing(false);

          try {
            // Add a delay to allow UI to stabilize before reopening checkout
            setTimeout(() => {
              if (response.status === 'success') {
                // Handle successful payment
                toast.success('Payment successful!');
                reopenCheckoutWithStatus('success');
                if (onSuccess) onSuccess(response);
              } else if (response.status === 'userCancelled') {
                // User cancelled payment flow
                toast.info('Payment was cancelled');
                reopenCheckoutWithStatus('cancelled', {
                  paymentStep: 'checkout',
                });
                if (onFailure) onFailure('Cancelled Payment');
              } else if (
                response.error === 'transaction_bounced' ||
                response.error === 'Bounced'
              ) {
                // Handle transaction bounced scenario
                toast.error(
                  'Your payment session timed out. Please try again.'
                );
                reopenCheckoutWithStatus('failure', {
                  failureReason:
                    'Your payment session timed out. Please try again.',
                });
                if (onFailure) onFailure('transaction_bounced');
              } else {
                // Handle failed payment
                const errorMessage = response.error || 'Payment failed';
                toast.error(`Payment failed: ${errorMessage}`);
                reopenCheckoutWithStatus('failure', {
                  failureReason: errorMessage,
                });
                if (onFailure) onFailure(errorMessage);
              }
            }, 1000); // Delay to ensure any navigation has completed
          } catch (error) {
            console.error('Error handling response:', error);
            // Reopen modal with error
            reopenCheckoutWithStatus('failure', {
              failureReason: 'Error processing payment response',
            });

            setTimeout(() => {
              toast.error('An error occurred while processing your payment.');
              if (onFailure) onFailure('error_processing');
            }, 500);
          }
        },
      };

      // Initiate payment
      if (window.easebuzzCheckout) {
        window.easebuzzCheckout.initiatePayment(options);
      } else {
        throw new Error('EasebuzzCheckout is not loaded.');
      }
    } catch (error) {
      setIsProcessing(false);
      console.error('Error making payment:', error);
      setError(error.message || 'Payment initialization failed');
      toast.error('Payment failed: ' + (error.message || 'Unknown error'));

      // Reopen modal with initialization error
      reopenCheckoutWithStatus('failure', {
        failureReason: error.message || 'Payment initialization failed',
      });

      if (onFailure) onFailure('initialization_failed');
    }
  };

  // Initialize payment and automatically trigger EaseBuzz payment when component mounts
  useEffect(() => {
    if (!orderDetails || !orderDetails.orderNumber) {
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

        // Load the EaseBuzz script
        await loadEasebuzzScript();

        // Just continue directly to payment without changing loading state
        // to prevent UI flicker between states
        setTimeout(() => {
          handleEasebuzzPayment();
        }, 50);
      } catch (error) {
        console.error('Error initializing EaseBuzz payment:', error);
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
  }, [orderDetails?.orderNumber]);

  // Show simplified unified loading state for both loading and processing
  if (isLoading || isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Loader2 className="text-primary mb-4 h-12 w-12 animate-spin" />
        <p className="font-medium text-gray-600">Processing payment...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="mb-4 rounded-full bg-red-100 p-3">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-red-600">
          Payment Error
        </h3>
        <p className="mb-6 text-gray-600">{error}</p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => handleEasebuzzPayment()}>
            Try Again
          </Button>
          <Button onClick={() => onFailure('user_cancelled')}>
            Choose Another Method
          </Button>
        </div>
      </div>
    );
  }

  // This fallback should never be shown in normal flow
  return null;
};

export default EaseBuzzPaymentGateway;
