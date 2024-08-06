'use client';
import React, { useContext, useState } from 'react';
import { CiDesktop, CiMobile1 } from 'react-icons/ci';
import { Edit2Icon, ExternalLinkIcon } from 'lucide-react';
import { isMobile } from 'react-device-detect';
import { useAuth } from '@/app/contexts/AuthContext';
import Link from 'next/link';

const Overview = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState(isMobile ? 'mobile' : 'desktop'); // "desktop" or "mobile"

  return (
    <article className="mb-8">
      {/* Top Buttons */}
      <div className="mx-auto mb-6 mt-10 flex max-w-7xl flex-wrap items-center justify-center gap-3 md:justify-between md:space-y-0">
        <div className="flex gap-3">
          {/* Desktop View Button */}
          <button
            onClick={() => !isMobile && setViewMode('desktop')}
            disabled={isMobile} // Disable button if on a mobile device
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              viewMode === 'desktop'
                ? 'bg-gradient-to-r from-bento-blue to-purple-600 text-white shadow-lg'
                : isMobile
                  ? 'cursor-not-allowed bg-gray-200 text-gray-400' // Disabled styling
                  : 'bg-gray-100 bg-gray-200 text-gray-800'
            }`}
          >
            <CiDesktop size={18} />
            {!isMobile && 'Desktop View'}
          </button>

          {/* Mobile View Button */}
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              viewMode === 'mobile'
                ? 'bg-gradient-to-r from-bento-blue to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 bg-gray-200 text-gray-800'
            }`}
          >
            <CiMobile1 size={18} />
            {!isMobile && 'Mobile View'}
          </button>

          {/* Open Link */}
          <button
            onClick={() =>
              window.open(`https://${user?.username}.pocketlink.co/`)
            }
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-tr from-bento-pink to-bento-blue px-4 py-2 text-sm font-medium text-white opacity-90 shadow-lg transition-all"
          >
            <ExternalLinkIcon size={18} />
            {!isMobile && 'Open PocketLink'}
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div
        className={`flex items-center justify-center rounded-lg ${
          viewMode === 'mobile'
            ? 'mx-auto w-full bg-black md:max-w-[1280px] md:py-6'
            : 'bg-gray-100 p-6'
        }`}
      >
        {/* Desktop View */}
        {viewMode === 'desktop' && (
          <div className="h-[720px] w-[1280px] overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
            <iframe
              src={`https://${user?.username}.pocketlink.co`}
              className="h-full w-full"
              frameBorder="0"
              allowFullScreen
              style={{
                transform: 'scale(0.8)',
                transformOrigin: 'top left',
                width: '1600px', // Simulating a larger screen width
                height: '900px', // Simulating a larger screen height
              }}
            ></iframe>
          </div>
        )}

        {/* Mobile View */}
        {viewMode === 'mobile' && (
          <div className="h-[667px] w-full overflow-hidden rounded-lg border border-gray-800 bg-black shadow-lg md:w-[375px]">
            <div className="flex h-full w-full items-center justify-center">
              <iframe
                src={`https://${user?.username}.pocketlink.co`}
                className="border-none"
                allowFullScreen
                style={{
                  transform: 'scale(1)',
                  transformOrigin: 'top left',
                  width: '375px',
                  height: '667px',
                }}
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
export default Overview;
