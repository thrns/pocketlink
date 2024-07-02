// CustomMarquee.js
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const CustomMarquee = ({
  children,
  direction = 'left',
  speed = 40,
  pauseOnHover = false,
  gap = 20,
  className,
  ...props
}) => {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [animationPlayState, setAnimationPlayState] = useState('running');
  const [initialLoad, setInitialLoad] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [clones, setClones] = useState(2); // Number of clones to create

  // Determine if marquee is vertical
  const isVertical = direction === 'up' || direction === 'down';

  // Set animation direction
  const getAnimationName = () => {
    switch (direction) {
      case 'right':
        return 'marquee-right';
      case 'up':
        return 'marquee-up';
      case 'down':
        return 'marquee-down';
      default:
        return 'marquee-left';
    }
  };

  // Calculate animation duration based on speed and size
  const getAnimationDuration = () => {
    const baseSize = isVertical ? containerHeight : containerWidth;
    // Base speed is 40, slower = longer duration
    const duration = (100 / speed) * (baseSize / 100);
    // Cap minimum duration to ensure visible animation
    return Math.max(duration, 5);
  };

  // Handle hover events
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsHovering(true);
      setAnimationPlayState('paused');
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsHovering(false);
      setAnimationPlayState('running');
    }
  };

  // Set up resize observer to adjust sizes
  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return;

    const updateContainerSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    updateContainerSize();

    // Re-measure on window resize
    const resizeObserver = new ResizeObserver(updateContainerSize);
    resizeObserver.observe(containerRef.current);

    // After initial render, display the marquee
    setTimeout(() => {
      setInitialLoad(false);
    }, 100);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Dynamically create keyframes based on direction
  useEffect(() => {
    // Create the necessary keyframes for animation
    const styleSheet = document.styleSheets[0];
    const createKeyframes = (name, from, to) => {
      const keyframeText = `@keyframes ${name} { from { transform: ${from}; } to { transform: ${to}; } }`;

      // Check if the keyframes already exist
      let keyframeExists = false;
      for (let i = 0; i < styleSheet.cssRules.length; i++) {
        if (styleSheet.cssRules[i].name === name) {
          keyframeExists = true;
          break;
        }
      }

      if (!keyframeExists) {
        styleSheet.insertRule(keyframeText, styleSheet.cssRules.length);
      }
    };

    // Create all necessary keyframes
    createKeyframes('marquee-left', 'translateX(0)', 'translateX(-100%)');
    createKeyframes('marquee-right', 'translateX(-100%)', 'translateX(0)');
    createKeyframes('marquee-up', 'translateY(0)', 'translateY(-100%)');
    createKeyframes('marquee-down', 'translateY(-100%)', 'translateY(0)');
  }, []);

  // Get inner wrapper class and create a clone of children
  const getInnerWrapperStyles = () => {
    return {
      display: 'flex',
      flexDirection: isVertical ? 'column' : 'row',
      animation: `${getAnimationName()} ${getAnimationDuration()}s linear infinite`,
      animationPlayState: initialLoad ? 'paused' : animationPlayState,
      gap: `${gap}px`,
      willChange: 'transform',
      // Set min-width or min-height to ensure content wraps correctly
      ...(isVertical
        ? { minHeight: `${100 * clones}%` }
        : { minWidth: `${100 * clones}%` }),
    };
  };

  // Clone the children
  const renderClones = () => {
    const childrenArray = React.Children.toArray(children);
    const allClones = [];

    for (let i = 0; i < clones; i++) {
      allClones.push(
        React.Children.map(childrenArray, (child, index) =>
          React.cloneElement(child, {
            key: `clone-${i}-${index}`,
            // Preserve existing styles and classes but add flex-shrink-0
            className: cn(child.props.className, 'flex-shrink-0'),
            style: {
              ...child.props.style,
              // Ensure consistent sizing
              maxHeight: isVertical ? undefined : '100%',
              maxWidth: isVertical ? '100%' : undefined,
            },
          })
        )
      );
    }

    return allClones.flat();
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'marquee-container relative overflow-hidden',
        isVertical ? 'h-full' : 'w-full',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        // Ensure proper container sizing
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: 'center',
      }}
      {...props}
    >
      <div
        ref={innerRef}
        className={cn('marquee-inner', isVertical ? 'h-full' : 'w-full')}
        style={getInnerWrapperStyles()}
      >
        {renderClones()}
      </div>
    </div>
  );
};

export default CustomMarquee;
