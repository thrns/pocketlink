// Centralized pricing constants for Pocketlink
// All prices are in INR and match the pricing page

export const PLAN_PRICING = {
  starter: {
    monthly: 99,
    yearly: 999,
  },
  business: {
    monthly: 499,
    yearly: 4999,
  },
};

// Helper function to get amount in cents for payment processing
export const getPlanAmountInCents = (planType, billingCycle) => {
  const pricing = PLAN_PRICING[planType];
  if (!pricing) return null;

  const amount = pricing[billingCycle];
  if (!amount) return null;

  // Convert to cents and round to avoid floating point issues
  return Math.round(amount * 100);
};

// Helper function to get display amount
export const getPlanDisplayAmount = (planType, billingCycle) => {
  const pricing = PLAN_PRICING[planType];
  if (!pricing) return null;

  return pricing[billingCycle] || null;
};
