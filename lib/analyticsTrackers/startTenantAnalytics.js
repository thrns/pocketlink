'use client';

import Cookies from 'js-cookie';
import { supabase } from '@/Clients/supabase/client';
import { getGeoOnce } from './utils/location';
import { getDeviceInfo, getTenantFromHost, isTenantHost } from './utils/device';
import { trackVisit } from './trackVisit';
import {
  attachHeatmapListeners,
  startHeatmapFlush,
  stopHeatmap,
} from './heatmap';
import { startAttentionTracking } from './trackAttentionEnhanced';

const VISITOR_COOKIE = 'pl_visitor_id';

export function getOrCreateVisitorCookie() {
  let id = Cookies.get(VISITOR_COOKIE);
  if (!id) {
    id = `v_${Math.random().toString(36).slice(2)}`;
    Cookies.set(VISITOR_COOKIE, id, {
      expires: 365 * 2,
      sameSite: 'Lax',
      path: '/',
    });
  }
  return id;
}

export async function startTenantAnalytics({ tenant }) {
  if (typeof window === 'undefined' || !tenant) return { stop: () => {} };
  if (!isTenantHost(tenant)) return { stop: () => {} };

  const visitorId = getOrCreateVisitorCookie();
  const device = getDeviceInfo();
  const geo = await getGeoOnce();
  const isNewSession = !sessionStorage.getItem('pl_session_started');
  if (isNewSession) sessionStorage.setItem('pl_session_started', '1');

  // Upsert visitor record (per tenant + cookie)
  let visitorRowId = null;
  try {
    await supabase.from('analytics_visitors').upsert(
      {
        tenant_username: tenant,
        visitor_cookie_id: visitorId,
        device_type: device.type,
        user_agent: device.userAgent,
        last_seen_at: new Date().toISOString(),
      },
      { onConflict: 'tenant_username,visitor_cookie_id' }
    );
    const { data } = await supabase
      .from('analytics_visitors')
      .select('id')
      .eq('tenant_username', tenant)
      .eq('visitor_cookie_id', visitorId)
      .maybeSingle();
    visitorRowId = data?.id || null;
    if (visitorRowId) sessionStorage.setItem('pl_visitor_row_id', visitorRowId);
  } catch (e) {}

  // Geo aggregates now derived from sessions via materialized views

  // Create analytics session row (for event foreign key)
  let sessionRowId = null;
  try {
    const ins = await supabase
      .from('analytics_sessions')
      .insert({
        tenant_username: tenant,
        visitor_id: visitorRowId,
        session_id_cookie: `${visitorId}_${Date.now()}`,
        started_at: new Date().toISOString(),
        url: window.location?.href || null,
        referrer: document.referrer || null,
        device,
        location: geo || null,
        is_new_visitor: !localStorage.getItem('pl_visitor_first_seen'),
        is_new_session: isNewSession,
      })
      .select('id')
      .single();
    sessionRowId = ins?.data?.id || null;
    if (sessionRowId) sessionStorage.setItem('pl_session_row_id', sessionRowId);
  } catch (e) {}

  // Track visit (increments daily + referrer)
  await trackVisit({ tenant, referrer: document.referrer || null });

  // Referrer aggregates now derived from sessions via materialized views

  // Heatmap
  attachHeatmapListeners(tenant);
  const flushHandle = startHeatmapFlush(tenant);

  // Enhanced attention tracking
  const attentionTracking = startAttentionTracking(tenant);

  return {
    stop: () => {
      stopHeatmap();
      if (flushHandle) clearInterval(flushHandle);
      attentionTracking.stop();
    },
  };
}
