'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/Clients/supabase/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { signout } from '@/lib/actions/auth-actions';
import isEqual from 'lodash/isEqual';
import { addMonths, addYears, isAfter, isBefore, parseISO } from 'date-fns';
import {
  getUserData,
  storeUserData,
  updateUserData,
  clearUserData,
} from '@/lib/utils/sessionUtils';

//====== CONTEXT CREATION ======//

// Create the AuthContext
export const AuthContext = createContext();

// Define premium referral milestones
const PREMIUM_MILESTONES = [12, 24, 36];

//====== AUTH PROVIDER COMPONENT ======//

export const AuthProvider = ({ children }) => {
  //====== HOOKS & STATE ======//

  const router = useRouter();

  const [user, setUser] = useState(() => {
    // Use the new hybrid approach to get user data
    return getUserData(Cookies);
  });

  const [referralsCount, setReferralsCount] = useState(
    user?.people_referred || 0
  );
  const [notifications, setNotifications] = useState(user?.notifications || []);
  const [billingInfo, setBillingInfo] = useState(user?.billing_info || []);

  //====== USER INITIALIZATION EFFECT ======//

  //use cookies users and update "user" is no  user is found
  useEffect(() => {
    const getUser = async () => {
      // Only check cookies if user is null/undefined to prevent loops
      if (user) return;

      const storedUser = await Cookies.get('user_data');
      const fallbackStoredUser = await Cookies.get('fallback_user_data');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else if (fallbackStoredUser) {
        setUser(JSON.parse(fallbackStoredUser));
      }
    };

    getUser();
  }, []); // Remove user dependency to prevent infinite loop

  //====== USER SYNCHRONIZATION EFFECT ======//

  useEffect(() => {
    const syncUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (authUser && authUser?.email) {
        const { data: userData, error } = await supabase
          .from('user_data')
          .select('*')
          .eq('email', authUser.email)
          .single();

        if (userData?.uuid != authUser?.id) {
          const { authIdError } = await supabase
            .from('user_data')
            .update({ uuid: authUser?.id })
            .eq('email', authUser?.email);

          if (authIdError) {
            console.error('Error updating authId:', authIdError);
          }
        }

        if (error) {
          console.error('Error fetching user data for sync:', error);
          return;
        }

        const inUserSync = await isEqual(userData, user);

        if (inUserSync) {
          console.log('User in sync, Good to go');
          return;
        }

        console.log('User not in sync, syncing user');

        // Use the new hybrid storage approach
        storeUserData(userData, Cookies);
        setUser(userData);
        setReferralsCount(userData?.people_referred || 0);
      }
    };

    // Only sync if we have a user email
    if (user?.email) {
      syncUser();
    }
  }, [user?.email]); // Only depend on user.email, not entire user object

  //====== USER VALIDATION AND LOGIN TRACKING ======//

  // Check for null is_premium and update loggedin_at if needed
  useEffect(() => {
    const handleUserChecks = async () => {
      if (!user || !user?.username) return;

      // Update referralsCount when user changes
      setReferralsCount(user?.people_referred || 0);

      // Sign out if is_premium is null
      if (user && user?.username && user?.is_premium === undefined) {
        setUser(null);
        localStorage.removeItem('user');

        await Cookies.remove('user_data');
        await Cookies.remove('fallback_user_data');

        await signout();

        setUser(null);
        toast.error('Session expired. Please sign in again.');
        router.push('/login');
        return;
      }

      // Check if loggedin_at is not today
      const currentDate = new Date().toISOString().split('T')[0];
      const lastLoginDate = user.loggedin_at
        ? new Date(user.loggedin_at).toISOString().split('T')[0]
        : null;

      if (lastLoginDate !== currentDate) {
        // Update loggedin_at in Supabase
        try {
          const { error } = await supabase
            .from('user_data')
            .update({ loggedin_at: new Date().toISOString() })
            .eq('uuid', user.uuid);

          if (error) {
            console.error('Error updating login timestamp:', error);
          } else {
            // Update local user data
            const updatedUser = {
              ...user,
              loggedin_at: new Date().toISOString(),
            };
            setUser(updatedUser);

            // Update user data using hybrid storage approach
            updateUserData(updatedUser, Cookies);
          }
        } catch (err) {
          console.error('Failed to update login timestamp:', err);
        }
      }
    };

    handleUserChecks();
  }, [user]);

  //====== REFERRAL FEATURE UNLOCK FUNCTIONS ======//

  // Function to check if a feature is unlocked through referrals
  const isFeatureUnlockedByReferrals = (featureName) => {
    if (!user) return false;

    const userReferrals = user?.people_referred || 0;

    switch (featureName) {
      case 'theme':
        return userReferrals >= 5;
      case 'extended_cards':
        return userReferrals >= 10;
      case 'analytics_map':
        return userReferrals >= 15;
      case 'link_performance':
        return userReferrals >= 20;
      case 'automation':
        return userReferrals >= 25;
      case 'custom_domain':
        return userReferrals >= 30;
      case 'premium_access':
        return userReferrals % 12 === 0 && userReferrals < 40;
      default:
        return false;
    }
  };

  //====== REFERRAL PREMIUM MANAGEMENT ======//

  // Get referral premium details
  const getReferralPremiumDetails = () => {
    if (!user)
      return {
        monthsEarned: 0,
        isActive: false,
        expiryDate: null,
        queuedForSubscriptionEnd: false,
      };

    // Calculate months earned based on referral count
    const referralCount = user.people_referred || 0;
    const monthsEarned = Math.floor(referralCount / 12);

    // Check if any rewards have been granted
    const hasRewardedMilestones =
      user.referral_rewards?.rewardedMilestones?.length > 0;

    // Check if rewards are queued for subscription end
    const queuedForSubscriptionEnd =
      user.referral_rewards?.queuedForSubscriptionEnd || false;

    // Check if referral premium is currently active
    const isActive = user.referral_rewards?.isActive || false;

    // Get expiry date if available
    const expiryDate = user.referral_rewards?.expiryDate || null;

    return {
      monthsEarned,
      isActive,
      expiryDate,
      queuedForSubscriptionEnd,
      hasRewardedMilestones,
    };
  };

  // Add or update this function in the AuthContext component
  const isPremiumUnlockedByReferrals = () => {
    if (!user) return false;

    // Check if user has referral rewards that are active
    const referralDetails = getReferralPremiumDetails();
    return referralDetails.isActive;
  };

  //====== CONTEXT PROVIDER ======//

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        referralsCount,
        setReferralsCount,
        isFeatureUnlockedByReferrals,
        notifications,
        setNotifications,
        getReferralPremiumDetails,
        isPremiumUnlockedByReferrals,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//====== HOOK EXPORT ======//

export const useAuth = () => useContext(AuthContext);
