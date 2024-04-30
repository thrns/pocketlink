'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowBigLeft } from 'lucide-react';
import TenantSubscribeButton from './TenantSubscribeButton';
import { useRouter } from 'next/navigation';

const SubscribeAndBackBtn = ({ profile, id, tenant, theme }) => {
  const router = useRouter();
  const textColor = theme.textMode === 'dark' ? 'black' : 'white';
  return (
    <motion.div
      className="absolute right-2 top-4 z-50 mx-4 mb-4 mt-2 flex w-auto items-center justify-center gap-2"
      layout
    >
      <motion.div
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

      {id && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 20 }}
          className=' relative mr-2 flex items-center gap-2 rounded-full border px-4 py-2'
          style={
        theme?.textMode === 'dark'
          ? { color: 'black', backgroundColor: 'white' }
          : { color: 'white', backgroundColor: 'black' }
      }
          transition={{
            duration: 0.2,
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          <ArrowBigLeft
            style={{ color: textColor }}
            className="cursor-pointer "
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push('/');
              }
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};
       
export default SubscribeAndBackBtn;
