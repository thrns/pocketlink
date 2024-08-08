import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import EmptyState from '@/components/EmptyState';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import PremiumGate from '@/components/PremiumGate';
import { FiBarChart } from 'react-icons/fi';
import { FEATURES, FEATURE_NAMES } from '@/constants/features';

const DailyPerformanceChart = ({ analyticsData, username }) => {
  const [period, setPeriod] = useState('week'); // week, month, year

  // Check for data availability and structure type
  const hasNewStructure = analyticsData?.metrics?.daily;
  const hasData = !!hasNewStructure;

  if (!hasData) {
    const handleShareClick = () => {
      const link = `https://${username}.pocketlink.co`;
      navigator.clipboard.writeText(link);
    };

    return (
      <div className="relative">
        <DotPattern
          className={cn(
            '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]'
          )}
        />
        <EmptyState
          icon={FiBarChart}
          title="No Data Available"
          image={'/AI/pocket.png'}
          description="Start sharing your link to see analytics"
          action={{
            label: 'Share Link',
            onClick: handleShareClick,
          }}
        />
      </div>
    );
  }

  // Get the daily stats from appropriate structure
  const dailyStatsObj = analyticsData.metrics.daily;

  // Process daily data with fallbacks for different field names
  const dailyStatsArray = Object.entries(dailyStatsObj).map(
    ([date, stats]) => ({
      date,
      visits: stats.visits || 0,
      clicks: stats.clicks || 0,
    })
  );

  // Sort dates in ascending order
  dailyStatsArray.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Filter data based on selected period
  const filteredData = dailyStatsArray.filter((stat) => {
    const statDate = new Date(stat.date);
    const today = new Date();

    if (period === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(today.getDate() - 7);
      return statDate >= oneWeekAgo;
    } else if (period === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(today.getMonth() - 1);
      return statDate >= oneMonthAgo;
    } else if (period === 'year') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(today.getFullYear() - 1);
      return statDate >= oneYearAgo;
    }
    return true;
  });

  // Calculate gradients for areas
  const visitGradientId = 'visitColorGradient';
  const clickGradientId = 'clickColorGradient';

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <PremiumGate
      featureKey={FEATURES.ADVANCED_ANALYTICS}
      featureName={FEATURE_NAMES[FEATURES.ADVANCED_ANALYTICS]}
      description="Get detailed insights with geographic data, device information, and referral sources, heatmaps and more"
      className="w-full"
      dummyData={
        <div className="w-full">
          <div className="mb-4 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold">Daily Performance</h2>
            <div className="flex gap-2">
              <button className="rounded bg-blue-500 px-3 py-1 text-white">
                Week
              </button>
              <button className="rounded bg-gray-200 px-3 py-1 text-gray-700">
                Month
              </button>
              <button className="rounded bg-gray-200 px-3 py-1 text-gray-700">
                Year
              </button>
            </div>
          </div>
          <div className="pointer-events-none w-full overflow-x-auto opacity-60">
            <div style={{ width: '100%', height: '400px', minWidth: '600px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { date: '2023-01-01', visits: 100, clicks: 20 },
                    { date: '2023-01-02', visits: 120, clicks: 30 },
                    { date: '2023-01-03', visits: 140, clicks: 40 },
                    { date: '2023-01-04', visits: 160, clicks: 45 },
                    { date: '2023-01-05', visits: 180, clicks: 60 },
                    { date: '2023-01-06', visits: 200, clicks: 70 },
                    { date: '2023-01-07', visits: 220, clicks: 80 },
                  ]}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="visitGradientId"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#36a2eb" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#36a2eb"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="clickGradientId"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ff69b4" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#ff69b4"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>

                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="visits"
                    name="Total Visits"
                    stroke="#36a2eb"
                    fillOpacity={1}
                    fill="url(#visitGradientId)"
                  />

                  <Area
                    type="monotone"
                    dataKey="clicks"
                    name="Clicks"
                    stroke="#ff69b4"
                    fillOpacity={1}
                    fill="url(#clickGradientId)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full p-4">
        <div className="mb-4 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold">Daily Performance Analytics</h2>
          <div className="flex gap-2">
            <button
              className={`rounded px-3 py-1 ${
                period === 'week'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setPeriod('week')}
            >
              Week
            </button>
            <button
              className={`rounded px-3 py-1 ${
                period === 'month'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setPeriod('month')}
            >
              Month
            </button>
            <button
              className={`rounded px-3 py-1 ${
                period === 'year'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setPeriod('year')}
            >
              Year
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={filteredData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id={visitGradientId}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#36a2eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#36a2eb" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id={clickGradientId}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#ff69b4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff69b4" stopOpacity={0.1} />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  stroke="#4a5568"
                />
                <YAxis stroke="#4a5568" />
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <Tooltip
                  labelFormatter={(label) => formatDate(label)}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                  }}
                />
                <Legend />

                <Area
                  type="monotone"
                  dataKey="visits"
                  name="Total Visits"
                  stroke="#36a2eb"
                  fillOpacity={1}
                  fill={`url(#${visitGradientId})`}
                />

                <Area
                  type="monotone"
                  dataKey="clicks"
                  name="Clicks"
                  stroke="#ff69b4"
                  fillOpacity={1}
                  fill={`url(#${clickGradientId})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PremiumGate>
  );
};

export default DailyPerformanceChart;
