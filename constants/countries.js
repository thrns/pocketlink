/**
 * Country mappings for international payment processing
 * Based on Dodo Payments supported countries and ISO standards
 * States/provinces are free text input - only country codes need to be exact
 */

// Complete list of countries with their ISO codes for payment processing
export const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'IN', name: 'India' },
  { code: 'SG', name: 'Singapore' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'TH', name: 'Thailand' },
  { code: 'PH', name: 'Philippines' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'IE', name: 'Ireland' },
  { code: 'PL', name: 'Poland' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'HU', name: 'Hungary' },
  { code: 'PT', name: 'Portugal' },
  { code: 'GR', name: 'Greece' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'PE', name: 'Peru' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'IL', name: 'Israel' },
  { code: 'TR', name: 'Turkey' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'EG', name: 'Egypt' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'KE', name: 'Kenya' },
  { code: 'MA', name: 'Morocco' },
  { code: 'TN', name: 'Tunisia' },
];

// Helper functions
export const getCountryByCode = (code) => {
  return COUNTRIES.find((country) => country.code === code);
};

export const validateAddress = (address) => {
  const errors = {};

  if (!address.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!address.line1?.trim()) {
    errors.line1 = 'House/Apartment number is required';
  }

  if (!address.line2?.trim()) {
    errors.line2 = 'Street/Locality is required';
  }

  if (!address.city?.trim()) {
    errors.city = 'City is required';
  }

  if (!address.postal_code?.trim()) {
    errors.postal_code = 'Postal code is required';
  }

  if (!address.country) {
    errors.country = 'Country is required';
  }

  // State is always optional since it's free text input

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Default export for easy importing
export default {
  COUNTRIES,
  getCountryByCode,
  validateAddress,
};
