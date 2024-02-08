'use client';
import React, { createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  // Start as "true" if you want to assume we are loading on app start
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

// Hook for accessing loading context
export function useLoading() {
  return useContext(LoadingContext);
}
