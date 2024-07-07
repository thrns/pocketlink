'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

// Helper function to calculate the discounted price
const calculateDiscountedPrice = (price, discount) => {
  if (!discount || !price) return null;

  const originalPrice = parseFloat(price);
  if (isNaN(originalPrice)) return null;

  if (discount.type === 'percentage') {
    const discountAmount = originalPrice * (discount.value / 100);
    return (originalPrice - discountAmount).toFixed(2);
  } else if (discount.type === 'fixed') {
    const discountedPrice = originalPrice - parseFloat(discount.value);
    return discountedPrice > 0 ? discountedPrice.toFixed(2) : '0.00';
  }

  return null;
};

// Skeleton loader that matches the ShopCard layout
export const ShopCardSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg border-none bg-white shadow-none dark:bg-gray-800">
      {/* Image skeleton */}
      <Skeleton className="h-[200px] w-full bg-gray-200 dark:bg-gray-700 sm:h-[220px]" />

      {/* Product Details skeleton */}
      <div className="flex flex-grow flex-col p-4">
        <Skeleton className="mb-2 h-5 w-3/4 bg-gray-200 dark:bg-gray-700" />{' '}
        {/* Title */}
        <Skeleton className="mb-1 h-4 w-full bg-gray-200 dark:bg-gray-700" />{' '}
        {/* Description line 1 */}
        <Skeleton className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700" />{' '}
        {/* Description line 2 */}
      </div>

      {/* Price Section skeleton */}
      <div className="px-4 pb-2">
        <Skeleton className="h-6 w-20 bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Add to Cart Button skeleton */}
      <div className="mt-auto px-4 pb-4">
        <Skeleton className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
};

const ShopCard = ({
  sizeKey,
  product,
  discount,
  username,
  loading = false,
  themeData,
}) => {
  const router = useRouter();
  const { cartItems, addToCart, updateCartQuantity, removeFromCart, isInCart } =
    useCart();

  const [imageUrl, setImageUrl] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(null);

  // Debug log to check product type
  React.useEffect(() => {
    if (product?.product_type) {
      console.log(
        'ShopCard - Product type:',
        product.product_type,
        'Product:',
        product
      );
    }
  }, [product]);

  const defaultGradients = useMemo(
    () => [
      '/shop/gradients/shopGradient1.jpg',
      '/shop/gradients/shopGradient2.jpg',
      '/shop/gradients/shopGradient3.jpg',
      '/shop/gradients/shopGradient4.jpg',
    ],
    []
  );

  // Calculate discounted price
  useEffect(() => {
    if (product?.price) {
      const appliedDiscount = discount || product?.discount;
      if (appliedDiscount) {
        const newPrice = calculateDiscountedPrice(
          product.price,
          appliedDiscount
        );
        setDiscountedPrice(newPrice);
      }
    }
  }, [product?.price, product?.discount, discount]);

  useEffect(() => {
    if (product?.image) {
      setImageUrl(product.image);
    } else if (!imageUrl) {
      const randomGradient =
        defaultGradients[Math.floor(Math.random() * defaultGradients.length)];
      setImageUrl(randomGradient);
    }
  }, [product, imageUrl, defaultGradients]);

  // Update quantity when cart changes
  useEffect(() => {
    if (product?.id && cartItems) {
      const cartItem = Array.isArray(cartItems)
        ? cartItems.find((item) => item && item.id === product.id)
        : null;

      if (cartItem) {
        setQuantity(cartItem.quantity);
      } else {
        setQuantity(0);
      }
    } else {
      setQuantity(0);
    }
  }, [cartItems, product?.id]);

  // Handle navigation to product detail page
  const handleProductClick = (e) => {
    e.stopPropagation();
    if (product?.id && product.product_type != 'external_link') {
      router.push(`/product/${product.id}`);
    }
  };

  // Handle external link redirect
  const handleExternalLink = (e) => {
    e.stopPropagation();

    if (
      !product?.access_url ||
      !Array.isArray(product.access_url) ||
      product.access_url.length === 0
    ) {
      toast.error('No affiliate link available');
      return;
    }

    const affiliateUrl = product.access_url[0];
    if (!affiliateUrl || typeof affiliateUrl !== 'string') {
      toast.error('Invalid affiliate link');
      return;
    }

    // Open affiliate link in new tab
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  // Add to cart handler
  const handleAddToCart = (e) => {
    e.stopPropagation();

    // For external link products, redirect to affiliate URL instead
    if (product?.product_type === 'external_link') {
      handleExternalLink(e);
      return;
    }

    if (!product?.id || product?.price === undefined) return; // Only check if price exists, not if it's falsy

    // Create cart item with necessary details
    const cartItem = {
      id: product.id,
      title: product.title || 'Product',
      image: product.image || imageUrl,
      price: product.price,
      discount: discount || product?.discount,
      quantity: 1,
      file_url: product.file_url,
      access_url: product.access_url,
      product_type: product.product_type, // Include product type for shipping logic
    };

    addToCart(cartItem);
  };

  // Increment quantity
  const handleIncrement = (e) => {
    e.stopPropagation();
    if (!product?.id) return;

    // For digital products, limit quantity to 1
    if (product?.product_type === 'digital' && quantity >= 1) {
      toast.info('Digital products are limited to 1 quantity');
      return;
    }

    const newQuantity = quantity + 1;

    const existingItem =
      cartItems && cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      updateCartQuantity(product.id, newQuantity);
    } else {
      // If not in cart, add it
      handleAddToCart(e);
    }
  };

  // Decrement quantity
  const handleDecrement = (e) => {
    e.stopPropagation();
    if (!product?.id || quantity <= 0) return;

    const newQuantity = quantity - 1;

    if (newQuantity === 0) {
      removeFromCart(product.id);
    } else {
      updateCartQuantity(product.id, newQuantity);
    }
  };

  // Show skeleton while loading
  if (loading) {
    return <ShopCardSkeleton />;
  }

  // Check if product is in cart with quantity > 0
  const productInCart =
    product?.id && typeof isInCart === 'function'
      ? isInCart(product.id)
      : quantity > 0;

  return (
    <div
      className="flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-lg border-none p-2 shadow-none transition-all duration-200"
      onClick={handleProductClick}
    >
      {/* Product Image with badge for discounts */}
      {sizeKey !== 'square' && (
        <div
          className={`relative h-[200px] w-full overflow-hidden rounded-2xl ${themeData?.textMode === 'dark' ? 'bg-white' : 'bg-white'} sm:h-[220px]`}
        >
          <Image
            src={imageUrl || defaultGradients[0]}
            alt={product?.title || 'Product Image'}
            fill
            className={`absolute left-0 top-0 h-full w-full rounded-2xl ${
              product?.image ? 'object-contain' : 'object-cover'
            }`}
          />

          {(discount || product?.discount) && (
            <Badge className="absolute right-2 top-2 bg-red-500 text-white dark:bg-red-600">
              {(discount || product?.discount)?.type === 'percentage'
                ? `${(discount || product?.discount)?.value}% off`
                : `₹${(discount || product?.discount)?.value} off`}
            </Badge>
          )}
        </div>
      )}

      {/* Product Details */}
      <div className="flex flex-grow flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
          {product?.title || 'No product chosen'}
        </h3>
        {product?.description && (
          <p className={`mt-1 text-xs text-gray-700 dark:text-gray-300 ${sizeKey === 'square' ? 'line-clamp-1' : 'line-clamp-2'}`}>
            {product?.description}
          </p>
        )}
      </div>

      {/* Price Section */}
      <div className="px-4 pb-2">
        {(discount || product?.discount) && discountedPrice ? (
          <div className="flex items-center">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {`${product?.currency || '₹'}${discountedPrice}`}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 line-through dark:text-gray-400">
                  {`${product?.currency || '₹'}${product.price || '0'}`}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <span className="text-lg font-bold text-gray-900 dark:text-white">{`${
            product?.currency || '₹'
          }${product.price || '0'}`}</span>
        )}
      </div>

      {/* Add to Cart Button or Quantity Controls */}
      <div className="mt-auto px-4 pb-4">
        {product?.product_type === 'external_link' ? (
          // External link button - redirect to affiliate URL
          <Button
            className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-800 py-2 text-white transition-colors dark:bg-gray-200 dark:text-gray-900"
            onClick={handleExternalLink}
          >
            <span>Buy Now</span>
            <ArrowRight size={16} />
          </Button>
        ) : productInCart ? (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecrement}
              className="h-9 w-9 border-gray-300 bg-gray-100 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            >
              <Minus size={16} />
            </Button>
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleIncrement}
              disabled={product?.product_type === 'digital' && quantity >= 1}
              className="h-9 w-9 border-gray-300 bg-gray-100 text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            >
              <Plus size={16} />
            </Button>
          </div>
        ) : (
          <Button
            disabled={product?.price === undefined} // Only disable if price is undefined, not if it's zero
            className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-800 py-2 text-white transition-colors dark:bg-gray-200 dark:text-gray-900"
            onClick={handleAddToCart}
          >
            <span>Add to Cart</span>
            <ShoppingCart size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShopCard;
