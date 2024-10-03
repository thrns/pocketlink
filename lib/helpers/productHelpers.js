//====== PRODUCT UTILITY HELPERS ======//

//====== PRICE CALCULATION FUNCTIONS ======//

/**
 * Calculates the discounted price based on the original price and discount details
 * @param {number} price - The original product price
 * @param {Object} discount - The discount object with type and value
 * @returns {string|null} - The calculated discounted price as a string with 2 decimal places or null if invalid input
 */
export const calculateDiscountedPrice = (price, discount) => {
  if (!discount || !price) return null;

  const originalPrice = parseFloat(price);
  if (isNaN(originalPrice)) return null;

  if (discount.type === 'percentage') {
    const discountAmount = originalPrice * (discount.value / 100);
    return (originalPrice - discountAmount).toFixed(2);
  } else if (discount.type === 'fixed') {
    const discountedPrice = originalPrice - parseFloat(discount.value);
    return discountedPrice > 0 ? discountedPrice.toFixed(2) : '0.00';
  }

  return null;
};

/**
 * Calculates the saving amount from original price and discounted price
 * @param {number|string} originalPrice - The original product price
 * @param {number|string} discountedPrice - The discounted price
 * @returns {string} - Saving amount as a string with 2 decimal places
 */
export const calculateSavings = (originalPrice, discountedPrice) => {
  const original = parseFloat(originalPrice);
  const discounted = parseFloat(discountedPrice);

  if (isNaN(original) || isNaN(discounted)) return '0.00';

  const saving = original - discounted;
  return saving > 0 ? saving.toFixed(2) : '0.00';
};

//====== PRICE FORMATTING FUNCTIONS ======//

/**
 * Formats price for display with currency symbol
 * @param {number|string} price - The price value
 * @param {string} currency - The currency symbol
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price, currency = '₹') => {
  if (!price) return `${currency}0.00`;

  const priceValue = parseFloat(price);
  return `${currency}${priceValue.toFixed(2)}`;
};

/**
 * Formats discount percentage or amount for display
 * @param {Object} discount - The discount object with type and value
 * @param {string} currency - The currency symbol for amount discount
 * @returns {string} - Formatted discount string
 */
export const formatDiscount = (discount, currency = '₹') => {
  if (!discount) return '';

  if (discount.type === 'percentage') {
    return `${discount.value}% off`;
  } else if (discount.type === 'amount') {
    return `${currency}${discount.value} off`;
  }

  return '';
};
