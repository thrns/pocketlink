'use client';

import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';

export default function MobileNotificationModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user is on mobile and hasn't dismissed the modal before
    if (isMobile && !localStorage.getItem('mobile-notification-dismissed')) {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    // Save to localStorage so we don't show it again in this session
    localStorage.setItem('mobile-notification-dismissed', 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[95%] max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Mobile Experience
          </DialogTitle>
          <DialogDescription className="text-center">
            We're improving our mobile experience
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative mb-4 h-40 w-40">
            <Image
              src="/AI/pocket.png"
              alt="PocketLink"
              fill
              className="object-contain"
              priority
            />
          </div>

          <p className="mb-2 text-center text-sm text-gray-600">
            Our mobile experience is currently being improved for optimal
            performance.
          </p>
          <p className="text-center text-sm text-gray-600">
            For the best experience, we recommend using PocketLink on desktop.
          </p>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleDismiss}
          >
            Continue on Mobile
          </Button>
          <Button
            className="w-full bg-gradient-to-r from-bento-violetLight to-bento-violet sm:w-auto"
            onClick={handleDismiss}
          >
            Got it
          </Button>
        </DialogFooter>

        <button
          onClick={handleDismiss}
          className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-100 opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  );
}
