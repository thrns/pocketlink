'use client';

// ======== IMPORTS ======== //
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { supabase } from '@/Clients/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
const AudienceContext = createContext();

export function AudienceProvider({ children }) {
  const { user } = useAuth();

  // Fixed the typo: subscriptions (not subsciptions)
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscribed, setSubscribed] = useState([]);
  const [unsubscribed, setUnsubscribed] = useState([]);

  // Add user dependency to useEffect
  useEffect(() => {
    if (user?.username) {
      fetchSubscriptions();
    }
  }, [user?.username]);

  // ===== FETCH SUBSCRIPTIONS ===== //
  const fetchSubscriptions = async () => {
    if (!user?.username) {
      return;
    }

    const { data: subscriptionFetchData, error: subscriptionFetchError } =
      await supabase
        .from('subscriptions')
        .select('*')
        .eq('username', user?.username);

    if (subscriptionFetchError) {
      console.error('Error fetching subscriptions:', subscriptionFetchError);
      return;
    }

    setSubscriptions(subscriptionFetchData);

    // Alternative: Using reduce for more concise mapping
    const subscribedMap = subscriptionFetchData.reduce((acc, subscription) => {
      acc[subscription?.subscription_name] = subscription.subscribed;
      return acc;
    }, {});

    const unsubscribedMap = subscriptionFetchData.reduce(
      (acc, subscription) => {
        acc[subscription?.subscription_name] = subscription.unsubscribed;
        return acc;
      },
      {}
    );

    setSubscribed(subscribedMap);
    setUnsubscribed(unsubscribedMap);
  };

  // ===== /FETCH SUBSCRIPTIONS/ ===== //

  // ======= SUBSCRIPTION CRUD ====== //
  const deleteSubscription = async ({ subscriptionToDelete }) => {
    console.log('Deleting subscription:', subscriptionToDelete);
    try {
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('uuid', subscriptionToDelete?.uuid);

      if (error) {
        console.error('Error deleting subscription:', error);
        // You might want to show an error toast here
      } else {
        await fetchSubscriptions();
      }
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };

  const value = useMemo(
    () => ({
      user,
      subscriptions,
      setSubscriptions,
      subscribed,
      unsubscribed,
      fetchSubscriptions,
      deleteSubscription,
    }),
    [user, subscriptions, subscribed, unsubscribed]
  );

  return (
    <AudienceContext.Provider value={value}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  const context = useContext(AudienceContext);
  if (context === undefined) {
    throw new Error('useAudience must be used within an AudienceProvider');
  }
  return context;
}
