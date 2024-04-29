'use client';

import React from 'react';
import ShopCard, {
  ShopCardSkeleton,
} from '@/components/editPageComponents/CardStuff/CardTypes/RightPanelCards/ShoppableCardTypes/ShopCard';
import { useShop } from '@/app/contexts/ShopContext';

export default function ProductGrid({ username }) {
  const { products, loading } = useShop();

  // Show skeleton loaders while loading
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <ShopCardSkeleton key={index} />
          ))}
      </div>
    );
  }

  // No products found
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="mb-2 text-xl font-semibold">No Products Found</h3>
        <p className="max-w-md text-center text-gray-500">
          There are no products available at the moment. Please check back
          later.
        </p>
      </div>
    );
  }

  // Render the product grid
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ShopCard
          key={product.id}
          product={product}
          discount={product.discount}
          username={username}
        />
      ))}
    </div>
  );
}
