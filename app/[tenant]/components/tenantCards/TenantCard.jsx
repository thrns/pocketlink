'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import CardContent from '@/components/editPageComponents/CardStuff/CardContent';
import { trackCardAttention } from '@/lib/analyticsTrackers/trackAttentionEnhanced';
import { safeWindowOpen } from '@/utils/urlUtils';

export default function TenantCard({
  card,
  tenantTheme,
  isMobile,
  username,
  items,
  mobileItems,
}) {
  const [isTenantHovered, setIsTenantHovered] = useState(false);
  const noRedirect = [
    'section title',
    'formCard',
    'shopCard',
    'carouselCard',
    'testimonials',
    'marquee',
  ].includes(card.type);

  const isSection = card?.type === 'section title';
  const isCarousel = card?.type === 'carouselCard';
  const isMarquee = card?.type === 'marquee';
  const isSpecialCard = isSection || isCarousel || isMarquee;

  const effectiveCardBackground = tenantTheme?.cardBackground || '#ffffff';
  const borderColor = tenantTheme?.border || '#000000';

  const cardRef = useRef(null);
  const [startTime, setStartTime] = useState(null);

  // Handle click tracking
  const handleClick = () => {};

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
  const handleCardClick = (e) => {
    handleClick(e);
    if (card?.link || card?.url || card?.mediaLink) {
      safeWindowOpen(card?.link || card?.url || card?.mediaLink);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      data-card-id={
        card?.id ||
        card?.uuid ||
        `card-${Math.random().toString(36).substr(2, 9)}`
      }
      onClick={(e) => handleCardClick(e)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: effectiveCardBackground,
        borderColor: borderColor,
      }}
      whileHover={{
        scale: !noRedirect ? 1.02 : 1,
        transition: { type: 'spring', stiffness: 300 },
      }}
      whileTap={{ scale: !noRedirect ? 0.98 : 1 }}
      onMouseEnter={() => setIsTenantHovered(true)}
      onMouseLeave={() => setIsTenantHovered(false)}
      className={`relative h-full w-full cursor-pointer rounded-2xl border`}
    >
      {/*// ================ CARD CONTENT RENDERER  ================ //*/}
      <CardContent
        card={card}
        tenant={true}
        tenantTheme={tenantTheme}
        isTenantHovered={isTenantHovered}
        username={username}
        items={items}
        mobileItems={mobileItems}
      />
    </motion.div>
  );
}
