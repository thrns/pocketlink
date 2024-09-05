'use client';

import { useState, useMemo } from 'react';
import { useShop } from '@/app/contexts/ShopContext';
import DiscountList from './components/DiscountList';
import CreateDiscountModal from './components/CreateDiscountModal';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Percent, Tag, TrendingDown, Users } from 'lucide-react';
import PremiumGate from '@/components/PremiumGate';
import { FEATURES } from '@/constants/features';
import Image from 'next/image';
import EmptyState from '@/components/EmptyState';

export default function DiscountsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const { discounts, addDiscount, editDiscount, deleteDiscount, loading } =
    useShop();

  // Calculate discount stats
  const discountStats = useMemo(() => {
    const totalDiscounts = discounts.length;
    const percentageDiscounts = discounts.filter(
      (d) => d.type === 'percentage'
    ).length;
    const fixedDiscounts = discounts.filter(
      (d) => d.type === 'fixed' || d.type === 'amount'
    ).length;
    const averageDiscount =
      discounts.length > 0
        ? discounts.reduce(
            (sum, discount) => sum + (Number(discount.value) || 0),
            0
          ) / discounts.length
        : 0;

    return {
      totalDiscounts,
      percentageDiscounts,
      fixedDiscounts,
      averageDiscount,
    };
  }, [discounts]);

  const handleCreateOrUpdate = async (discountData) => {
    if (editingDiscount) {
      await editDiscount(editingDiscount.id, discountData);
    } else {
      await addDiscount(discountData);
    }
    closeModal();
  };

  const handleEdit = (discount) => {
    setEditingDiscount(discount);
    setIsModalOpen(true);
  };

  const handleDelete = async (discountId) => {
    await deleteDiscount(discountId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDiscount(null);
  };

  const handleCreateDiscount = () => {
    setEditingDiscount(null);
    setIsModalOpen(true);
  };

  return (
    <PremiumGate
      featureKey={FEATURES.ECOMMERCE_SHOP}
      featureName="E-commerce"
      description="Create and manage discount codes to boost sales. Set up percentage or fixed amount discounts, track usage, and run promotional campaigns."
      dummyData={
        <div className="min-h-screen w-full bg-gray-50 p-6">
          <div className="pointer-events-none space-y-6 opacity-60">
            {/* Header Section */}
            <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center justify-start gap-4">
                <div className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-3">
                  <Percent className="h-8 w-8 text-white" />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Discount Management
                  </h1>
                  <p className="text-gray-600">
                    Create and manage discount codes for your products
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white">
                <Plus className="h-4 w-4" />
                Create Discount
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Discounts
                    </p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-gray-500">
                      Active discount codes
                    </p>
                  </div>
                  <Tag className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Percentage Discounts
                    </p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                    <p className="text-xs text-gray-500">Percentage-based</p>
                  </div>
                  <Percent className="h-8 w-8 text-blue-500" />
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Fixed Discounts
                    </p>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                    <p className="text-xs text-gray-500">Fixed amount</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-orange-500" />
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Savings
                    </p>
                    <p className="text-2xl font-bold text-gray-900">₹15,680</p>
                    <p className="text-xs text-gray-500">Customer savings</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Discounts List */}
            <div className="rounded-xl border border-gray-100 bg-white shadow-lg">
              <div className="border-b border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Discounts
                </h2>
                <p className="text-gray-600">
                  Manage your discount codes and promotional offers
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      code: 'WELCOME20',
                      type: 'percentage',
                      value: '20%',
                      usage: '45/100',
                      status: 'active',
                      description: 'Welcome discount for new customers',
                    },
                    {
                      code: 'SAVE500',
                      type: 'fixed',
                      value: '₹500',
                      usage: '12/50',
                      status: 'active',
                      description:
                        'Fixed amount discount on orders above ₹2000',
                    },
                    {
                      code: 'STUDENT15',
                      type: 'percentage',
                      value: '15%',
                      usage: '23/unlimited',
                      status: 'active',
                      description: 'Student discount code',
                    },
                    {
                      code: 'FLASH30',
                      type: 'percentage',
                      value: '30%',
                      usage: '89/100',
                      status: 'expiring',
                      description: 'Flash sale discount - expires soon',
                    },
                    {
                      code: 'SUMMER25',
                      type: 'percentage',
                      value: '25%',
                      usage: '156/200',
                      status: 'active',
                      description: 'Summer special discount',
                    },
                  ].map((discount, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`rounded-lg p-2 ${
                            discount.type === 'percentage'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-green-100 text-green-600'
                          }`}
                        >
                          {discount.type === 'percentage' ? (
                            <Percent className="h-4 w-4" />
                          ) : (
                            <Tag className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {discount.code}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {discount.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {discount.value}
                          </p>
                          <p className="text-sm text-gray-500">
                            {discount.usage} used
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            discount.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {discount.status}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          •••
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <main className="h-full w-full space-y-6 overflow-y-auto p-6">
        {/* Header Section */}
        <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-start justify-start gap-4 sm:items-center">
            <div className="rounded-xl bg-bento-pink p-3">
              <Percent className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Discount Management
              </h1>
              <p className="text-gray-600">
                Create and manage discount codes for your products
              </p>
            </div>
          </div>

          <div className="md:ml-0 ml-16">
            <Button
              className="flex items-center gap-2"
              onClick={handleCreateDiscount}
            >
              <Plus size={16} />
              Create Discount
            </Button>
          </div>
        </div>

        {/* Check if there are no discounts and show empty state */}
        {!loading && discounts.length === 0 ? (
          <Card className="rounded-xl border border-gray-200 bg-white">
            <CardContent className="p-0">
              <div className="flex flex-col items-center justify-center py-16">
                {/* Empty State Illustration */}
                <EmptyState
                  title="No discount codes yet"
                  onClick={handleCreateDiscount}
                  text="Create discount codes to offer special deals and boost your sales."
                  buttonText="Create Your First Discount"
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Regular discount list when there are discounts */
          <DiscountList
            discounts={discounts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreateDiscount={handleCreateDiscount}
            loading={loading}
          />
        )}

        <CreateDiscountModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onCreate={handleCreateOrUpdate}
          editingDiscount={editingDiscount}
        />
      </main>
    </PremiumGate>
  );
}
