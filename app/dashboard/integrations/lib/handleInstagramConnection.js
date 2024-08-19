'use client';

import { toast } from 'sonner';

/**
 * Handles the Instagram OAuth connection process
 * @param {Object} params - Parameters for the connection handler
 * @param {Function} params.updateConnectionStatus - Function to update the connection status in the UI
 * @param {Function} params.setProcessingState - Function to set the processing state in the UI
 * @returns {Promise<void>}
 */
const handleInstagramConnection = async ({
  updateConnectionStatus,
  setProcessingState,
}) => {
  try {
    // Update UI state
    updateConnectionStatus('connecting');
    setProcessingState(true);

    // Generate a random state parameter for security
    const state = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('instagram_oauth_state', state);

    // Get client ID from environment variables
    const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID;
    if (!clientId) {
      throw new Error('Instagram Client ID is not configured');
    }

    // Set the redirect URI based on environment
    const isProduction = window.location.hostname !== 'localhost';
    const redirectUri = isProduction
      ? 'https://pocketlink.co/auth/instagram-callback'
      : `${window.location.origin}/auth/instagram-callback`;

    // Store the redirect URI for use in the callback
    localStorage.setItem('instagram_redirect_uri', redirectUri);

    // Set a flag indicating we have a pending Instagram authentication
    localStorage.setItem('instagram_auth_pending', 'true');

    // Construct the Instagram OAuth URL
    const scopes = 'user_profile,user_media, instagram_graph_user_profile,instagram_graph_user_media'; // Basic Instagram Graph API scopes
    const instagramUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes)}&response_type=code&state=${state}`;

    // Redirect to Instagram OAuth page
    window.location.href = instagramUrl;
  } catch (error) {
    console.error('Instagram connection error:', error);

    // Display error to user
    if (window.toast) {
      window.toast.error(error.message || 'Failed to connect to Instagram');
    } else {
      alert(error.message || 'Failed to connect to Instagram');
    }

    // Reset UI state
    updateConnectionStatus('not_connected');
    setProcessingState(false);

    // Clear any pending authentication flags
    localStorage.removeItem('instagram_auth_pending');
    localStorage.removeItem('instagram_oauth_state');
    localStorage.removeItem('instagram_redirect_uri');
  }
};

export default handleInstagramConnection;
