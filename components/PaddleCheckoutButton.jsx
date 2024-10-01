'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { usePaddle } from '@/app/contexts/PaddleContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

// Price IDs configuration
const PRICE_IDS = {
  monthly: 'pri_01jwcvvr3pvt95bzmmk3psx5m6',
  yearly: 'pri_01gsz8ntc6z7npqqp6j4ys0w1w',
};

export default function PaddleCheckoutButton({
  billingCycle,
  customer,
  onSuccess,
  onError,
  className,
  disabled,
}) {
  const { isInitialized, error, openCheckout } = usePaddle();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // Setup event listeners
  useEffect(() => {
    const handleCheckoutCompleted = (event) => {
      setIsProcessing(false);
      toast.success('Payment successful! Welcome to Premium!');

      if (onSuccess) {
        onSuccess(event.detail);
      }

      // Redirect to success page or dashboard
      router.push('/dashboard?upgraded=true');
    };

    const handleCheckoutClosed = () => {
      setIsProcessing(false);
    };

    const handleCheckoutError = (event) => {
      setIsProcessing(false);
      toast.error('Payment failed. Please try again.');

      if (onError) {
        onError(event.detail);
      }
    };

    window.addEventListener(
      'paddle:checkout:completed',
      handleCheckoutCompleted
    );
    window.addEventListener('paddle:checkout:closed', handleCheckoutClosed);
    window.addEventListener('paddle:checkout:error', handleCheckoutError);

    return () => {
      window.removeEventListener(
        'paddle:checkout:completed',
        handleCheckoutCompleted
      );
      window.removeEventListener(
        'paddle:checkout:closed',
        handleCheckoutClosed
      );
      window.removeEventListener('paddle:checkout:error', handleCheckoutError);
    };
  }, [onSuccess, onError, router]);

  const handleCheckout = () => {
    if (!isInitialized) {
      toast.error('Payment system is still loading. Please try again.');
      return;
    }

    if (error) {
      toast.error('Payment system error. Please refresh the page.');
      return;
    }

    // Validate customer data
    if (!customer || !customer.email) {
      toast.error('Please log in to continue with checkout.');
      // Redirect to login page
      router.push('/login');
      return;
    }

    setIsProcessing(true);

    const items = [
      {
        priceId: PRICE_IDS[billingCycle],
        quantity: 1,
      },
    ];

    // Ensure customer object has required fields
    const validatedCustomer = {
      email: customer.email,
      ...(customer.name && { name: customer.name }),
      ...(customer.address && { address: customer.address }),
    };

    const checkoutConfig = {
      items,
      customer: validatedCustomer,
      settings: {
        displayMode: 'overlay',
        theme: 'light',
        locale: 'en',
        allowLogout: true,
        showAddDiscounts: true,
      },
      customData: {
        billingCycle,
        source: 'pricing_page',
      },
    };

    console.log('Opening checkout with config:', checkoutConfig);
    openCheckout(checkoutConfig);
  };

  const isLoading = !isInitialized || isProcessing;
  const isLoggedIn = customer && customer.email;
  const buttonDisabled = disabled || isLoading || !!error;

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
        'w-full border-0 bg-gradient-to-r from-bento-violet to-bento-indigo shadow-lg transition-shadow'
      }
    >
      {isProcessing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : !isInitialized ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        getButtonText()
      )}
    </Button>
  );
}
