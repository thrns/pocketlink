//====== SUPABASE PAYMENT GATEWAY HELPERS ======//

import { supabase } from '@/Clients/supabase/client';

//====== PAYMENT GATEWAY CRUD OPERATIONS ======//

/**
 * Create a new payment gateway in the database
 * @param {Object} gatewayData - Payment gateway data
 * @returns {Promise<Object>} - Created payment gateway data
 */
export async function createPaymentGateway(gatewayData) {
  const { error, data } = await supabase
    .from('payment_gateway_data')
    .insert(gatewayData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update an existing payment gateway
 * @param {string} gatewayId - ID of the payment gateway to update
 * @param {Object} gatewayData - Updated payment gateway data
 * @returns {Promise<Object>} - Updated payment gateway data
 */
export async function updatePaymentGateway(gatewayId, gatewayData) {
  const { error, data } = await supabase
    .from('payment_gateway_data')
    .update(gatewayData)
    .eq('id', gatewayId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a payment gateway from the database
 * @param {string} gatewayId - ID of the payment gateway to delete
 * @returns {Promise<void>}
 */
export async function deletePaymentGateway(gatewayId) {
  const { error } = await supabase
    .from('payment_gateway_data')
    .delete()
    .eq('id', gatewayId);

  if (error) throw error;
}

//====== PAYMENT GATEWAY FETCH FUNCTIONS ======//

/**
 * Fetch all payment gateways for a user
 * @param {string} username - User's username
 * @returns {Promise<Array>} - Array of payment gateways
 */
export async function fetchPaymentGateways(username) {
  const { data, error } = await supabase
    .from('payment_gateway_data')
    .select('*')
    .eq('username', username);

  if (error) throw error;
  return data;
}

/**
 * Fetch a single payment gateway by ID
 * @param {string} gatewayId - Payment gateway ID
 * @returns {Promise<Object>} - Payment gateway data
 */
export async function fetchPaymentGatewayById(gatewayId) {
  const { data, error } = await supabase
    .from('payment_gateway_data')
    .select('*')
    .eq('id', gatewayId)
    .single();

  if (error) throw error;
  return data;
}

//====== PAYMENT GATEWAY STATUS FUNCTIONS ======//

/**
 * Check if a user has any active payment gateway
 * @param {string} username - User's username
 * @returns {Promise<boolean>} - Whether the user has an active gateway
 */
export async function hasActivePaymentGateway(username) {
  const { data, error, count } = await supabase
    .from('payment_gateway_data')
    .select('*', { count: 'exact' })
    .eq('username', username)
    .eq('is_active', true);

  if (error) throw error;
  return count > 0;
}
