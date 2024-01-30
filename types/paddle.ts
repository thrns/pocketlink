// types/paddle.ts
export interface PaddlePrice {
  id: string;
  product: {
    name: string;
    description?: string;
  };
  unitPrice: {
    amount: string;
    currencyCode: string;
  };
  billingCycle?: {
    interval: 'day' | 'week' | 'month' | 'year';
    frequency: number;
  };
}

export interface PaddleCheckoutItem {
  priceId: string;
  quantity: number;
}

export interface PaddleCustomer {
  email?: string;
  address?: {
    countryCode?: string;
    postalCode?: string;
  };
}

export interface PaddleCheckoutData {
  transactionId: string;
  status: string;
  customerId?: string;
  items: PaddleCheckoutItem[];
  customer: PaddleCustomer;
}

export type BillingCycle = 'monthly' | 'yearly';

export interface CheckoutEventData {
  name: string;
  data: PaddleCheckoutData;
}

declare global {
  interface Window {
    Paddle?: {
      Environment: {
        set: (env: 'sandbox' | 'production') => void;
      };
      Initialize: (config: {
        token: string;
        eventCallback?: (data: CheckoutEventData) => void;
      }) => void;
      Checkout: {
        open: (config: {
          items: PaddleCheckoutItem[];
          customer?: PaddleCustomer;
          settings?: {
            displayMode?: 'overlay' | 'inline';
            theme?: 'light' | 'dark';
            locale?: string;
            allowLogout?: boolean;
            showAddDiscounts?: boolean;
          };
          customData?: Record<string, any>;
        }) => void;
      };
    };
  }
}
