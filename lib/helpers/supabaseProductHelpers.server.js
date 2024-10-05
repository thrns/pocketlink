import { createSupabaseClient } from '@/Clients/supabase/server';

/**
 * Server-side function to fetch a product by ID
 * @param {string} productId - The product ID to fetch
 * @returns {Promise<Object|null>} - The product data or null if not found
 */
export async function fetchProductById(productId) {
  try {
    if (!productId || typeof productId !== 'string') {
      return null;
    }

    const supabase = await createSupabaseClient();

    const { data, error } = await supabase
      .from('products_data')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) {
      console.error('Error fetching product:', error.message);
      return null;
    }

    // Process product data if needed
    if (data && data.images && typeof data.images === 'string') {
      try {
        data.images = JSON.parse(data.images);
      } catch (e) {
        // Keep as string if parsing fails
      }
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching product:', error);
    return null;
  }
}

/**
 * Server-side function to fetch a discount by ID
 * @param {string} discountId - The discount ID to fetch
 * @returns {Promise<Object|null>} - The discount data or null if not found
 */
export async function fetchDiscountById(discountId) {
  try {
    if (!discountId || typeof discountId !== 'string') {
      return null;
    }

    const supabase = await createSupabaseClient();

    const { data, error } = await supabase
      .from('discounts_data')
      .select('*')
      .eq('id', discountId)
      .single();

    if (error) {
      console.error('Error fetching discount:', error.message);
      return null;
    }

    // Ensure value is a number
    if (data && data.value && typeof data.value !== 'number') {
      data.value = parseFloat(data.value) || 0;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching discount:', error);
    return null;
  }
}
