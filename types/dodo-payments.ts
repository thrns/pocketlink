// types/dodo-payments.ts

export interface DodoProduct {
  id: string;
  name: string;
  description?: string;
  pricing: {
    type: 'recurring' | 'one_time';
    currency: string;
    amount: number;
    interval?: 'month' | 'year';
    interval_count?: number;
  };
  metadata?: Record<string, any>;
}

export interface DodoCustomer {
  id?: string;
  email: string;
  name?: string;
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  metadata?: Record<string, any>;
}

export interface DodoCheckoutConfig {
  product_id: string;
  customer: DodoCustomer;
  success_url: string;
  cancel_url: string;
  payment_methods?: string[];
  metadata?: Record<string, any>;
  custom_fields?: Record<string, any>;
}

export interface DodoSubscription {
  id: string;
  customer_id: string;
  product_id: string;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  current_period_start: string;
  current_period_end: string;
  billing_cycle: 'monthly' | 'yearly';
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface DodoPayment {
  id: string;
  customer_id: string;
  subscription_id?: string;
  product_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled';
  payment_method: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface DodoWebhookEvent {
  id: string;
  type: string;
  data: {
    payment?: DodoPayment;
    subscription?: DodoSubscription;
    customer?: DodoCustomer;
  };
  created_at: string;
}

export type BillingCycle = 'monthly' | 'yearly';

export interface CreateProductRequest {
  name: string;
  description?: string;
  pricing: {
    type: 'recurring' | 'one_time';
    currency: string;
    amount: number;
    interval?: 'month' | 'year';
  };
  metadata?: Record<string, any>;
}

export interface CreateCheckoutSessionRequest {
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

export interface CreateCheckoutSessionResponse {
  success: boolean;
  checkoutUrl?: string;
  paymentLink?: string;
  subscriptionId?: string;
  message?: string;
}
