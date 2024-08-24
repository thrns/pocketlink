'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/Clients/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function InstagramCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function handleCallback() {
      try {
        // Get the code and state from the URL
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');
        const errorReason = searchParams.get('error_reason');
        const errorDescription = searchParams.get('error_description');

        console.log('Instagram callback received:', {
          code: code ? 'present' : 'missing',
          state: state ? 'present' : 'missing',
          error,
          errorReason,
          errorDescription,
        });

        // Check if there's an error from Instagram
        if (error) {
          console.error(
            'Instagram OAuth error:',
            error,
            errorReason,
            errorDescription
          );
          setError(
            `Instagram authorization failed: ${errorDescription || errorReason || error}`
          );
          setStatus('error');
          return;
        }

        // Check if we have the code
        if (!code) {
          setError('No authorization code received from Instagram');
          setStatus('error');
          return;
        }

        // Verify state parameter to prevent CSRF attacks
        const storedState = localStorage.getItem('instagram_oauth_state');
        console.log('Verifying state parameter:', {
          received: state,
          stored: storedState,
        });

        if (state !== storedState) {
          console.error('State parameter mismatch:', {
            received: state,
            stored: storedState,
          });
          setError('Invalid state parameter. Please try again.');
          setStatus('error');
          return;
        }

        // Clear the state from localStorage
        localStorage.removeItem('instagram_oauth_state');

        // Get the redirect URI that was used
        const redirectUri =
          localStorage.getItem('instagram_redirect_uri') ||
          `${window.location.origin}/auth/instagram-callback`;
        console.log('Using redirect URI:', redirectUri);
        localStorage.removeItem('instagram_redirect_uri');

        // Exchange the code for an access token
        console.log('Exchanging code for token...');
        const response = await fetch('/api/instagram/exchange-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            redirectUri,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Token exchange failed:', errorData);
          throw new Error(
            errorData.error || 'Failed to exchange authorization code'
          );
        }

        const tokenData = await response.json();
        console.log('Token exchange successful, received data:', {
          access_token: tokenData.access_token ? 'present' : 'missing',
          expires_in: tokenData.expires_in,
          username: tokenData.username,
        });

        // We have the tokens and user info, now save to database
        if (user && (user.uuid || user.username)) {
          // Get current user data to update integrations JSON
          const { data: userData, error: fetchError } = await supabase
            .from('user_data')
            .select('integrations')
            .match(
              user.uuid ? { uuid: user.uuid } : { username: user.username }
            )
            .single();

          if (fetchError) {
            console.error('Error fetching user data:', fetchError);
            throw new Error('Failed to fetch current user data');
          }

          // Prepare integrations object, preserving existing integrations
          const currentIntegrations = userData?.integrations || {};
          const updatedIntegrations = {
            ...currentIntegrations,
            instagram: {
              connected: true,
              access_token: tokenData.access_token,
              token_expires_at: new Date(
                Date.now() + tokenData.expires_in * 1000
              ).toISOString(),
              username: tokenData.username,
              user_id: tokenData.user_id,
            },
          };

          console.log('Updating user data with Instagram integration');

          // Update user data in Supabase
          const { error: updateError } = await supabase
            .from('user_data')
            .update({
              integrations: updatedIntegrations,
            })
            .match(
              user.uuid ? { uuid: user.uuid } : { username: user.username }
            );

          if (updateError) {
            console.error('Error updating user data:', updateError);
            throw new Error('Failed to save Instagram connection data');
          }

          // Success!
          console.log('Instagram connection successful!');
          setStatus('success');
          toast.success('Instagram Connected', {
            title: 'Instagram Connected',
            description:
              'Your Instagram account has been successfully connected.',
          });

          // Redirect back to dashboard/integrations after a short delay
          setTimeout(() => {
            router.push('/dashboard/integrations');
          }, 2000);
        } else {
          console.error('User not authenticated:', user);
          throw new Error('User not authenticated');
        }
      } catch (error) {
        console.error('Instagram callback error:', error);
        setError(
          error.message || 'An error occurred during Instagram connection'
        );
        setStatus('error');

        toast({
          title: 'Connection Failed',
          description: error.message || 'Failed to connect Instagram account',
          variant: 'destructive',
        });
      }
    }

    // Only proceed if we have a user
    if (user) {
      console.log('User authenticated, proceeding with callback');
      handleCallback();
    } else {
      console.log('Waiting for user authentication...');
      // If no user, check after a short delay
      const timer = setTimeout(() => {
        if (!user) {
          console.error('No user after timeout');
          setError('You must be logged in to connect Instagram');
          setStatus('error');
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [searchParams, user, router, toast]);

  const handleRetry = () => {
    router.push('/dashboard/integrations');
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard/integrations');
  };

  return (
    <Card className="w-[450px] shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Instagram Connection</CardTitle>
        <CardDescription>
          {status === 'processing' && 'Processing your Instagram connection...'}
          {status === 'success' && 'Instagram successfully connected!'}
          {status === 'error' && 'Connection failed'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6">
        {status === 'processing' && (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="text-primary h-12 w-12 animate-spin" />
            <p className="text-muted-foreground text-sm">
              Connecting your Instagram account...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-muted-foreground text-center text-sm">
              Your Instagram account has been successfully connected.
              Redirecting to integrations...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-muted-foreground text-center text-sm">{error}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        {status === 'error' && (
          <>
            <Button variant="outline" onClick={handleRetry}>
              Try Again
            </Button>
            <Button onClick={handleGoToDashboard}>Return</Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

// Wrap the component with Suspense
export default function InstagramCallbackPage() {
  return (
    <Suspense
      fallback={
        <Card className="w-[450px] shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Instagram Connection</CardTitle>
            <CardDescription>Loading...</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="text-primary h-12 w-12 animate-spin" />
              <p className="text-muted-foreground text-sm">
                Initializing connection...
              </p>
            </div>
          </CardContent>
        </Card>
      }
    >
      <InstagramCallbackContent />
    </Suspense>
  );
}
