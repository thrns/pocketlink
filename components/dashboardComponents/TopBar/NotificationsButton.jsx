'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Trash2 } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Tooltip } from 'react-tooltip';
import { useAuth } from '@/app/contexts/AuthContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { supabase } from '@/Clients/supabase/client';
import Cookies from 'js-cookie';

const NotificationsButton = ({ iconSize = 20 }) => {
  const { user, notifications, setNotifications } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(
    notifications || []
  );

  // Format the notification time
  const formatNotificationTime = (timestamp) => {
    try {
      const date = new Date(timestamp);

      // If it's within the last 24 hours, show relative time (e.g., "2 hours ago")
      if (Date.now() - date.getTime() < 24 * 60 * 60 * 1000) {
        return formatDistanceToNow(date, { addSuffix: true });
      }

      // Otherwise, show formatted date
      return format(date, "MMM d, yyyy 'at' h:mm a");
    } catch (error) {
      console.error('Error formatting time:', error, timestamp);
      return 'Unknown time';
    }
  };

  // Update user data in supabase and local storage/cookies
  const updateUserData = async (updatedNotifications) => {
    if (!user) return;

    setIsDeleting(true);

    try {
      // Update Supabase
      const { error } = await supabase
        .from('user_data')
        .update({ notifications: updatedNotifications })
        .eq('uuid', user.uuid);

      if (error) {
        console.error('Error updating notifications:', error);
        toast.error('Failed to delete notification');
        setIsDeleting(false);
        return false;
      }

      // Update context state
      setNotifications(updatedNotifications);

      // Update local user data
      const updatedUser = {
        ...user,
        notifications: updatedNotifications,
      };

      // Update cookies
      Cookies.set('user_data', JSON.stringify(updatedUser));
      if (Cookies.get('fallback_user_data')) {
        Cookies.set('fallback_user_data', JSON.stringify(updatedUser));
      }

      // Update localStorage if needed
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      setIsDeleting(false);
      return true;
    } catch (err) {
      console.error('Failed to update notifications:', err);
      toast.error('Failed to delete notification');
      setIsDeleting(false);
      return false;
    }
  };

  // Handle delete notification
  const handleDeleteNotification = async (id) => {
    if (isDeleting) return;

    const updatedNotifications = (localNotifications || []).filter(
      (notification) => notification.id !== id
    );

    const success = await updateUserData(updatedNotifications);
    if (success) {
      toast.success('Notification deleted');
      setLocalNotifications(updatedNotifications);
    }
  };

  // Handle delete all notifications
  const handleClearAll = async () => {
    if (isDeleting || !localNotifications?.length) return;

    const success = await updateUserData([]);
    if (success) {
      toast.success('All notifications cleared');
      setLocalNotifications([]);
      setIsOpen(false);
    }
  };

  // Count unread notifications
  const unreadCount = (localNotifications || []).filter(
    (notification) => !notification.read
  ).length;

  // Function to mark a notification as read
  const markAsRead = async (id) => {
    if (isDeleting) return;

    const updatedNotifications = localNotifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );

    const success = await updateUserData(updatedNotifications);
    if (success) {
      setLocalNotifications(updatedNotifications);
    }
  };

  // Force-fetch notifications from user to ensure they're loaded
  const fetchNotificationsFromUser = async () => {
    if (!user?.uuid) return;

    try {
      const { data, error } = await supabase
        .from('user_data')
        .select('notifications')
        .eq('uuid', user.uuid)
        .single();

      if (error) {
        console.error('Error fetching notifications:', error);
        return;
      }

      if (data?.notifications) {
        console.log('Fetched notifications from DB:', data.notifications);
        setNotifications(data.notifications);
        setLocalNotifications(data.notifications);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  // Fetch notifications when component mounts or when user changes
  useEffect(() => {
    if (
      user?.uuid &&
      (!localNotifications || localNotifications.length === 0)
    ) {
      fetchNotificationsFromUser();
    }
  }, [user?.uuid]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="relative items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition-all hover:bg-gray-50 flex"
          data-tooltip-id="notifications"
          data-tooltip-content="Notifications"
          onClick={() => {
            // Fetch notifications when opening popover if none exist
            if (!localNotifications || localNotifications.length === 0) {
              fetchNotificationsFromUser();
            }
          }}
        >
          <Bell size={iconSize} />
          {unreadCount > 0 && (
            <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
          <Tooltip id="notifications" effect="solid" place="bottom" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0" align="end" side="bottom">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-semibold">Notifications</h3>
          {(localNotifications || []).length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 bg-red-50 px-2 text-xs text-red-500 text-red-700"
              onClick={handleClearAll}
              disabled={isDeleting}
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="overflow-hidden" style={{ maxHeight: '300px' }}>
          <ScrollArea className="h-[300px]">
            {!localNotifications || localNotifications.length === 0 ? (
              <div className="py-6 text-center text-gray-500">
                <div className="mb-2 flex justify-center">
                  <Bell className="h-8 w-8 text-gray-300" />
                </div>
                <p className="text-sm">No notifications to display</p>
              </div>
            ) : (
              <div className="divide-y">
                {localNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`relative p-4 transition-all ${
                      !notification.read ? 'bg-blue-50' : 'bg-gray-50'
                    }`}
                    onClick={() =>
                      !notification.read && markAsRead(notification.id)
                    }
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">
                          {notification.title}
                        </h4>
                        <p className="mt-1 text-xs text-gray-600">
                          {notification.message}
                        </p>
                        <p className="mt-1.5 text-xs text-gray-400">
                          {formatNotificationTime(notification.time)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 bg-red-50 text-gray-400 text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(notification.id);
                        }}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsButton;
