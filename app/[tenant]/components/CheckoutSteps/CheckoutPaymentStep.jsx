'use client';

import React, { useEffect } from 'react';
import { useCheckout } from '@/app/contexts/CheckoutContext';
import { usePaymentGateway } from '@/app/contexts/PaymentGatewayContext';
import { CreditCard, CheckCircle, Info } from 'lucide-react';
import Image from 'next/image';

const CheckoutPaymentStep = () => {
  const { setSelectedPaymentGateway, selectedPaymentGateway } = useCheckout();

  const { paymentGateways } = usePaymentGateway();

  // Get active payment gateways supported by the merchant
  const activeGateways = React.useMemo(() => {
    return paymentGateways.filter((gateway) => gateway.is_active) || [];
  }, [paymentGateways]);

  // Auto-select the first available payment gateway
  useEffect(() => {
    if (activeGateways.length > 0 && !selectedPaymentGateway) {
      setSelectedPaymentGateway(activeGateways[0].gateway_name);
    }
  }, [activeGateways, selectedPaymentGateway, setSelectedPaymentGateway]);

  // Get provider logo SVG
  const getProviderLogo = (provider) => {
    switch (provider.toLowerCase()) {
      case 'razorpay':
        return '/paymentProviders/razorpay.png';
      case 'phonepe':
        return '/paymentProviders/phonepe.png';
      case 'cashfree':
        return '/paymentProviders/cashfree.webp';
      case 'paypal':
        return '/paymentProviders/paypal.webp';
      case 'stripe':
        return '/paymentProviders/stripe.png';
      case 'crypto':
        return '/paymentProviders/crypto.png';
      case 'cod':
        return '/paymentProviders/cod.png';
      case 'easebuzz':
        return '/paymentProviders/easebuzz.png';
      default:
        return '/paymentProviders/default.png';
    }
  };

  // Get provider information for display
  const getProviderInfo = (provider) => {
    switch (provider.toLowerCase()) {
      case 'razorpay':
        return { name: 'Razorpay', description: 'Cards, UPI, Wallets' };
      case 'phonepe':
        return { name: 'PhonePe', description: 'UPI Payments' };
      case 'cashfree':
        return { name: 'Cashfree', description: 'Cards, UPI, Wallets' };
      case 'paypal':
        return { name: 'PayPal', description: 'International Payments' };
      case 'stripe':
        return { name: 'Stripe', description: 'Cards, International' };
      case 'crypto':
        return { name: 'Crypto', description: 'Bitcoin, Ethereum & more' };
      case 'cod':
        return {
          name: 'Cash on Delivery',
          description: 'Pay when order arrives',
        };
      case 'easebuzz':
        return { name: 'EaseBuzz', description: 'Cards, UPI, Wallets' };
      default:
        return { name: 'Payment', description: 'Select payment method' };
    }
  };

  // Show simple message if no gateways available
  if (activeGateways.length === 0) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-center">
        <p className="text-sm text-amber-700">No payment methods available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold flex items-center mb-3">
        <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
        Payment Gateway
      </h2>

      <div className="space-y-2">
        {activeGateways.map((gateway) => (
          <div
            key={gateway.gateway_name}
            className="border rounded-lg p-3 bg-blue-50 border-blue-200 flex items-center"
          >
            <div className="bg-white rounded border p-1 mr-3  flex-shrink-0">
              <Image
                src={getProviderLogo(gateway.gateway_name)}
                alt={getProviderInfo(gateway.gateway_name).name}
                width={20}
                height={20}
                onError={(e) => {
                  e.target.src = "/paymentProviders/default.png";
                }}
              />
            </div>
            <div className="flex-grow">
              <p className="font-medium">{getProviderInfo(gateway.gateway_name).name}</p>
              <p className="text-xs text-gray-500">
                {getProviderInfo(gateway.gateway_name).description}
              </p>
            </div>
            <CheckCircle className="h-4 w-4 text-green-600 ml-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutPaymentStep;
