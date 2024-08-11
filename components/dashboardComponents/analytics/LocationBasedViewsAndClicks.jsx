'use client';
import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import { useAnalytics } from '@/app/contexts/AnalyticsContext';

const COLORS = [
  '#3B82F6',
  '#8B5CF6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#6366F1',
  '#EC4899',
  '#14B8A6',
  '#F97316',
  '#84CC16',
];

const LocationBasedViewsAndClicks = () => {
  const { analyticsData, loading, error } = useAnalytics();
  const [viewType, setViewType] = useState('country'); // 'country', 'city', 'region'
  const [chartType, setChartType] = useState('pie'); // 'bar', 'pie', 'area'
  const [metricType, setMetricType] = useState('combined'); // 'visits', 'clicks', 'combined'

  // Extract from analyticsData.locations (matches AnalyticsContext structure)
  const extractLocationFromMetrics = () => {
    const locations = analyticsData?.locations;
    if (!locations) return [];

    // Convert locations object to array and process based on viewType
    const locationArray = Object.entries(locations).map(([key, data]) => ({
      key,
      name:
        data.city && data.countryName
          ? `${data.city}, ${data.countryName}`
          : data.countryName || data.city || 'Unknown',
      country: data.countryName || 'Unknown',
      countryCode: data.country || 'XX',
      city: data.city || 'Unknown',
      region: data.region || 'Unknown',
      coordinates: data.coordinates || null,
      postal: data.postal || 'Unknown',
      timezone: data.timezone || 'Unknown',
      isp: data.isp || 'Unknown',
      asn: data.asn || 'Unknown',
      currency: data.currency || 'Unknown',
      languages: data.languages || 'Unknown',
      callingCode: data.callingCode || 'Unknown',
      lastUpdated: data.lastUpdated || 'Unknown',
      firstSeen: data.firstSeen || 'Unknown',
      visits: data.totalVisits || 0,
      clicks: 0, // No clicks data in geo tables, this comes from events
      sessions: data.totalSessions || 0,
      visitors: 0, // Would need to be calculated from sessions if needed
      events: data.totalVisits || 0, // Use visits as events count
      type: viewType,
    }));

    if (viewType === 'country') {
      // Group by country for country view
      const countryGroups = {};
      locationArray.forEach((item) => {
        const countryKey = item.countryCode;
        if (!countryGroups[countryKey]) {
          countryGroups[countryKey] = {
            name: item.country,
            country: item.country,
            countryCode: item.countryCode,
            city: 'All Cities',
            region: 'All Regions',
            coordinates: null,
            postal: 'Multiple',
            timezone: 'Multiple',
            isp: 'Multiple',
            asn: 'Multiple',
            currency: item.currency,
            languages: item.languages,
            callingCode: item.callingCode,
            lastUpdated: item.lastUpdated,
            firstSeen: item.firstSeen,
            visits: 0,
            clicks: 0,
            sessions: 0,
            visitors: 0,
            events: 0,
            type: 'country',
          };
        }
        countryGroups[countryKey].visits += item.visits;
        countryGroups[countryKey].sessions += item.sessions;
        countryGroups[countryKey].events += item.events;
      });

      return Object.values(countryGroups).filter(
        (i) => i.visits > 0 || i.sessions > 0 || i.events > 0
      );
    }

    if (viewType === 'city') {
      return locationArray.filter(
        (i) => i.visits > 0 || i.sessions > 0 || i.events > 0
      );
    }

    return [];
  };

  // Process geographic data from the relational analytics structure
  const processedData = useMemo(() => {
    if (!analyticsData || loading) return [];

    const sourceData = extractLocationFromMetrics();
    return sourceData
      .sort((a, b) => {
        if (metricType === 'visits') return b.visits - a.visits;
        if (metricType === 'clicks') return b.clicks - a.clicks;
        return (
          b.visits + b.clicks + b.events - (a.visits + a.clicks + a.events)
        );
      })
      .slice(0, 15);
  }, [analyticsData, loading, viewType, metricType]);

  // Get chart data based on metric type
  const getChartData = () => {
    return processedData.map((item, index) => ({
      ...item,
      total: item.visits + item.clicks,
      fill: COLORS[index % COLORS.length],
      conversionRate:
        item.visits > 0 ? ((item.clicks / item.visits) * 100).toFixed(1) : 0,
    }));
  };

  const chartData = getChartData();

  // Custom tooltip for comprehensive data display
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <p className="mb-2 font-semibold text-gray-900 dark:text-white">
            {label}
          </p>

          {/* Location Details */}
          {data.countryCode && data.countryCode !== 'XX' && (
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="mr-2 inline-block rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-700">
                {data.countryCode}
              </span>
              {data.timezone !== 'Unknown' && data.timezone !== 'Multiple' && (
                <span className="text-xs">🕒 {data.timezone}</span>
              )}
            </div>
          )}

          {/* Metrics */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-blue-600 dark:text-blue-400">
                <span className="mr-2 inline-block h-3 w-3 rounded-full bg-blue-600"></span>
                Visits: {data.visits.toLocaleString()}
              </div>
              <div className="text-purple-600 dark:text-purple-400">
                <span className="mr-2 inline-block h-3 w-3 rounded-full bg-purple-600"></span>
                Clicks: {data.clicks.toLocaleString()}
              </div>
            </div>

            {(data.sessions > 0 || data.visitors > 0) && (
              <div className="grid grid-cols-2 gap-2 text-sm">
                {data.sessions > 0 && (
                  <div className="text-green-600 dark:text-green-400">
                    <span className="mr-2 inline-block h-3 w-3 rounded-full bg-green-600"></span>
                    Sessions: {data.sessions.toLocaleString()}
                  </div>
                )}
                {data.visitors > 0 && (
                  <div className="text-orange-600 dark:text-orange-400">
                    <span className="mr-2 inline-block h-3 w-3 rounded-full bg-orange-600"></span>
                    Visitors: {data.visitors.toLocaleString()}
                  </div>
                )}
              </div>
            )}

            <div className="text-sm text-gray-600 dark:text-gray-400">
              Conversion Rate: {data.conversionRate}%
            </div>
          </div>

          {/* Additional Details */}
          {(data.postal !== 'Unknown' && data.postal !== 'Multiple') ||
          (data.isp !== 'Unknown' && data.isp !== 'Multiple') ||
          data.currency !== 'Unknown' ||
          (data.asn !== 'Unknown' && data.asn !== 'Multiple') ? (
            <div className="mt-3 border-t border-gray-200 pt-2 dark:border-gray-600">
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                {data.postal !== 'Unknown' && data.postal !== 'Multiple' && (
                  <div>📮 Postal: {data.postal}</div>
                )}
                {data.currency !== 'Unknown' && (
                  <div>💰 Currency: {data.currency}</div>
                )}
                {data.callingCode !== 'Unknown' && (
                  <div>📞 Calling Code: {data.callingCode}</div>
                )}
                {data.asn !== 'Unknown' && data.asn !== 'Multiple' && (
                  <div>🌐 ASN: {data.asn}</div>
                )}
                {data.isp !== 'Unknown' && data.isp !== 'Multiple' && (
                  <div className="max-w-xs truncate" title={data.isp}>
                    🔗 ISP: {data.isp}
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* Timestamps */}
          {(data.firstSeen !== 'Unknown' || data.lastUpdated !== 'Unknown') && (
            <div className="mt-3 border-t border-gray-200 pt-2 dark:border-gray-600">
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                {data.firstSeen !== 'Unknown' && (
                  <div>
                    🕐 First Seen:{' '}
                    {new Date(data.firstSeen).toLocaleDateString()}
                  </div>
                )}
                {data.lastUpdated !== 'Unknown' && (
                  <div>
                    🕑 Last Updated:{' '}
                    {new Date(data.lastUpdated).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Render different chart types
  const renderChart = () => {
    if (chartData.length === 0) {
      return (
        <div className="flex h-96 items-center justify-center text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-lg font-medium">No location data available</p>
            <p className="text-sm">
              Geographic analytics will appear here once visitors access your
              profile
            </p>
          </div>
        </div>
      );
    }

    switch (chartType) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey={
                  metricType === 'visits'
                    ? 'visits'
                    : metricType === 'clicks'
                      ? 'clicks'
                      : 'total'
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="w-full rounded-lg bg-white p-6 dark:bg-gray-800">
        <div className="animate-pulse">
          <div className="mb-4 h-6 w-64 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-96 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg bg-white p-6 dark:bg-gray-800">
      {/* Header */}
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          Geographic Analytics
        </h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Views and clicks by location.
        </p>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            View:
          </span>
          <div className="flex rounded-lg border border-gray-300 bg-gray-50 p-1 dark:border-gray-600 dark:bg-gray-700">
            <button
              onClick={() => setViewType('country')}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                viewType === 'country'
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              By Country
            </button>
            <button
              onClick={() => setViewType('city')}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                viewType === 'city'
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              By City
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6">{renderChart()}</div>

      {/* Legend */}
      {chartType !== 'pie' && chartData.length > 0 && (
        <div className="mt-4 flex justify-center space-x-6">
          {metricType === 'combined' && (
            <>
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 rounded bg-blue-600"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Visits
                </span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 rounded bg-purple-600"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Clicks
                </span>
              </div>
            </>
          )}
          {metricType === 'visits' && (
            <div className="flex items-center">
              <div className="mr-2 h-4 w-4 rounded bg-blue-600"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Visits
              </span>
            </div>
          )}
          {metricType === 'clicks' && (
            <div className="flex items-center">
              <div className="mr-2 h-4 w-4 rounded bg-purple-600"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Clicks
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationBasedViewsAndClicks;
