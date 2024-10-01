'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Tag, X, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function DiscountInput({
  onDiscountValidated,
  productId,
  disabled = false,
  className = '',
}) {
  const [discountCode, setDiscountCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validatedDiscount, setValidatedDiscount] = useState(null);
  const [error, setError] = useState(null);

  const validateDiscount = async () => {
    if (!discountCode.trim()) {
      toast.error('Please enter a discount code');
      return;
    }

    setIsValidating(true);
    setError(null);

    try {
      const response = await fetch('/api/validate-discount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          discountCode: discountCode.trim().toUpperCase(),
          productId,
        }),
      });

      const result = await response.json();

      if (result.success && result.isValid) {
        setValidatedDiscount(result);
        setError(null);
        toast.success(`Discount applied: ${result.discountText}`);

        // Notify parent component
        if (onDiscountValidated) {
          onDiscountValidated({
            code: discountCode.trim().toUpperCase(),
            discount: result.discount,
            discountText: result.discountText,
            discountAmount: result.discountAmount,
            subscriptionCycles: result.subscriptionCycles,
          });
        }
      } else {
        setValidatedDiscount(null);
        setError(result.error || 'Invalid discount code');
        toast.error(result.error || 'Invalid discount code');

        // Clear discount in parent
        if (onDiscountValidated) {
          onDiscountValidated(null);
        }
      }
    } catch (err) {
      console.error('Error validating discount:', err);
      setValidatedDiscount(null);
      setError('Failed to validate discount code');
      toast.error('Failed to validate discount code');

      // Clear discount in parent
      if (onDiscountValidated) {
        onDiscountValidated(null);
      }
    } finally {
      setIsValidating(false);
    }
  };

  const clearDiscount = () => {
    setDiscountCode('');
    setValidatedDiscount(null);
    setError(null);

    // Clear discount in parent
    if (onDiscountValidated) {
      onDiscountValidated(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isValidating && discountCode.trim()) {
      validateDiscount();
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Input Section */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            disabled={disabled || isValidating || !!validatedDiscount}
            className="pl-10 uppercase"
          />
        </div>

        {!validatedDiscount ? (
          <Button
            type="button"
            variant="outline"
            onClick={validateDiscount}
            disabled={disabled || isValidating || !discountCode.trim()}
            size="sm"
          >
            {isValidating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Validating...
              </>
            ) : (
              'Apply'
            )}
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={clearDiscount}
            disabled={disabled}
            size="sm"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Success State */}
      {validatedDiscount && (
        <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3">
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Discount Applied
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {validatedDiscount.discountText}
            </Badge>
            {validatedDiscount.subscriptionCycles && (
              <span className="text-xs text-green-600">
                {validatedDiscount.subscriptionCycles === 1
                  ? 'First cycle only'
                  : `${validatedDiscount.subscriptionCycles} cycles`}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center space-x-2 rounded-lg border border-red-200 bg-red-50 p-3">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="text-sm text-red-800">{error}</span>
        </div>
      )}

      {/* Helper Text */}
      {!validatedDiscount && !error && (
        <p className="text-xs text-gray-500">
          Enter a valid discount code to reduce your subscription price
        </p>
      )}
    </div>
  );
}
