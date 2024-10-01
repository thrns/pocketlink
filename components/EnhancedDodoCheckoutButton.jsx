'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import BillingAddressSelector from './BillingAddressSelector';

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

export default function EnhancedDodoCheckoutButton({
  billingCycle = 'monthly',
  planType = 'starter',
  customer,
  onSuccess,
  onError,
  className,
  disabled,
  // Removed trialPeriodDays - subscriptions don't offer trials
  // customBillingAddress removed - let Dodo collect address
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  // Removed trial eligibility - subscriptions don't offer trials
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const [showAddressSelector, setShowAddressSelector] = useState(false);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [validatedDiscount, setValidatedDiscount] = useState(null);
  const router = useRouter();

  // Check subscription status and trial eligibility on mount
  useEffect(() => {
    if (customer?.email) {
      checkUserEligibility();
    }
  }, [customer?.email, planType]);

  const checkUserEligibility = async () => {
    setCheckingEligibility(true);
    try {
      // Check current subscription status
      const statusResponse = await fetch('/api/subscription/status');
      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        setSubscriptionStatus(statusData);
      }

      // Subscriptions don't use trials - removed trial eligibility check

      // Validate checkout eligibility for this specific tier
      const validationResponse = await fetch(
        '/api/subscription/validate-checkout',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier: planType }),
        }
      );

      if (!validationResponse.ok && validationResponse.status !== 409) {
        const errorData = await validationResponse.json();
        console.warn('Checkout validation warning:', errorData);
      }
    } catch (error) {
      console.error('Error checking user eligibility:', error);
    } finally {
      setCheckingEligibility(false);
    }
  };

  const handleCheckout = async () => {
    if (!customer || !customer.email || !customer.username) {
      toast.error('Please log in to continue with checkout.');
      router.push('/login');
      return;
    }

    // Show address selector first
    setShowAddressSelector(true);
  };

  const handleAddressSelected = async (address) => {
    setSelectedBillingAddress(address);
    await proceedWithCheckout(address);
  };

  const handleDiscountValidated = (discountData) => {
    setValidatedDiscount(discountData);
  };

  const proceedWithCheckout = async (billingAddress) => {
    // Validate checkout eligibility first
    try {
      const validationResponse = await fetch(
        '/api/subscription/validate-checkout',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier: planType }),
        }
      );

      if (!validationResponse.ok) {
        const errorData = await validationResponse.json();

        if (validationResponse.status === 409) {
          if (errorData.code === 'ACTIVE_SUBSCRIPTION') {
            toast.error(
              'You already have an active subscription. Please cancel your current subscription before subscribing to a new plan.'
            );
            return;
          } else if (errorData.code === 'ACTIVE_TRIAL') {
            toast.error(
              'You already have an active trial for this tier or higher.'
            );
            return;
          }
        }

        toast.error(
          errorData.reason || 'Unable to start checkout at this time.'
        );
        return;
      }

      const validationData = await validationResponse.json();
      console.log('Checkout validation passed:', validationData);
    } catch (error) {
      console.error('Error validating checkout:', error);
      toast.error('Error validating checkout eligibility. Please try again.');
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

    // Subscriptions don't offer trials - always set to 0
    const trialDays = 0;

    try {
      const response = await fetch('/api/dodo-payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          planType,
          billingCycle,
          trialPeriodDays: trialDays,
          customer: {
            email: customer.email,
            name: customer.name || customer.username,
            username: customer.username,
            ...(customer.phone && { phone: customer.phone }),
          },
          billingAddress: billingAddress, // Pass selected billing address
          discountCode: validatedDiscount?.code, // Pass discount code if validated
          successUrl: window.location.origin + '/purchase-premium/success',
          cancelUrl: window.location.origin + '/pricing',
          quantity: 1,
          metadata: {
            user_id: customer.username,
            tier: planType,
            billing_cycle: billingCycle,
            trial_days: trialDays.toString(),
            source: 'pocketlink_web',
          },
        }),
      });

      const data = await response.json();

      if (data.success && data.paymentLink) {
        // Log successful checkout initiation
        console.log('Checkout initiated:', {
          planType,
          billingCycle,
          trialDays,
          productId,
          paymentLink: data.paymentLink,
        });

        // Redirect to Dodo Payments checkout
        window.location.href = data.paymentLink;
      } else {
        throw new Error(data.message || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(
        error.message || 'Failed to start checkout. Please try again.'
      );

      if (onError) {
        onError(error);
      }
    } finally {
      setIsProcessing(false);
    }
  };

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

  const buttonDisabled = disabled || isProcessing || checkingEligibility;
  const isLoggedIn = customer && customer.email;

  const getButtonText = () => {
    if (checkingEligibility) return 'Checking eligibility...';
    if (isProcessing) return 'Processing...';
    if (!isLoggedIn) return 'Login to Get Premium';

    // Check if user already has this tier or higher
    if (subscriptionStatus?.can_access_premium) {
      if (subscriptionStatus.subscription_tier === planType) {
        if (subscriptionStatus.is_cancelled) {
          return 'Reactivate Subscription';
        }
        return 'Already Subscribed';
      } else if (
        subscriptionStatus.subscription_tier === 'business' &&
        planType === 'starter'
      ) {
        return 'Already on Higher Plan';
      } else if (
        subscriptionStatus.subscription_tier === 'starter' &&
        planType === 'business'
      ) {
        return 'Upgrade to Business';
      }
    }

    // Subscriptions don't offer trials - removed trial button text

    return `Get ${planType.charAt(0).toUpperCase() + planType.slice(1)}`;
  };

  const shouldShowButton = () => {
    if (!isLoggedIn) return true;
    if (checkingEligibility) return true;

    // Don't show if user already has this exact tier and it's active
    if (
      subscriptionStatus?.subscription_tier === planType &&
      subscriptionStatus?.can_access_premium &&
      !subscriptionStatus?.is_cancelled
    ) {
      return false;
    }

    // Don't show starter button if user has business plan
    if (
      planType === 'starter' &&
      subscriptionStatus?.subscription_tier === 'business'
    ) {
      return false;
    }

    return true;
  };

  if (!shouldShowButton()) {
    return null;
  }

  return (
    <>
      <Button
        onClick={handleCheckout}
        disabled={buttonDisabled}
        className={
          className ||
          'w-full border-0 bg-gradient-to-r from-bento-violet to-bento-indigo transition-shadow hover:shadow-lg'
        }
      >
        {isProcessing || checkingEligibility ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {getButtonText()}
          </>
        ) : (
          getButtonText()
        )}
      </Button>

      <BillingAddressSelector
        isOpen={showAddressSelector}
        onClose={() => setShowAddressSelector(false)}
        onAddressSelected={handleAddressSelected}
        onDiscountValidated={handleDiscountValidated}
        selectedAddressId={selectedBillingAddress?.id}
        productId={PRODUCT_IDS[planType]?.[billingCycle]}
        showDiscountInput={true}
      />
    </>
  );
}
