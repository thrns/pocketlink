'use client';
import { usePathname } from 'next/navigation';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';

const ControllerContext = createContext({
  open: false,
  setOpen: () => {},
  allowUpdate: false,
  viewMode: 'desktop',
  setViewMode: () => {},
  mobileViewContainerRef: null,
  isEditing: false,
  setIsEditing: () => {},
  enableDrag: false,
  setEnableDrag: () => {},
  selectedId: null,
  setSelectedId: () => {},
  isIsolate: false,
  setIsIsolate: () => {},
});

export function ControllerProvider({ children }) {
  const pathname = usePathname();

  const [viewMode, setViewMode] = useState('mobile');
  const [allowUpdate, setAllowUpdate] = useState(false);
  const updateInterval = useRef(null);
  const mobileViewContainerRef = useRef(null);

  const [open, setOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [enableDrag, setEnableDrag] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isIsolate, setIsIsolate] = useState(false);
const [isMobileArrange, setIsMobileArrange] = useState(false)
  // Automatically set viewMode based on URL
  useEffect(() => {
    if (pathname.includes('edit-desktop')) {
      setViewMode('desktop');
    } else {
      setViewMode('mobile');
    }
  }, [pathname]);

  useEffect(() => {
    updateInterval.current = setInterval(() => {
      setAllowUpdate(true);
      setTimeout(() => {
        setAllowUpdate(false);
      }, 100);
    }, 2500);

    return () => clearInterval(updateInterval.current);
  }, [allowUpdate]);

  return (
    <ControllerContext.Provider
      value={{
        open,
        setOpen,
        allowUpdate,
        viewMode,
        setViewMode,
        mobileViewContainerRef,
        isEditing,
        setIsEditing,
        enableDrag,
        setEnableDrag,
        selectedId,
        setSelectedId,
        isIsolate,
        setIsIsolate,
        isMobileArrange, setIsMobileArrange
      }}
    >
      {children}
    </ControllerContext.Provider>
  );
}

// Hook for accessing loading context
export function useController() {
  const context = useContext(ControllerContext);

  // Make sure we always return an object with allowUpdate property
  if (!context) {
    return { allowUpdate: false };
  }

  return context;
}
