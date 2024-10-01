'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import {
  Loader2,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  MessageCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function PlanChangeButton({
  currentPlan,
  targetPlan,
  billingCycle,
  onSuccess,
  onError,
  className,
  disabled,
}) {
  const [isChanging, setIsChanging] = useState(false);
  const router = useRouter();

  // Determine the type of change
  const currentTierValue =
    currentPlan === 'business' ? 2 : currentPlan === 'starter' ? 1 : 0;
  const targetTierValue =
    targetPlan === 'business' ? 2 : targetPlan === 'starter' ? 1 : 0;

  const isUpgrade = targetTierValue > currentTierValue;
  const isDowngrade = targetTierValue < currentTierValue;
  const isSameTier = currentTierValue === targetTierValue;

  // Don't show button if it's the same tier
  if (isSameTier) {
    return null;
  }

  const getButtonText = () => {
    if (isChanging) return 'Processing...';
    if (isUpgrade)
      return `Upgrade to ${targetPlan.charAt(0).toUpperCase() + targetPlan.slice(1)}`;
    if (isDowngrade) return 'Contact Support';
    return `Switch to ${targetPlan.charAt(0).toUpperCase() + targetPlan.slice(1)}`;
  };

  const getButtonIcon = () => {
    if (isChanging) return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
    if (isUpgrade) return <ArrowUp className="mr-2 h-4 w-4" />;
    if (isDowngrade) return <MessageCircle className="mr-2 h-4 w-4" />;
    return <RefreshCw className="mr-2 h-4 w-4" />;
  };

  const getButtonStyle = () => {
    if (isUpgrade) {
      return 'w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white';
    }
    if (isDowngrade) {
      return 'w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white';
    }
    return 'w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white';
  };

  const handlePlanChange = async () => {
    if (disabled || isChanging) return;

    // Block downgrades - show contact support message
    if (isDowngrade) {
      const contactSupport = window.confirm(
        `Downgrades are not available through self-service. Please contact our support team for assistance with plan changes.\n\nWould you like to contact support now?`
      );
      if (contactSupport) {
        // Open support contact (could be email, support page, etc.)
        window.open(
          'mailto:support@pocketlink.co?subject=Plan Change Request',
          '_blank'
        );
      }
      return;
    }

    // Show confirmation dialog for upgrades
    if (isUpgrade) {
      const confirmed = window.confirm(
        `Upgrade to ${targetPlan}? You'll be charged the prorated amount immediately and get access to new features right away.`
      );
      if (!confirmed) return;
    }

    setIsChanging(true);

    try {
      const response = await fetch('/api/subscription/change-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType: targetPlan,
          billingCycle: billingCycle,
          // Let the API determine the best proration behavior
        }),
      });

      const data = await response.json();

      if (data.success) {
        const changeType = data.change_type;
        const effectiveDate = data.details.immediate_change
          ? 'immediately'
          : `on ${new Date(data.effective_date).toLocaleDateString()}`;

        toast.success(
          `Successfully ${changeType}d to ${targetPlan}! Changes take effect ${effectiveDate}.`
        );

        if (onSuccess) {
          onSuccess(data);
        }

        // Refresh the page to show updated status
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(data.error || `Failed to change plan. Please try again.`);
        if (onError) {
          onError(data);
        }
      }
    } catch (error) {
      console.error('Error changing plan:', error);
      toast.error(
        'Failed to change plan. Please try again or contact support.'
      );
      if (onError) {
        onError(error);
      }
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <Button
      onClick={handlePlanChange}
      disabled={disabled || isChanging}
      className={className || getButtonStyle()}
    >
      {getButtonIcon()}
      {getButtonText()}
    </Button>
  );
}
