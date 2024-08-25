'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, AlertCircle, Youtube } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/Clients/supabase/client';
import { useAuth } from '@/app/contexts/AuthContext';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { updateUserData } from '@/lib/utils/sessionUtils';

// Disable static generation for this authentication callback page
export const dynamic = 'force-dynamic';

// Create a separate component that uses useSearchParams
function YouTubeCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, setUser } = useAuth();
  const [localUser, setLocalUser] = useState(null);
  const [status, setStatus] = useState('Processing');
  const [isSuccess, setIsSuccess] = useState(null);

  // Get user from cookies if not available in context
  useEffect(() => {
    if (!user) {
      const userDataCookie = Cookies.get('user_data');
      if (userDataCookie) {
        try {
          const userData = JSON.parse(userDataCookie);
          setLocalUser(userData);
        } catch (error) {
          console.error('Error parsing user data from cookies:', error);
        }
      }
    }
  }, [user]);

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Check if there's an error parameter
        const error = searchParams.get('error');
        if (error) {
          setStatus('Error: ' + error);
          setIsSuccess(false);
          toast.error('YouTube authentication failed: ' + error);
          setTimeout(() => router.push('/dashboard/integrations'), 3000);
          return;
        }

        // Get the code and state from the URL
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (!code || !state) {
          setStatus('Error: Missing required parameters');
          setIsSuccess(false);
          toast.error('Missing required parameters');
          setTimeout(() => router.push('/dashboard/integrations'), 3000);
          return;
        }

        // Verify the state parameter to prevent CSRF attacks
        const storedState = localStorage.getItem('youtube_oauth_state');
        if (state !== storedState) {
          setStatus('Error: Invalid state parameter');
          toast.error('Security verification failed');
          setTimeout(() => router.push('/dashboard/integrations'), 3000);
          return;
        }

        // Clear the stored state
        localStorage.removeItem('youtube_oauth_state');

        // Process the authorization code
        setStatus('Exchanging code for tokens...');
        const redirectUri =
          process.env.NODE_ENV === 'production'
            ? 'https://pocketlink.co/auth/youtube-callback'
            : 'http://localhost:3000/auth/youtube-callback';

        console.log('Using redirectUri:', redirectUri);

        const tokenResponse = await fetch('/api/youtube/exchange-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            redirectUri,
          }),
        });

        console.log('Token response status:', tokenResponse.status);

        // Response handling already done above with detailed error logging
        const tokenData = await tokenResponse.json();
        const { refresh_token, access_token } = tokenData;

        if (!refresh_token) {
          throw new Error('No refresh token received');
        }

        // Fetch YouTube channel info using the access token
        setStatus('Fetching YouTube channel information...');
        const channelResponse = await fetch(
          'https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true',
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        if (!channelResponse.ok) {
          throw new Error('Failed to fetch YouTube channel information');
        }

        const channelData = await channelResponse.json();
        const channelId = channelData.items?.[0]?.id;
        const channelTitle = channelData.items?.[0]?.snippet?.title;

        // Update the database with the YouTube refresh token and channel ID
        setStatus('Updating your profile...');

        // Use either context user or cookie user
        const currentUser = user || localUser;

        if (!currentUser || !currentUser.username) {
          // Get user info from cookies as a fallback
          const userDataCookie = Cookies.get('user_data');

          if (!userDataCookie) {
            throw new Error('User not authenticated - please log in again');
          }

          try {
            const cookieData = JSON.parse(userDataCookie);
            if (!cookieData.username) {
              throw new Error('Username not found in stored data');
            }

            // First, get current integrations data
            const { data: userData, error: fetchError } = await supabase
              .from('user_data')
              .select('integrations')
              .eq('username', cookieData.username)
              .single();

            if (fetchError) {
              console.error('Error fetching user data:', fetchError);
              throw new Error('Failed to fetch current user data');
            }

            // Prepare integrations object, preserving existing integrations
            const currentIntegrations = userData?.integrations || {};
            const updatedIntegrations = {
              ...currentIntegrations,
              youtube: {
                connected: true,
                refresh_token: refresh_token,
                channel_id: channelId,
                channel_title: channelTitle,
              },
            };

            // Use the username from cookies
            const { error: dbError } = await supabase
              .from('user_data')
              .update({
                integrations: updatedIntegrations,
              })
              .eq('username', cookieData.username);

            if (dbError) throw dbError;
          } catch (error) {
            console.error('Error processing user data from cookies:', error);
            throw new Error(
              'Failed to authenticate user - please log in again'
            );
          }
        } else {
          // First, get current integrations data
          const { data: userData, error: fetchError } = await supabase
            .from('user_data')
            .select('integrations')
            .eq('username', currentUser.username)
            .single();

          if (fetchError) {
            console.error('Error fetching user data:', fetchError);
            throw new Error('Failed to fetch current user data');
          }

          // Prepare integrations object, preserving existing integrations
          const currentIntegrations = userData?.integrations || {};
          const updatedIntegrations = {
            ...currentIntegrations,
            youtube: {
              connected: true,
              refresh_token: refresh_token,
              channel_id: channelId,
              channel_title: channelTitle,
            },
          };

          // Use the authenticated user
          const { error: dbError } = await supabase
            .from('user_data')
            .update({
              integrations: updatedIntegrations,
            })
            .eq('username', currentUser.username);

          if (dbError) throw dbError;
        }

        // Update local state and cookies using hybrid storage approach
        const currentIntegrations = user?.integrations || {};
        const updatedIntegrations = {
          ...currentIntegrations,
          youtube: {
            connected: true,
            refresh_token: refresh_token,
            channel_id: channelId,
            channel_title: channelTitle,
          },
        };

        const updatedUserData = {
          ...user,
          integrations: updatedIntegrations,
        };

        // Update user data using hybrid storage approach
        updateUserData(updatedUserData, Cookies);

        // Update the user context if available
        if (setUser) {
          setUser({
            ...(user || {}),
            integrations: updatedIntegrations,
          });
        }

        setStatus('Success! Redirecting...');
        setIsSuccess(true);
        toast.success(
          `Successfully connected YouTube channel: ${channelTitle || channelId}`
        );

        // Flag that YouTube auth was successful for the ConnectionsButton component
        localStorage.setItem('youtube_auth_success', 'true');

        // Redirect back to dashboard/integrations
        setTimeout(() => router.push('/dashboard/integrations'), 1500);
      } catch (error) {
        console.error('Error processing YouTube callback:', error);

        // Add more user-friendly error message for common issues
        let errorMessage = error.message;
        if (
          errorMessage.includes('invalid_client') &&
          errorMessage.includes('Unauthorized')
        ) {
          errorMessage =
            'Google OAuth client credentials are invalid. Please check your API configuration.';
        }

        setStatus(`Error: ${errorMessage}`);
        setIsSuccess(false);
        toast.error(`Failed to connect YouTube: ${errorMessage}`);

        // Add retry button for certain errors
        if (
          errorMessage.includes('Network') ||
          errorMessage.includes('timeout')
        ) {
          // Show retry option in UI for network issues
          setStatus(
            'Connection error. You can try again or return to integrations.'
          );
        } else {
          setTimeout(() => router.push('/dashboard/integrations'), 3000);
        }
      }
    };

    if (typeof window !== 'undefined') {
      processCallback();
    }
  }, [searchParams, router, user, setUser, localUser]);

  return (
    <motion.div
      className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-xl px-4 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.div
          className="mb-6 flex items-center justify-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Youtube className="mr-2 h-10 w-10 text-red-600" />
          <h1 className="text-2xl font-bold">YouTube Connection</h1>
        </motion.div>

        <motion.div
          className="my-6 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          {isSuccess === null && (
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <motion.div
                className="flex items-center"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: { duration: 1.5, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <Loader2 className="mr-4 h-12 w-12 text-purple-600" />
                </motion.div>
                <p className="text-xl font-medium text-gray-700">{status}</p>
              </motion.div>
            </motion.div>
          )}

          {isSuccess === true && (
            <motion.div
              className="flex items-center text-green-600"
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0, rotate: [0, 15, 0] }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 10,
                scale: { duration: 0.3 },
                y: { duration: 0.4 },
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                <CheckCircle className="mr-4 h-14 w-14" />
              </motion.div>
              <p className="text-xl font-medium">{status}</p>
            </motion.div>
          )}

          {isSuccess === false && (
            <motion.div
              className="flex flex-col items-center text-red-600"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: [0, 10, -10, 10, -10, 0],
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 10,
                x: { duration: 0.5, delay: 0.2 },
              }}
            >
              <div className="mb-4 flex items-center">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <AlertCircle className="mr-4 h-14 w-14" />
                </motion.div>
                <p className="text-xl font-medium">{status}</p>
              </div>

              {status.includes('Connection error') && (
                <motion.div className="mt-4 flex space-x-4">
                  <motion.button
                    className="rounded-md bg-red-600 bg-red-700 px-5 py-2 text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </motion.button>

                  <motion.button
                    className="rounded-md bg-gray-200 bg-gray-300 px-5 py-2 text-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/dashboard/integrations')}
                  >
                    Integrations
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <p className="text-gray-600">
            You will be redirected back to integrations shortly...
          </p>

          <motion.div className="mt-6 h-2 w-full max-w-md overflow-hidden rounded-full bg-gray-200">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-red-500"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3 }}
            />
          </motion.div>

          <motion.button
            className="mt-8 px-6 py-2 text-gray-600 text-gray-800 transition-colors"
            whileHover={{ y: -2 }}
            onClick={() => router.push('/dashboard/integrations')}
          >
            Return to Integrations
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Loading fallback component
function YouTubeCallbackLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
      <p className="ml-4 text-lg">Loading YouTube callback...</p>
    </div>
  );
}

// Main component that wraps the content with Suspense
export default function YouTubeCallback() {
  return (
    <Suspense fallback={<YouTubeCallbackLoading />}>
      <YouTubeCallbackContent />
    </Suspense>
  );
}
