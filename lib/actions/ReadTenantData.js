//====== TENANT DATA MANAGEMENT ======//
// utils/ReadTenantData.js
'use server';
import { createSupabaseClient } from '@/Clients/supabase/server';

//====== MAIN TENANT DATA FUNCTIONS ======//

export async function ReadTenantData(tenant) {
  const supabase = await createSupabaseClient();

  // Fetch tenant data
  const { data, error } = await supabase
    .from('items_data')
    .select('*')
    .eq('username', tenant) // Use "username" as a unique identifier
    .single(); // Fetch only one record

  if (error || !data) {
    return null; // Return null if tenant is not found
  }

  return data;
}

//====== PREMIUM STATUS FUNCTIONS ======//

export async function CheckPremiumStatus(tenant) {
  const supabase = await createSupabaseClient();

  const { data: userData, error: userError } = await supabase
    .from('user_data')
    .select('is_premium')
    .eq('username', tenant)
    .maybeSingle();

  if (userError) {
    console.error('Error fetching user data:', userError);
    return null;
  }

  if (!userData) {
    console.error('No user data found for tenant:', tenant);
    return false;
  }

  return userData.is_premium;
}

//====== CUSTOM DOMAIN TENANT MAPPING TO POCKETLINK TENANT FUNCTIONS ======//
export async function getCustomDomainTenant(customDomain) {
  const supabase = await createSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('user_data')
      .select('username')
      .eq('customDomain', customDomain)
      .single();

    if (error || !data) {
      console.error('Custom domain not found:', customDomain, error);
      return null;
    }

    return data.username;
  } catch (error) {
    console.error('Error fetching custom domain tenant:', error);
    return null;
  }
}
// Add a separate function to check trial status
export async function IsInTrialPeriod(tenant) {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('user_data')
    .select('created_at, is_premium')
    .eq('username', tenant)
    .single();

  if (error || !data || data.is_premium) {
    return false;
  }

  if (data.created_at) {
    const createdDate = new Date(data.created_at);
    const currentDate = new Date();
    const trialEndDate = new Date(createdDate);
    trialEndDate.setDate(trialEndDate.getDate() + 15);

    return currentDate <= trialEndDate;
  }

  return false;
}

//====== PREMIUM STATUS UPDATE FUNCTIONS ======//

// Add this new function to update premium status
export async function UpdatePremiumStatus(username, isPremium) {
  try {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from('user_data')
      .update({ is_premium: isPremium })
      .eq('username', username)
      .select()
      .single();

    if (error) {
      console.error('Error updating premium status:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in UpdatePremiumStatus:', error);
    return null;
  }
}
