'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Lock, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/contexts/AuthContext';
import { useItems } from '@/app/contexts/ItemsContext';
import { useFetch } from '@/app/contexts/FetcherContext';
import { supabase } from '@/Clients/supabase/client';
import { toast } from 'react-hot-toast';

export default function NestedCardSubscriptionSettings({ nestedCardId, themeData }) {
  const { user } = useAuth();
  const { updateItemContent } = useItems();
  const { items } = useFetch();
  
  const [showDialog, setShowDialog] = useState(false);
  const [availableSubscriptions, setAvailableSubscriptions] = useState([]);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false);
  
  // Find the current nested card
  const currentCard = items?.find(item => item.i === nestedCardId);
  const [requiresSubscription, setRequiresSubscription] = useState(currentCard?.requiresSubscription || false);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(currentCard?.subscriptionId || '');

  // Fetch available merchant subscriptions
  useEffect(() => {
    if (showDialog && user?.username) {
      fetchMerchantSubscriptions();
    }
  }, [showDialog, user?.username]);

  const fetchMerchantSubscriptions = async () => {
    if (!user?.username) return;
    
    setLoadingSubscriptions(true);
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('uuid, subscription_name, subscription_description, is_paid, price, currency')
        .eq('username', user.username);
      
      if (error) {
        console.error('Error fetching subscriptions:', error);
        toast.error('Failed to load subscriptions');
      } else {
        setAvailableSubscriptions(data || []);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to load subscriptions');
    } finally {
      setLoadingSubscriptions(false);
    }
  };

  // Handle subscription toggle
  const handleSubscriptionToggle = (checked) => {
    setRequiresSubscription(checked);
    updateItemContent(nestedCardId, { requiresSubscription: checked });
    
    if (checked && availableSubscriptions.length === 0) {
      toast.error('No subscriptions available. Create a subscription first.');
      setRequiresSubscription(false);
      updateItemContent(nestedCardId, { requiresSubscription: false });
    } else if (!checked) {
      // Clear subscription when toggled off
      setSelectedSubscriptionId('');
      updateItemContent(nestedCardId, { subscriptionId: '' });
    }
  };

  // Handle subscription selection
  const handleSubscriptionSelect = (subscriptionId) => {
    setSelectedSubscriptionId(subscriptionId);
    updateItemContent(nestedCardId, { subscriptionId });
  };

  const textColor = themeData?.textMode === 'dark' ? 'black' : 'white';

  return (
    <>
      {/* Subscription Settings Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.8, x: 20 }}
        transition={{
          duration: 0.2,
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        className="relative mr-2 flex items-center gap-2 rounded-full border px-2 py-1"
        style={
          themeData?.textMode === 'dark'
            ? { color: 'black', backgroundColor: 'white' }
            : { color: 'white', backgroundColor: 'black' }
        }
      >
        <Settings
          style={{ color: textColor }}
          className="cursor-pointer"
          onClick={() => setShowDialog(true)}
        />
        {requiresSubscription && selectedSubscriptionId && (
          <Lock
            style={{ color: textColor }}
            className="h-4 w-4"
          />
        )}
      </motion.div>

      {/* Subscription Settings Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Nested Card Subscription Settings
            </DialogTitle>
            <DialogDescription>
              Lock this nested card behind a subscription tier
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Subscription Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="subscription-toggle" className="text-sm font-medium">
                  Require Subscription
                </Label>
                <p className="text-xs text-gray-500">
                  Users need to subscribe to access this nested card
                </p>
              </div>
              <Switch
                id="subscription-toggle"
                checked={requiresSubscription}
                onCheckedChange={handleSubscriptionToggle}
              />
            </div>
            
            {/* Subscription Selection */}
            {requiresSubscription && (
              <div className="space-y-2">
                <Label htmlFor="subscription-select" className="text-sm font-medium">
                  Select Subscription <span className="text-red-500">*</span>
                </Label>
                {loadingSubscriptions ? (
                  <p className="text-sm text-gray-500">Loading subscriptions...</p>
                ) : availableSubscriptions.length === 0 ? (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                    <p className="text-sm text-amber-700">
                      No subscriptions available. <a href="/dashboard/subscriptions/new" className="underline">Create a subscription first</a>.
                    </p>
                  </div>
                ) : (
                  <Select
                    value={selectedSubscriptionId}
                    onValueChange={handleSubscriptionSelect}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a subscription tier" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSubscriptions.map((subscription) => (
                        <SelectItem key={subscription.uuid} value={subscription.uuid}>
                          <div className="flex items-center gap-2">
                            {subscription.is_paid ? (
                              <Crown className="h-4 w-4 text-amber-500" />
                            ) : (
                              <div className="h-4 w-4 rounded-full bg-green-500" />
                            )}
                            <span>{subscription.subscription_name}</span>
                            {subscription.is_paid && subscription.price && (
                              <span className="text-sm text-gray-500">
                                (₹{subscription.price} {subscription.currency || 'INR'})
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                
                {selectedSubscriptionId && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                    <p className="text-sm text-green-700">
                      ✓ This nested card will be locked for non-subscribers
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}