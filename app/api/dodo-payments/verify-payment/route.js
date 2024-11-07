import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';
import {
  dodoPaymentsService,
  determineSubscriptionTier,
} from '@/lib/dodo-payments-utils';

export async function POST(req) {
  console.log('[DodoPayments Verify] Starting payment verification...');
  try {
    const { subscription_id } = await req.json();
    console.log('[DodoPayments Verify] Subscription ID:', subscription_id);

    if (!subscription_id) {
      console.log('[DodoPayments Verify] Missing subscription_id');
      return NextResponse.json(
        { success: false, message: 'Missing subscription_id' },
        { status: 400 }
      );
    }

    // Get subscription from Dodo Payments using service
    console.log(
      '[DodoPayments Verify] Fetching subscription:',
      subscription_id
    );
    const subscription =
      await dodoPaymentsService.getSubscription(subscription_id);
    console.log('[DodoPayments Verify] Subscription data:', subscription);

    if (!subscription) {
      return NextResponse.json(
        { success: false, message: 'Subscription not found' },
        { status: 404 }
      );
    }

    // Verify subscription is active
    if (subscription.status !== 'active') {
      console.log(
        '[DodoPayments Verify] Subscription not active. Status:',
        subscription.status
      );
      return NextResponse.json(
        {
          success: false,
          message: 'Subscription is not active',
          status: subscription.status,
        },
        { status: 400 }
      );
    }

    // Get customer email from subscription
    const customerEmail = subscription.customer?.email;
    if (!customerEmail) {
      return NextResponse.json(
        { success: false, message: 'No customer email found in subscription' },
        { status: 400 }
      );
    }

    // Update user_data and billing_info
    const supabase = await createSupabaseClient();
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select('username, email, subscription_tier, subscription_status')
      .eq('email', customerEmail)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Determine subscription details from product ID
    const productId = subscription.product_id;
    const { tier, cycle } = determineSubscriptionTier(productId);

    const amount = subscription.recurring_pre_tax_amount || 0;
    const currency = subscription.currency || 'USD';

    // Calculate subscription period using DodoPayments field names
    const currentPeriodStart = new Date(
      subscription.previous_billing_date || new Date()
    ).toISOString();
    const currentPeriodEnd = new Date(
      subscription.next_billing_date
    ).toISOString();

    // Subscriptions are always active (no trials)
    const subscriptionStatus = 'active';
    const subscriptionStartDate = currentPeriodStart;
    const subscriptionEndDate = currentPeriodEnd;

    // Update user data with subscription information (no trials)
    const userUpdateData = {
      is_premium: true,
      subscription_tier: tier,
      subscription_status: subscriptionStatus,
      subscription_start_date: subscriptionStartDate,
      subscription_end_date: subscriptionEndDate,
      cancelled_at: null,
      cancel_at_period_end: false,
      dodo_subscription_id: subscription.subscription_id || subscription.id,
      dodo_customer_id: subscription.customer?.customer_id,
    };

    console.log('[DodoPayments Verify] Raw subscription object:', subscription);
    console.log('[DodoPayments Verify] Customer data:', subscription.customer);
    console.log(
      '[DodoPayments Verify] Customer ID:',
      subscription.customer?.customer_id
    );

    console.log('[DodoPayments Verify] Updating user subscription:', {
      username: userData.username,
      tier,
      cycle,
      status: subscriptionStatus,
      subscriptionStartDate,
      subscriptionEndDate,
      dodoCustomerId: subscription.customer?.id,
    });

    // Update user premium status and all subscription columns
    const { error: updateUserError } = await supabase
      .from('user_data')
      .update(userUpdateData)
      .eq('username', userData.username);

    if (updateUserError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to update user subscription',
          details: updateUserError.message,
        },
        { status: 500 }
      );
    }

    // Insert billing info
    const billingInfo = {
      username: userData.username,
      subscription_id: subscription.subscription_id || subscription.id,
      email: customerEmail,
      phone: subscription.customer?.phone || '',
      amount: parseFloat(amount) / 100, // Convert from cents
      currency: currency,
      billing_cycle: cycle,
      billing_address: null,
      current_period_start: currentPeriodStart,
      current_period_end: currentPeriodEnd,
      payment_method:
        subscription.payment_method ||
        subscription.payment_method_type ||
        'credit',
      next_payment_attempt: currentPeriodEnd,
      meta_data: {
        dodo_subscription_id: subscription.subscription_id || subscription.id,
        provider: 'dodo_payments',
        subscription_tier: tier,
        billing_cycle: cycle,
        is_trial: 'false', // Subscriptions don't have trials
        raw_subscription_data: subscription,
      },
      created_at: new Date().toISOString(),
    };

    // Note: Billing details will be created by payment.succeeded webhook
    console.log(
      '✓ Payment verification completed - billing details handled by webhook'
    );

    console.log(
      '[DodoPayments Verify] Payment verification completed successfully'
    );
    return NextResponse.json({
      success: true,
      message: 'Subscription verified and premium activated',
      subscription: {
        tier,
        cycle,
        status: subscriptionStatus,
        is_trial: 'false', // Subscriptions don't have trials
        expires_at: subscriptionEndDate,
      },
    });
  } catch (error) {
    console.error('Error verifying Dodo subscription:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
