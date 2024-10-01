'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MapPin, Check } from 'lucide-react';
import { toast } from 'sonner';
import { COUNTRIES, validateAddress } from '@/constants/countries';

/**
 * BillingAddressForm Component
 * Collects billing address information for subscription checkout
 * Uses existing user_addresses table structure
 */
export default function BillingAddressForm({
  onAddressSubmit,
  existingAddress = null,
  isLoading = false,
  className = '',
}) {
  const [formData, setFormData] = useState({
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US', // Default to US
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-populate form if existing address is provided
  useEffect(() => {
    if (existingAddress) {
      setFormData({
        name: existingAddress.name || '',
        line1: existingAddress.line1 || '',
        line2: existingAddress.line2 || '',
        city: existingAddress.city || '',
        state: existingAddress.state || '',
        postal_code: existingAddress.postal_code || '',
        country: existingAddress.country || 'US',
        phone: existingAddress.phone || '',
      });
    }
  }, [existingAddress]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the address
    const validation = validateAddress(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the onAddressSubmit callback with the form data
      if (onAddressSubmit) {
        await onAddressSubmit(formData);
      }
    } catch (error) {
      console.error('Error submitting address:', error);
      toast.error('Failed to save address. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCountry = COUNTRIES.find((c) => c.code === formData.country);

  return (
    <Card className={`w-full max-w-2xl ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Billing Address
        </CardTitle>
        <p className="text-sm text-gray-600">
          This address will be used for billing and invoicing purposes.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="John Doe"
              className={errors.name ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Address Line 1 - House/Apartment */}
          <div className="space-y-2">
            <Label htmlFor="line1">House/Apartment Number *</Label>
            <Input
              id="line1"
              type="text"
              value={formData.line1}
              onChange={(e) => handleInputChange('line1', e.target.value)}
              placeholder="123, Apt 4B, Building A"
              className={errors.line1 ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.line1 && (
              <p className="text-sm text-red-600">{errors.line1}</p>
            )}
          </div>

          {/* Address Line 2 - Street/Locality */}
          <div className="space-y-2">
            <Label htmlFor="line2">Street/Locality *</Label>
            <Input
              id="line2"
              type="text"
              value={formData.line2}
              onChange={(e) => handleInputChange('line2', e.target.value)}
              placeholder="Main Street, Central Avenue"
              className={errors.line2 ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.line2 && (
              <p className="text-sm text-red-600">{errors.line2}</p>
            )}
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="New York"
                className={errors.city ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              {errors.city && (
                <p className="text-sm text-red-600">{errors.city}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="NY"
                disabled={isLoading}
              />
              {errors.state && (
                <p className="text-sm text-red-600">{errors.state}</p>
              )}
            </div>
          </div>

          {/* Postal Code and Country */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="postal_code">Postal Code *</Label>
              <Input
                id="postal_code"
                type="text"
                value={formData.postal_code}
                onChange={(e) =>
                  handleInputChange('postal_code', e.target.value)
                }
                placeholder="10001"
                className={errors.postal_code ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              {errors.postal_code && (
                <p className="text-sm text-red-600">{errors.postal_code}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleInputChange('country', value)}
                disabled={isLoading}
              >
                <SelectTrigger
                  className={errors.country ? 'border-red-500' : ''}
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-sm text-red-600">{errors.country}</p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Save Address
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
