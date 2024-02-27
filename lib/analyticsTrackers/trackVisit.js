'use client';

import { supabase } from '@/Clients/supabase/client';

const lastVisitKey = (tenant) => `pl_last_visit_${tenant}`;

export async function trackVisit({ tenant, referrer }) {
  if (!tenant || typeof window === 'undefined') return;

  const today = new Date().toISOString().slice(0, 10);

  // Daily metrics (read-modify-write)
  let daily = {
    visits: 0,
    events: 0,
  };
  try {
    const sel = await supabase
      .from('analytics_daily_metrics')
      .select('visits, events')
      .eq('tenant_username', tenant)
      .eq('metric_date', today)
      .maybeSingle();
    if (!sel.error && sel.data) daily = sel.data;
  } catch (_) {}
  await supabase.from('analytics_daily_metrics').upsert(
    {
      tenant_username: tenant,
      metric_date: today,
      visits: (daily.visits || 0) + 1,
      events: (daily.events || 0) + 1,
      last_updated: new Date().toISOString(),
    },
    { onConflict: 'tenant_username,metric_date' }
  );

  // Referrers are derived from sessions via materialized views

  // Insert visit event (for timeline)
  try {
    const visitorId = sessionStorage.getItem('pl_visitor_row_id');
    const sessionId = sessionStorage.getItem('pl_session_row_id');
    await supabase.from('analytics_events').insert({
      tenant_username: tenant,
      type: 'visit',
      name: 'page_view',
      properties: { pageUrl: window.location?.href },
      visitor_id: visitorId || null,
      session_id: sessionId || null,
    });
  } catch (_) {}
}
