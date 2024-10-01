'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, MapPin, Plus, Edit, Trash2, Check, Tag } from 'lucide-react';
import { toast } from 'sonner';
import BillingAddressForm from './BillingAddressForm';
import DiscountInput from './DiscountInput';

/**
 * BillingAddressSelector Component
 * Shows existing addresses and allows creating new ones for checkout
 */
export default function BillingAddressSelector({
  isOpen,
  onClose,
  onAddressSelected,
  onDiscountValidated,
  selectedAddressId = null,
  productId = null,
  showDiscountInput = true,
}) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(selectedAddressId);

  // Load user addresses when dialog opens
  useEffect(() => {
    if (isOpen) {
      loadAddresses();
    }
  }, [isOpen]);

  const loadAddresses = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/billing-address');
      const data = await response.json();

      if (data.success) {
        setAddresses(data.addresses || []);

        // If no address is selected but we have addresses, select the default one
        if (!selectedAddress && data.addresses?.length > 0) {
          const defaultAddress = data.addresses.find((addr) => addr.is_default);
          setSelectedAddress(defaultAddress?.id || data.addresses[0].id);
        }
      } else {
        toast.error('Failed to load addresses');
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
      toast.error('Failed to load addresses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = async (addressData) => {
    try {
      const response = await fetch('/api/billing-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          addressData,
          setAsDefault: addresses.length === 0, // Make first address default
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setShowAddressForm(false);
        setEditingAddress(null);
        await loadAddresses();

        // Select the newly created/updated address
        setSelectedAddress(data.address.id);
      } else {
        toast.error(data.error || 'Failed to save address');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Failed to save address');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!confirm('Are you sure you want to delete this address?')) {
      return;
    }

    try {
      const response = await fetch(`/api/billing-address?id=${addressId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Address deleted successfully');
        await loadAddresses();

        // If we deleted the selected address, clear selection
        if (selectedAddress === addressId) {
          setSelectedAddress(null);
        }
      } else {
        toast.error(data.error || 'Failed to delete address');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Failed to delete address');
    }
  };

  const handleContinueCheckout = () => {
    if (!selectedAddress) {
      toast.error('Please select a billing address');
      return;
    }

    const address = addresses.find((addr) => addr.id === selectedAddress);
    if (address && onAddressSelected) {
      onAddressSelected(address);
    }
    onClose();
  };

  const formatAddress = (address) => {
    // line1 = house/apartment, line2 = street/locality
    const parts = [
      address.line1, // House/apartment number
      address.line2, // Street/locality
      address.city,
      address.state,
      address.postal_code,
    ].filter(Boolean);

    return parts.join(', ');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {showDiscountInput
              ? 'Billing & Discount'
              : 'Select Billing Address'}
          </DialogTitle>
        </DialogHeader>

        {showAddressForm ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h3>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddressForm(false);
                  setEditingAddress(null);
                }}
              >
                Cancel
              </Button>
            </div>
            <BillingAddressForm
              existingAddress={editingAddress}
              onAddressSubmit={handleAddressSubmit}
              className="border-0 shadow-none"
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Discount Input Section */}
            {showDiscountInput && productId && (
              <>
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-medium">
                    <Tag className="h-5 w-5" />
                    Discount Code
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Have a discount code? Apply it below to save on your
                    subscription.
                  </p>
                  <DiscountInput
                    onDiscountValidated={onDiscountValidated}
                    productId={productId}
                    className="max-w-md"
                  />
                </div>
                <Separator />
              </>
            )}

            {/* Billing Address Section */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-1 flex items-center gap-2 text-lg font-medium">
                  <MapPin className="h-5 w-5" />
                  Billing Address
                </h3>
                <p className="text-sm text-gray-600">
                  Choose a billing address for your subscription
                </p>
              </div>
              <Button
                onClick={() => setShowAddressForm(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add New Address
              </Button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading addresses...</span>
              </div>
            )}

            {/* No Addresses State */}
            {!loading && addresses.length === 0 && (
              <div className="py-8 text-center">
                <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No billing addresses found
                </h3>
                <p className="mb-4 text-gray-600">
                  Add a billing address to continue with your purchase
                </p>
                <Button onClick={() => setShowAddressForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Billing Address
                </Button>
              </div>
            )}

            {/* Address List */}
            {!loading && addresses.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {addresses.map((address) => (
                  <Card
                    key={address.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedAddress === address.id
                        ? 'border-blue-500 ring-2 ring-blue-500'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{address.name}</h4>
                          {address.is_default && (
                            <Badge variant="secondary" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {selectedAddress === address.id && (
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="mb-2 text-sm text-gray-600">
                        {formatAddress(address)}
                      </p>

                      {address.phone && (
                        <p className="text-sm text-gray-600">{address.phone}</p>
                      )}

                      <div className="mt-3 flex items-center gap-2 border-t pt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingAddress(address);
                            setShowAddressForm(true);
                          }}
                          className="h-8 px-2"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAddress(address.id);
                          }}
                          className="h-8 px-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Continue Button */}
            {!loading && addresses.length > 0 && (
              <div className="flex justify-end border-t pt-4">
                <Button
                  onClick={handleContinueCheckout}
                  disabled={!selectedAddress}
                  className="min-w-[140px]"
                >
                  {showDiscountInput
                    ? 'Continue to Checkout'
                    : 'Continue to Payment'}
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
