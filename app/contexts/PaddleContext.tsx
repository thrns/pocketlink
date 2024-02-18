'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { CheckoutEventData } from '@/types/paddle';

interface PaddleContextType {
  isLoaded: boolean;
  isInitialized: boolean;
  error: Error | null;
  openCheckout: (
    config: Parameters<Window['Paddle']['Checkout']['open']>[0]
  ) => void;
}

const PaddleContext = createContext<PaddleContextType | undefined>(undefined);

export function PaddleProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const initializationRef = useRef(false);

  useEffect(() => {
    // Prevent double initialization in development
    if (initializationRef.current) return;

    const loadPaddle = async () => {
      try {
        // Check if already loaded
        if (window.Paddle) {
          setIsLoaded(true);
          return;
        }

        // Create and load script
        const script = document.createElement('script');
        script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
        script.async = true;

        const loadPromise = new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });

        document.head.appendChild(script);
        await loadPromise;

        setIsLoaded(true);
      } catch (err) {
        setError(new Error('Failed to load Paddle script'));
        console.error('Paddle loading error:', err);
      }
    };

    loadPaddle();

    // Cleanup
    return () => {
      const script = document.querySelector('script[src*="paddle.com"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || isInitialized || !window.Paddle) return;

    try {
      initializationRef.current = true;

      // Initialize Paddle
      window.Paddle.Initialize({
        token: process.env.NEXT_PUBLIC_POCKETLINK_CLIENT_TOKEN!,
        eventCallback: handlePaddleEvent,
      });

      setIsInitialized(true);
    } catch (err) {
      setError(new Error('Failed to initialize Paddle'));
      console.error('Paddle initialization error:', err);
    }
  }, [isLoaded]);

  const handlePaddleEvent = useCallback((eventData: CheckoutEventData) => {
    switch (eventData.name) {
      case 'checkout.completed':
        // Handle successful checkout
        // You can dispatch custom events or call callbacks here
        window.dispatchEvent(
          new CustomEvent('paddle:checkout:completed', {
            detail: eventData.data,
          })
        );
        break;

      case 'checkout.closed':
        // Handle checkout closed
        window.dispatchEvent(new CustomEvent('paddle:checkout:closed'));
        break;

      case 'checkout.error':
        // Handle checkout error
        console.error('Checkout error:', eventData.data);
        window.dispatchEvent(
          new CustomEvent('paddle:checkout:error', {
            detail: eventData.data,
          })
        );
        break;
    }
  }, []);

  const openCheckout = useCallback(
    (config: Parameters<Window['Paddle']['Checkout']['open']>[0]) => {
      if (!isInitialized || !window.Paddle) {
        console.error('Paddle not initialized');
        return;
      }

      try {
        window.Paddle.Checkout.open(config);
      } catch (err) {
        console.error('Failed to open checkout:', err);
        setError(new Error('Failed to open checkout'));
      }
    },
    [isInitialized]
  );

  return (
    <PaddleContext.Provider
      value={{ isLoaded, isInitialized, error, openCheckout }}
    >
      {children}
    </PaddleContext.Provider>
  );
}

export function usePaddle() {
  const context = useContext(PaddleContext);
  if (!context) {
    throw new Error('usePaddle must be used within PaddleProvider');
  }
  return context;
}
