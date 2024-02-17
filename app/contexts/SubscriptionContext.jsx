'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/Clients/supabase/client';
import { toast } from 'sonner';
import { addMonths } from 'date-fns';
import { FEATURES } from '@/constants/features';

//===== CONTEXT CREATION =====//
const SubscriptionContext = createContext();

export function SubscriptionProvider({ children }) {
  //===== HOOKS & STATE =====//
  const { user, setUser, isPremiumUnlockedByReferrals } = useAuth();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [latestBillingInfo, setLatestBillingInfo] = useState(null);
  const [billingInfo, setBillingInfo] = useState([]);
  const [referralCheckDone, setReferralCheckDone] = useState(false);
  const isProcessingReferralsRef = useRef(false);

  // Subscription states
  const [isPremium, setIsPremium] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [inFreeTrial, setInFreeTrial] = useState(false);
  const [freeTrialEndsAt, setFreeTrialEndsAt] = useState(null);
  const [plan, setPlan] = useState('free');
  const [cycle, setCycle] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [amount, setAmount] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [billingCycle, setBillingCycle] = useState(null);
  const [currentPeriodStart, setCurrentPeriodStart] = useState(null);
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState('/purchase-premium');

  //========================= FUNCTIONS ========================= //

  //===== QUEUE ACTIVE REFERRAL REWARDS WHEN SUBSCRIPTION STARTS =====//
  const queueActiveReferralRewards = useCallback(async () => {
    if (!user?.username || !latestBillingInfo) return;

    // Check if user has active referral rewards that should be queued
    const referralRewards = user.referral_rewards;
    if (!referralRewards?.isActive || referralRewards?.queuedForSubscriptionEnd) {
      return; // No active rewards or already queued
    }

    // Check if user now has an active subscription
    const now = new Date();
    const isActivePlan = latestBillingInfo.current_period_end && 
      new Date(latestBillingInfo.current_period_end) > now;

    if (!isActivePlan) return; // No active subscription

    try {
      console.log('🔄 Queueing active referral rewards for user with new subscription');
      
      // Update referral_rewards to be queued (no expiry date until activated)
      const updatedReferralRewards = {
        ...referralRewards,
        isActive: false,
        queuedForSubscriptionEnd: true,
        expiryDate: null, // Will be set when rewards become active
      };

      const { error } = await supabase
        .from('user_data')
        .update({ referral_rewards: updatedReferralRewards })
        .eq('username', user.username);

      if (error) {
        console.error('Error queueing referral rewards:', error);
      } else {
        // Update local user state
        if (setUser) {
          setUser(prev => ({
            ...prev,
            referral_rewards: updatedReferralRewards
          }));
        }
        
        toast.info(
          `Your ${referralRewards.monthsEarned} month${referralRewards.monthsEarned > 1 ? 's' : ''} of referral rewards will activate after your current subscription ends.`,
          { duration: 6000 }
        );
      }
    } catch (error) {
      console.error('Error in queueActiveReferralRewards:', error);
    }
  }, [user, latestBillingInfo, setUser, supabase, toast, addMonths]);

  //===== SUBSCRIPTION STATUS CHECK =====//
  const checkSubscriptionStatus = useCallback(async () => {
    setLoading(true);
    if (!user) {
      setLoading(false);
      return false;
    }

    try {
      const now = new Date();

      let currentPeriodEnd = null;
      if (latestBillingInfo?.current_period_end) {
        currentPeriodEnd = new Date(latestBillingInfo.current_period_end);
      } else if (user?.subscription_end_date) {
        // Fallback to user data if billing info not available
        currentPeriodEnd = new Date(user.subscription_end_date);
      }

      // Check subscription active status from user data first, then billing info
      // Include 'on_hold' as still active (user can still access while Dodo retries)
      const isSubscriptionActive =
        (user?.subscription_status === 'active' &&
          !user?.cancel_at_period_end) ||
        user?.subscription_status === 'on_hold' ||
        (currentPeriodEnd && now < currentPeriodEnd);
      setIsActive(isSubscriptionActive);

      // Prioritize subscription tier from user data (most up-to-date)
      let currentPlan = user?.subscription_tier || 'free';
      
      // Check for active referral rewards
      const referralPremium = isPremiumUnlockedByReferrals
        ? isPremiumUnlockedByReferrals()
        : false;
      
      // Determine plan priority: Active subscription > Referral rewards > Free
      if (isSubscriptionActive && (currentPlan === 'starter' || currentPlan === 'business')) {
        // User has active paid subscription - keep their plan
        // Referral rewards should be queued, not override current plan
        currentPlan = currentPlan;
      } else if (!currentPlan || currentPlan === 'free') {
        // User has no active subscription, check other sources
        if (latestBillingInfo && isSubscriptionActive) {
          // Use billing info to determine plan
          currentPlan =
            latestBillingInfo.meta_data?.plan ||
            (latestBillingInfo.amount > 999 ? 'business' : 'starter');
        } else if (referralPremium) {
          // No active subscription, but has active referral rewards
          currentPlan = 'starter';
        }
      }
      setPlan(currentPlan);

      // Get trial data from user object (already fetched by AuthContext)
      let trialEndsAt = null;
      let isInFreeTrial = false;

      if (currentPlan === 'free' && user?.trial_used && user?.trial_end_date) {
        trialEndsAt = new Date(user.trial_end_date);

        // Check if trial is still active
        if (now < trialEndsAt) {
          isInFreeTrial = true;
        }
      }

      setInFreeTrial(isInFreeTrial);
      setFreeTrialEndsAt(trialEndsAt);

      if (latestBillingInfo) {
        setSubscriptionId(latestBillingInfo.subscription_id || null);
        setAmount(latestBillingInfo.amount || null);
        setCurrency(latestBillingInfo.currency || 'USD');
        setBillingCycle(latestBillingInfo.billing_cycle || null);
        setCurrentPeriodStart(latestBillingInfo.current_period_start || null);
        setCurrentPeriodEnd(latestBillingInfo.current_period_end || null);
        setPaymentMethod(latestBillingInfo.payment_method || null);

        if (isSubscriptionActive) {
          setCycle(latestBillingInfo.billing_cycle || 'monthly');
        }
      } else if (user && isSubscriptionActive) {
        // Fallback to user data when billing info is not available
        setSubscriptionId(user.dodo_subscription_id || null);
        setCurrentPeriodStart(user.subscription_start_date || null);
        setCurrentPeriodEnd(user.subscription_end_date || null);
        setCurrency('USD');
        setPaymentMethod('card');

        // Determine cycle and amount from subscription tier
        if (currentPlan === 'business') {
          setAmount(1499); // Default to monthly business
          setCycle('monthly');
          setBillingCycle('monthly');
        } else if (currentPlan === 'starter') {
          setAmount(599); // Default to monthly starter
          setCycle('monthly');
          setBillingCycle('monthly');
        }
      }

      // Premium access logic for freemium model:
      // - Starter/Business: active subscription only
      // - Referral rewards: always (if active)
      // - Trial users are NOT premium, they just get trial access
      const hasPremiumAccess =
        (currentPlan !== 'free' && isSubscriptionActive) || referralPremium;
      setIsPremium(hasPremiumAccess);

      if (user.is_premium && !hasPremiumAccess) {
        await supabase
          .from('user_data')
          .update({ is_premium: false })
          .eq('username', user?.username);

        if (setUser) {
          setUser((prev) => ({ ...prev, is_premium: false }));
          setIsPremium(false);
        }
      } else if (!user.is_premium && hasPremiumAccess) {
        await supabase
          .from('user_data')
          .update({ is_premium: true })
          .eq('username', user?.username);

        if (setUser) {
          setUser((prev) => ({ ...prev, is_premium: true }));
          setIsPremium(true);
        }
      }

      // Check if we need to queue active referral rewards due to new subscription
      await queueActiveReferralRewards();

      setLoading(false);
      return hasPremiumAccess;
    } catch (error) {
      console.error('Error checking subscription status:', error);
      setLoading(false);
      return false;
    }
  }, [
    user,
    latestBillingInfo,
    isPremiumUnlockedByReferrals,
    setUser,
    setLoading,
    setIsActive,
    setInFreeTrial,
    setFreeTrialEndsAt,
    setInFreeTrial,
    setFreeTrialEndsAt,
    setSubscriptionId,
    setAmount,
    setCurrency,
    setBillingCycle,
    setCurrentPeriodStart,
    setCurrentPeriodEnd,
    setPaymentMethod,
    setPlan,
    setCycle,
    setIsPremium,
    queueActiveReferralRewards,
  ]);

  //========================= USE EFFECTS ========================= //
  //===== FETCHING BILLING DATA =====//
  useEffect(() => {
    if (!user?.username) return;

    const fetchBillingData = async () => {
      const { data: billingData, error: latestBillingError } = await supabase
        .from('billing_details')
        .select('*')
        .eq('username', user.username)
        .order('created_at', { ascending: false });

      if (billingData && billingData.length > 0) {
        setBillingInfo(billingData);
        setLatestBillingInfo(billingData[0]);

        // Also update subscription status based on this data
        checkSubscriptionStatus();
      }
    };

    fetchBillingData();
  }, [user?.username]);

  //===== REFERRAL PREMIUM STATUS CHECK =====//
  useEffect(() => {
    if (!user?.username) return;

    async function checkReferralStatus() {
      await checkReferralPremiumStatus();
    }

    checkReferralStatus();

    const interval = setInterval(checkReferralStatus, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user?.username]);

  //===== SUBSCRIPTION EXPIRY EFFECT =====//
  useEffect(() => {
    if (user?.username) {
      checkSubscriptionExpiry();
    }
  }, [user?.username]);

  //===== AUTH LOADING EFFECT =====//
  useEffect(() => {
    setIsAuthLoading(!user);
  }, [!!user]);

  //===== SUBSCRIPTION STATUS EFFECT =====//
  useEffect(() => {
    if (isAuthLoading) return;

    async function checkStatus() {
      await checkSubscriptionStatus();
    }

    checkStatus();

    const interval = setInterval(
      () => {
        checkSubscriptionStatus();
      },
      30 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [user, isAuthLoading, latestBillingInfo, checkSubscriptionStatus]);

  //===== REFERRAL PREMIUM STATUS CHECK =====//
  const checkReferralPremiumStatus = useCallback(async () => {
    const callId = Date.now();

    if (!user || !user.username) {
      return false;
    }
    if (isProcessingReferralsRef.current) {
      return false;
    }

    isProcessingReferralsRef.current = true;
    try {
      const { data: currentUserData, error: userFetchError } = await supabase
        .from('user_data')
        .select('people_referred, rewards, is_premium')
        .eq('username', user?.username)
        .single();

      if (userFetchError || !currentUserData) {
        console.error(
          `[${callId}] checkReferralPremiumStatus: ERROR - Failed to fetch latest user data:`,
          userFetchError
        );
        isProcessingReferralsRef.current = false;
        return false;
      }

      const userReferrals = currentUserData.people_referred || 0;
      const userRewards = currentUserData.rewards || {};
      const now = new Date();

      const MILESTONES = [12, 24, 36];
      const rewardedMilestones = {
        milestone1: userRewards.milestone1 || false,
        milestone2: userRewards.milestone2 || false,
        milestone3: userRewards.milestone3 || false,
      };

      const isActivePlan =
        latestBillingInfo &&
        latestBillingInfo.current_period_end &&
        new Date(latestBillingInfo.current_period_end) > now;

      const newMilestonesReached = [];
      if (userReferrals >= MILESTONES[0] && !rewardedMilestones.milestone1) {
        newMilestonesReached.push({
          milestone: MILESTONES[0],
          key: 'milestone1',
        });
      }
      if (userReferrals >= MILESTONES[1] && !rewardedMilestones.milestone2) {
        newMilestonesReached.push({
          milestone: MILESTONES[1],
          key: 'milestone2',
        });
      }
      if (userReferrals >= MILESTONES[2] && !rewardedMilestones.milestone3) {
        newMilestonesReached.push({
          milestone: MILESTONES[2],
          key: 'milestone3',
        });
      }

      if (newMilestonesReached.length === 0) {
        isProcessingReferralsRef.current = false;
        return false;
      }

      const { data: existingRewards, error: searchError } = await supabase
        .from('billing_info')
        .select('*')
        .eq('username', user.username)
        .eq('payment_method', 'referral_reward')
        .order('created_at', { ascending: false });

      if (searchError) {
        console.error(
          `[${callId}] checkReferralPremiumStatus: ERROR - Fetching existing rewards:`,
          searchError
        );
        isProcessingReferralsRef.current = false;
        return false;
      }

      const processedMilestones = new Set();
      if (existingRewards && existingRewards.length > 0) {
        existingRewards.forEach((record) => {
          if (record.meta_data && record.meta_data.milestones) {
            record.meta_data.milestones.forEach((milestone) => {
              processedMilestones.add(milestone);
            });
          }
        });
      }

      const filteredMilestones = newMilestonesReached.filter(
        (item) => !processedMilestones.has(item.milestone)
      );

      if (filteredMilestones.length === 0) {
        const updatedRewardsForSync = { ...userRewards };
        let rewardsChanged = false;
        if (
          userReferrals >= MILESTONES[0] &&
          !rewardedMilestones.milestone1 &&
          processedMilestones.has(MILESTONES[0])
        ) {
          updatedRewardsForSync.milestone1 = true;
          rewardsChanged = true;
        }
        if (
          userReferrals >= MILESTONES[1] &&
          !rewardedMilestones.milestone2 &&
          processedMilestones.has(MILESTONES[1])
        ) {
          updatedRewardsForSync.milestone2 = true;
          rewardsChanged = true;
        }
        if (
          userReferrals >= MILESTONES[2] &&
          !rewardedMilestones.milestone3 &&
          processedMilestones.has(MILESTONES[2])
        ) {
          updatedRewardsForSync.milestone3 = true;
          rewardsChanged = true;
        }

        if (rewardsChanged) {
          const { error: syncError } = await supabase
            .from('user_data')
            .update({ rewards: updatedRewardsForSync })
            .eq('username', user.username);
          if (syncError) {
            console.error(
              `[${callId}] checkReferralPremiumStatus: ERROR - Syncing rewards:`,
              syncError
            );
          } else if (setUser) {
            setUser((prev) => ({ ...prev, rewards: updatedRewardsForSync }));
          }
        }
        isProcessingReferralsRef.current = false;
        return false;
      }

      newMilestonesReached.length = 0;
      filteredMilestones.forEach((item) => newMilestonesReached.push(item));

      const totalMonthsToReward = newMilestonesReached.length;

      let startDate, endDate;
      let isActive = true;
      let queuedForSubscriptionEnd = false;

      if (isActivePlan) {
        startDate = new Date(latestBillingInfo.current_period_end);
        queuedForSubscriptionEnd = true;
        isActive = false;
      } else {
        startDate = now;
      }
      endDate = addMonths(startDate, totalMonthsToReward);

      const billingRecord = {
        username: user.username,
        email: user?.email,
        subscription_id: `referral_reward_${Date.now()}`,
        amount: 0,
        currency: 'USD',
        billing_cycle: 'one-time',
        current_period_start: startDate.toISOString(),
        current_period_end: endDate.toISOString(),
        next_payment_attempt: endDate.toISOString(),
        payment_method: 'referral_reward',
        created_at: now.toISOString(),
        meta_data: {
          type: 'referral_reward',
          months_rewarded: totalMonthsToReward,
          milestones: newMilestonesReached.map((m) => m.milestone),
          source: 'referral_program',
        },
      };

      const { error: billingError } = await supabase
        .from('billing_info')
        .insert([billingRecord]);

      if (billingError) {
        console.error(
          `[${callId}] checkReferralPremiumStatus: ERROR - Creating referral reward billing record:`,
          billingError
        );
      } else {
        setBillingInfo((prev) => [
          billingRecord,
          ...(Array.isArray(prev) ? prev : []),
        ]);
        if (!queuedForSubscriptionEnd) {
          setLatestBillingInfo(billingRecord);
        }
      }

      const updatedRewards = { ...userRewards };
      newMilestonesReached.forEach((milestone) => {
        updatedRewards[milestone.key] = true;
      });

      const shouldUpdatePremium =
        !isActivePlan && !currentUserData.is_premium && isActive;

      // Prepare referral_rewards object
      const referralRewards = {
        isActive: isActive,
        expiryDate: endDate.toISOString(),
        monthsEarned: totalMonthsToReward,
        queuedForSubscriptionEnd: queuedForSubscriptionEnd,
        rewardedMilestones: newMilestonesReached.map(m => m.milestone)
      };

      const { error: userUpdateError } = await supabase
        .from('user_data')
        .update({
          rewards: updatedRewards,
          referral_rewards: referralRewards,
          ...(shouldUpdatePremium ? { is_premium: true } : {}),
        })
        .eq('username', user.username);

      if (userUpdateError) {
        console.error(
          `[${callId}] checkReferralPremiumStatus: ERROR - Updating user rewards/premium status:`,
          userUpdateError
        );
      } else {
        if (setUser) {
          setUser((prev) => ({
            ...prev,
            rewards: updatedRewards,
            referral_rewards: referralRewards,
            ...(shouldUpdatePremium ? { is_premium: true } : {}),
          }));
        }
      }

      if (!billingError) {
        if (queuedForSubscriptionEnd) {
          toast.success(
            `Congratulations! You\'ve earned ${totalMonthsToReward} month${
              totalMonthsToReward > 1 ? 's' : ''
            } of premium access that will activate after your current subscription ends.`,
            {
              duration: 6000,
            }
          );
        } else {
          toast.success(
            `Congratulations! You\'ve earned ${totalMonthsToReward} month${
              totalMonthsToReward > 1 ? 's' : ''
            } of premium access through referrals!`,
            {
              duration: 6000,
            }
          );
        }
      }
      return !billingError;
    } catch (err) {
      console.error(
        `[${callId}] checkReferralPremiumStatus: CATCH_ERROR - Unhandled error:`,
        err
      );
      return false;
    } finally {
      isProcessingReferralsRef.current = false;
    }
  }, [
    user,
    latestBillingInfo,
    isPremiumUnlockedByReferrals,
    setUser,
    supabase,
    addMonths,
    toast,
    setBillingInfo,
    setLatestBillingInfo,
  ]);

  //===== SUBSCRIPTION EXPIRY CHECK =====//
  const checkSubscriptionExpiry = useCallback(async () => {
    if (!user?.username) return false;

    try {
      if (!latestBillingInfo || !latestBillingInfo.current_period_end)
        return false;

      const currentDate = new Date();
      const renewalDate = new Date(latestBillingInfo.current_period_end);
      const hasExpired = currentDate > renewalDate;

      if (hasExpired && user.is_premium) {
        const { error: updateError } = await supabase
          .from('user_data')
          .update({ is_premium: false })
          .eq('username', user.username);

        if (updateError) return false;

        if (setUser) {
          setUser((prev) => ({ ...prev, is_premium: false }));
        }

        // Check if user has queued referral rewards to activate
        if (user.referral_rewards?.queuedForSubscriptionEnd && user.referral_rewards?.monthsEarned > 0) {
          const now = new Date();
          const expiryDate = addMonths(now, user.referral_rewards.monthsEarned);
          
          const activatedReferralRewards = {
            ...user.referral_rewards,
            isActive: true,
            queuedForSubscriptionEnd: false,
            expiryDate: expiryDate.toISOString(),
          };

          const { error: activateError } = await supabase
            .from('user_data')
            .update({ 
              referral_rewards: activatedReferralRewards,
              is_premium: true 
            })
            .eq('username', user.username);

          if (!activateError && setUser) {
            setUser((prev) => ({ 
              ...prev, 
              referral_rewards: activatedReferralRewards,
              is_premium: true 
            }));
            
            toast.success(
              `Your ${user.referral_rewards.monthsEarned} month${user.referral_rewards.monthsEarned > 1 ? 's' : ''} of referral rewards are now active!`,
              { duration: 6000 }
            );
          }
        } else {
          toast.info(
            'Your premium subscription has ended. Upgrade to continue enjoying premium features!',
            { duration: 6000 }
          );
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking subscription expiry:', error);
      return false;
    }
  }, [user, latestBillingInfo, setUser, supabase, toast, addMonths]);

  //===== UTILITY FUNCTIONS =====//
  const getRemainingTrialDays = () => {
    if (!inFreeTrial || !freeTrialEndsAt || plan !== 'free') return 0;

    const now = new Date();
    const trialEnd = new Date(freeTrialEndsAt);
    const diffTime = trialEnd - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getFormattedExpiryDate = (type = 'subscription') => {
    if (type === 'trial' && freeTrialEndsAt && plan === 'free') {
      return new Date(freeTrialEndsAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    // Use the state variable, not local variable
    if (currentPeriodEnd) {
      return new Date(currentPeriodEnd).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    // Fallback: check user data directly if state not populated
    if (user?.subscription_end_date && isActive) {
      return new Date(user.subscription_end_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    return 'Not available';
  };

  // Feature hierarchy definitions using centralized constants
  const FEATURE_HIERARCHY = {
    // Always free features (available to all users, even after trial)
    free: [
      FEATURES.STANDARD_THEMES,
      FEATURES.SOCIAL_LINKS,
      FEATURES.CONTACT_FORMS,
    ],
    // Free trial features (available during 14-day trial)
    trial: [
      FEATURES.BASIC_ANALYTICS,
      FEATURES.ADVANCED_ANALYTICS,
      FEATURES.EMAIL_MARKETING,
      FEATURES.STANDARD_THEMES,
      FEATURES.SOCIAL_LINKS,
      FEATURES.CONTACT_FORMS,
    ],
    // Starter plan features
    starter: [
      FEATURES.BASIC_ANALYTICS,
      FEATURES.STANDARD_THEMES,
      FEATURES.SOCIAL_LINKS,
      FEATURES.CONTACT_FORMS,
      FEATURES.ADVANCED_ANALYTICS,
      FEATURES.CUSTOM_DOMAIN,
      FEATURES.REMOVE_BRANDING,
      FEATURES.PAID_SUBSCRIPTIONS,
      FEATURES.CUSTOM_THEMES,
    ],
    // Business plan features (all features)
    business: [
      FEATURES.BASIC_ANALYTICS,
      FEATURES.STANDARD_THEMES,
      FEATURES.SOCIAL_LINKS,
      FEATURES.CONTACT_FORMS,
      FEATURES.ADVANCED_ANALYTICS,
      FEATURES.EMAIL_MARKETING,
      FEATURES.CUSTOM_DOMAIN,
      FEATURES.REMOVE_BRANDING,
      FEATURES.PAID_SUBSCRIPTIONS,
      FEATURES.AI_FEATURES,
      FEATURES.SALES_BOT,
      FEATURES.INTEGRATIONS,
      FEATURES.PRIORITY_SUPPORT,
      FEATURES.PREMIUM_THEMES,
      FEATURES.ECOMMERCE_SHOP,
      FEATURES.CUSTOM_THEMES,
    ],
  };

  // Helper functions for tiered access control
  const canAccessFeature = (featureName) => {
    // Always free features - available to everyone
    if (FEATURE_HIERARCHY.free.includes(featureName)) {
      return true;
    }

    // Referral premium access (keep existing logic but give starter access)
    const referralPremium = isPremiumUnlockedByReferrals
      ? isPremiumUnlockedByReferrals()
      : false;

    if (referralPremium) {
      // Referral users get starter-level access (not business)
      return FEATURE_HIERARCHY.starter.includes(featureName);
    }

    // Free users in trial
    if (plan === 'free' && inFreeTrial) {
      return FEATURE_HIERARCHY.trial.includes(featureName);
    }

    // Starter subscription
    if (plan === 'starter' && isActive) {
      return FEATURE_HIERARCHY.starter.includes(featureName);
    }

    // Business subscription
    if (plan === 'business' && isActive) {
      return FEATURE_HIERARCHY.business.includes(featureName);
    }

    // Free users after trial expired - only basic features
    if (plan === 'free' && !inFreeTrial) {
      return FEATURE_HIERARCHY.free.includes(featureName);
    }

    // No access for inactive subscriptions
    return false;
  };

  const getAccessibleFeatures = () => {
    const referralPremium = isPremiumUnlockedByReferrals
      ? isPremiumUnlockedByReferrals()
      : false;

    if (referralPremium) {
      return FEATURE_HIERARCHY.starter;
    }

    if (plan === 'free' && inFreeTrial) {
      return FEATURE_HIERARCHY.trial;
    }

    if (plan === 'starter' && isActive) {
      return FEATURE_HIERARCHY.starter;
    }

    if (plan === 'business' && isActive) {
      return FEATURE_HIERARCHY.business;
    }

    // Free users after trial expired - only basic features
    if (plan === 'free' && !inFreeTrial) {
      return FEATURE_HIERARCHY.free;
    }

    return [];
  };

  const getRequiredPlanForFeature = (featureName) => {
    if (FEATURE_HIERARCHY.trial.includes(featureName)) {
      return 'trial';
    }
    if (FEATURE_HIERARCHY.starter.includes(featureName)) {
      return 'starter';
    }
    if (FEATURE_HIERARCHY.business.includes(featureName)) {
      return 'business';
    }
    return null;
  };

  // Legacy helper functions (for backward compatibility)
  const canAccessPremiumFeatures = () => {
    // Premium features are for paid subscribers only, not trial users
    return isPremium;
  };

  const getSubscriptionPlan = () => {
    return plan;
  };

  const isFreePlan = () => {
    return plan === 'free';
  };

  const isStarterPlan = () => {
    return plan === 'starter';
  };

  const isBusinessPlan = () => {
    return plan === 'business';
  };

  const hasActiveSubscription = () => {
    return isActive && (plan === 'starter' || plan === 'business');
  };

  //===== CONTEXT PROVIDER =====//
  return (
    <SubscriptionContext.Provider
      value={{
        // Subscription state
        isPremium,
        isActive,
        inFreeTrial,
        plan,
        cycle,
        subscriptionId,
        amount,
        currency,
        billingCycle,
        currentPeriodStart,
        currentPeriodEnd,
        paymentMethod,
        checkoutUrl,
        loading,
        freeTrialEndsAt,

        // Billing info
        billingInfo,
        setBillingInfo,
        latestBillingInfo,
        setLatestBillingInfo,

        // Functions
        getRemainingTrialDays,
        getFormattedExpiryDate,
        checkSubscriptionStatus,
        checkSubscriptionExpiry,
        checkReferralPremiumStatus,
        queueActiveReferralRewards,

        // Tiered access control
        canAccessFeature,
        getAccessibleFeatures,
        getRequiredPlanForFeature,

        // Legacy functions (backward compatibility)
        canAccessPremiumFeatures,
        getSubscriptionPlan,
        isFreePlan,
        isStarterPlan,
        isBusinessPlan,
        hasActiveSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      'useSubscription must be used within a SubscriptionProvider'
    );
  }
  return context;
};
