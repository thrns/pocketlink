import React, { useState, useMemo } from 'react';
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
import { FEATURES, FEATURE_NAMES } from '@/constants/features';

const ButtonClicksScatterPlot = ({ analyticsData, username }) => {
  // State for controlling the visible buttons and chart mode
  const [activeButtons, setActiveButtons] = useState({});
  const [chartMode, setChartMode] = useState('clicks'); // 'clicks', 'visits', 'attentions', 'cards'
  const [selectedCard, setSelectedCard] = useState('ALL');

  // Check for data availability based on current mode
  const hasClickData = analyticsData?.metrics?.engagement?.buttonClicks;
  const hasVisitData = analyticsData?.metrics?.engagement?.visitTrendDaily;
  const hasAttentionData =
    analyticsData?.metrics?.engagement?.attentionTrendDaily;
  const hasCardData = analyticsData?.metrics?.engagement?.cardTrendDaily;

  const hasData = useMemo(() => {
    if (chartMode === 'clicks')
      return hasClickData && Object.keys(hasClickData).length > 0;
    if (chartMode === 'visits')
      return hasVisitData && Object.keys(hasVisitData).length > 0;
    if (chartMode === 'attentions')
      return hasAttentionData && Object.keys(hasAttentionData).length > 0;
    if (chartMode === 'cards')
      return hasCardData && Object.keys(hasCardData).length > 0;
    return false;
  }, [chartMode, hasClickData, hasVisitData, hasAttentionData, hasCardData]);

  // Get data based on current mode
  const currentData = useMemo(() => {
    if (chartMode === 'clicks') {
      return analyticsData?.metrics?.engagement?.buttonClicks || {};
    } else if (chartMode === 'visits') {
      const visitData =
        analyticsData?.metrics?.engagement?.visitTrendDaily || {};
      return { 'Total Visits': visitData };
    } else if (chartMode === 'attentions') {
      const attentionData =
        analyticsData?.metrics?.engagement?.attentionTrendDaily || {};
      return { 'Total Attentions': attentionData };
    } else if (chartMode === 'cards') {
      const cardData = analyticsData?.metrics?.engagement?.cardTrendDaily || {};

      // For card mode, we need to transform the data structure
      // cardData is like: { "cardId::cardTitle": { "2025-01-15": { clicks: 2, attentions: 1, hovers: 3 } } }
      const transformedData = {};

      Object.entries(cardData).forEach(([cardKey, dateData]) => {
        const [cardId, cardTitle] = cardKey.split('::');
        const displayName = cardTitle || cardId;

        // Transform to the expected format for each metric type
        transformedData[`${displayName} - Clicks`] = {};
        transformedData[`${displayName} - Attentions`] = {};
        transformedData[`${displayName} - Hovers`] = {};

        Object.entries(dateData).forEach(([date, metrics]) => {
          transformedData[`${displayName} - Clicks`][date] = {
            count: metrics.clicks || 0,
          };
          transformedData[`${displayName} - Attentions`][date] = {
            count: metrics.attentions || 0,
          };
          transformedData[`${displayName} - Hovers`][date] = {
            count: metrics.hovers || 0,
          };
        });
      });

      return transformedData;
    }
    return {};
  }, [chartMode, analyticsData]);

  // Generate colors for buttons
  const getButtonColor = useMemo(() => {
    return (index) => {
      const colors = [
        '#8884d8',
        '#82ca9d',
        '#ffc658',
        '#ff7300',
        '#0088fe',
        '#00C49F',
        '#FFBB28',
        '#FF8042',
        '#a4de6c',
        '#d0ed57',
      ];
      return colors[index % colors.length];
    };
  }, []);

  // Process data for AreaChart - combine all items into a single dataset by date
  const processedData = useMemo(() => {
    if (!currentData || Object.keys(currentData).length === 0) return [];

    // Collect all unique dates from all data sources
    const allDates = new Set();
    Object.values(currentData).forEach((dailyData) => {
      Object.keys(dailyData).forEach((date) => {
        try {
          const dateObj = new Date(date);
          if (!isNaN(dateObj.getTime())) {
            const tenDaysAgo = new Date();
            tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
            if (dateObj >= tenDaysAgo) {
              allDates.add(date);
            }
          }
        } catch (e) {
          // Skip invalid dates
        }
      });
    });

    // Convert to sorted array
    const sortedDates = Array.from(allDates).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    // Create data points for each date with all items
    return sortedDates.map((date) => {
      const dataPoint = {
        date: new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        fullDate: date,
      };

      // Add data for each item (button/visit/attention/card)
      Object.entries(currentData).forEach(([itemName, dailyData], index) => {
        const count = parseInt(dailyData[date]?.count || 0);
        dataPoint[itemName] = isNaN(count) ? 0 : count;

        // Initialize active state
        if (activeButtons[itemName] === undefined) {
          activeButtons[itemName] = true;
        }
      });

      return dataPoint;
    });
  }, [currentData, activeButtons]);

  // Get chart title and Y-axis label based on mode
  const chartConfig = useMemo(() => {
    switch (chartMode) {
      case 'clicks':
        return { title: 'Card Clicks Over Time', yLabel: 'Clicks' };
      case 'visits':
        return { title: 'Visits Over Time', yLabel: 'Visits' };
      case 'attentions':
        return { title: 'Attentions Over Time', yLabel: 'Attentions' };
      default:
        return { title: 'Card Clicks Over Time', yLabel: 'Clicks' };
    }
  }, [chartMode]);

  // Get all item names for Area components
  const itemNames = useMemo(() => {
    return Object.keys(currentData || {});
  }, [currentData]);

  // Toggle item visibility
  const toggleItem = (itemName) => {
    setActiveButtons({
      ...activeButtons,
      [itemName]: !activeButtons[itemName],
    });
  };

  // If no valid data, render EmptyState
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
        <div className="w-full rounded-lg bg-white p-4">
          <h3 className="mb-4 text-lg font-semibold">{chartConfig.title}</h3>
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

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded border border-gray-300 bg-white p-2 shadow-lg">
          <p className="mb-1 font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Generate dummy data for the premium gate preview
  const generateDummyData = () => {
    const platforms = ['Instagram', 'Twitter', 'YouTube', 'Website'];
    const dummyData = [];

    // Generate last 10 days of data
    const today = new Date();
    for (let i = 10; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      const dataPoint = {
        date: date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
      };

      platforms.forEach((platform) => {
        // Create realistic patterns
        let clicks;
        if (platform === 'Instagram') {
          clicks = 15 + Math.floor(Math.random() * 20);
          if (date.getDay() === 0 || date.getDay() === 6) {
            clicks += 10;
          }
        } else if (platform === 'Twitter') {
          clicks = 8 + Math.floor(Math.random() * 15);
          if (date.getDay() === 2 || date.getDay() === 3) {
            clicks += 8;
          }
        } else if (platform === 'YouTube') {
          clicks = 5 + Math.floor(Math.random() * 10);
        } else {
          clicks = 3 + Math.floor(Math.random() * 7);
        }

        dataPoint[platform] = clicks;
      });

      dummyData.push(dataPoint);
    }

    return { data: dummyData, platforms };
  };

  const dummyData = generateDummyData();

  return (
    <PremiumGate
      featureKey={FEATURES.ADVANCED_ANALYTICS}
      featureName={FEATURE_NAMES[FEATURES.ADVANCED_ANALYTICS]}
      description="Get detailed button click insights with geographic data, device information, and referral sources"
      dummyData={
        <div className="w-full rounded-lg bg-white p-4">
          <h3 className="mb-4 text-lg font-semibold">
            Button Clicks Over Time
          </h3>

          <div className="mb-4 flex flex-wrap gap-2">
            {dummyData.platforms.map((platform, index) => (
              <button
                key={platform}
                className="rounded-full px-3 py-1 text-sm text-white opacity-60"
                style={{ background: getButtonColor(index) }}
              >
                {platform}
              </button>
            ))}
          </div>

          <div className="pointer-events-none w-full overflow-x-auto opacity-60">
            <div style={{ width: '100%', height: '400px', minWidth: '600px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dummyData.data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    {dummyData.platforms.map((platform, index) => (
                      <linearGradient
                        key={platform}
                        id={`${platform}Gradient`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={getButtonColor(index)}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={getButtonColor(index)}
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <XAxis dataKey="date" stroke="#4a5568" />
                  <YAxis stroke="#4a5568" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <Tooltip />
                  <Legend />
                  {dummyData.platforms.map((platform, index) => (
                    <Area
                      key={platform}
                      type="monotone"
                      dataKey={platform}
                      name={platform}
                      stroke={getButtonColor(index)}
                      fillOpacity={1}
                      fill={`url(#${platform}Gradient)`}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full rounded-lg bg-white p-4">
        <h3 className="mb-4 text-lg font-semibold">{chartConfig.title}</h3>

        {/* Mode Toggle */}
        <div className="mb-4 flex flex-wrap gap-2">
          {['clicks', 'visits', 'attentions', 'cards'].map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setChartMode(mode);
                setActiveButtons({}); // Reset active buttons when switching modes
              }}
              className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                chartMode === mode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>

        {/* Legend/Filter Buttons - show for clicks and cards modes with multiple items */}
        {(chartMode === 'clicks' || chartMode === 'cards') &&
          itemNames.length > 1 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {itemNames.map((itemName, index) => (
                <button
                  key={itemName}
                  onClick={() => toggleItem(itemName)}
                  className={`rounded-full px-3 py-1 text-sm ${
                    activeButtons[itemName]
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  style={{
                    background: activeButtons[itemName]
                      ? getButtonColor(index)
                      : undefined,
                  }}
                >
                  {itemName}
                </button>
              ))}
            </div>
          )}

        <div className="w-full overflow-x-auto">
          <div style={{ width: '100%', height: '400px', minWidth: '600px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={processedData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  {itemNames.map((itemName, index) => (
                    <linearGradient
                      key={itemName}
                      id={`${itemName.replace(/[^a-zA-Z0-9]/g, '')}Gradient`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={getButtonColor(index)}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={getButtonColor(index)}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  ))}
                </defs>

                <XAxis dataKey="date" stroke="#4a5568" />
                <YAxis
                  stroke="#4a5568"
                  label={{
                    value: chartConfig.yLabel,
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <Tooltip
                  content={<CustomTooltip />}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                  }}
                />
                <Legend />

                {itemNames.map((itemName, index) => {
                  // For single-item modes (visits/attentions), always show the item
                  // For multi-item modes (clicks/cards), check activeButtons
                  const shouldShow =
                    chartMode === 'clicks' || chartMode === 'cards'
                      ? activeButtons[itemName]
                      : true;

                  return (
                    shouldShow && (
                      <Area
                        key={itemName}
                        type="monotone"
                        dataKey={itemName}
                        name={itemName}
                        stroke={getButtonColor(index)}
                        fillOpacity={1}
                        fill={`url(#${itemName.replace(/[^a-zA-Z0-9]/g, '')}Gradient)`}
                      />
                    )
                  );
                })}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PremiumGate>
  );
};

export default ButtonClicksScatterPlot;
