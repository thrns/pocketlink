'use client';

import { toast } from 'sonner';
import { supabase } from '@/Clients/supabase/client';

/**
 * Handle Instagram disconnection
 * @param {Object} params Configuration params
 * @param {Object} params.user Current user object
 * @param {Function} params.updateConnectionStatus Function to update connection status
 * @param {Function} params.setProcessingState Function to update processing state
 * @param {Function} params.updateLocalStateAndCookies Function to update local state and cookies
 * @param {Function} params.updateConnectionPercentage Function to update connection percentage
 */
const handleInstagramDisconnect = async ({
  user,
  updateConnectionStatus,
  setProcessingState,
  updateLocalStateAndCookies,
  updateConnectionPercentage,
}) => {
  // Set status to disconnecting
  updateConnectionStatus('instagram', 'disconnecting');

  // Set only Instagram's processing state to true
  setProcessingState('instagram', true);

  try {
    if (!user || (!user.uuid && !user.username)) {
      throw new Error('User data is missing');
    }

    // Get current integrations data
    const { data: userData, error: fetchError } = await supabase
      .from('user_data')
      .select('integrations')
      .match(user.uuid ? { uuid: user.uuid } : { username: user.username })
      .single();

    if (fetchError) {
      console.error('Error fetching user data:', fetchError);
      throw new Error('Failed to fetch current user data');
    }

    // Create a copy of the current integrations
    const currentIntegrations = userData?.integrations || {};
    const updatedIntegrations = { ...currentIntegrations };

    // Remove Instagram integration or mark as disconnected
    if (updatedIntegrations.instagram) {
      updatedIntegrations.instagram = {
        ...updatedIntegrations.instagram,
        connected: false,
        access_token: null,
        token_expires_at: null,
      };
    }

    // Update database with modified integrations
    const { error: dbError } = await supabase
      .from('user_data')
      .update({
        integrations: updatedIntegrations,
      })
      .match(user.uuid ? { uuid: user.uuid } : { username: user.username });

    if (dbError) {
      console.error('Error updating user data:', dbError);
      throw new Error('Failed to disconnect Instagram from your account');
    }

    // Update local state and cookies
    updateLocalStateAndCookies({
      integrations: updatedIntegrations,
    });

    // Update connection status
    updateConnectionStatus('instagram', 'disconnected');

    // Update connection percentage
    updateConnectionPercentage();

    toast.success('Successfully disconnected Instagram');
  } catch (error) {
    console.error('Error disconnecting Instagram:', error);
    toast.error(error.message || 'Failed to disconnect Instagram');

    // Revert to error state
    updateConnectionStatus('instagram', 'error');
  } finally {
    // Reset only Instagram's processing state regardless of success/failure
    setProcessingState('instagram', false);
  }
};

export default handleInstagramDisconnect;
