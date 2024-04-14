'use client';

import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import dynamic from 'next/dynamic';
import { isMobile as isPhone } from 'react-device-detect';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from 'react-intersection-observer';
import { Suspense, lazy } from 'react';
import { startTenantAnalytics } from '@/lib/analyticsTrackers/startTenantAnalytics';
import { attachScrollDepth } from '@/lib/analyticsTrackers/trackScrollDepth';

// Lazy load components
const TenantCard = lazy(() => import('./tenantCards/TenantCard'));
const MiscTenantCard = lazy(() => import('./tenantCards/MiscTenantCard'));

// Dynamically import react-grid-layout with loading component
const GridLayout = dynamic(() => import('react-grid-layout'), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-2 gap-6 p-4 md:grid-cols-4">
      {Array.from({ length: 8 }, (_, idx) => (
        <Skeleton key={idx} className="h-40 w-full rounded-lg" />
      ))}
    </div>
  ),
});

// Memoized card component
const MemoizedCard = memo(function Card({
  card,
  isMobile,
  username,
  items,
  mobileItems,
  tenantTheme,
}) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    rootMargin: '200px', // Load when within 200px of viewport
  });

  // Check if card is a carousel or marquee to pass full items array
  const isCarouselOrMarquee =
    card.type === 'carouselCard' || card.type === 'marquee';

  // Find if this card has any parent relationships
  const findParentInfo = () => {
    if (!card.i) return null;

    const allItems = isMobile ? mobileItems : items;
    // Look for this card in marqueeItems arrays
    const marqueParent = allItems?.find(
      (item) => item.type === 'marquee' && item.marqueeItems?.includes(card.i)
    );

    // Look for this card in carouselItems arrays
    const carouselParent = allItems?.find(
      (item) =>
        item.type === 'carouselCard' && item.carouselItems?.includes(card.i)
    );

    return marqueParent || carouselParent;
  };

  const parentItem = findParentInfo();

  return (
    <div ref={ref} className="pointer-events-auto z-40 h-full">
      {inView ? (
        <Suspense fallback={<Skeleton className="h-full w-full rounded-lg" />}>
          {[
            'formCard',
            'shopCard',
            'calendarCard',
            'section title',
            'carouselCard',
            'testimonials',
            'marquee',
          ].includes(card.type) ? (
            <MiscTenantCard
              card={card}
              isMobile={isMobile}
              username={username}
              items={items}
              mobileItems={mobileItems}
              tenantTheme={tenantTheme}
              themeData={tenantTheme}
              parentId={card.parentId || (parentItem ? parentItem.i : null)}
            />
          ) : (
            <TenantCard
              card={card}
              isMobile={isMobile}
              mobileItems={mobileItems}
              tenantTheme={tenantTheme}
              username={username}
              items={items}
              themeData={tenantTheme}
            />
          )}
        </Suspense>
      ) : (
        <Skeleton className="h-full w-full rounded-lg" />
      )}
    </div>
  );
});

// Create a hook for throttled resize events
const useThrottledWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const resizeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);

      resizeTimeoutRef.current = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 200); // 200ms throttle
    };

    // Initial size
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, []);

  return size;
};

export default function ResponsiveGridClient({
  id,
  items,
  tenantTheme,
  mobileItems,
  username,
  hardDeviceType,
}) {
  // ================== STATES ================== //
  const containerRef = useRef(null);
  const parentId = id?.[0] || null;

  // Use throttled window size instead of direct resize listener
  const { width: windowWidth } = useThrottledWindowSize();
  const [parentWidth, setParentWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(isPhone);

  // Update parent width with throttling
  useEffect(() => {
    if (containerRef.current) {
      setParentWidth(containerRef.current.offsetWidth);
      setIsMobile(isPhone && containerRef.current.offsetWidth < 768);
    }
  }, [windowWidth, isPhone]);

  // ================== MEMOIZED FILTERS ================== //

  // Get all carousel items to filter them out - memoized
  const itemsInCarousels = useMemo(() => {
    const allItems = isMobile ? mobileItems : items;
    const carouselCards =
      allItems?.filter(
        (item) => item?.type === 'carouselCard' || item?.type === 'marquee'
      ) || [];
    const itemsInCarousel = [];

    carouselCards.forEach((carousel) => {
      // Check for carousel items
      if (carousel?.carouselItems && Array.isArray(carousel.carouselItems)) {
        itemsInCarousel.push(...carousel.carouselItems);
      }
      // Check for marquee items
      if (carousel?.marqueeItems && Array.isArray(carousel.marqueeItems)) {
        itemsInCarousel.push(...carousel.marqueeItems);
      }
    });

    return itemsInCarousel;
  }, [isMobile, items, mobileItems]);

  // Memoize filtered items to prevent unnecessary re-renders
  const displayedItems = useMemo(() => {
    const currentItems = isMobile ? mobileItems : items;

    return (
      currentItems?.filter((item) => {
        // Basic filtering logic
        const passesBasicFilter = parentId
          ? item.parentId === parentId && !itemsInCarousels.includes(item.i)
          : !item.parentId &&
            item.type !== 'pseudoUrlCard' &&
            item.type !== 'pseudoImageCard' &&
            !itemsInCarousels.includes(item.i);

        if (!passesBasicFilter) return false;

        // Filter based on hide settings
        if (item.hideOnMobile && isMobile) {
          return false; // Hide on mobile
        }

        if (item.hideOnDesktop && !isMobile) {
          return false; // Hide on desktop
        }

        return true;
      }) || []
    );
  }, [isMobile, items, mobileItems, parentId, itemsInCarousels]);

  // ================== DYNAMIC ROW HEIGHT CALCULATION ================== //
  const rowHeight = useMemo(() => {
    const isMobileView = hardDeviceType === 'mobile' || isMobile;

    if (!parentWidth) return 30; // fallback

    if (isMobileView) {
      // Mobile: More conservative dynamic height calculation
      const cols = 2;
      const margins = [10, 10];
      const totalMarginWidth = margins[0] * (cols - 1);
      const columnWidth = (parentWidth - totalMarginWidth) / cols;

      // Use a much smaller aspect ratio for mobile to keep cards compact
      const aspectRatio = 0.2; // Very small ratio to keep heights reasonable
      const calculatedHeight = columnWidth * aspectRatio;

      // Mobile constraints: minimum 25px, maximum 50px to stay compact
      return Math.min(Math.max(calculatedHeight, 25), 50);
    } else {
      // Desktop: use dynamic height to fix rectangle issue on large screens
      const cols = 12;
      const margins = [40, 40];
      const totalMarginWidth = margins[0] * (cols - 1);
      const columnWidth = (parentWidth - totalMarginWidth) / cols;

      // Use 0.8 aspect ratio for desktop to maintain good proportions
      const aspectRatio = 0.8;
      const calculatedHeight = columnWidth * aspectRatio;

      return Math.max(calculatedHeight, 30); // minimum 30px
    }
  }, [parentWidth, isMobile, hardDeviceType]);

  // ================== MEMOIZED LAYOUT PROPS ================== //
  const layoutProps = useMemo(
    () =>
      displayedItems.map((item, index) => ({
        i: item.i ? item.i.toString() : `item-${index}`,
        x: item.x ?? 0,
        y: item.y ?? 0,
        w: item.w ?? (isMobile ? 1 : 3),
        h: item.h ?? 1,
      })),
    [displayedItems, isMobile]
  );

  const onLayoutChange = useCallback((newLayout) => {
    // Processing here if needed
  }, []);

  // ================== LOADING SKELETON ================== //
  if (isMobile && (!mobileItems || mobileItems.length === 0)) {
    return (
      <div className="grid grid-cols-2 gap-4 p-4">
        {Array.from({ length: 8 }, (_, idx) => (
          <Skeleton key={idx} className="h-25 w-full rounded-lg" />
        ))}
      </div>
    );
  }
  if (!isMobile && (!items || items.length === 0)) {
    return (
      <div className="grid grid-cols-4 gap-4 p-4">
        {Array.from({ length: 8 }, (_, idx) => (
          <Skeleton key={idx} className="h-40 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  const hardIsMobile = hardDeviceType === 'mobile' ? true : isMobile;

  // Start analytics once on mount for this tenant
  useEffect(() => {
    if (!username) return;
    let stop = () => {};
    (async () => {
      const ctrl = await startTenantAnalytics({ tenant: username });
      stop = ctrl.stop || (() => {});
      // Attach scroll depth tracking
      const detachScroll = attachScrollDepth(username);
      stop = ((prev) => () => {
        try {
          prev();
        } catch (_) {}
        try {
          detachScroll && detachScroll();
        } catch (_) {}
      })(stop);
    })();
    return () => {
      try {
        stop();
      } catch (_) {}
    };
  }, [username]);

  // ================== JSX ================== //
  return (
    <div ref={containerRef} className={`layout h-full w-full`}>
      {parentWidth > 0 && (
        <GridLayout
          className="layout h-full w-full"
          layout={layoutProps}
          cols={hardIsMobile ? 2 : 12}
          rowHeight={rowHeight}
          isDraggable={false}
          isResizable={false}
          width={parentWidth}
          margin={hardIsMobile ? [10, 10] : [40, 40]}
          onLayoutChange={onLayoutChange}
          measureBeforeMount={true}
          useCSSTransforms={true}
          compactType="vertical"
          preventCollision={false}
        >
          {displayedItems.map((card) => (
            <div key={card.i}>
              <MemoizedCard
                card={card}
                isMobile={hardIsMobile}
                username={username}
                items={items}
                mobileItems={mobileItems}
                tenantTheme={tenantTheme}
              />
            </div>
          ))}
        </GridLayout>
      )}
    </div>
  );
}

// Add this hook to your project if it doesn't exist
// hooks/useWindowSize.js
/*
import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
*/
