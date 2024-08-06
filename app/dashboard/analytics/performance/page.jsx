'use client';

// Disable static generation for this authenticated dashboard page
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';

import { useAnalytics } from '@/app/contexts/AnalyticsContext';

import DailyPerformanceChart from '@/components/dashboardComponents/analytics/DailyPerformanceChart';
import ButtonClicksScatterPlot from '@/components/dashboardComponents/analytics/ButtonClicksScatterPlot';
import LinkPerformanceChart from '@/components/dashboardComponents/analytics/LinkPerformanceChart';
import { useAuth } from '@/app/contexts/AuthContext';
import HeatmapAnalytics from '@/components/dashboardComponents/analytics/HeatmapAnalytics';

export default function PerformanceAnalytics() {
  const { analyticsData } = useAnalytics();
  const { user } = useAuth();

  return (
    <main className="min-h-screen w-full bg-gray-50 p-4">
      <div className="mx-auto grid w-full grid-cols-1 gap-4">
        <aside className="tour-daily-performance-chart flex flex-col items-start justify-center rounded-lg border bg-white p-2 lg:col-span-2">
          <div className="min-h-[400px] w-full">
            <DailyPerformanceChart
              analyticsData={analyticsData}
              username={user?.username}
            />
          </div>{' '}
        </aside>

        <aside className="tour-daily-performance-chart flex flex-col items-start justify-center rounded-lg border bg-white p-2 lg:col-span-2">
          <div className="min-h-[400px] w-full">
            <ButtonClicksScatterPlot
              analyticsData={analyticsData}
              username={user?.username}
            />
          </div>{' '}
        </aside>

        {/* Heatmap Analytics Section */}
        <aside className="tour-heatmap-analytics flex flex-col items-start justify-center rounded-lg border bg-white p-2 lg:col-span-2">
          <div className="min-h-[400px] w-full">
            <HeatmapAnalytics username={user?.username} />
          </div>
        </aside>

        <aside className="tour-link-performance-chart flex flex-col items-start justify-center rounded-lg border bg-white p-2 lg:col-span-2">
          <div className="min-h-[400px] w-full">
            <LinkPerformanceChart
              analyticsData={analyticsData}
              username={user?.username}
            />
          </div>{' '}
        </aside>
      </div>
    </main>
  );
}
