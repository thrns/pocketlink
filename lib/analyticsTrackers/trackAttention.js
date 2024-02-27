'use client';

import { supabase } from '@/Clients/supabase/client';

export async function trackAttention(tenant, payload = {}) {
  if (!tenant || typeof window === 'undefined') return;
  const today = new Date().toISOString().slice(0, 10);
  // daily read-modify-write
  let daily = { attentions: 0, events: 0 };
  try {
    const sel = await supabase
      .from('analytics_daily_metrics')
      .select('attentions, events')
      .eq('tenant_username', tenant)
      .eq('metric_date', today)
      .maybeSingle();
    if (!sel.error && sel.data) daily = sel.data;
  } catch (_) {}
  await supabase.from('analytics_daily_metrics').upsert(
    {
      tenant_username: tenant,
      metric_date: today,
      attentions: (daily.attentions || 0) + 1,
      events: (daily.events || 0) + 1,
      last_updated: new Date().toISOString(),
    },
    { onConflict: 'tenant_username,metric_date' }
  );

  // optional attention event for timeline
  try {
    const visitorId = sessionStorage.getItem('pl_visitor_row_id');
    const sessionId = sessionStorage.getItem('pl_session_row_id');

    // Extract card information from payload
    const cardId = payload?.cardId || payload?.card?.id || null;
    const cardTitle = payload?.cardTitle || payload?.card?.title || null;

    await supabase.from('analytics_events').insert({
      tenant_username: tenant,
      session_id: sessionId || null,
      visitor_id: visitorId || null,
      type: 'attention',
      name: 'time_spent',
      card_id: cardId,
      card_title: cardTitle,
      properties: payload,
    });
  } catch (_) {}
}
