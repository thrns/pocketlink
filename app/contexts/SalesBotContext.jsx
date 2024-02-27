'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/Clients/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { avatarFileUpload } from '@/lib/helpers/supabaseStorageHelpers';

// Create the SalesBotContext
export const SalesBotContext = createContext();

export const SalesBotProvider = ({ children }) => {
  const { user } = useAuth();
  const [salesBotData, setSalesBotData] = useState({
    isActive: false,
    role: 'sales person', // default role: sales person or spokesperson
    vibe: 'modern professional', // default vibe: genz, millennial, or modern professional
    persona: '', // persona text
    avatarUrl: '', // URL to the avatar image
    dataAccess: [], // array of data types the bot can access
    loading: false,
  });
  const [isConfigured, setIsConfigured] = useState(false);

  // Load sales bot data from Supabase on component mount
  useEffect(() => {
    if (user?.uuid) {
      fetchSalesBotData();
    }
  }, [user?.uuid]);

  // Fetch sales bot data from Supabase
  const fetchSalesBotData = async () => {
    try {
      setSalesBotData((prev) => ({ ...prev, loading: true }));

      const { data, error } = await supabase
        .from('sales_bot_data')
        .select('*')
        .eq('username', user.username)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "no rows returned" error, which is expected for new users
        console.error('Error fetching sales bot data:', error);
        toast.error('Failed to load Sales Bot configuration');
      }

      if (data) {
        setSalesBotData({
          isActive: data.is_active || false,
          role: data.role || 'sales person',
          vibe: data.vibe || 'modern professional',
          persona: data.persona || '',
          avatarUrl: data.avatar_url || '',
          dataAccess: data.data_access || [],
          loading: false,
        });
        setIsConfigured(true);
      } else {
        setSalesBotData((prev) => ({ ...prev, loading: false }));
        setIsConfigured(false);
      }
    } catch (error) {
      console.error('Unexpected error fetching sales bot data:', error);
      toast.error('An unexpected error occurred');
      setSalesBotData((prev) => ({ ...prev, loading: false }));
    }
  };

  // Update sales bot configuration
  const updateSalesBotConfig = async (configData) => {
    try {
      setSalesBotData((prev) => ({ ...prev, loading: true }));

      const {
        role,
        vibe,
        persona,
        avatarFile,
        avatarUrl,
        dataAccess,
        isActive,
      } = configData;

      // Handle avatar upload if a new file is provided
      let finalAvatarUrl = avatarUrl;
      if (avatarFile) {
        try {
          finalAvatarUrl = await avatarFileUpload(
            user.username,
            'salesbot',
            avatarFile
          );
        } catch (uploadError) {
          console.error('Error uploading avatar:', uploadError);
          toast.error('Failed to upload avatar image');
          setSalesBotData((prev) => ({ ...prev, loading: false }));
          return false;
        }
      }

      const { data, error } = await supabase
        .from('sales_bot_data')
        .upsert({
          uuid: user.uuid,
          username: user.username,
          role,
          vibe,
          persona,
          avatar_url: finalAvatarUrl,
          data_access: dataAccess,
          is_active: isActive,
          updated_at: new Date().toISOString(),
        })
        .select();

      if (error) {
        console.error('Error updating sales bot config:', error);
        toast.error('Failed to update Sales Bot configuration');
        setSalesBotData((prev) => ({ ...prev, loading: false }));
        return false;
      }

      // Update local state with new data
      setSalesBotData({
        isActive,
        role,
        vibe,
        persona,
        avatarUrl: finalAvatarUrl,
        dataAccess,
        loading: false,
      });

      setIsConfigured(true);
      toast.success('Sales Bot configuration updated successfully');
      return true;
    } catch (error) {
      console.error('Unexpected error updating sales bot config:', error);
      toast.error('An unexpected error occurred');
      setSalesBotData((prev) => ({ ...prev, loading: false }));
      return false;
    }
  };

  // Toggle bot active status
  const toggleBotActive = async (isActive) => {
    try {
      setSalesBotData((prev) => ({ ...prev, loading: true }));

      const { error } = await supabase
        .from('sales_bot_data')
        .update({ is_active: isActive, updated_at: new Date().toISOString() })
        .eq('username', user.username);

      if (error) {
        console.error('Error toggling bot status:', error);
        toast.error(
          `Failed to ${isActive ? 'activate' : 'deactivate'} Sales Bot`
        );
        setSalesBotData((prev) => ({ ...prev, loading: false }));
        return false;
      }

      setSalesBotData((prev) => ({ ...prev, isActive, loading: false }));
      toast.success(
        `Sales Bot ${isActive ? 'activated' : 'deactivated'} successfully`
      );
      return true;
    } catch (error) {
      console.error('Unexpected error toggling bot status:', error);
      toast.error('An unexpected error occurred');
      setSalesBotData((prev) => ({ ...prev, loading: false }));
      return false;
    }
  };

  return (
    <SalesBotContext.Provider
      value={{
        salesBotData,
        isConfigured,
        updateSalesBotConfig,
        toggleBotActive,
        fetchSalesBotData,
      }}
    >
      {children}
    </SalesBotContext.Provider>
  );
};

export const useSalesBot = () => useContext(SalesBotContext);
