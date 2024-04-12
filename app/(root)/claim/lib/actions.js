'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseClient } from '@/Clients/supabase/server';

/**
 * Fetch a Claim by ID
 */
export async function fetchClaimById(id) {
  try {
    const supabase = await createSupabaseClient();

    const { data, error } = await supabase
      .from('claim_data')
      .select('*')
      .eq('uuid', id)
      .single();

    if (error) {
      console.error('Error claiming data:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in fetchClaimById:', error);
    return null;
  }
}
