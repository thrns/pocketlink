'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useController } from '@/app/contexts/ControllerContext';

const Dragger = ({ initialPosition, children }) => {
  const { viewMode } = useController();
  // Only use initialPosition on the client-side to avoid hydration mismatch
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Properly initialize position after mounting
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  // Initialize constraints with safe default values
  const [constraints, setConstraints] = useState({
    top: -100,
    bottom: 500, // Default value that will be updated after client-side mount
  });

  useEffect(() => {
    // This code will only run on the client after component mounts
    const updateConstraints = () => {
      setConstraints({
        top: 0,
        left: 0,
        right: window.innerWidth - 120,
        bottom: window.innerHeight - 100,
      });
    };

    // Initial update of constraints
    updateConstraints();

    // Add event listener for window resize
    window.addEventListener('resize', updateConstraints);

    // Cleanup
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  // Handle dock movement and store position
  const handleDrag = (event, info) => {
    setPosition({ x: info.point.x, y: info.point.y });
  };

  // Save the position when dragging ends
  const handleDragEnd = () => {
    localStorage.setItem('dockPosition', JSON.stringify(position));
  };

  return (
    <motion.div
      drag
      dragConstraints={constraints}
      dragElastic={0.5}
      dragMomentum={false}
      whileTap={{ cursor: 'grabbing' }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        x: position.x,
        y: position.y,
      }}
      className="fixed z-50 mb-20"
    >
      {children}
    </motion.div>
  );
};

export default Dragger;
