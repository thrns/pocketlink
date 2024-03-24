'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function PurchasePremium() {
  const router = useRouter();
  const { user } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  useEffect(() => {
    // Only redirect if user is logged in
    if (user) {
      const timer = setTimeout(() => {
        window.location.href = 'https://pmny.in/iJU67qZVXkoG';
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      // Show login dialog if not logged in
      setShowLoginDialog(true);
    }
  }, [user]);

  const handlePaymentClick = () => {
    if (user) {
      window.location.href = 'https://pmny.in/iJU67qZVXkoG';
    } else {
      setShowLoginDialog(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-400 to-purple-600 px-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-xl border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-md"
      >
        <div className="mb-6">
          <div className="relative mx-auto h-16 w-16">
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-white/30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-t-4 border-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>
        <h1 className="mb-4 text-2xl font-bold">Redirecting to Payment</h1>
        <p className="mb-6 text-sm opacity-80">
          You are being redirected to our secure payment gateway...
        </p>
        <button
          onClick={handlePaymentClick}
          className="w-full rounded-lg bg-white bg-opacity-90 px-6 py-3 font-medium text-indigo-600 transition"
        >
          Proceed to Payment
        </button>
      </motion.div>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              Login Required
            </DialogTitle>
            <DialogDescription className="pt-2 text-center">
              You need to be logged in to purchase premium features. Please
              login or create an account to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-400/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="sm:w-1/2"
            >
              Go Back
            </Button>
            <Button
              className="bg-gradient-to-r from-indigo-400 to-purple-600 shadow-lg transition-shadow sm:w-1/2"
              onClick={() => router.push('/login')}
            >
              Login / Sign Up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
