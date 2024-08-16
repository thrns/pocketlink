'use client';

import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { updateUserData } from '@/lib/utils/sessionUtils';

/**
 * Updates local state and cookies with new user data
 * @param {Object} user Current user object
 * @param {Function} setUser Function to update user state
 * @param {Object} updatedUserData New user data to merge
 */
export const updateLocalStateAndCookies = (user, setUser, updatedUserData) => {
  // Update local state
  setUser({
    ...user,
    ...updatedUserData,
  });

  // Update user data using hybrid storage approach
  const updatedUserDataFull = {
    ...user,
    ...updatedUserData,
  };
  updateUserData(updatedUserDataFull, Cookies);
};

/**
 * Get the appropriate color for the connection percentage
 * @param {number} percentage Connection percentage
 * @returns {string} CSS class for background color
 */
export const getPercentageColor = (percentage) => {
  if (percentage >= 75) return 'bg-green-500';
  if (percentage >= 50) return 'bg-yellow-500';
  if (percentage >= 25) return 'bg-orange-500';
  return 'bg-red-500';
};

/**
 * Check connection status for all services
 * @param {Object} user Current user object
 * @param {Object} connections Current connections state
 * @param {Function} setConnections Function to update connections state
 * @param {Function} setConnectionPercentage Function to update connection percentage
 */
export const checkConnections = (
  user,
  connections,
  setConnections,
  setConnectionPercentage
) => {
  const updatedConnections = { ...connections };
  let connectedCount = 0;

  // Get integrations from user object
  const integrations = user?.integrations || {};

  // Gmail check
  if (integrations.gmail?.connected || integrations.gmail?.refresh_token) {
    updatedConnections.gmail.status = 'connected';
    connectedCount++;
  } else {
    updatedConnections.gmail.status = 'disconnected';
  }

  // YouTube check
  if (
    integrations?.youtube?.connected ||
    integrations?.youtube?.refresh_token
  ) {
    updatedConnections.youtube.status = 'connected';
    connectedCount++;
  } else {
    updatedConnections.youtube.status = 'disconnected';
  }

  // Instagram check
  if (
    integrations.instagram?.connected ||
    integrations.instagram?.access_token
  ) {
    updatedConnections.instagram.status = 'connected';
    connectedCount++;
  } else {
    updatedConnections.instagram.status = 'disconnected';
  }

  setConnections(updatedConnections);
  setConnectionPercentage(
    Math.round((connectedCount / Object.keys(connections).length) * 100)
  );
};

/**
 * Handles checking for pending authentication on component mount
 * @param {string} platform Platform name ("gmail", "youtube" or "instagram")
 * @param {Object} user Current user object
 * @param {Function} updateConnectionStatus Function to update connection status
 * @param {Function} setProcessingState Function to update processing state
 * @param {Function} updateConnectionPercentage Function to update connection percentage
 */
export const checkPendingAuth = (
  platform,
  user,
  updateConnectionStatus,
  setProcessingState,
  updateConnectionPercentage
) => {
  const pendingAuthKey = `${platform}_auth_pending`;
  const pendingAuth = localStorage.getItem(pendingAuthKey);

  // For Gmail and YouTube we also check for success flag
  const authSuccessKey = `${platform}_auth_success`;
  const authSuccess =
    platform === 'youtube' || platform === 'gmail'
      ? localStorage.getItem(authSuccessKey)
      : null;

  // Get integrations from user object
  const integrations = user?.integrations || {};

  if (pendingAuth === 'true') {
    // Clear the pending flag
    localStorage.removeItem(pendingAuthKey);

    // For Gmail or YouTube, check success flag
    if (
      (platform === 'youtube' || platform === 'gmail') &&
      authSuccess === 'true'
    ) {
      // Clear the success flag
      localStorage.removeItem(authSuccessKey);

      // Authentication was successful - callback page already updated the tokens
      toast.success(
        `Successfully connected ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`
      );

      // Update connections state
      updateConnectionStatus(platform, 'connected');
      updateConnectionPercentage();
    }
    // For Instagram, check if we have a token
    else if (
      platform === 'instagram' &&
      (integrations.instagram?.connected ||
        integrations.instagram?.access_token)
    ) {
      // Authentication was successful
      toast.success(
        `Successfully connected ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`
      );

      // Update connections state
      updateConnectionStatus(platform, 'connected');
      updateConnectionPercentage();
    }
    // Authentication failed for any platform
    else {
      // Authentication failed or was cancelled
      toast.error(
        `${platform.charAt(0).toUpperCase() + platform.slice(1)} connection was not completed`
      );

      updateConnectionStatus(platform, 'error');
    }

    // Reset platform's processing state
    setProcessingState(platform, false);
  }
};
