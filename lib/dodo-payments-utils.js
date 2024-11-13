/**
 * Dodo Payments Utilities & Service
 * Helper functions for subscription management, tier detection, and Dodo Payments API integration
 */

// Conditionally import DodoPayments to handle production environments where it might not be available
let DodoPayments;
try {
  DodoPayments = require('dodopayments');
} catch (importError) {
  console.warn(
    'DodoPayments package not available, some features will be limited:',
    importError.message
  );
  DodoPayments = null;
}

// Product ID mappings for tier detection
const PRODUCT_IDS = {
  starter: {
    monthly: process.env.NEXT_PUBLIC_DODO_STARTER_MONTHLY_PRODUCT_ID,
    yearly: process.env.NEXT_PUBLIC_DODO_STARTER_YEARLY_PRODUCT_ID,
  },
  business: {
    monthly: process.env.NEXT_PUBLIC_DODO_BUSINESS_MONTHLY_PRODUCT_ID,
    yearly: process.env.NEXT_PUBLIC_DODO_BUSINESS_YEARLY_PRODUCT_ID,
  },
};

/**
 * Determine subscription tier and billing cycle from Dodo Payments product ID
 * @param {string} productId - Dodo Payments product ID
 * @returns {Object} { tier: 'starter'|'business', cycle: 'monthly'|'yearly' }
 */
export function determineSubscriptionTier(productId) {
  // Check starter plans
  if (productId === PRODUCT_IDS.starter.monthly) {
    return { tier: 'starter', cycle: 'monthly' };
  }
  if (productId === PRODUCT_IDS.starter.yearly) {
    return { tier: 'starter', cycle: 'yearly' };
  }

  // Check business plans
  if (productId === PRODUCT_IDS.business.monthly) {
    return { tier: 'business', cycle: 'monthly' };
  }
  if (productId === PRODUCT_IDS.business.yearly) {
    return { tier: 'business', cycle: 'yearly' };
  }

  // Default fallback
  console.warn(
    `Unknown product ID: ${productId}, defaulting to starter monthly`
  );
  return { tier: 'starter', cycle: 'monthly' };
}

// Note: Trial eligibility removed - subscriptions don't offer trials
// Free users get feature-based trials (analytics & marketing) via SubscriptionContext

/**
 * Check if user has an active subscription
 * @param {Object} userData - User data object from database
 * @returns {boolean} Whether user has active subscription
 */
export function hasActiveSubscription(userData) {
  if (!userData.subscription_status) return false;

  const now = new Date();

  // Check if subscription is active
  if (userData.subscription_status === 'active') {
    // For cancelled subscriptions, check if still within period
    if (userData.cancel_at_period_end && userData.subscription_end_date) {
      return new Date(userData.subscription_end_date) > now;
    }
    return true;
  }

  return false;
}

/**
 * Check if user can access premium features
 * @param {Object} userData - User data object from database
 * @returns {boolean} Whether user can access premium features
 */
export function canAccessPremiumFeatures(userData) {
  const now = new Date();

  // Check active subscription
  if (hasActiveSubscription(userData)) {
    return true;
  }

  return false;
}

/**
 * Get user's effective subscription tier
 * @param {Object} userData - User data object from database
 * @returns {string} 'starter', 'business', or null
 */
export function getEffectiveSubscriptionTier(userData) {
  if (canAccessPremiumFeatures(userData)) {
    return userData.subscription_tier || 'starter';
  }
  return null;
}

// Note: calculateTrialEndDate removed - subscriptions don't offer trials
// Feature-based trials handled in SubscriptionContext

// Note: isTrialSubscription removed - all subscriptions are paid plans
// Free users get feature-based trials instead of subscription trials

/**
 * Get user's subscription display info for UI
 * @param {Object} userData - User data object from database
 * @returns {Object} Display information for UI
 */
export function getSubscriptionDisplayInfo(userData) {
  const now = new Date();
  const canAccess = canAccessPremiumFeatures(userData);
  const tier = getEffectiveSubscriptionTier(userData);

  let status = 'free';
  let expiresAt = null;
  let isTrialing = false;
  let daysRemaining = 0;

  if (hasActiveSubscription(userData)) {
    status = userData.cancel_at_period_end ? 'active_until' : 'active';
    expiresAt = userData.subscription_end_date;
    if (userData.subscription_end_date) {
      daysRemaining = Math.ceil(
        (new Date(userData.subscription_end_date) - now) / (1000 * 60 * 60 * 24)
      );
    }
  }

  return {
    canAccess,
    tier,
    status,
    isTrialing: false, // Subscriptions don't have trials
    expiresAt,
    daysRemaining,
    isCancelled: userData.cancel_at_period_end || false,
    hasUsedTrial: false, // Not applicable for subscription model
  };
}

/**
 * Validate checkout eligibility
 * @param {Object} userData - User data object from database
 * @param {string} requestedTier - Requested subscription tier
 * @returns {Object} Validation result
 */
export function validateCheckoutEligibility(userData, requestedTier) {
  const hasActive = hasActiveSubscription(userData);

  if (hasActive) {
    return {
      eligible: false,
      reason: 'User already has an active subscription',
      code: 'ACTIVE_SUBSCRIPTION',
    };
  }

  // Check if user is trying to downgrade
  if (userData.subscription_tier && hasActive) {
    const currentTierValue = userData.subscription_tier === 'business' ? 2 : 1;
    const requestedTierValue = requestedTier === 'business' ? 2 : 1;

    if (requestedTierValue < currentTierValue) {
      return {
        eligible: false,
        reason: 'Cannot downgrade subscription tier. Please contact support.',
        code: 'DOWNGRADE_NOT_ALLOWED',
      };
    }
  }

  return {
    eligible: true,
    reason: 'User is eligible for checkout',
    trialEligible: 'false', // Subscriptions don't offer trials
  };
}

/**
 * Dodo Payments Service Class
 * Handles all Dodo Payments API interactions
 */
class DodoPaymentsService {
  constructor() {
    // Initialize client with environment variables
    this.apiKey = process.env.NEXT_PUBLIC_DODO_PAYMENTS_SERVER_API_KEY;

    // Detect test vs live mode from API key prefix
    this.isTestMode = false;
    this.apiUrl = this.isTestMode
      ? 'https://test.dodopayments.com'
      : 'https://live.dodopayments.com';

    if (!this.apiKey) {
      console.error(
        'NEXT_PUBLIC_DODO_PAYMENTS_SERVER_API_KEY not found in environment variables'
      );
      throw new Error('Dodo Payments API key is required');
    }

    // Initialize Dodo Payments SDK only if package is available
    if (DodoPayments) {
      this.client = new DodoPayments({
        bearerToken: this.apiKey,
        environment: this.isTestMode ? 'test_mode' : 'live_mode',
      });
    } else {
      console.warn(
        'DodoPayments SDK not available, using fallback direct API calls'
      );
      this.client = null;
    }

    // Debug logging
    console.log('DodoPaymentsService initialized:', {
      isTestMode: this.isTestMode,
      apiUrl: this.apiUrl,
      hasApiKey: !!this.apiKey,
      environment: this.isTestMode ? 'test_mode' : 'live_mode',
    });
  }

  /**
   * Format billing information for Dodo Payments API
   */
  formatBillingInfo(customer, billingAddress) {
    if (billingAddress) {
      // Use provided billing address
      // line1 = house/apartment, line2 = street/locality
      return {
        email: customer.email,
        name:
          billingAddress.name ||
          customer.name ||
          customer.username ||
          'Customer',
        country: billingAddress.country || 'US',
        state: billingAddress.state || 'CA',
        city: billingAddress.city || 'San Francisco',
        street: billingAddress.line2 || 'Main Street', // Use line2 as street for Dodo
        line1: billingAddress.line1 || '123', // House/apartment number
        line2: billingAddress.line2 || 'Main Street', // Street/locality
        postal_code: billingAddress.postal_code || '94102',
        zipcode: billingAddress.postal_code || '94102', // Dodo expects zipcode field
        ...(billingAddress.phone && { phone: billingAddress.phone }),
      };
    }

    // Fallback to minimal billing info
    return {
      email: customer.email,
      name: customer.name || customer.username || 'Customer',
      country: 'US',
      state: 'CA',
      city: 'San Francisco',
      street: 'Main Street', // Required by Dodo
      line1: '123',
      line2: 'Main Street',
      postal_code: '94102',
      zipcode: '94102', // Dodo expects zipcode field
    };
  }

  /**
   * Create PocketLink subscription checkout using Dodo SDK
   */
  async createSubscriptionCheckout(checkoutData) {
    const {
      productId,
      planType,
      billingCycle,
      customer,
      successUrl,
      cancelUrl,
      quantity = 1,
      metadata = {},
    } = checkoutData;

    console.log('Creating Dodo subscription checkout:', {
      productId,
      planType,
      billingCycle,
      trialPeriodDays: 0, // Subscriptions don't offer trials
      email: customer.email,
      paymentMethods: [
        'credit',
        'debit',
        'google_pay',
        'apple_pay',
        'upi_intent',
      ],
      isTestMode: this.isTestMode,
    });

    try {
      // Prepare subscription creation parameters
      const subscriptionParams = {
        customer: {
          email: customer.email,
          name: customer.name || customer.username || 'Customer',
          ...(customer.phone && { phone: customer.phone }),
        },
        // Billing info from provided address or minimal defaults
        billing: this.formatBillingInfo(customer, checkoutData.billingAddress),
        product_id: productId,
        payment_link: true,
        return_url: successUrl,
        quantity,
        // Enable multiple payment methods for better user experience
        // Credit/Debit: Traditional credit/debit cards (universal)
        // Google Pay: Available on Chrome/Android devices
        // Apple Pay: Available on Safari/iOS devices
        // UPI: Popular in India (PhonePe, Google Pay UPI, Paytm, etc.)
        allowed_payment_method_types: [
          'credit',
          'debit',
          'google_pay',
          'apple_pay',
        ],
        metadata: {
          user_id: customer.username,
          plan_type: planType,
          billing_cycle: billingCycle,
          source: 'pocketlink_web',
          ...metadata,
        },
        // Add discount support
        ...(checkoutData.discountCode && {
          discount_code: checkoutData.discountCode,
        }),
      };

      // Always set trial_period_days to 0 for paid subscriptions
      subscriptionParams.trial_period_days = 0;
      console.log(
        'Subscriptions have no trial period - setting trial_period_days to 0'
      );

      // Use subscriptions.create for subscription products
      const subscription =
        await this.client.subscriptions.create(subscriptionParams);

      console.log('✓ Dodo subscription created:', {
        subscriptionId: subscription.subscription_id,
        paymentUrl: subscription.payment_link,
        paymentMethods: [
          'credit',
          'debit',
          'google_pay',
          'apple_pay',
          'upi_intent',
        ],
      });

      // Return in consistent format
      return {
        success: true,
        subscriptionId: subscription.subscription_id || subscription.id,
        paymentLink: subscription.payment_link,
        checkoutUrl: subscription.payment_link,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
    } catch (error) {
      console.error('❌ Dodo subscription creation failed:', error);
      throw new Error(`Failed to create subscription: ${error.message}`);
    }
  }

  /**
   * Get subscription by ID (for verification and status checks)
   */
  async getSubscription(subscriptionId) {
    if (!subscriptionId) {
      throw new Error('Subscription ID is required');
    }

    try {
      console.log('Fetching subscription:', subscriptionId);

      // Try to get subscription using the SDK first
      const subscription =
        await this.client.subscriptions.retrieve(subscriptionId);

      console.log('✓ Subscription retrieved:', {
        id: subscription.id,
        status: subscription.status,
        currentPeriodEnd: subscription.current_period_end,
      });

      return subscription;
    } catch (error) {
      console.error('SDK method failed, trying direct API call:', error);

      // Fallback to direct API call
      try {
        const response = await fetch(
          `${this.apiUrl}/v1/subscriptions/${subscriptionId}`,
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API call failed: ${response.status} - ${errorText}`);
        }

        const subscription = await response.json();
        console.log('✓ Subscription retrieved via direct API call');
        return subscription;
      } catch (apiError) {
        console.error('❌ Direct API call also failed:', apiError);
        throw new Error(`Failed to retrieve subscription: ${apiError.message}`);
      }
    }
  }

  /**
   * Cancel subscription using Dodo Payments API
   * Sets cancel_at_next_billing_date to true to maintain access until period end
   */
  async cancelSubscription(subscriptionId) {
    if (!subscriptionId) {
      throw new Error('Subscription ID is required');
    }

    try {
      console.log('Cancelling subscription:', subscriptionId);

      // Try to use SDK first
      try {
        const result = await this.client.subscriptions.update(subscriptionId, {
          cancel_at_next_billing_date: true,
        });

        console.log('✓ Subscription cancelled via SDK:', {
          subscriptionId,
          cancelAtNextBilling: result.cancel_at_next_billing_date,
          status: result.status,
          currentPeriodEnd: result.current_period_end,
        });

        return result;
      } catch (sdkError) {
        console.error('SDK method failed, trying direct API call:', sdkError);

        // Fallback to direct API call
        const response = await fetch(
          `${this.apiUrl}/subscriptions/${subscriptionId}`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cancel_at_next_billing_date: true,
              // Don't set status: 'cancelled' - this maintains access until period end
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to cancel subscription via direct API:', {
            status: response.status,
            statusText: response.statusText,
            error: errorText,
          });
          throw new Error(
            `Cancellation failed: ${response.status} ${response.statusText} - ${errorText}`
          );
        }

        const result = await response.json();

        console.log('✓ Subscription cancelled via direct API call:', {
          subscriptionId,
          cancelAtNextBilling: result.cancel_at_next_billing_date,
          status: result.status,
          currentPeriodEnd: result.current_period_end,
        });

        return result;
      }
    } catch (error) {
      console.error('❌ Failed to cancel subscription:', error);
      throw new Error(`Failed to cancel subscription: ${error.message}`);
    }
  }

  /**
   * Change subscription plan using Dodo Payments API with proration
   * @param {string} subscriptionId - The subscription ID to change
   * @param {string} newProductId - The new product ID to change to
   * @param {string} proration - 'prorated_immediately' or 'full_immediately'
   */
  async changePlan(
    subscriptionId,
    newProductId,
    proration = 'prorated_immediately'
  ) {
    if (!subscriptionId) {
      throw new Error('Subscription ID is required');
    }

    if (!newProductId) {
      throw new Error('New product ID is required');
    }

    try {
      console.log('Changing subscription plan:', {
        subscriptionId,
        newProductId,
        proration,
      });

      // Try to use SDK first
      try {
        const result = await this.client.subscriptions.changePlan(
          subscriptionId,
          {
            product_id: newProductId,
            quantity: 1,
            proration_billing_mode: proration,
          }
        );

        console.log('✓ Subscription plan changed via SDK:', {
          subscriptionId,
          newProductId: result.product_id,
          proration,
          nextBillingDate: result.next_billing_date,
          currentPeriodEnd: result.current_period_end,
        });

        return result;
      } catch (sdkError) {
        console.error('SDK method failed, trying direct API call:', sdkError);

        // Fallback to direct API call
        const response = await fetch(
          `${this.apiUrl}/subscriptions/${subscriptionId}/change-plan`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product_id: newProductId,
              quantity: 1,
              proration_options: proration,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to change subscription plan via direct API:', {
            status: response.status,
            statusText: response.statusText,
            error: errorText,
          });
          throw new Error(
            `Plan change failed: ${response.status} ${response.statusText} - ${errorText}`
          );
        }

        const result = await response.json();

        console.log('✓ Subscription plan changed via direct API call:', {
          subscriptionId,
          newProductId: result.product_id,
          proration,
          nextBillingDate: result.next_billing_date,
          currentPeriodEnd: result.current_period_end,
        });

        return result;
      }
    } catch (error) {
      console.error('❌ Failed to change subscription plan:', error);
      throw new Error(`Failed to change subscription plan: ${error.message}`);
    }
  }

  /**
   * List all payments for the account
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of payment objects
   */
  async listPayments(options = {}) {
    try {
      console.log('Fetching all payments from Dodo Payments...');

      const allPayments = [];

      // Use SDK with pagination support
      try {
        for await (const payment of this.client.payments.list(options)) {
          allPayments.push(payment);
        }

        console.log('✓ Payments fetched via SDK:', {
          count: allPayments.length,
          hasSubscriptions: allPayments.some((p) => p.subscription_id),
        });

        return allPayments;
      } catch (sdkError) {
        console.error('SDK method failed, trying direct API call:', sdkError);

        // Fallback to direct API call with manual pagination
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await fetch(
            `${this.apiUrl}/payments?page=${page}&limit=100`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
              `Failed to fetch payments: ${response.status} - ${errorText}`
            );
          }

          const data = await response.json();

          if (data.payments && data.payments.length > 0) {
            allPayments.push(...data.payments);
            page++;
            hasMore = data.has_more || data.payments.length === 100;
          } else {
            hasMore = false;
          }
        }

        console.log('✓ Payments fetched via direct API call:', {
          count: allPayments.length,
          pages: page - 1,
        });

        return allPayments;
      }
    } catch (error) {
      console.error('❌ Failed to list payments:', error);
      throw new Error(`Failed to list payments: ${error.message}`);
    }
  }

  /**
   * Download invoice PDF for a payment
   * @param {string} paymentId - The payment ID to get invoice for
   * @returns {Promise<Blob>} PDF invoice as blob
   */
  async downloadInvoice(paymentId) {
    if (!paymentId) {
      throw new Error('Payment ID is required');
    }

    try {
      console.log('Downloading invoice for payment:', paymentId);

      // Try to use SDK first
      try {
        const invoice = await this.client.invoices.payments.retrieve(paymentId);
        const content = await invoice.blob();

        console.log('✓ Invoice downloaded via SDK:', {
          paymentId,
          contentType: content.type,
          size: content.size,
        });

        return content;
      } catch (sdkError) {
        console.error('SDK method failed, trying direct API call:', sdkError);

        // Fallback to direct API call
        const response = await fetch(
          `${this.apiUrl}/invoices/payments/${paymentId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to download invoice via direct API:', {
            status: response.status,
            statusText: response.statusText,
            error: errorText,
          });
          throw new Error(
            `Invoice download failed: ${response.status} ${response.statusText} - ${errorText}`
          );
        }

        const content = await response.blob();

        console.log('✓ Invoice downloaded via direct API call:', {
          paymentId,
          contentType: content.type,
          size: content.size,
        });

        return content;
      }
    } catch (error) {
      console.error('❌ Failed to download invoice:', error);
      throw new Error(`Failed to download invoice: ${error.message}`);
    }
  }

  /**
   * Find discount by code using list endpoint
   * @param {string} discountCode - The discount code to find
   * @returns {Promise<Object|null>} Discount object or null if not found
   */
  async findDiscountByCode(discountCode) {
    try {
      console.log('Finding discount by code:', discountCode);

      // Try SDK first - list all discounts and find by code
      try {
        for await (const discount of this.client.discounts.list()) {
          if (discount.code?.toUpperCase() === discountCode.toUpperCase()) {
            return discount;
          }
        }
        return null;
      } catch (sdkError) {
        console.error(
          'SDK list method failed, trying direct API call:',
          sdkError
        );

        // Fallback to direct API call
        const response = await fetch(`${this.apiUrl}/v1/discounts`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to list discounts: ${response.status}`);
        }

        const data = await response.json();
        const discounts = data.discounts || data.data || [];

        // Find discount by code
        return (
          discounts.find(
            (discount) =>
              discount.code?.toUpperCase() === discountCode.toUpperCase()
          ) || null
        );
      }
    } catch (error) {
      console.error('❌ Failed to find discount by code:', error);
      throw error;
    }
  }

  /**
   * Validate discount code using Dodo Payments API
   * @param {string} discountCode - The discount code to validate
   * @param {string} productId - The product ID to check discount eligibility
   * @returns {Promise<Object>} Discount validation result
   */
  async validateDiscount(discountCode, productId) {
    if (!discountCode) {
      throw new Error('Discount code is required');
    }

    try {
      console.log('Validating discount code:', { discountCode, productId });

      // Find discount by code first
      const discount = await this.findDiscountByCode(discountCode);

      if (!discount) {
        return {
          success: false,
          discount: null,
          error: 'Invalid discount code',
          isValid: false,
          reason: 'Discount code not found',
        };
      }

      console.log('✓ Discount found:', {
        discountId: discount.discount_id,
        code: discount.code,
        type: discount.type,
        amount: discount.amount,
        restrictedTo: discount.restricted_to,
        expiresAt: discount.expires_at,
        timesUsed: discount.times_used,
        usageLimit: discount.usage_limit,
      });

      // Validate discount eligibility
      const validation = this.validateDiscountEligibility(discount, productId);

      return {
        success: validation.isValid,
        discount: validation.isValid ? discount : null,
        error: validation.isValid ? null : validation.reason,
        ...validation,
      };
    } catch (error) {
      console.error('❌ Failed to validate discount:', error);
      return {
        success: false,
        discount: null,
        error: error.message || 'Failed to validate discount code',
        isValid: false,
        reason: 'Validation error',
      };
    }
  }

  /**
   * Validate discount eligibility for a specific product
   * @param {Object} discount - The discount object from Dodo API
   * @param {string} productId - The product ID to check against
   * @returns {Object} Validation result with isValid and reason
   */
  validateDiscountEligibility(discount, productId) {
    const now = new Date();

    // Check if discount is expired
    if (discount.expires_at && new Date(discount.expires_at) < now) {
      return {
        isValid: false,
        reason: 'Discount code has expired',
        code: 'EXPIRED',
      };
    }

    // Check usage limit
    if (discount.usage_limit && discount.times_used >= discount.usage_limit) {
      return {
        isValid: false,
        reason: 'Discount code usage limit reached',
        code: 'USAGE_LIMIT_REACHED',
      };
    }

    // Check if discount is restricted to specific products
    if (discount.restricted_to && discount.restricted_to.length > 0) {
      if (!discount.restricted_to.includes(productId)) {
        return {
          isValid: false,
          reason: 'Discount code is not valid for this product',
          code: 'PRODUCT_NOT_ELIGIBLE',
        };
      }
    }

    // Calculate discount amount for display
    let discountAmount = 0;
    let discountText = '';

    if (discount.type === 'percentage') {
      // Amount is in basis points (540 = 5.4%)
      const percentage = discount.amount / 100;
      discountText = `${percentage}% off`;
      discountAmount = percentage;
    } else if (discount.type === 'flat') {
      // Amount is in USD cents (100 = $1.00)
      discountAmount = discount.amount / 100;
      discountText = `$${discountAmount.toFixed(2)} off`;
    } else if (discount.type === 'flat_per_unit') {
      discountAmount = discount.amount / 100;
      discountText = `$${discountAmount.toFixed(2)} off per item`;
    }

    return {
      isValid: true,
      reason: 'Discount is valid',
      code: 'VALID',
      discountAmount,
      discountText,
      subscriptionCycles: discount.subscription_cycles,
    };
  }

  /**
   * Reactivate subscription using Dodo Payments API
   * Sets cancel_at_next_billing_date to false to continue billing
   */
  async reactivateSubscription(subscriptionId) {
    if (!subscriptionId) {
      throw new Error('Subscription ID is required');
    }

    try {
      console.log('Reactivating subscription:', subscriptionId);

      // Try to use SDK first
      try {
        const result = await this.client.subscriptions.update(subscriptionId, {
          cancel_at_next_billing_date: false,
        });

        console.log('✓ Subscription reactivated via SDK:', {
          subscriptionId,
          cancelAtNextBilling: result.cancel_at_next_billing_date,
          status: result.status,
          currentPeriodEnd: result.current_period_end,
        });

        return result;
      } catch (sdkError) {
        console.error('SDK method failed, trying direct API call:', sdkError);

        // Fallback to direct API call
        const response = await fetch(
          `${this.apiUrl}/subscriptions/${subscriptionId}`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cancel_at_next_billing_date: false,
              // This reactivates the subscription and continues billing
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to reactivate subscription via direct API:', {
            status: response.status,
            statusText: response.statusText,
            error: errorText,
          });
          throw new Error(
            `Reactivation failed: ${response.status} ${response.statusText} - ${errorText}`
          );
        }

        const result = await response.json();

        console.log('✓ Subscription reactivated via direct API call:', {
          subscriptionId,
          cancelAtNextBilling: result.cancel_at_next_billing_date,
          status: result.status,
          currentPeriodEnd: result.current_period_end,
        });

        return result;
      }
    } catch (error) {
      console.error('❌ Failed to reactivate subscription:', error);
      throw new Error(`Failed to reactivate subscription: ${error.message}`);
    }
  }
}

// Export singleton instance
export const dodoPaymentsService = new DodoPaymentsService();
