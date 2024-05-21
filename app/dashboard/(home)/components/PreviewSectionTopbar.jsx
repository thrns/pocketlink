'use client';

import React, { useState, useEffect } from 'react';
import {
  Share2,
  Eye,
  Copy,
  ExternalLink,
  Check,
  ChevronRight,
} from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { useAuth } from '@/app/contexts/AuthContext';
import { toast } from 'sonner';
import Link from 'next/link';
import { CiDesktop } from 'react-icons/ci';
import SharePopoverContent from '../../../../components/dashboardComponents/SharePopoverContent';

const PreviewSectionTopbar = () => {
  const { user } = useAuth();

  return (
    <div className="sticky right-0 z-50">
      <div className="flex h-16 items-center justify-center gap-2">
        {/* Left Section - Preview Label */}
        <Link
          href="/dashboard/edit-desktop"
          className="flex items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition-all hover:bg-gray-50"
        >
          <CiDesktop size={16} />
          <span>reArrange Desktop</span>
        </Link>

        {/* Right Section - Share Button */}
        <div className="flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition-all hover:bg-gray-50">
                <Share2 size={16} /> <span>Share Link</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <SharePopoverContent />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default PreviewSectionTopbar;
