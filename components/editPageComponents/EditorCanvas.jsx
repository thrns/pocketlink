'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function EditorCanvas({
  children,
  isVisible,
  onClose,
  sidePanelOpen = false,
  bottomDrawerOpen = false,
  themeData = {
    color: '#2a2a2a',
    cardBackground: '#ffffff',
    textMode: 'light',
  },
}) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Reset canvas position and zoom when closed
  useEffect(() => {
    if (!isVisible) {
      setZoom(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [isVisible]);

  // Adjust position based on sidebar and drawer state
  useEffect(() => {
    if (sidePanelOpen && bottomDrawerOpen) {
      // If both are open, position to the left and up
      setPosition({ x: -150, y: -100 });
    } else if (sidePanelOpen) {
      // If just sidebar is open, position slightly to the left of center
      setPosition({ x: -150, y: 0 });
    } else if (bottomDrawerOpen) {
      // If just bottom drawer is open, position slightly above center
      setPosition({ x: 0, y: -100 });
    } else {
      // If neither is open, center the content
      setPosition({ x: 0, y: 0 });
    }
  }, [sidePanelOpen, bottomDrawerOpen]);

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2.5));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const resetCanvas = () => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  // Determine text and background colors based on theme mode
  const textColor = themeData?.textMode === 'dark' ? '#f1f1f1' : '#1a1a1a';
  const controlBgColor =
    themeData?.textMode === 'dark'
      ? 'rgba(30, 30, 30, 0.8)'
      : 'rgba(250, 250, 250, 0.8)';
  const controlBorderColor =
    themeData?.textMode === 'dark'
      ? 'rgba(70, 70, 70, 0.5)'
      : 'rgba(220, 220, 220, 0.5)';

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
        background: `${themeData?.color}`,
      }}
    >
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient( ${themeData?.textMode === 'dark' ? '#1c1c1c' : '#fff'} 2px, transparent 2px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Canvas controls */}
      <div
        className="absolute left-4 top-4 flex items-center gap-2 rounded-full p-2 shadow-lg backdrop-blur-md"
        style={{
          backgroundColor: controlBgColor,
          color: textColor,
          border: `1px solid ${controlBorderColor}`,
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-opacity-20"
          onClick={(e) => {
            e.stopPropagation();
            zoomOut();
          }}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <div className="w-12 text-center text-sm font-medium">
          {Math.round(zoom * 100)}%
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-opacity-20"
          onClick={(e) => {
            e.stopPropagation();
            zoomIn();
          }}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-4 w-px bg-gray-300 dark:bg-gray-700" />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-opacity-20"
          onClick={(e) => {
            e.stopPropagation();
            resetCanvas();
          }}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 rounded-full bg-opacity-20 shadow-lg backdrop-blur-md"
        style={{
          backgroundColor: controlBgColor,
          color: textColor,
          border: `1px solid ${controlBorderColor}`,
        }}
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Canvas center with zoom and rotation - NO MOVEMENT ALLOWED */}
      <motion.div
        className={cn(
          'relative rounded-lg shadow-2xl',
          'max-h-[80vh] max-w-5xl cursor-default overflow-hidden'
        )}
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: `scale(${zoom}) rotate(${rotation}deg)`,
          transformOrigin: 'center center',
          transition: 'transform 0.3s ease-out',
        }}
        whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        // Fixed position controlled by the position state
        animate={{
          x: position.x,
          y: position.y,
          scale: zoom,
          rotate: rotation,
        }}
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          y: { type: 'spring', stiffness: 300, damping: 30 },
          scale: { duration: 0.3 },
          rotate: { duration: 0.3 },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
