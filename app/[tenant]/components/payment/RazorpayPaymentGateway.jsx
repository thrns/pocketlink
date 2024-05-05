'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useCheckout } from '@/app/contexts/CheckoutContext';
import { usePaymentGateway } from '@/app/contexts/PaymentGatewayContext';
import { useCheckoutAuth } from '@/app/contexts/CheckoutAuthContext';
import { Loader2, AlertTriangle, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const RazorpayPaymentGateway = ({
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

  // Get Razorpay credentials from the payment gateways
  const razorpayGateway = paymentGateways.find(
    (gateway) => gateway.gateway_name?.toLowerCase() === 'razorpay'
  );

  const razorpayCreds = razorpayGateway || {};

  // Function to load Razorpay checkout script
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

  // Create a custom event for reopening checkout with status
  const reopenCheckoutWithStatus = (status, details = {}) => {
    // Use a custom event that only CheckoutDialog will handle
    window.dispatchEvent(
      new CustomEvent('force-checkout-open-razorpay', {
        detail: {
          source: 'razorpay_payment_complete',
          paymentStatus: status,
          orderNumber: orderDetails?.orderNumber,
          ...details,
        },
      })
    );
  };

  const handleRazorpayPayment = async () => {
    try {
      // Reset transaction completed flag when starting a new payment
      transactionCompletedRef.current = false;

      // We already loaded the script in useEffect, but let's make sure it's available
      if (!window.Razorpay) {
        await loadRazorpayScript();
      }

      // Validate credentials
      if (!razorpayCreds?.api_key) {
        throw new Error('Razorpay API key is missing');
      }

      if (!razorpayCreds?.salt_value) {
        throw new Error('Razorpay key secret is missing');
      }

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

      // Validate minimum amount (Razorpay requirement)
      if (orderDetails.total < 1) {
        throw new Error('Order amount must be at least ₹1.00');
      }

      const requestBody = {
        key_id: razorpayCreds.api_key,
        key_secret: razorpayCreds.salt_value,
        amount: orderDetails.total, // Amount in INR
        currency: 'INR',
        receipt: orderDetails.orderNumber,
        notes: {
          order_number: orderDetails.orderNumber,
          customer_name: customerName,
          customer_email: customerEmail,
        },
      };

      // Call API to create Razorpay order
      const response = await fetch('/api/razorpay', {
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
        const errorMessage = data.error || 'Failed to create order';
        console.error('Razorpay API Error:', errorMessage);
        throw new Error(errorMessage);
      }

      if (!data.order || !data.order.id) {
        throw new Error('Failed to get order ID from payment gateway');
      }

      const { order, key_id } = data;
      console.log('Razorpay Order created:', order.id);

      // Close the checkout modal temporarily before initiating payment
      if (onTemporaryClose && typeof onTemporaryClose === 'function') {
        onTemporaryClose();
      }

      // Razorpay checkout options
      const options = {
        key: key_id,
        amount: order.amount, // Amount in paise
        currency: order.currency,
        name: 'PocketLink',
        description: `Order ${orderDetails.orderNumber}`,
        order_id: order.id,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: '#3399cc',
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
                key_secret: razorpayCreds.salt_value,
              }),
            });

            const verifyData = await verifyResponse.json();

            // Add a delay to allow UI to stabilize before reopening checkout
            setTimeout(() => {
              if (verifyData.success) {
                // Handle successful payment
                toast.success('Payment successful!');
                reopenCheckoutWithStatus('success');
                if (onSuccess) onSuccess(response);
              } else {
                // Handle payment verification failure
                toast.error('Payment verification failed');
                reopenCheckoutWithStatus('failure', {
                  failureReason: 'Payment verification failed',
                });
                if (onFailure) onFailure('verification_failed');
              }
            }, 1000);
          } catch (error) {
            console.error('Error verifying payment:', error);
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
        modal: {
          ondismiss: () => {
            // Only handle dismiss if we haven't already processed a response
            if (!transactionCompletedRef.current) {
              setIsProcessing(false);
              
              setTimeout(() => {
                toast.info('Payment was cancelled');
                reopenCheckoutWithStatus('cancelled', {
                  paymentStep: 'checkout',
                });
                if (onFailure) onFailure('user_cancelled');
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
      toast.error('Payment failed: ' + (error.message || 'Unknown error'));

      // Reopen modal with initialization error
      reopenCheckoutWithStatus('failure', {
        failureReason: error.message || 'Payment initialization failed',
      });

      if (onFailure) onFailure('initialization_failed');
    }
  };

  // Initialize payment and automatically trigger Razorpay payment when component mounts
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
          <Button variant="outline" onClick={() => handleRazorpayPayment()}>
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

export default RazorpayPaymentGateway;