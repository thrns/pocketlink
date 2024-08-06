'use client';
import React, { useEffect, useState } from 'react';

import StatsOverview from '@/components/dashboardComponents/analytics/StatsOverview';
import { useAnalytics } from '@/app/contexts/AnalyticsContext';
import AnalyticsMap from '@/components/dashboardComponents/analytics/AnalyticsMap';
import DeviceDistributionChart from '@/components/dashboardComponents/analytics/DeviceDistributionChart';
import TopReferrersChart from '@/components/dashboardComponents/analytics/TopReferrersChart';
import ReferralPopup from '@/components/dashboardComponents/analytics/ReferralPopup';
import { useAuth } from '@/app/contexts/AuthContext';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import HeatmapAnalytics from '@/components/dashboardComponents/analytics/HeatmapAnalytics';
import LocationBasedViewsAndClicks from '@/components/dashboardComponents/analytics/LocationBasedViewsAndClicks';

export default function TrafficAnalytics() {
  const { analyticsData } = useAnalytics();
  const { user } = useAuth();

  return (
    <main className="h-full w-full space-y-4 overflow-y-auto p-4">
      <aside className="flex w-full flex-col items-start justify-between gap-2 p-2 md:flex-row">
        <div className="flex w-full items-center gap-2 md:w-auto">
          <Image
            src={user?.avatarURL || '/userPlaceholder.png'}
            alt={user?.name}
            width={45}
            height={45}
            style={{
              borderRadius: '100%',
              objectFit: 'cover',
              height: '50px',
              width: '50px',
            }}
            className="overflow-hidden rounded-full border object-contain"
          />
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <h1 className="text-lg font-bold">Hello, {user?.name} 👋 </h1>
              {/* MOBILE: Gift icon to right of name */}
              <span className="ml-2 block md:hidden">
                <ReferralPopup iconOnly />
              </span>
            </div>
            <p className="text-sm text-gray-500">See how your link is doing</p>
          </div>
        </div>
        {/* DESKTOP/LAPTOP: Show regular Refer a Friend button */}
        <div className="hidden md:block">
          <ReferralPopup />
        </div>
      </aside>

      <aside className="tour-stats-overview flex w-full flex-col items-start justify-center">
        <StatsOverview analyticsData={analyticsData} />
      </aside>
      <aside className="tour-analytics-map flex w-full flex-col items-start justify-center rounded-lg border bg-white p-2">
        <div className="min-h-[400px] w-full">
          <AnalyticsMap
            analyticsData={analyticsData}
            username={user?.username}
          />
        </div>
      </aside>

      {/* Side-by-side: Location views/clicks and Device distribution */}
      <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <aside className="tour-heatmap-analytics w/full flex flex-col items-start justify-center rounded-lg border bg-white p-2">
          <div className="min-h-[400px] w-full">
            <LocationBasedViewsAndClicks username={user?.username} />
          </div>
        </aside>
        <aside className="tour-device-distribution-backup flex w-full flex-col items-start justify-center rounded-lg border bg-white p-2">
          <div className="min-h-[400px] w-full">
            <DeviceDistributionChart
              analyticsData={analyticsData}
              username={user?.username}
            />
          </div>
        </aside>
      </section>

      <aside className="tour-referrers-chart flex w-full flex-col items-start justify-center rounded-lg border bg-white p-2">
        <div className="min-h-[400px] w-full">
          <TopReferrersChart
            analyticsData={analyticsData}
            username={user?.username}
          />
        </div>{' '}
      </aside>
    </main>
  );
}
