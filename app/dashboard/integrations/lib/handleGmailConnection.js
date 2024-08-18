'use client';

import { toast } from 'sonner';

/**
 * Handle Gmail connection using Google OAuth with Gmail specific scopes
 * @param {Object} params Configuration params
 * @param {Function} params.updateConnectionStatus Function to update connection status
 * @param {Function} params.setProcessingState Function to update processing state
 * @param {Object} params.user Current logged-in user data
 */
const handleGmailConnection = async ({
  updateConnectionStatus,
  setProcessingState,
  user,
}) => {
  try {
    // Update status to connecting
    updateConnectionStatus('gmail', 'connecting');

    // Set processing state
    setProcessingState('gmail', true);

    // Make sure we have a user and they have an email
    if (!user || !user.email) {
      throw new Error('You must be logged in with an email to connect Gmail');
    }

    // Store the user's email in localStorage for verification during callback
    localStorage.setItem('gmail_auth_email', user.email);

    // Create state parameter for security
    const state = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('gmail_oauth_state', state);
    localStorage.setItem('gmail_auth_pending', 'true');

    // IMPORTANT: Use the exact same redirect URI that you registered in your Google API Console
    const redirectUri =
      process.env.NODE_ENV === 'production'
        ? 'https://pocketlink.co/auth/gmail-callback'
        : 'http://localhost:3000/auth/gmail-callback';

    // Google OAuth URL with Gmail scopes and login_hint to suggest the same email
    const gmailAuthUrl =
      'https://accounts.google.com/o/oauth2/v2/auth' +
      `?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}` +
      '&redirect_uri=' +
      encodeURIComponent(redirectUri) +
      '&response_type=code' +
      '&state=' +
      state +
      '&login_hint=' +
      encodeURIComponent(user.email) +
      '&scope=' +
      encodeURIComponent(
        'https://www.googleapis.com/auth/gmail.send ' +
          'https://www.googleapis.com/auth/userinfo.email ' +
          'https://www.googleapis.com/auth/userinfo.profile ' +
          'openid'
      ) +
      '&access_type=offline' +
      '&prompt=consent';

    // Redirect to Google OAuth for Gmail
    window.location.href = gmailAuthUrl;
  } catch (error) {
    console.error('Error connecting to Gmail:', error);
    toast.error('Failed to connect Gmail: ' + error.message);

    // Reset states
    updateConnectionStatus('gmail', 'error');
    setProcessingState('gmail', false);

    localStorage.removeItem('gmail_auth_pending');
    localStorage.removeItem('gmail_oauth_state');
    localStorage.removeItem('gmail_auth_email');
  }
};

export default handleGmailConnection;
