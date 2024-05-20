'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Monitor,
  Settings,
  PaintbrushVertical,
  Share2,
  ChevronLeft,
} from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import SharePopoverContent from '../../../../components/dashboardComponents/SharePopoverContent';

const HomeTopbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on the main dashboard page
  const isMainDashboard = pathname === '/dashboard';

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

        {/* Right Section - Settings */}
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/theme"
            className="hidden items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition-all hover:bg-gray-50 md:flex"
          >
            <PaintbrushVertical size={16} />
            <span>Theme</span>
          </Link>

          <Link
            href="/dashboard/templates"
            className="hidden items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition-all hover:bg-gray-50 md:flex"
          >
            <Monitor size={16} />
            <span>Templates</span>
          </Link>

          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition-all hover:bg-gray-50 md:hidden">
                <Share2 size={16} /> <span>Share Link</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <SharePopoverContent />
            </PopoverContent>
          </Popover>

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

export default HomeTopbar;
