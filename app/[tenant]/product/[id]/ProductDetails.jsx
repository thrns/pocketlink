'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Heart,
  Share2,
  ArrowRight,
  Check,
  Copy,
  CheckCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/contexts/CartContext';
import { useShop } from '@/app/contexts/ShopContext';
import { useCheckoutAuth } from '@/app/contexts/CheckoutAuthContext';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateDiscountedPrice } from '@/lib/helpers/productHelpers';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Cart from '@/app/[tenant]/components/Cart';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProductDetails({ initialProduct, productId }) {
  // Safely extract context values with fallbacks
  const {
    products = [],
    testimonials = [],
    addTestimonial = () => {},
    // Smart loading functions
    loadProductLikes,
    loadProductReviewsOnDemand,
    addProductReview,
    getProductReviews,
    getReviewStats,
    toggleProductLike,
    getProductLikes,
  } = useShop() || {};

  const {
    cartItems = [],
    addToCart = () => {},
    updateCartQuantity = () => {},
    removeFromCart = () => {},
    isInCart = () => false,
  } = useCart() || {};

  // Get user authentication info
  const checkoutAuthContext = useCheckoutAuth();
  const { userEmail, isAuthenticated } = checkoutAuthContext || {};

  // Debug authentication state
  useEffect(() => {
    console.log('ProductDetails Auth Debug:', {
      isAuthenticated,
      userEmail,
      hasCheckoutAuth: isAuthenticated !== undefined,
      fullContext: checkoutAuthContext,
    });
  }, [isAuthenticated, userEmail, checkoutAuthContext]);

  // State for product data with safe initialization
  const [product, setProduct] = useState(() => {
    // Validate initial product to ensure it has required fields
    if (!initialProduct || typeof initialProduct !== 'object') return null;

    // Ensure price is a number
    const safeProduct = { ...initialProduct };
    if (typeof safeProduct.price !== 'number' || isNaN(safeProduct.price)) {
      safeProduct.price = 0;
    }

    return safeProduct;
  });

  const [productLoading, setProductLoading] = useState(!initialProduct);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);

  // For testimonial form
  const [userName, setUserName] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [testimonialText, setTestimonialText] = useState('');
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Database reviews and likes state
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [likesLoading, setLikesLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load only likes initially (needed for heart button)
  useEffect(() => {
    const loadInitialData = async () => {
      if (!product?.id || !product?.username || !loadProductLikes) return;

      try {
        setLikesLoading(true);
        setDataLoaded(false);

        // Only load likes initially - reviews loaded on demand
        await loadProductLikes(
          product.id,
          product.username,
          isAuthenticated ? userEmail : null
        );

        setLikesLoading(false);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error loading product likes:', error);
        setLikesLoading(false);
        setDataLoaded(true);
      }
    };

    loadInitialData();
  }, [
    product?.id,
    product?.username,
    isAuthenticated,
    userEmail,
    loadProductLikes,
  ]);

  // Load reviews when user scrolls to reviews section
  useEffect(() => {
    const loadReviewsIfNeeded = async () => {
      if (!product?.id || !product?.username || !loadProductReviewsOnDemand)
        return;

      // Only load reviews if not already loaded and if component is visible
      const existingReviews = getProductReviews?.(product.id, product.username);
      if (!existingReviews || existingReviews.length === 0) {
        try {
          setReviewsLoading(true);
          await loadProductReviewsOnDemand(product.id, product.username);
          setReviewsLoading(false);
        } catch (error) {
          console.error('Error loading product reviews:', error);
          setReviewsLoading(false);
        }
      } else {
        setReviewsLoading(false);
      }
    };

    // Delay loading reviews slightly to prioritize likes
    const timeoutId = setTimeout(loadReviewsIfNeeded, 500);
    return () => clearTimeout(timeoutId);
  }, [
    product?.id,
    product?.username,
    loadProductReviewsOnDemand,
    getProductReviews,
  ]);

  // Update quantity when cart changes - fix synchronization issues
  useEffect(() => {
    if (!product?.id || !Array.isArray(cartItems)) return;

    // Find the item in cart
    const cartItem = cartItems.find((item) => item && item.id === product.id);

    // Always update quantity based on cart state
    if (cartItem && typeof cartItem.quantity === 'number') {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(0);
    }
  }, [cartItems, product?.id]);

  // Load testimonials
  useEffect(() => {
    // Once testimonials are loaded from context
    if (
      Array.isArray(testimonials) &&
      (testimonials.length > 0 || !testimonials.loading)
    ) {
      setTestimonialsLoading(false);
    }
  }, [testimonials]);

  // Get product reviews from database
  const productReviews = useMemo(() => {
    if (!product?.id || !product?.username || !getProductReviews) return [];
    return getProductReviews(product.id, product.username);
  }, [product?.id, product?.username, getProductReviews]);

  // Get review stats from database
  const reviewStats = useMemo(() => {
    if (!product?.id || !product?.username || !getReviewStats)
      return { avg_rating: 0, total_reviews: 0 };
    return getReviewStats(product.id, product.username);
  }, [product?.id, product?.username, getReviewStats]);

  // Get product likes from database - stabilize to prevent flickering
  const likeData = useMemo(() => {
    if (!product?.id || !product?.username || !getProductLikes || !dataLoaded) {
      return { count: 0, userLiked: false };
    }
    const data = getProductLikes(product.id, product.username);
    // Ensure stable object structure
    return {
      count: data?.count || 0,
      userLiked: Boolean(data?.userLiked),
    };
  }, [product?.id, product?.username, getProductLikes, dataLoaded]);

  // Check if this product is in the cart and has quantity > 0
  const productInCart = useMemo(() => {
    if (!product?.id || typeof isInCart !== 'function') return false;

    try {
      return isInCart(product.id);
    } catch (error) {
      return false;
    }
  }, [product?.id, isInCart]);

  // Create an array of product images or use placeholders
  const productImages = useMemo(() => {
    if (!product) return ['/shop/gradients/shopGradient1.jpg'];

    // First attempt to get images from product.images
    if (product.images) {
      // Handle array of images
      if (Array.isArray(product.images) && product.images.length > 0) {
        const validImages = product.images.filter(
          (img) => img && typeof img === 'string'
        );
        if (validImages.length > 0) return validImages;
      }

      // Handle JSON string of images
      if (typeof product.images === 'string') {
        try {
          if (product.images.startsWith('[') && product.images.endsWith(']')) {
            const parsed = JSON.parse(product.images);
            if (Array.isArray(parsed) && parsed.length > 0) {
              return parsed.filter((img) => img && typeof img === 'string');
            }
          }
          // Single image string
          return [product.images];
        } catch (e) {
          // If parsing fails, treat as a single image string
          return [product.images];
        }
      }
    }

    // Check for single image
    if (product.image && typeof product.image === 'string') {
      return [product.image];
    }

    // Check for imageString
    if (product.imageString && typeof product.imageString === 'string') {
      return [product.imageString];
    }

    // Fallback to default placeholder
    return ['/shop/gradients/shopGradient1.jpg'];
  }, [product]);

  // Calculate average rating from database stats
  const avgRating = useMemo(() => {
    return Number(reviewStats.avg_rating || 0).toFixed(1);
  }, [reviewStats.avg_rating]);

  // Calculate discounted price if applicable
  const discountedPrice = useMemo(() => {
    if (!product?.price || typeof product.price !== 'number') return null;
    if (!product.discount) return null;

    try {
      return calculateDiscountedPrice(product.price, product.discount);
    } catch (error) {
      return null;
    }
  }, [product?.price, product?.discount]);

  // Handle external link redirect
  const handleExternalLink = () => {
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

  // Add to cart handler with animation feedback
  const handleAddToCart = () => {
    // For external link products, redirect to affiliate URL instead
    if (product?.product_type === 'external_link') {
      handleExternalLink();
      return;
    }

    if (
      !product?.id ||
      typeof product.price !== 'number' ||
      typeof addToCart !== 'function'
    ) {
      return;
    }

    try {
      // Don't add to cart if already added - use increment instead
      const existingItem = Array.isArray(cartItems)
        ? cartItems.find((item) => item && item.id === product.id)
        : null;

      if (existingItem) {
        handleIncrement();
        return;
      }

      // Ensure image is always a string
      let productImage = '';

      // Select the best available image
      if (Array.isArray(productImages) && productImages.length > 0) {
        productImage = productImages[0]; // Already filtered for valid strings
      } else if (
        typeof product.imageString === 'string' &&
        product.imageString
      ) {
        productImage = product.imageString;
      } else if (typeof product.image === 'string' && product.image) {
        productImage = product.image;
      }

      // Create cart item with necessary details
      const cartItem = {
        id: product.id,
        title: product.title || product.name || 'Unnamed Product',
        image: productImage,
        price: product.price, // Use original price, not discounted price
        discount: product.discount || null, // Pass discount object for cart to handle
        quantity: 1,
        product_type: product.product_type, // Include product type for shipping logic
        file_url: Array.isArray(product.file_url)
          ? product.file_url
          : typeof product.file_url === 'string'
            ? product.file_url.startsWith('[') && product.file_url.endsWith(']')
              ? JSON.parse(product.file_url)
              : [product.file_url]
            : [],
        access_url: Array.isArray(product.access_url)
          ? product.access_url
          : typeof product.access_url === 'string'
            ? product.access_url.startsWith('[') &&
              product.access_url.endsWith(']')
              ? JSON.parse(product.access_url)
              : [product.access_url]
            : [],
      };

      // Add to cart
      addToCart(cartItem);

      // Show success animation
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 1500);

      // Create and play sound effect (only in browser environment)
      if (typeof window !== 'undefined') {
        try {
          const audio = new Audio('/pop.mp3');
          audio.play().catch(() => {
            // Silently fail if audio playback is blocked
          });
        } catch (error) {
          // Silently fail if audio creation fails
        }
      }

      // Try to trigger cart UI elements if they exist
      if (typeof window !== 'undefined') {
        try {
          // Show cart popover after adding item
          const cartTrigger = document.querySelector('[data-cart-trigger]');
          if (cartTrigger) cartTrigger.click();

          // Auto-hide cart popover after a delay
          setTimeout(() => {
            const closeButton = document.querySelector('[data-popover-close]');
            if (closeButton) closeButton.click();
          }, 3000);
        } catch (uiError) {
          // Silently fail if UI manipulation fails
        }
      }
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  // Increment quantity safely
  const handleIncrement = () => {
    if (!product?.id || typeof updateCartQuantity !== 'function') return;

    try {
      // Check if this is a digital product
      const isDigitalProduct = product.product_type === 'digital';

      // Get current quantity from cart or default to 0
      const existingItem = Array.isArray(cartItems)
        ? cartItems.find((item) => item && item.id === product.id)
        : null;

      const currentQuantity =
        existingItem && typeof existingItem.quantity === 'number'
          ? existingItem.quantity
          : 0;

      // For digital products, don't allow quantity > 1
      if (isDigitalProduct && currentQuantity >= 1) {
        toast.info('Digital products can only have a quantity of 1');
        return;
      }

      const newQuantity = currentQuantity + 1;

      if (existingItem) {
        // Update existing cart item
        updateCartQuantity(product.id, newQuantity);
      } else {
        // If not in cart, add it
        handleAddToCart();
      }
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  // Decrement quantity safely
  const handleDecrement = () => {
    if (
      !product?.id ||
      typeof updateCartQuantity !== 'function' ||
      typeof removeFromCart !== 'function'
    )
      return;

    try {
      // Get current quantity from cart
      const existingItem = Array.isArray(cartItems)
        ? cartItems.find((item) => item && item.id === product.id)
        : null;

      if (
        !existingItem ||
        typeof existingItem.quantity !== 'number' ||
        existingItem.quantity <= 0
      )
        return;

      const newQuantity = existingItem.quantity - 1;

      if (newQuantity === 0) {
        removeFromCart(product.id);
      } else {
        updateCartQuantity(product.id, newQuantity);
      }
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  // Toggle wishlist
  const handleToggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  // Handle like toggle
  const handleToggleLike = async () => {
    if (!isAuthenticated || !userEmail) {
      toast.error('Please log in to like products');
      return;
    }

    if (!product?.id || !product?.username) {
      toast.error('Product information not available');
      return;
    }

    try {
      await toggleProductLike(product.id, product.username, userEmail);
    } catch (error) {
      // Error is already handled in the context function
      console.error('Error toggling like:', error);
    }
  };

  // Submit review to database
  const handleSubmitTestimonial = async (e) => {
    e.preventDefault();

    // Check authentication
    if (!isAuthenticated || !userEmail) {
      toast.error('Please log in to submit a review');
      return;
    }

    if (!testimonialText.trim()) {
      toast.error('Please write a review');
      return;
    }

    if (!product?.id || !product?.username) {
      toast.error('Product information not available');
      return;
    }

    try {
      // Use reviewer name or fallback to Gmail name (part before @)
      const displayName =
        reviewerName.trim() || userEmail?.split('@')[0] || 'Anonymous';

      await addProductReview(
        product.id,
        product.username,
        userEmail,
        rating,
        testimonialText.trim(),
        displayName
      );

      // Reset form
      setRating(5);
      setTestimonialText('');
      setReviewerName('');
      setShowTestimonialForm(false);
    } catch (error) {
      // Error is already handled in the context function
      console.error('Error submitting review:', error);
    }
  };

  // Handle share product link safely
  const handleShareProduct = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      toast.error('Sharing not supported in your browser');
      return;
    }

    // Get the current URL
    const productUrl =
      typeof window !== 'undefined' ? window.location.href : '';
    if (!productUrl) {
      toast.error('Failed to get product URL');
      return;
    }

    try {
      // Try to use the navigator.clipboard API
      await navigator.clipboard.writeText(productUrl);

      // Show toast notification
      toast.success('Product link copied to clipboard', {
        duration: 2000,
        icon: <Copy className="h-4 w-4" />,
      });

      // Show visual feedback on the share button
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      toast.error('Failed to copy link. Please try again.');
    }
  };

  // If no product data is available at all
  if (!product && productLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Back button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 text-blue-800 transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to shop
        </Link>

        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Product Image skeleton */}
          <div className="space-y-4">
            <Skeleton className="relative h-[400px] rounded-lg md:h-[500px]" />
            <div className="mt-4 flex gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-md" />
              ))}
            </div>
          </div>

          {/* Product Info skeleton */}
          <div className="flex flex-col space-y-6">
            <Skeleton className="h-9 w-3/4" /> {/* Title */}
            {/* Price section skeleton */}
            <div>
              <Skeleton className="h-8 w-28" />
            </div>
            {/* Product description skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            {/* Add to cart button skeleton */}
            <div className="mt-6">
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4">
        <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
        <p className="mb-6 text-center">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/" className="flex items-center text-blue-600 underline">
          Return to Home
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    );
  }

  // Return null during server-side rendering to prevent hydration errors
  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb navigation */}
        <div className="mb-2 flex items-center text-sm text-gray-500 md:mb-8">
          <Link href="/" className="text-gray-900 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>

          <span className="line-clamp-1 font-medium text-gray-900">
            {product.title || product.name || 'Product'}
          </span>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Product Image Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-[400px] overflow-hidden rounded-lg border bg-gray-50 md:h-[500px]">
              <Image
                src={
                  productImages[selectedImage] ||
                  '/shop/gradients/shopGradient1.jpg'
                }
                alt={product.title || product.name || 'Product'}
                fill
                className="object-contain p-4"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.src = '/shop/gradients/shopGradient1.jpg';
                }}
              />

              {product.discount && (
                <Badge className="absolute left-4 top-4 bg-red-500 bg-red-600 px-3 py-1 font-medium text-white">
                  {product.discount.type === 'percentage'
                    ? `${product.discount.value}% OFF`
                    : `₹${product.discount.value} OFF`}
                </Badge>
              )}

              {/* In stock indicator */}
              <div className="absolute bottom-4 left-4 flex items-center rounded-full bg-white bg-opacity-80 px-3 py-1">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">In Stock</span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <div
                    key={index}
                    className={`relative h-24 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-all ${
                      selectedImage === index
                        ? 'border-blue-500'
                        : 'border-gray-200 border-gray-300'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={img}
                      alt={`${product.title || product.name || 'Product'} - view ${
                        index + 1
                      }`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.src =
                          '/shop/gradients/shopGradient1.jpg';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Title and rating */}
            <div className="mb-4">
              <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                {product.title || product.name || 'Product'}
              </h1>

              <div className="flex items-center">
                <div className="mr-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(Number(avgRating) || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {avgRating > 0
                    ? `${avgRating} stars (${reviewStats.total_reviews} reviews)`
                    : 'No reviews yet'}
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="mb-6">
              {discountedPrice ? (
                <div className="flex flex-wrap items-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {`${product?.currency || '₹'}${discountedPrice}`}
                  </span>
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    {`${product?.currency || '₹'}${product.price}`}
                  </span>
                  <span className="ml-3 text-sm font-medium text-green-600">
                    {product.discount?.type === 'percentage'
                      ? `Save ${product.discount.value}%`
                      : `Save ${product?.currency || '₹'}${
                          product.discount?.value || 0
                        }`}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {`${product?.currency || '₹'}${typeof product.price === 'number' ? product.price : 0}`}
                </span>
              )}
            </div>

            {/* Product description */}
            <div className="prose prose-sm mb-8 max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                {product.description || 'No description available.'}
              </p>
            </div>

            {/* Features list if available */}
            {product.features &&
              Array.isArray(product.features) &&
              product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-3 text-sm font-medium text-gray-900">
                    Key Features:
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Add to cart section */}
            <div className="mt-auto space-y-4">
              <div className="mt-4">
                {product?.product_type === 'external_link' ? (
                  // External link button - redirect to affiliate URL
                  <Button
                    onClick={handleExternalLink}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 bg-blue-700 py-3 text-white transition-colors"
                  >
                    <span>View Product</span>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                ) : productInCart ? (
                  // Quantity controls for when product is in cart
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleDecrement}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-xl font-medium">
                      {quantity}
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleIncrement}
                            disabled={
                              product?.product_type === 'digital' &&
                              quantity >= 1
                            }
                            className={`h-10 w-10 ${
                              product?.product_type === 'digital' &&
                              quantity >= 1
                                ? 'cursor-not-allowed opacity-50'
                                : ''
                            }`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        {product?.product_type === 'digital' &&
                          quantity >= 1 && (
                            <TooltipContent>
                              <p>
                                Digital products can only have a quantity of 1
                              </p>
                            </TooltipContent>
                          )}
                      </Tooltip>
                    </TooltipProvider>

                    {/* Add to cart button can be kept, but shown conditionally */}
                    <Button
                      onClick={handleAddToCart}
                      className={`ml-4 flex items-center justify-center gap-2 rounded-md bg-gray-800 bg-gray-900 px-8 py-2 text-white ${
                        addedToCart ? 'animate-pulse' : ''
                      }`}
                    >
                      {addedToCart ? (
                        <>
                          <Check className="h-5 w-5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <span>Add More</span>
                          <ShoppingCart className="h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  // Regular add to cart button when product is not in cart
                  <Button
                    onClick={handleAddToCart}
                    className={`flex w-full items-center justify-center gap-2 rounded-md bg-gray-800 bg-gray-900 py-3 text-white ${
                      addedToCart ? 'animate-pulse' : ''
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="h-5 w-5" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <span>Add to Cart</span>
                        <ShoppingCart className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Additional action buttons */}
              <div className="mt-4 flex gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleToggleLike}
                          disabled={!dataLoaded || likesLoading}
                          className={`h-10 w-10 rounded-full transition-all duration-200 ${
                            dataLoaded && likeData.userLiked
                              ? 'border-red-200 bg-red-50 text-red-500 dark:bg-red-900/20'
                              : 'border-gray-200 bg-gray-50 text-gray-500'
                          }`}
                        >
                          <Heart
                            className={`h-5 w-5 transition-all duration-200 ${
                              dataLoaded && likeData.userLiked
                                ? 'fill-red-500 text-red-500'
                                : 'text-gray-500'
                            }`}
                          />
                        </Button>
                        {dataLoaded && likeData.count > 0 && (
                          <span className="text-sm text-gray-600">
                            {likeData.count}
                          </span>
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {!dataLoaded
                          ? 'Loading...'
                          : likeData.userLiked
                            ? `Unlike (${likeData.count} likes)`
                            : `Like (${likeData.count} likes)`}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full"
                        onClick={handleShareProduct}
                      >
                        {isCopied ? (
                          <CheckCheck className="h-5 w-5 text-green-500" />
                        ) : (
                          <Share2 className="h-5 w-5" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isCopied ? 'Link copied!' : 'Share product'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        {/* More Products Section */}
        {products && products.length > 1 && (
          <div className="mt-12 w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                More Products
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Discover other amazing products from our collection
              </p>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="pb-12"
            >
              {products
                .filter((p) => p.id !== product?.id)
                .map((relatedProduct) => {
                  const discountedPrice = relatedProduct.discount
                    ? calculateDiscountedPrice(
                        relatedProduct.price,
                        relatedProduct.discount.type,
                        relatedProduct.discount.value
                      )
                    : null;

                  return (
                    <SwiperSlide key={relatedProduct.id}>
                      <Link
                        href={`/${product?.username}/product/${relatedProduct.id}`}
                        className="group block"
                      >
                        <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
                          <div className="relative aspect-square overflow-hidden">
                            <Image
                              src={
                                relatedProduct.image ||
                                relatedProduct.images?.[0] ||
                                '/placeholder-product.jpg'
                              }
                              alt={relatedProduct.title || relatedProduct.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                            {relatedProduct.discount && (
                              <div className="absolute left-2 top-2">
                                <Badge className="bg-red-500 text-white">
                                  {relatedProduct.discount.type === 'percentage'
                                    ? `${relatedProduct.discount.value}% OFF`
                                    : `$${relatedProduct.discount.value} OFF`}
                                </Badge>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900 dark:text-white">
                              {relatedProduct.title || relatedProduct.name}
                            </h3>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {discountedPrice ? (
                                  <>
                                    <span className="text-lg font-bold text-green-600">
                                      ${discountedPrice.toFixed(2)}
                                    </span>
                                    <span className="text-sm text-gray-500 line-through">
                                      ${relatedProduct.price.toFixed(2)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                                    ${relatedProduct.price.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="opacity-0 transition-opacity group-hover:opacity-100"
                                onClick={(e) => {
                                  e.preventDefault();
                                  addToCart({
                                    ...relatedProduct,
                                    quantity: 1,
                                  });
                                  toast.success('Added to cart!');
                                }}
                              >
                                <ShoppingCart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        )}

        {/* Customer Reviews Section */}
        <div className="mt-12 w-full">
          <div className="px-4 sm:px-6 lg:px-0">
            <div className="mb-8 flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl">
                  Customer Reviews
                </h2>
                {reviewStats.total_reviews > 0 && (
                  <div className="mt-2 flex items-center">
                    <div className="mr-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.round(Number(avgRating) || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {avgRating} out of 5
                    </span>
                  </div>
                )}
              </div>
              <Button
                onClick={() => setShowTestimonialForm(!showTestimonialForm)}
                className={
                  showTestimonialForm
                    ? 'w-full bg-gray-200 bg-gray-300 text-gray-800 sm:w-auto'
                    : 'w-full sm:w-auto'
                }
              >
                {showTestimonialForm ? 'Cancel' : 'Write a Review'}
              </Button>
            </div>

            {/* Testimonial submission form */}
            {showTestimonialForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-10"
              >
                <div className="rounded-lg border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50 sm:p-6">
                  <form onSubmit={handleSubmitTestimonial}>
                    <h3 className="mb-6 text-xl font-medium text-gray-900 dark:text-white">
                      Share Your Experience
                    </h3>

                    {isAuthenticated && userEmail && (
                      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Reviewing as: {userEmail}
                      </p>
                    )}

                    <div className="mb-6 grid gap-4 sm:gap-6">
                      <div>
                        <label
                          htmlFor="reviewerName"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your Name
                        </label>
                        <input
                          id="reviewerName"
                          type="text"
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          placeholder={
                            userEmail?.split('@')[0] || 'Enter your name'
                          }
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                          maxLength={100}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="rating"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Rating
                        </label>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-7 w-7 cursor-pointer transition-colors ${
                                  star <= rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300 hover:text-gray-400'
                                }`}
                                onClick={() => setRating(star)}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {rating === 1
                              ? 'Poor'
                              : rating === 2
                                ? 'Fair'
                                : rating === 3
                                  ? 'Good'
                                  : rating === 4
                                    ? 'Very Good'
                                    : 'Excellent'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="testimonial"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your Review
                        </label>
                        <Textarea
                          id="testimonial"
                          value={testimonialText}
                          onChange={(e) => setTestimonialText(e.target.value)}
                          placeholder="Share your experience with this product"
                          rows={4}
                          className="w-full"
                          required
                          maxLength={1000}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full px-6 sm:w-auto">
                      Submit Review
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Testimonials list with loading state */}
            {testimonialsLoading ? (
              <div className="space-y-6 sm:space-y-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border-b border-gray-200 pb-6 last:border-0 dark:border-gray-700"
                  >
                    <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="mb-2 h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ))}
              </div>
            ) : Array.isArray(productReviews) && productReviews.length > 0 ? (
              <div className="space-y-6 sm:space-y-8">
                {productReviews.map((review) => {
                  // Skip invalid testimonials
                  if (!review || typeof review !== 'object') return null;

                  // Safely get date with fallback
                  let formattedDate = '';
                  try {
                    formattedDate = review.created_at
                      ? new Date(review.created_at).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )
                      : '';
                  } catch (e) {
                    formattedDate = '';
                  }

                  return (
                    <div
                      key={review.id || `review-${Math.random()}`}
                      className="border-b border-gray-200 pb-6 last:border-0 dark:border-gray-700 sm:pb-8"
                    >
                      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < (review.rating || 0)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {review.user_name ||
                              review.user_email?.split('@')[0] ||
                              'Anonymous'}
                          </span>
                          {formattedDate && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {formattedDate}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="break-words leading-relaxed text-gray-700 dark:text-gray-300">
                        {review.review_text || ''}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 py-8 text-center dark:border-gray-700 dark:bg-gray-900/30 sm:py-12">
                <Star className="mx-auto mb-4 h-10 w-10 text-gray-300 sm:h-12 sm:w-12" />
                <p className="mb-4 px-4 text-gray-600 dark:text-gray-400">
                  No reviews yet. Be the first to share your experience!
                </p>
                {!showTestimonialForm && (
                  <Button
                    variant="outline"
                    onClick={() => setShowTestimonialForm(true)}
                    className="px-6"
                  >
                    Write a Review
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
