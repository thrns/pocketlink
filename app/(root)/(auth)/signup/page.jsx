'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { FaGoogle } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa6';
import { signInWithGoogle } from '@/lib/actions/auth-actions';
import Cookies from 'js-cookie';

// Create a separate component that uses useSearchParams
function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Extract referral from URL
  const referralParam = searchParams.get('referral');
  // Store referral in cookie and localStorage on component mount
  useEffect(() => {
    if (referralParam) {
      try {
        Cookies.set('referral_username', referralParam, { expires: 1 });

        // Also store in localStorage as a backup
        localStorage.setItem('referral_username', referralParam);
      } catch (error) {
        console.error('Error setting referral storage:', error);
      }
    }
  }, [referralParam]);

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error during signup:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <img src="/ogImg.png" alt="PocketLink Logo" className="h-16 w-auto" />
      </div>

      {/* Animated Gradient Title */}
      <h2 className="mb-6 text-center text-3xl font-bold">
        <AnimatedGradientText>Welcome to PocketLink</AnimatedGradientText>
      </h2>

      {/* Referral Banner */}
      {referralParam && (
        <div className="mb-6 rounded-md border border-purple-200 bg-purple-50 p-3 text-center">
          <p className="text-sm text-purple-700">
            You were invited by{' '}
            <span className="font-bold">{referralParam}</span>
          </p>
          <p className="mt-1 text-xs text-purple-500">
            Referral ID: {referralParam}
          </p>
        </div>
      )}

      {/* Google Signup Button */}
      <Button
        onClick={handleGoogleSignup}
        disabled={isLoading}
        className="mb-6 flex w-full items-center justify-center bg-bento-pink text-white transition-colors hover:opacity-90"
      >
        {isLoading ? (
          <>
            <FaSpinner className="mr-2 animate-spin" /> Signing up...
          </>
        ) : (
          <>
            <FaGoogle className="mr-2" /> Signup with Google
          </>
        )}
      </Button>

      <p className="mt-4 max-w-md text-center text-sm text-gray-600">
        By using PocketLink, you agree to our{' '}
        <a
          href="/terms"
          className="gradient-text text-bento-pink underline transition-all"
        >
          Terms and Conditions
        </a>{' '}
        and{' '}
        <a
          href="/privacy"
          className="gradient-text text-bento-pink underline transition-all"
        >
          Privacy Policy
        </a>
        .
      </p>
    </>
  );
}

export default function SignupPage() {
  return (
    <main
      className="flex min-h-screen w-full flex-col items-center justify-center p-4"
      style={{
        background:
          'linear-gradient(135deg, #6363F7 0%, #D754AE 50%, #6363F7 100%)',
      }}
    >
      <div className="w-full max-w-md rounded-lg border border-bento-blue bg-white p-8 text-black shadow-lg backdrop-blur-md">
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-8">
              <FaSpinner className="h-8 w-8 animate-spin text-bento-violet" />
            </div>
          }
        >
          <SignupForm />
        </Suspense>
      </div>

      {/* Footer */}
      <p className="mt-2 text-sm text-white">
        Already have an account?{' '}
        <a href="/login" className="underline transition-all">
          Login
        </a>
      </p>
    </main>
  );
}
