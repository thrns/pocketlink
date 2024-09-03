'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Grid2X2, ListCheckIcon, Plus, Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useShop } from '@/app/contexts/ShopContext';

const InventoryHeader = ({
  searchQuery,
  setSearchQuery,
  onCreateCategory,
  isProductPage,
  setCategoryToEdit,
  setProductToEdit,
}) => {
  const router = useRouter();
  const { view, setView } = useShop();
  const pathname = usePathname();

  const showBackButton = pathname !== '/dashboard/shop/inventory';

  const handleBack = () => {
    if (pathname !== '/dashboard/shop/inventory') {
      router.back();
    }
  };

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left side - View toggles and back button */}
      <div className="flex items-center gap-2">
        {showBackButton && (
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft size={16} />
          </Button>
        )}
      </div>

      {/* Right side - Search and Create button */}
      <div className="flex items-center gap-3">
        <div className="flex w-full max-w-sm items-center gap-2 rounded-md border bg-white px-3 py-1">
          <Search size={16} className="text-gray-400" />
          <Input
            type="text"
            placeholder={
              isProductPage ? 'Search products...' : 'Search categories...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 p-0 shadow-none focus-visible:ring-0"
          />
        </div>

        {isProductPage && (
          <Button
            onClick={() => {
              setProductToEdit(null);
              onCreateCategory();
            }}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={16} />
            Add Product
          </Button>
        )}

        {!isProductPage && (
          <Button
            onClick={() => {
              setCategoryToEdit(null);
              onCreateCategory();
            }}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={16} />
            Add Category
          </Button>
        )}
      </div>
    </div>
  );
};

export default InventoryHeader;
