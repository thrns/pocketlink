'use client';

import { useEffect } from 'react';
import { startTenantAnalytics } from '@/lib/analyticsTrackers/startTenantAnalytics';
import Cookies from 'js-cookie';

export default function AnalyticsInitializer({ tenant, options = {} }) {
  useEffect(() => {
    if (!tenant) return;
    // ensure visitor cookie on client
    if (!Cookies.get('pl_visitor_id')) {
      Cookies.set('pl_visitor_id', `v_${Math.random().toString(36).slice(2)}`, {
        expires: 365 * 2,
        sameSite: 'Lax',
        path: '/',
      });
    }
    startTenantAnalytics({ tenant });
  }, [tenant]);

  return null;
}
