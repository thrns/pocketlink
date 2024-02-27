'use client';

import { supabase } from '@/Clients/supabase/client';

export async function trackButtonClick(e, tenant, labelOverride) {
  if (!tenant || typeof window === 'undefined') return;

  const parentDiv = e?.target?.closest?.('div');
  const h3Element = parentDiv?.querySelector?.('h3');
  const derived = h3Element ? h3Element.textContent.trim() : undefined;
  const linkName = (labelOverride || derived || 'unknown').slice(0, 120);

  // Read current clicks to increment safely (simple read-modify-write)
  let currentClicks = 0;
  try {
    const sel = await supabase
      .from('analytics_link_performance')
      .select('clicks')
      .eq('tenant_username', tenant)
      .eq('link_name', linkName)
      .maybeSingle();
    if (!sel.error && sel.data) currentClicks = sel.data.clicks || 0;
  } catch (_) {}

  const nextClicks = currentClicks + 1;

  // link performance (upsert with cumulative clicks)
  await supabase.from('analytics_link_performance').upsert(
    {
      tenant_username: tenant,
      link_name: linkName,
      clicks: nextClicks,
      last_clicked: new Date().toISOString(),
    },
    { onConflict: 'tenant_username,link_name' }
  );

  // daily metrics
  const metricDate = new Date().toISOString().slice(0, 10);
  // read-modify-write to increment daily counters
  let daily = { clicks: 0, events: 0 };
  try {
    const sel = await supabase
      .from('analytics_daily_metrics')
      .select('clicks, events')
      .eq('tenant_username', tenant)
      .eq('metric_date', metricDate)
      .maybeSingle();
    if (!sel.error && sel.data) daily = sel.data;
  } catch (_) {}
  await supabase.from('analytics_daily_metrics').upsert(
    {
      tenant_username: tenant,
      metric_date: metricDate,
      clicks: (daily.clicks || 0) + 1,
      events: (daily.events || 0) + 1,
      last_updated: new Date().toISOString(),
    },
    { onConflict: 'tenant_username,metric_date' }
  );

  // Insert analytics_events row with card information
  try {
    const visitorId = sessionStorage.getItem('pl_visitor_row_id');
    const sessionId = sessionStorage.getItem('pl_session_row_id');

    // Get card information from the event target
    const cardElement = e?.target?.closest?.('[data-card-id]');
    const cardId = cardElement?.getAttribute?.('data-card-id') || null;
    const cardTitle = labelOverride || derived || 'unknown';

    await supabase.from('analytics_events').insert({
      tenant_username: tenant,
      session_id: sessionId || null,
      visitor_id: visitorId || null,
      type: 'click',
      name: linkName,
      card_id: cardId,
      card_title: cardId ? cardTitle : null, // Only set card_title if we have a card_id
      properties: { linkName },
    });
  } catch (_) {}
}
