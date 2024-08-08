'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Smartphone, Eye, RotateCcw } from 'lucide-react';
import ResponsiveGridClient from '@/app/[tenant]/components/ResponsiveGridClient';
import { TenantSubscriptionProvider } from '@/app/contexts/TenantSubscriptionContext';
import { useFetch } from '@/app/contexts/FetcherContext';
import { useAnalytics } from '@/app/contexts/AnalyticsContext';

export default function HeatmapAnalytics({ username }) {
  const { analyticsData, loading } = useAnalytics();
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  const [refreshKey, setRefreshKey] = useState(0);
  const { items, mobileItems, themeData } = useFetch();

  const heatmapData = useMemo(() => {
    // Get heatmap data from the correct path in analyticsData
    const base = analyticsData?.heatmap || {
      desktop: [],
      mobile: [],
      tablet: [],
      unknown: [],
    };
    const days = 10;

    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const filterByRange = (arr) =>
      (arr || []).filter((e) => {
        if (!e || !e.timestamp) return false;
        const timestamp = new Date(e.timestamp).getTime();
        return !isNaN(timestamp) && timestamp >= cutoff;
      });

    const filtered = {
      desktop: filterByRange(base.desktop || []),
      mobile: filterByRange(base.mobile || []),
      tablet: filterByRange(base.tablet || []),
      unknown: filterByRange(base.unknown || []),
    };

    return filtered;
  }, [analyticsData?.heatmap]);

  const DeviceMockup = ({ type, children }) => {
    const screenRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);

    // Update max scroll when content loads
    useEffect(() => {
      const updateMaxScroll = () => {
        if (screenRef.current) {
          const max =
            screenRef.current.scrollHeight - screenRef.current.clientHeight;
          setMaxScroll(max > 0 ? max : 0);
        }
      };

      const timer = setTimeout(updateMaxScroll, 1000); // Wait for iframe to load
      const interval = setInterval(updateMaxScroll, 2000); // Check periodically

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }, [refreshKey]);

    // Handle screen scroll
    const handleScreenScroll = () => {
      if (screenRef.current) {
        setScrollPosition(screenRef.current.scrollTop);
      }
    };

    if (type === 'mobile') {
      return (
        <div className="mx-auto flex w-full max-w-sm items-center justify-center py-4">
          {/* Mobile Frame */}
          <div className="relative aspect-[9/19.5] w-full max-w-[340px] rounded-3xl bg-gray-900 p-2">
            {/* Notch */}
            <div className="absolute left-1/2 top-0 z-20 h-6 w-20 -translate-x-1/2 transform rounded-b-2xl bg-black" />

            {/* Screen Container */}
            <div
              ref={screenRef}
              onScroll={handleScreenScroll}
              className="scrollbar-none relative h-full w-full overflow-auto rounded-2xl bg-white"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Iframe */}
              <div
                className="relative h-full w-full overflow-auto"
                ref={screenRef}
              >
                <TenantSubscriptionProvider username={username}>
                  <ResponsiveGridClient
                    username={username}
                    hardDeviceType={'mobile'}
                    mobileItems={mobileItems}
                    items={items}
                    tenantTheme={themeData}
                  />
                </TenantSubscriptionProvider>
                <div className="pointer-events-none absolute inset-0">
                  {children}
                </div>
              </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1 left-1/2 h-1 w-16 -translate-x-1/2 transform rounded-full bg-white opacity-60" />
          </div>
        </div>
      );
    }

    // Desktop mockup
    return (
      <div className="mx-auto w-full max-w-6xl py-4">
        {/* Desktop Frame */}
        <div className="aspect-video w-full rounded-2xl bg-gray-800 p-3">
          <div
            ref={screenRef}
            onScroll={handleScreenScroll}
            className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 relative h-full w-full overflow-auto rounded-lg bg-black"
          >
            {/* Iframe */}
            <div
              className="relative h-full w-full overflow-auto"
              ref={screenRef}
              onScroll={handleScreenScroll}
            >
              <TenantSubscriptionProvider username={username}>
                <ResponsiveGridClient
                  username={username}
                  hardDeviceType={'desktop'}
                  items={items}
                  mobileItems={mobileItems}
                  tenantTheme={themeData}
                />
              </TenantSubscriptionProvider>
              <div className="pointer-events-none absolute inset-0">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const deviceIcons = {
    desktop: Monitor,
    mobile: Smartphone,
  };

  const renderHeatmapPoints = (deviceData, deviceType) => {
    const clickData = deviceData.filter((d) => d.type === 'click');
    const hoverData = deviceData.filter((d) => d.type === 'hover');
    const scrollData = deviceData.filter((d) => d.type === 'scroll');

    return (
      <>
        {/* Click points (red) */}
        {clickData.map((point, index) => (
          <div
            key={`click-${index}`}
            className="absolute h-4 w-4 animate-pulse rounded-full border-2 border-white bg-red-500 opacity-80"
            style={{
              left: `${point.position.x}%`,
              top: `${point.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            title={`Click: ${point.position.x.toFixed(1)}%, ${point.position.y.toFixed(1)}%`}
          />
        ))}

        {/* Hover areas (blue) */}
        {hoverData.map((point, index) => (
          <div
            key={`hover-${index}`}
            className="absolute h-8 w-8 rounded-full border-2 border-white bg-blue-500 opacity-40"
            style={{
              left: `${point.position.x}%`,
              top: `${point.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            title={` ${point.position.x.toFixed(1)}%, ${point.position.y.toFixed(1)}%`}
          />
        ))}

        {/* Scroll points (green) */}
        {scrollData.map((point, index) => {
          const y = point.position?.y ?? point.scrollPercentage ?? 100;
          return (
            <div
              key={`scroll-${index}`}
              className="absolute h-3 w-3 rounded-full border-2 border-white bg-green-500 opacity-70"
              style={{
                left: `${point.position?.x ?? 50}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              title={`Scroll: ${point.position?.x ?? 50}%, ${y}%`}
            />
          );
        })}
      </>
    );
  };

  const handleRefresh = () => setRefreshKey((k) => k + 1);

  return (
    <div className="space-y-6 rounded-xl p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Heatmap Analytics
          </h2>
          <p className="mt-1 text-gray-600">
            Visualize user interactions across devices
          </p>
        </div>

        <p className="text-sm text-gray-600">
          Showing past 10 days • Data retained for 30 days
        </p>
      </div>

      {/* Device Tabs */}
      <Tabs
        value={selectedDevice}
        onValueChange={setSelectedDevice}
        className="w-full"
      >
        <TabsList className="p-2">
          {Object.entries(deviceIcons).map(([device, Icon]) => (
            <TabsTrigger
              key={device}
              value={device}
              className="flex items-center justify-center gap-2"
            >
              <Icon className="h-4 w-4" />
              <span className="capitalize">{device}</span>
              <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-600">
                {heatmapData[device]?.length || 0}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(deviceIcons).map((device) => (
          <TabsContent key={device} value={device} className="mt-0">
            <DeviceMockup type={device}>
              <div key={refreshKey} className="h-full w-full">
                {loading ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
                  </div>
                ) : heatmapData[device]?.length > 0 ? (
                  renderHeatmapPoints(heatmapData[device] || [], device)
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Eye className="mx-auto mb-4 h-12 w-12 opacity-50" />
                      <p className="text-lg font-medium">
                        No interaction data yet
                      </p>
                      <p className="text-sm text-gray-400">
                        Share your link to start collecting heatmap data.
                        <br />
                        Clicks, hovers, and scrolls will appear here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </DeviceMockup>
          </TabsContent>
        ))}
      </Tabs>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 rounded-lg border border-gray-100 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full border-2 border-white bg-red-500"></div>
          <span className="text-sm font-medium text-gray-700">
            Click Events
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-white bg-blue-500 opacity-40"></div>
          <span className="text-sm font-medium text-gray-700">Hover Areas</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
          <span className="text-sm font-medium text-gray-700">
            Scroll Points
          </span>
        </div>
      </div>
    </div>
  );
}
