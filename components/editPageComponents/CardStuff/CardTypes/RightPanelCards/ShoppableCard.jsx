'use client';

import React, { useState, useEffect, useMemo } from 'react';

import { useRouter } from 'next/navigation';
import { useItems } from '@/app/contexts/ItemsContext';
import { useShop } from '@/app/contexts/ShopContext';
import { useCart } from '@/app/contexts/CartContext';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { ChevronLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import EmptyState from '@/components/EmptyState';
import ShopCard from './ShoppableCardTypes/ShopCard';
import { fetchDiscountById } from '@/lib/helpers/supabaseProductHelpers';
import { trackButtonClick } from '@/lib/analyticsTrackers/trackButtonClick';

const ShoppableCard = ({
  card,
  itemId,
  isEditing,
  tenant = false,
  username,
  themeData,
}) => {
  const { updateItemContent } = useItems();
  const { products, discounts } = useShop();
  const { cart, addToCart, updateCartQuantity, removeFromCart } = useCart();

  const router = useRouter();

  // Shared states - preserve the original product data without type inference
  const [selectedProduct, setSelectedProduct] = useState(() => {
    const product = { ...card };

    // Ensure access_url is properly formatted as array if it exists
    try {
      if (card?.access_url) {
        const accessUrls =
          typeof card.access_url === 'string'
            ? JSON.parse(card.access_url)
            : card.access_url;

        if (Array.isArray(accessUrls)) {
          product.access_url = accessUrls;
        } else if (typeof card.access_url === 'string') {
          product.access_url = [card.access_url];
        }
      }
    } catch (e) {
      // If parsing fails, convert string to array
      if (typeof card?.access_url === 'string' && card.access_url.trim()) {
        product.access_url = [card.access_url];
      }
    }

    // Debug log for tenant view
    if (tenant) {
      console.log(
        'ShoppableCard tenant view - product type:',
        product.product_type,
        'full product:',
        product
      );
    }

    return product;
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [discount, setDiscount] = useState(null);

  // Initial setup with direct discount loading for tenant view
  useEffect(() => {
    // If we're in tenant mode and there's a discount_id but no discount data,
    // fetch the discount directly
    if (tenant && card?.discount_id && !card?.discount) {
      const loadTenantDiscount = async () => {
        try {
          const discountData = await fetchDiscountById(card.discount_id);

          if (discountData) {
            // Format the discount data
            const formattedDiscount = {
              type: discountData.type,
              value: discountData.value,
            };

            setDiscount(formattedDiscount);

            // Update the selected product with embedded discount
            setSelectedProduct((prev) => ({
              ...prev,
              discount: formattedDiscount,
            }));
          }
        } catch (error) {
          console.error('Error loading discount for tenant:', error);
        }
      };

      loadTenantDiscount();
    } else if (card?.discount) {
      // If discount is already in the card data, use it directly
      setDiscount(card.discount);
    }
  }, [card, tenant]);

  // Load discount information if product has discount_id - for edit mode
  useEffect(() => {
    // Only run this in edit mode
    if (tenant) return;

    const loadDiscount = async () => {
      if (selectedProduct?.discount_id) {
        try {
          // Find the discount in the discounts array
          const productDiscount = discounts?.find(
            (d) => d.id === selectedProduct.discount_id
          );

          if (productDiscount) {
            setDiscount(productDiscount);
          } else {
            setDiscount(null);
          }
        } catch (error) {
          console.error('Error loading discount:', error);
          setDiscount(null);
        }
      } else if (selectedProduct?.discount) {
        setDiscount(selectedProduct.discount);
      } else {
        setDiscount(null);
      }
    };

    loadDiscount();
  }, [selectedProduct, discounts, tenant]);

  // Shared function
  const handleMouseDown = () => setIsDragging(false);
  const handleMouseMove = () => setIsDragging(true);

  const handleProductSelect = (product) => {
    // Find any associated discount for this product
    const productDiscount = product.discount_id
      ? discounts?.find((d) => d.id === product.discount_id)
      : null;

    // Create a consistent product structure for the card
    const formattedProduct = {
      id: product.id,
      title: product.title || product.name,
      description: product.description,
      type: product.type,
      price: product.price,
      image: product.image || (product.images ? product.images[0] : ''),
      file_url: product.file_url,
      access_url: product.access_url,
      product_type: product.product_type, // Include the product type for external link handling
      discount_id: product.discount_id || null,
      // Include discount information directly in the product object
      discount: productDiscount
        ? {
            type: productDiscount.type,
            value: productDiscount.value,
          }
        : null,
    };

    updateItemContent(itemId, formattedProduct);
    setSelectedProduct(formattedProduct);

    // Update the discount state as well
    if (productDiscount) {
      setDiscount({
        type: productDiscount.type,
        value: productDiscount.value,
      });
    } else {
      setDiscount(null);
    }
  };

  // Filter products based on search term - adapt to handle both title and name properties
  const filteredProducts = products.filter((product) => {
    const searchableTitle = product.title || product.name || '';
    return searchableTitle.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // ======== THEMEING ======= //
  const getTextColor = () => {
    return themeData?.textMode === 'dark' ? 'text-black' : 'text-white';
  };

  return (
    <>
      <motion.main
        className={`relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-2xl ${getTextColor()} ${isEditing ? 'cursor-default' : 'cursor-pointer'} transition-all duration-300`}
        onClick={(e) => tenant && trackButtonClick(e, username, card?.title)}
        initial="hidden"
        animate="visible"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !tenant && setIsHovered(true)}
        onMouseLeave={() => !tenant && setIsHovered(false)}
      >
        {/* Button to open the dialog for PRODUCT selection */}
        {isHovered && !isEditing && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300">
            {selectedProduct ? (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDialogOpen(true);
                }}
                variant="default"
              >
                Change Product
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDialogOpen(true);
                }}
                variant="default"
              >
                Choose a Product
              </Button>
            )}
          </div>
        )}

        <ShopCard
          sizeKey={card?.sizeKey}
          product={selectedProduct}
          discount={selectedProduct?.discount || discount}
          username={username}
          themeData={themeData}
        />
      </motion.main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-md flex items-center gap-2 text-left font-bold md:text-xl">
              Select a Product
            </DialogTitle>
          </DialogHeader>

          <div className="relative p-4">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
            <Input
              type="text"
              placeholder="Search for a product..."
              value={searchTerm}
              onChange={(e) => {
                e.stopPropagation();
                setSearchTerm(e.target.value);
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="pl-10"
            />
          </div>

          <div className="flex max-h-[400px] flex-col items-center justify-start gap-4 overflow-y-auto p-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex w-full cursor-pointer gap-2 rounded-lg border bg-white p-4 transition duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductSelect(product);
                    setIsDialogOpen(false);
                  }}
                >
                  <Image
                    src={
                      product.image ||
                      (product.images && product.images[0]) ||
                      ''
                    }
                    alt={product.title || product.name || 'Product'}
                    width={50}
                    height={50}
                    className="mb-2 aspect-square rounded-md object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {product.title || product.name}
                    </h3>
                    <p className="text-gray-600">{product.description}</p>
                    {product.discount_id &&
                      discounts?.find((d) => d.id === product.discount_id) && (
                        <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600">
                          Discount Applied
                        </span>
                      )}
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                title="No Products Found"
                text="You can add a product real quick"
                buttonText="Add"
                onClick={() => router.push('/dashboard/shop/inventory')}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShoppableCard;
