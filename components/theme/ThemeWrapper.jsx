'use client';
import { useEffect } from 'react';
import { useFetch } from '@/app/contexts/FetcherContext';

export function ThemeWrapper({ children }) {
  const { themeData } = useFetch();

  // Apply theme to body element whenever themeData changes
  useEffect(() => {
    if (!themeData) return;

    const bgColor = themeData.background || '#ffffff';

    // Apply theme background color to both html and body elements with !important
    document.body.style.cssText = `background-color: ${bgColor} !important; background: ${bgColor} !important;`;
    document.documentElement.style.cssText = `background-color: ${bgColor} !important; background: ${bgColor} !important;`;

    // Set variables for use in CSS
    document.documentElement.style.setProperty(
      '--theme-background',
      bgColor,
      'important'
    );
    document.documentElement.style.setProperty(
      '--theme-color',
      themeData.color || '#ffffff',
      'important'
    );
    document.documentElement.style.setProperty(
      '--theme-text-color',
      themeData.textMode === 'light' ? '#ffffff' : '#000000',
      'important'
    );

    // Apply dark mode class if needed
    if (themeData.textMode === 'light') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }

    // Apply theme color to meta theme-color (for mobile browsers)
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeData.color || '#ffffff');
    } else {
      const newMetaThemeColor = document.createElement('meta');
      newMetaThemeColor.name = 'theme-color';
      newMetaThemeColor.content = themeData.color || '#ffffff';
      document.head.appendChild(newMetaThemeColor);
    }

    return () => {
      // Clean up effects if component unmounts
      document.documentElement.classList.remove('dark', 'light');
      document.body.classList.remove('dark', 'light');
    };
  }, [themeData]);

  return <>{children}</>;
}
