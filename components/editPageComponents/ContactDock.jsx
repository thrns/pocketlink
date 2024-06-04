'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useFetch } from '@/app/contexts/FetcherContext';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dock, DockIcon } from '@/components/ui/dock';
import {
  Mail,
  Phone,
  Globe,
  Trash2,
  PlusCircle,
  Upload,
  Edit3 as EditIcon,
} from 'lucide-react';
import { safeWindowOpen } from '@/utils/urlUtils';

// Example shape in `dockItems`:
// {
//   id: number | string,
//   type: "phone" | "email" | "calendar" | "social" | "custom",
//   label: string,
//   link: string,     // e.g. tel:..., mailto:..., https://...
//   iconUrl: string,  // either auto-favicon or user-uploaded
// }

export default function DockContainer({
  component,
  tenant = false,
  themeData,
}) {
  const { profile, setProfile } = useFetch();
  
  // Memoize the initial dock items to prevent unnecessary re-initializations
  const initialDockItems = useMemo(() => {
    return component?.componentProps || profile?.component?.componentProps || [];
  }, [component?.componentProps, profile?.component?.componentProps]);
  
  // We'll mirror `dockItems` in local state, but sync it with `profile`.
  const [dockItems, setDockItems] = useState(initialDockItems);

  // Use refs to track previous values and prevent infinite loops
  const prevProfilePropsRef = useRef();
  const prevDockItemsRef = useRef();

  // Memoize the profile update function to prevent unnecessary re-renders
  const updateProfile = useCallback((newDockItems) => {
    setProfile((prev) => ({
      ...prev,
      component: {
        ...prev.component,
        componentProps: newDockItems,
      },
    }));
  }, [setProfile]);

  // Single useEffect to handle synchronization from profile to local state
  // This prevents circular dependencies by only syncing in one direction initially
  useEffect(() => {
    const profileProps = profile?.component?.componentProps;
    if (profileProps && Array.isArray(profileProps)) {
      const profilePropsStr = JSON.stringify(profileProps);
      const currentDockItemsStr = JSON.stringify(dockItems);
      
      // Only update local state if profile props are different from current dockItems
      if (profilePropsStr !== currentDockItemsStr) {
        setDockItems(profileProps);
      }
    }
  }, [profile?.component?.componentProps]);

  // Separate function to handle manual updates (called by user actions)
  const handleDockItemsUpdate = useCallback((newDockItems) => {
    setDockItems(newDockItems);
    // Debounce the profile update to prevent rapid successive calls
    const timeoutId = setTimeout(() => {
      updateProfile(newDockItems);
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [updateProfile]);

  // Edit mode toggling
  const [isEditing, setIsEditing] = useState(true);

  // Popover state
  const [showPopover, setShowPopover] = useState(!tenant);

  // New item fields
  const [newType, setNewType] = useState('');
  const [newValue, setNewValue] = useState('');
  const fileInputRef = useRef(null);

  /** Add a new dock item */
  function addDockItem() {
    if (!newType || !newValue) return;

    let link = '';
    let defaultIconUrl = '';

    switch (newType) {
      case 'phone':
        link = `tel:${newValue}`;
        break;
      case 'email':
        link = `mailto:${newValue}`;
        break;
      case 'calendar':
        link = newValue;
        break;
      case 'social':
      default:
        // Ensure the URL has proper format
        link = newValue.startsWith('http') ? newValue : `https://${newValue}`;
        try {
          const domain = new URL(link).hostname;
          defaultIconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`;
        } catch (err) {
          defaultIconUrl = '';
        }
        break;
    }

    const finalIconUrl = defaultIconUrl;

    const newItem = {
      id: Date.now(), // or a UUID
      type: newType,
      label: newType, // you can let user rename it if you wish
      link,
      iconUrl: finalIconUrl,
    };

    handleDockItemsUpdate([...dockItems, newItem]);

    // Reset form & close popover
    setNewType('');
    setNewValue('');
    setShowPopover(false);
  }

  /** Remove a specific dock item */
  function removeDockItem(id) {
    handleDockItemsUpdate(dockItems.filter((item) => item.id !== id));
  }

  /** Handle clicking on a dock icon */
  function handleDockClick(link) {
    // Ensure we're opening the complete URL
    if (link) {
      safeWindowOpen(link);
    }
  }

  return (
    <div className="flex w-full flex-col items-center rounded-lg">
      {/* The Dock itself (magicUI) */}
      <Dock
        style={{
          background: themeData?.cardBackground,
          color: themeData?.textMode === 'dark' ? 'dark' : 'white',
          borderColor: themeData?.border,
        }}
        iconMagnification={60}
        iconDistance={80}
      >
        {dockItems.map((dock, index) => (
          <DockIcon
            className="relative"
            onClick={() => handleDockClick(dock.link)}
            key={index}
          >
            {/* Display icon or fallback */}
            {dock.iconUrl ? (
              <img
                src={dock.iconUrl}
                alt={dock.label}
                className="h-8 w-8 object-contain"
              />
            ) : dock.type === 'phone' ? (
              <Phone size={20} />
            ) : dock.type === 'email' ? (
              <Mail size={20} />
            ) : (
              <Globe size={20} />
            )}

            {/* Remove button when editing */}
            {!tenant && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeDockItem(dock.id);
                }}
                className="absolute right-0 top-0 rounded-full bg-red-500 hover:bg-red-600 p-0.5 text-white"
              >
                <Trash2 size={14} />
              </button>
            )}
          </DockIcon>
        ))}

        {/* Add new dock item (only if tenant is false) */}
        {!tenant && dockItems.length >= 0 && dockItems.length <= 5 && (
          <DockIcon>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  style={{ borderColor: themeData.border }}
                  className="border"
                >
                  <PlusCircle
                    size={36}
                    className="text-gray-400 dark:text-gray-600"
                    style={{ color: themeData.color }}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 space-y-3 p-4 dark:bg-neutral-800 dark:text-white">
                <p className="text-sm font-semibold">Add New Dock Item</p>

                {/* Type Selector */}
                <select
                  className="w-full rounded border p-1 text-black"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                >
                  <option value="">-- Select Type --</option>
                  <option value="social">Social Link</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="calendar">Calendar</option>
                </select>

                {/* Value Input */}
                <Input
                  placeholder={
                    newType === 'phone'
                      ? 'Enter phone number'
                      : newType === 'email'
                        ? 'Enter email'
                        : 'Paste link'
                  }
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="text-black"
                />

                {/* Add Button */}
                <Button
                  variant="default"
                  onClick={addDockItem}
                  disabled={!newType || !newValue}
                >
                  Add
                </Button>
              </PopoverContent>
            </Popover>
          </DockIcon>
        )}
      </Dock>

      {/* Add Dock Item popover */}
    </div>
  );
}
