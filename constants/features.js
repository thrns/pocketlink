/**
 * Centralized feature definitions for tiered access control
 *
 * Import FEATURES constants in components instead of hardcoding strings
 */

export const FEATURES = {
  // Always free features
  STANDARD_THEMES: 'standard_themes',
  SOCIAL_LINKS: 'social_links',
  CONTACT_FORMS: 'contact_forms',

  // Analytics features (trial/starter+)
  BASIC_ANALYTICS: 'basic_analytics',
  ADVANCED_ANALYTICS: 'advanced_analytics',

  // Marketing features (trial/starter+)
  EMAIL_MARKETING: 'email_marketing',

  // Starter plan features
  CUSTOM_DOMAIN: 'custom_domain',
  REMOVE_BRANDING: 'remove_branding',
  PAID_SUBSCRIPTIONS: 'paid_subscriptions',
  CUSTOM_THEMES: 'custom_themes',

  // Business plan features
  AI_FEATURES: 'ai_features',
  SALES_BOT: 'sales_bot',
  INTEGRATIONS: 'integrations',
  PRIORITY_SUPPORT: 'priority_support',
  PREMIUM_THEMES: 'premium_themes',
  ECOMMERCE_SHOP: 'ecommerce_shop',
};

// Human-readable names for UI
export const FEATURE_NAMES = {
  [FEATURES.STANDARD_THEMES]: 'Standard Themes',
  [FEATURES.SOCIAL_LINKS]: 'Social Links',
  [FEATURES.CONTACT_FORMS]: 'Contact Forms',
  [FEATURES.BASIC_ANALYTICS]: 'Basic Analytics',
  [FEATURES.ADVANCED_ANALYTICS]: 'Advanced Analytics',
  [FEATURES.EMAIL_MARKETING]: 'Email Marketing',
  [FEATURES.CUSTOM_DOMAIN]: 'Custom Domain',
  [FEATURES.REMOVE_BRANDING]: 'Remove Branding',
  [FEATURES.PAID_SUBSCRIPTIONS]: 'Paid Subscriptions',
  [FEATURES.CUSTOM_THEMES]: 'Custom Themes',
  [FEATURES.AI_FEATURES]: 'AI Features',
  [FEATURES.SALES_BOT]: 'Sales Bot',
  [FEATURES.INTEGRATIONS]: 'Integrations',
  [FEATURES.PRIORITY_SUPPORT]: 'Priority Support',
  [FEATURES.PREMIUM_THEMES]: 'Premium Themes',
  [FEATURES.ECOMMERCE_SHOP]: 'E-commerce Shop',
};
