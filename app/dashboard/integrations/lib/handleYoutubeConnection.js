'use client';

import { toast } from 'sonner';

/**
 * Handle YouTube connection using Google OAuth with specific YouTube scopes
 * @param {Object} params Configuration params
 * @param {Function} params.updateConnectionStatus Function to update connection status
 * @param {Function} params.setProcessingState Function to update processing state
 */
const handleYoutubeConnection = async ({
  updateConnectionStatus,
  setProcessingState,
}) => {
  try {
    // Update status to connecting
    updateConnectionStatus('youtube', 'connecting');

    // Set processing state
    setProcessingState('youtube', true);

    // Create state parameter for security
    const state = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('youtube_oauth_state', state);
    localStorage.setItem('youtube_auth_pending', 'true');

    // IMPORTANT: Use the exact same redirect URI that you registered in your Google API Console
    const redirectUri =
      process.env.NODE_ENV === 'production'
        ? 'https://pocketlink.co/auth/youtube-callback'
        : 'http://localhost:3000/auth/youtube-callback';

    // Google OAuth URL with YouTube scopes
    const youtubeAuthUrl =
      'https://accounts.google.com/o/oauth2/v2/auth' +
      `?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}` +
      '&redirect_uri=' +
      encodeURIComponent(redirectUri) +
      '&response_type=code' +
      '&state=' +
      state +
      '&scope=' +
      encodeURIComponent(
        'https://www.googleapis.com/auth/youtube.readonly ' +
          'https://www.googleapis.com/auth/yt-analytics-monetary.readonly ' +
          'https://www.googleapis.com/auth/youtube.force-ssl ' +
          'https://www.googleapis.com/auth/yt-analytics.readonly ' +
          'https://www.googleapis.com/auth/userinfo.email ' +
          'https://www.googleapis.com/auth/userinfo.profile ' +
          'openid'
      ) +
      '&access_type=offline' +
      '&prompt=consent';

    // Redirect to Google OAuth for YouTube
    window.location.href = youtubeAuthUrl;
  } catch (error) {
    console.error('Error connecting to YouTube:', error);
    toast.error('Failed to connect YouTube: ' + error.message);

    // Reset states
    updateConnectionStatus('youtube', 'error');
    setProcessingState('youtube', false);

    localStorage.removeItem('youtube_auth_pending');
    localStorage.removeItem('youtube_oauth_state');
  }
};

export default handleYoutubeConnection;
