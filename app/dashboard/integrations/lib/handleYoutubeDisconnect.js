'use client';

import { toast } from 'sonner';
import { supabase } from '@/Clients/supabase/client';

/**
 * Handle YouTube disconnection
 * @param {Object} params Configuration params
 * @param {Object} params.user Current user object
 * @param {Function} params.updateConnectionStatus Function to update connection status
 * @param {Function} params.setProcessingState Function to update processing state
 * @param {Function} params.updateLocalStateAndCookies Function to update local state and cookies
 * @param {Function} params.updateConnectionPercentage Function to update connection percentage
 */
const handleYoutubeDisconnect = async ({
  user,
  updateConnectionStatus,
  setProcessingState,
  updateLocalStateAndCookies,
  updateConnectionPercentage,
}) => {
  // Set status to disconnecting
  updateConnectionStatus('youtube', 'disconnecting');

  // Set only YouTube's processing state to true
  setProcessingState('youtube', true);

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

    // Remove YouTube integration or mark as disconnected
    if (updatedIntegrations.youtube) {
      updatedIntegrations.youtube = {
        ...updatedIntegrations.youtube,
        connected: false,
        refresh_token: null,
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
      throw new Error('Failed to disconnect YouTube from your account');
    }

    // Update local state and cookies
    updateLocalStateAndCookies({
      integrations: updatedIntegrations,
    });

    // Update connection status
    updateConnectionStatus('youtube', 'disconnected');

    // Update connection percentage
    updateConnectionPercentage();

    toast.success('Successfully disconnected YouTube');
  } catch (error) {
    console.error('Error disconnecting YouTube:', error);
    toast.error(error.message || 'Failed to disconnect YouTube');

    // Revert to error state
    updateConnectionStatus('youtube', 'error');
  } finally {
    // Reset only YouTube's processing state regardless of success/failure
    setProcessingState('youtube', false);
  }
};

export default handleYoutubeDisconnect;
