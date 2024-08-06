'use client';
import React, { useEffect, useState } from 'react';

import { useAnalytics } from '@/app/contexts/AnalyticsContext';
import UpgradeToUnlock from '@/components/UpgradeToUnlock';

export default function SalesAnalytics() {
  const { analyticsData } = useAnalytics();

  return (
    <main className="h-full w-full space-y-4 overflow-y-auto p-4">
      <aside className="flex w-full flex-col items-start justify-center rounded-lg border p-2">
        <h1 className="p-4 font-medium">Sales Distribution</h1>
        <div className="min-h-[400px] w-full">
          <UpgradeToUnlock />
        </div>
      </aside>
    </main>
  );
}
