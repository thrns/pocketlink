'use client';

import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import dynamic from 'next/dynamic';
import { isMobile as isPhone } from 'react-device-detect';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from 'react-intersection-observer';
import { Suspense, lazy } from 'react';
import { startTenantAnalytics } from '@/lib/analyticsTrackers/startTenantAnalytics';
import { attachScrollDepth } from '@/lib/analyticsTrackers/trackScrollDepth';
import { supabase } from '@/Clients/supabase/client';
import { Button } from '@/components/ui/button';
import { Lock, Crown } from 'lucide-react';
import { useTenantSubscription } from '@/app/contexts/TenantSubscriptionContext';

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

// Internal component that uses the subscription context
function ResponsiveGridClientInternal({
  id,
  items,
  tenantTheme,
  mobileItems,
  username,
  hardDeviceType,
}) {
  const { hasSubscription } = useTenantSubscription();
  // ================== STATES ================== //
  const containerRef = useRef(null);
  const parentId = id?.[0] || null;
  
  // Subscription protection states
  const [subscriptionCheck, setSubscriptionCheck] = useState({
    loading: false,
    hasAccess: null,
    requiresSubscription: false,
    subscriptionName: '',
  });

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

  // Check subscription access for nested cards
  const checkNestedCardAccess = useCallback(async () => {
    if (!parentId || !username) return;

    setSubscriptionCheck(prev => ({ ...prev, loading: true }));

    try {
      // Find the parent card in items
      const allItems = isMobile ? mobileItems : items;
      const parentCard = allItems?.find(item => item.i === parentId);
      
      if (!parentCard?.requiresSubscription || !parentCard?.subscriptionId) {
        setSubscriptionCheck({
          loading: false,
          hasAccess: true,
          requiresSubscription: false,
          subscriptionName: '',
        });
        return;
      }

      // Get subscription data to check access
      const { data: subscriptionData, error } = await supabase
        .from('subscriptions')
        .select('subscribed, subscription_name')
        .eq('uuid', parentCard.subscriptionId)
        .eq('username', username)
        .single();

      if (error || !subscriptionData) {
        console.error('Error checking subscription:', error);
        setSubscriptionCheck({
          loading: false,
          hasAccess: false,
          requiresSubscription: true,
          subscriptionName: 'Unknown Subscription',
        });
        return;
      }

      // Check user access using the same logic as NestedCard
      const subscribedUsers = subscriptionData.subscribed || [];
      
      // Check multiple sources for user identification
      let userEmails = [];
      
      // 1. Check localStorage for subscriber email (from previous subscriptions)
      const storedEmail = localStorage.getItem('subscriber_email');
      if (storedEmail) userEmails.push(storedEmail.toLowerCase());
      
      // 2. Check localStorage for tenant-specific subscription
      const tenantSubscriptionKey = `subscription_${username}_${parentCard.subscriptionId}`;
      const tenantSubscription = localStorage.getItem(tenantSubscriptionKey);
      if (tenantSubscription) {
        try {
          const subscriptionInfo = JSON.parse(tenantSubscription);
          if (subscriptionInfo.email) {
            userEmails.push(subscriptionInfo.email.toLowerCase());
          }
        } catch (e) {
          console.warn('Failed to parse tenant subscription data');
        }
      }
      
      // Remove duplicates
      userEmails = [...new Set(userEmails)];
      
      // Check if user has subscription access via multiple methods
      const checkoutEmail = typeof window !== 'undefined' ? sessionStorage.getItem('checkout_user_email') : null;
      
      // Debug logging
      console.log('Subscription access check:', {
        parentCardId: parentCard.subscriptionId,
        tenantUsername: username,
        userEmails,
        checkoutEmail,
        subscribedUsersCount: subscribedUsers.length,
        tenantSubscriptionKey,
        hasStoredSubscription: !!tenantSubscription
      });
      
      const hasAccess = subscribedUsers.some(subscriber => {
        // Method 1: Check by user ID using same checkout logic
        if (checkoutEmail) {
          const expectedUserId = `user_${checkoutEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
          if (subscriber.user_id && subscriber.user_id === expectedUserId) {
            console.log('Access granted via user_id match:', expectedUserId);
            return true;
          }
        }
        
        // Method 2: Check by email matching (fallback for older subscriptions)
        if (userEmails.includes(subscriber.email?.toLowerCase())) {
          console.log('Access granted via email match:', subscriber.email);
          return true;
        }
        
        return false;
      });
      
      console.log('Final access result:', hasAccess);

      setSubscriptionCheck({
        loading: false,
        hasAccess,
        requiresSubscription: true,
        subscriptionName: subscriptionData.subscription_name || 'Subscription Required',
      });

    } catch (error) {
      console.error('Error checking nested card access:', error);
      setSubscriptionCheck({
        loading: false,
        hasAccess: false,
        requiresSubscription: true,
        subscriptionName: 'Subscription Required',
      });
    }
  }, [parentId, username, isMobile, items, mobileItems]);

  // Check access when parentId changes
  useEffect(() => {
    if (parentId) {
      checkNestedCardAccess();
    } else {
      setSubscriptionCheck({
        loading: false,
        hasAccess: true,
        requiresSubscription: false,
        subscriptionName: '',
      });
    }
  }, [parentId, checkNestedCardAccess]);

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

  // Memoize filtered items with simple subscription check using context
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

        // Don't filter nested cards here - let the NestedCard component handle subscription logic
        // All nested cards should render, they'll show subscribe overlay if needed

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
  }, [isMobile, items, mobileItems, parentId, itemsInCarousels, hasSubscription]);

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

  const onLayoutChange = useCallback(() => {
    // Processing here if needed
  }, []);

  // ================== SUBSCRIPTION PROTECTION ================== //
  // Show loading state while checking subscription
  if (parentId && subscriptionCheck.loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent"></div>
          <p className="text-gray-600">Checking access permissions...</p>
        </div>
      </div>
    );
  }

  // Show subscription required page if no access
  if (parentId && subscriptionCheck.requiresSubscription && subscriptionCheck.hasAccess === false) {
    return (
      <div className="flex h-96 w-full items-center justify-center p-8">
        <div className="flex max-w-md flex-col items-center gap-6 text-center">
          <div className="rounded-full bg-purple-600 p-6">
            <Lock className="h-12 w-12 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold" style={{ color: tenantTheme?.textMode === 'dark' ? 'black' : 'white' }}>
              Subscription Required
            </h2>
            <p className="text-gray-500">
              This content is exclusively available to subscribers of "{subscriptionCheck.subscriptionName}".
            </p>
          </div>
          <Button
            onClick={() => {
              const subscribeUrl = `/${username}?subscribe=true`;
              window.location.href = subscribeUrl;
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Crown className="h-4 w-4 mr-2" />
            Subscribe to Access
          </Button>
          <p className="text-xs text-gray-400">
            Already subscribed? Make sure you're using the same email address.
          </p>
        </div>
      </div>
    );
  }

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

// Export the internal component directly since provider is now at page level
export default ResponsiveGridClientInternal;

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
