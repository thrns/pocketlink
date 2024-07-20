'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Bell } from 'lucide-react';
import { useFetch } from '@/app/contexts/FetcherContext';

const SubscribeButton = ({ themeData }) => {
  const { profile, setProfile } = useFetch(); // Fetch user profile
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Handle Toggle Subscription
  const handleSubscription = async (status) => {
    setLoading(true);

    try {
      // Update profile state
      setProfile((prevProfile) => ({
        ...prevProfile,
        subscribeButtonOn: status,
      }));
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get text color based on theme
  const getTextColor = () => {
    return themeData?.textMode === 'dark'
      ? { color: 'black' }
      : { color: 'white' };
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            style={getTextColor()}
            variant="ghost"
            className="relative mx-4 mb-4 mt-2 flex items-center gap-2 rounded-full border px-4 py-2"
          >
            <Bell size={16} className="animate-pulse" />
            <p className="text-sm">Subscribe</p>
          </Button>
        </PopoverTrigger>

        {/* Popover Content */}
        <PopoverContent className="w-52 p-4 text-center">
          <p className="mb-3 text-sm font-medium text-gray-700">
            Turn subscription button:
          </p>
          <div className="flex justify-between gap-2">
            <Button
              disabled={loading}
              className={`w-full ${
                profile?.subscribeButtonOn &&
                'border-green-500 bg-green-500 bg-green-700 text-white'
              }`}
              onClick={() => handleSubscription(true)}
            >
              On
            </Button>
            <Button
              disabled={loading}
              className={`w-full ${
                profile?.subscribeButtonOn === false &&
                'border-red-500 bg-red-500 bg-red-700 text-white'
              }`}
              onClick={() => handleSubscription(false)}
            >
              Off
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Subscription Dialog (only shown when subscribeButtonOn is true) */}
      {profile?.subscribeButtonOn && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {/* This is a hidden trigger for the dialog */}
            <span style={{ display: 'none' }}></span>
          </DialogTrigger>

          <DialogContent className="w-[95vw] rounded-lg p-6 md:max-w-md">
            <DialogTitle>
              <h2 className="text-lg font-semibold">Subscribe for Updates</h2>
              <p className="text-sm text-gray-500">
                Enter your details to stay updated.
              </p>
            </DialogTitle>

            {/* This part would contain the subscription form */}
            {/* It's not implemented here as it would require the audience data fetching logic */}
            {/* which should be handled separately */}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default SubscribeButton;
