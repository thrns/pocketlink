import React, { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  Sector,
} from 'recharts';
import EmptyState from '@/components/EmptyState';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import PremiumGate from '@/components/PremiumGate';
import { FEATURES, FEATURE_NAMES } from '@/constants/features';

const LinkPerformanceChart = ({ analyticsData, username }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Check for data availability in new or legacy structure
  const hasData = analyticsData?.metrics?.performance?.linkPerformance;

  // If no valid data, render title + EmptyState
  if (!hasData) {
    const handleShareClick = () => {
      const link = `https://${username}.pocketlink.co`;
      navigator.clipboard.writeText(link);
    };

    return (
      <div className="relative w-full rounded-lg bg-white p-4">
        <h3 className="mb-4 text-lg font-semibold">Link Performance</h3>
        <div>
          <DotPattern
            className={cn(
              '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]'
            )}
          />
          <EmptyState
            title="No Data Available"
            text="Share your link in bio"
            buttonText={'Copy Link'}
            image={'/AI/pocket.png'}
            onClick={handleShareClick}
          />
        </div>
      </div>
    );
  }

  // Use new relational structure or fall back to legacy
  const linkPerfObj = analyticsData.metrics?.performance?.linkPerformance || {};

  // Convert object into array and sort by clicks (Descending)
  const linkData = Object.entries(linkPerfObj)
    .map(([linkName, data]) => ({
      name: linkName,
      // New schema: analytics_link_performance stores clicks
      value: data.clicks || 0,
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 12); // Limit to top 12 links

  // Unique vibrant color palette
  const COLORS = [
    '#FF5733',
    '#33FF57',
    '#337BFF',
    '#F39C12',
    '#9B59B6',
    '#16A085',
    '#D35400',
    '#2ECC71',
    '#8E44AD',
    '#E74C3C',
    '#2980B9',
    '#C0392B',
  ];

  // Calculate total for percentages
  const total = linkData.reduce((sum, item) => sum + item.value, 0);

  // Custom active shape for PieChart
  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;

    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill={fill}
          className="text-sm font-medium"
        >
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
          fontSize={12}
        >
          {`${value} clicks`}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
          fontSize={12}
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded border border-gray-300 bg-white p-2">
          <p className="font-semibold">{payload[0].name}</p>
          <p>{`${payload[0].value} clicks (${((payload[0].value / total) * 100).toFixed(1)}%)`}</p>
        </div>
      );
    }
    return null;
  };

  // Handle pie sector hover
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // Truncate long names
  const truncateName = (name, maxLength = 15) => {
    return name.length > maxLength
      ? `${name.substring(0, maxLength)}...`
      : name;
  };

  // Custom legend that handles scrolling for many items
  const renderCustomizedLegend = (props) => {
    const { payload } = props;

    return (
      <div className="mt-4 flex max-h-32 flex-wrap justify-center overflow-y-auto">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="mx-2 my-1 flex items-center">
            <div
              className="mr-1 h-3 w-3 rounded-full"
              style={{ background: entry.color }}
            />
            <span className="text-xs text-gray-700">
              {truncateName(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <PremiumGate
      featureKey={FEATURES.ADVANCED_ANALYTICS}
      featureName={FEATURE_NAMES[FEATURES.ADVANCED_ANALYTICS]}
      description="Track which links your visitors are clicking the most with detailed performance analytics"
      referralUnlock={20}
      referralMessage="Refer 20 friends to unlock Link Performance Analytics for free!"
      dummyData={
        <div className="w-full rounded-lg bg-white p-4">
          <h3 className="mb-4 text-lg font-semibold">Link Performance</h3>

          <div className="pointer-events-none w-full overflow-hidden opacity-60">
            <div style={{ width: '100%', height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Instagram', value: 45 },
                      { name: 'YouTube', value: 25 },
                      { name: 'Twitter', value: 15 },
                      { name: 'Portfolio', value: 10 },
                      { name: 'Blog', value: 5 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#FF5733" />
                    <Cell fill="#33FF57" />
                    <Cell fill="#337BFF" />
                    <Cell fill="#F39C12" />
                    <Cell fill="#9B59B6" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 opacity-60">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Link
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {[
                  { name: 'Instagram', value: 45, percent: '45.0%' },
                  { name: 'YouTube', value: 25, percent: '25.0%' },
                  { name: 'Twitter', value: 15, percent: '15.0%' },
                  { name: 'Portfolio', value: 10, percent: '10.0%' },
                  { name: 'Blog', value: 5, percent: '5.0%' },
                ].map((link, index) => (
                  <tr key={index} className="bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-2 text-sm font-medium text-gray-900">
                      {link.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-2 text-sm text-gray-500">
                      {link.value}
                    </td>
                    <td className="whitespace-nowrap px-6 py-2 text-sm text-gray-500">
                      {link.percent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    >
      <div className="w-full rounded-lg bg-white p-4">
        <h3 className="mb-4 text-lg font-semibold">Link Performance</h3>

        <div className="w-full overflow-hidden">
          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={linkData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                >
                  {linkData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  content={renderCustomizedLegend}
                  verticalAlign="bottom"
                  height={36}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Links Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Link
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {linkData.slice(0, 5).map((link, index) => (
                <tr key={index} className="bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-2 text-sm font-medium text-gray-900">
                    {link.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-2 text-sm text-gray-500">
                    {link.value}
                  </td>
                  <td className="whitespace-nowrap px-6 py-2 text-sm text-gray-500">
                    {((link.value / total) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PremiumGate>
  );
};

export default LinkPerformanceChart;
