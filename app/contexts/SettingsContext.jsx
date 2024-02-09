'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/Clients/supabase/client';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { updateUserData } from '@/lib/utils/sessionUtils';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const { user, setUser } = useAuth();

  // Create debounce timers - refine to track individual preference keys
  const timers = useRef({
    name: null,
    // Individual preference timers
    email: null,
    analytics: null,
    marketing: null,
    subscribeButtonOn: null,
    profile: null,
  });

  // Track loading states for individual preferences
  const [isUpdating, setIsUpdating] = useState({
    name: false,
    // Individual preference loading states
    email: false,
    analytics: false,
    marketing: false,
    subscribeButtonOn: false,
    profile: false,
  });

  // Settings state
  const [settings, setSettings] = useState({
    name: '',
    preferences: {
      // Notification preferences
      email: true,
      analytics: true,
      marketing: true,
      // Subscription settings
      subscribeButtonOn: true,
    },
  });

  // Initialize settings from user data
  useEffect(() => {
    if (user) {
      setSettings({
        name: user.name || '',
        preferences: {
          email: user?.preferences?.email ?? true,
          analytics: user?.preferences?.analytics ?? true,
          marketing: user?.preferences?.marketing ?? true,
          subscribeButtonOn: user?.preferences?.subscribeButtonOn ?? true,
        },
      });
    }
  }, [user]);

  // Function to clear any existing timers
  const clearTimer = (field) => {
    if (timers.current[field]) {
      clearTimeout(timers.current[field]);
      timers.current[field] = null;
    }
  };

  // Function to update user state and storage
  const updateUserState = (updates) => {
    if (!user) return;

    // Create updated user object
    const updatedUser = {
      ...user,
      ...updates,
    };

    // Update React state
    setUser(updatedUser);

    // Update user data using hybrid storage approach
    updateUserData(updatedUser, Cookies);
  };

  // Debounced update function - modified to handle preference-specific updates
  const debouncedUpdate = (field, updateFn, preferenceKey = null) => {
    // Use preferenceKey as the timer key for preferences if provided
    const timerKey = preferenceKey || field;
    clearTimer(timerKey);

    // Show loading toast - use preference key in message if available
    const displayField = preferenceKey ? `${preferenceKey} preference` : field;
    const toastId = toast.loading(`Updating ${displayField}...`);

    // Set updating state - use preference key if provided
    const updatingKey = preferenceKey || field;
    setIsUpdating((prev) => ({ ...prev, [updatingKey]: true }));

    // Create a new timer
    timers.current[timerKey] = setTimeout(async () => {
      try {
        await updateFn();
        // Update toast to success
        toast.success(
          `${displayField.charAt(0).toUpperCase() + displayField.slice(1)} updated`,
          {
            id: toastId,
          }
        );
      } catch (error) {
        console.error(`Error updating ${displayField}:`, error);
        // Update toast to error
        toast.error(`Failed to update ${displayField}`, {
          id: toastId,
        });
        // Revert state on error (if we have the user data)
        if (user) {
          if (field === 'name') {
            setSettings((prev) => ({
              ...prev,
              name: user.name || '',
            }));
          } else if (field === 'preferences' && preferenceKey) {
            // Revert specific preference
            setSettings((prev) => ({
              ...prev,
              preferences: {
                ...prev.preferences,
                [preferenceKey]: user?.preferences?.[preferenceKey] ?? true,
              },
            }));
          }
        }
      } finally {
        setIsUpdating((prev) => ({ ...prev, [updatingKey]: false }));
        clearTimer(timerKey);
      }
    }, 1500);
  };

  // Handle name update
  const updateName = (newName) => {
    setSettings((prev) => ({
      ...prev,
      name: newName,
    }));

    if (!user?.uuid) return;

    debouncedUpdate('name', async () => {
      const { error } = await supabase
        .from('user_data')
        .update({ name: newName })
        .eq('uuid', user.uuid);

      if (error) throw error;

      // Update user state in AuthContext
      updateUserState({ name: newName });
    });
  };

  // Handle preference updates (notifications or profile settings)
  const updatePreference = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }));

    if (!user?.uuid) return;

    // Use preference-specific debounce
    debouncedUpdate(
      'preferences',
      async () => {
        // Get current preferences to merge with new value
        const { data, error: fetchError } = await supabase
          .from('user_data')
          .select('preferences')
          .eq('uuid', user.uuid)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

        const mergedPreferences = {
          ...(data?.preferences || {}),
          [key]: value,
        };

        // Update in user_data table
        const { error: updateError } = await supabase
          .from('user_data')
          .update({ preferences: mergedPreferences })
          .eq('uuid', user.uuid);

        if (updateError) throw updateError;

        // Update user state in AuthContext
        updateUserState({ preferences: mergedPreferences });

        // If this is the subscribeButtonOn preference, also update items_data
        if (key === 'subscribeButtonOn') {
          // 1. First check if record exists using username instead of uuid
          const { data: itemsData, error: fetchItemsError } = await supabase
            .from('items_data')
            .select('profile')
            .eq('username', user.username)
            .single();

          if (fetchItemsError && fetchItemsError.code !== 'PGRST116') {
            throw fetchItemsError;
          }

          const mergedItemsProfile = {
            ...(itemsData?.profile || {}),
            subscribeButtonOn: value,
          };

          // 2. Update or insert based on whether record exists - using username
          if (itemsData) {
            const { error: updateItemsError } = await supabase
              .from('items_data')
              .update({ profile: mergedItemsProfile })
              .eq('username', user.username);

            if (updateItemsError) throw updateItemsError;
          } else {
            // Insert new record with username
            const { error: insertError } = await supabase
              .from('items_data')
              .insert({
                username: user.username,
                profile: mergedItemsProfile,
              });

            if (insertError) throw insertError;
          }

          // Also update the profile in the user state if it exists
          if (user.profile) {
            updateUserState({
              profile: {
                ...user.profile,
                subscribeButtonOn: value,
              },
            });
          }
        }
      },
      key
    ); // Pass the specific preference key for individual tracking
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      Object.keys(timers.current).forEach((key) => {
        if (timers.current[key]) {
          clearTimeout(timers.current[key]);
        }
      });
    };
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isUpdating,
        updateName,
        updatePreference,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
