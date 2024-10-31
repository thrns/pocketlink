import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';
import { dodoPaymentsService } from '@/lib/dodo-payments-utils';

export async function POST(req) {
  try {
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
        dodo_subscription_id,
        cancel_at_period_end
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
        { error: 'No subscription found' },
        { status: 400 }
      );
    }

    if (!userData.cancel_at_period_end) {
      return NextResponse.json(
        { error: 'Subscription is not scheduled for cancellation' },
        { status: 400 }
      );
    }

    // Check if we're still within the current period
    if (userData.subscription_end_date) {
      const currentPeriodEnd = new Date(userData.subscription_end_date);
      const now = new Date();

      if (now > currentPeriodEnd) {
        return NextResponse.json(
          {
            error: 'Subscription period has ended, cannot reactivate',
            expired_on: userData.subscription_end_date,
          },
          { status: 400 }
        );
      }
    }

    // Reactivate subscription via Dodo Payments service
    try {
      const reactivatedSubscription =
        await dodoPaymentsService.reactivateSubscription(
          userData.dodo_subscription_id
        );

      console.log('Subscription reactivated via Dodo Payments:', {
        subscriptionId: userData.dodo_subscription_id,
        cancelAtPeriodEnd: reactivatedSubscription.cancel_at_next_billing_date,
        currentPeriodEnd: reactivatedSubscription.current_period_end,
      });

      // Update user's subscription status in database
      const { error: updateError } = await supabase
        .from('user_data')
        .update({
          cancel_at_period_end: false,
          cancelled_at: null,
        })
        .eq('username', userData.username);

      if (updateError) {
        console.error('Error updating user reactivation status:', updateError);
        // Don't fail the request - webhook will handle this
      }

      // Log reactivation for analytics
      console.log('Subscription reactivation processed:', {
        userId: user.uuid,
        username: userData.username,
        subscriptionId: userData.dodo_subscription_id,
        reactivatedAt: new Date().toISOString(),
        currentPeriodEnd: userData.subscription_end_date,
      });

      return NextResponse.json({
        success: true,
        message: 'Subscription reactivated successfully',
        subscription_id: userData.dodo_subscription_id,
        reactivated_at: new Date().toISOString(),
        current_period_end: userData.subscription_end_date,
        details: {
          access_restored: true,
          next_billing_date: userData.subscription_end_date,
          billing_will_continue: true,
        },
      });
    } catch (dodoError) {
      console.error(
        'Error reactivating subscription with Dodo Payments:',
        dodoError
      );
      return NextResponse.json(
        {
          error:
            'Failed to reactivate subscription. Please try again or contact support.',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing subscription reactivation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
