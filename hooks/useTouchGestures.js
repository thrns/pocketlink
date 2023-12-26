import { useState, useRef, useCallback } from 'react';

export const useTouchGestures = (options = {}) => {
  const {
    longPressDelay = 500, // ms to trigger long press
    doubleTapDelay = 300, // ms between taps for double tap
    movementThreshold = 10, // px movement to cancel gestures
    onLongPress,
    onDoubleTap,
    onSingleTap,
    disabled = false,
  } = options;

  const [gestureState, setGestureState] = useState({
    isLongPressing: false,
    gestureType: null, // 'longpress', 'doubletap', 'singletap', 'scroll'
  });

  const touchRef = useRef({
    startTime: null,
    startPosition: { x: 0, y: 0 },
    lastTapTime: 0,
    longPressTimer: null,
    hasMoved: false,
    isActive: false,
  });

  const resetGesture = useCallback(() => {
    if (touchRef.current.longPressTimer) {
      clearTimeout(touchRef.current.longPressTimer);
      touchRef.current.longPressTimer = null;
    }
    touchRef.current.isActive = false;
    touchRef.current.hasMoved = false;
    setGestureState({
      isLongPressing: false,
      gestureType: null,
    });
  }, []);

  const handleTouchStart = useCallback((e) => {
    if (disabled) return;

    const touch = e.touches[0];
    const now = Date.now();

    touchRef.current = {
      ...touchRef.current,
      startTime: now,
      startPosition: { x: touch.clientX, y: touch.clientY },
      isActive: true,
      hasMoved: false,
    };

    // Set up long press timer
    touchRef.current.longPressTimer = setTimeout(() => {
      if (touchRef.current.isActive && !touchRef.current.hasMoved) {
        setGestureState({
          isLongPressing: true,
          gestureType: 'longpress',
        });
        onLongPress?.(e);
      }
    }, longPressDelay);

  }, [disabled, longPressDelay, onLongPress]);

  const handleTouchMove = useCallback((e) => {
    if (disabled || !touchRef.current.isActive) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchRef.current.startPosition.x);
    const deltaY = Math.abs(touch.clientY - touchRef.current.startPosition.y);

    // If movement exceeds threshold, cancel gestures and treat as scroll
    if (deltaX > movementThreshold || deltaY > movementThreshold) {
      touchRef.current.hasMoved = true;
      
      // Cancel long press if user is scrolling
      if (touchRef.current.longPressTimer) {
        clearTimeout(touchRef.current.longPressTimer);
        touchRef.current.longPressTimer = null;
      }

      // If we were in long press mode, exit it
      if (gestureState.isLongPressing) {
        setGestureState({
          isLongPressing: false,
          gestureType: 'scroll',
        });
      }
    }
  }, [disabled, movementThreshold, gestureState.isLongPressing]);

  const handleTouchEnd = useCallback((e) => {
    if (disabled || !touchRef.current.isActive) return;

    const now = Date.now();
    const touchDuration = now - touchRef.current.startTime;

    // Clear long press timer
    if (touchRef.current.longPressTimer) {
      clearTimeout(touchRef.current.longPressTimer);
      touchRef.current.longPressTimer = null;
    }

    // If it was a long press, don't process as tap
    if (gestureState.isLongPressing) {
      // Long press ended, reset state
      setGestureState({
        isLongPressing: false,
        gestureType: null,
      });
      touchRef.current.isActive = false;
      return;
    }

    // If user moved too much, treat as scroll (no action)
    if (touchRef.current.hasMoved) {
      resetGesture();
      return;
    }

    // Check for double tap
    const timeSinceLastTap = now - touchRef.current.lastTapTime;
    if (timeSinceLastTap < doubleTapDelay && timeSinceLastTap > 50) {
      // Double tap detected
      setGestureState({
        isLongPressing: false,
        gestureType: 'doubletap',
      });
      onDoubleTap?.(e);
      touchRef.current.lastTapTime = 0; // Reset to prevent triple tap
    } else {
      // Potential single tap - wait to see if double tap follows
      touchRef.current.lastTapTime = now;
      
      setTimeout(() => {
        // If no double tap occurred, process as single tap
        if (now === touchRef.current.lastTapTime) {
          setGestureState({
            isLongPressing: false,
            gestureType: 'singletap',
          });
          onSingleTap?.(e);
        }
      }, doubleTapDelay);
    }

    touchRef.current.isActive = false;
  }, [disabled, gestureState.isLongPressing, doubleTapDelay, onDoubleTap, onSingleTap, resetGesture]);

  const touchHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };

  return {
    gestureState,
    touchHandlers,
    resetGesture,
  };
};