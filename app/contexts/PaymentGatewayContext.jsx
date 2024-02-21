'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import {
  createPaymentGateway,
  updatePaymentGateway,
  deletePaymentGateway,
  fetchPaymentGateways,
} from '@/lib/helpers/supabasePaymentGatewayHelpers';

const PaymentGatewayContext = createContext(null);

// Constant for localStorage merchant key
const MERCHANT_KEY = 'pocketlink_current_merchant';

export function PaymentGatewayProvider({ children }) {
  const { user } = useAuth();
  const [paymentGateways, setPaymentGateways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [merchantFromStorage, setMerchantFromStorage] = useState(null);

  // Effect to get merchant data from localStorage
  useEffect(() => {
    try {
      const merchantData = localStorage.getItem(MERCHANT_KEY);
      if (merchantData) {
        const parsedMerchant = JSON.parse(merchantData);
        setMerchantFromStorage(parsedMerchant);
      }
    } catch (err) {
      console.error('Error parsing merchant data from localStorage:', err);
    }
  }, []);

  // Get the effective username (either from auth or from localStorage)
  const getEffectiveUsername = () => {
    if (user?.username) {
      return user.username;
    }

    if (merchantFromStorage?.name) {
      return merchantFromStorage.name;
    }

    if (merchantFromStorage?.username) {
      return merchantFromStorage.username;
    }

    return null;
  };

  useEffect(() => {
    const username = getEffectiveUsername();
    if (username) {
      loadPaymentGateways();
    }
  }, [user?.username, merchantFromStorage]);

  const loadPaymentGateways = async () => {
    const username = getEffectiveUsername();
    if (!username) return;

    setLoading(true);
    try {
      const data = await fetchPaymentGateways(username);
      setPaymentGateways(data || []);
    } catch (error) {
      console.error('Error loading payment gateways:', error);
      toast.error('Failed to load payment gateways');
    } finally {
      setLoading(false);
    }
  };

  const addPaymentGateway = async (gatewayData) => {
    const username = getEffectiveUsername();
    if (!username) {
      toast.error('Cannot add payment gateway: No merchant identified');
      throw new Error('No merchant identified');
    }

    try {
      const newGatewayData = {
        username: username,
        gateway_name: gatewayData.gateway_name,
        api_key: gatewayData.api_key,
        salt_value: gatewayData.salt_value,
        is_active: gatewayData.is_active || true,
      };

      const newGateway = await createPaymentGateway(newGatewayData);

      setPaymentGateways((prev) => [...prev, newGateway]);
      toast.success('Payment gateway added successfully!');
      return newGateway;
    } catch (error) {
      console.error('Error adding payment gateway:', error);
      toast.error('Failed to add payment gateway');
      throw error;
    }
  };

  const editPaymentGateway = async (gatewayId, gatewayData) => {
    try {
      const updatedGateway = await updatePaymentGateway(gatewayId, gatewayData);

      setPaymentGateways((prev) =>
        prev.map((g) => (g.id === gatewayId ? updatedGateway : g))
      );

      toast.success('Payment gateway updated successfully!');
      return updatedGateway;
    } catch (error) {
      console.error('Error updating payment gateway:', error);
      toast.error('Failed to update payment gateway');
      throw error;
    }
  };

  const removePaymentGateway = async (gatewayId) => {
    try {
      await deletePaymentGateway(gatewayId);
      setPaymentGateways((prev) => prev.filter((g) => g.id !== gatewayId));
      toast.success('Payment gateway removed successfully!');
    } catch (error) {
      console.error('Error removing payment gateway:', error);
      toast.error('Failed to remove payment gateway');
    }
  };

  const toggleGatewayStatus = async (gatewayId, isActive) => {
    try {
      const gateway = paymentGateways.find((g) => g.id === gatewayId);
      if (!gateway) throw new Error('Gateway not found');

      const updatedGateway = await updatePaymentGateway(gatewayId, {
        is_active: isActive,
      });

      setPaymentGateways((prev) =>
        prev.map((g) =>
          g.id === gatewayId ? { ...g, is_active: isActive } : g
        )
      );

      toast.success(
        `Payment gateway ${isActive ? 'activated' : 'deactivated'} successfully!`
      );
    } catch (error) {
      console.error('Error toggling gateway status:', error);
      toast.error('Failed to update gateway status');
    }
  };

  const contextValue = {
    paymentGateways,
    loading,
    addPaymentGateway,
    editPaymentGateway,
    removePaymentGateway,
    loadPaymentGateways,
    toggleGatewayStatus,
  };

  return (
    <PaymentGatewayContext.Provider
      value={{
        paymentGateways,
        loading,
        addPaymentGateway,
        editPaymentGateway,
        removePaymentGateway,
        loadPaymentGateways,
        toggleGatewayStatus,
      }}
    >
      {children}
    </PaymentGatewayContext.Provider>
  );
}

export function usePaymentGateway() {
  return useContext(PaymentGatewayContext);
}
