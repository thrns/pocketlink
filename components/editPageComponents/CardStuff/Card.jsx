import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CardContent from './CardContent';
import CardHoverResizeActions from './CardHoverResizeActions';
import { safeWindowOpen } from '@/utils/urlUtils';

// Memoized version of the CardContent component
const MemoizedCardContent = memo(CardContent);

// Memoized version of the CardHoverResizeActions component
const MemoizedCardHoverResizeActions = memo(CardHoverResizeActions);

const Card = ({
  card,
  isSelected,
  isIsolate,
  setIsIsolate,
  onSelect,
  isMobile,
  isEditing,
  setIsEditing,
  isTenant,
  username,
  isPremium,
  enableDrag,
  setEnableDrag,
  isPhone,
  allowEdit,
  parentId,
  themeData,
  inCanvas,
  hoveredCardId,
  setShowSidePanel,
  gestureState,
}) => {
  // IMPORTANT: All hooks must be called in the same order on every render
  // First, declare all useState hooks at the top
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Next, call useRef
  const cardRef = useRef(null);

  // Then call useInView - this must come after all useState and useRef hooks
  const [inViewRef, inView] = useInView({
    rootMargin: '300px',
    triggerOnce: false, // Changed from !isSelected to ensure consistent hook order
    threshold: 0.1,
  });

  // Memoize these calculations to avoid recalculating on every render
  const isSection = card?.type === 'section title';
  const isCarousel = card?.type === 'carouselCard';
  const isMarquee = card?.type === 'marquee';
  const isTestimonials = card?.type === 'testimonials';
  const isSpecialType = isSection || isCarousel || isTestimonials || isMarquee;

  // Memoize theme-related calculations with useMemo hooks
  const borderColor = React.useMemo(
    () =>
      themeData?.border ||
      (themeData?.textMode === 'dark' ? '#e5e5e5' : '#2a2a2a'),
    [themeData]
  );

  // Memoize card background calculation
  const effectiveCardBackground = React.useMemo(
    () => themeData?.cardBackground || '#ffffff',
    [themeData]
  );

  // Memoize animation and style properties
  const initialAnimation = React.useMemo(
    () => (isEditing ? {} : { opacity: 0, scale: 0.9 }),
    [isEditing]
  );

  const animateProps = React.useMemo(
    () =>
      isEditing
        ? {}
        : {
            opacity: 1,
            scale: 1,
            rotate: isDragging ? [0, 2, -2, 2, 0] : 0,
          },
    [isEditing, isDragging]
  );

  const transitionProps = React.useMemo(
    () =>
      isEditing
        ? {}
        : {
            rotate: {
              duration: isDragging ? 0.6 : 0,
              repeat: isDragging ? Infinity : 0,
              ease: 'easeInOut',
            },
            opacity: { duration: 0.5 },
            scale: { type: 'spring', stiffness: 300, damping: 20 },
          },
    [isEditing, isDragging]
  );

  const whileHoverProps = React.useMemo(
    () => (isEditing ? {} : { scale: !isSpecialType ? 1.02 : 1 }),
    [isEditing, isSpecialType]
  );

  const whileTapProps = React.useMemo(
    () => (isEditing ? {} : { scale: !isSpecialType ? 0.98 : 1 }),
    [isEditing, isSpecialType]
  );

  // Memoize style object
  const cardStyle = React.useMemo(
    () => ({
      background:
        (isSection || isCarousel || isMarquee) && !isHovered && !isEditing
          ? 'transparent'
          : effectiveCardBackground,
      borderColor: isSelected ? '#3b82f6' : borderColor, // Use blue for selected, themeData border otherwise
    }),
    [
      isSection,
      isCarousel,
      isMarquee,
      isHovered,
      isEditing,
      effectiveCardBackground,
      isSelected,
      borderColor,
    ]
  );

  // Memoize class string
  const cardClassNames = React.useMemo(() => {
    return `flex ${isPhone && !allowEdit ? 'pointer-events-none' : ''} 
      ${
        (isSection || isCarousel || isMarquee) && !isEditing
          ? 'border-0 border rounded-2xl'
          : isSelected
            ? `border-2 `
            : 'border border-gray-300 dark:border-gray-700'
      }
   rounded-2xl relative h-full w-full active:cursor-grabbing cursor-grab
     ${isDragging ? 'cursor-grabbing' : ''}`;
  }, [
    isPhone,
    allowEdit,
    isSection,
    isCarousel,
    isMarquee,
    isEditing,
    isSelected,
    isDragging,
  ]);

  // Handle click outside with useEffect - ensure all hook calls happen above this
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // All useCallback definitions must be after all other hooks
  // Memoized drag handlers
  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Memoized click handler
  const handleCardClick = useCallback(
    (e) => {
      e.preventDefault();
      if (!isTenant) {
        if (isDragging || (isMobile && enableDrag)) return;
        e.stopPropagation();

        if (!isIsolate) {
          setIsIsolate(true);
          setIsEditing(true);
          onSelect(card.i);
        } else {
          setIsIsolate(false);
          setIsEditing(false);
          onSelect(null);
        }
      } else {
        // Only navigate if not a special card type
        !isSpecialType && safeWindowOpen(card?.url);
      }
    },
    [
      isDragging,
      isMobile,
      enableDrag,
      isIsolate,
      setIsIsolate,
      setIsEditing,
      onSelect,
      card,
      isTenant,
      isSpecialType,
    ]
  );

  // Memoize mouse handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Determine if card should render its full content
  // Always render if: selected, in canvas mode, currently in view, or being hovered
  const shouldRender =
    isSelected || inCanvas || inView || card.i === hoveredCardId;

  // If not rendering full content, return a simple placeholder that maintains dimensions and grid position
  if (!shouldRender) {
    return (
      <div
        ref={inViewRef}
        className="h-full w-full"
        style={{ minHeight: '30px' }} // Ensure min height to maintain grid integrity
      />
    );
  }

  return (
    <motion.div
      id="card"
      ref={(el) => {
        // Combine the refs for InView and card ref
        cardRef.current = el;
        inViewRef(el);
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={(e) => !isPhone && handleCardClick(e)}
      onTap={() => {
        // On desktop, maintain original behavior
        if (!isPhone) {
          setIsHovered(true);
        }
        // On mobile, gesture system handles all interactions
      }}
      onTouchStart={isPhone ? undefined : handleDragStart}
      onTouchEnd={isPhone ? undefined : handleDragEnd}
      style={cardStyle}
      initial={initialAnimation}
      animate={animateProps}
      transition={transitionProps}
      whileHover={whileHoverProps}
      whileTap={whileTapProps}
      drag={!isEditing} // Disable drag when editing
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cardClassNames}
    >
      {/* Card Content - Using memoized version */}
      <MemoizedCardContent
        card={card}
        isEditing={isEditing}
        username={username}
        tenant={isTenant || false}
        parentId={parentId}
        themeData={themeData}
      />

      {/* Hover Resize Actions - Only render when needed */}
      {!isTenant && !isEditing && (
        <AnimatePresence>
          {isHovered && !isEditing && (
            <motion.div
              key="resize-actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className={`absolute bottom-[-15px] left-0 z-[9999] flex w-full -translate-x-1/2 transform justify-center ${
                isPhone ? 'no-drag' : ''
              }`}
            >
              <MemoizedCardHoverResizeActions card={card} isMobile={isMobile} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default memo(Card);
