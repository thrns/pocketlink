'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import type { CreateCheckoutSessionRequest } from '@/types/dodo-payments';

interface DodoPaymentsContextType {
  isInitialized: boolean;
  error: Error | null;
  createCheckoutSession: (config: CheckoutConfig) => Promise<string>;
  isLoading: boolean;
}

interface CheckoutConfig {
  productId: string;
  customer: {
    email: string;
    name?: string;
    username?: string;
    phone?: string;
  };
  billing?: {
    city?: string;
    country?: string;
    state?: string;
    street?: string;
    zipcode?: string;
  };
  successUrl: string;
  cancelUrl?: string;
  quantity?: number;
  metadata?: Record<string, any>;
}

const DodoPaymentsContext = createContext<DodoPaymentsContextType | undefined>(
  undefined
);

export function DodoPaymentsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize Dodo Payments
    const initializeDodo = async () => {
      try {
        // Check if we have the required API key
        if (!process.env.NEXT_PUBLIC_DODO_PAYMENTS_API_KEY) {
          throw new Error('Dodo Payments API key not found');
        }

        setIsInitialized(true);
      } catch (err) {
        setError(new Error('Failed to initialize Dodo Payments'));
        console.error('Dodo Payments initialization error:', err);
      }
    };

    initializeDodo();
  }, []);

  const createCheckoutSession = useCallback(
    async (config: CheckoutConfig): Promise<string> => {
      if (!isInitialized) {
        throw new Error('Dodo Payments not initialized');
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/dodo-payments/create-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(config),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || 'Failed to create checkout session'
          );
        }

        const data = await response.json();
        return data.checkoutUrl || data.paymentLink;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [isInitialized]
  );

  return (
    <DodoPaymentsContext.Provider
      value={{
        isInitialized,
        error,
        createCheckoutSession,
        isLoading,
      }}
    >
      {children}
    </DodoPaymentsContext.Provider>
  );
}

export function useDodoPayments() {
  const context = useContext(DodoPaymentsContext);
  if (!context) {
    throw new Error('useDodoPayments must be used within DodoPaymentsProvider');
  }
  return context;
}
