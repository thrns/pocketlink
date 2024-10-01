'use client';
import React, { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useSubscription } from '@/app/contexts/SubscriptionContext';
import Link from 'next/link';
import { Button } from './ui/button';
import {
  Lock,
  Gift,
  Sparkles,
  Star,
  Crown,
  Clock,
  Info,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ReferralPopup from './dashboardComponents/analytics/ReferralPopup';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

/**
 * PremiumGate - A component that restricts access to features based on subscription tier.
 *
 * @param children - The feature content to render when user has access
 * @param featureName - Name of the feature for display (optional)
 * @param featureKey - The feature key to check access for (required for tier-based access)
 * @param description - Custom description text (optional)
 * @param actionText - Custom CTA button text (optional)
 * @param pricingUrl - Custom URL for the pricing page (optional)
 * @param referralUnlock - Number of referrals needed to unlock this feature (optional)
 * @param referralMessage - Message to show when feature can be unlocked via referrals (optional)
 * @param useLegacyAccess - Use old isPremium logic instead of tier-based access (optional)
 */
const PremiumGate = ({
  children,
  featureName = 'Premium Feature',
  featureKey,
  description = 'This feature is only available on premium plans.',
  actionText = 'Upgrade to Premium',
  pricingUrl = '/pricing',
  referralUnlock,
  referralMessage,
  dummyData,
  useLegacyAccess = false,
}) => {
  const { user, isPremiumUnlockedByReferrals, getReferralPremiumDetails } =
    useAuth();
  const {
    isPremium,
    inFreeTrial,
    loading,
    plan,
    getRemainingTrialDays,
    canAccessFeature,
    getRequiredPlanForFeature,
  } = useSubscription();
  const router = useRouter();
  const [showReferralInfo, setShowReferralInfo] = useState(false);

  // Use user?.people_referred directly for referral count
  const referralsCount = user?.people_referred || 0;

  // Get referral premium details
  const referralPremiumDetails = getReferralPremiumDetails();

  // Check if user has access to this specific feature
  let hasFeatureAccess;
  let requiredPlan;

  if (useLegacyAccess || !featureKey) {
    // Use legacy isPremium logic
    hasFeatureAccess = isPremium || isPremiumUnlockedByReferrals();
    requiredPlan = 'premium';
  } else {
    // Use tier-based access control
    hasFeatureAccess = canAccessFeature(featureKey);
    requiredPlan = getRequiredPlanForFeature(featureKey);
  }

  // Check premium source

  // Check if premium reward is queued (earned but will activate after current subscription)
  const isPremiumRewardQueued =
    referralPremiumDetails?.monthsEarned > 0 &&
    referralPremiumDetails?.queuedForSubscriptionEnd &&
    !referralPremiumDetails?.isActive;

  const referralProgress = referralUnlock
    ? (referralsCount / referralUnlock) * 100
    : 0;
  const remainingReferrals = referralUnlock
    ? referralUnlock - referralsCount
    : 0;

  // Calculate progress towards next month of premium
  const premiumReferralProgress = ((referralsCount % 12) / 12) * 100;
  const remainingPremiumReferrals = 12 - (referralsCount % 12);

  // Show loading state if subscription data is still loading
  if (loading) {
    return (
      <div className="flex h-full min-h-[200px] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-bento-violet"></div>
      </div>
    );
  }

  // If user has feature access, show the actual content
  if (hasFeatureAccess) {
    return <>{children}</>;
  }

  // Otherwise show the premium gate with dummy data
  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      {/* Show dummy data in the background if provided */}
      {dummyData && <div className="blur-[2px] filter">{dummyData}</div>}

      {/* Premium gate overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-3 text-center backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-lg bg-white p-4 shadow-xl">
          <div
            className={`mb-3 inline-flex items-center justify-center rounded-full p-2 ${
              requiredPlan === 'business'
                ? 'bg-amber-100'
                : requiredPlan === 'starter'
                  ? 'bg-blue-100'
                  : 'bg-gray-100'
            }`}
          >
            <Crown
              className={`h-5 w-5 ${
                requiredPlan === 'business'
                  ? 'text-amber-500'
                  : requiredPlan === 'starter'
                    ? 'text-blue-500'
                    : 'text-gray-500'
              }`}
            />
          </div>

          <h3 className="mb-2 text-lg font-bold">{featureName}</h3>
          <p className="mb-3 text-sm text-gray-600">{description}</p>

          {/* Show tier-specific messaging */}
          {plan === 'free' && !inFreeTrial && (
            <div className="mb-4 rounded-md border border-blue-100 bg-blue-50 p-2">
              <div className="flex items-center text-xs text-blue-700">
                <Clock className="mr-2 h-4 w-4 flex-shrink-0 text-blue-500" />
                <span>
                  Your 14-day free trial has expired. Upgrade to{' '}
                  {requiredPlan === 'trial'
                    ? 'any paid plan'
                    : `${requiredPlan} plan`}{' '}
                  to access this feature.
                </span>
              </div>
            </div>
          )}

          {plan === 'free' && inFreeTrial && requiredPlan !== 'trial' && (
            <div className="mb-4 rounded-md border border-amber-100 bg-amber-50 p-2">
              <div className="flex items-center text-xs text-amber-700">
                <Clock className="mr-2 h-4 w-4 flex-shrink-0 text-amber-500" />
                <span>
                  This feature requires a {requiredPlan} plan. Free trial:{' '}
                  {getRemainingTrialDays()} days remaining.
                </span>
              </div>
            </div>
          )}

          {plan === 'free' && inFreeTrial && requiredPlan === 'trial' && (
            <div className="mb-4 rounded-md border border-green-100 bg-green-50 p-2">
              <div className="flex items-center text-xs text-green-700">
                <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
                <span>
                  Free trial: {getRemainingTrialDays()} days remaining
                </span>
              </div>
            </div>
          )}

          {plan === 'starter' && requiredPlan === 'business' && (
            <div className="mb-4 rounded-md border border-amber-100 bg-amber-50 p-2">
              <div className="flex items-center text-xs text-amber-700">
                <Crown className="mr-2 h-4 w-4 flex-shrink-0 text-amber-500" />
                <span>
                  This feature is exclusive to the Business plan. Upgrade from
                  Starter to access advanced e-commerce features.
                </span>
              </div>
            </div>
          )}

          {plan === 'free' && requiredPlan === 'starter' && !inFreeTrial && (
            <div className="mb-4 rounded-md border border-blue-100 bg-blue-50 p-2">
              <div className="flex items-center text-xs text-blue-700">
                <Sparkles className="mr-2 h-4 w-4 flex-shrink-0 text-blue-500" />
                <span>
                  This feature requires a Starter plan or higher. Upgrade to
                  unlock analytics, custom domains, and more.
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => router.push('/pricing')}
              size="sm"
              className={`${
                requiredPlan === 'business'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
                  : requiredPlan === 'starter'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                    : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
              }`}
            >
              <Crown className="mr-2 h-4 w-4" />
              {requiredPlan === 'business'
                ? 'Upgrade to Business'
                : requiredPlan === 'starter'
                  ? 'Upgrade to Starter'
                  : actionText}
            </Button>

            <div className="flex items-center justify-center">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="px-2 text-xs uppercase text-gray-500">Or</span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            {/* Compact referral options */}
            <div className="flex flex-col gap-1.5">
              {/* Premium through referrals section */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-dashed border-purple-300 bg-white bg-white/50 text-xs"
                  >
                    <Gift className="mr-1.5 h-3 w-3 text-purple-500" />
                    <span className="flex-1 text-left">
                      Earn Premium with Referrals
                    </span>
                    {referralPremiumDetails?.monthsEarned > 0 && (
                      <span className="rounded-full bg-purple-100 px-1.5 py-0.5 text-xs text-purple-700">
                        {referralPremiumDetails.monthsEarned}months
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-1.5 text-sm font-medium">
                      <Gift className="h-4 w-4 text-purple-500" />
                      Premium through Referrals
                    </h4>

                    <div className="text-xs text-gray-600">
                      Refer friends and earn premium access! Every 12 referrals
                      = 1 month of premium.
                    </div>

                    <div className="mt-2">
                      <div className="mb-1 flex justify-between text-xs text-gray-600">
                        <span>Progress to next month</span>
                        <span>{referralsCount % 12}/12</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-purple-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                          style={{ width: `${premiumReferralProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    {referralPremiumDetails?.monthsEarned > 0 && (
                      <div className="mt-2 space-y-2 rounded-md border border-purple-100 bg-purple-50 p-2">
                        <div className="flex items-center text-xs text-purple-700">
                          <Star className="mr-1 h-3 w-3 text-purple-500" />
                          <span className="font-medium">
                            You've earned {referralPremiumDetails.monthsEarned}{' '}
                            month
                            {referralPremiumDetails.monthsEarned > 1
                              ? 's'
                              : ''}{' '}
                            of premium
                          </span>
                        </div>

                        {isPremiumRewardQueued && (
                          <div className="flex items-center rounded border border-amber-100 bg-amber-50 p-1.5 text-xs">
                            <Clock className="mr-1 h-3 w-3 text-amber-500" />
                            <span className="text-amber-700">
                              Will activate after your current subscription ends
                            </span>
                          </div>
                        )}

                        {referralPremiumDetails?.isActive &&
                          referralPremiumDetails?.expiryDate && (
                            <div className="flex items-center rounded border border-green-100 bg-green-50 p-1.5 text-xs">
                              <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
                              <span className="text-green-700">
                                Active until{' '}
                                {format(
                                  new Date(referralPremiumDetails.expiryDate),
                                  'MMM d, yyyy'
                                )}
                              </span>
                            </div>
                          )}
                      </div>
                    )}

                    <ReferralPopup>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 w-full border-dashed border-purple-300 bg-white bg-white/50"
                      >
                        <Gift className="mr-2 h-3 w-3 text-purple-500" />
                        View all referral rewards
                      </Button>
                    </ReferralPopup>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Feature-specific referral unlock */}
              {referralUnlock && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-dashed border-amber-300 bg-white bg-white/50 text-xs"
                    >
                      <Gift className="mr-1.5 h-3 w-3 text-amber-500" />
                      <span className="flex-1 text-left">
                        Unlock with {referralUnlock} Referrals
                      </span>
                      <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700">
                        {referralsCount}/{referralUnlock}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <div className="space-y-2">
                      <h4 className="flex items-center gap-1.5 text-sm font-medium">
                        <Gift className="h-4 w-4 text-amber-500" />
                        Unlock {featureName} with Referrals
                      </h4>

                      <div className="text-xs text-gray-600">
                        {referralMessage ||
                          `Refer ${referralUnlock} friends to unlock this feature for free!`}
                      </div>

                      <div className="mt-2">
                        <div className="mb-1 flex justify-between text-xs text-gray-600">
                          <span>Your progress</span>
                          <span>
                            {referralsCount}/{referralUnlock}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-amber-100">
                          <div
                            className="h-full rounded-full bg-amber-500"
                            style={{ width: `${referralProgress}%` }}
                          ></div>
                        </div>
                      </div>

                      <ReferralPopup>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 w-full border-dashed border-amber-300 bg-white bg-white/50"
                        >
                          <Gift className="mr-2 h-3 w-3 text-amber-500" />
                          Start referring friends
                        </Button>
                      </ReferralPopup>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumGate;
