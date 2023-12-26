'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/Clients/supabase/client';

export function useInstagramData() {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  // Fetch data from Supabase
  const fetchDataFromSupabase = useCallback(
    async (username = null) => {
      console.log(
        `Fetching Instagram data from Supabase ${username ? `for ${username}` : 'for current user'}`
      );
      setIsLoading(true);
      setError(null);

      try {
        // Use the username if provided, otherwise use the authenticated user's ID
        let query = supabase.from('instagram_user_data').select('*');

        if (username) {
          console.log(`Querying instagram_user_data by username: ${username}`);
          query = query.eq('username', username);
        } else if (user?.uuid) {
          console.log(`Querying instagram_user_data by user_id: ${user.uuid}`);
          query = query.eq('uuid', user.uuid);
        } else {
          console.log('No username or user ID provided for query');
          throw new Error('No username or user ID provided');
        }

        // Get the most recent record
        query = query.order('created_at', { ascending: false }).limit(1);

        console.log('Executing Supabase query for instagram_user_data');
        const { data, error: supabaseError } = await query;

        if (supabaseError) {
          console.error('Supabase error during query:', supabaseError);
          throw new Error(
            `Failed to fetch Instagram data: ${supabaseError.message}`
          );
        }

        if (!data || data.length === 0) {
          console.log('No Instagram data found in Supabase');
          throw new Error(
            'No Instagram data found. Please connect your Instagram account.'
          );
        }

        // Log the raw data from Supabase
        console.log('Raw Instagram data from Supabase:', data[0]);

        // Transform the data into the expected format
        const transformedData = transformSupabaseData(data[0]);
        console.log(
          'Transformed Instagram data successfully, account info:',
          transformedData.account
            ? {
                username: transformedData.account.username,
                followers: transformedData.account.followers,
                posts_count: transformedData.account.posts,
              }
            : 'No account data'
        );

        setAnalyticsData(transformedData);
        setLastFetched(new Date());
        console.log('Instagram data successfully set to state');
        return transformedData;
      } catch (err) {
        console.error('Error fetching Instagram data from Supabase:', err);
        setError(err.message);
        toast.error(`Error: ${err.message}`);
        return null;
      } finally {
        setIsLoading(false);
        console.log('Finished Instagram data fetch process');
      }
    },
    [supabase, user?.id]
  );

  // Transform Supabase data to match the expected analytics format
  const transformSupabaseData = (rawData) => {
    // Ensure we have valid data
    if (!rawData) {
      console.error('No raw data provided to transform');
      return null;
    }

    console.log('Transforming Supabase data for:', rawData.username);

    // Try to parse profileData, postsData, and insightsData if they exist
    let profileData = {};
    let postsData = [];
    let followersData = [];
    let engagementData = [];
    let audienceData = {
      gender: [],
      age: [],
      location: [],
      activeHours: [],
    };

    try {
      // Parse profileData if it exists
      if (rawData.profileData) {
        profileData =
          typeof rawData.profileData === 'string'
            ? JSON.parse(rawData.profileData)
            : rawData.profileData;
        console.log('Parsed profile data successfully');
      }

      // Parse postsData if it exists
      if (rawData.postsData) {
        postsData =
          typeof rawData.postsData === 'string'
            ? JSON.parse(rawData.postsData)
            : rawData.postsData;
        console.log(
          `Parsed posts data successfully: ${postsData.length} posts`
        );
      }

      // Parse insightsData if it exists
      if (rawData.insightsData) {
        const insightsData =
          typeof rawData.insightsData === 'string'
            ? JSON.parse(rawData.insightsData)
            : rawData.insightsData;

        // Extract followers, engagement, and audience data from insightsData
        if (insightsData.followers) {
          followersData = insightsData.followers;
          console.log(
            `Parsed followers data successfully: ${followersData.length} data points`
          );
        }

        if (insightsData.engagement) {
          engagementData = insightsData.engagement;
          console.log(
            `Parsed engagement data successfully: ${engagementData.length} data points`
          );
        }

        if (insightsData.audience) {
          audienceData = insightsData.audience;
          console.log('Parsed audience data successfully');
        }
      }
    } catch (error) {
      console.error('Error parsing Instagram data from Supabase:', error);
    }

    // Fall back to individual fields if the combined objects don't exist
    if (Object.keys(profileData).length === 0) {
      console.log('Using fallback profile data from individual fields');
      profileData = {
        username: rawData.username || '',
        isVerified: rawData.is_verified || false,
        followers: rawData.followers_count || 0,
        following: rawData.following_count || 0,
        posts: rawData.post_count || 0,
        profileImage: rawData.profile_image_url || '',
        fullName: rawData.full_name || '',
        businessCategory: rawData.business_category || '',
      };
    }

    // If we don't have any posts data, create empty array
    if (postsData.length === 0) {
      console.log('No posts data available');
    }

    // If we don't have followers data, create mock data
    if (followersData.length === 0) {
      console.log(
        'Creating mock followers data based on profile followers count'
      );
      followersData = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        count: profileData.followers
          ? Math.round(profileData.followers * (0.995 + i * 0.0002))
          : 1000 + i * 10,
      }));
    }

    // If we don't have engagement data, create mock data
    if (engagementData.length === 0) {
      console.log('Creating mock engagement data');
      engagementData = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        rate: 3 + Math.random() * 2,
      }));
    }

    // If we don't have audience data, create mock data
    if (!audienceData.gender || audienceData.gender.length === 0) {
      console.log('Creating mock audience data');
      audienceData = {
        gender: [
          { name: 'Male', value: 45 + Math.floor(Math.random() * 10) },
          { name: 'Female', value: 55 - Math.floor(Math.random() * 10) },
        ],
        age: [
          { name: '18-24', value: 20 + Math.floor(Math.random() * 10) },
          { name: '25-34', value: 35 + Math.floor(Math.random() * 10) },
          { name: '35-44', value: 25 + Math.floor(Math.random() * 5) },
          { name: '45+', value: 20 - Math.floor(Math.random() * 5) },
        ],
        location: [
          { name: 'New York', value: 30 + Math.floor(Math.random() * 10) },
          { name: 'Los Angeles', value: 15 + Math.floor(Math.random() * 10) },
          { name: 'Chicago', value: 10 + Math.floor(Math.random() * 5) },
          { name: 'Other', value: 45 - Math.floor(Math.random() * 15) },
        ],
        activeHours: Array.from({ length: 8 }, (_, i) => ({
          name: `${(i * 3) % 24} ${(i * 3) % 24 < 12 ? 'AM' : 'PM'}`,
          value: 5 + Math.floor(Math.random() * 25),
        })),
      };
    }

    // Return formatted data
    return {
      account: profileData,
      followers: followersData,
      posts: postsData,
      engagement: engagementData,
      audience: audienceData,
    };
  };

  // Fetch data for the authenticated user's profile
  const fetchUserData = useCallback(async () => {
    return fetchDataFromSupabase();
  }, [fetchDataFromSupabase]);

  // Fetch data for any profile by username
  const fetchProfileData = useCallback(
    async (username) => {
      if (!username) {
        setError('Username is required to fetch profile data');
        return null;
      }

      return fetchDataFromSupabase(username);
    },
    [fetchDataFromSupabase]
  );

  // Refresh current data
  const refreshData = useCallback(async () => {
    console.log('Refreshing Instagram data');
    if (lastFetched) {
      console.log('Last fetch time:', lastFetched);
    }

    if (analyticsData?.account?.username) {
      console.log(
        'Refreshing data for username:',
        analyticsData.account.username
      );
      return fetchProfileData(analyticsData.account.username);
    } else {
      console.log('No username to refresh, using authenticated user');
      return fetchUserData();
    }
  }, [
    fetchUserData,
    fetchProfileData,
    analyticsData?.account?.username,
    lastFetched,
  ]);

  // Automatically fetch data when the hook is initialized
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    analyticsData,
    isLoading,
    error,
    lastFetched,
    fetchUserData,
    fetchProfileData,
    refreshData,
  };
}
