'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { toast } from 'sonner';

export function useUserInstagramReels() {
  const { user } = useAuth();
  const [reels, setReels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState('');

  // Check if user has Instagram integration
  const hasInstagramIntegration = user?.integrations?.instagram?.access_token && user?.integrations?.instagram?.user_id;

  // Fetch user's own Instagram reels
  const fetchUserReels = useCallback(async (limit = 25) => {
    if (!hasInstagramIntegration) {
      setError('Instagram integration not found. Please connect your Instagram account first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Fetching user Instagram reels...');
      
      const response = await fetch('/api/instagram/user-reels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user,
          limit: limit
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch Instagram reels');
      }

      console.log(`Successfully fetched ${data.total} Instagram reels`);
      
      setReels(data.reels || []);
      setTotal(data.total || 0);
      setUsername(data.username || '');
      setAccountType(data.account_type || '');
      
    } catch (error) {
      console.error('Error fetching user Instagram reels:', error);
      setError(error.message);
      toast.error(error.message || 'Failed to fetch Instagram reels');
    } finally {
      setIsLoading(false);
    }
  }, [user, hasInstagramIntegration]);

  // Refresh reels data
  const refreshReels = useCallback(() => {
    return fetchUserReels();
  }, [fetchUserReels]);

  // Auto-fetch reels when user has Instagram integration
  useEffect(() => {
    if (hasInstagramIntegration && reels.length === 0 && !isLoading) {
      fetchUserReels();
    }
  }, [hasInstagramIntegration, fetchUserReels, reels.length, isLoading]);

  return {
    reels,
    isLoading,
    error,
    total,
    username,
    accountType,
    hasInstagramIntegration,
    fetchUserReels,
    refreshReels,
  };
}