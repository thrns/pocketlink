// Map of country codes to currencies
export const countryCurrencyMap = {
  // North America
  US: 'USD', // United States
  CA: 'USD', // Canada
  MX: 'USD', // Mexico

  // Europe
  GB: 'GBP', // United Kingdom
  IE: 'EUR', // Ireland
  DE: 'EUR', // Germany
  FR: 'EUR', // France
  IT: 'EUR', // Italy
  ES: 'EUR', // Spain
  PT: 'EUR', // Portugal
  NL: 'EUR', // Netherlands
  BE: 'EUR', // Belgium
  LU: 'EUR', // Luxembourg
  AT: 'EUR', // Austria
  CH: 'EUR', // Switzerland
  SE: 'EUR', // Sweden
  DK: 'EUR', // Denmark
  NO: 'EUR', // Norway
  FI: 'EUR', // Finland
  GR: 'EUR', // Greece
  PL: 'EUR', // Poland

  // Asia Pacific
  IN: 'INR', // India
  AU: 'AUD', // Australia
  NZ: 'AUD', // New Zealand
  SG: 'USD', // Singapore
  JP: 'USD', // Japan
  KR: 'USD', // South Korea
  HK: 'USD', // Hong Kong
  CN: 'USD', // China

  // Middle East & Africa
  AE: 'USD', // UAE
  SA: 'USD', // Saudi Arabia
  ZA: 'USD', // South Africa
  EG: 'USD', // Egypt

  // Default
  DEFAULT: 'INR',
};

// Currency symbols
export const currencySymbols = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  AUD: 'A$',
};

// Exchange rates (simplified - in a real app, you'd use live rates)
// Base currency is now INR
export const exchangeRates = {
  INR: 1, // Base rate (INR)
  USD: 0.012, // 1 INR ≈ 0.012 USD
  EUR: 0.011, // 1 INR ≈ 0.011 EUR  
  GBP: 0.0094, // 1 INR ≈ 0.0094 GBP
  AUD: 0.018, // 1 INR ≈ 0.018 AUD
};
