'use client';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { performanceMonitor } from '../utils/performanceMonitor';

/**
 * Custom hook for animating elements when they come into view
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {boolean} options.triggerOnce - Whether to trigger only once
 * @param {string} options.rootMargin - Root margin for intersection observer
 * @param {number} options.delay - Animation delay in seconds
 * @param {string} options.componentName - Component name for performance tracking
 * @returns {Array} [ref, inView, animationProps] - Ref to attach, inView status, and animation props
 */
export const useInViewAnimation = ({
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = '-50px',
  delay = 0,
  componentName = 'Component',
} = {}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);

      // Track when component comes into view for performance monitoring
      if (componentName) {
        performanceMonitor.mark(`${componentName}-in-view`);
      }
    }
  }, [inView, hasAnimated, componentName]);

  // Animation properties to spread into a framer-motion component
  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeOut',
    },
  };

  return [ref, inView, animationProps];
};

export default useInViewAnimation;
