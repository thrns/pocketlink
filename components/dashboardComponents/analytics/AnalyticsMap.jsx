'use client';

import { useState, useMemo } from 'react';
import { WorldMap } from 'react-svg-worldmap';
import iso31661 from 'iso-3166-1';
import dynamic from 'next/dynamic';
const Globe = dynamic(
  () => import('@/components/dashboardComponents/analytics/Globe'),
  { ssr: false }
);
import EmptyState from '@/components/EmptyState';
import { useAuth } from '@/app/contexts/AuthContext';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import PremiumGate from '@/components/PremiumGate';
import { FEATURES, FEATURE_NAMES } from '@/constants/features';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import {
  ClientSideRowModelModule,
  ValidationModule,
  PaginationModule,
  DateFilterModule,
  CellStyleModule,
  TextFilterModule,
  RowSelectionModule,
} from 'ag-grid-community';
import { myTheme } from '@/lib/utils/TableThemes';

// Register AG-Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  TextFilterModule,
  PaginationModule,
  CellStyleModule,
  DateFilterModule,
  RowSelectionModule,
]);

export default function AnalyticsMap({ analyticsData, username }) {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('countries'); // countries, cities, detailed

  // AG-Grid Column Definitions for Location Analytics (moved outside conditional)
  const locationColumnDefs = useMemo(
    () => [
      {
        headerName: 'Location',
        field: 'location',
        flex: 2,
        minWidth: 200,
        cellRenderer: (params) => {
          const location = params.data;
          return (
            <div className="py-1">
              <div className="font-medium text-gray-900">
                {location.city}, {location.region}
              </div>
              <div className="flex items-center text-gray-500">
                <span className="mr-2">{location.country}</span>
                {location.countryCode && location.countryCode !== 'XX' && (
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                    {location.countryCode}
                  </span>
                )}
              </div>
            </div>
          );
        },
        cellClass: 'bg-blue-50',
      },
      {
        headerName: 'Visits',
        field: 'visits',
        flex: 1,
        minWidth: 80,
        cellClass: 'text-center',
        cellRenderer: (params) => (
          <div className="flex items-center justify-center">
            <span className="font-semibold text-blue-600">{params.value}</span>
          </div>
        ),
      },
      {
        headerName: 'Sessions',
        field: 'sessions',
        flex: 1,
        minWidth: 80,
        cellClass: 'text-center',
        cellRenderer: (params) => (
          <div className="flex items-center justify-center">
            <span className="font-semibold text-green-600">
              {params.value || 0}
            </span>
          </div>
        ),
      },
      {
        headerName: 'Postal Code',
        field: 'postal',
        flex: 1,
        minWidth: 100,
        cellClass: 'text-center',
      },
      {
        headerName: 'Timezone',
        field: 'timezone',
        flex: 1.5,
        minWidth: 150,
        cellRenderer: (params) => (
          <div className="truncate" title={params.value}>
            {params.value}
          </div>
        ),
      },
      {
        headerName: 'ISP',
        field: 'isp',
        flex: 2,
        minWidth: 150,
        cellRenderer: (params) => (
          <div className="truncate" title={params.value}>
            {params.value}
          </div>
        ),
      },
      {
        headerName: 'ASN',
        field: 'asn',
        flex: 1,
        minWidth: 80,
        cellClass: 'text-center',
      },
      {
        headerName: 'Currency',
        field: 'currency',
        flex: 1,
        minWidth: 80,
        cellClass: 'text-center',
      },
      {
        headerName: 'Calling Code',
        field: 'callingCode',
        flex: 1,
        minWidth: 100,
        cellClass: 'text-center',
      },
      {
        headerName: 'First Seen',
        field: 'firstSeen',
        flex: 1.2,
        minWidth: 120,
        cellClass: 'text-center',
        cellRenderer: (params) => (
          <div className="text-sm">
            {params.value !== 'Unknown'
              ? new Date(params.value).toLocaleDateString()
              : 'Unknown'}
          </div>
        ),
      },
      {
        headerName: 'Last Updated',
        field: 'lastUpdated',
        flex: 1.2,
        minWidth: 120,
        cellClass: 'text-center',
        cellRenderer: (params) => (
          <div className="text-sm">
            {params.value !== 'Unknown'
              ? new Date(params.value).toLocaleDateString()
              : 'Unknown'}
          </div>
        ),
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  const gridOptions = useMemo(
    () => ({
      rowHeight: 60,
      suppressRowClickSelection: true,
      pagination: true,
      paginationPageSize: 20,
    }),
    []
  );

  // Country name to ISO-2 mapping (manual overrides)
  const countryCodeMap = {
    'United States': 'US',
    Türkiye: 'TR',
    Canada: 'CA',
    India: 'IN',
    Ireland: 'IE',
    Singapore: 'SG',
    Unknown: null, // Explicitly exclude Unknown
  };

  // Extract country data from events
  const extractCountryDataFromEvents = (events) => {
    const countryCount = {};

    if (!events || typeof events !== 'object') return {};

    Object.values(events).forEach((event) => {
      if (event.location && event.location.country) {
        const country = event.location.country;
        if (country && country.toLowerCase() !== 'unknown') {
          countryCount[country] = (countryCount[country] || 0) + 1;
        }
      }
    });

    return countryCount;
  };

  // Extract location data from events or sessions directly since geographic aggregation might not be working
  const extractLocationDataFromEvents = () => {
    let locationData = [];

    // First try to extract from the new locations structure
    if (
      analyticsData?.locations &&
      Object.keys(analyticsData.locations).length > 0
    ) {
      locationData = Object.entries(analyticsData.locations)
        .map(([locationKey, locationInfo]) => {
          return {
            key: locationKey,
            country:
              locationInfo.countryName || locationInfo.country || 'Unknown',
            countryCode: locationInfo.country || 'XX', // This is the ISO code from our structure
            region: locationInfo.region || 'Unknown',
            city: locationInfo.city || 'Unknown',
            coordinates: locationInfo.coordinates || null,
            postal: locationInfo.postal || 'Unknown',
            timezone: locationInfo.timezone || 'Unknown',
            isp: locationInfo.isp || 'Unknown',
            asn: locationInfo.asn || 'Unknown',
            currency: locationInfo.currency || 'Unknown',
            languages: locationInfo.languages || 'Unknown',
            callingCode: locationInfo.callingCode || 'Unknown',
            lastUpdated: locationInfo.lastUpdated || 'Unknown',
            firstSeen: locationInfo.firstSeen || 'Unknown',
            visits: locationInfo.totalVisits || 0,
            sessions: locationInfo.totalSessions || 0,
            events: locationInfo.totalVisits || 0, // Use totalVisits as events count
          };
        })
        .filter((item) => item.country !== 'Unknown' && item.visits > 0)
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 20);

      if (locationData.length > 0) {
        return locationData;
      }
    }

    // Check for topCountries fallback
    if (
      analyticsData?.topCountries &&
      Object.keys(analyticsData.topCountries).length > 0
    ) {
      locationData = Object.entries(analyticsData.topCountries)
        .map(([country, countryInfo]) => ({
          key: country,
          country: countryInfo.countryName || country,
          countryCode: countryInfo.country || 'XX',
          region: 'Unknown',
          city: 'Unknown',
          coordinates: null,
          postal: 'Unknown',
          timezone: 'Unknown',
          isp: 'Unknown',
          asn: 'Unknown',
          currency: 'Unknown',
          languages: 'Unknown',
          callingCode: 'Unknown',
          lastUpdated: countryInfo.lastUpdated || 'Unknown',
          firstSeen: 'Unknown',
          visits: countryInfo.count || 0,
          sessions: 0,
          events: countryInfo.count || 0,
        }))
        .filter((item) => item.country !== 'Unknown' && item.visits > 0)
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 20);

      if (locationData.length > 0) {
        return locationData;
      }
    }

    // Try to extract from events if locations structure doesn't exist
    if (analyticsData?.events && Object.keys(analyticsData.events).length > 0) {
      const locationCounts = {};

      Object.values(analyticsData.events).forEach((event) => {
        if (
          event.location &&
          event.location.country &&
          event.location.country !== 'Unknown'
        ) {
          const locationKey = `${event.location.city}, ${event.location.country}`;
          if (!locationCounts[locationKey]) {
            locationCounts[locationKey] = {
              key: locationKey,
              country: event.location.country,
              countryCode: event.location.countryCode || 'XX',
              region: event.location.region || 'Unknown',
              city: event.location.city || 'Unknown',
              coordinates: event.location.coordinates || null,
              postal: event.location.postal || 'Unknown',
              timezone: event.location.timezone || 'Unknown',
              isp: event.location.isp || 'Unknown',
              asn: event.location.asn || 'Unknown',
              currency: event.location.currency || 'Unknown',
              languages: event.location.languages || 'Unknown',
              callingCode: event.location.callingCode || 'Unknown',
              lastUpdated: event.location.lastUpdated || 'Unknown',
              firstSeen: 'Unknown',
              visits: 0,
              sessions: 0,
              events: 0,
            };
          }
          locationCounts[locationKey].events += 1;
          if (event.eventType === 'visit') {
            locationCounts[locationKey].visits += 1;
          }
        }
      });

      locationData = Object.values(locationCounts)
        .sort((a, b) => b.events - a.events)
        .slice(0, 20);
    }

    // Try to extract from sessions if events don't have location
    if (
      locationData.length === 0 &&
      analyticsData?.sessions &&
      Object.keys(analyticsData.sessions).length > 0
    ) {
      const locationCounts = {};

      Object.values(analyticsData.sessions).forEach((session) => {
        if (
          session.location &&
          session.location.country &&
          session.location.country !== 'Unknown'
        ) {
          const locationKey = `${session.location.city}, ${session.location.country}`;
          if (!locationCounts[locationKey]) {
            locationCounts[locationKey] = {
              key: locationKey,
              country: session.location.country,
              countryCode: session.location.countryCode || 'XX',
              region: session.location.region || 'Unknown',
              city: session.location.city || 'Unknown',
              coordinates: session.location.coordinates || null,
              postal: session.location.postal || 'Unknown',
              timezone: session.location.timezone || 'Unknown',
              isp: session.location.isp || 'Unknown',
              asn: session.location.asn || 'Unknown',
              currency: session.location.currency || 'Unknown',
              languages: session.location.languages || 'Unknown',
              callingCode: session.location.callingCode || 'Unknown',
              lastUpdated: session.location.lastUpdated || 'Unknown',
              firstSeen: 'Unknown',
              visits: 0,
              sessions: 0,
              events: 0,
            };
          }
          locationCounts[locationKey].visits += 1;
          locationCounts[locationKey].sessions += 1;
          locationCounts[locationKey].events +=
            session.metrics?.totalEvents || 1;
        }
      });

      locationData = Object.values(locationCounts)
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 20);
    }

    return locationData;
  };

  // Process events data or fallback to topCountries if available
  const countryData = (() => {
    // Prefer the aggregated countries object when available (all-time)
    if (
      analyticsData?.countries &&
      Object.keys(analyticsData.countries).length > 0
    ) {
      return Object.values(analyticsData.countries)
        .map((c) => ({ country: c.countryCode || 'XX', count: c.visits || 0 }))
        .filter((e) => e.count > 0);
    }

    let countryCount = {};

    // Fallback: derive from locations
    if (
      analyticsData?.locations &&
      Object.keys(analyticsData.locations).length > 0
    ) {
      const countryGroups = {};
      Object.values(analyticsData.locations).forEach((locationInfo) => {
        const countryName = locationInfo.countryName || 'Unknown';
        const countryCode = locationInfo.country || 'XX';
        if (countryName && countryName.toLowerCase() !== 'unknown') {
          if (!countryGroups[countryCode]) {
            countryGroups[countryCode] = {
              name: countryName,
              code: countryCode,
              count: 0,
            };
          }
          countryGroups[countryCode].count += locationInfo.totalVisits || 0;
        }
      });
      return Object.values(countryGroups)
        .filter((group) => group.count > 0)
        .map((group) => ({ country: group.code, count: group.count }));
    }

    // Try new unified structure first - use actual stored schema
    if (analyticsData?.metrics?.geographic?.countries) {
      countryCount = Object.fromEntries(
        Object.entries(analyticsData.metrics.geographic.countries).map(
          ([countryKey, data]) => [
            data.country || countryKey.replace(/_/g, ' '),
            data.events || data.visits || 0, // Use events as primary metric, visits as fallback
          ]
        )
      );
    }
    // Try to extract from events
    else if (analyticsData?.events) {
      countryCount = extractCountryDataFromEvents(analyticsData.events);
    }
    // Fallback to topCountries if events don't have country data
    else if (analyticsData?.topCountries) {
      countryCount = Object.fromEntries(
        Object.entries(analyticsData.topCountries).map(([country, data]) => [
          country,
          data.count || 0,
        ])
      );
    }
    // Legacy fallback: Create estimated geographic data from overview stats
    else if (
      analyticsData?.overview?.totalVisits ||
      analyticsData?.metrics?.overview?.totalVisits
    ) {
      const totalVisits =
        analyticsData?.overview?.totalVisits ||
        analyticsData?.metrics?.overview?.totalVisits ||
        0;

      if (totalVisits > 0) {
        // Create a reasonable geographic distribution estimate for demo purposes
        // This is just to show the map working until real geographic data is collected
        const estimatedCountries = [
          { country: 'United States', percentage: 0.4 },
          { country: 'Canada', percentage: 0.15 },
          { country: 'United Kingdom', percentage: 0.12 },
          { country: 'India', percentage: 0.1 },
          { country: 'Australia', percentage: 0.08 },
          { country: 'Germany', percentage: 0.06 },
          { country: 'France', percentage: 0.05 },
          { country: 'Brazil', percentage: 0.04 },
        ];

        countryCount = Object.fromEntries(
          estimatedCountries.map(({ country, percentage }) => [
            country,
            Math.max(1, Math.floor(totalVisits * percentage)),
          ])
        );
      }
    }

    // Convert to the format needed for WorldMap (only for non-locations data)
    if (Object.keys(countryCount).length > 0) {
      return Object.entries(countryCount)
        .reduce((acc, [country, count]) => {
          // Ignore "Unknown" entries
          if (country.toLowerCase() === 'unknown') return acc;

          // Convert full country name to ISO code if needed
          const isoCode =
            countryCodeMap[country] ||
            iso31661.whereCountry(country)?.alpha2 ||
            country;

          if (isoCode) {
            const existing = acc.find((c) => c.country === isoCode);
            if (existing) {
              existing.count += count;
            } else {
              acc.push({ country: isoCode, count });
            }
          }
          return acc;
        }, [])
        .filter((entry) => entry.count > 0);
    }

    return [];
  })();

  const locationData = extractLocationDataFromEvents();

  // Find max user count for scaling
  const maxUsers = Math.max(...countryData.map((d) => d.count), 1);

  // Heatmap Color Scale (Red → Blue based on intensity)
  const getColorIntensity = (value) => {
    const normalized = 1 - value / maxUsers; // 🔄 Invert normalization
    const r = Math.floor(255 * normalized); // Red fades out with intensity
    const g = Math.floor(255 - normalized * 150); // Green adjusts slightly
    const b = Math.floor(255 - normalized * 255); // Blue increases with intensity
    return `rgb(${r}, ${g}, ${b})`;
  };

  // If no valid country data, render EmptyState
  if (countryData.length === 0 && locationData.length === 0) {
    const handleShareClick = () => {
      const link = `https://${username}.pocketlink.co`; // Replace with actual link
      navigator.clipboard.writeText(link);
    };

    return (
      <div className="relative w-full rounded-lg bg-white p-4">
        <h3 className="mb-4 text-lg font-semibold">World Map Analytics</h3>
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'countries':
        return (
          <div className="flex w-full flex-col justify-center rounded-lg bg-white p-2 md:flex-row">
            {/* MAP */}
            <div className="mr-4 w-full">
              {/*    
              // OLD MAP          
              <WorldMap
                color="blue"
                valueSuffix=" users"
                size="responsive"
                data={countryData.map(({ country, count }) => ({
                  country,
                  value: count,
                }))}
                borderColor="#FFF"
                tooltipBgColor="#000"
                styleFunction={({ countryValue }) => ({
                  fill: countryValue
                    ? getColorIntensity(countryValue)
                    : '#E0E0E0',
                  stroke: '#FFF',
                  strokeWidth: 1,
                })}
                onHoverFunction={(event, countryName, isoCode, value) => {
                  setSelected(value ? `${countryName}: ${value} users` : null);
                }}
              /> */}
              <Globe analyticsData={analyticsData} />
            </div>

            {/* LEGEND */}
            <div className="flex w-full flex-col items-start p-4 md:w-1/4">
              <h3 className="text-lg font-semibold text-gray-800">
                Top Countries
              </h3>
              <ul className="mt-2 space-y-2">
                {countryData
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 10) // Show only the top 10
                  .map(({ country, count }) => (
                    <li key={country} className="flex items-center space-x-2">
                      <span
                        className="h-4 w-4 rounded-full"
                        style={{ background: getColorIntensity(count) }}
                      />
                      <span className="text-sm text-gray-700">
                        {country} - {count} users
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        );

      case 'cities':
        const topCities = locationData.slice(0, 15);
        return (
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Top Cities
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {topCities.map((location, index) => (
                <div
                  key={location.key}
                  className="rounded-lg border bg-gray-50 p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">
                      {location.city}, {location.region}
                    </h4>
                    <span className="text-sm font-semibold text-blue-600">
                      {location.visits} visits
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📍 {location.country}</p>
                    {location.postal !== 'Unknown' && (
                      <p>📮 {location.postal}</p>
                    )}
                    {location.timezone !== 'Unknown' && (
                      <p>🕒 {location.timezone}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'detailed':
        return (
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Detailed Location Analytics
            </h3>

            {locationData.length === 0 ? (
              <div className="flex h-32 items-center justify-center text-gray-500">
                <p>No location data available</p>
              </div>
            ) : (
              <>
                {/* AG-Grid Table */}
                <div
                  className="ag-theme-alpine mb-6"
                  style={{ width: '100%', height: '500px' }}
                >
                  <AgGridReact
                    rowData={locationData}
                    columnDefs={locationColumnDefs}
                    gridOptions={gridOptions}
                    theme={myTheme}
                    modules={[
                      ClientSideRowModelModule,
                      ValidationModule,
                      PaginationModule,
                      TextFilterModule,
                    ]}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    noRowsOverlayComponent={() => (
                      <div className="p-6 text-center text-gray-500">
                        <p>No location data available</p>
                      </div>
                    )}
                  />
                </div>

                {/* Additional Stats Summary */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="text-md mb-3 font-semibold text-gray-800">
                    Location Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                    <div>
                      <span className="text-gray-600">Total Locations:</span>
                      <span className="ml-2 font-semibold">
                        {locationData.length}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Visits:</span>
                      <span className="ml-2 font-semibold text-blue-600">
                        {locationData.reduce((sum, loc) => sum + loc.visits, 0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Sessions:</span>
                      <span className="ml-2 font-semibold text-green-600">
                        {locationData.reduce(
                          (sum, loc) => sum + (loc.sessions || 0),
                          0
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Unique Countries:</span>
                      <span className="ml-2 font-semibold">
                        {new Set(locationData.map((loc) => loc.country)).size}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PremiumGate
      featureKey={FEATURES.ADVANCED_ANALYTICS}
      featureName={FEATURE_NAMES[FEATURES.ADVANCED_ANALYTICS]}
      description="Track your visitors from around the world with comprehensive geographic data and insights"
      referralUnlock={15}
      referralMessage="Refer 15 friends to unlock the World Map Analytics feature for free!"
      dummyData={
        <div className="flex w-full flex-col justify-center rounded-lg bg-white p-4 md:flex-row">
          <div className="pointer-events-none w-full opacity-60 md:ml-20 md:w-3/4">
            <WorldMap
              color="blue"
              valueSuffix=" users"
              size="responsive"
              data={[
                { country: 'US', value: 245 },
                { country: 'GB', value: 123 },
                { country: 'CA', value: 97 },
                { country: 'IN', value: 65 },
                { country: 'AU', value: 42 },
              ]}
              borderColor="#FFF"
              tooltipBgColor="#000"
              styleFunction={() => ({
                fill: '#E0E0E0',
                stroke: '#FFF',
                strokeWidth: 1,
              })}
            />
          </div>
          <div className="flex w-full flex-col items-start md:w-1/4">
            <h3 className="text-lg font-semibold text-gray-800">
              Top Countries
            </h3>
            <ul className="mt-2 space-y-2">
              {[
                { country: 'US', count: 245 },
                { country: 'GB', count: 123 },
                { country: 'CA', count: 97 },
                { country: 'IN', count: 65 },
                { country: 'AU', count: 42 },
              ].map(({ country, count }) => (
                <li key={country} className="flex items-center space-x-2">
                  <span className="h-4 w-4 rounded-full bg-blue-500 opacity-60" />
                  <span className="text-sm text-gray-700">
                    {country} - {count} users
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Tab Navigation */}
        <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
          {[
            { key: 'countries', label: 'Countries', icon: '🌍' },
            { key: 'cities', label: 'Cities', icon: '🏙️' },
            { key: 'detailed', label: 'Detailed', icon: '📊' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </PremiumGate>
  );
}
