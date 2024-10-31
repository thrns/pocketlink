import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';
import { dodoPaymentsService } from '@/lib/dodo-payments-utils';

export async function POST(req) {
  try {
    const { reason } = await req.json();

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

    if (userData.cancel_at_period_end) {
      return NextResponse.json(
        { error: 'Subscription is already scheduled for cancellation' },
        { status: 400 }
      );
    }

    // Cancel subscription via Dodo Payments service
    try {
      const cancelledSubscription =
        await dodoPaymentsService.cancelSubscription(
          userData.dodo_subscription_id
        );

      console.log('Subscription cancelled via Dodo Payments:', {
        subscriptionId: userData.dodo_subscription_id,
        cancelAtPeriodEnd: cancelledSubscription.cancel_at_next_billing_date,
        currentPeriodEnd: cancelledSubscription.current_period_end,
      });

      // Update user's subscription status in database
      const { error: updateError } = await supabase
        .from('user_data')
        .update({
          cancel_at_period_end: true,
          cancelled_at: new Date().toISOString(),
        })
        .eq('username', userData.username);

      if (updateError) {
        console.error('Error updating user cancellation status:', updateError);
        // Don't fail the request - webhook will handle this
      }

      // Log cancellation for analytics
      console.log('Subscription cancellation processed:', {
        userId: user.uuid,
        username: userData.username,
        subscriptionId: userData.dodo_subscription_id,
        reason: reason || 'No reason provided',
        accessUntil: userData.subscription_end_date,
      });

      return NextResponse.json({
        success: true,
        message: 'Subscription cancelled successfully',
        subscription_id: userData.dodo_subscription_id,
        cancelled_at: new Date().toISOString(),
        access_until: userData.subscription_end_date,
        details: {
          will_lose_access_on: userData.subscription_end_date,
          can_reactivate_until: userData.subscription_end_date,
          billing_continues_until: userData.subscription_end_date,
        },
      });
    } catch (dodoError) {
      console.error(
        'Error cancelling subscription with Dodo Payments:',
        dodoError
      );
      return NextResponse.json(
        {
          error:
            'Failed to cancel subscription. Please try again or contact support.',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing subscription cancellation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
