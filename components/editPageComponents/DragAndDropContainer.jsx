'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useItems } from '@/app/contexts/ItemsContext';
import Card from './CardStuff/Card';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetch } from '@/app/contexts/FetcherContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useController } from '@/app/contexts/ControllerContext';
import { isMobile as isPhone } from 'react-device-detect';
import MiscCard from '@/components/editPageComponents/CardStuff/MiscCard';
import { useAuth } from '@/app/contexts/AuthContext';
import EditorCanvas from '@/components/editPageComponents/EditorCanvas';
import SidePanel from '@/components/editPageComponents/SidePanel';
import BottomDrawer from '@/components/editPageComponents/BottomDrawer';
import { useSubscription } from '@/app/contexts/SubscriptionContext';
import { useTouchGestures } from '@/hooks/useTouchGestures';

// Dynamically import react-grid-layout to avoid SSR issues
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
export default function DragAndDropContainer({ allowEdit, id }) {
  const parentId = id?.[0] || null;

  // ================== HOOKS ================== //
  const { updateLayout } = useItems();
  const { viewMode, setViewMode, isEditing, setIsEditing, enableDrag, setEnableDrag, selectedId, setSelectedId, isIsolate, setIsIsolate, isMobileArrange } = useController();
  const { user } = useAuth();
  const { isPremium } = useSubscription();

  const {
    items,
    itemsLoading,
    mobileItems,
    mobileItemsLoading,
    theme,
    themeData,
  } = useFetch();
  
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Get theme properties
  const isDarkMode = themeData?.textMode === 'dark';
  const textColor = isDarkMode ? 'white' : 'black';
  const bgColor = themeData?.color || '#f43f5e';
  const cardBgColor = themeData?.cardBackground || '#e12d4b';

  const username = user?.username;

  // ================== STATES ================== //
  const [parentWidth, setParentWidth] = useState();
  const [isMobile, setIsMobile] = useState(isPhone || viewMode === 'mobile');
  const containerRef = useRef(null);
  const [showSidePanel, setShowSidePanel] = useState(false);

  // ================== TOUCH GESTURE SYSTEM ================== //
  // Only enable touch gestures on mobile devices
  const [isDragEnabled, setIsDragEnabled] = useState(false);
  
  const { gestureState, touchHandlers } = useTouchGestures({
    disabled: !isPhone, // Only enable on actual mobile devices
    onLongPress: () => {
      // Long press enables drag mode for resize/move
      if (allowEdit) {
        setIsDragEnabled(true);
      }
    },
    onDoubleTap: (e) => {
      // Double tap isolates card for editing
      if (allowEdit) {
        const cardElement = e.target.closest('[data-card-id]');
        if (cardElement) {
          const cardId = cardElement.getAttribute('data-card-id');
          setSelectedId(cardId);
          setIsIsolate(true);
          setIsEditing(true);
          setShowSidePanel(true);
        }
      }
    },
    onSingleTap: () => {
      // Single tap exits drag mode only when not actively editing
      if (!allowEdit) {
        setIsDragEnabled(false);
      }
    },
  });

  // Reset drag mode when gesture ends
  useEffect(() => {
    if (allowEdit) return;
    if (!gestureState.isLongPressing && isDragEnabled) {
      // Small delay to allow drag operation to complete
      const timer = setTimeout(() => {
        setIsDragEnabled(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [gestureState.isLongPressing, isDragEnabled, allowEdit]);

  useEffect(() => {
    if (allowEdit) {
      setIsDragEnabled(true);
    } else {
      setIsDragEnabled(false);
    }
  }, [allowEdit]);

  // ================== USE EFFECTS ================== //
  useEffect(() => {
    if (isIsolate) {
      console.log('isIsolate', isIsolate);
      setShowSidePanel(true);
    }
  }, [isIsolate]);

  const updateWidth = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip measurements while hidden to avoid storing zero width
    if (container.offsetParent === null) return;

    const width = container.offsetWidth;
    if (!width) return;

    setParentWidth(width);
    setIsMobile(isPhone || viewMode === 'mobile' || width < 430);
  }, [viewMode]);

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [updateWidth]); // Fixed dependency array

  useEffect(() => {
    if (!isMobileArrange) return;

    // Recalculate layout once the container becomes visible in rearrange mode
    const rafId = requestAnimationFrame(updateWidth);
    const timeoutId = setTimeout(updateWidth, 150);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [isMobileArrange, updateWidth]);

  // ================== Filter items based on route ID ================== //
  let displayedItems;

  // Get all carousel items to filter them out
  const getAllCarouselItemIds = () => {
    const allItems = isMobile ? mobileItems : items;
    if (!allItems) return [];

    const carouselCards = allItems.filter(
      (item) => item.type === 'carouselCard' || item.type === 'marquee'
    );
    const itemsInCarousels = [];

    carouselCards.forEach((carousel) => {
      if (carousel.carouselItems && Array.isArray(carousel.carouselItems)) {
        itemsInCarousels.push(...carousel.carouselItems);
      }
      // Check for marquee items
      if (carousel.marqueeItems && Array.isArray(carousel.marqueeItems)) {
        itemsInCarousels.push(...carousel.marqueeItems);
      }
    });

    return itemsInCarousels;
  };

  const itemsInCarousels = getAllCarouselItemIds();

  if (isMobile) {
    //mobileItems
    displayedItems = parentId
      ? mobileItems?.filter(
          (mobileItem) =>
            mobileItem.parentId === parentId &&
            !itemsInCarousels.includes(mobileItem.i)
        ) || []
      : mobileItems?.filter(
          (mobileItem) =>
            !mobileItem.parentId && !itemsInCarousels.includes(mobileItem.i)
        ) || [];
  } else {
    //desktop Items
    displayedItems = parentId
      ? items?.filter(
          (item) =>
            item.parentId === parentId && !itemsInCarousels.includes(item.i)
        ) || []
      : items?.filter(
          (item) => !item.parentId && !itemsInCarousels.includes(item.i)
        ) || [];
  }

  // ================== Build layout ONLY from displayedItems ================== //
  const onLayoutChange = (newLayout) => {
    if (isMobile) {
      const sanitizedLayout = newLayout.map((item) => ({
        ...item,
        x: isNaN(item.x) ? 0 : item.x,
        y: isNaN(item.y) ? 0 : item.y,
        w: isNaN(item.w) ? 1 : item.w,
        h: isNaN(item.h) ? 1 : item.h,
      }));
      updateLayout(sanitizedLayout, true);
    } else {
      updateLayout(newLayout);
    }
  };

  // ================== DYNAMIC ROW HEIGHT CALCULATION ================== //
  const calculateRowHeight = () => {
    if (!parentWidth) return 30; // fallback

    if (isMobile) {
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
  };

  const rowHeight = calculateRowHeight();

  // ================== LAYOUT PROPS ================== //
  let layoutProps;
  if (isMobile) {
    layoutProps = displayedItems.map((item) => ({
      i: item.i,
      x: item.x ?? 0,
      y: item.y ?? 0,
      w: item.w ?? 1,
      h: item.h ?? 1,
    }));
  } else {
    layoutProps = displayedItems.map((item) => ({
      i: item.i,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
    }));
  }

  // ================== SELECTED CARD  ================== //
  const selectedCard = isMobile
    ? mobileItems?.find((item) => item.i === selectedId)
    : items?.find((item) => item.i === selectedId);

  // Function to toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Function to close the isolated card view
  const handleCloseIsolate = () => {
    setIsIsolate(false);
    setSelectedId(null);
    setIsEditing(false);
    setShowSidePanel(false);
  };

  // ================== CARD DIMENSION CALCULATIONS ================== //
  // Calculate the proper card dimensions based on its width and height properties
  const getCardDimensions = () => {
    if (!selectedCard) return { width: 300, height: 200 };

    // Use dynamic calculations based on current grid setup
    const cols = isMobile ? 2 : 12;
    const margins = isMobile ? [20, 20] : [40, 40];
    const totalMarginWidth = margins[0] * (cols - 1);
    const baseColumnWidth = parentWidth
      ? (parentWidth - totalMarginWidth) / cols
      : isMobile
        ? 140
        : 90;
    const baseRowHeight = rowHeight; // Use dynamic row height
    const margin = isMobile ? 10 : 20; // Margin between cards

    // Calculate actual card dimensions preserving aspect ratio
    let width =
      selectedCard.w * baseColumnWidth + (selectedCard.w - 1) * margin;
    let height = selectedCard.h * baseRowHeight + (selectedCard.h - 1) * margin;

    // Set minimum dimensions
    width = Math.max(width, 300);
    height = Math.max(height, 100);

    // Set maximum dimensions to prevent oversized cards
    const maxWidth = window.innerWidth * 0.8;
    const maxHeight = window.innerHeight * 0.7;

    if (width > maxWidth) {
      const ratio = height / width;
      width = maxWidth;
      height = width * ratio;
    }

    if (height > maxHeight) {
      const ratio = width / height;
      height = maxHeight;
      width = height * ratio;
    }

    return {
      width,
      height,
      aspectRatio: width / height,
    };
  };

  const cardDimensions = getCardDimensions();

  // ================== JSX   ================== //
  return (
    <>
      {/* Editor Canvas with Isolated Card */}
      <AnimatePresence>
        {isIsolate && selectedCard && (
          <EditorCanvas
            isVisible={isIsolate}
            onClose={handleCloseIsolate}
            sidePanelOpen={
              selectedCard &&
              [
                'text',
                'section title',
                'image',
                'video',
                'bannerCard',
                'counterCard',
              ].includes(selectedCard.type) &&
              !isMobile
            }
            bottomDrawerOpen={
              selectedCard &&
              [
                'text',
                'section title',
                'image',
                'video',
                'bannerCard',
                'counterCard',
              ].includes(selectedCard.type) &&
              isMobile
            }
            themeData={themeData}
            hasEditableContent={
              selectedCard &&
              [
                'text',
                'section title',
                'image',
                'video',
                'bannerCard',
                'counterCard',
              ].includes(selectedCard.type)
            }
          >
            <motion.div
              className="relative max-w-5xl overflow-hidden rounded-lg"
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
                background: cardBgColor || bgColor,
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
              }}
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0.5 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card
                card={selectedCard}
                isSelected={true}
                isMobile={isMobile}
                setIsIsolate={setIsIsolate}
                onSelect={() => {}}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                themeData={themeData}
                inCanvas={true} // New prop to indicate card is in canvas
              />
            </motion.div>
          </EditorCanvas>
        )}
      </AnimatePresence>

      {/* Side Panel (Desktop) */}
      {!isPhone && selectedCard && (
        <SidePanel
          isOpen={showSidePanel}
          onClose={() => setShowSidePanel(false)}
          card={selectedCard}
          isEditing={isEditing}
          toggleEdit={toggleEdit}
          isMobile={isMobile}
          themeData={themeData}
          sidePanelOpen={
            selectedCard &&
            [
              'text',
              'section title',
              'image',
              'video',
              'bannerCard',
              'counterCard',
            ].includes(selectedCard.type)
          }
        />
      )}

      {/* Bottom Drawer (Mobile) */}
      {isPhone && selectedCard && (
        <BottomDrawer
          isOpen={showSidePanel}
          onClose={() => setShowSidePanel(false)}
          card={selectedCard}
          isEditing={isEditing}
          toggleEdit={toggleEdit}
          themeData={themeData}
          bottomDrawerOpen={
            selectedCard &&
            [
              'text',
              'section title',
              'image',
              'video',
              'bannerCard',
              'counterCard',
            ].includes(selectedCard.type)
          }
        />
      )}

      {/* Grid Layout */}
      <div ref={containerRef} className="layout h-full w-full" {...(isPhone ? touchHandlers : {})}>
        <GridLayout
          className="layout h-full w-full"
          layout={layoutProps}
          cols={isMobile ? 2 : 12}
          rowHeight={rowHeight}
          isResizable={false}
          isDraggable={isPhone ? (allowEdit && isDragEnabled) : true}
          draggableCancel={!enableDrag && '.no-drag'}
          width={parentWidth}
          margin={isMobile ? [10, 10] : [40, 40]}
          onLayoutChange={isEditing || isIsolate ? () => {} : onLayoutChange}
          measureBeforeMount={true}
          useCSSTransforms={true}
          compactType="vertical"
          preventCollision={false}
          isBounded={false}
        >
          {displayedItems.map((card) => (
            <div key={card.i} className="pointer-events-auto z-40" data-card-id={card.i}>
              {!isIsolate || selectedId !== card.i ? (
                ['formCard', 'shopCard', 'calendarCard'].includes(card.type) ? (
                  <MiscCard
                    card={card}
                    isSelected={card.i === selectedId}
                    onSelect={(id) => setSelectedId(id)}
                    isMobile={isMobile}
                    setIsIsolate={setIsIsolate}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    enableDrag={enableDrag}
                    setEnableDrag={setEnableDrag}
                    hoveredCardId={hoveredCardId}
                    setHoveredCardId={setHoveredCardId}
                    isPhone={isPhone}
                    allowEdit={allowEdit}
                    parentId={parentId}
                    themeData={themeData}
                    setShowSidePanel={setShowSidePanel}
                  />
                ) : (
                  <Card
                    card={card}
                    isSelected={card.i === selectedId}
                    onSelect={(id) => {
                      setSelectedId(id);
                      // On desktop, maintain original behavior
                      if (!isPhone && allowEdit) {
                        setIsIsolate(true);
                        setIsEditing(true);
                        setShowSidePanel(true);
                      }
                      // On mobile, gesture system handles isolation
                    }}
                    isMobile={isMobile}
                    setIsIsolate={setIsIsolate}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    enableDrag={enableDrag}
                    setEnableDrag={setEnableDrag}
                    hoveredCardId={hoveredCardId}
                    isPremium={isPremium}
                    username={username}
                    setHoveredCardId={setHoveredCardId}
                    isPhone={isPhone}
                    allowEdit={allowEdit}
                    parentId={parentId}
                    themeData={themeData}
                    gestureState={gestureState}
                  />
                )
              ) : null}
            </div>
          ))}
        </GridLayout>
      </div>
    </>
  );
}
