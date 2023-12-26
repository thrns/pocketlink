'use client';

import { useState, useEffect } from 'react';

/**
 * A hook that tracks the window size and provides responsive updates
 * with performance optimizations to prevent excessive re-renders
 *
 * @returns {Object} An object containing the current window width and height
 */
export function useWindowSize() {
  // Initialize with undefined to avoid hydration mismatch
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Skip effect during SSR
    if (typeof window === 'undefined') return;

    // Prevent too many updates by using requestAnimationFrame
    let frameId = null;

    function handleResize() {
      // Cancel any pending frames
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      // Schedule update on next animation frame for better performance
      frameId = requestAnimationFrame(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      // Cancel any pending animation frames
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []); // Empty array ensures this effect runs only once

  return windowSize;
}

// Export a debounced version for even better performance in high-load components
export function useDebounceWindowSize(delay = 250) {
  const [debouncedSize, setDebouncedSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const size = useWindowSize();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSize(size);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [size, delay]);

  return debouncedSize;
}
