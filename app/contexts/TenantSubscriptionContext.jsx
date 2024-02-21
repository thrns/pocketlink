'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/Clients/supabase/client';

const TenantSubscriptionContext = createContext();

export const TenantSubscriptionProvider = ({ children, username }) => {
  const [userSubscriptions, setUserSubscriptions] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  // Get user email from multiple sources
  const getUserEmail = () => {
    // 1. Check sessionStorage for checkout email
    const checkoutEmail = typeof window !== 'undefined' ? sessionStorage.getItem('checkout_user_email') : null;
    if (checkoutEmail) {
      console.log('Found checkout email:', checkoutEmail);
      return checkoutEmail.toLowerCase();
    }

    // 2. Check localStorage for subscriber email
    const storedEmail = typeof window !== 'undefined' ? localStorage.getItem('subscriber_email') : null;
    if (storedEmail) {
      console.log('Found stored email:', storedEmail);
      return storedEmail.toLowerCase();
    }

    console.log('No user email found');
    return null;
  };

  // Check all merchant subscriptions for the current user
  const checkUserSubscriptions = async () => {
    if (!username) return;

    const email = getUserEmail();
    if (!email) {
      setUserSubscriptions(new Set());
      setUserEmail(null);
      return;
    }

    setLoading(true);
    setUserEmail(email);

    try {
      // Get all subscriptions for this merchant
      const { data: subscriptions, error } = await supabase
        .from('subscriptions')
        .select('uuid, subscribed')
        .eq('username', username);

      if (error) {
        console.error('Error fetching merchant subscriptions:', error);
        setUserSubscriptions(new Set());
        return;
      }

      const userSubscriptionIds = new Set();

      // Check each subscription to see if user has access
      subscriptions?.forEach(subscription => {
        let subscribedUsers = subscription.subscribed || [];
        
        // Parse JSON string if needed
        if (typeof subscribedUsers === 'string') {
          try {
            subscribedUsers = JSON.parse(subscribedUsers);
          } catch (e) {
            console.warn('Failed to parse subscription data for:', subscription.uuid);
            subscribedUsers = [];
          }
        }
        
        // Ensure it's an array
        if (!Array.isArray(subscribedUsers)) {
          subscribedUsers = [];
        }
        
        console.log('Checking subscription:', {
          subscriptionId: subscription.uuid,
          subscribedUsers,
          userEmail: email
        });
        
        const hasAccess = subscribedUsers.some(subscriber => {
          // Method 1: Check by user ID using checkout logic
          const expectedUserId = `user_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
          if (subscriber.user_id && subscriber.user_id === expectedUserId) {
            console.log('Access granted via user_id:', expectedUserId);
            return true;
          }
          
          // Method 2: Check by email matching
          if (subscriber.email?.toLowerCase() === email) {
            console.log('Access granted via email:', subscriber.email);
            return true;
          }
          
          return false;
        });

        if (hasAccess) {
          userSubscriptionIds.add(subscription.uuid);
        }
      });

      console.log('User subscription check:', {
        email,
        username,
        foundSubscriptions: Array.from(userSubscriptionIds)
      });

      setUserSubscriptions(userSubscriptionIds);

    } catch (error) {
      console.error('Error checking user subscriptions:', error);
      setUserSubscriptions(new Set());
    } finally {
      setLoading(false);
    }
  };

  // Check subscriptions when username changes or user authentication changes
  useEffect(() => {
    checkUserSubscriptions();
  }, [username]);

  // Listen for auth changes and subscription updates
  useEffect(() => {
    const handleAuthChange = () => {
      checkUserSubscriptions();
    };

    const handleStorageChange = (e) => {
      if (e.key === 'checkout_user_email' || e.key === 'subscriber_email') {
        checkUserSubscriptions();
      }
    };

    // Listen for auth events
    window.addEventListener('pocketlink_auth_success', handleAuthChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('pocketlink_auth_success', handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [username]);

  const hasSubscription = (subscriptionId) => {
    return userSubscriptions.has(subscriptionId);
  };

  const value = {
    userSubscriptions,
    hasSubscription,
    loading,
    userEmail,
    refreshSubscriptions: checkUserSubscriptions
  };

  return (
    <TenantSubscriptionContext.Provider value={value}>
      {children}
    </TenantSubscriptionContext.Provider>
  );
};

export const useTenantSubscription = () => {
  const context = useContext(TenantSubscriptionContext);
  if (!context) {
    throw new Error('useTenantSubscription must be used within a TenantSubscriptionProvider');
  }
  return context;
};