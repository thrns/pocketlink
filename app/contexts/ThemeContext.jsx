'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useFetch } from './FetcherContext';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { THEMES } from './FetcherContext';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { user } = useAuth();
  const {
    themeData,
    updateTheme,
    theme,
    hasInitialLoad,
    items,
    mobileItems,
    setItems,
    setMobileItems,
  } = useFetch();

  // Use ref to track previous textMode to prevent unnecessary updates
  const prevTextModeRef = useRef(null);

  // Update items when theme changes
  useEffect(() => {
    if (!hasInitialLoad) return;

    const textMode = themeData.textMode || 'dark';
    const isTextModeDark = textMode === 'dark';

    // Only update if textMode actually changed
    if (prevTextModeRef.current === textMode) return;
    prevTextModeRef.current = textMode;

    let desktopChanged = false;
    let mobileChanged = false;

    // Build updated desktop items, focus on text color contrast
    const updatedItems = items.map((item) => {
      if (!item.background && item.cardThemeBright !== isTextModeDark) {
        desktopChanged = true;
        return { ...item, cardThemeBright: isTextModeDark };
      }
      return item;
    });

    // Build updated mobile items similarly
    const updatedMobileItems = mobileItems.map((item) => {
      if (!item.background && item.cardThemeBright !== isTextModeDark) {
        mobileChanged = true;
        return { ...item, cardThemeBright: isTextModeDark };
      }
      return item;
    });

    // Update items separately to prevent cross-synchronization
    // Theme changes should not trigger mobile-to-desktop sync
    if (desktopChanged) {
      setItems(updatedItems);
    }
    if (mobileChanged) {
      setMobileItems(updatedMobileItems);
    }
  }, [themeData.textMode, hasInitialLoad]); // Only depend on textMode, not the items arrays

  // Apply a specific theme
  const applyTheme = (themeName) => {
    const theme = Object.values(THEMES).find((t) => t.name === themeName);
    if (theme) {
      updateTheme(theme);
      toast.success(`Theme updated to ${theme.name}`, {
        description:
          'Your card styling and text colors have been updated accordingly.',
        style: {
          backgroundImage: `linear-gradient(135deg, ${theme.color}, ${adjustColor(theme.color, -30)})`,
          color: theme.textMode === 'light' ? 'white' : 'black',
          borderRadius: '8px',
        },
      });
    }
  };

  // Legacy toggle theme function - for backward compatibility
  const toggleItemTheme = () => {
    const newTheme = theme === 'bright' ? THEMES.DARK : THEMES.LIGHT;
    updateTheme(newTheme);
    toast.success(`Theme updated to ${newTheme.name}`, {
      description:
        'Ensure your text colors are readable if the card colors match the new theme.',
      style: {
        backgroundImage: `linear-gradient(135deg, ${newTheme.color}, ${adjustColor(newTheme.color, -30)})`,
        color: newTheme.textMode === 'light' ? 'white' : 'black',
        borderRadius: '8px',
      },
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        toggleItemTheme,
        applyTheme,
        currentTheme: themeData,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Helper function to adjust color brightness (for toast gradients)
function adjustColor(color, amount) {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (c) =>
        (
          '0' +
          Math.min(255, Math.max(0, parseInt(c, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
