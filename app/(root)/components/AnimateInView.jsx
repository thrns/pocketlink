'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimateInView = ({
  children,
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
  duration = 0.5,
  y = 20,
  className = '',
  rootMargin = '-50px',
  animation = 'fade-up', // Options: fade-up, fade-in, scale, slide-left, slide-right
}) => {
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
    rootMargin,
  });

  // Animation variants based on animation type
  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, delay, ease: 'easeOut' },
      },
    },
    'fade-in': {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration, delay, ease: 'easeOut' },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration, delay, ease: 'easeOut' },
      },
    },
    'slide-left': {
      hidden: { opacity: 0, x: -50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration, delay, ease: 'easeOut' },
      },
    },
    'slide-right': {
      hidden: { opacity: 0, x: 50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration, delay, ease: 'easeOut' },
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[animation]}
    >
      {children}
    </motion.div>
  );
};

export default AnimateInView;
