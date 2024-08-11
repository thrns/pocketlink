import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
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
import { FEATURES, FEATURE_NAMES } from '@/constants/features';

const TopReferrersChart = ({ analyticsData, username }) => {
  // Function to get favicon/logo URL for a referrer
  const getReferrerLogo = (referrer) => {
    if (!referrer || referrer === 'Direct') {
      return '/icons/direct-traffic.svg';
    }

    try {
      let domain = referrer;
      if (referrer.startsWith('http')) {
        domain = new URL(referrer).hostname;
      }
      domain = domain.replace(/_/g, '.');
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return '/icons/globe.svg';
    }
  };

  const hasReferrerMetrics = analyticsData?.metrics?.referrers;

  // If no valid data, render EmptyState
  if (!analyticsData || !hasReferrerMetrics) {
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
          title="No Data Available"
          text="Share your link in bio"
          buttonText={'Copy Link'}
          image={'/AI/pocket.png'}
          onClick={handleShareClick}
        />
      </div>
    );
  }

  const data = Object.entries(analyticsData.metrics.referrers)
    .map(([_, referrer]) => {
      const pretty = referrer.referrer;
      return {
        name: pretty.length > 25 ? pretty.substring(0, 25) + '...' : pretty,
        sessions: referrer.unique_visitors || 0,
        visits: referrer.visits || 0,
        originalReferrer: pretty,
      };
    })
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 10);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="rounded border border-gray-300 bg-white p-3">
          <div className="mb-2 flex items-center space-x-2">
            <img
              src={getReferrerLogo(d.originalReferrer)}
              alt={`${d.originalReferrer} logo`}
              className="h-4 w-4 rounded-sm"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <p className="font-semibold">{d.originalReferrer}</p>
          </div>
          <p className="text-blue-600">{`Unique Visits: ${d.sessions}`}</p>
          <p className="text-green-600">{`Total Visits: ${d.visits}`}</p>
          <p className="text-xs text-gray-500">Session-based analytics</p>
        </div>
      );
    }
    return null;
  };

  return (
    <PremiumGate
      featureKey={FEATURES.ADVANCED_ANALYTICS}
      featureName={FEATURE_NAMES[FEATURES.ADVANCED_ANALYTICS]}
      description="Track where your visitors are coming from with detailed referrer insights and analytics"
      className="w-full"
      dummyData={
        <div className="w-full rounded-lg bg-white p-4">
          <h3 className="mb-4 text-lg font-semibold">Top Referrers</h3>
          <div className="pointer-events-none w-full overflow-x-auto opacity-60">
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Direct', sessions: 45, visits: 52 },
                    { name: 'Google', sessions: 32, visits: 38 },
                    { name: 'Instagram', sessions: 28, visits: 34 },
                    { name: 'Facebook', sessions: 22, visits: 28 },
                    { name: 'Twitter', sessions: 18, visits: 24 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sessions" fill="#8884d8" name="Unique Visits" />
                  <Bar dataKey="visits" fill="#82ca9d" name="Total Visits" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full rounded-lg bg-white p-4">
        <h3 className="mb-4 text-lg font-semibold">Top Referrers</h3>
        {data.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">No referrer data available yet</p>
            <p className="mt-2 text-sm text-gray-400">
              Share your link to start tracking referrers
            </p>
          </div>
        ) : (
          <>
            <div className="tour-referrers-chart-backup w-full overflow-x-auto">
              <div
                style={{ width: '100%', height: '300px', minWidth: '500px' }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      stroke="#4a5568"
                      fontSize={12}
                    />
                    <YAxis stroke="#4a5568" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="sessions"
                      fill="#8884d8"
                      name="Unique Visits"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="visits"
                      fill="#82ca9d"
                      name="Total Visits"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Referrer list */}
            <div className="mt-4 space-y-2">
              {data.map((referrer, index) => {
                const totalSessions = data.reduce(
                  (sum, r) => sum + r.sessions,
                  0
                );
                const percentage =
                  totalSessions > 0
                    ? ((referrer.sessions / totalSessions) * 100).toFixed(1)
                    : 0;

                return (
                  <div
                    key={referrer.name}
                    className="flex items-center justify-between rounded bg-gray-50 p-2 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center">
                        <img
                          src={getReferrerLogo(referrer.originalReferrer)}
                          alt={`${referrer.originalReferrer} logo`}
                          className="h-5 w-5 rounded-sm"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <div
                          className="hidden h-4 w-4 rounded"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                      </div>
                      <div>
                        <span className="font-medium">{referrer.name}</span>
                        {referrer.originalReferrer !== referrer.name && (
                          <div className="max-w-xs truncate text-xs text-gray-500">
                            {referrer.originalReferrer}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {referrer.sessions} unique visits
                      </div>
                      <div className="text-xs text-gray-500">{percentage}%</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary stats */}
            <div className="mt-4 grid grid-cols-1 gap-4 text-center md:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-lg font-semibold">{data.length}</div>
                <div className="text-xs text-gray-500">Unique Referrers</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-lg font-semibold">
                  {data.reduce((sum, r) => sum + r.sessions, 0)}
                </div>
                <div className="text-xs text-gray-500">Total Unique Visits</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-lg font-semibold">
                  {data.reduce((sum, r) => sum + r.visits, 0)}
                </div>
                <div className="text-xs text-gray-500">Total Page Visits</div>
              </div>
            </div>
          </>
        )}
      </div>
    </PremiumGate>
  );
};

export default TopReferrersChart;
