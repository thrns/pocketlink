'use client';

import { useEffect } from 'react';
import { attachHeatmapListeners } from '@/lib/analyticsTrackers/heatmap';

export default function HeatmapInitializer({ username }) {
  useEffect(() => {
    if (!username || typeof window === 'undefined') return;
    attachHeatmapListeners(username);
    return () => {};
  }, [username]);

  return null;
}
