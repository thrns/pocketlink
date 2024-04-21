import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const InteractiveHoverButton = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'group relative w-auto cursor-pointer overflow-hidden rounded-full border border-zinc-200 bg-white p-2 px-6 text-center font-semibold dark:border-zinc-800 dark:bg-zinc-950',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          <div className="group-scale-[100.8] h-2 w-2 rounded-full bg-zinc-900 transition-all duration-300 dark:bg-zinc-50"></div>
          <span className="group-translate-x-12 group-opacity-0 inline-block transition-all duration-300">
            {children}
          </span>
        </div>
        <div className="group--translate-x-5 group-opacity-100 absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-zinc-50 opacity-0 transition-all duration-300 dark:text-zinc-900">
          <span>{children}</span>
          <ArrowRight />
        </div>
      </button>
    );
  }
);

InteractiveHoverButton.displayName = 'InteractiveHoverButton';
