'use client';

import { supabase } from '@/Clients/supabase/client';

const storageKey = (tenant) => `pl_hm:${tenant}`;
let clickListener = null;
let moveListener = null;
let scrollListener = null;
let flushTimer = null;

function getQueue(tenant) {
  try {
    const raw = localStorage.getItem(storageKey(tenant));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setQueue(tenant, arr) {
  try {
    localStorage.setItem(storageKey(tenant), JSON.stringify(arr));
  } catch {}
}

export function attachHeatmapListeners(tenant) {
  if (!tenant || typeof window === 'undefined') return;
  const push = (entry) => {
    const q = getQueue(tenant);
    q.push({
      ...entry,
      timestamp: new Date().toISOString(),
      viewport: { width: window.innerWidth, height: window.innerHeight },
    });
    setQueue(tenant, q);
  };

  clickListener = (e) => {
    const x = e.clientX,
      y = e.clientY;
    push({
      type: 'click',
      position: {
        x: (x / window.innerWidth) * 100,
        y: (y / window.innerHeight) * 100,
        absoluteX: x,
        absoluteY: y,
      },
    });
  };
  let hoverTimeout;
  moveListener = (e) => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      // Check if hovering over a card element
      const cardElement = e.target.closest('[data-card-id]');
      const cardId = cardElement?.getAttribute('data-card-id') || null;
      const cardTitle =
        cardElement?.querySelector('h3')?.textContent?.trim() || null;

      push({
        type: 'hover',
        position: {
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        },
        cardId,
        cardTitle,
      });
    }, 300);
  };

  // Add scroll tracking with debounce
  let scrollTimeout;
  scrollListener = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollY = window.scrollY || window.pageYOffset;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const windowHeight = window.innerHeight;
      const scrollPercent = Math.min(
        100,
        Math.round(((scrollY + windowHeight) / documentHeight) * 100)
      );

      push({
        type: 'scroll',
        position: {
          scrollY,
          scrollPercent,
          documentHeight,
          windowHeight,
        },
        scrollY,
        scrollPercent,
      });
    }, 250); // 250ms debounce
  };

  document.addEventListener('click', clickListener);
  document.addEventListener('mousemove', moveListener);
  document.addEventListener('scroll', scrollListener, { passive: true });
}

export function startHeatmapFlush(tenant) {
  if (!tenant || typeof window === 'undefined') return null;
  if (flushTimer) clearInterval(flushTimer);
  flushTimer = setInterval(() => flushHeatmap(tenant), 2500);
  return flushTimer;
}

export async function flushHeatmap(tenant) {
  const q = getQueue(tenant);
  if (!q.length) return;
  setQueue(tenant, []);

  try {
    const visitorId = sessionStorage.getItem('pl_visitor_row_id');
    const sessionId = sessionStorage.getItem('pl_session_row_id');

    const rows = q.map((e) => ({
      tenant_username: tenant,
      session_id: sessionId || null,
      visitor_id: visitorId || null,
      event_type: e.type,
      position: e.position,
      device_type: window.innerWidth <= 768 ? 'mobile' : 'desktop',
      viewport: e.viewport,
      properties: e.cardId
        ? {
            card_id: e.cardId,
            card_title: e.cardTitle,
            scroll_y: e.scrollY,
            scroll_percent: e.scrollPercent,
          }
        : null,
    }));

    await supabase.from('analytics_heatmap_events').insert(rows);
  } catch (_) {}
}

export function stopHeatmap() {
  if (clickListener) document.removeEventListener('click', clickListener);
  if (moveListener) document.removeEventListener('mousemove', moveListener);
  if (scrollListener) document.removeEventListener('scroll', scrollListener);
  if (flushTimer) clearInterval(flushTimer);
}
