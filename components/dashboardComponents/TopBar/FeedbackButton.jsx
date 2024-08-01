'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Mail, MessageCircleHeart, Star } from 'lucide-react';
import { isMobile, isTablet } from 'react-device-detect';
import Link from 'next/link';

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);

  // Pre-fill email subject & body for reporting bugs/suggestions
  const mailTo = `mailto:support@pocketlink.co?subject=Pocketlink%20Feedback&body=Describe%20your%20bug%20or%20suggestion%20here...`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {!(isMobile || isTablet) && (
          <Button className="" variant="outline">
            <div className="flex items-center gap-2">
              <MessageCircleHeart />
              <span>Feedback</span>
            </div>
          </Button>
        )}
      </PopoverTrigger>

      <PopoverContent className="w-56 space-y-2 p-2">
        {/* Rate on X (Twitter) */}
        <Link
          href="https://x.com/pocketlink_co/status/1879500094275522864"
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center space-x-2 rounded-md bg-gray-100 p-2 dark:bg-gray-800"
        >
          <Star className="h-5 w-5 text-yellow-500" />
          <span className="text-sm font-medium">Rate on X</span>
        </Link>

        {/* Report a Bug / Suggest Improvement */}
        <a
          href={mailTo}
          className="flex cursor-pointer items-center space-x-2 rounded-md bg-gray-100 p-2 dark:bg-gray-800"
        >
          <Mail className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium">
            Report a Bug / Suggest Improvement
          </span>
        </a>
      </PopoverContent>
    </Popover>
  );
}
