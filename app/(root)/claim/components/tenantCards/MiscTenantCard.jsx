import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CardContent from '@/components/editPageComponents/CardStuff/CardContent';
import { cn } from '@/lib/utils';
import { trackCardAttention } from '@/lib/analyticsTrackers/trackAttentionEnhanced';

export default function MiscTenantCard({
  card,
  isMobile,
  username,
  items,
  mobileItems,
  tenantTheme,
  themeData,
}) {
  // Use themeData prop if provided, otherwise fallback to tenantTheme
  const effectiveTheme = themeData || tenantTheme;
  const cardBackground = effectiveTheme?.cardBackground || '#ffffff';
  const textColor = effectiveTheme?.textMode === 'dark' ? 'black' : 'white';

  const isSection = card?.type === 'section title';
  const isCarousel = card?.type === 'carouselCard';
  const isMarquee = card?.type === 'marquee';
  const isSpecialCard = isSection || isCarousel || isMarquee;

  const cardRef = useRef(null);
  const [startTime, setStartTime] = useState(null);

  // Animation variants
  const variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Simple style object
  const cardStyle = {
    background: isSpecialCard ? 'transparent' : cardBackground,
    color: textColor,
  };

  // No click tracking here (URL components handle their own click tracking)

  // Track attention using Intersection Observer
  useEffect(() => {
    if (!username || typeof window === 'undefined') {
      return;
    }

    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startTime) {
            setStartTime(Date.now());
          } else if (!entry.isIntersecting && startTime) {
            const timeSpent = Date.now() - startTime;
            if (timeSpent > 1000) {
              // Only track if viewed for more than 1 second
              trackCardAttention(
                username,
                cardRef.current,
                Math.round(timeSpent / 1000)
              );
            }
            setStartTime(null);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (startTime) {
        const timeSpent = Date.now() - startTime;
        if (timeSpent > 1000) {
          trackCardAttention(
            username,
            cardRef.current,
            Math.round(timeSpent / 1000)
          );
        }
      }
    };
  }, [card, username, startTime]);

  // Handle click event
  const handleCardClick = () => {};

  return (
    <motion.div
      ref={cardRef}
      id="card"
      data-card-id={
        card?.id ||
        card?.uuid ||
        `card-${Math.random().toString(36).substr(2, 9)}`
      }
      initial="hidden"
      animate="visible"
      variants={variants}
      style={cardStyle}
      className="relative flex h-full w-full cursor-pointer rounded-2xl"
      onClick={handleCardClick}
    >
      {/* Card Content */}
      <CardContent
        card={card}
        isEditing={false}
        username={username}
        tenant={true}
        items={items}
        mobileItems={mobileItems}
        tenantTheme={tenantTheme}
        themeData={effectiveTheme}
        parentId={card.parentId}
      />
    </motion.div>
  );
}
