'use client';

import React, { useState } from 'react';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { Button } from '@/components/ui/button';
import { FaGoogle } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa6';
import { signInWithGoogle } from '@/lib/actions/auth-actions';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await signInWithGoogle();
  };

  return (
    <main
      className="flex min-h-screen w-full flex-col items-center justify-center p-4"
      style={{
        background:
          'linear-gradient(135deg, #6363F7 0%, #D754AE 50%, #6363F7 100%)',
      }}
    >
      <div className="w-full max-w-md rounded-lg border border-bento-blue bg-white p-8 text-black shadow-lg backdrop-blur-md">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img src="/ogImg.png" alt="PocketLink Logo" className="h-16 w-auto" />
        </div>

        {/* Animated Gradient Title */}
        <h2 className="mb-6 text-center text-3xl font-bold">
          <AnimatedGradientText>Login to PocketLink</AnimatedGradientText>
        </h2>

        {/* Google Login Button */}
        <Button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="mb-6 flex w-full items-center justify-center bg-bento-pink text-white transition-colors hover:opacity-90"
        >
          {isLoading ? (
            <>
              <FaSpinner className="mr-2 animate-spin" /> Logging in...
            </>
          ) : (
            <>
              <FaGoogle className="mr-2" /> Login with Google
            </>
          )}
        </Button>

        {/* Terms and Conditions */}
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
      </div>

      {/* Footer */}
      <p className="mt-2 text-sm text-white">
        Don't have an account?{' '}
        <a href="/signup" className="underline transition-all">
          Signup
        </a>
      </p>
    </main>
  );
}
