'use client';
import { useFetch } from '@/app/contexts/FetcherContext';
import { useMemo } from 'react';
import ThemeDialog from './ThemeDialog';
import { PaintbrushVertical } from 'lucide-react';

export default function ThemeDockIcon() {
  const { themeData } = useFetch();

  // Create theme indicator styles based on current theme
  const themeIndicatorStyle = useMemo(() => {
    return {
      background: themeData.color,
      border: `2px solid ${themeData.textMode === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`,
    };
  }, [themeData]);

  return (
    <ThemeDialog>
      <div className="flex min-w-max h-full w-full cursor-pointer  items-center justify-center gap-2 py-1 px-2 border-2 rounded-xl">
        {/* Theme color square */}
        <div className="flex p-1.5 items-center justify-center h-8 w-8 rounded-full" style={themeIndicatorStyle} > 
          <PaintbrushVertical  className={`text-${themeData.textMode === 'light' ? 'white' : 'black'}`} />
          </div>
        {/* Theme label */}
        <span className="">
          Theme
        </span>
      </div>
    </ThemeDialog>
  );
}
