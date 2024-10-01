'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UpgradeToUnlock = ({ onUpgrade }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-6 text-black">
      {/* Lock Icon */}
      <div className="flex items-center justify-center rounded-full bg-gradient-to-tr from-[#1F8EFA] via-[#9C40FF] to-[#E91E63] p-3">
        <Lock size={24} className="text-white" />
      </div>

      {/* Title */}
      <h3 className="mt-3 text-lg font-semibold">Upgrade to Unlock</h3>

      {/* Subtitle */}
      <p className="mt-1 text-center text-sm text-gray-700">
        This feature is available for premium users only.
      </p>

      {/* CTA Button */}
      <Button
        className="mt-4 rounded-lg bg-gradient-to-tr from-[#1F8EFA] via-[#9C40FF] to-[#E91E63] px-4 py-2 text-white"
        onClick={onUpgrade}
      >
        Upgrade Now
      </Button>
    </div>
  );
};

export default UpgradeToUnlock;
