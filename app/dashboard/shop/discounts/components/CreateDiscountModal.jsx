'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const CreateDiscountModal = ({
  isOpen,
  onClose,
  onCreate,
  editingDiscount = null,
}) => {
  const [loading, setLoading] = useState(false);
  const [discountType, setDiscountType] = useState('percentage');
  const [discount, setDiscount] = useState({
    id: '',
    percentage: '',
    amount: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes or when editing a different discount
  useEffect(() => {
    if (editingDiscount) {
      setDiscountType(editingDiscount.type);
      setDiscount({
        id: editingDiscount.id,
        percentage:
          editingDiscount.type === 'percentage' ? editingDiscount.value : '',
        amount: editingDiscount.type === 'amount' ? editingDiscount.value : '',
        description: editingDiscount.name || '',
      });
    } else {
      // Reset form for creating new discount
      setDiscountType('percentage');
      setDiscount({
        id: '',
        percentage: '',
        amount: '',
        description: '',
      });
    }
  }, [editingDiscount, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!discount.description.trim()) {
      newErrors.description = 'Discount name is required';
    }
    if (discountType === 'percentage') {
      const percentValue = parseFloat(discount.percentage);
      if (!discount.percentage) {
        newErrors.percentage = 'Percentage is required';
      } else if (
        isNaN(percentValue) ||
        percentValue <= 0 ||
        percentValue >= 100
      ) {
        newErrors.percentage =
          'Percentage must be greater than 0 and less than or equal to 100';
      }
    }
    if (discountType === 'amount' && !discount.amount) {
      newErrors.amount = 'Amount is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper to handle creating or updating the discount
  const handleSaveDiscount = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const discountData = {
        id: discount.id,
        description: discount.description,
        type: discountType,
        percentage: discountType === 'percentage' ? discount.percentage : '',
        amount: discountType === 'amount' ? discount.amount : '',
      };

      await onCreate(discountData);
      onClose();
    } catch (error) {
      console.error('Error saving discount:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-4 text-xl font-bold">
          {editingDiscount ? 'Edit Discount' : 'Create New Discount'}
        </DialogHeader>

        <div className="space-y-4">
          {/* Description input with validation */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Discount Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter a unique discount name"
              value={discount.description}
              onChange={(e) =>
                setDiscount({ ...discount, description: e.target.value })
              }
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Discount Type Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Discount Type <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4 rounded-md bg-gray-50 p-2">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="discountType"
                  value="percentage"
                  checked={discountType === 'percentage'}
                  onChange={() => setDiscountType('percentage')}
                  className="text-primary"
                />
                <span>Percentage</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="discountType"
                  value="amount"
                  checked={discountType === 'amount'}
                  onChange={() => setDiscountType('amount')}
                  className="text-primary"
                />
                <span>Fixed Amount</span>
              </label>
            </div>
          </div>

          {/* Value input with validation */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Discount Value <span className="text-red-500">*</span>
            </label>
            {discountType === 'percentage' ? (
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Enter percentage"
                  value={discount.percentage}
                  onChange={(e) =>
                    setDiscount({
                      ...discount,
                      percentage: e.target.value,
                      amount: '',
                    })
                  }
                  className={`pr-8 ${errors.percentage ? 'border-red-500' : ''}`}
                  min="1"
                  max="99"
                />
                <span className="absolute right-3 top-2 text-gray-500">%</span>
                {errors.percentage && (
                  <p className="text-sm text-red-500">{errors.percentage}</p>
                )}
              </div>
            ) : (
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={discount.amount}
                  onChange={(e) =>
                    setDiscount({
                      ...discount,
                      amount: e.target.value,
                      percentage: '',
                    })
                  }
                  className={`pl-6 ${errors.amount ? 'border-red-500' : ''}`}
                  min="0"
                />
                {errors.amount && (
                  <p className="text-sm text-red-500">{errors.amount}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleSaveDiscount} disabled={loading}>
            {loading
              ? 'Saving...'
              : editingDiscount
                ? 'Update Discount'
                : 'Create Discount'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDiscountModal;
