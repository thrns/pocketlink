"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Masonry = ({
  items = [],
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  className = "",
  columns = 4,
  gap = 16
}) => {
  const [columnItems, setColumnItems] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!items.length) return;

    // Create columns array
    const cols = Array.from({ length: columns }, () => []);
    
    // Distribute items across columns
    items.forEach((item, index) => {
      const columnIndex = index % columns;
      cols[columnIndex].push({ ...item, originalIndex: index });
    });

    setColumnItems(cols);
  }, [items, columns]);

  const getAnimationVariants = (originalIndex) => {
    const delay = originalIndex * stagger;
    
    const variants = {
      hidden: {
        opacity: blurToFocus ? 0 : 1,
        filter: blurToFocus ? 'blur(10px)' : 'blur(0px)',
        scale: 0.8,
        y: animateFrom === 'bottom' ? 50 : animateFrom === 'top' ? -50 : 0,
        x: animateFrom === 'left' ? -50 : animateFrom === 'right' ? 50 : 0,
      },
      visible: {
        opacity: 0.6,
        filter: 'blur(0px)',
        scale: 1,
        y: 0,
        x: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94] // power3.out equivalent
        }
      }
    };

    return variants;
  };

  const getHoverVariants = () => ({
    scale: scaleOnHover ? hoverScale : 1,
    transition: { duration: 0.2 }
  });

  return (
    <div 
      ref={containerRef}
      className={`flex justify-center ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {columnItems.map((column, columnIndex) => (
        <div 
          key={columnIndex}
          className="flex flex-col"
          style={{ 
            gap: `${gap}px`,
            width: `calc((100% - ${(columns - 1) * gap}px) / ${columns})`
          }}
        >
          {column.map((item, itemIndex) => (
            <motion.div
              key={item.id || `${columnIndex}-${itemIndex}`}
              initial="hidden"
              animate="visible"
              whileHover={getHoverVariants()}
              variants={getAnimationVariants(item.originalIndex)}
              className="relative overflow-hidden rounded-lg cursor-pointer"
              style={{
                height: `${item.height}px`
              }}
            >
              <Image
                src={item.img}
                alt={item.alt || `Masonry item ${item.originalIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
              />
              {colorShiftOnHover && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Masonry;