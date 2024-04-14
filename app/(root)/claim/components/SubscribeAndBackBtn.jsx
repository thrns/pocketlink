'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowBigLeft } from 'lucide-react';
import TenantSubscribeButton from './TenantSubscribeButton';
import { useRouter } from 'next/navigation';

const SubscribeAndBackBtn = ({ profile, tenant, theme }) => {
  return (
    <motion.div
      className="absolute right-2 top-4 z-50 mx-4 mb-4 mt-2 flex w-auto items-center justify-center gap-2"
      layout
    >
      <motion.div
        className="pointer-events-none cursor-not-allowed"
        layout
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.2 }}
      >
        {profile?.subscribeButtonOn && (
          <TenantSubscribeButton username={tenant} tenantTheme={theme} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default SubscribeAndBackBtn;
