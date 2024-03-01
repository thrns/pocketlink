'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/Clients/supabase/client';
import { useAuth } from '@/app/contexts/AuthContext';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { updateUserData } from '@/lib/utils/sessionUtils';

// Function component that uses useSearchParams
function InstagramTokenHandlerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const checkInstagramAuth = async () => {
      try {
        // Check for auth errors first
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          // Clear pending auth state
          localStorage.removeItem('instagram_auth_pending');
          localStorage.removeItem('instagram_oauth_state');

          console.error('Instagram auth error:', error, errorDescription);
          toast.error(`Instagram auth error: ${errorDescription || error}`);

          // Redirect to remove error params from URL
          router.push('/');
          return;
        }

        // Check for state parameter
        const returnedState = searchParams.get('state');
        const storedState = localStorage.getItem('instagram_oauth_state');

        // Check if we have tokens and/or state
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        const providerToken = searchParams.get('provider_token');
        const code = searchParams.get('code');

        // If we have state parameter or tokens
        if (
          returnedState ||
          accessToken ||
          refreshToken ||
          providerToken ||
          code
        ) {
          console.log('Processing auth callback');

          // Verify state if present
          if (returnedState && storedState) {
            if (returnedState !== storedState) {
              throw new Error(
                'OAuth state mismatch. Authentication rejected for security.'
              );
            }
          }

          // Clear auth states
          localStorage.removeItem('instagram_auth_pending');
          localStorage.removeItem('instagram_oauth_state');

          // Process tokens if present
          if (accessToken || providerToken || code) {
            // Process the token with your API
            const tokenToUse = providerToken || accessToken;

            if (tokenToUse) {
              await processInstagramToken(tokenToUse);
            } else if (code) {
              await processInstagramCode(code);
            }
          }

          // Redirect to home to remove tokens from URL
          router.push('/');
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        toast.error(error.message || 'Authentication error');

        // Clear auth states
        localStorage.removeItem('instagram_auth_pending');
        localStorage.removeItem('instagram_oauth_state');

        // Redirect to home
        router.push('/');
      }
    };

    // Process Instagram token with your API
    const processInstagramToken = async (token) => {
      try {
        const response = await fetch('/api/instagram/process-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || 'Failed to process Instagram token'
          );
        }

        const instagramData = await response.json();

        // Update database
        await updateUserData(instagramData);

        toast.success('Successfully connected to Instagram!');
      } catch (error) {
        console.error('Error processing Instagram token:', error);
        throw error;
      }
    };

    // Process Instagram auth code
    const processInstagramCode = async (code) => {
      try {
        const response = await fetch('/api/instagram/exchange-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || 'Failed to exchange Instagram code'
          );
        }

        const instagramData = await response.json();

        // Update database
        await updateUserData(instagramData);

        toast.success('Successfully connected to Instagram!');
      } catch (error) {
        console.error('Error exchanging Instagram code:', error);
        throw error;
      }
    };

    const updateUserData = async (instagramData) => {
      try {
        // Get current session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user?.id) {
          throw new Error('No authenticated user found');
        }

        // Only store essential Instagram credentials in user_data table
        const { error: userDataError } = await supabase
          .from('user_data')
          .update({
            instagramAccessToken: instagramData.access_token || null,
            instagramUserId: instagramData.user_id || null,
            instagramUsername: instagramData.username || null,
            instagramAccountType: instagramData.account_type || null,
            instagramTokenExpiresAt: instagramData.expires_at || null,
          })
          .eq('uuid', session.user.uuid);

        if (userDataError) {
          console.error('Error updating user_data:', userDataError);
          throw userDataError;
        }

        // Update cookies with essential Instagram data
        const userDataCookie = Cookies.get('user_data');
        const userData = userDataCookie ? JSON.parse(userDataCookie) : {};

        const updatedUserData = {
          ...userData,
          instagramAccessToken: instagramData.access_token || null,
          instagramUserId: instagramData.user_id || null,
          instagramUsername: instagramData.username || null,
          instagramAccountType: instagramData.account_type || null,
        };

        // Update user data using hybrid storage approach
        updateUserData(updatedUserData, Cookies);

        // Update user state with essential Instagram data
        if (setUser) {
          setUser((prevUser) => ({
            ...prevUser,
            instagramAccessToken: instagramData.access_token || null,
            instagramUserId: instagramData.user_id || null,
            instagramUsername: instagramData.username || null,
            instagramAccountType: instagramData.account_type || null,
          }));
        }

        console.log('Successfully updated Instagram credentials');
      } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
      }
    };

    // Run the check
    if (searchParams.toString()) {
      checkInstagramAuth();
    }
  }, [searchParams, router, setUser, user?.username]);

  // This component doesn't render anything
  return null;
}

// Wrap the component that uses useSearchParams in Suspense
export default function InstagramTokenHandler() {
  return (
    <Suspense fallback={null}>
      <InstagramTokenHandlerContent />
    </Suspense>
  );
}
