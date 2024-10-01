'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useDodoPayments } from '@/app/contexts/DodoPaymentsContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

// Product IDs configuration for Dodo Payments
const PRODUCT_IDS = {
  starter: {
    monthly: process.env.NEXT_PUBLIC_DODO_STARTER_MONTHLY_PRODUCT_ID,
    yearly: process.env.NEXT_PUBLIC_DODO_STARTER_YEARLY_PRODUCT_ID,
  },
  business: {
    monthly: process.env.NEXT_PUBLIC_DODO_BUSINESS_MONTHLY_PRODUCT_ID,
    yearly: process.env.NEXT_PUBLIC_DODO_BUSINESS_YEARLY_PRODUCT_ID,
  },
};

export default function DodoCheckoutButton({
  billingCycle,
  planType = 'starter',
  customer,
  discountCode,
  onSuccess,
  onError,
  className,
  disabled,
}) {
  const { isInitialized, error, createCheckoutSession, isLoading } =
    useDodoPayments();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // Setup event listeners for checkout completion
  useEffect(() => {
    const handleCheckoutSuccess = (event) => {
      setIsProcessing(false);
      toast.success('Payment successful! Welcome to Premium!');

      if (onSuccess) {
        onSuccess(event.detail);
      }

      // Redirect to success page
      router.push('/purchase-premium/success');
    };

    const handleCheckoutError = (event) => {
      setIsProcessing(false);
      toast.error('Payment failed. Please try again.');

      if (onError) {
        onError(event.detail);
      }
    };

    window.addEventListener('dodo:checkout:completed', handleCheckoutSuccess);
    window.addEventListener('dodo:checkout:error', handleCheckoutError);

    return () => {
      window.removeEventListener(
        'dodo:checkout:completed',
        handleCheckoutSuccess
      );
      window.removeEventListener('dodo:checkout:error', handleCheckoutError);
    };
  }, [onSuccess, onError, router]);

  const handleCheckout = async () => {
    if (!isInitialized) {
      toast.error('Payment system is still loading. Please try again.');
      return;
    }

    if (error) {
      toast.error('Payment system error. Please refresh the page.');
      return;
    }

    // Validate customer data
    if (!customer || !customer.email || !customer.username) {
      toast.error('Please log in to continue with checkout.');
      router.push('/login');
      return;
    }

    // Get the correct product ID
    const productId = PRODUCT_IDS[planType]?.[billingCycle];
    if (!productId) {
      toast.error('Product configuration error. Please contact support.');
      console.error(`Missing product ID for ${planType} ${billingCycle}`);
      return;
    }

    setIsProcessing(true);

    // Let Dodo collect billing address during checkout

    try {
      const res = await fetch('/api/dodo-payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          customer: {
            email: customer.email,
            name: customer.name || customer.username,
            username: customer.username,
            ...(customer.phone && { phone: customer.phone }),
          },
          successUrl: window.location.origin + '/purchase-premium/success',
          quantity: 1,
          ...(discountCode && { discountCode }),
        }),
      });
      const data = await res.json();
      if (data.success && data.paymentLink) {
        window.location.href = data.paymentLink;
      } else {
        setIsProcessing(false);
        toast.error(
          data.message || 'Failed to start checkout. Please try again.'
        );
        if (onError) {
          onError(data);
        }
      }
    } catch (err) {
      setIsProcessing(false);
      toast.error(err.message || 'Failed to start checkout. Please try again.');
      if (onError) {
        onError(err);
      }
    }
  };

  const buttonDisabled = disabled || isLoading || isProcessing || !!error;
  const isLoggedIn = customer && customer.email;

  const getButtonText = () => {
    if (isProcessing) return 'Processing...';
    if (!isInitialized) return 'Loading...';
    if (!isLoggedIn) return 'Login to Get Premium';
    return 'Get Premium';
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={buttonDisabled}
      className={
        className ||
        'w-full border-0 bg-gradient-to-r from-bento-violet to-bento-indigo transition-shadow hover:shadow-lg'
      }
    >
      {isProcessing || (!isInitialized && !error) ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {getButtonText()}
        </>
      ) : (
        getButtonText()
      )}
    </Button>
  );
}
