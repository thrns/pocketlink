'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useFetch } from './FetcherContext';
import { useController } from './ControllerContext';
import { supabase } from '@/Clients/supabase/client';
import { shapePresets, mobileShapePresets } from '@/constants/shapePresets';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { useRouter, usePathname } from 'next/navigation';
import { 
  syncMobileChangesToDesktop,
  syncSingleMobileItemToDesktop,
  getChangedMobileItems,
  mapMobileToDesktopSize,
  logSyncOperation 
} from '@/utils/layoutSync';

const ItemsContext = createContext();

export function ItemsProvider({ children }) {
  const { user, referralsCount } = useAuth();
  const {
    items,
    setItems,
    mobileItems,
    setMobileItems,
    hasInitialLoad,
    saveStatus,
    setSaveStatus,
    profile,
    setProfile,
  } = useFetch();
  const { allowUpdate } = useController();
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname

  // History tracking for undo/redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isUndoRedoAction, setIsUndoRedoAction] = useState(false);

  // Debounce timer ref for grouping changes within 1 second
  const saveHistoryTimeoutRef = useRef(null);

  // Auto-save toast functionality
  const [unsavedStartTime, setUnsavedStartTime] = useState(null);
  const [showAutoSaveToast, setShowAutoSaveToast] = useState(false);
  const [autoSaveProgress, setAutoSaveProgress] = useState(0);
  const autoSaveToastTimeoutRef = useRef(null);
  const autoSaveProgressIntervalRef = useRef(null);
  const manualSaveTimeoutRef = useRef(null);

  // Add all items to history when initially loaded
  useEffect(() => {
    if (hasInitialLoad && items.length > 0 && history.length === 0) {
      setHistory([{ items: [...items], mobileItems: [...mobileItems] }]);
      setHistoryIndex(0);
    }
  }, [hasInitialLoad, items, mobileItems, history.length]);

  // Auto-save toast management
  useEffect(() => {
    // Only show auto-save toast on dashboard path
    const isDashboardPath = pathname === '/dashboard';

    // Clear any existing timeouts when save status changes
    if (autoSaveToastTimeoutRef.current) {
      clearTimeout(autoSaveToastTimeoutRef.current);
    }
    if (autoSaveProgressIntervalRef.current) {
      clearInterval(autoSaveProgressIntervalRef.current);
    }
    if (manualSaveTimeoutRef.current) {
      clearTimeout(manualSaveTimeoutRef.current);
    }

    if (
      saveStatus === 'not saved' &&
      hasInitialLoad &&
      user?.username &&
      isDashboardPath
    ) {
      // Start tracking unsaved time
      if (!unsavedStartTime) {
        setUnsavedStartTime(Date.now());
      }

      // Show toast after 4 seconds
      autoSaveToastTimeoutRef.current = setTimeout(() => {
        setShowAutoSaveToast(true);
        setAutoSaveProgress(0);

        // Start progress bar (3 seconds = 3000ms)
        const progressInterval = 100; // Update every 100ms
        const totalDuration = 3000; // 3 seconds
        const progressStep = (progressInterval / totalDuration) * 100;

        autoSaveProgressIntervalRef.current = setInterval(() => {
          setAutoSaveProgress((prev) => {
            const newProgress = prev + progressStep;
            if (newProgress >= 100) {
              clearInterval(autoSaveProgressIntervalRef.current);
              // Force save after progress completes
              forceSave();
              return 100;
            }
            return newProgress;
          });
        }, progressInterval);
      }, 4000); // 4 seconds delay
    } else if (
      saveStatus === 'saved' ||
      saveStatus === 'saving' ||
      !isDashboardPath
    ) {
      // Reset unsaved tracking when saved or not on dashboard
      setUnsavedStartTime(null);
      setShowAutoSaveToast(false);
      setAutoSaveProgress(0);
    }

    // Cleanup on unmount
    return () => {
      if (autoSaveToastTimeoutRef.current)
        clearTimeout(autoSaveToastTimeoutRef.current);
      if (autoSaveProgressIntervalRef.current)
        clearInterval(autoSaveProgressIntervalRef.current);
      if (manualSaveTimeoutRef.current)
        clearTimeout(manualSaveTimeoutRef.current);
    };
  }, [saveStatus, hasInitialLoad, user?.username, unsavedStartTime, pathname]);

  // Force save function
  const forceSave = async () => {
    if (!user?.username || !hasInitialLoad) return;

    try {
      setSaveStatus('saving');
      setShowAutoSaveToast(false);

      const { error } = await supabase
        .from('items_data')
        .update({
          profile: profile,
          items,
          mobileItems,
          theme: user.theme,
        })
        .eq('username', user.username);

      if (error) {
        console.error('Manual save error:', error);
        setSaveStatus('not saved');
        toast.error('Failed to save changes');
      } else {
        setSaveStatus('saved');
        toast.success('Changes saved successfully');
      }
    } catch (err) {
      console.error('Error in manual save:', err);
      setSaveStatus('not saved');
      toast.error('Failed to save changes');
    }
  };

  // Manual save function for button click
  const handleManualSave = () => {
    // Clear the auto-save progress
    if (autoSaveProgressIntervalRef.current) {
      clearInterval(autoSaveProgressIntervalRef.current);
    }
    setShowAutoSaveToast(false);
    setAutoSaveProgress(0);
    forceSave();
  };

  // Show auto-save toast with progress bar
  useEffect(() => {
    if (showAutoSaveToast) {
      const toastId = toast(
        <div className="flex items-center space-x-3 py-1">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
              <svg
                className="h-3 w-3 text-amber-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                Unsaved changes
              </span>
              <span className="text-xs text-gray-500" id="auto-save-text">
                3s
              </span>
            </div>

            {/* Slim progress bar */}
            <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                id="auto-save-progress-bar"
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
                style={{ width: '0%' }}
              ></div>
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleManualSave}
            className="flex-shrink-0 rounded-md bg-blue-600 bg-blue-700 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-200"
          >
            Save
          </button>
        </div>,
        {
          duration: Infinity,
          position: 'top-center',
          style: {
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            padding: '0.75rem 1rem',
            maxWidth: '20rem',
            minWidth: '18rem',
          },
          className: 'animate-in slide-in-from-top-2 fade-in duration-300',
        }
      );

      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [showAutoSaveToast]); // Only depend on showAutoSaveToast, not autoSaveProgress

  // Separate effect to update progress bar and timer text via DOM manipulation
  useEffect(() => {
    if (showAutoSaveToast && autoSaveProgress >= 0) {
      // Update progress bar
      const progressBar = document.getElementById('auto-save-progress-bar');
      if (progressBar) {
        progressBar.style.width = `${autoSaveProgress}%`;
      }

      // Update timer text
      const timerText = document.getElementById('auto-save-text');
      if (timerText) {
        const remainingSeconds = Math.ceil((100 - autoSaveProgress) / 33.33);
        timerText.textContent = `${remainingSeconds}s`;
      }
    }
  }, [autoSaveProgress, showAutoSaveToast]);

  // Handle keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only enable undo/redo on the exact dashboard path
      const isDashboardPath = pathname === '/dashboard';

      // Check if we're on the dashboard path (localhost or pocketlink.co)
      if (!isDashboardPath) {
        return; // Exit early if not on the dashboard path
      }

      // Check for undo (Ctrl+Z or Cmd+Z)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Check for redo (Ctrl+Shift+Z or Cmd+Shift+Z or Ctrl+Y or Cmd+Y)
      else if (
        ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) ||
        ((e.ctrlKey || e.metaKey) && e.key === 'y')
      ) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history, pathname]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (saveHistoryTimeoutRef.current) {
        clearTimeout(saveHistoryTimeoutRef.current);
      }
      // Cleanup auto-save timers
      if (autoSaveToastTimeoutRef.current) {
        clearTimeout(autoSaveToastTimeoutRef.current);
      }
      if (autoSaveProgressIntervalRef.current) {
        clearInterval(autoSaveProgressIntervalRef.current);
      }
      if (manualSaveTimeoutRef.current) {
        clearTimeout(manualSaveTimeoutRef.current);
      }
    };
  }, []);

  // Debounced save to history function
  const debouncedSaveToHistory = (newItems, newMobileItems) => {
    // Don't record history if we're in the middle of an undo/redo
    if (isUndoRedoAction) {
      setIsUndoRedoAction(false);
      return;
    }

    // Clear any existing timeout
    if (saveHistoryTimeoutRef.current) {
      clearTimeout(saveHistoryTimeoutRef.current);
    }

    // Set a new timeout to save history after 1 second
    saveHistoryTimeoutRef.current = setTimeout(() => {
      // Create new history entry
      const newHistory = [
        ...history.slice(0, historyIndex + 1),
        { items: newItems, mobileItems: newMobileItems },
      ];

      // Keep only the last 10 entries if history gets too long
      if (newHistory.length > 10) {
        newHistory.shift();
      }

      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }, 250);
  };

  // Save changes to history immediately (for compatibility)
  // const saveToHistory = (newItems, newMobileItems) => {
  //   // Don't record history if we're in the middle of an undo/redo
  //   if (isUndoRedoAction) {
  //     setIsUndoRedoAction(false);
  //     return;
  //   }

  //   // Create new history entry
  //   const newHistory = [
  //     ...history.slice(0, historyIndex + 1),
  //     { items: newItems, mobileItems: newMobileItems }
  //   ];

  //   // Keep only the last 10 entries if history gets too long
  //   if (newHistory.length > 10) {
  //     newHistory.shift();
  //   }

  //   setHistory(newHistory);
  //   setHistoryIndex(newHistory.length - 1);
  // };

  // Undo function
  const undo = () => {
    // Clear any pending debounced save
    if (saveHistoryTimeoutRef.current) {
      clearTimeout(saveHistoryTimeoutRef.current);
      saveHistoryTimeoutRef.current = null;
    }

    if (historyIndex > 0) {
      setIsUndoRedoAction(true);
      const prevState = history[historyIndex - 1];
      setItems([...prevState.items]);
      setMobileItems([...prevState.mobileItems]);
      setHistoryIndex(historyIndex - 1);
      toast.info('Undo successful');
    } else {
      toast.info('Nothing to undo');
    }
  };

  // Redo function
  const redo = () => {
    // Clear any pending debounced save
    if (saveHistoryTimeoutRef.current) {
      clearTimeout(saveHistoryTimeoutRef.current);
      saveHistoryTimeoutRef.current = null;
    }

    if (historyIndex < history.length - 1) {
      setIsUndoRedoAction(true);
      const nextState = history[historyIndex + 1];
      setItems([...nextState.items]);
      setMobileItems([...nextState.mobileItems]);
      setHistoryIndex(historyIndex + 1);
      toast.info('Redo successful');
    } else {
      toast.info('Nothing to redo');
    }
  };

  /**
   * Mark "not saved" whenever items or mobileItems changes
   * (only after initial load from DB and user is present).
   */
  useEffect(() => {
    if (!user?.username || !hasInitialLoad) return;
    setSaveStatus('not saved');
  }, [items, mobileItems, user, hasInitialLoad, setSaveStatus, profile]);

  /**
   * Auto-save to Supabase when needed (items, mobileItems are JSONB).
   */
  useEffect(() => {
    const saveToSupabase = async () => {
      try {
        // Safeguard against saving empty data if critical fields are missing
        if (
          (!items || items.length === 0) &&
          (!mobileItems || mobileItems.length === 0) &&
          (!profile || Object.keys(profile).length === 0 || !profile.username)
        ) {
          console.warn(
            'Auto-save prevented: Attempted to save empty items, mobileItems, and profile. This might indicate a data load issue.'
          );
          setSaveStatus('not saved'); // Or a new status like 'save_prevented'
          return; // Do not proceed with saving
        }

        setSaveStatus('saving');

        // Update the existing row where username matches
        const { error } = await supabase
          .from('items_data')
          .update({
            profile: profile,
            items, // stored as JSONB
            mobileItems, // stored as JSONB
            theme: user.theme,
          })
          .eq('username', user.username);

        if (error) {
          console.error('Supabase update error:', error);
          setSaveStatus('not saved');
        } else {
          setSaveStatus('saved');
        }
      } catch (err) {
        console.error('Error saving items to Supabase:', err);
        setSaveStatus('not saved');
      }
    };

    if (
      hasInitialLoad &&
      user?.username &&
      saveStatus === 'not saved' &&
      allowUpdate
    ) {
      saveToSupabase();
    }
  }, [
    allowUpdate,
    saveStatus,
    items,
    mobileItems,
    user,
    hasInitialLoad,
    setSaveStatus,
  ]);

  // ------------------------------------------------------------------
  // A) Content in Sync (Adds to both arrays, updates both, removes both)
  // ------------------------------------------------------------------

  /**
   * Add a new item to BOTH desktop and mobile, so they share the same ID & content.
   * @param {string} type - e.g. "Card", "Text", etc.
   * @param {object} content - Additional content (e.g., { title, text, ... })
   */
  const addItem = (parentId, type, sizeKey, content = {}) => {
    // Save current state to history with debouncing
    debouncedSaveToHistory([...items], [...mobileItems]);

    // Generate new ID
    const newId = Date.now().toString();

    // Get preset dimensions
    const desktopW = shapePresets[sizeKey].w;
    const desktopH = shapePresets[sizeKey].h;

    const mobileW = mobileShapePresets[sizeKey].w;
    const mobileH = mobileShapePresets[sizeKey].h;

    // Map mobile size to appropriate desktop size for sync
    const desktopSizeKey = mapMobileToDesktopSize(sizeKey);
    const mappedDesktopW = shapePresets[desktopSizeKey].w;
    const mappedDesktopH = shapePresets[desktopSizeKey].h;

    // Create desktop item with mapped size
    const desktopItem = {
      i: newId,
      x: 0,
      y: 0,
      w: mappedDesktopW,
      h: mappedDesktopH,
      sizeKey: desktopSizeKey,
      type,
      ...content,
      ...(parentId ? { parentId } : {}),
    };

    // Create a default mobile item
    const mobileItem = {
      i: newId,
      x: 0,
      y: 0,
      w: mobileW,
      h: mobileH,
      sizeKey: sizeKey,
      type,
      ...content,
      ...(parentId ? { parentId } : {}),
    };

    // Log sync operation for debugging
    logSyncOperation('addItem', {
      mobileSize: sizeKey,
      desktopSize: desktopSizeKey,
      itemId: newId,
      type
    });

    // Update state
    setItems((prev) => [...prev, desktopItem]);
    setMobileItems((prev) => [...prev, mobileItem]);
  };

  // Copy an item and add it to items
  const copyItem = (item, mobileItem) => {
    // Save current state to history with debouncing
    debouncedSaveToHistory([...items], [...mobileItems]);

    // Get dimensions
    const desktopW = shapePresets[item?.sizeKey].w;
    const desktopH = shapePresets[item?.sizeKey].h;

    const mobileW = mobileShapePresets[mobileItem?.sizeKey].w;
    const mobileH = mobileShapePresets[mobileItem?.sizeKey].h;

    // Create copies with new ID
    const newId = Date.now().toString();
    const newItem = {
      ...item,
      i: newId,
      w: desktopW,
      h: desktopH,
    };
    const newMobileItem = {
      ...mobileItem,
      i: newId,
      w: mobileW,
      h: mobileH, // Assign a new unique id
    };

    // Update state
    setItems((prevItems) => [...prevItems, newItem]);
    setMobileItems((prev) => [...prev, newMobileItem]);
  };

  /**
   * Update item content in BOTH desktop and mobile if that ID exists.
   * This keeps text/title/etc. in sync.
   * @param {string} id
   * @param {object|Function} newContent
   */
  const updateItemContent = (id, newContent) => {
    // Save current state to history with debouncing
    debouncedSaveToHistory([...items], [...mobileItems]);

    // Update desktop items
    setItems((prev) =>
      prev.map((item) => {
        if (item.i !== id) return item;
        return { ...item, ...newContent };
      })
    );

    // Update mobile items
    setMobileItems((prev) =>
      prev.map((item) => {
        if (item.i !== id) return item;
        return { ...item, ...newContent };
      })
    );
  };

  /**
   * Remove the item from BOTH arrays if found.
   */
  const removeItem = (id) => {
    // Save current state to history with debouncing
    debouncedSaveToHistory([...items], [...mobileItems]);

    setItems((prev) => prev.filter((item) => item.i !== id));
    setMobileItems((prev) => prev.filter((item) => item.i !== id));
  };

  // --------------------------------------------------------------------------------
  // B) Size / Layout Are Distinct, But Use isMobile Flag to Identify Which to Update
  // --------------------------------------------------------------------------------

  /**
   * Change item size for either desktop or mobile.
   * @param {string} id
   * @param {string} newSizeKey
   * @param {boolean} ismobile - True => update mobileItems
   */
  const changeItemSize = (id, newSizeKey, ismobile = false) => {
    // Save current state to history with debouncing
    debouncedSaveToHistory([...items], [...mobileItems]);

    if (ismobile) {
      const preset =
        mobileShapePresets[newSizeKey] || mobileShapePresets.square;
      
      // Update mobile item
      setMobileItems((prev) =>
        prev.map((item) =>
          item.i === id
            ? { ...item, sizeKey: newSizeKey, w: preset.w, h: preset.h }
            : item
        )
      );

      // Sync mobile change to desktop
      const desktopSizeKey = mapMobileToDesktopSize(newSizeKey);
      const desktopPreset = shapePresets[desktopSizeKey] || shapePresets.square;
      
      setItems((prev) =>
        prev.map((item) =>
          item.i === id
            ? { ...item, sizeKey: desktopSizeKey, w: desktopPreset.w, h: desktopPreset.h }
            : item
        )
      );

      // Log sync operation for debugging
      logSyncOperation('changeItemSize (mobile→desktop)', {
        itemId: id,
        mobileSize: newSizeKey,
        desktopSize: desktopSizeKey
      });
    } else {
      const preset = shapePresets[newSizeKey] || shapePresets.square;
      setItems((prev) =>
        prev.map((item) =>
          item.i === id
            ? { ...item, sizeKey: newSizeKey, w: preset.w, h: preset.h }
            : item
        )
      );
    }
  };

  const changeTextItemSize = (id, newSizeKey, ismobile = false) => {
    // Save current state to history with debouncing
    debouncedSaveToHistory([...items], [...mobileItems]);

    if (ismobile) {
      const preset = mobileShapePresets[newSizeKey];
      
      // Update mobile text item
      setMobileItems((prev) =>
        prev.map((item) => {
          if (item.i !== id) {
            return item;
          }
          return {
            ...item,
            sizeKey: newSizeKey,
            w: preset.w,
          };
        })
      );

      // Sync mobile text item change to desktop
      const desktopSizeKey = mapMobileToDesktopSize(newSizeKey);
      const desktopPreset = shapePresets[desktopSizeKey];
      
      setItems((prev) =>
        prev.map((item) => {
          if (item.i !== id) {
            return item;
          }
          return {
            ...item,
            sizeKey: desktopSizeKey,
            w: desktopPreset.w,
          };
        })
      );

      // Log sync operation for debugging
      logSyncOperation('changeTextItemSize (mobile→desktop)', {
        itemId: id,
        mobileSize: newSizeKey,
        desktopSize: desktopSizeKey
      });
    } else {
      const preset = shapePresets[newSizeKey];
      setItems((prev) =>
        prev.map((item) => {
          if (item.i !== id) {
            return item;
          }
          return {
            ...item,
            sizeKey: newSizeKey,
            w: preset.w,
          };
        })
      );
    }
  };

  /**
   * Update an entire layout (array of x,y,w,h for each item).
   * @param {Array} newLayout
   * @param {boolean} isMobile
   */
  const updateLayout = (newLayout, ismobile = false) => {
    // Save current state to history with debouncing
    debouncedSaveToHistory([...items], [...mobileItems]);

    if (ismobile) {
      // Store previous mobile items for change detection
      const previousMobileItems = [...mobileItems];
      
      // Update mobile layout
      setMobileItems((prev) => {
        return prev.map((item) => {
          const layoutItem = newLayout.find((l) => l.i === item.i);
          if (layoutItem) {
            return {
              ...item,
              x: layoutItem.x,
              y: layoutItem.y,
              w: layoutItem.w,
              h: layoutItem.h,
            };
          }
          return item;
        });
      });

      // Get the updated mobile items for sync
      const updatedMobileItems = mobileItems.map((item) => {
        const layoutItem = newLayout.find((l) => l.i === item.i);
        if (layoutItem) {
          return {
            ...item,
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          };
        }
        return item;
      });

      // Detect which items actually changed positions
      const changedMobileItems = getChangedMobileItems(previousMobileItems, updatedMobileItems);

      // Only sync if there are actual position changes
      if (changedMobileItems.length > 0) {
        setItems((prev) => {
          return syncMobileChangesToDesktop(changedMobileItems, updatedMobileItems, prev);
        });

        // Log sync operation for debugging
        logSyncOperation('updateLayout (mobile→desktop) - efficient sync', {
          itemsChanged: changedMobileItems.length,
          totalItems: newLayout.length,
          changedItemIds: changedMobileItems.map(item => item.i),
          syncMethod: 'upper/lower half division'
        });
      }
    } else {
      // Desktop layout update - no sync needed
      setItems((prev) =>
        prev.map((item) => {
          const layoutItem = newLayout.find((l) => l.i === item.i);
          return layoutItem
            ? {
                ...item,
                x: layoutItem.x,
                y: layoutItem.y,
                w: layoutItem.w,
                h: layoutItem.h,
              }
            : item;
        })
      );
    }
  };

  // Update profile function for handling profile changes
  const updateProfile = (newProfileData) => {
    // Save current state to history with debouncing
    debouncedSaveToHistory([...items], [...mobileItems]);

    // Update profile using setProfile from FetcherContext
    setProfile((prev) => ({
      ...prev,
      ...newProfileData,
    }));
  };

  return (
    <ItemsContext.Provider
      value={{
        // Data
        items,
        mobileItems,

        // Content-synced CRUD
        addItem,
        copyItem,
        updateItemContent,
        removeItem,
        updateProfile,

        // Size & layout
        changeItemSize,
        updateLayout,
        changeTextItemSize,

        // Undo/Redo
        undo,
        redo,

        // Save functionality
        handleManualSave,

        // Misc
        hasInitialLoad,
        saveStatus,
        setSaveStatus,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  return useContext(ItemsContext);
}
