'use server';

import { createSupabaseClient } from '@/Clients/supabase/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ref, set } from 'firebase/database';
import { realDb } from '@/Clients/FireUserNameDb';

/**
 * Process the claim submission
 * This will be called after the client-side Google authentication
 * @param {Object} data - The claim data object
 * @returns {Object} - The result of the claim operation
 */
export async function processClaim({
  claimId,
  username,
  email,
  profile,
  items,
  mobileItems,
  theme,
  ogPreviewType,
  isCodeVerified,
}) {
  try {
    const supabase = await createSupabaseClient();

    // Create welcome notification
    const welcomeNotification = {
      id: `welcome-${Date.now()}`,
      title: 'Welcome to Pocketlink!',
      message:
        'Thanks for joining! Refer friends to unlock premium features for free.',
      time: new Date().toISOString(),
      read: false,
    };

    // Prepare billing info record for the billing_info table
    const currentPeriodStart = new Date().toISOString();
    const currentPeriodEnd = new Date();
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 3);
    const transactionId = `txn_${Date.now()}`;

    const billingInfo = {
      username: username,
      subscription_id: transactionId,
      email: email,
      phone: null,
      amount: 0.0,
      currency: 'USD',
      billing_cycle: 'one-time',
      billing_address: null,
      current_period_start: currentPeriodStart,
      current_period_end: currentPeriodEnd.toISOString(),
      payment_method: 'Reward',
      next_payment_attempt: currentPeriodEnd.toISOString(),
      meta_data: {
        transaction_id: transactionId,
        mihpayid: transactionId,
        product_info: 'Pocketlink Premium | 3 months',
        payment_mode: 'Reward Claim',
        status: 'success',
        payment_date: currentPeriodStart,
        raw_response: null,
      },
      created_at: currentPeriodStart,
    };

    // Prepare user_data fields
    const userData = {
      username: username || '',
      uuid: claimId,
      email: email || '',
      created_at: new Date().toISOString(),
      name: profile?.name || '',
      avatarURL: profile?.avatarURL || '',
      loggedin_at: new Date().toISOString(),
      onboarding: true,
      migrated: false,
      usingCustomDomain: false,
      customDomainLinked: false,
      is_premium: isCodeVerified || true,
      people_referred: [],
      notifications: [welcomeNotification],
    };

    // Prepare items_data fields
    const itemsData = {
      username: username || '',
      items: items || [],
      mobileItems: mobileItems || [],
      profile: profile || {},
      uuid: claimId,
      ogPreviewType: ogPreviewType || '',
      theme: theme || {},
    };

    // Upsert user_data
    const { error: userUpdateError } = await supabase
      .from('user_data')
      .upsert(userData);

    // Upsert billing_info
    const { error: billingUpdateError } = await supabase
      .from('billing_info')
      .upsert(billingInfo)
      .eq('username', username);

    // Upsert items_data
    const { error: itemsUpdateError } = await supabase
      .from('items_data')
      .upsert(itemsData)
      .eq('uuid', claimId);

    if (userUpdateError) {
      console.error('Error updating user_data:', userUpdateError);
      return { success: false, error: 'Failed to update claim record' };
    }

    if (billingUpdateError) {
      console.error('Error updating billing_info:', billingUpdateError);
      return { success: false, error: 'Failed to update claim record' };
    }

    if (itemsUpdateError) {
      console.error('Error updating items_data:', itemsUpdateError);
      return { success: false, error: 'Failed to update claim record' };
    }

    // Delete the claim_data row for this claimId
    const { error: deleteError } = await supabase
      .from('claim_data')
      .delete()
      .eq('uuid', claimId);
    if (deleteError) {
      console.error('Error deleting claim_data row:', deleteError);
      // Not a blocking error, so continue
    }

    // Register the username in Firebase (as a backup verification)
    try {
      const firstLetter = username[0];
      const usernameRef = ref(realDb, `usernames/${firstLetter}/${username}`);
      await set(usernameRef, username);
    } catch (firebaseError) {
      console.error('Firebase username registration error:', firebaseError);
      return { success: false, error: 'Failed to register username' };
    }

    return {
      success: true,
      message: 'Claim processed successfully',
      username,
      isPremium: !!isCodeVerified,
    };
  } catch (error) {
    console.error('Claim processing error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Verify username availability in Firebase
 * This is a server-side verification as a backup to the client-side check
 */
export async function verifyUsername(username) {
  try {
    // Create server-side Supabase client to check if username exists in DB
    const supabase = await createSupabaseClient();

    // Check if username already exists in Supabase (optional)
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .maybeSingle();

    if (data) {
      return {
        available: false,
        message: 'Username already exists in database',
      };
    }

    // Return available status
    return { available: true };
  } catch (error) {
    console.error('Username verification error:', error);
    return {
      available: false,
      error: 'An error occurred while verifying username',
    };
  }
}
