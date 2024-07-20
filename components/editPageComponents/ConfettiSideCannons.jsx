'use client'; // If you're in a Next.js app

import React from 'react';
import confetti from 'canvas-confetti';

export function ConfettiSideCannons({
  children,
  onClick,
  className = '',
  ...props
}) {
  const fireSideCannons = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];

    const frame = () => {
      if (Date.now() > end) return;

      // Left cannon
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });

      // Right cannon
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  // Our button click handler
  const handleClick = (e) => {
    // Call any parent onClick logic
    onClick?.(e);
    // Then fire confetti
    fireSideCannons();
  };

  return (
    <button onClick={handleClick} className={className} {...props}>
      {children}
    </button>
  );
}
