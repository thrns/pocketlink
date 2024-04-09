import { supabase } from '@/Clients/supabase/client';

export async function fetchTemplates() {
  try {
    const { data, error } = await supabase.from('templates').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching templates:', error.message);
    return [];
  }
}
