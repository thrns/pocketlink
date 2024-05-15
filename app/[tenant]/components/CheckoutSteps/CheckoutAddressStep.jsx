'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useCheckout } from '@/app/contexts/CheckoutContext';
import {
  PlusCircle,
  Trash2,
  Plus,
  MapPin,
  X,
  ChevronDown,
  Home,
  Phone,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import AddressCard from './AddressCard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CheckoutAddressStep = () => {
  const {
    userAddresses,
    selectedAddress,
    setSelectedAddress,
    addNewAddress,
    deleteAddress,
    isLoadingAddresses,
    isAuthenticated,
    openAuthDialog,
    loadUserAddresses,
    onAddressSaved,
  } = useCheckout();

  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [addressesLoaded, setAddressesLoaded] = useState(false);

  // Load addresses when component mounts
  useEffect(() => {
    if (
      isAuthenticated &&
      !addressesLoaded &&
      !isLoadingAddresses &&
      userAddresses.length === 0
    ) {
      // Set state immediately to prevent repeated attempts
      setAddressesLoaded(true);

      loadUserAddresses()
        .then((addresses) => {
          console.log(
            `[Address Step] Addresses loaded successfully: ${addresses.length || 0} addresses`
          );
        })
        .catch((error) => {
          console.error('[Address Step] Error loading addresses:', error);
        });
    }
  }, [
    isAuthenticated,
    addressesLoaded,
    isLoadingAddresses,
    loadUserAddresses,
    userAddresses.length,
  ]);

  // Handle selection of a saved address
  const handleSelectAddress = (addressId) => {
    const address = userAddresses.find((addr) => addr.id === addressId);
    if (address) {
      setSelectedAddress(address);
    }
  };

  // Handle form submission
  const handleAddNewAddress = async (values) => {
    // Check authentication
    if (!isAuthenticated) {
      openAuthDialog();
      return;
    }

    // Check if this is the first address (no existing addresses)
    const isFirstAddress = userAddresses.length === 0;

    // Get email from auth context or storage
    let userEmail = null;
    try {
      // First priority: session storage (most reliable for recent auth)
      userEmail = sessionStorage.getItem('checkout_user_email');

      // Second priority: localStorage pocketlink_user
      if (!userEmail) {
        const userData = localStorage.getItem('pocketlink_user');
        if (userData) {
          const parsed = JSON.parse(userData);
          if (parsed.email) {
            userEmail = parsed.email;
            // Store in session storage for future use
            sessionStorage.setItem('checkout_user_email', userEmail);
          }
        }
      }

      // Third priority: global auth context
      if (
        !userEmail &&
        window.checkoutAuthContext &&
        window.checkoutAuthContext.userEmail
      ) {
        userEmail = window.checkoutAuthContext.userEmail;
        // Store in session storage for future use
        sessionStorage.setItem('checkout_user_email', userEmail);
      }

      // Final attempt: try to extract from URL
      if (!userEmail && typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const urlEmail = urlParams.get('email');
        if (urlEmail && urlEmail.includes('@')) {
          userEmail = urlEmail;
          // Store in session storage for future use
          sessionStorage.setItem('checkout_user_email', userEmail);
        }
      }
    } catch (err) {
      console.error('Error retrieving user email:', err);
    }

    setIsSaving(true);
    const newAddress = await addNewAddress({
      ...values,
      isDefault: values.isDefault === true || isFirstAddress,
      email: userEmail, // Pass the email along with the address data
    });

    if (newAddress) {
      // If successful, close the form
      setShowNewAddressForm(false);

      // Select the new address
      setSelectedAddress(newAddress);

      if (onAddressSaved) {
        onAddressSaved(newAddress);
      }
    }

    setIsSaving(false);
  };

  // Handle address deletion
  const handleDeleteAddress = async (addressId) => {
    const result = await deleteAddress(addressId);

    // If the deleted address was selected, clear the selection
    if (result && selectedAddress && selectedAddress.id === addressId) {
      setSelectedAddress(null);
    }
  };

  const toggleAddressForm = () => {
    setShowNewAddressForm(!showNewAddressForm);
    if (!showNewAddressForm) {
      // Reset form when opening
      reset();
    }
  };

  // Setup react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      phone: '',
      isDefault: false,
    },
  });

  // Show loading state
  if (isLoadingAddresses) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <LoadingSpinner size="lg" />
        <p className="mt-2 text-sm text-gray-500">Loading addresses...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      <div className="mb-3 flex items-center">
        <MapPin className="mr-1.5 h-4 w-4 text-blue-600" />
        <h3 className="font-medium text-gray-800">Shipping Address</h3>
      </div>
      {/* Existing addresses section */}
      {userAddresses.length > 0 ? (
        <div className="space-y-2">
          {userAddresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              isSelected={selectedAddress?.id === address.id}
              onSelect={() => setSelectedAddress(address)}
              onDelete={() => handleDeleteAddress(address.id)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-gray-50 px-4 py-3 text-center">
          <Home className="mx-auto mb-2 h-6 w-6 text-gray-400" />
          <p className="text-sm text-gray-600">No saved addresses found</p>
        </div>
      )}

      {/* Add address button or form */}
      <AnimatePresence>
        {showNewAddressForm ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 overflow-hidden rounded-lg border bg-white p-4"
          >
            <div className="mb-3 flex items-center justify-between border-b pb-1">
              <h3 className="flex items-center text-sm font-medium text-blue-800">
                <PlusCircle className="mr-1 h-3 w-3" />
                New Address
              </h3>
              <button
                onClick={toggleAddressForm}
                className="rounded-full p-1 text-gray-500 text-gray-700"
                aria-label="Close form"
              >
                <X className="h-3 w-3" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleAddNewAddress)}
              className="text-sm"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Label className="mb-1 block text-xs text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    {...register('name', { required: 'Required' })}
                    className="h-8 text-sm"
                    placeholder="Full name"
                  />
                  {errors.name && (
                    <p className="mt-0.5 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <Label className="mb-1 block text-xs text-gray-700">
                    Street Address
                  </Label>
                  <Input
                    {...register('line1', { required: 'Required' })}
                    className="h-8 text-sm"
                    placeholder="Street address"
                  />
                  {errors.line1 && (
                    <p className="mt-0.5 text-xs text-red-500">
                      {errors.line1.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <Label className="mb-1 block text-xs text-gray-700">
                    Apartment, Suite (optional)
                  </Label>
                  <Input
                    {...register('line2')}
                    className="h-8 text-sm"
                    placeholder="Apartment, unit, etc."
                  />
                </div>

                <div>
                  <Label className="mb-1 block text-xs text-gray-700">
                    City
                  </Label>
                  <Input
                    {...register('city', { required: 'Required' })}
                    className="h-8 text-sm"
                    placeholder="City"
                  />
                  {errors.city && (
                    <p className="mt-0.5 text-xs text-red-500">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="mb-1 block text-xs text-gray-700">
                    State
                  </Label>
                  <Input
                    {...register('state', { required: 'Required' })}
                    className="h-8 text-sm"
                    placeholder="State"
                  />
                  {errors.state && (
                    <p className="mt-0.5 text-xs text-red-500">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="mb-1 block text-xs text-gray-700">
                    Postal Code
                  </Label>
                  <Input
                    {...register('postalCode', { required: 'Required' })}
                    className="h-8 text-sm"
                    placeholder="Postal code"
                  />
                  {errors.postalCode && (
                    <p className="mt-0.5 text-xs text-red-500">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="mb-1 block text-xs text-gray-700">
                    Country
                  </Label>
                  <div className="relative">
                    <select
                      {...register('country', { required: 'Required' })}
                      className="h-8 w-full appearance-none rounded-md border pl-2 pr-8 text-sm"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Singapore">Singapore</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                      <ChevronDown className="h-3 w-3 text-gray-500" />
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <Label className="mb-1 block text-xs text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    {...register('phone', { required: 'Required' })}
                    className="h-8 text-sm"
                    placeholder="For delivery questions only"
                  />
                  {errors.phone && (
                    <p className="mt-0.5 text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('isDefault')}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="ml-2 text-xs text-gray-700">
                      Set as default address
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="h-8 flex-1 text-xs"
                >
                  {isSaving ? (
                    <>
                      <LoadingSpinner size="xs" className="mr-1" /> Saving...
                    </>
                  ) : (
                    'Save Address'
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={toggleAddressForm}
                  variant="outline"
                  className="h-8 text-xs"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleAddressForm}
            className="mt-2 flex w-full items-center justify-center rounded-md border border-dashed border-blue-200 border-blue-300 bg-blue-50 px-4 py-2 text-sm text-blue-600 transition-all"
          >
            <Plus className="mr-1 h-3 w-3" /> Add New Address
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutAddressStep;
