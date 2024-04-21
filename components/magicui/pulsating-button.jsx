import React from 'react';
import { cn } from '@/lib/utils';

export const PulsatingButton = React.forwardRef(
  (
    {
      className,
      children,
      pulseColor = '#E91E63',
      duration = '1.5s',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative flex animate-pulse cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-bento-violet to-bento-indigo px-4 py-2 text-center',
          className
        )}
        style={{
          '--pulse-color': pulseColor,
          '--duration': duration,
        }}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <div className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-lg bg-inherit" />
      </button>
    );
  }
);

PulsatingButton.displayName = 'PulsatingButton';
