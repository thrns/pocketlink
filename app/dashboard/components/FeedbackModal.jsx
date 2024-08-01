'use client';

import { useState, useEffect } from 'react';
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

export default function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const now = Date.now();
    let firstVisit = localStorage.getItem('feedback-first-visit');
    const lastFeedbackShown = localStorage.getItem('feedback-last-shown');
    
    // Validate and fix invalid timestamp
    if (firstVisit) {
      const firstVisitTime = parseInt(firstVisit);
      // If timestamp is in the future or invalid, reset it
      if (firstVisitTime > now || isNaN(firstVisitTime)) {
        firstVisit = null;
        localStorage.removeItem('feedback-first-visit');
        localStorage.removeItem('feedback-last-shown'); // Also reset last shown
      }
    }

    // First time visitor - set timestamp but don't show immediately
    if (!firstVisit) {
      localStorage.setItem('feedback-first-visit', now.toString());
      return;
    }

    const firstVisitTime = parseInt(firstVisit);
    const lastShownTime = lastFeedbackShown ? parseInt(lastFeedbackShown) : 0;
    
    // Validate lastShownTime as well
    if (lastFeedbackShown && (lastShownTime > now || isNaN(lastShownTime))) {
      localStorage.removeItem('feedback-last-shown');
      return;
    }
    
    const daysSinceFirst = (now - firstVisitTime) / (1000 * 60 * 60 * 24);
    const daysSinceLastShown = (now - lastShownTime) / (1000 * 60 * 60 * 24);

    // Don't show if timestamps are invalid
    if (daysSinceFirst < 0 || (lastFeedbackShown && daysSinceLastShown < 0)) {
      return;
    }

    // Show after 3 days from first visit if never shown before
    if (!lastFeedbackShown && daysSinceFirst >= 3) {
      setIsOpen(true);
      return;
    }

    // Show every 7 days after the last time it was shown/dismissed
    if (lastFeedbackShown && daysSinceLastShown >= 7) {
      setIsOpen(true);
      return;
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('feedback-last-shown', Date.now().toString());
    setIsOpen(false);
  };

  const handleFeedbackClick = () => {
    localStorage.setItem('feedback-last-shown', Date.now().toString());
    window.open('https://forms.gle/uBvY2m57LJtUuKJc7', '_blank');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        handleDismiss();
      } else {
        setIsOpen(open);
      }
    }}>
      <DialogContent className="w-[95%] max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Help Us Improve PocketLink!
          </DialogTitle>
          <DialogDescription className="text-center">
            Share your experience to help us make PocketLink better
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative mb-4 h-32 w-32">
            <Image
              src="/AI/pocket.png"
              alt="PocketLink"
              fill
              className="object-contain"
              priority
            />
          </div>

          <p className="mb-3 text-center text-sm text-gray-600">
            We'd love to hear about your experience with PocketLink! Your feedback helps us improve our platform.
          </p>
          
          <Button
            onClick={handleFeedbackClick}
            className="w-full bg-gradient-to-r from-bento-violetLight to-bento-violet hover:from-bento-violet hover:to-bento-violetDark transition-all duration-200"
          >
            Share Feedback
          </Button>
        </div>


        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDismiss();
          }}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  );
}