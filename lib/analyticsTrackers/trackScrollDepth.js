'use client';

import { supabase } from '@/Clients/supabase/client';

const milestones = [25, 50, 75, 100];

export function attachScrollDepth(tenant) {
  if (!tenant || typeof window === 'undefined') return () => {};
  let last = 0;
  const handler = async () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const pct = Math.min(
      Math.round((scrollTop / Math.max(1, scrollHeight - clientHeight)) * 100),
      100
    );
    const hit = milestones.find((m) => pct >= m && last < m);
    if (!hit) return;
    last = hit;
    try {
      const visitorId = sessionStorage.getItem('pl_visitor_row_id');
      const sessionId = sessionStorage.getItem('pl_session_row_id');

      await supabase.from('analytics_events').insert({
        tenant_username: tenant,
        session_id: sessionId || null,
        visitor_id: visitorId || null,
        type: 'scroll',
        name: 'milestone',
        properties: { milestone: hit, scrollTop },
      });
    } catch (_) {}
  };
  window.addEventListener('scroll', handler);
  return () => window.removeEventListener('scroll', handler);
}
