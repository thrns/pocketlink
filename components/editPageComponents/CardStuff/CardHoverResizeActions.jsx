import React from 'react';
import { motion } from 'framer-motion';
import { useItems } from '@/app/contexts/ItemsContext';

export default function CardHoverResizeActions({ card, isMobile }) {
  const { changeItemSize, changeTextItemSize } = useItems();
  const cardId = card?.i;
  const cardType = card?.type;
  const cardSize = card?.sizeKey;

  const renderSizeButtons = () => {
    if (!cardType) return null;

    // Handle YouTube embeds
    if (cardType === 'youtubeCard') {
      return (
        <div className="z-50 flex min-w-max items-center justify-start rounded-lg bg-[#1b1b1b] p-1">
          {[
            { type: 'vertical', icon: '/sizeIcons/vertical.svg' },
            { type: 'horizontal', icon: '/sizeIcons/horizontal.svg' },
            {
              type: 'doubleHorizontal',
              icon: '/sizeIcons/doubleHorizontal.svg',
            },
          ].map((item) => (
            <button
              key={item?.i}
              onClick={(e) => {
                e.stopPropagation();
                changeItemSize(cardId, item.type, isMobile ? true : false);
              }}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                cardSize === item.type ? 'bg-white' : 'bg-transparent'
              }`}
            >
              <img
                src={item.icon}
                className={`h-8 w-8 transition-all ${
                  cardSize === item.type ? 'invert' : 'invert-0'
                }`}
                alt={item.type}
              />
            </button>
          ))}
        </div>
      );
    }

    // Handle map embeds
    if (cardType === 'mapCard') {
      return (
        <div className="z-50 flex min-w-max items-center justify-start rounded-lg bg-[#1b1b1b] p-1">
          {[
            { type: 'square', icon: '/sizeIcons/square.svg' },
            { type: 'vertical', icon: '/sizeIcons/vertical.svg' },
            { type: 'horizontal', icon: '/sizeIcons/horizontal.svg' },
            {
              type: 'doubleHorizontal',
              icon: '/sizeIcons/doubleHorizontal.svg',
            },
          ].map((item) => (
            <button
              key={item?.i}
              onClick={(e) => {
                e.stopPropagation();
                changeItemSize(cardId, item.type, isMobile ? true : false);
              }}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                cardSize === item.type ? 'bg-white' : 'bg-transparent'
              }`}
            >
              <img
                src={item.icon}
                className={`h-8 w-8 transition-all ${
                  cardSize === item.type ? 'invert' : 'invert-0'
                }`}
                alt={item.type}
              />
            </button>
          ))}
        </div>
      );
    }

    // Handle Carousel Card
    if (cardType === 'carouselCard') {
      return (
        <div className="z-50 flex min-w-max items-center justify-start rounded-lg bg-[#1b1b1b] p-1">
          {[
            { type: 'square', icon: '/sizeIcons/square.svg' },
            { type: 'vertical', icon: '/sizeIcons/vertical.svg' },
            { type: 'horizontal', icon: '/sizeIcons/horizontal.svg' },
            {
              type: 'doubleHorizontal',
              icon: '/sizeIcons/doubleHorizontal.svg',
            },
            { type: 'halfCarousel', icon: '/sizeIcons/doubleSquare.svg' },
            { type: 'fullCarousel', icon: '/sizeIcons/fullCarousel.svg' },
          ].map((item) => (
            <button
              key={item?.i}
              onClick={(e) => {
                e.stopPropagation();
                changeItemSize(cardId, item.type, isMobile ? true : false);
              }}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                cardSize === item.type ? 'bg-white' : 'bg-transparent'
              }`}
            >
              <img
                src={item.icon}
                className={`h-8 w-8 transition-all ${
                  cardSize === item.type ? 'invert' : 'invert-0'
                }`}
                alt={item.type}
              />
            </button>
          ))}
        </div>
      );
    }

    // Handle Carousel Card
    if (cardType === 'marquee') {
      return (
        <div className="z-50 flex min-w-max items-center justify-start rounded-lg bg-[#1b1b1b] p-1">
          {[
            { type: 'vertical', icon: '/sizeIcons/vertical.svg' },
            { type: 'halfMarquee', icon: '/sizeIcons/horizontal.svg' },
            { type: 'fullMarquee', icon: '/sizeIcons/fullCarousel.svg' },
          ].map((item) => (
            <button
              key={item?.i}
              onClick={(e) => {
                e.stopPropagation();
                changeItemSize(cardId, item.type, isMobile ? true : false);
              }}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                cardSize === item.type ? 'bg-white' : 'bg-transparent'
              }`}
            >
              <img
                src={item.icon}
                className={`h-8 w-8 transition-all ${
                  cardSize === item.type ? 'invert' : 'invert-0'
                }`}
                alt={item.type}
              />
            </button>
          ))}
        </div>
      );
    }

    // Handle testimonials Card
    if (cardType === 'testimonials') {
      return (
        <div className="z-50 flex min-w-max items-center justify-start rounded-lg bg-[#1b1b1b] p-1">
          {[
            {
              type: 'doubleHorizontal',
              icon: '/sizeIcons/doubleHorizontal.svg',
            },
            { type: 'fullCarousel', icon: '/sizeIcons/fullCarousel.svg' },
          ].map((item) => (
            <button
              key={item?.i}
              onClick={(e) => {
                e.stopPropagation();
                changeItemSize(cardId, item.type, isMobile ? true : false);
              }}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                cardSize === item.type ? 'bg-white' : 'bg-transparent'
              }`}
            >
              <img
                src={item.icon}
                className={`h-8 w-8 transition-all ${
                  cardSize === item.type ? 'invert' : 'invert-0'
                }`}
                alt={item.type}
              />
            </button>
          ))}
        </div>
      );
    }

    if (cardType === 'driveCard') {
      return (
        <div className="z-50 flex min-w-max items-center justify-start rounded-lg bg-[#1b1b1b] p-1">
          {[
            {
              type: 'doubleHorizontal',
              icon: '/sizeIcons/doubleHorizontal.svg',
            },
          ].map((item) => (
            <button
              key={item?.i}
              onClick={(e) => {
                e.stopPropagation();
                changeItemSize(cardId, item.type, isMobile ? true : false);
              }}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                cardSize === item.type ? 'bg-white' : 'bg-transparent'
              }`}
            >
              <img
                src={item.icon}
                className={`h-8 w-8 transition-all ${
                  cardSize === item.type ? 'invert' : 'invert-0'
                }`}
                alt={item.type}
              />
            </button>
          ))}
        </div>
      );
    }

    if (cardType === 'pinterestCard') {
      // Logic for Pinterest cards
    }

    if (cardType === 'counterCard') {
      return (
        <div className="z-50 flex min-w-max items-center justify-start rounded-lg bg-[#1b1b1b] p-1">
          {[
            { type: 'square', icon: '/sizeIcons/square.svg' },
            { type: 'vertical', icon: '/sizeIcons/vertical.svg' },
            { type: 'horizontal', icon: '/sizeIcons/horizontal.svg' },
            {
              type: 'doubleHorizontal',
              icon: '/sizeIcons/doubleHorizontal.svg',
            },
          ].map((item) => (
            <button
              key={item?.i}
              onClick={(e) => {
                e.stopPropagation();
                changeItemSize(cardId, item.type, isMobile ? true : false);
              }}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                cardSize === item.type ? 'bg-white' : 'bg-transparent'
              }`}
            >
              <img
                src={item.icon}
                className={`h-8 w-8 transition-all ${
                  cardSize === item.type ? 'invert' : 'invert-0'
                }`}
                alt={item.type}
              />
            </button>
          ))}
        </div>
      );
    }

    if (cardType === 'bannerCard') {
      return (
        <div className="z-50 flex min-w-max items-center justify-start rounded-lg bg-[#1b1b1b] p-1">
          {[{ type: 'banner', icon: '/sizeIcons/halfHorizontal.svg' }].map(
            (item) => (
              <button
                key={item?.i}
                onClick={(e) => {
                  e.stopPropagation();
                  changeItemSize(cardId, item.type, isMobile ? true : false);
                }}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                  cardSize === item.type ? 'bg-white' : 'bg-transparent'
                }`}
              >
                <img
                  src={item.icon}
                  className={`h-8 w-8 transition-all ${
                    cardSize === item.type ? 'invert' : 'invert-0'
                  }`}
                  alt={item.type}
                />
              </button>
            )
          )}
        </div>
      );
    }

    if (cardType === 'countdownTimerCard') {
      return (
        <div className="z-50 flex min-w-max items-center justify-start rounded-lg bg-[#1b1b1b] p-1">
          {[
            { type: 'square', icon: '/sizeIcons/square.svg' },
            { type: 'vertical', icon: '/sizeIcons/vertical.svg' },
            { type: 'horizontal', icon: '/sizeIcons/horizontal.svg' },
            {
              type: 'doubleHorizontal',
              icon: '/sizeIcons/doubleHorizontal.svg',
            },
          ].map((item) => (
            <button
              key={item?.i}
              onClick={(e) => {
                e.stopPropagation();
                changeItemSize(cardId, item.type, isMobile ? true : false);
              }}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                cardSize === item.type ? 'bg-white' : 'bg-transparent'
              }`}
            >
              <img
                src={item.icon}
                className={`h-8 w-8 transition-all ${
                  cardSize === item.type ? 'invert' : 'invert-0'
                }`}
                alt={item.type}
              />
            </button>
          ))}
        </div>
      );
    }

    // Handle direct media (images and videos)
    if (
      cardType === 'url' ||
      cardType === 'image' ||
      cardType === 'video' ||
      cardType === 'nestedCard' ||
      cardType === 'pseudoUrlCard' ||
      cardType === 'text' ||
      cardType === 'pseudoImageCard'
    ) {
      return (
        <div className="z-50 flex min-w-max items-center justify-start rounded-lg bg-[#1b1b1b] p-1">
          {[
            { type: 'square', icon: '/sizeIcons/square.svg' },
            { type: 'vertical', icon: '/sizeIcons/vertical.svg' },
            { type: 'halfHorizontal', icon: '/sizeIcons/halfHorizontal.svg' },
            { type: 'horizontal', icon: '/sizeIcons/horizontal.svg' },
            {
              type: 'doubleHorizontal',
              icon: '/sizeIcons/doubleHorizontal.svg',
            },
          ].map((item) => (
            <button
              key={item?.i}
              onClick={(e) => {
                e.stopPropagation();
                changeItemSize(cardId, item.type, isMobile ? true : false);
              }}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                cardSize === item.type ? 'bg-white' : 'bg-transparent'
              }`}
            >
              <img
                src={item.icon}
                className={`h-8 w-8 transition-all ${
                  cardSize === item.type ? 'invert' : 'invert-0'
                }`}
                alt={item.type}
              />
            </button>
          ))}
        </div>
      );
    }

    // Handle section headings
    if (cardType === 'section title') {
      return (
        <div className="z-50 flex min-w-max items-center justify-start rounded-lg bg-[#1b1b1b] p-1">
          {[
            { type: 'wider', icon: '/sizeIcons/square.svg' },
            { type: 'full', icon: '/sizeIcons/horizontal.svg' },
          ].map((item) => (
            <button
              key={item?.i}
              onClick={(e) => {
                e.stopPropagation();
                changeTextItemSize(cardId, item.type, isMobile ? true : false);
              }}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                cardSize === item.type ? 'bg-white' : 'bg-transparent'
              }`}
            >
              <img
                src={item.icon}
                className={`h-8 w-8 transition-all ${
                  cardSize === item.type ? 'invert' : 'invert-0'
                }`}
                alt={item.type}
              />
            </button>
          ))}
        </div>
      );
    }

    // Handle special cards (shop, form, calendar)
    if (
      cardType === 'shopCard' ||
      cardType === 'formCard' ||
      cardType === 'calendarCard'
    ) {
      return (
        <div className="z-50 flex min-w-max items-center justify-start rounded-lg bg-[#1b1b1b] p-1">
          {[
            { type: 'square', icon: '/sizeIcons/square.svg' },
            { type: 'vertical', icon: '/sizeIcons/vertical.svg' },
            {
              type: 'doubleHorizontal',
              icon: '/sizeIcons/doubleHorizontal.svg',
            },
          ].map((item) => (
            <button
              key={item?.i}
              onClick={(e) => {
                e.stopPropagation();
                changeItemSize(cardId, item.type, isMobile ? true : false);
              }}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                cardSize === item.type ? 'bg-white' : 'bg-transparent'
              }`}
            >
              <img
                src={item.icon}
                className={`h-8 w-8 transition-all ${
                  cardSize === item.type ? 'invert' : 'invert-0'
                }`}
                alt={item.type}
              />
            </button>
          ))}
        </div>
      );
    }

    return <></>;
  };

  return renderSizeButtons();
}
