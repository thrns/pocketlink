'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}) => {
  const [active, setActive] = useState(propTabs[0]);

  return (
    <>
      <div
        className={cn(
          'no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-start overflow-auto sm:overflow-visible',
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => setActive(tab)}
            className={cn('relative rounded-full px-4 py-2', tabClassName)}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="activeTab"
                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                className={cn(
                  'absolute inset-0 rounded-full bg-gray-200 dark:bg-zinc-800',
                  activeTabClassName
                )}
              />
            )}
            <span className="relative block text-black dark:text-white">
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      <div className={cn('mt-4 w-full', contentClassName)}>
        {active.content}
      </div>
    </>
  );
};
