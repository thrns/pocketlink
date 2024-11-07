import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';
import {
  dodoPaymentsService,
  validateCheckoutEligibility,
} from '@/lib/dodo-payments-utils';

export async function POST(req) {
  console.log('[DodoPayments CreateCheckout] Starting checkout creation...');
  try {
    const supabase = await createSupabaseClient();

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();

    const {
      // Support both old format (plan_type) and new format (planType + billingCycle)
      plan_type,
      planType,
      billingCycle = 'monthly',
      productId: providedProductId,
      success_url,
      successUrl,
      cancel_url,
      cancelUrl,
      customer,
      billingAddress,
      discountCode,
      // Removed trialPeriodDays - subscriptions don't offer trials
      metadata = {},
    } = body;

    // Determine plan type and billing cycle
    let finalPlanType, finalBillingCycle;

    if (planType && billingCycle) {
      // New format: separate planType and billingCycle
      finalPlanType = planType;
      finalBillingCycle = billingCycle;
    } else if (plan_type) {
      // Legacy format: combined plan_type
      if (plan_type.includes('_')) {
        const [tier, cycle] = plan_type.split('_');
        finalPlanType = tier;
        finalBillingCycle = cycle;
      } else {
        finalPlanType = plan_type;
        finalBillingCycle = 'monthly';
      }
    } else {
      return NextResponse.json(
        {
          error:
            'Missing plan information. Provide either planType+billingCycle or plan_type',
        },
        { status: 400 }
      );
    }

    // Validate plan type and billing cycle
    if (!['starter', 'business'].includes(finalPlanType)) {
      return NextResponse.json(
        { error: 'Invalid plan type. Must be "starter" or "business"' },
        { status: 400 }
      );
    }

    if (!['monthly', 'yearly'].includes(finalBillingCycle)) {
      return NextResponse.json(
        { error: 'Invalid billing cycle. Must be "monthly" or "yearly"' },
        { status: 400 }
      );
    }

    // Get user data from database
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select(
        `
        username,
        email,
        subscription_tier,
        subscription_status,
        subscription_start_date,
        subscription_end_date,
        cancelled_at,
        cancel_at_period_end,
        dodo_subscription_id,
        dodo_customer_id
      `
      )
      .eq('email', user.email)
      .single();

    if (userError || !userData) {
      console.error(
        '[DodoPayments CreateCheckout] User not found in user_data:',
        userError
      );
      return NextResponse.json(
        { error: 'User profile not found. Please complete setup first.' },
        { status: 404 }
      );
    }

    console.log('[DodoPayments CreateCheckout] User data:', {
      username: userData.username,
      currentTier: userData.subscription_tier,
      status: userData.subscription_status,
      hasSubscriptionId: !!userData.dodo_subscription_id,
    });

    // Check if user has existing active subscription
    if (userData.dodo_subscription_id) {
      try {
        const existingSubscription = await dodoPaymentsService.getSubscription(
          userData.dodo_subscription_id
        );

        if (existingSubscription && existingSubscription.status === 'active') {
          // Check if subscription is effectively active (not expired)
          const currentDate = new Date();
          const periodEndDate = existingSubscription.current_period_end
            ? new Date(existingSubscription.current_period_end)
            : null;

          const isEffectivelyActive =
            !periodEndDate || currentDate < periodEndDate;

          if (isEffectivelyActive) {
            console.log(
              '[DodoPayments CreateCheckout] User has active subscription:',
              {
                subscriptionId: userData.dodo_subscription_id,
                status: existingSubscription.status,
                currentPeriodEnd: existingSubscription.current_period_end,
              }
            );

            return NextResponse.json(
              {
                error: 'You already have an active subscription',
                subscription_status: existingSubscription.status,
                subscription_tier: userData.subscription_tier,
                current_period_end: existingSubscription.current_period_end,
                details: existingSubscription.cancel_at_next_billing_date
                  ? 'Your subscription is marked for cancellation but still active until the current period ends'
                  : 'You have an active subscription',
              },
              { status: 400 }
            );
          }
        }
      } catch (error) {
        console.warn(
          '[DodoPayments CreateCheckout] Error verifying existing subscription:',
          error
        );
        // Continue with checkout creation if we can't verify the existing subscription
      }
    }

    // Validate checkout eligibility
    const eligibilityCheck = validateCheckoutEligibility(
      userData,
      finalPlanType
    );
    if (!eligibilityCheck.eligible) {
      console.log(
        '[DodoPayments CreateCheckout] User not eligible:',
        eligibilityCheck
      );
      return NextResponse.json(
        {
          error: eligibilityCheck.reason,
          code: eligibilityCheck.code,
          current_subscription: {
            tier: userData.subscription_tier,
            status: userData.subscription_status,
          },
        },
        { status: 400 }
      );
    }

    // Subscriptions don't offer trials - removed trial eligibility check

    // Determine product ID based on plan type and billing cycle
    let productId;

    // Use provided product ID if available, otherwise determine from plan and cycle
    if (providedProductId) {
      productId = providedProductId;
    } else {
      // Product ID mapping
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

      productId = PRODUCT_IDS[finalPlanType]?.[finalBillingCycle];
    }

    if (!productId) {
      console.error(
        '[DodoPayments CreateCheckout] Product ID not configured for plan:',
        {
          planType: finalPlanType,
          billingCycle: finalBillingCycle,
        }
      );
      return NextResponse.json(
        { error: 'Product configuration error' },
        { status: 500 }
      );
    }

    // Subscriptions don't offer trials
    console.log(
      '[DodoPayments CreateCheckout] Subscriptions have no trial period'
    );

    // Prepare customer and billing info
    const baseUrl =
      req.headers.get('origin') ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'http://localhost:3000';

    const checkoutData = {
      productId,
      planType: finalPlanType,
      billingCycle: finalBillingCycle,
      // trialPeriodDays removed - subscriptions don't offer trials
      customer: customer || {
        email: user.email,
        username: userData.username,
        name: userData.username,
      },
      billingAddress: billingAddress, // Pass billing address to Dodo service
      discountCode: discountCode, // Pass discount code to Dodo service
      successUrl:
        successUrl ||
        success_url ||
        `${baseUrl}/purchase-premium/success?source=dodo_checkout`,
      cancelUrl: cancelUrl || cancel_url || `${baseUrl}/pricing`,
      quantity: 1,
      metadata: {
        user_id: userData.username,
        plan_type: finalPlanType,
        billing_cycle: finalBillingCycle,
        source: 'pocketlink_web',
        trial_eligible: 'false', // Subscriptions don't offer trials
        ...(discountCode && { discount_code: discountCode }),
        ...metadata,
      },
    };

    console.log('[DodoPayments CreateCheckout] Creating checkout with data:', {
      productId,
      planType: finalPlanType,
      billingCycle: finalBillingCycle,
      // trialPeriodDays removed - subscriptions don't offer trials
      customerEmail: user.email,
      trialEligible: 'false',
    });

    // Create checkout session
    const checkoutResult =
      await dodoPaymentsService.createSubscriptionCheckout(checkoutData);

    console.log(
      '[DodoPayments CreateCheckout] Checkout created successfully:',
      {
        subscriptionId: checkoutResult.subscriptionId,
        paymentLink: checkoutResult.paymentLink,
        expiresAt: checkoutResult.expiresAt,
      }
    );

    return NextResponse.json({
      success: true,
      paymentLink: checkoutResult.paymentLink, // Frontend expects paymentLink
      checkout_url: checkoutResult.paymentLink, // Legacy field
      subscription_id: checkoutResult.subscriptionId,
      expires_at: checkoutResult.expiresAt,
      trial_eligible: 'false', // Subscriptions don't offer trials
      plan_details: {
        tier: finalPlanType,
        cycle: finalBillingCycle,
        product_id: productId,
      },
    });
  } catch (error) {
    console.error('[DodoPayments CreateCheckout] Error:', error);

    // Handle Dodo Payments API errors
    if (error && typeof error === 'object' && 'status' in error) {
      return NextResponse.json(
        {
          error: 'message' in error ? error.message : 'Payment service error',
          code: 'code' in error ? error.code : 'PAYMENT_ERROR',
        },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session', message: error.message },
      { status: 500 }
    );
  }
}
