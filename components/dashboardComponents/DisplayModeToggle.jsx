'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useFetch } from '@/app/contexts/FetcherContext';
import { Image, User, Loader2, Palette } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function DisplayModeToggle() {
  const { profile, updateDisplayMode, themeData } = useFetch();
  const { currentTheme } = useTheme();
  const [isUpdating, setIsUpdating] = useState(false);

  // Define the modes in cycling order - using valid modes from FetcherContext
  const modes = [
    { key: 'profile-pic', label: 'Profile', icon: User },
    { key: 'banner', label: 'Banner', icon: Image },
  ];

  const currentMode = profile?.displayMode || 'profile-pic';
  const currentModeIndex = modes.findIndex((mode) => mode.key === currentMode);
  const currentModeData = modes[currentModeIndex] || modes[0];

  const handleCycleMode = async () => {
    // Prevent multiple simultaneous updates
    if (isUpdating) return;

    // Get next mode in cycle
    const nextIndex = (currentModeIndex + 1) % modes.length;
    const nextMode = modes[nextIndex];

    setIsUpdating(true);
    try {
      await updateDisplayMode(nextMode.key);
      toast.success(`Switched to ${nextMode.label.toLowerCase()} mode`, {
        description: `Your profile is now displayed in ${nextMode.label.toLowerCase()} mode`,
      });
    } catch (error) {
      console.error('Error updating display mode:', error);
      toast.error('Failed to update display mode', {
        description: 'Please try again in a moment.',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const IconComponent = currentModeData.icon;

  return (
    <Button
      className="flex items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition-all hover:bg-gray-50"
      onClick={handleCycleMode}
      disabled={isUpdating}
      title={`Current: ${currentModeData.label} mode - Click to cycle`}
    >
      {isUpdating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <IconComponent className="h-4 w-4" />
      )}
      <span>{currentModeData.label} Mode</span>
    </Button>
  );
}
