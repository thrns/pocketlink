import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CardContent from './CardContent';
import CardActions from './CardActions';
import CardHoverResizeActions from './CardHoverResizeActions';

export default function MiscCard({
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
  enableDrag,
  setEnableDrag,
  hoveredCardId,
  setHoveredCardId,
  isPhone,
  allowEdit,
  parentId,
  themeData,
}) {
  // IMPORTANT: All hooks must be called in the same order on every render
  // First, declare all useState hooks
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Next, call useRef
  const cardRef = useRef(null);

  // Then call useInView
  const [inViewRef, inView] = useInView({
    rootMargin: '300px', // Load cards 300px before they enter viewport
    triggerOnce: false, // Continue checking visibility
    threshold: 0.1, // Trigger when at least 10% visible
  });

  // After all hooks are called, compute derived values
  const textColor = themeData?.textMode === 'dark' ? 'white' : 'black';
  const bgColor = themeData?.cardBackground;

  // Determine if card should be fully rendered
  const shouldRender =
    isSelected || inView || card.i === hoveredCardId || isEditing;

  // Add useEffect for click outside detection
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#card')) {
        setIsHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Event handlers - these aren't hooks so they come after all hook calls
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (setHoveredCardId) {
      setHoveredCardId(card.i);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (setHoveredCardId) {
      setHoveredCardId(null);
    }
  };

  // If card shouldn't render yet, return a minimal placeholder that maintains grid position
  if (!shouldRender) {
    return (
      <div
        ref={inViewRef}
        className="h-full w-full rounded-2xl"
        style={{ minHeight: '30px', background: 'transparent' }}
      />
    );
  }

  const borderColor =
    themeData?.border ||
    (themeData?.textMode === 'dark' ? '#e5e5e5' : '#2a2a2a');

  // Memoize card background calculation
  const effectiveCardBackground = themeData?.cardBackground || '#ffffff';

  return (
    <motion.div
      id="card"
      ref={(el) => {
        // Combine refs to ensure both work correctly
        cardRef.current = el;
        inViewRef(el);
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTap={() => setIsHovered(true)}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
      initial={isEditing ? {} : { opacity: 0, scale: 0.9 }}
      style={{
        background: effectiveCardBackground,
        color: textColor,
        borderColor: borderColor,
      }}
      animate={
        isEditing
          ? {}
          : {
              opacity: 1,
              scale: 1,
              rotate: isDragging ? [0, 2, -2, 2, 0] : 0,
            }
      }
      transition={
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
            }
      }
      whileHover={isEditing ? {} : { scale: 1.01 }}
      whileTap={isEditing ? {} : { scale: 0.99 }}
      drag={!isEditing}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex ${isPhone && !allowEdit ? 'pointer-events-none' : ''} relative h-full w-full cursor-grab rounded-2xl border active:cursor-grabbing ${isDragging ? 'cursor-grabbing' : ''}`}
    >
      {/* Card Content */}
      <CardContent
        card={card}
        isEditing={isEditing}
        username={username}
        tenant={false}
        parentId={parentId}
        themeData={themeData}
      />

      {!isTenant && (
        <AnimatePresence>
          {isSelected && !isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-[-10px] left-0"
            >
              <CardActions
                cardId={card.i}
                isIsolate={isIsolate}
                isEditing={isEditing}
                isMobile={isMobile}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Hover Resize Actions */}
      {!isTenant && !isEditing && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute bottom-[-15px] left-0 z-[9999] flex w-full -translate-x-1/2 transform justify-center ${
              isPhone ? 'no-drag' : ''
            }`}
          >
            {isHovered && !isEditing && (
              <CardHoverResizeActions card={card} isMobile={isMobile} />
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
