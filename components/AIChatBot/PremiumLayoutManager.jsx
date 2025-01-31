'use client';

import React from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useSubscription } from '@/app/contexts/SubscriptionContext';
import { LayoutManager } from './index';
import PremiumGate from '@/components/PremiumGate';
import { Wand2, LayoutTemplate, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Premium wrapper for LayoutManager that gates AI layout features
 * behind premium subscription
 */
const PremiumLayoutManager = (props) => {
  const { user } = useAuth();
  const { isPremium } = useSubscription();

  // Create dummy UI for the layout tools
  const dummyLayoutTools = (
    <div className="fixed bottom-4 right-4 z-[100]">
      {/* Main button */}
      <div className="relative">
        <motion.button
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center rounded-full border-2 border-violet-500/50 bg-white p-4 text-violet-600/70 shadow-lg dark:border-violet-600/50 dark:bg-gray-800 dark:text-violet-400/70"
        >
          <Wand2 className="h-6 w-6" />
          <span className="absolute -right-1 -top-1 rounded-full border border-white bg-violet-500 px-1.5 py-0.5 text-[9px] font-semibold text-white">
            PREMIUM
          </span>
        </motion.button>
      </div>

      {/* Tool buttons */}
      <div className="fixed bottom-20 right-4 z-[100] flex flex-col items-end gap-2">
        <motion.button
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1, x: -5 }}
          className="flex items-center gap-2 rounded-lg bg-blue-500/70 px-4 py-3 text-white shadow-lg"
        >
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5" />
            <span>Optimize Layout</span>
          </div>
          <span className="ml-1.5 rounded-full border border-white/30 bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold">
            PREMIUM
          </span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1, x: -5 }}
          className="flex items-center gap-2 rounded-lg bg-violet-500/70 px-4 py-3 text-white shadow-lg"
        >
          <div className="flex items-center gap-2">
            <LayoutTemplate className="h-5 w-5" />
            <span>Generate Layout</span>
          </div>
          <span className="ml-1.5 rounded-full border border-white/30 bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold">
            PREMIUM
          </span>
        </motion.button>
      </div>
    </div>
  );

  return (
    <PremiumGate
      featureName="AI Layout Tools"
      description="Generate and optimize your layouts with AI. Create professional designs in seconds."
      dummyData={dummyLayoutTools}
    >
      <LayoutManager {...props} />
    </PremiumGate>
  );
};

export default PremiumLayoutManager;
