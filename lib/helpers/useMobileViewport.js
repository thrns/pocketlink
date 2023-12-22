"use client"
//====== MOBILE VIEWPORT HOOK ======//

import { useState, useEffect } from 'react';

//====== HOOK IMPLEMENTATION ======//

const useMobileViewport = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  //====== VIEWPORT DETECTION EFFECT ======//

  useEffect(() => {
    // Check if window is available (for SSR compatibility)
    if (typeof window === 'undefined') return;

    //====== VIEWPORT CHECK FUNCTION ======//

    const checkViewport = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    //====== EVENT LISTENERS SETUP ======//

    // Run initial check
    checkViewport();

    // Add event listener for resize
    window.addEventListener('resize', checkViewport);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkViewport);
    };
  }, [breakpoint]);

  return isMobile;
};

//====== EXPORT ======//

export default useMobileViewport;
