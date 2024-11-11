import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createSupabaseClient } from '@/Clients/supabase/server';

// Verify webhook signature from Dodo Payments
function verifyWebhookSignature(payload, signature, secret) {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload, 'utf8')
      .digest('hex');

    const providedSignature = signature.replace('sha256=', '');

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(providedSignature, 'hex')
    );
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

// Update user premium status in database
async function updateUserPremiumStatus(
  paymentData,
  subscriptionData,
  supabase
) {
  try {
    const customerEmail =
      paymentData.customer?.email || subscriptionData?.customer?.email;

    if (!customerEmail) {
      throw new Error('No customer email found in payment/subscription data');
    }

    // Get user data by email
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select('username, email')
      .eq('email', customerEmail)
      .single();

    if (userError || !userData) {
      console.error('Error fetching user data:', userError);
      throw new Error('User not found');
    }

    // Determine subscription details
    const isSubscription = !!subscriptionData;
    const subscriptionCycle = subscriptionData?.billing_cycle || 'monthly';
    const amount = paymentData?.amount || subscriptionData?.amount || 0;
    const currency =
      paymentData?.currency || subscriptionData?.currency || 'USD';

    // Calculate subscription period
    const currentPeriodStart = new Date().toISOString();
    const currentPeriodEnd = new Date();

    if (subscriptionCycle === 'yearly') {
      currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1);
    } else {
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
    }

    // Create billing info record
    const billingInfo = {
      username: userData.username,
      subscription_id: subscriptionData?.id || paymentData?.id,
      email: customerEmail,
      phone: paymentData?.customer?.phone || '',
      amount: parseFloat(amount) / 100, // Convert from cents
      currency: currency,
      billing_cycle: subscriptionCycle,
      billing_address: null,
      current_period_start: currentPeriodStart,
      current_period_end: currentPeriodEnd.toISOString(),
      payment_method: paymentData?.payment_method || 'card',
      next_payment_attempt: currentPeriodEnd.toISOString(),
      meta_data: {
        dodo_payment_id: paymentData?.id,
        dodo_subscription_id: subscriptionData?.id,
        payment_status: paymentData?.status,
        provider: 'dodo_payments',
        raw_payment_data: paymentData,
        raw_subscription_data: subscriptionData,
      },
      created_at: currentPeriodStart,
    };

    // Update user premium status
    const { error: updateUserError } = await supabase
      .from('user_data')
      .update({ is_premium: true })
      .eq('username', userData.username);

    if (updateUserError) {
      console.error('Error updating user premium status:', updateUserError);
      throw new Error(
        `Failed to update user premium status: ${updateUserError.message}`
      );
    }

    // Insert billing info
    const { error: insertError } = await supabase
      .from('billing_info')
      .insert([billingInfo]);

    if (insertError) {
      console.error('Error inserting billing info:', insertError);
      throw new Error(`Failed to insert billing info: ${insertError.message}`);
    }

    return {
      success: true,
      billingInfo,
      isSubscription,
      subscriptionCycle,
      expiryDate: currentPeriodEnd.toISOString(),
    };
  } catch (error) {
    console.error('Error updating user premium status:', error);
    throw error;
  }
}

// Handle subscription cancellation
async function handleSubscriptionCancellation(subscriptionData, supabase) {
  try {
    const customerEmail = subscriptionData?.customer?.email;

    if (!customerEmail) {
      throw new Error('No customer email found in subscription data');
    }

    // Get user data by email
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select('username')
      .eq('email', customerEmail)
      .single();

    if (userError || !userData) {
      console.error('Error fetching user data:', userError);
      throw new Error('User not found');
    }

    // Update user premium status to false
    const { error: updateError } = await supabase
      .from('user_data')
      .update({ is_premium: false })
      .eq('username', userData.username);

    if (updateError) {
      console.error('Error removing user premium status:', updateError);
      throw new Error(
        `Failed to remove premium status: ${updateError.message}`
      );
    }

    // Update billing info to mark as cancelled
    const { error: billingError } = await supabase
      .from('billing_info')
      .update({
        current_period_end: new Date().toISOString(),
        meta_data: {
          ...subscriptionData,
          status: 'cancelled',
          cancelled_at: new Date().toISOString(),
        },
      })
      .eq('subscription_id', subscriptionData.id);

    if (billingError) {
      console.error(
        'Error updating billing info for cancellation:',
        billingError
      );
    }

    return { success: true };
  } catch (error) {
    console.error('Error handling subscription cancellation:', error);
    throw error;
  }
}

export async function POST(req) {
  console.log('[DodoPayments Webhook] Received webhook request');
  console.log(
    '[DodoPayments Webhook] Headers:',
    Object.fromEntries(req.headers.entries())
  );

  try {
    const body = await req.text();
    console.log('[DodoPayments Webhook] Raw body:', body);

    // Try multiple possible signature header names
    const signature =
      req.headers.get('dodo-signature') ||
      req.headers.get('webhook-signature') ||
      req.headers.get('x-dodo-signature') ||
      req.headers.get('x-webhook-signature');

    console.log('[DodoPayments Webhook] Found signature:', !!signature);

    // Verify webhook signature
    const webhookSecret = process.env.DODO_PAYMENTS_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Webhook secret not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    if (!signature || !verifyWebhookSignature(body, signature, webhookSecret)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);
    console.log('Received Dodo Payments webhook:', event.type, event.id);

    const supabase = await createSupabaseClient();

    switch (event.type) {
      case 'payment.succeeded':
        try {
          await updateUserPremiumStatus(
            event.data.payment,
            event.data.subscription,
            supabase
          );
          console.log('Successfully processed payment.succeeded event');
        } catch (error) {
          console.error('Error processing payment.succeeded:', error);
          return NextResponse.json(
            { error: 'Failed to process payment' },
            { status: 500 }
          );
        }
        break;

      case 'subscription.created':
        try {
          await updateUserPremiumStatus(
            event.data.payment,
            event.data.subscription,
            supabase
          );
          console.log('Successfully processed subscription.created event');
        } catch (error) {
          console.error('Error processing subscription.created:', error);
          return NextResponse.json(
            { error: 'Failed to process subscription' },
            { status: 500 }
          );
        }
        break;

      case 'subscription.renewed':
        try {
          await updateUserPremiumStatus(
            event.data.payment,
            event.data.subscription,
            supabase
          );
          console.log('Successfully processed subscription.renewed event');
        } catch (error) {
          console.error('Error processing subscription.renewed:', error);
          return NextResponse.json(
            { error: 'Failed to process renewal' },
            { status: 500 }
          );
        }
        break;

      case 'subscription.cancelled':
        try {
          await handleSubscriptionCancellation(
            event.data.subscription,
            supabase
          );
          console.log('Successfully processed subscription.cancelled event');
        } catch (error) {
          console.error('Error processing subscription.cancelled:', error);
          return NextResponse.json(
            { error: 'Failed to process cancellation' },
            { status: 500 }
          );
        }
        break;

      case 'payment.failed':
        console.log(
          'Payment failed for customer:',
          event.data.payment?.customer?.email
        );
        // You might want to send an email notification or update user status
        break;

      default:
        console.log('Unhandled webhook event type:', event.type);
        break;
    }

    return NextResponse.json({ success: true, processed: event.type });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
