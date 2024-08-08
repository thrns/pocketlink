import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from 'recharts';
import EmptyState from '@/components/EmptyState';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import PremiumGate from '@/components/PremiumGate';
import { FEATURES, FEATURE_NAMES } from '@/constants/features';

const DeviceDistributionChart = ({ analyticsData, username }) => {
  // Check for new relational structure first, then fall back to legacy
  const hasNewStructure = analyticsData?.indices?.sessionsByDevice;

  // If no valid data, render title + EmptyState
  if (!analyticsData || !hasNewStructure) {
    const handleShareClick = () => {
      const link = `https://${username}.pocketlink.co`;
      navigator.clipboard.writeText(link);
    };

    return (
      <div className="relative w-full rounded-lg bg-white p-4">
        <h3 className="mb-4 text-lg font-semibold">Device Distribution</h3>
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

  const sessionsByDevice = analyticsData.indices.sessionsByDevice || {};
  const data = Object.entries(sessionsByDevice)
    .map(([deviceType, sessions]) => ({
      name: deviceType.charAt(0).toUpperCase() + deviceType.slice(1),
      value: Object.keys(sessions || {}).length,
    }))
    .filter((item) => item.value > 0);

  // Colors for the pie chart
  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Format percentage for labels
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const metricLabel = 'sessions';
      return (
        <div className="rounded border border-gray-300 bg-white p-2">
          <p className="font-semibold">{payload[0].name}</p>
          <p>{`${payload[0].value} ${metricLabel} (${((payload[0].value / total) * 100).toFixed(1)}%)`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <PremiumGate
      featureKey={FEATURES.ADVANCED_ANALYTICS}
      featureName={FEATURE_NAMES[FEATURES.ADVANCED_ANALYTICS]}
      description="Get detailed insights with geographic data, device information, and referral sources, heatmaps and more"
      dummyData={
        <div className="w-full rounded-lg bg-white p-4">
          <h3 className="mb-4 text-lg font-semibold">Device Distribution</h3>

          <div className="pointer-events-none w-full overflow-x-auto opacity-60">
            <div style={{ width: '100%', height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Mobile', value: 65 },
                      { name: 'Desktop', value: 25 },
                      { name: 'Tablet', value: 10 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#FF6384" />
                    <Cell fill="#36A2EB" />
                    <Cell fill="#FFCE56" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { name: 'Mobile', value: 65, color: '#FF6384' },
              { name: 'Desktop', value: 25, color: '#36A2EB' },
              { name: 'Tablet', value: 10, color: '#FFCE56' },
            ].map((device) => (
              <div
                key={device.name}
                className="rounded-lg bg-gray-50 p-3 opacity-60"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ background: device.color }}
                  />
                  <h4 className="font-medium">{device.name}</h4>
                </div>
                <p className="mt-2 text-2xl font-semibold">{device.value}</p>
                <p className="text-sm text-gray-500">
                  {device.value}% of total
                </p>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="flex w-full flex-col items-start justify-center rounded-lg bg-white p-4">
        <h3 className="mb-4 text-lg font-semibold">Device Distribution</h3>

        <div className="tour-device-distribution flex w-full">
          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {data.map((device, index) => (
            <div key={device.name} className="rounded-lg bg-gray-50 p-3">
              <div className="flex items-center space-x-2">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ background: COLORS[index % COLORS.length] }}
                />
                <h4 className="font-medium">{device.name}</h4>
              </div>
              <p className="mt-2 text-2xl font-semibold">{device.value}</p>
              <p className="text-sm text-gray-500">
                {((device.value / total) * 100).toFixed(1)}% of total
              </p>
            </div>
          ))}
        </div>
      </div>
    </PremiumGate>
  );
};

export default DeviceDistributionChart;
