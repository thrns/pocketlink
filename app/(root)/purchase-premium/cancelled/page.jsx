'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

// Note: Make sure these custom colors are defined in your tailwind.config.js:
// theme: {
//   extend: {
//     colors: {
//       'bento-violet': '#7C3AED', // Replace with your actual color
//       'bento-violetLight': '#9F7AEA', // Replace with your actual color
//     },
//   },
// },

export default function PaymentCancelled() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((count) => count - 1), 1000);
    } else {
      timer = setTimeout(() => router.push('/dashboard'), 500);
    }
    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-gray-600 to-gray-900 px-4 text-white"
    >
      {/* Background animated shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[15%] top-[20%] h-64 w-64 rounded-full bg-gray-500/10 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[15%] h-72 w-72 rounded-full bg-gray-600/10 blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: 'easeInOut',
          }}
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
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-500/20">
            <motion.div
              animate={{
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                repeat: 1,
                duration: 0.6,
                delay: 0.5,
                ease: 'easeInOut',
              }}
            >
              <AlertTriangle className="h-12 w-12 text-amber-400" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent"
        >
          Payment Cancelled
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6 text-lg text-gray-200"
        >
          Your premium subscription purchase was cancelled.
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
              transition={{ duration: 5, ease: 'linear' }}
              className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500"
            />
          </div>
          <p className="text-sm text-gray-300">
            Redirecting to dashboard in{' '}
            <span className="font-semibold text-white">{countdown}</span>{' '}
            seconds...
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-amber-400 opacity-70" />
        <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-amber-400 opacity-70" />
      </motion.div>
    </motion.div>
  );
}
