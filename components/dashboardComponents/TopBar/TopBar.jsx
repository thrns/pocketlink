'use client';

import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  Eye,
  Share2,
  Monitor,
  Smartphone,
  Settings,
} from 'lucide-react';
import { useFetch } from '@/app/contexts/FetcherContext';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import NotificationsButton from './NotificationsButton';
import { useController } from '@/app/contexts/ControllerContext';
import { Tooltip } from 'react-tooltip';
import { isMobile, isTablet, isDesktop } from 'react-device-detect';
import { toast } from 'sonner';
import SharePopoverContent from '../SharePopoverContent';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

const TopBar = () => {
  const { user, notifications } = useAuth();
  const router = useRouter();
  const { saveStatus } = useFetch();
  const {
    viewMode,
    setViewMode,
    isMobileArrange,
    setIsMobileArrange,
    open,
    setOpen,
  } = useController();

  const pathname = usePathname();

  const [linkCopied, setLinkCopied] = useState(false);

  // Get the current page name from pathname
  const getPageName = () => {
    const segments = pathname.split('/').filter((segment) => segment !== '');
    if (segments.length <= 1) return 'Dashboard';

    // Capitalize the last segment
    const lastSegment = segments[segments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  // Handle back navigation
  const handleBack = () => {
    router.back();
  };

  // Check if we're on the main dashboard page
  const isMainDashboard = pathname === '/dashboard';
  const isEditPage =
    pathname === '/dashboard' || /^\/dashboard\/\d+$/.test(pathname);

  //================ COPY FUNCTIONS ================//
  const handleCopy = () => {
    const url = `https://${user?.username}.pocketlink.co`;
    navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
    });
    if (user?.username) {
      toast.success('Link copied to clipboard');
    } else {
      toast.error('Try again later');
    }
  };

  useEffect(() => {
    if (linkCopied) {
      const timer = setTimeout(() => {
        setLinkCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [linkCopied]);

  //================ JSX ================//

  return (
    <div className="sticky z-50 border-b">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Section - Dashboard Breadcrumb */}
        <div className="flex items-center">
          {!isMainDashboard && (
            <button
              onClick={handleBack}
              className="mr-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <h1 className="text-xl font-semibold text-gray-900">
            {getPageName()}
          </h1>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {isEditPage && (
            <>
              <span
                data-tooltip-id="save-status"
                className={`${
                  saveStatus === 'saved'
                    ? 'text-green-500'
                    : saveStatus === 'saving'
                      ? 'text-yellow-500'
                      : 'text-red-500'
                } text-xs font-medium sm:text-sm`}
              >
                {saveStatus}
              </span>

              {/* Desktop View Button - Only show on desktop */}
              {!isMobile && (
                <button
                  data-tooltip-id="desktop-view"
                  data-tooltip-content="Desktop View"
                  className="hidden items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition-all hover:bg-gray-50 md:flex"
                  onClick={() => router.push('/dashboard/edit-desktop')}
                >
                  <Monitor size={16} />
                  <span>Desktop</span>
                  <Tooltip id="desktop-view" place="top" effect="solid" />
                </button>
              )}

              {/* Mobile View Button - Only show on mobile */}
              {isMobile && (
                <button
                  data-tooltip-id="mobile-view"
                  data-tooltip-content="reArrange layout"
                  className="flex items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition-all hover:bg-gray-50"
                  onClick={() => setIsMobileArrange(!isMobileArrange)}
                >
                  <Smartphone size={16} />
                  <span>Mobile</span>
                  <Tooltip id="mobile-view" place="top" effect="solid" />
                </button>
              )}
            </>
          )}

          {/* Notifications Button */}
          {!isEditPage && <NotificationsButton iconSize={isMobile ? 16 : 20} />}

          {/* Preview Button */}
          <button
            data-tooltip-id="preview"
            data-tooltip-content="Preview"
            onClick={() =>
              window.open(`https://${user?.username}.pocketlink.co`)
            }
            className="hidden items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition-all hover:bg-gray-50 md:flex"
          >
            <Eye size={16} />
            <span>Preview</span>
            <Tooltip id="preview" effect="solid" place="bottom" />
          </button>

          {/* Share Button */}

          <Popover>
            <PopoverTrigger asChild>
              <button
                data-tooltip-id="share"
                data-tooltip-content={linkCopied ? 'Copied!' : 'Copy Link'}
                className="flex items-center space-x-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800"
              >
                <Share2 size={16} />
                <span className="hidden md:inline">Share</span>
                <Tooltip id="share" effect="solid" place="bottom" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <SharePopoverContent />
            </PopoverContent>
          </Popover>

          {/* Settings Button */}
          <Link
            href="/dashboard/settings"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 ring-1 ring-gray-300 transition-all hover:bg-gray-50"
          >
            <Settings size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Utility function to capitalize the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default TopBar;
