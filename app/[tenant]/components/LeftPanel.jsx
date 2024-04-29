'use client';

import { useState, useEffect } from 'react';
import BackButton from './BackButton';
import TenantSubscribeButton from './TenantSubscribeButton';
import DockContainer from '@/components/editPageComponents/ContactDock';
export default function LeftPanel({
  profile,
  id,
  username,
  tenantTheme,
  isPremium,
}) {
  if (!profile) {
    return (
      <div className="mt-20 text-center text-gray-500">No profile data...</div>
    );
  }

  const textColor = tenantTheme?.textMode === 'dark' ? 'black' : 'white';
  const descriptionColor =
    tenantTheme?.textMode === 'dark' ? '#1c1c1b' : '#f0f0ed';

  // =========== FORMAT TEXT =========== //
  const formatText = (text) => {
    return text
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">$1</a>'
      )
      .replace(/\n/g, '<br>');
  };

  return (
    <main className="relative flex h-full w-full flex-col items-center justify-start rounded-md text-black dark:text-white md:overflow-y-auto">
      <div className="flex w-full max-w-[97%] flex-col items-center space-y-2">
        {/* Name */}
        <div className="flex w-full flex-col items-center">
          <p
            style={{ color: textColor }}
            className="break-words text-center text-2xl font-semibold"
          >
            {profile?.name}
          </p>
        </div>

        {/* Description */}
        <div className="relative flex w-full flex-col items-center">
          <p
            style={{ color: descriptionColor }}
            className="w-full whitespace-pre-wrap break-words text-center text-base"
            dangerouslySetInnerHTML={{
              __html: formatText(profile?.description || ''),
            }}
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-4 w-full">
        <DockContainer
          component={profile?.component}
          tenant={true}
          themeData={tenantTheme}
        />
      </div>
    </main>
  );
}
