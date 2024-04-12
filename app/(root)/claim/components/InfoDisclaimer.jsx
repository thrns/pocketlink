'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Importing framer-motion for animations

export default function InfoDisclaimer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPulsating, setIsPulsating] = useState(true);

  // Random interval to open the disclaimer
  useEffect(() => {
    // Initial random open after a delay
    const initialOpenTimeout = setTimeout(
      () => {
        setIsOpen(true);
        // Close after showing for 5 seconds
        setTimeout(() => setIsOpen(false), 5000);
      },
      Math.random() * 10000 + 5000
    ); // Random delay between 5-15 seconds

    // Set up recurring random opens
    const intervalId = setInterval(() => {
      // 30% chance to open
      if (Math.random() < 0.3) {
        setIsOpen(true);
        // Close after showing for 5 seconds
        setTimeout(() => setIsOpen(false), 5000);
      }
    }, 15000); // Check every 15 seconds

    return () => {
      clearTimeout(initialOpenTimeout);
      clearInterval(intervalId);
    };
  }, []);

  // Pulsating animation
  useEffect(() => {
    const pulsateInterval = setInterval(() => {
      setIsPulsating((prev) => !prev);
    }, 2000);

    return () => clearInterval(pulsateInterval);
  }, []);

  return (
    <div className="absolute left-5 top-5 z-50">
      <div
        className={`relative ${isOpen ? 'w-72' : 'w-6'} transition-all duration-500 ease-in-out`}
      >
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="rounded-lg border bg-white p-3 text-xs text-gray-500 shadow-lg"
          >
            <button
              className="absolute right-1 top-1 text-gray-400 text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            Profile created for inspiration. May not be claimed or actively used
            by the owner.
          </motion.div>
        ) : (
          <motion.button
            onClick={() => setIsOpen(true)}
            className={`flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-xs font-bold text-white`}
            animate={{
              scale: isPulsating ? [1, 1.2, 1] : 1,
              boxShadow: isPulsating
                ? [
                    '0 0 0 0 rgba(120, 120, 120, 0)',
                    '0 0 0 10px rgba(120, 120, 120, 0.2)',
                    '0 0 0 0 rgba(120, 120, 120, 0)',
                  ]
                : '0 0 0 0 rgba(120, 120, 120, 0)',
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            i
          </motion.button>
        )}
      </div>
    </div>
  );
}
