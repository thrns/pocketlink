import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';
import {
  dodoPaymentsService,
  determineSubscriptionTier,
} from '@/lib/dodo-payments-utils';
import { getPlanAmountInCents, PLAN_PRICING } from '@/constants/pricing';

export async function POST(req) {
  try {
    const {
      planType,
      billingCycle,
      proration = 'immediate_and_charge',
    } = await req.json();

    const supabase = await createSupabaseClient();

    // Get user from Supabase auth
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

    // Validate input
    if (!planType || !billingCycle) {
      return NextResponse.json(
        { error: 'planType and billingCycle are required' },
        { status: 400 }
      );
    }

    if (!['starter', 'business'].includes(planType)) {
      return NextResponse.json(
        { error: 'Invalid plan type. Must be "starter" or "business"' },
        { status: 400 }
      );
    }

    if (!['monthly', 'yearly'].includes(billingCycle)) {
      return NextResponse.json(
        { error: 'Invalid billing cycle. Must be "monthly" or "yearly"' },
        { status: 400 }
      );
    }

    // Get user's current subscription
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select(
        `
        username,
        email,
        subscription_tier,
        subscription_status,
        subscription_end_date,
        cancelled_at,
        cancel_at_period_end,
        dodo_subscription_id
      `
      )
      .eq('email', user.email)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User data not found' },
        { status: 404 }
      );
    }

    if (!userData.dodo_subscription_id) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 400 }
      );
    }

    if (userData.subscription_status !== 'active') {
      return NextResponse.json(
        { error: 'Subscription is not active' },
        { status: 400 }
      );
    }

    // Check if user is trying to change to the same plan
    if (userData.subscription_tier === planType) {
      return NextResponse.json(
        { error: `You are already on the ${planType} plan` },
        { status: 400 }
      );
    }

    // Determine the new product ID
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

    const newProductId = PRODUCT_IDS[planType]?.[billingCycle];

    if (!newProductId) {
      return NextResponse.json(
        { error: 'Product configuration error' },
        { status: 500 }
      );
    }

    // Determine if this is an upgrade or downgrade
    const currentTierValue = userData.subscription_tier === 'business' ? 2 : 1;
    const newTierValue = planType === 'business' ? 2 : 1;
    const isUpgrade = newTierValue > currentTierValue;
    const isDowngrade = newTierValue < currentTierValue;

    // Block downgrades - only allow upgrades
    if (isDowngrade) {
      return NextResponse.json(
        {
          error:
            'Downgrades are not available. Please contact support for assistance with plan changes.',
        },
        { status: 400 }
      );
    }

    // Set appropriate proration behavior for upgrades
    let prorationBehavior = proration;
    if (isUpgrade) {
      // For upgrades, charge immediately with proration
      prorationBehavior = 'prorated_immediately';
    }

    // Change subscription plan via Dodo Payments service
    try {
      const changedSubscription = await dodoPaymentsService.changePlan(
        userData.dodo_subscription_id,
        newProductId,
        prorationBehavior
      );

      console.log('Subscription plan changed via Dodo Payments:', {
        subscriptionId: userData.dodo_subscription_id,
        fromTier: userData.subscription_tier,
        toTier: planType,
        fromProduct: userData.product_id,
        toProduct: newProductId,
        proration: prorationBehavior,
        isUpgrade,
        isDowngrade,
        paymentId:
          changedSubscription.payment_id ||
          changedSubscription.latest_payment_id,
        response: changedSubscription,
      });

      // Update user's subscription tier in database
      const { error: updateError } = await supabase
        .from('user_data')
        .update({
          subscription_tier: planType,
          // Reset cancellation if they were scheduled for cancellation
          cancel_at_period_end: false,
          cancelled_at: null,
        })
        .eq('username', userData.username);

      if (updateError) {
        console.error('Error updating user plan in database:', updateError);
        // Continue - webhook will handle the update as backup
        console.log(
          '⚠️ API failed to update user data - webhook will handle as backup'
        );
      } else {
        console.log('✅ API successfully updated user data immediately');
      }

      // Note: Billing details will be created by webhook when payment.succeeded event arrives
      console.log(
        '✓ Plan change initiated - billing details will be created by webhook'
      );

      // Log plan change for analytics
      console.log('Subscription plan change processed:', {
        userId: user.uuid,
        username: userData.username,
        subscriptionId: userData.dodo_subscription_id,
        changetype: isUpgrade ? 'upgrade' : 'change',
        fromTier: userData.subscription_tier,
        toTier: planType,
        fromCycle: 'unknown', // Could be determined from current product
        toCycle: billingCycle,
        proration: prorationBehavior,
        changedAt: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: `Successfully ${isUpgrade ? 'upgraded' : 'changed'} to ${planType} plan`,
        subscription_id: userData.dodo_subscription_id,
        changed_at: new Date().toISOString(),
        change_type: isUpgrade ? 'upgrade' : 'change',
        old_tier: userData.subscription_tier,
        new_tier: planType,
        new_billing_cycle: billingCycle,
        proration_behavior: prorationBehavior,
        effective_date: new Date().toISOString(),
        details: {
          immediate_change: true,
          next_billing_date: changedSubscription.next_billing_date,
          current_period_end: changedSubscription.current_period_end,
        },
      });
    } catch (dodoError) {
      console.error(
        'Error changing subscription plan with Dodo Payments:',
        dodoError
      );
      return NextResponse.json(
        {
          error:
            'Failed to change subscription plan. Please try again or contact support.',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing subscription plan change:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
