import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';

export async function POST(req) {
  try {
    // Import utilities with error handling
    let validateCheckoutEligibility, hasActiveSubscription;
    try {
      const utils = await import('@/lib/dodo-payments-utils');
      validateCheckoutEligibility = utils.validateCheckoutEligibility;
      hasActiveSubscription = utils.hasActiveSubscription;
    } catch (importError) {
      console.error('Failed to import dodo-payments-utils:', importError);
      return NextResponse.json(
        {
          error: 'Service temporarily unavailable',
          details: importError.message,
        },
        { status: 503 }
      );
    }

    const { tier } = await req.json();

    if (!tier || !['starter', 'business'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier specified' },
        { status: 400 }
      );
    }

    let supabase;
    try {
      supabase = await createSupabaseClient();
    } catch (supabaseError) {
      console.error('Failed to create Supabase client:', supabaseError);
      return NextResponse.json(
        {
          error: 'Database service unavailable',
          details: supabaseError.message,
        },
        { status: 503 }
      );
    }

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

    // Get user data with subscription information
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
        dodo_subscription_id
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

    // Validate checkout eligibility
    const validation = validateCheckoutEligibility(userData, tier);

    if (!validation.eligible) {
      let statusCode = 400;

      if (validation.code === 'ACTIVE_SUBSCRIPTION') {
        statusCode = 409; // Conflict
      }

      return NextResponse.json(
        {
          eligible: false,
          reason: validation.reason,
          code: validation.code,
          current_tier: userData.subscription_tier,
          current_status: userData.subscription_status,
          subscription_end_date: userData.subscription_end_date,
        },
        { status: statusCode }
      );
    }

    // Return eligibility confirmation with additional info
    const response = {
      eligible: true,
      reason: validation.reason,
      trial_eligible: 'false', // Subscriptions don't offer trials
      requested_tier: tier,
      current_tier: userData.subscription_tier || 'free',
      current_status: userData.subscription_status,
      has_used_trial: true, // All users are considered to have used trial (no trials for subscriptions)
      can_start_trial: false, // Subscriptions don't offer trials
      recommendations: {
        use_trial: false, // No trials for subscriptions
        trial_period_days: 14, // Legacy field for compatibility
      },
    };

    console.log('Checkout validation completed:', {
      userId: user.uuid,
      email: user.email,
      requestedTier: tier,
      result: response,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error validating checkout eligibility:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
