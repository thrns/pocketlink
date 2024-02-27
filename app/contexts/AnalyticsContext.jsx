// contexts/AnalyticsContext.js (Supabase-based)
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/Clients/supabase/client';
import { useAuth } from './AuthContext';

const AnalyticsContext = createContext();

export function AnalyticsProvider({ children }) {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      if (!user?.username) return;
      setLoading(true);
      setError(null);

      try {
        const tenant = user.username;
        const today = new Date();
        const start = new Date();
        start.setDate(today.getDate() - 365);
        // Extend range to include future dates (in case of data entry errors)
        const endDate = new Date();
        endDate.setFullYear(today.getFullYear() + 1); // Next year
        const startISO = start.toISOString();
        const endISO = endDate.toISOString();

        // Retention handled by DB pg_cron (see migration); no client-side purge

        // Helper: deep merge partial updates as they arrive
        const mergeData = (partial) => {
          setAnalyticsData((prev) => {
            const base = prev || {
              metrics: {
                overview: {
                  totalVisits: 0,
                  totalUniqueVisits: 0,
                  totalUniqueVisitors: 0,
                  totalClicks: 0,
                  totalAttentions: 0,
                  totalEvents: 0,
                  lastUpdated: new Date().toISOString(),
                },
                daily: {},
                referrers: {},
                performance: { linkPerformance: {} },
                engagement: { buttonClicks: {} },
              },
              indices: { sessionsByDevice: {} },
              locations: {},
              heatmap: { desktop: [], mobile: [], tablet: [], unknown: [] },
            };
            return {
              ...base,
              ...partial,
              metrics: {
                ...base.metrics,
                ...partial?.metrics,
                performance: {
                  ...base.metrics.performance,
                  ...partial?.metrics?.performance,
                },
                engagement: {
                  ...base.metrics.engagement,
                  ...partial?.metrics?.engagement,
                },
              },
              indices: { ...base.indices, ...partial?.indices },
              locations: { ...base.locations, ...partial?.locations },
              heatmap: { ...base.heatmap, ...partial?.heatmap },
            };
          });
        };

        // 1) Daily metrics → overview & daily

        supabase
          .from('analytics_daily_metrics')
          .select('metric_date, visits, clicks, attentions, events')
          .eq('tenant_username', tenant)
          .order('metric_date', { ascending: true })
          .then(({ data, error }) => {
            if (error) throw error;
            const daily = data || [];
            const metricsDaily = daily.reduce((acc, row) => {
              const date = row.metric_date;
              acc[date] = {
                visits: row.visits || 0,
                clicks: row.clicks || 0,
                attentions: row.attentions || 0,
                events: row.events || 0,
              };
              return acc;
            }, {});
            const totalVisits = daily.reduce((s, r) => s + (r.visits || 0), 0);
            const totalClicks = daily.reduce((s, r) => s + (r.clicks || 0), 0);
            const totalAttentions = daily.reduce(
              (s, r) => s + (r.attentions || 0),
              0
            );
            const totalEvents = daily.reduce((s, r) => s + (r.events || 0), 0);

            mergeData({
              metrics: {
                daily: metricsDaily,
                overview: {
                  totalVisits,
                  totalClicks,
                  totalAttentions,
                  totalEvents,
                  lastUpdated: new Date().toISOString(),
                },
              },
            });
            setLoading(false);
          })
          .catch((e) => setError(e.message || 'Failed to load daily metrics'));

        // 2) Link performance
        supabase
          .from('analytics_link_performance')
          .select('link_name, clicks, last_clicked')
          .eq('tenant_username', tenant)
          .then(({ data, error }) => {
            if (error) throw error;
            const links = data || [];
            const metricsLinkPerf = links.reduce((acc, r) => {
              acc[r.link_name] = {
                clicks: r.clicks || 0,
                lastClicked: r.last_clicked || null,
              };
              return acc;
            }, {});
            mergeData({
              metrics: { performance: { linkPerformance: metricsLinkPerf } },
            });
          })
          .catch((e) =>
            setError(e.message || 'Failed to load link performance')
          );

        // 4) Referrers (view)
        supabase
          .from('analytics_referrers')
          .select('referrer, unique_visitors, visits')
          .eq('tenant_username', tenant)
          .then(({ data, error }) => {
            if (error) throw error;
            const referrers = data || [];
            const selfHost =
              typeof window !== 'undefined'
                ? window.location.hostname.replace(/^www\./, '')
                : null;
            const normalizeRef = (ref) => {
              if (!ref) return 'Direct';
              try {
                const u = new URL(ref);
                return (u.hostname || 'Direct').replace(/^www\./, '');
              } catch (_) {
                return (
                  ref
                    .replace(/^https?:\/\//, '')
                    .replace(/\/$/, '')
                    .replace(/^www\./, '') || 'Direct'
                );
              }
            };
            const metricsReferrers = referrers.reduce((acc, r) => {
              let key = normalizeRef(r.referrer);
              if (!key || (selfHost && key.includes(selfHost))) key = 'Direct';
              if (!acc[key])
                acc[key] = { referrer: key, unique_visitors: 0, visits: 0 };
              acc[key].unique_visitors += r.unique_visitors || 0;
              acc[key].visits += r.visits || 0;
              return acc;
            }, {});
            mergeData({ metrics: { referrers: metricsReferrers } });
          })
          .catch((e) => setError(e.message || 'Failed to load referrers'));

        // 5) Device distribution (view)
        supabase
          .from('analytics_device_distribution')
          .select('device_type, session_count')
          .eq('tenant_username', tenant)
          .then(({ data, error }) => {
            if (error) throw error;
            const deviceDist = data || [];
            const sessionsByDevice = deviceDist.reduce((acc, row) => {
              const deviceType = (row.device_type || 'unknown').toLowerCase();
              if (!acc[deviceType]) acc[deviceType] = {};
              const count = Number(row.session_count) || 0;
              for (let i = 0; i < count; i++)
                acc[deviceType][`${deviceType}_${i}`] = true;
              return acc;
            }, {});
            mergeData({ indices: { sessionsByDevice } });
          })
          .catch((e) =>
            setError(e.message || 'Failed to load device distribution')
          );

        // 6) Geo cities (view) – all-time aggregates
        supabase
          .from('analytics_geo_cities')
          .select(
            'country_code, region, city, coordinates, postal, timezone, isp, asn, currency, calling_code, sessions, visits, first_seen, last_updated'
          )
          .eq('tenant_username', tenant)
          .then(({ data, error }) => {
            if (error) throw error;
            const geoCities = data || [];
            const locations = geoCities.reduce((acc, g) => {
              const key = `${g.country_code || 'XX'}_${g.region || 'Unknown'}_${g.city || 'Unknown'}`;
              acc[key] = {
                city: g.city || 'Unknown',
                country: g.country_code || 'XX',
                countryName: g.country_code || 'Unknown',
                region: g.region || 'Unknown',
                regionCode: g.region || 'XX',
                postal: g.postal || 'Unknown',
                timezone: g.timezone || 'Unknown',
                isp: g.isp || 'Unknown',
                asn: g.asn || 'Unknown',
                currency: g.currency || 'Unknown',
                languages: 'Unknown',
                callingCode: g.calling_code || 'Unknown',
                coordinates: g.coordinates || null,
                lastUpdated: g.last_updated || null,
                firstSeen: g.first_seen || null,
                totalVisits: g.visits || 0,
                totalSessions: g.sessions || 0,
              };
              return acc;
            }, {});
            mergeData({ locations });
          })
          .catch((e) => setError(e.message || 'Failed to load geo data'));

        // 6b) Geo countries (view) – all-time aggregates used by map/globe
        supabase
          .from('analytics_geo_countries')
          .select('country_code, country_name, sessions, visits')
          .eq('tenant_username', tenant)
          .then(({ data, error }) => {
            if (error) throw error;
            const rows = data || [];
            const countries = rows.reduce((acc, r) => {
              const code = r.country_code || 'XX';
              acc[code] = {
                countryCode: code,
                countryName: r.country_name || code,
                sessions: r.sessions || 0,
                visits: r.visits || 0,
              };
              return acc;
            }, {});
            mergeData({ countries });
          })
          .catch((e) => setError(e.message || 'Failed to load geo countries'));

        // 7) Heatmap (last 30 days)
        supabase
          .from('analytics_heatmap_events')
          .select('event_type, position, device_type, viewport, created_at')
          .eq('tenant_username', tenant)
          .gte(
            'created_at',
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          )
          .then(({ data, error }) => {
            if (error) throw error;
            const heatmap = data || [];
            const heatmapByDevice = heatmap.reduce(
              (acc, h) => {
                const device = (h.device_type || 'unknown').toLowerCase();
                const entry = {
                  type: h.event_type,
                  position: h.position,
                  deviceType: device,
                  viewport: h.viewport,
                  timestamp: h.created_at,
                };
                if (!acc[device]) acc[device] = [];
                acc[device].push(entry);
                return acc;
              },
              { desktop: [], mobile: [], tablet: [], unknown: [] }
            );
            mergeData({ heatmap: heatmapByDevice });
          })
          .catch((e) => setError(e.message || 'Failed to load heatmap'));

        // 8) Click events (trend)
        supabase
          .from('analytics_events')
          .select('created_at, properties')
          .eq('tenant_username', tenant)
          .eq('type', 'click')
          .gte('created_at', startISO)
          .then(({ data, error }) => {
            if (error) throw error;
            const rows = data || [];
            const buttonClicks = {};
            rows.forEach((row) => {
              const linkName =
                row.properties?.linkName || row.properties?.link_name;
              if (!linkName) return;
              const date = new Date(row.created_at).toISOString().slice(0, 10);
              if (!buttonClicks[linkName]) buttonClicks[linkName] = {};
              if (!buttonClicks[linkName][date])
                buttonClicks[linkName][date] = { count: 0 };
              buttonClicks[linkName][date].count += 1;
            });
            mergeData({ metrics: { engagement: { buttonClicks } } });
          })
          .catch((e) => setError(e.message || 'Failed to load click events'));

        // 9) Visit events (trend for chart)
        supabase
          .from('analytics_events')
          .select('created_at')
          .eq('tenant_username', tenant)
          .eq('type', 'visit')
          .gte('created_at', startISO)
          .then(({ data, error }) => {
            if (error) throw error;
            const rows = data || [];
            const visitTrendDaily = {};
            rows.forEach((row) => {
              const date = new Date(row.created_at).toISOString().slice(0, 10);
              if (!visitTrendDaily[date]) visitTrendDaily[date] = { count: 0 };
              visitTrendDaily[date].count += 1;
            });
            mergeData({ metrics: { engagement: { visitTrendDaily } } });
          })
          .catch((e) => setError(e.message || 'Failed to load visit events'));

        // 10) Attention events (trend for chart)
        supabase
          .from('analytics_events')
          .select('created_at')
          .eq('tenant_username', tenant)
          .eq('type', 'attention')
          .gte('created_at', startISO)
          .then(({ data, error }) => {
            if (error) throw error;
            const rows = data || [];
            const attentionTrendDaily = {};
            rows.forEach((row) => {
              const date = new Date(row.created_at).toISOString().slice(0, 10);
              if (!attentionTrendDaily[date])
                attentionTrendDaily[date] = { count: 0 };
              attentionTrendDaily[date].count += 1;
            });
            mergeData({ metrics: { engagement: { attentionTrendDaily } } });
          })
          .catch((e) =>
            setError(e.message || 'Failed to load attention events')
          );

        // 11) Analytics visitors (for unique visitor count and daily breakdown)
        supabase
          .from('analytics_visitors')
          .select('visitor_cookie_id, first_seen_at, device_type')
          .eq('tenant_username', tenant)
          .gte('first_seen_at', startISO)
          .then(({ data, error }) => {
            if (error) throw error;
            const visitors = data || [];

            // Create visitors object keyed by visitor_cookie_id
            const visitorsMap = {};
            const dailyUniqueVisitors = {};

            visitors.forEach((visitor) => {
              visitorsMap[visitor.visitor_cookie_id] = {
                firstSeenAt: visitor.first_seen_at,
                deviceType: visitor.device_type,
              };

              // Count unique visitors per day based on first_seen_at
              const date = new Date(visitor.first_seen_at)
                .toISOString()
                .slice(0, 10);
              if (!dailyUniqueVisitors[date]) {
                dailyUniqueVisitors[date] = { count: 0 };
              }
              dailyUniqueVisitors[date].count += 1;
            });

            mergeData({
              visitors: visitorsMap,
              metrics: {
                overview: {
                  totalUniqueVisitors: visitors.length,
                },
                engagement: {
                  dailyUniqueVisitors,
                },
              },
            });
          })
          .catch((e) => setError(e.message || 'Failed to load visitors data'));

        // 12) Card events (for card performance analytics)
        supabase
          .from('analytics_events')
          .select('type, card_id, card_title, created_at')
          .eq('tenant_username', tenant)
          .not('card_id', 'is', null) // Only events with card_id
          .in('type', ['click', 'attention', 'hover'])
          .gte('created_at', startISO)
          .then(({ data, error }) => {
            if (error) throw error;
            const cardEvents = data || [];

            // Aggregate card events by card and date
            const cardTrendDaily = {};

            cardEvents.forEach((event) => {
              const date = new Date(event.created_at)
                .toISOString()
                .slice(0, 10);
              const cardKey = `${event.card_id}::${event.card_title || event.card_id}`;

              if (!cardTrendDaily[cardKey]) {
                cardTrendDaily[cardKey] = {};
              }
              if (!cardTrendDaily[cardKey][date]) {
                cardTrendDaily[cardKey][date] = {
                  clicks: 0,
                  attentions: 0,
                  hovers: 0,
                };
              }

              if (event.type === 'click') {
                cardTrendDaily[cardKey][date].clicks += 1;
              } else if (event.type === 'attention') {
                cardTrendDaily[cardKey][date].attentions += 1;
              } else if (event.type === 'hover') {
                cardTrendDaily[cardKey][date].hovers += 1;
              }
            });

            mergeData({
              metrics: {
                engagement: {
                  cardTrendDaily,
                },
              },
            });
          })
          .catch((e) => setError(e.message || 'Failed to load card events'));
      } catch (e) {
        console.error('AnalyticsContext load error', e);
        setError(e.message || 'Failed to load analytics');
        // keep any partial data already merged
      } finally {
        // loading is cleared when daily metrics finish; keep as-is here
      }
    }
    load();
  }, [user?.username]);

  return (
    <AnalyticsContext.Provider value={{ analyticsData, loading, error }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  return useContext(AnalyticsContext);
}
