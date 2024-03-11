'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StaggeredAnimateInView = ({
  children,
  threshold = 0.1,
  triggerOnce = true,
  staggerDelay = 0.1,
  initialDelay = 0,
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

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  // Child variants based on animation type
  const childVariants = {
    'fade-up': {
      hidden: { opacity: 0, y },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: 'easeOut' },
      },
    },
    'fade-in': {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration, ease: 'easeOut' },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration, ease: 'easeOut' },
      },
    },
    'slide-left': {
      hidden: { opacity: 0, x: -50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration, ease: 'easeOut' },
      },
    },
    'slide-right': {
      hidden: { opacity: 0, x: 50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration, ease: 'easeOut' },
      },
    },
  };

  // Clone children and add animation properties
  const animatedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return (
        <motion.div variants={childVariants[animation]}>{child}</motion.div>
      );
    }
    return child;
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {animatedChildren}
    </motion.div>
  );
};

export default StaggeredAnimateInView;
