'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Home, XCircle } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import confetti from 'canvas-confetti';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, refreshUserData } = useAuth();
  const [countdown, setCountdown] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      const source = searchParams.get('source');
      // Handle multiple subscription_id parameters (placeholder and actual)
      const allSubscriptionIds = searchParams.getAll('subscription_id');
      const subscriptionId =
        allSubscriptionIds.find((id) => id !== '{subscription_id}') ||
        allSubscriptionIds[0];

      // Check if this is a DodoPayments redirect
      // Dodo can redirect with source=dodo_checkout OR with subscription_id + status parameters
      const isDodoRedirect =
        source === 'dodo_checkout' ||
        (subscriptionId && searchParams.get('status'));

      if (!isDodoRedirect) {
        // Check if user is logged in and has premium status (direct access)
        if (user && user.is_premium) {
          setVerified(true);
          setLoading(false);
          return;
        }

        setError('Invalid access. Please complete payment process.');
        setLoading(false);
        return;
      }

      // If we have a subscription ID, verify it directly via API
      if (subscriptionId && subscriptionId !== '{subscription_id}') {
        try {
          const res = await fetch('/api/dodo-payments/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subscription_id: subscriptionId }),
          });

          const data = await res.json();

          if (data.success) {
            setVerified(true);
            setError(null);
            if (refreshUserData) await refreshUserData();
          } else {
            setError(data.message || 'Payment verification failed.');
          }
          setLoading(false);
          return;
        } catch (err) {
          console.error('Error verifying payment via API:', err);
          // Fall through to webhook-based verification
        }
      }
      // Fallback: If no subscription ID or API verification failed,
      // wait for webhook processing then check user status

      setTimeout(async () => {
        try {
          if (refreshUserData) {
            await refreshUserData();
          }

          // Check if user now has premium status (webhook processed)
          if (user && user.is_premium) {
            setVerified(true);
            setLoading(false);
          } else {
            // If still no premium status, show error with helpful message
            setError(
              'Payment processing in progress. Please wait a moment or refresh the page. Contact support if this persists.'
            );
            setLoading(false);
          }
        } catch (err) {
          console.error('Error checking user status:', err);
          setError(
            'Error verifying payment status. Please refresh the page or contact support.'
          );
          setLoading(false);
        }
      }, 3000); // Wait 3 seconds for webhook processing (longer since this is fallback)
    };
    verifyPayment();
  }, [searchParams, refreshUserData, user]);

  // Confetti and redirect only if verified
  useEffect(() => {
    if (!verified) return;
    // Trigger success event for Dodo Payments integration
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('dodo:checkout:completed', {
          detail: {
            timestamp: new Date().toISOString(),
            source: 'dodo_payments',
          },
        })
      );
    }
    // Fire confetti
    const duration = 8 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];
    confetti({
      particleCount: 100,
      spread: 160,
      origin: { x: 0.5, y: 0.5 },
      colors: colors,
      disableForReducedMotion: true,
    });
    (function frame() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return;
      if (timeLeft % 200 < 50) {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });
      }
      if (timeLeft % 350 < 50) {
        confetti({
          particleCount: 5,
          spread: 80,
          origin: { x: Math.random(), y: 0 },
          colors: colors,
          gravity: 0.5,
        });
      }
      requestAnimationFrame(frame);
    })();
    // Start countdown for redirect
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((count) => count - 1), 1000);
    } else {
      timer = setTimeout(
        () => router.push('/dashboard/settings/billing'),
        1000
      );
    }
    return () => clearTimeout(timer);
  }, [verified, countdown, router]);

  if (loading) {
    return (
      <motion.div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-800 px-4 text-white">
        <div className="text-lg font-semibold">Verifying your payment...</div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-red-700 to-red-950 px-4 text-white">
        <div className="flex flex-col items-center">
          <XCircle className="mb-4 h-16 w-16 text-red-300" />
          <div className="mb-2 text-2xl font-bold">
            Payment Verification Failed
          </div>
          <div className="mb-6 text-lg">{error}</div>
          <button
            onClick={() => router.push('/dashboard/settings/billing')}
            className="rounded-lg bg-white px-6 py-3 font-medium text-red-700 transition hover:bg-opacity-90"
          >
            Go to Billing
          </button>
        </div>
      </motion.div>
    );
  }

  // Success UI (only if verified)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-800 px-4 text-white"
    >
      {/* Background animated shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[15%] top-[20%] h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[15%] h-72 w-72 rounded-full bg-purple-500/20 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        />
      </div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            delay: 0.2,
          }}
          className="relative mb-6"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20">
            <motion.div
              animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
              transition={{
                repeat: 2,
                duration: 0.6,
                delay: 0.5,
                ease: 'easeInOut',
              }}
            >
              <Check className="h-12 w-12 text-green-400" />
            </motion.div>
          </div>
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent"
        >
          Payment Successful!
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6 text-lg text-gray-200"
        >
          Thank you for your purchase. Your premium features are now active!
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative mb-8"
        >
          <div className="mb-2 h-1 w-full rounded-full bg-gray-700">
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 3, ease: 'linear' }}
              className="h-full rounded-full bg-gradient-to-r from-green-300 to-green-500"
            />
          </div>
          <p className="text-sm text-gray-300">
            Redirecting to billing in{' '}
            <span className="font-semibold text-white">{countdown}</span>{' '}
            seconds...
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col space-y-3"
        >
          <motion.button
            whileHover={{
              scale: 1.02,
              background: 'rgba(255, 255, 255, 0.95)',
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/dashboard/settings/billing')}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-purple-600 transition"
          >
            <Home size={18} />
            Go to Dashboard
          </motion.button>
        </motion.div>
        {/* Celebrations animation */}
        <div className="pointer-events-none absolute -top-10 left-0 h-40 w-full overflow-hidden opacity-75">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-8 w-2 rounded-full ${
                i % 3 === 0
                  ? 'bg-purple-400'
                  : i % 3 === 1
                    ? 'bg-green-400'
                    : 'bg-indigo-400'
              }`}
              initial={{
                x: Math.random() * 100 + 50 - 25,
                y: 0,
                rotate: Math.random() * 60 - 30,
              }}
              animate={{ y: [0, 100], opacity: [1, 0] }}
              transition={{
                duration: 1 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
        {/* Decorative elements */}
        <div className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-green-400 opacity-70" />
        <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-green-400 opacity-70" />
      </motion.div>
    </motion.div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense
      fallback={
        <motion.div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-800 px-4 text-white">
          <div className="text-lg font-semibold">Loading...</div>
        </motion.div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
