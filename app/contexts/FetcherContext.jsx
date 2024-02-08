'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { shapePresets, mobileShapePresets } from '@/constants/shapePresets';
// Import the Supabase client
import { supabase } from '@/Clients/supabase/client';

// Define available themes
export const THEMES = {
  // Basic themes
  LIGHT: {
    name: 'Light',
    color: '#ffffff',
    textMode: 'dark',
    background: '#ffffff',
    cardBackground: '#f0f0ed',
    border: '#e5e5e5',
  },
  DARK: {
    name: 'Dark',
    color: '#121212',
    textMode: 'light',
    background: '#121212',
    cardBackground: '#1e1e1e',
    border: '#2a2a2a',
  },
  BLUE: {
    name: 'Blue',
    color: '#1e40af',
    textMode: 'light',
    background: '#1e40af',
    cardBackground: '#15307d',
    border: '#2651ca',
  },
  MINT: {
    name: 'Mint',
    color: '#a7f3d0',
    textMode: 'dark',
    background: '#a7f3d0',
    cardBackground: '#86e3b8',
    border: '#99ecc5',
  },
  CORAL: {
    name: 'Coral',
    color: '#f87171',
    textMode: 'light',
    background: '#f87171',
    cardBackground: '#ec5656',
    border: '#fa8989',
  },
  LAVENDER: {
    name: 'Lavender',
    color: '#c4b5fd',
    textMode: 'dark',
    background: '#c4b5fd',
    cardBackground: '#b09dfc',
    border: '#bbabf6',
  },
  AMBER: {
    name: 'Amber',
    color: '#fcd34d',
    textMode: 'dark',
    background: '#fcd34d',
    cardBackground: '#f6c423',
    border: '#fbd03b',
  },
  SLATE: {
    name: 'Slate',
    color: '#64748b',
    textMode: 'light',
    background: '#64748b',
    cardBackground: '#51606f',
    border: '#5b6a7d',
  },

  // Standard themes
  EMERALD: {
    name: 'Emerald',
    color: '#10b981',
    textMode: 'light',
    background: '#10b981',
    cardBackground: '#0ca571',
    border: '#15d395',
  },
  ROSE: {
    name: 'Rose',
    color: '#f43f5e',
    textMode: 'light',
    background: '#f43f5e',
    cardBackground: '#e12d4b',
    border: '#f55f79',
  },
  INDIGO: {
    name: 'Indigo',
    color: '#4f46e5',
    textMode: 'light',
    background: '#4f46e5',
    cardBackground: '#3f37cc',
    border: '#625ae8',
  },
  TEAL: {
    name: 'Teal',
    color: '#14b8a6',
    textMode: 'light',
    background: '#14b8a6',
    cardBackground: '#129e8e',
    border: '#1dcfbd',
  },
  VIOLET: {
    name: 'Violet',
    color: '#8b5cf6',
    textMode: 'light',
    background: '#8b5cf6',
    cardBackground: '#7841f1',
    border: '#9d73f7',
  },
  AMBER_DARK: {
    name: 'Amber Dark',
    color: '#b45309',
    textMode: 'light',
    background: '#b45309',
    cardBackground: '#964507',
    border: '#d26b15',
  },
  CYAN: {
    name: 'Cyan',
    color: '#06b6d4',
    textMode: 'dark',
    background: '#06b6d4',
    cardBackground: '#07a0bb',
    border: '#22c7e4',
  },
  LIME: {
    name: 'Lime',
    color: '#84cc16',
    textMode: 'dark',
    background: '#84cc16',
    cardBackground: '#71b013',
    border: '#95e218',
  },

  // Gen Z / Aesthetic themes
  SAGE: {
    name: 'Sage',
    color: '#9ca790',
    textMode: 'dark',
    background: '#9ca790',
    cardBackground: '#879479',
    border: '#b1bda3',
  },
  MOCHA: {
    name: 'Mocha',
    color: '#8b7355',
    textMode: 'light',
    background: '#8b7355',
    cardBackground: '#785f47',
    border: '#9e8466',
  },
  DUSTY_PINK: {
    name: 'Dusty Pink',
    color: '#cdb2aa',
    textMode: 'dark',
    background: '#cdb2aa',
    cardBackground: '#bb9f97',
    border: '#dfc5be',
  },
  TERRACOTTA: {
    name: 'Terracotta',
    color: '#b67162',
    textMode: 'light',
    background: '#b67162',
    cardBackground: '#a25f51',
    border: '#ca8273',
  },

  // Professional themes
  NAVY_PROFESSIONAL: {
    name: 'Navy Professional',
    color: '#1e3a8a',
    textMode: 'light',
    background: '#1e3a8a',
    cardBackground: '#1e2f6d',
    border: '#2347a7',
  },
  GRAPHITE: {
    name: 'Graphite',
    color: '#374151',
    textMode: 'light',
    background: '#374151',
    cardBackground: '#2c353f',
    border: '#4b5563',
  },
  STEEL_BLUE: {
    name: 'Steel Blue',
    color: '#475569',
    textMode: 'light',
    background: '#475569',
    cardBackground: '#3c4656',
    border: '#57657b',
  },
  EXECUTIVE_BROWN: {
    name: 'Executive Brown',
    color: '#78350f',
    textMode: 'light',
    background: '#78350f',
    cardBackground: '#662d0e',
    border: '#92400e',
  },

  // Calming themes
  MORNING_MIST: {
    name: 'Morning Mist',
    color: '#e2e8f0',
    textMode: 'dark',
    background: '#e2e8f0',
    cardBackground: '#cbd5e1',
    border: '#f1f5f9',
  },
  SOFT_SAGE: {
    name: 'Soft Sage',
    color: '#d4e4dc',
    textMode: 'dark',
    background: '#d4e4dc',
    cardBackground: '#bfd3cb',
    border: '#e5f0eb',
  },
  CLOUD_GRAY: {
    name: 'Cloud Gray',
    color: '#e5e7eb',
    textMode: 'dark',
    background: '#e5e7eb',
    cardBackground: '#d1d5db',
    border: '#f3f4f6',
  },
  MUTED_LAVENDER: {
    name: 'Muted Lavender',
    color: '#ddd6fe',
    textMode: 'dark',
    background: '#ddd6fe',
    cardBackground: '#c8bff9',
    border: '#ede9fe',
  },

  // Nature-Inspired Themes
  OCEAN_DEPTHS: {
    name: 'Ocean Depths',
    color: '#0c4a6e',
    textMode: 'light',
    background: '#0c4a6e',
    cardBackground: '#075985',
    border: '#0ea5e9',
  },
  DESERT_SAND: {
    name: 'Desert Sand',
    color: '#fbbf24',
    textMode: 'dark',
    background: '#fbbf24',
    cardBackground: '#f59e0b',
    border: '#fcd34d',
  },
  JUNGLE: {
    name: 'Jungle',
    color: '#047857',
    textMode: 'light',
    background: '#047857',
    cardBackground: '#065f46',
    border: '#10b981',
  },
  FOREST: {
    name: 'Forest',
    color: '#166534',
    textMode: 'light',
    background: '#166534',
    cardBackground: '#124e27',
    border: '#1f803f',
  },

  // Time of Day Themes
  MIDNIGHT: {
    name: 'Midnight',
    color: '#020617',
    textMode: 'light',
    background: '#020617',
    cardBackground: '#0f172a',
    border: '#1e293b',
  },
  TWILIGHT_BLUE: {
    name: 'Twilight Blue',
    color: '#3730a3',
    textMode: 'light',
    background: '#3730a3',
    cardBackground: '#312e81',
    border: '#4338ca',
  },
  DAWN_PINK: {
    name: 'Dawn Pink',
    color: '#db2777',
    textMode: 'light',
    background: '#db2777',
    cardBackground: '#be185d',
    border: '#ec4899',
  },

  // Modern & Trendy Themes
  NEON: {
    name: 'Neon',
    color: '#0d0208',
    textMode: 'light',
    background: '#0d0208',
    cardBackground: '#16051b',
    border: '#ec4899',
    accent: '#f0abfc',
  },
  MONOCHROME: {
    name: 'Monochrome',
    color: '#0a0a0a',
    textMode: 'light',
    background: '#0a0a0a',
    cardBackground: '#171717',
    border: '#525252',
    accent: '#e5e5e5',
  },
  CYBERPUNK: {
    name: 'Cyberpunk',
    color: '#18181b',
    textMode: 'light',
    background: '#18181b',
    cardBackground: '#27272a',
    border: '#cba6f7',
    accent: '#f5d0fe',
  },

  // Special Themes

  RETRO: {
    name: 'Retro',
    color: '#ffe4e6',
    textMode: 'dark',
    background: '#ffe4e6',
    cardBackground: '#fecdd3',
    border: '#fda4af',
    accent: '#fb7185',
  },
  MINIMALIST: {
    name: 'Minimalist',
    color: '#f8fafc',
    textMode: 'dark',
    background: '#f8fafc',
    cardBackground: '#f1f5f9',
    border: '#e2e8f0',
    accent: '#64748b',
  },
  HIGH_CONTRAST: {
    name: 'High Contrast',
    color: '#000000',
    textMode: 'light',
    background: '#000000',
    cardBackground: '#18181b',
    border: '#facc15',
    accent: '#ffffff',
  },

  // New Aesthetic & Cool Themes
  AUTUMN_LEAVES: {
    name: 'Autumn Leaves',
    color: '#b45309',
    textMode: 'light',
    background: '#b45309',
    cardBackground: '#9a3412',
    border: '#ea580c',
  },
  MATCHA: {
    name: 'Matcha',
    color: '#86ab89',
    textMode: 'dark',
    background: '#86ab89',
    cardBackground: '#769b79',
    border: '#96bb99',
  },
  BLUSH: {
    name: 'Blush',
    color: '#ffc2c2',
    textMode: 'dark',
    background: '#ffc2c2',
    cardBackground: '#f5abab',
    border: '#ffcfcf',
  },
  CARAMEL: {
    name: 'Caramel',
    color: '#a57c3e',
    textMode: 'light',
    background: '#a57c3e',
    cardBackground: '#916c37',
    border: '#bb8c47',
  },
  DEEP_PURPLE: {
    name: 'Deep Purple',
    color: '#5b21b6',
    textMode: 'light',
    background: '#5b21b6',
    cardBackground: '#4c1d95',
    border: '#6d28d9',
  },
  PISTACHIO: {
    name: 'Pistachio',
    color: '#bef264',
    textMode: 'dark',
    background: '#bef264',
    cardBackground: '#a3e635',
    border: '#d9f99d',
  },
  WARMTH: {
    name: 'Warmth',
    color: '#ea580c',
    textMode: 'light',
    background: '#ea580c',
    cardBackground: '#c2410c',
    border: '#f97316',
  },
};
const FetcherContext = createContext();

export function FetchProvider({ children }) {
  const { user } = useAuth();

  // Loading states
  const [profileLoading, setProfileLoading] = useState(false);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [mobileItemsLoading, setMobileItemsLoading] = useState(false);

  // Data states
  const [items, setItems] = useState([]);
  const [mobileItems, setMobileItems] = useState([]);
  const [themeData, setThemeData] = useState(THEMES.LIGHT);
  const [profile, setProfile] = useState({});
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  const [initialLoadError, setInitialLoadError] = useState(null);

  // For indicating if local changes are saved
  const [saveStatus, setSaveStatus] = useState('saved');

  // Helper to update theme
  const updateTheme = async (newTheme) => {
    if (!user?.username) return;
    console.log('newTheme', newTheme);
    setThemeData(newTheme);
    setSaveStatus('saving');

    try {
      const { error } = await supabase
        .from('items_data')
        .update({
          theme: newTheme,
        })
        .eq('username', user?.username)
        .single();

      if (error) {
        console.error('Error updating theme in Supabase:', error);
        setSaveStatus('not saved');
      } else {
        setSaveStatus('saved');
      }
    } catch (err) {
      console.error('Error updating theme:', err);
      setSaveStatus('not saved');
    }
  };

  // Helper to update display mode
  const updateDisplayMode = async (newDisplayMode) => {
    if (!user?.username) return;

    // Validate input
    if (!['banner', 'profile-pic'].includes(newDisplayMode)) {
      throw new Error('Invalid display mode');
    }

    const updatedProfile = {
      ...profile,
      displayMode: newDisplayMode,
    };

    setSaveStatus('saving');

    try {
      const { error } = await supabase
        .from('items_data')
        .update({
          profile: updatedProfile,
        })
        .eq('username', user?.username)
        .single();

      if (error) {
        console.error('Error updating display mode in Supabase:', error);
        setSaveStatus('not saved');
        throw new Error('Failed to save display mode to database');
      } else {
        // Only update local state after successful database update
        setProfile(updatedProfile);
        setSaveStatus('saved');
      }
    } catch (err) {
      console.error('Error updating display mode:', err);
      setSaveStatus('not saved');
      throw err; // Re-throw to allow component to handle the error
    }
  };

  // Backward compatibility helper
  const getTextMode = () => {
    return themeData.textMode === 'light' ? 'dark' : 'bright';
  };

  // ---------------------------
  // A) Fetch from Supabase
  // ---------------------------
  useEffect(() => {
    // If we don't have a valid username, skip fetching
    if (!user?.username) {
      setHasInitialLoad(false);
      setInitialLoadError(null);
      setSaveStatus('not saved');
      return;
    }

    // Start loading states
    setProfileLoading(true);
    setItemsLoading(true);
    setMobileItemsLoading(true);
    setInitialLoadError(null);

    const fetchData = async () => {
      try {
        // 1) Fetch row from `items_data` by username
        const { data, error } = await supabase
          .from('items_data')
          .select('items, mobileItems, theme, profile')
          .eq('username', user?.username)
          .single();

        if (error) {
          // If .single() fails because no row found, data = null
          console.log('Supabase fetch error:', error.message);
          setInitialLoadError(error.message);
          setProfileLoading(false);
          setItemsLoading(false);
          setMobileItemsLoading(false);
          return;
        }

        // 2) If we got data, set our state
        if (data) {
          // Handle theme data - check if it's the old format (string) or new format (object)
          if (data.theme) {
            if (typeof data.theme === 'string') {
              // Handle legacy format (string 'bright' or 'dark')
              setThemeData(data.theme === 'dark' ? THEMES.DARK : THEMES.LIGHT);
            } else {
              // Handle new format (object with theme properties)
              setThemeData(data.theme);
            }
          } else {
            setThemeData(THEMES.LIGHT);
          }

          setProfile({
            displayMode: 'profile-pic', // Default to profile-pic mode
            ...data.profile,
            // Override displayMode only if it exists in data.profile, otherwise keep default
            ...(data.profile?.displayMode && {
              displayMode: data.profile.displayMode,
            }),
          });
          setProfileLoading(false);

          if (data.items) {
            setItems(data.items);
          }
          setItemsLoading(false);

          if (data.mobileItems) {
            setMobileItems(data.mobileItems);
          }
          setMobileItemsLoading(false);
          setHasInitialLoad(true);
          setInitialLoadError(null);
        } else {
          // No row found => default values
          setThemeData(THEMES.LIGHT);
          setProfile({
            displayMode: 'profile-pic', // Default to profile-pic mode
          });
          setProfileLoading(false);
          setItems([]);
          setItemsLoading(false);
          setMobileItems([]);
          setMobileItemsLoading(false);
          setHasInitialLoad(true);
          setInitialLoadError(null);
        }
      } catch (err) {
        console.error('Error loading from Supabase:', err);
        setInitialLoadError(err.message);
        setProfileLoading(false);
        setItemsLoading(false);
        setMobileItemsLoading(false);
      }
    };

    fetchData();
  }, [user?.username]);

  // ----------------------------------------------------------------
  // B) If mobileItems is empty but items exist, copy them (ONE-TIME)
  // ----------------------------------------------------------------
  useEffect(() => {
    if (!hasInitialLoad || !user?.username) return;

    // If we have no mobile layout yet, create a new one
    if (mobileItems.length === 0 && items.length > 0) {
      console.log('No mobile items found, initializing from items...');

      const updatedMobileItems = items.map((item) => {
        const preset = mobileShapePresets[item.sizeKey] || { w: 1, h: 1 };
        return {
          ...item,
          x: 0,
          y: 0,
          w: preset.w,
          h: preset.h,
          // Add flag to indicate this is initial sync to prevent over-synchronization
          _isInitialSync: true,
        };
      });

      // 1) Save to DB
      supabase
        .from('items_data')
        .upsert(
          {
            username: user?.username,
            mobileItems: updatedMobileItems.map(item => {
              // Remove the flag before saving to DB
              const { _isInitialSync, ...itemWithoutFlag } = item;
              return itemWithoutFlag;
            }),
          },
          { onConflict: 'username' }
        )
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error initializing mobileItems in Supabase:', error);
            setSaveStatus('not saved');
          } else {
            // Set mobile items without the flag for state
            setMobileItems(updatedMobileItems.map(item => {
              const { _isInitialSync, ...itemWithoutFlag } = item;
              return itemWithoutFlag;
            }));
            setSaveStatus('saved');
          }
        })
        .catch((err) => {
          console.error('Error upserting mobileItems:', err);
          setSaveStatus('not saved');
        });
    }
  }, [hasInitialLoad, user?.username, items.length, mobileItems.length]);

  // Apply formatting to all cards of a specific type
  const updateAllByType = (targetType, properties) => {
    // First, update desktop items
    const updatedItems = items.map((item) => {
      if (item.type === targetType) {
        return { ...item, ...properties };
      }
      return item;
    });

    // Then, update mobile items
    const updatedMobileItems = mobileItems.map((item) => {
      if (item.type === targetType) {
        return { ...item, ...properties };
      }
      return item;
    });

    // Save changes locally
    setItems(updatedItems);
    setMobileItems(updatedMobileItems);

    // Save to database
    if (user?.username) {
      setSaveStatus('saving');

      supabase
        .from('items_data')
        .upsert(
          {
            username: user?.username,
            items: updatedItems,
            mobileItems: updatedMobileItems,
          },
          { onConflict: 'username' }
        )
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error updating items in Supabase:', error);
            setSaveStatus('not saved');
            throw new Error('Failed to save updates');
          } else {
            setSaveStatus('saved');
          }
        })
        .catch((err) => {
          console.error('Error upserting items:', err);
          setSaveStatus('not saved');
          throw err;
        });
    }
  };

  // Remove a specific product from local state (for cross-context synchronization)
  const removeProductFromContext = (productId) => {
    console.log('🗑️ Removing product from context:', productId);

    // Remove from both items and mobileItems without triggering auto-save
    setItems((prev) =>
      prev.filter(
        (item) => !(item.type === 'shopCard' && item.id === productId)
      )
    );
    setMobileItems((prev) =>
      prev.filter(
        (item) => !(item.type === 'shopCard' && item.id === productId)
      )
    );

    console.log('✅ Product removed from context successfully');
  };

  // Refresh data from database (for cross-context synchronization)
  const refreshData = async () => {
    if (!user?.username) return;

    console.log('🔄 Refreshing data from database...');

    // Reset initial load to trigger re-fetch
    setHasInitialLoad(false);

    // Start loading states
    setProfileLoading(true);
    setItemsLoading(true);
    setMobileItemsLoading(true);
    setInitialLoadError(null);

    try {
      // Fetch fresh data from database
      const { data, error } = await supabase
        .from('items_data')
        .select('items, mobileItems, theme, profile')
        .eq('username', user?.username)
        .single();

      if (error) {
        console.log('Supabase refresh error:', error.message);
        setInitialLoadError(error.message);
        setProfileLoading(false);
        setItemsLoading(false);
        setMobileItemsLoading(false);
        return;
      }

      if (data) {
        // Handle theme data
        if (data.theme) {
          if (typeof data.theme === 'string') {
            setThemeData(data.theme === 'dark' ? THEMES.DARK : THEMES.LIGHT);
          } else {
            setThemeData(data.theme);
          }
        } else {
          setThemeData(THEMES.LIGHT);
        }

        setProfile({
          displayMode: 'profile-pic',
          ...data.profile,
          ...(data.profile?.displayMode && {
            displayMode: data.profile.displayMode,
          }),
        });
        setProfileLoading(false);

        if (data.items) {
          setItems(data.items);
        }
        setItemsLoading(false);

        if (data.mobileItems) {
          setMobileItems(data.mobileItems);
        }
        setMobileItemsLoading(false);
        setHasInitialLoad(true);
        setInitialLoadError(null);

        console.log('✅ Data refreshed successfully');
      }
    } catch (err) {
      console.error('Error refreshing data:', err);
      setInitialLoadError(err.message);
      setProfileLoading(false);
      setItemsLoading(false);
      setMobileItemsLoading(false);
    }
  };

  return (
    <FetcherContext.Provider
      value={{
        items,
        setItems,
        mobileItems,
        setMobileItems,
        theme: getTextMode(),
        setThemeData, // For backward compatibility
        themeData,
        updateTheme,
        profile,
        setProfile,
        updateDisplayMode,
        profileLoading,
        itemsLoading,
        mobileItemsLoading,
        saveStatus,
        setSaveStatus,
        hasInitialLoad,
        setHasInitialLoad,
        initialLoadError,
        updateAllByType,
        removeProductFromContext,
        refreshData,
        shapePresets,
        mobileShapePresets,
      }}
    >
      {children}
    </FetcherContext.Provider>
  );
}

// Hook for accessing Fetcher context
export function useFetch() {
  return useContext(FetcherContext);
}
