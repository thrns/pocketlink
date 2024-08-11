import React from 'react';
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { FiGlobe, FiMousePointer, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { Skeleton } from '@/components/ui/skeleton';

const StatsOverview = ({ analyticsData }) => {
  const overview = analyticsData?.metrics?.overview;
  const dailyStats = analyticsData?.metrics?.daily; // expected map keyed by YYYY-MM-DD with { visits, uniqueVisits, clicks, attentions, events }

  if (!analyticsData || !overview || !dailyStats) {
    return (
      <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex h-[200px] w-full animate-pulse flex-col rounded-md border bg-gray-200 p-4"
          />
        ))}
      </div>
    );
  }

  // Calculate totals from daily data (like DailyPerformanceChart does)
  const totalVisits = dailyStats
    ? Object.values(dailyStats).reduce((sum, day) => sum + (day.visits || 0), 0)
    : 0;
  const totalClicks = dailyStats
    ? Object.values(dailyStats).reduce((sum, day) => sum + (day.clicks || 0), 0)
    : 0;
  const totalAttentions = dailyStats
    ? Object.values(dailyStats).reduce(
        (sum, day) => sum + (day.attentions || 0),
        0
      )
    : 0;
  const totalUniqueVisitors = overview.totalUniqueVisitors || 0;
  const ctr =
    totalVisits > 0 ? ((totalClicks / totalVisits) * 100).toFixed(1) : '0.0';

  const visitsData = getDailyTrend(dailyStats, 'visits');
  const visitorsData = getDailyUniqueVisitorsTrend(
    analyticsData?.metrics?.engagement?.dailyUniqueVisitors
  );
  const clicksData = getDailyTrend(dailyStats, 'clicks');
  const ctrData = calculateDailyCTR(dailyStats);

  return (
    <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-4">
      <StatCard
        title="Total Visits"
        value={totalVisits.toLocaleString()}
        icon={<FiGlobe className="text-blue-500" />}
        graphData={visitsData}
        color="#3182ce"
        className="tour-stats-visits"
      />
      <StatCard
        title="Unique Visitors"
        value={totalUniqueVisitors.toLocaleString()}
        icon={<FiUsers className="text-indigo-500" />}
        graphData={visitorsData}
        color="#5a67d8"
        className="tour-stats-unique-visitors"
      />
      <StatCard
        title="Total Clicks"
        value={totalClicks.toLocaleString()}
        icon={<FiMousePointer className="text-red-500" />}
        graphData={clicksData}
        color="#e53e3e"
        className="tour-stats-clicks"
      />
      <StatCard
        title="Click Rate"
        value={`${ctr}%`}
        icon={<FiTrendingUp className="text-yellow-500" />}
        graphData={ctrData}
        color="#d69e2e"
        className="tour-stats-ctr"
      />
    </div>
  );
};

const StatCard = ({ title, value, icon, graphData, color, className }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded border border-gray-200 bg-white p-1 text-xs shadow">
          <p>{`${data.date || 'Date'}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`flex w-full flex-col rounded-lg border bg-white p-4 ${className || ''}`}
    >
      <div className="mb-2 flex items-center space-x-2">
        <div className="text-lg text-gray-600">{icon}</div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      </div>
      <span className="mb-4 text-2xl font-semibold text-gray-900">{value}</span>
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData}>
            <Line
              type="monotone"
              dataKey="y"
              stroke={color}
              strokeWidth={2}
              dot={{ stroke: color, strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const getDailyTrend = (dataSource, key) => {
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  return dates.map((date, index) => ({
    x: index,
    y: dataSource?.[date]?.[key] || 0,
    date: new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  }));
};

const calculateDailyCTR = (dailyStats) => {
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  return dates.map((date, index) => {
    const visits = dailyStats?.[date]?.visits || 0;
    const clicks = dailyStats?.[date]?.clicks || 0;
    const ctr = visits > 0 ? (clicks / visits) * 100 : 0;
    return {
      x: index,
      y: parseFloat(ctr.toFixed(1)),
      date: new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    };
  });
};

const getDailyUniqueVisitorsTrend = (dailyUniqueVisitors) => {
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  return dates.map((date, index) => ({
    x: index,
    y: dailyUniqueVisitors?.[date]?.count || 0,
    date: new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  }));
};

export default StatsOverview;
