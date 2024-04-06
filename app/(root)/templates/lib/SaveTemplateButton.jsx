'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/Clients/supabase/client';
import { Loader2, LogIn, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { useFetch } from '@/app/contexts/FetcherContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useRouter, usePathname } from 'next/navigation';

export default function SaveTemplateButton({
  username,
  items,
  mobileItems,
  theme,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { setItems, setMobileItems } = useFetch();
  const router = useRouter();
  const pathname = usePathname();

  const handleSave = async () => {
    if (!username) {
      // Show login dialog instead of setting error
      setShowLoginDialog(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('items_data')
        .update([
          {
            items,
            mobileItems,
            theme,
          },
        ])
        .eq('username', username);

      if (error) {
        throw new Error(error.message);
      }
      setItems(items);
      setMobileItems(mobileItems);

      // Simulate a 3-second delay before showing the toast
      setTimeout(() => {
        toast.success('Saved', {
          description: 'Layout successfully saved!',
          style: {
            backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD )',
            color: 'white',
            borderRadius: '8px',
          },
        });
        setLoading(false);
      }, 3000);
    } catch (err) {
      console.error('Error saving template:', err.message);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setShowLoginDialog(false);
    router.push(`/auth/signin?redirect=${encodeURIComponent(pathname)}`);
  };

  const handleSignup = () => {
    setShowLoginDialog(false);
    router.push(`/auth/signup?redirect=${encodeURIComponent(pathname)}`);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Save Button */}
      <Button
        onClick={handleSave}
        disabled={loading}
        className={`mt-8 flex w-full items-center justify-center px-4 py-2 text-white ${
          loading
            ? 'cursor-not-allowed bg-gray-400'
            : theme?.textMode === 'dark'
              ? 'bg-black bg-gray-800 text-white'
              : 'bg-gray-200 bg-white text-black'
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          'Use Template'
        )}
      </Button>

      {/* Error Message */}
      {error && <p className="mt-2 text-red-500">{error}</p>}

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Login Required
            </DialogTitle>
            <DialogDescription className="mt-2 text-gray-600 dark:text-gray-300">
              You need to login and complete onboarding to use this template.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Creating an account lets you customize and save this template to
              your own PocketLink page.
            </p>
          </div>

          <DialogFooter className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              className="flex flex-1 items-center gap-2"
              onClick={handleLogin}
            >
              <LogIn size={16} />
              Login
            </Button>
            <Button
              className="flex flex-1 items-center gap-2 bg-blue-600 bg-blue-700"
              onClick={handleSignup}
            >
              <UserPlus size={16} />
              Sign Up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
