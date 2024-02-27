'use client';

import { trackAttention } from './trackAttention';

let attentionTimer = null;
let visibilityTimer = null;
let isPageVisible = true;
let totalTimeSpent = 0;
let sessionStartTime = Date.now();

/**
 * Enhanced attention tracking with multiple triggers:
 * - Periodic intervals (every 15s when page is visible)
 * - Visibility change events
 * - Focus/blur events
 * - Intersection observer for card-specific attention
 */
export function startAttentionTracking(tenant) {
  if (!tenant || typeof window === 'undefined') return { stop: () => {} };

  // Track page visibility
  const handleVisibilityChange = () => {
    if (document.hidden) {
      isPageVisible = false;
      if (attentionTimer) {
        clearInterval(attentionTimer);
        attentionTimer = null;
      }
      // Track attention when user leaves the page
      const timeSpent = Date.now() - sessionStartTime;
      if (timeSpent > 5000) {
        // Only if spent more than 5 seconds
        trackAttention(tenant, {
          trigger: 'visibility_change',
          timeSpent: Math.round(timeSpent / 1000),
          isLeaving: true,
        });
      }
    } else {
      isPageVisible = true;
      sessionStartTime = Date.now(); // Reset timer when page becomes visible
      startPeriodicTracking();
    }
  };

  // Track window focus/blur
  const handleFocus = () => {
    isPageVisible = true;
    sessionStartTime = Date.now();
    startPeriodicTracking();
  };

  const handleBlur = () => {
    isPageVisible = false;
    if (attentionTimer) {
      clearInterval(attentionTimer);
      attentionTimer = null;
    }
  };

  // Periodic attention tracking (every 15 seconds when visible)
  const startPeriodicTracking = () => {
    if (attentionTimer) clearInterval(attentionTimer);

    attentionTimer = setInterval(() => {
      if (isPageVisible) {
        totalTimeSpent += 15;
        trackAttention(tenant, {
          trigger: 'periodic',
          intervalSeconds: 15,
          totalTimeSpent,
          timestamp: new Date().toISOString(),
        });
      }
    }, 15000); // 15 seconds
  };

  // Card-specific attention tracking using Intersection Observer
  const setupCardObserver = () => {
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardElement = entry.target;
          const cardId = cardElement.getAttribute('data-card-id');
          const cardTitle = cardElement
            .querySelector('h3')
            ?.textContent?.trim();

          if (entry.isIntersecting && cardId) {
            // Card came into view
            cardElement._attentionStartTime = Date.now();
          } else if (
            !entry.isIntersecting &&
            cardId &&
            cardElement._attentionStartTime
          ) {
            // Card left view - track attention time
            const timeSpent = Date.now() - cardElement._attentionStartTime;
            if (timeSpent > 2000) {
              // Only track if viewed for more than 2 seconds
              trackAttention(tenant, {
                trigger: 'card_view',
                cardId,
                cardTitle,
                timeSpent: Math.round(timeSpent / 1000),
                viewType: 'intersection',
              });
            }
            delete cardElement._attentionStartTime;
          }
        });
      },
      {
        threshold: 0.5, // Card is considered "viewed" when 50% visible
        rootMargin: '0px 0px -50px 0px', // Slight buffer from bottom
      }
    );

    // Observe all existing cards
    const observeCards = () => {
      document.querySelectorAll('[data-card-id]').forEach((card) => {
        observer.observe(card);
      });
    };

    // Initial observation
    observeCards();

    // Re-observe when new cards are added (for dynamic content)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              // Element node
              if (node.hasAttribute?.('data-card-id')) {
                observer.observe(node);
              } else {
                // Check child elements
                node.querySelectorAll?.('[data-card-id]').forEach((card) => {
                  observer.observe(card);
                });
              }
            }
          });
        }
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  };

  // Set up all tracking
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('focus', handleFocus);
  window.addEventListener('blur', handleBlur);

  // Start periodic tracking if page is initially visible
  if (!document.hidden) {
    startPeriodicTracking();
  }

  const cleanupCardObserver = setupCardObserver();

  // Track initial page attention
  trackAttention(tenant, {
    trigger: 'session_start',
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    referrer: document.referrer || null,
  });

  return {
    stop: () => {
      if (attentionTimer) clearInterval(attentionTimer);
      if (visibilityTimer) clearTimeout(visibilityTimer);

      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);

      if (cleanupCardObserver) cleanupCardObserver();

      // Final attention tracking when stopping
      const finalTimeSpent = Date.now() - sessionStartTime;
      if (finalTimeSpent > 3000) {
        trackAttention(tenant, {
          trigger: 'session_end',
          timeSpent: Math.round(finalTimeSpent / 1000),
          totalTimeSpent: totalTimeSpent + Math.round(finalTimeSpent / 1000),
        });
      }
    },
  };
}

/**
 * Track attention for a specific card manually
 */
export function trackCardAttention(tenant, cardElement, duration = 0) {
  if (!cardElement || !tenant) return;

  const cardId = cardElement.getAttribute('data-card-id');
  const cardTitle = cardElement.querySelector('h3')?.textContent?.trim();

  if (cardId) {
    trackAttention(tenant, {
      trigger: 'manual_card_attention',
      cardId,
      cardTitle,
      timeSpent: duration,
      timestamp: new Date().toISOString(),
    });
  }
}
