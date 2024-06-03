'use client';
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetch } from '@/app/contexts/FetcherContext';
import DockContainer from './ContactDock';
import { useController } from '@/app/contexts/ControllerContext';
import { Textarea } from '@/components/ui/textarea'; // Import Textarea component
import { Input } from '@/components/ui/input'; // Import Input component

export default function LeftSection({ id, themeData }) {
  // =========== HOOKS =========== //
  const { viewMode } = useController();

  const textColor = themeData?.textMode === 'dark' ? 'black' : 'white';
  const descriptionColor =
    themeData?.textMode === 'dark' ? '#1c1c1b' : '#f0f0ed';

  // =========== STATES =========== //
  const { profile, setProfile } = useFetch();
  const { profileLoading } = useFetch();
  const [isEditing, setIsEditing] = useState({
    name: false,
    description: false,
  });
  const [mounted, setMounted] = useState(false);

  // =========== USE EFFECT =========== //
  useEffect(() => {
    setMounted(true);
  }, []);

  // =========== HANDLE INPUT CHANGE =========== //
  const handleInputChange = (field, value) => {
    const sanitizedValue = value.replace(/<[^>]+>/g, '');
    const maxLength = field === 'name' ? 35 : 130;

    const updatedProfile = {
      ...profile,
      [field]: sanitizedValue.slice(0, maxLength),
    };
    setProfile(updatedProfile);
  };

  // =========== ENABLE EDITING =========== //
  const enableEditing = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  // =========== HANDLE BLUR =========== //
  const handleBlur = (field) => {
    setIsEditing({ ...isEditing, [field]: false });
  };

  // =========== FORMAT TEXT =========== //
  const formatText = (text) => {
    if (!text) return '';
    return text
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">$1</a>'
      )
      .replace(/\n/g, '<br>');
  };

  // =========== SKELETONS WHILE LOADING... =========== //
  if (profileLoading) {
    return (
      <div className="mt-10 flex w-full flex-col items-center justify-start gap-10 p-4">
        <Skeleton className="h-40 w-40 rounded-full" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mt-20 text-center text-gray-500">No profile data...</div>
    );
  }

  // =========== JSX =========== //
  return (
    <main className="relative flex h-full w-full flex-col items-center justify-start rounded-md text-black dark:text-white md:overflow-y-auto">
      <div className="flex w-full flex-col items-center space-y-2 p-1">
        {/* Name (click to edit) */}
        <div className="flex w-full flex-col items-center">
          {isEditing.name ? (
            <Input
              value={profile?.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              autoFocus
              maxLength={35}
              className="h-full w-[90%] border-none bg-transparent text-center text-2xl font-semibold outline-none focus:ring-0"
              style={{ color: textColor }}
            />
          ) : (
            <p
              style={{ color: textColor }}
              className="cursor-pointer text-center text-2xl font-semibold"
              onClick={() => enableEditing('name')}
            >
              {mounted && profile?.name?.length > 0
                ? profile?.name
                : 'Enter your name'}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="relative flex w-full flex-col items-center">
          {isEditing.description ? (
            <>
              <Textarea
                value={profile?.description || ''}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                onBlur={() => handleBlur('description')}
                autoFocus
                maxLength={130}
                className="max-h-[200px] min-h-[180px] w-[90%] whitespace-pre-wrap break-words border-none bg-transparent text-center text-base outline-none focus:ring-0"
                style={{ color: descriptionColor }}
              />
              <div className="mt-1 text-center text-xs text-gray-500">
                {profile?.description?.length || 0}/130 characters
              </div>
            </>
          ) : (
            <p
              style={{ color: descriptionColor }}
              className="w-full cursor-pointer whitespace-pre-wrap break-words text-center text-base"
              onClick={() => enableEditing('description')}
              dangerouslySetInnerHTML={{
                __html: formatText(
                  profile?.description?.length > 0
                    ? profile?.description
                    : 'Enter bio...'
                ),
              }}
              suppressHydrationWarning
            />
          )}
        </div>
      </div>

      <div className={`mt-4 w-full`}>
        <DockContainer component={profile?.component} themeData={themeData} />
      </div>
    </main>
  );
}
