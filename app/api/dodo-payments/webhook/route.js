import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';
import { Webhook } from 'standardwebhooks';
import { randomUUID } from 'crypto';
import { paymentSuccess } from '@/constants/emailTemplates/paymentSuccess';
import { paymentFailure } from '@/constants/emailTemplates/paymentFailure';
import { paymentRenewal } from '@/constants/emailTemplates/paymentRenewal';

// Send email notification using email-server table
async function sendPaymentEmail(
  emailType,
  userData,
  paymentData,
  subscriptionData,
  supabase
) {
  try {
    let emailTemplate,
      subject,
      templateVars = {};

    // Prepare common variables
    const userName = userData.name || userData.username || 'there';
    const userEmail = userData.email;
    const amount = paymentData?.amount || paymentData?.total_amount || 0;
    const currency = (paymentData?.currency || 'USD').toUpperCase();
    const planName = userData.subscription_tier || 'Premium';
    const paymentMethod =
      paymentData?.payment_method_type ||
      paymentData?.payment_method ||
      'Credit Card';
    const paymentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    switch (emailType) {
      case 'success':
        emailTemplate = paymentSuccess;
        subject = 'Payment Successful - PocketLink';
        templateVars = {
          userName,
          paymentType: subscriptionData?.id ? 'subscription' : 'one-time',
          confirmationMessage: subscriptionData?.id
            ? `Your ${planName} subscription is now active and ready to use.`
            : 'Your payment has been processed successfully.',
          transactionId: paymentData?.id || paymentData?.payment_id || 'N/A',
          paymentDate,
          planName: planName.charAt(0).toUpperCase() + planName.slice(1),
          billingPeriod: subscriptionData?.current_period_end
            ? getDurationText(
                subscriptionData.current_period_start,
                subscriptionData.current_period_end
              )
            : 'One-time',
          paymentMethod,
          amount: formatAmount(amount),
          currency,
          subscriptionStatus: 'active',
          nextBillingDate: subscriptionData?.current_period_end
            ? new Date(subscriptionData.current_period_end).toLocaleDateString(
                'en-US',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              )
            : null,
        };
        break;

      case 'failure':
        emailTemplate = paymentFailure;
        subject = 'Payment Update Required - PocketLink';
        const isRenewal = paymentData?.subscription_id;
        templateVars = {
          userName,
          paymentType: isRenewal ? 'subscription renewal' : 'subscription',
          planName: planName.charAt(0).toUpperCase() + planName.slice(1),
          amount: formatAmount(amount),
          currency,
          paymentDate,
          failureReason:
            paymentData?.failure_reason ||
            paymentData?.error_message ||
            'Payment processing error',
          gracePeriodText: isRenewal ? ' for a few more days' : '',
          nextStepsText: isRenewal
            ? "We'll automatically retry your payment. If it continues to fail, please update your payment method to avoid service interruption."
            : "Please update your payment method and we'll process your subscription immediately.",
        };
        break;

      case 'renewal':
        emailTemplate = paymentRenewal;
        subject = 'Subscription Renewed - PocketLink';
        templateVars = {
          userName,
          planName: planName.charAt(0).toUpperCase() + planName.slice(1),
          billingPeriod: getDurationText(
            subscriptionData?.current_period_start,
            subscriptionData?.current_period_end
          ),
          transactionId: paymentData?.id || paymentData?.payment_id || 'N/A',
          renewalDate: paymentDate,
          paymentMethod,
          amount: formatAmount(amount),
          currency,
          nextBillingDate: subscriptionData?.current_period_end
            ? new Date(subscriptionData.current_period_end).toLocaleDateString(
                'en-US',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              )
            : 'N/A',
        };
        break;

      default:
        throw new Error(`Unknown email type: ${emailType}`);
    }

    // Replace template variables
    let emailBody = emailTemplate;
    Object.entries(templateVars).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        emailBody = emailBody.replace(regex, value);
      }
    });

    // Insert email into email-server table
    const { error: emailError } = await supabase.from('email-server').insert({
      uuid: randomUUID(),
      username: userData.username || userData.name,
      type: 'admin',
      send_at: new Date().toISOString(),
      to: userEmail,
      cc: null,
      bcc: null,
      subject: subject,
      body: null,
      html: emailBody,
      attachment_links: null,
      refreshToken: null,
    });

    if (emailError) {
      console.error(
        `❌ Error inserting ${emailType} email to email-server:`,
        emailError
      );
      return false;
    }

    console.log(`✅ ${emailType} email queued for ${userEmail}`);
    return true;
  } catch (error) {
    console.error(`❌ Error preparing ${emailType} email:`, error);
    return false;
  }
}

// Helper function to format amount
function formatAmount(amount) {
  const numAmount = parseFloat(amount) / 100;
  return numAmount.toFixed(2);
}

// Helper function to get duration text
function getDurationText(startDate, endDate) {
  if (!startDate || !endDate) return 'N/A';

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays >= 350) return 'Annual';
  if (diffDays >= 28 && diffDays <= 31) return 'Monthly';
  if (diffDays === 7) return 'Weekly';
  return `${diffDays} days`;
}

// Update user subscription status with tier management (no trials)
async function updateUserSubscription(
  paymentData,
  subscriptionData,
  supabase,
  determineSubscriptionTier
) {
  try {
    const customerEmail =
      paymentData?.customer?.email || subscriptionData?.customer?.email;

    if (!customerEmail) {
      throw new Error('No customer email found in payment/subscription data');
    }

    // Get user data by email
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select('username, email, subscription_tier, subscription_status')
      .eq('email', customerEmail)
      .single();

    if (userError || !userData) {
      console.error('Error fetching user data:', userError);
      throw new Error('User not found');
    }

    // Determine subscription details from product ID
    const productId = subscriptionData?.product_id || paymentData?.product_id;
    const { tier, cycle } = determineSubscriptionTier(productId);

    const amount = paymentData?.amount || subscriptionData?.amount || 0;
    const currency =
      paymentData?.currency || subscriptionData?.currency || 'USD';

    // Calculate subscription period
    const currentPeriodStart =
      subscriptionData?.current_period_start || new Date().toISOString();
    const currentPeriodEnd =
      subscriptionData?.current_period_end ||
      (() => {
        const end = new Date();
        if (cycle === 'yearly') {
          end.setFullYear(end.getFullYear() + 1);
        } else {
          end.setMonth(end.getMonth() + 1);
        }
        return end.toISOString();
      })();

    // Subscriptions are always active (no trials)
    const subscriptionStatus = 'active';
    const subscriptionStartDate = currentPeriodStart;
    const subscriptionEndDate = currentPeriodEnd;

    // Create billing info record
    const billingInfo = {
      username: userData.username,
      subscription_id: subscriptionData?.id || paymentData?.id,
      email: customerEmail,
      phone: paymentData?.customer?.phone || '',
      amount: parseFloat(amount) / 100, // Convert from cents
      currency: currency,
      billing_cycle: cycle,
      billing_address: null,
      current_period_start: currentPeriodStart,
      current_period_end: currentPeriodEnd,
      payment_method:
        paymentData?.payment_method ||
        paymentData?.payment_method_type ||
        subscriptionData?.payment_method ||
        subscriptionData?.payment_method_type ||
        'credit',
      next_payment_attempt: currentPeriodEnd,
      meta_data: {
        dodo_payment_id: paymentData?.id,
        dodo_subscription_id: subscriptionData?.id,
        payment_status: paymentData?.status,
        provider: 'dodo_payments',
        subscription_tier: tier,
        billing_cycle: cycle,
        is_trial: 'false', // Subscriptions don't have trials,
        raw_payment_data: paymentData,
        raw_subscription_data: subscriptionData,
      },
      created_at: new Date().toISOString(),
    };

    // Update user data with subscription information (no trials)
    const userUpdateData = {
      is_premium: true,
      subscription_tier: tier,
      subscription_status: subscriptionStatus,
      subscription_start_date: subscriptionStartDate,
      subscription_end_date: subscriptionEndDate,
      cancelled_at: null,
      cancel_at_period_end: false,
      dodo_subscription_id: subscriptionData?.id || paymentData?.id,
      dodo_customer_id:
        subscriptionData?.customer?.id || paymentData?.customer?.id,
      // Reset payment failure tracking on successful subscription creation
      payment_failure_count: 0,
      last_payment_failure: null,
      last_payment_failure_reason: null,
    };

    // Update user data
    const { error: updateUserError } = await supabase
      .from('user_data')
      .update(userUpdateData)
      .eq('username', userData.username);

    if (updateUserError) {
      console.error('Error updating user subscription:', updateUserError);
      throw new Error(
        `Failed to update user subscription: ${updateUserError.message}`
      );
    }

    // Note: Billing details will be created by payment.succeeded webhook
    // This function now only updates user subscription status

    return {
      success: true,
      subscriptionTier: tier,
      billingCycle: cycle,
      isTrialSubscription: false, // Subscriptions don't have trials,
      expiryDate: subscriptionEndDate,
    };
  } catch (error) {
    console.error('Error updating user subscription:', error);
    throw error;
  }
}

// Handle subscription renewal (regular renewal)
async function handleSubscriptionRenewal(
  subscriptionData,
  supabase,
  determineSubscriptionTier,
  paymentData = null
) {
  try {
    const customerEmail = subscriptionData?.customer?.email;

    if (!customerEmail) {
      throw new Error('No customer email found in subscription data');
    }

    // Get user data by email
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select('username, subscription_status')
      .eq('email', customerEmail)
      .single();

    if (userError || !userData) {
      console.error('Error fetching user data:', userError);
      throw new Error('User not found');
    }

    const productId = subscriptionData?.product_id;
    const { tier, cycle } = determineSubscriptionTier(productId);
    const now = new Date();

    // Update user subscription
    const userUpdateData = {
      subscription_status: 'active',
      subscription_tier: tier,
      subscription_start_date:
        subscriptionData?.current_period_start || now.toISOString(),
      subscription_end_date: subscriptionData?.current_period_end,
      cancel_at_period_end: false,
      // Reset payment failure tracking on successful renewal
      payment_failure_count: 0,
      last_payment_failure: null,
      last_payment_failure_reason: null,
    };

    const { error: updateError } = await supabase
      .from('user_data')
      .update(userUpdateData)
      .eq('username', userData.username);

    if (updateError) {
      console.error('Error updating user for renewal:', updateError);
      throw new Error(
        `Failed to update user for renewal: ${updateError.message}`
      );
    }

    // Only send renewal email if this is actually a renewal (not new subscription)
    // Check if user had a previous subscription start date before current period
    const isActualRenewal =
      userData.subscription_start_date &&
      subscriptionData?.current_period_start &&
      new Date(userData.subscription_start_date) <
        new Date(subscriptionData.current_period_start);

    if (isActualRenewal) {
      const emailPaymentData = paymentData || { amount: 0, currency: 'USD' };
      await sendPaymentEmail(
        'renewal',
        userData,
        emailPaymentData,
        subscriptionData,
        supabase
      );
      console.log('📧 Renewal email sent for actual subscription renewal');
    } else {
      console.log(
        '⏭️ Skipping renewal email - this is a new subscription, not a renewal'
      );
    }

    return { success: true };
  } catch (error) {
    console.error('Error handling subscription renewal:', error);
    throw error;
  }
}

// Handle payment failures - simplified for Dodo's retry system
async function handlePaymentFailure(paymentData, supabase) {
  try {
    const customerEmail = paymentData?.customer?.email || paymentData?.email;
    const paymentId = paymentData?.id || paymentData?.payment_id;
    const subscriptionId = paymentData?.subscription_id;
    const amount = paymentData?.amount || paymentData?.total_amount || 0;
    const currency = paymentData?.currency || 'USD';
    const failureReason =
      paymentData?.failure_reason ||
      paymentData?.error_message ||
      'Unknown payment failure';
    const failureCode =
      paymentData?.failure_code || paymentData?.error_code || 'unknown_error';

    if (!customerEmail) {
      throw new Error('No customer email found in payment failure data');
    }

    console.log('🔴 Processing payment failure:', {
      customerEmail,
      paymentId,
      subscriptionId,
      amount: parseFloat(amount) / 100,
      currency,
      failureReason,
      failureCode,
      timestamp: new Date().toISOString(),
    });

    // Get user data by email
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select(
        'username, email, subscription_tier, subscription_status, is_premium, payment_failure_count'
      )
      .eq('email', customerEmail)
      .single();

    if (userError || !userData) {
      console.error('User not found for payment failure:', userError);
      throw new Error('User not found for payment failure processing');
    }

    // Determine failure type
    const failureType = subscriptionId
      ? 'subscription_renewal_failed'
      : 'new_subscription_failed';

    // Create failure record in billing_details
    const failureRecord = {
      username: userData.username,
      email: customerEmail,
      payment_id: paymentId,
      subscription_id: subscriptionId,
      payment_type: subscriptionId
        ? 'subscription_renewal'
        : 'new_subscription',
      action_type: 'payment_failure',
      amount: parseFloat(amount) / 100,
      currency: currency,
      status: 'failed',
      payment_provider: 'dodo_payments',
      payment_method: paymentData.payment_method_type || 'card',
      processed_at: new Date().toISOString(),
      metadata: {
        failure_type: failureType,
        failure_reason: failureReason,
        failure_code: failureCode,
        raw_payment_data: paymentData,
      },
    };

    const { error: billingError } = await supabase
      .from('billing_details')
      .insert([failureRecord]);

    if (billingError) {
      console.error('Error creating payment failure record:', billingError);
      throw new Error(
        `Failed to create payment failure record: ${billingError.message}`
      );
    }

    // For new subscription failures, immediately downgrade
    if (!subscriptionId) {
      await handleNewSubscriptionFailure(userData, supabase, failureReason);
    } else {
      // For subscription renewals, just track the failure - Dodo will handle retries
      await trackSubscriptionRenewalFailure(userData, supabase, failureReason);
    }

    // Send payment failure email notification
    await sendPaymentEmail('failure', userData, paymentData, null, supabase);

    return { success: true, failureType };
  } catch (error) {
    console.error('Error handling payment failure:', error);
    throw error;
  }
}

// Handle new subscription payment failures - immediate downgrade
async function handleNewSubscriptionFailure(userData, supabase, failureReason) {
  try {
    // For new users whose payment failed, revert to free plan immediately
    const userUpdateData = {
      subscription_tier: 'free',
      subscription_status: 'inactive',
      is_premium: false,
      subscription_start_date: null,
      subscription_end_date: null,
      dodo_subscription_id: null,
      dodo_customer_id: null,
      cancelled_at: new Date().toISOString(),
      cancel_at_period_end: false,
    };

    const { error: updateError } = await supabase
      .from('user_data')
      .update(userUpdateData)
      .eq('username', userData.username);

    if (updateError) {
      console.error(
        'Error downgrading user after new subscription failure:',
        updateError
      );
      throw new Error(`Failed to downgrade user: ${updateError.message}`);
    }

    console.log('🔽 User downgraded after new subscription payment failure:', {
      username: userData.username,
      reason: failureReason,
    });
  } catch (error) {
    console.error('Error in handleNewSubscriptionFailure:', error);
    throw error;
  }
}

// Track subscription renewal failures - let Dodo handle retries
async function trackSubscriptionRenewalFailure(
  userData,
  supabase,
  failureReason
) {
  try {
    // Just track the failure - Dodo will handle retries and send appropriate events
    const userUpdateData = {
      payment_failure_count: (userData.payment_failure_count || 0) + 1,
      last_payment_failure: new Date().toISOString(),
      last_payment_failure_reason: failureReason,
    };

    const { error: updateError } = await supabase
      .from('user_data')
      .update(userUpdateData)
      .eq('username', userData.username);

    if (updateError) {
      console.error(
        'Error tracking subscription renewal failure:',
        updateError
      );
      throw new Error(
        `Failed to track renewal failure: ${updateError.message}`
      );
    }

    console.log('📊 Tracked subscription renewal failure:', {
      username: userData.username,
      failureCount: (userData.payment_failure_count || 0) + 1,
      reason: failureReason,
    });
  } catch (error) {
    console.error('Error in trackSubscriptionRenewalFailure:', error);
    throw error;
  }
}

// Handle subscription.failed event - when Dodo can't create subscription
async function handleSubscriptionFailure(subscriptionData, supabase) {
  try {
    const customerEmail = subscriptionData?.customer?.email;

    if (!customerEmail) {
      throw new Error('No customer email found in subscription failure data');
    }

    console.log(
      '🔴 Processing subscription failure (mandate creation failed):',
      {
        customerEmail,
        subscriptionId: subscriptionData?.id,
        timestamp: new Date().toISOString(),
      }
    );

    // Get user data by email
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select('username, email, subscription_tier, subscription_status')
      .eq('email', customerEmail)
      .single();

    if (userError || !userData) {
      console.error('User not found for subscription failure:', userError);
      throw new Error('User not found for subscription failure processing');
    }

    // Mandate creation failed - revert to free plan
    const userUpdateData = {
      subscription_tier: 'free',
      subscription_status: 'inactive',
      is_premium: false,
      subscription_start_date: null,
      subscription_end_date: null,
      dodo_subscription_id: null,
      dodo_customer_id: null,
      cancelled_at: new Date().toISOString(),
      cancel_reason: 'subscription_creation_failed',
    };

    const { error: updateError } = await supabase
      .from('user_data')
      .update(userUpdateData)
      .eq('username', userData.username);

    if (updateError) {
      console.error('Error handling subscription failure:', updateError);
      throw new Error(
        `Failed to handle subscription failure: ${updateError.message}`
      );
    }

    console.log('🔽 User downgraded after subscription creation failure:', {
      username: userData.username,
    });

    return { success: true };
  } catch (error) {
    console.error('Error handling subscription failure:', error);
    throw error;
  }
}

// Handle subscription.on_hold event - when Dodo puts subscription on hold due to failed renewals
async function handleSubscriptionOnHold(subscriptionData, supabase) {
  try {
    const customerEmail = subscriptionData?.customer?.email;

    if (!customerEmail) {
      throw new Error('No customer email found in subscription on hold data');
    }

    console.log(
      '⏸️ Processing subscription on hold (due to failed renewals):',
      {
        customerEmail,
        subscriptionId: subscriptionData?.id,
        timestamp: new Date().toISOString(),
      }
    );

    // Get user data by email
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select('username, email, subscription_tier, subscription_status')
      .eq('email', customerEmail)
      .single();

    if (userError || !userData) {
      console.error('User not found for subscription on hold:', userError);
      throw new Error('User not found for subscription on hold processing');
    }

    // Mark subscription as on hold - keep their access for now but flag for attention
    const userUpdateData = {
      subscription_status: 'on_hold',
      on_hold_date: new Date().toISOString(),
      // Keep is_premium true for now - they might resolve payment issues
    };

    const { error: updateError } = await supabase
      .from('user_data')
      .update(userUpdateData)
      .eq('username', userData.username);

    if (updateError) {
      console.error('Error handling subscription on hold:', updateError);
      throw new Error(
        `Failed to handle subscription on hold: ${updateError.message}`
      );
    }

    console.log('⏸️ User subscription marked as on hold:', {
      username: userData.username,
    });

    return { success: true };
  } catch (error) {
    console.error('Error handling subscription on hold:', error);
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
      .select('username, subscription_status')
      .eq('email', customerEmail)
      .single();

    if (userError || !userData) {
      console.error('Error fetching user data:', userError);
      throw new Error('User not found');
    }

    // Determine if user should lose access immediately or at period end
    const cancelledAt =
      subscriptionData?.cancelled_at || new Date().toISOString();
    const currentPeriodEnd = subscriptionData?.current_period_end;
    const shouldLoseAccessImmediately =
      !currentPeriodEnd || new Date(currentPeriodEnd) <= new Date();

    const userUpdateData = {
      subscription_status: shouldLoseAccessImmediately ? 'cancelled' : 'active',
      cancelled_at: cancelledAt,
      cancel_at_period_end: !shouldLoseAccessImmediately,
    };

    // If losing access immediately, also update premium status
    if (shouldLoseAccessImmediately) {
      userUpdateData.is_premium = false;
    }

    const { error: updateError } = await supabase
      .from('user_data')
      .update(userUpdateData)
      .eq('username', userData.username);

    if (updateError) {
      console.error('Error updating user for cancellation:', updateError);
      throw new Error(
        `Failed to update user for cancellation: ${updateError.message}`
      );
    }

    // Log cancellation to billing_details
    const cancellationRecord = {
      username: userData.username,
      email: subscriptionData?.customer?.email,
      subscription_id: subscriptionData.id,
      payment_type: 'subscription',
      action_type: 'cancellation',
      amount: 0,
      currency: 'USD',
      status: 'cancelled',
      payment_provider: 'dodo_payments',
      period_start: cancelledAt,
      period_end: shouldLoseAccessImmediately ? cancelledAt : currentPeriodEnd,
      metadata: {
        ...subscriptionData,
        status: 'cancelled',
        cancelled_at: cancelledAt,
        loses_access_immediately: shouldLoseAccessImmediately,
      },
    };

    const { error: billingError } = await supabase
      .from('billing_details')
      .insert([cancellationRecord]);

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

// Comprehensive payment processing - handles all billing scenarios
async function processPaymentSucceeded(
  paymentData,
  supabase,
  determineSubscriptionTier,
  dodoPaymentsService
) {
  try {
    const customerEmail = paymentData?.customer?.email;
    const subscriptionId = paymentData?.subscription_id;
    const paymentId = paymentData?.payment_id;
    if (!customerEmail || !paymentId) {
      console.warn('Missing required payment data:', {
        customerEmail,
        paymentId,
      });
      return false;
    }

    // Get user data by email
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select(
        'username, email, subscription_tier, subscription_status, subscription_start_date'
      )
      .eq('email', customerEmail)
      .single();

    if (userError || !userData) {
      console.error('User not found for payment processing:', userError);
      return false;
    }

    // Get subscription data if subscription_id exists
    let subscriptionData = null;
    let newTier = null;
    let newCycle = null;

    if (subscriptionId) {
      try {
        subscriptionData =
          await dodoPaymentsService.getSubscription(subscriptionId);
        if (subscriptionData?.product_id) {
          const tierInfo = determineSubscriptionTier(
            subscriptionData.product_id
          );
          newTier = tierInfo.tier;
          newCycle = tierInfo.cycle;
        }
      } catch (error) {
        console.warn('Could not fetch subscription data:', error);
      }
    }

    // Since we only allow upgrades (starter -> business), we don't need to determine old tier
    // The API route handles the user_data updates immediately
    // Webhook only needs to create billing records

    const hasExistingSubscription = userData.subscription_status === 'active';

    let paymentType = 'subscription';
    let actionType = 'new_subscription';

    if (hasExistingSubscription && newTier) {
      // This is either an upgrade (starter -> business) or renewal
      paymentType = 'plan_change';

      // Since we only allow upgrades, any plan change is an upgrade
      // The user_data.subscription_tier is already updated by API route
      if (newTier === 'business') {
        actionType = 'upgrade'; // Upgrade to business
      } else if (newTier === 'starter') {
        actionType = 'renewal'; // Starter renewal
      }
    } else if (hasExistingSubscription) {
      // Existing subscription renewal (when newTier couldn't be determined)
      actionType = 'renewal';
    }

    // Since downgrades are blocked, no credit calculations needed

    // Create new billing record
    const billingDetailsRecord = {
      username: userData.username,
      email: customerEmail,
      payment_id: paymentId,
      subscription_id: subscriptionId,
      payment_type: paymentType,
      action_type: actionType,
      amount: parseFloat(paymentData.total_amount || 0) / 100,
      currency: paymentData.currency || 'USD',
      is_credit: false,
      credit_amount: null,
      credit_reason: null,
      credit_status: null,
      plan_tier: newTier,
      billing_cycle: newCycle,
      old_plan_tier: null, // Not needed since we only allow upgrades
      status: 'paid',
      payment_provider: 'dodo_payments',
      payment_method: paymentData.payment_method_type || 'card',
      period_start: subscriptionData?.previous_billing_date,
      period_end: subscriptionData?.next_billing_date,
      next_billing_date: subscriptionData?.next_billing_date,
      processed_at: new Date().toISOString(),
      metadata: {
        ...paymentData.metadata,
        payment_type: paymentType,
        action_type: actionType,
        new_plan: newTier,
        raw_payment_data: paymentData,
        raw_subscription_data: subscriptionData,
      },
    };

    const { error: insertError } = await supabase
      .from('billing_details')
      .insert([billingDetailsRecord]);

    if (insertError) {
      console.error('Error creating new billing record:', insertError);
      return false;
    }

    // Backup: Update user_data in case API route failed
    // This ensures user gets access even if API update failed
    if (
      newTier &&
      (actionType === 'upgrade' || actionType === 'new_subscription')
    ) {
      const userUpdateData = {
        subscription_tier: newTier,
        subscription_status: 'active',
        is_premium: true,
        // Reset cancellation flags if upgrading
        cancel_at_period_end: false,
        cancelled_at: null,
        // Reset payment failure tracking on successful payment
        payment_failure_count: 0,
        last_payment_failure: null,
        last_payment_failure_reason: null,
        // Add subscription timing data if available
        ...(subscriptionData?.next_billing_date && {
          subscription_end_date: subscriptionData.next_billing_date,
        }),
        ...(subscriptionData?.id && {
          dodo_subscription_id: subscriptionData.id,
        }),
      };

      const { error: userUpdateError } = await supabase
        .from('user_data')
        .update(userUpdateData)
        .eq('username', userData.username);

      if (userUpdateError) {
        console.error(
          '❌ Webhook failed to update user data:',
          userUpdateError
        );
      }
    }

    // Send payment success email notification
    const emailType = actionType === 'renewal' ? 'renewal' : 'success';
    await sendPaymentEmail(
      emailType,
      userData,
      paymentData,
      subscriptionData,
      supabase
    );

    return true;
  } catch (error) {
    console.error('Error in processPaymentSucceeded:', error);
    return false;
  }
}

export async function POST(req) {
  try {
    // Import utilities with error handling
    let determineSubscriptionTier, dodoPaymentsService;
    try {
      const utils = await import('@/lib/dodo-payments-utils');
      determineSubscriptionTier = utils.determineSubscriptionTier;
      dodoPaymentsService = utils.dodoPaymentsService;
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
    // Get body as parsed JSON and stringify it (matching Dodo Payments example)
    const parsedBody = await req.json();
    const body = JSON.stringify(parsedBody);

    // Get webhook headers
    const webhookHeaders = {
      'webhook-id': req.headers.get('webhook-id') || '',
      'webhook-signature': req.headers.get('webhook-signature') || '',
      'webhook-timestamp': req.headers.get('webhook-timestamp') || '',
    };

    console.log('Webhook headers:', webhookHeaders);
    console.log('Webhook body length:', body.length);
    console.log('Webhook body preview:', body.substring(0, 200) + '...');

    // Verify webhook signature using standardwebhooks library
    const webhookSecret = process.env.NEXT_PUBLIC_DODO_PAYMENTS_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Webhook secret not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    const webhook = new Webhook(webhookSecret);

    try {
      const verifiedPayload = await webhook.verify(body, webhookHeaders);
      console.log('✓ Webhook signature verified successfully!');
      console.log(
        'Verified payload matches body:',
        JSON.stringify(verifiedPayload) === body
      );
    } catch (error) {
      console.error('✗ Webhook signature verification failed:', error);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Use the already parsed body
    const event = parsedBody;
    console.log('Received Dodo Payments webhook:', {
      type: event.type,
      id: event.id,
      subscriptionId: event.data?.subscription_id,
      paymentId: event.data?.payment?.id || event.data?.id,
      customerEmail:
        event.data?.customer?.email || event.data?.payment?.customer?.email,
    });

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

    switch (event.type) {
      case 'payment.succeeded':
        try {
          // Process payment with comprehensive billing logic
          const paymentData = event.data; // Direct payment data from event
          await processPaymentSucceeded(
            paymentData,
            supabase,
            determineSubscriptionTier,
            dodoPaymentsService
          );

          // For payment.succeeded, we need to fetch subscription data if subscription_id exists
          if (paymentData.subscription_id) {
            try {
              const subscriptionData =
                await dodoPaymentsService.getSubscription(
                  paymentData.subscription_id
                );
              await updateUserSubscription(
                paymentData,
                subscriptionData,
                supabase,
                determineSubscriptionTier
              );
            } catch (subscriptionError) {
              console.warn(
                'Could not fetch subscription for user update:',
                subscriptionError
              );
              // Continue processing as billing details were already created
            }
          } else {
            console.log('No subscription_id in payment - one-time payment');
          }

          console.log('✓ Successfully processed payment.succeeded event');
        } catch (error) {
          console.error('✗ Error processing payment.succeeded:', error);
          return NextResponse.json(
            { error: 'Failed to process payment' },
            { status: 500 }
          );
        }
        break;

      case 'subscription.created':
        try {
          // For new subscriptions, create the full record
          await updateUserSubscription(
            event.data.payment,
            event.data.subscription,
            supabase,
            determineSubscriptionTier
          );
          console.log('✓ Successfully processed subscription.created event');
        } catch (error) {
          console.error('✗ Error processing subscription.created:', error);
          return NextResponse.json(
            { error: 'Failed to process subscription creation' },
            { status: 500 }
          );
        }
        break;

      case 'subscription.plan_changed':
        try {
          // Plan change event - no action needed here as payment.succeeded will handle billing
          console.log(
            '✓ Subscription plan changed - waiting for payment.succeeded event'
          );
        } catch (error) {
          console.error('✗ Error processing subscription.plan_changed:', error);
        }
        break;

      case 'subscription.renewed':
      case 'subscription.active':
        try {
          // Handle subscription renewal/activation
          await handleSubscriptionRenewal(
            event.data.subscription || event.data,
            supabase,
            determineSubscriptionTier,
            event.data.payment // Pass payment data if available
          );
          console.log('✓ Successfully processed subscription renewal event');
        } catch (error) {
          console.error('✗ Error processing subscription renewal:', error);
          return NextResponse.json(
            { error: 'Failed to process subscription renewal' },
            { status: 500 }
          );
        }
        break;

      case 'subscription.cancelled':
      case 'subscription.expired':
        try {
          await handleSubscriptionCancellation(
            event.data.subscription || event.data,
            supabase
          );
          console.log(
            '✓ Successfully processed subscription cancellation event'
          );
        } catch (error) {
          console.error('✗ Error processing subscription cancellation:', error);
          return NextResponse.json(
            { error: 'Failed to process subscription cancellation' },
            { status: 500 }
          );
        }
        break;

      case 'payment.failed':
        try {
          await handlePaymentFailure(event.data, supabase);
          console.log('✓ Successfully processed payment.failed event');
        } catch (error) {
          console.error('✗ Error processing payment.failed:', error);
          return NextResponse.json(
            { error: 'Failed to process payment failure' },
            { status: 500 }
          );
        }
        break;

      case 'subscription.failed':
        try {
          await handleSubscriptionFailure(event.data, supabase);
          console.log('✓ Successfully processed subscription.failed event');
        } catch (error) {
          console.error('✗ Error processing subscription.failed:', error);
          return NextResponse.json(
            { error: 'Failed to process subscription failure' },
            { status: 500 }
          );
        }
        break;

      case 'subscription.on_hold':
        try {
          await handleSubscriptionOnHold(event.data, supabase);
          console.log('✓ Successfully processed subscription.on_hold event');
        } catch (error) {
          console.error('✗ Error processing subscription.on_hold:', error);
          return NextResponse.json(
            { error: 'Failed to process subscription on hold' },
            { status: 500 }
          );
        }
        break;

      default:
        console.log('Unhandled webhook event type:', event.type);
        break;
    }

    return NextResponse.json({
      success: true,
      processed: event.type,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    return NextResponse.json(
      {
        error: 'Webhook processing failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: error.stack
          ? error.stack.split('\n').slice(0, 5).join('\n')
          : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
