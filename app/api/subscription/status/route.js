import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';
import {
  getSubscriptionDisplayInfo,
  canAccessPremiumFeatures,
} from '@/lib/dodo-payments-utils';

export async function GET(req) {
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

    // Get user data with comprehensive subscription information
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select(
        `
        username,
        email,
        is_premium,
        subscription_tier,
        subscription_status,
        trial_used,
        trial_start_date,
        trial_end_date,
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

    if (userError) {
      console.error('Error fetching user data:', userError);
      return NextResponse.json(
        { error: 'User data not found' },
        { status: 404 }
      );
    }

    // Get subscription display information using utility function
    const displayInfo = getSubscriptionDisplayInfo(userData);

    // Build comprehensive status response
    const response = {
      user_id: user.uuid,
      username: userData.username,
      email: userData.email,

      // Access information
      can_access_premium: displayInfo.canAccess,
      is_premium: userData.is_premium,

      // Subscription details
      subscription_tier: displayInfo.tier,
      subscription_status: displayInfo.status,
      subscription_id: userData.dodo_subscription_id,

      // Trial information
      trial_used: displayInfo.hasUsedTrial,
      trial_start_date: userData.trial_start_date,
      trial_end_date: userData.trial_end_date,
      is_trialing: displayInfo.isTrialing,

      // Subscription dates
      subscription_start_date: userData.subscription_start_date,
      subscription_end_date: userData.subscription_end_date,
      expires_at: displayInfo.expiresAt,
      days_remaining: displayInfo.daysRemaining,

      // Cancellation information
      is_cancelled: displayInfo.isCancelled,
      cancelled_at: userData.cancelled_at,
      cancel_at_period_end: userData.cancel_at_period_end,

      // Display information
      display: {
        status_text: getStatusText(displayInfo),
        tier_name: getTierDisplayName(displayInfo.tier),
        can_cancel: displayInfo.canAccess && !displayInfo.isCancelled,
        can_reactivate: displayInfo.isCancelled && displayInfo.canAccess,
        show_upgrade: displayInfo.tier === 'starter' && displayInfo.canAccess,
      },
    };

    console.log('Subscription status retrieved:', {
      userId: user.uuid,
      tier: displayInfo.tier,
      status: displayInfo.status,
      canAccess: displayInfo.canAccess,
      isTrialing: displayInfo.isTrialing,
      daysRemaining: displayInfo.daysRemaining,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error retrieving subscription status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper functions for display text
function getStatusText(displayInfo) {
  if (displayInfo.status === 'trial') {
    return `Trial - ${displayInfo.daysRemaining} days remaining`;
  } else if (displayInfo.status === 'active') {
    return 'Active subscription';
  } else if (displayInfo.status === 'active_until') {
    return `Active until ${new Date(displayInfo.expiresAt).toLocaleDateString()}`;
  } else {
    return 'Free plan';
  }
}

function getTierDisplayName(tier) {
  if (tier === 'starter') return 'Starter';
  if (tier === 'business') return 'Business';
  return 'Free';
}
