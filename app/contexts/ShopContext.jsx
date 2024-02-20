'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { useAuth } from './AuthContext';
import { useFetch } from './FetcherContext';
import { supabase } from '@/Clients/supabase/client';
import { toast } from 'sonner';
import {
  uploadProductFile,
  uploadProductImage,
  uploadMultipleProductFiles,
  uploadProductFileWithProgress,
  createProduct,
  updateProduct,
  deleteProduct as deleteProductFromDB,
  fetchProducts,
  deleteImage as deleteImageFromStorage,
  deleteFile as deleteFileFromStorage,
  createDiscount,
  updateDiscount,
  deleteDiscount as deleteDiscountFromDB,
  fetchDiscounts,
  updateProductInItems,
} from '@/lib/helpers/supabaseProductHelpers';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const { user } = useAuth();
  const { removeProductFromContext } = useFetch();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');
  const [discounts, setDiscounts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [fileUploadProgress, setFileUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  // Reviews and Likes state
  const [productReviews, setProductReviews] = useState({});
  const [productLikes, setProductLikes] = useState({});
  const [reviewStats, setReviewStats] = useState({});
  // Cache to prevent duplicate API calls
  const [loadedProducts, setLoadedProducts] = useState(new Set());

  // Orders state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  useEffect(() => {
    if (user?.username) {
      loadProducts();
      loadDiscounts();
      loadTestimonials();
      loadOrders();
    }
  }, [user?.username]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts(user?.username);
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const loadDiscounts = async () => {
    try {
      const data = await fetchDiscounts(user?.username);
      setDiscounts(data || []);
    } catch (error) {
      console.error('Error loading discounts:', error);
      toast.error('Failed to load discounts');
    }
  };

  const loadTestimonials = async () => {
    try {
      // Try to load from localStorage first
      const storedTestimonials = localStorage.getItem(
        `testimonials_${user?.username}`
      );

      if (storedTestimonials) {
        setTestimonials(JSON.parse(storedTestimonials));
      } else {
        // In a real implementation, you would fetch from the database
        // For now, initialize with empty array
        setTestimonials([]);
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
      setTestimonials([]);
    }
  };

  const loadOrders = useCallback(async () => {
    if (!user?.username) {
      setOrders([]);
      setOrdersLoading(false);
      return;
    }

    try {
      setOrdersLoading(true);
      setOrdersError(null);

      console.log(
        '🛒 [SHOP_CONTEXT] Fetching orders for merchant:',
        user.username
      );

      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('merchant_username', user.username)
        .order('order_date', { ascending: false });

      if (ordersError) {
        console.error('❌ [SHOP_CONTEXT] Error fetching orders:', ordersError);
        throw ordersError;
      }

      // Process orders data (similar to API processing)
      const processedOrders = (ordersData || []).map((order) => {
        let items = [];
        try {
          items =
            typeof order.items === 'string'
              ? JSON.parse(order.items)
              : order.items || [];
        } catch {
          // ignore JSON parse errors
        }

        let paymentDetails = {};
        try {
          if (order.payment_details) {
            paymentDetails =
              typeof order.payment_details === 'string'
                ? JSON.parse(order.payment_details)
                : order.payment_details;
          }
        } catch {
          // ignore
        }

        return {
          ...order,
          items,
          itemCount: items.length,
          totalQuantity: items.reduce(
            (sum, item) => sum + (parseInt(item.quantity) || 1),
            0
          ),
          paymentDetails,
        };
      });

      console.log(
        '✅ [SHOP_CONTEXT] Orders fetched successfully:',
        processedOrders.length
      );
      setOrders(processedOrders);
    } catch (err) {
      console.error('💥 [SHOP_CONTEXT] Failed to fetch orders:', err);
      setOrdersError(err.message || 'Failed to fetch orders');
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  }, [user?.username]);

  const uploadMultipleImages = async (images) => {
    if (!images || images.length === 0) return [];

    try {
      const uploadPromises = images.map((image) =>
        uploadProductImage(user?.username, image)
      );

      const imageUrls = await Promise.all(uploadPromises);
      return imageUrls;
    } catch (error) {
      console.error('Error uploading multiple images:', error);
      throw new Error(`Failed to upload images: ${error.message}`);
    }
  };

  const uploadFileWithProgress = async (file) => {
    if (!file || !user?.username) {
      return null;
    }

    setIsUploading(true);
    setFileUploadProgress((prev) => ({
      ...prev,
      [file.name]: { progress: 0, status: 'uploading' },
    }));

    try {
      const fileUrl = await uploadProductFileWithProgress(
        user?.username,
        file,
        (progress) => {
          setFileUploadProgress((prev) => ({
            ...prev,
            [file.name]: { progress, status: 'uploading' },
          }));
        }
      );

      setFileUploadProgress((prev) => ({
        ...prev,
        [file.name]: { progress: 100, status: 'complete' },
      }));

      return fileUrl;
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
      setFileUploadProgress((prev) => ({
        ...prev,
        [file.name]: { progress: 0, status: 'error', error: error.message },
      }));

      toast.error(`Failed to upload ${file.name}`);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const addProduct = async (product, images, files) => {
    try {
      let imageUrls = [];

      if (images && images.length > 0) {
        imageUrls = await uploadMultipleImages(images);
      }

      if (product.images && product.images.length > 0) {
        imageUrls = [...product.images, ...imageUrls];
      }

      let fileUrls = [];
      if (files && files.length > 0) {
        fileUrls = await uploadMultipleProductFiles(user?.username, files);
      }

      if (product.file_url && product.file_url.length > 0) {
        fileUrls = [...product.file_url, ...fileUrls];
      }

      const productData = {
        username: user?.username,
        name: product.title,
        description: product.description || '',
        price: product.price || 0,
        type: 'shopCard',
        product_type: product?.product_type || 'digital',
        images: imageUrls,
        file_url: fileUrls,
        access_url: product.access_url || [],
        discount_id: product.discount_id || null, // Store the discount ID
      };

      const newProduct = await createProduct(productData);

      setProducts((prev) => [
        ...prev,
        {
          ...newProduct,
          id: newProduct.id,
          title: newProduct.name,
          image: newProduct.images?.[0] || null,
          file_url: newProduct.file_url || [],
          type: newProduct.type || 'shopCard',
          product_type: newProduct.product_type || null,
          discount_id: newProduct.discount_id, // Ensure discount_id is kept in products state
        },
      ]);

      toast.success('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    }
  };

  const editProduct = async (productId, product, images, files) => {
    try {
      const existingProduct = products.find((p) => p.id === productId);
      if (!existingProduct) {
        throw new Error('Product not found');
      }

      let imageUrls = [];
      if (images && images.length > 0) {
        imageUrls = await uploadMultipleImages(images);
      }

      const finalImages = [...(product.images || []), ...imageUrls];

      let fileUrls = [];
      if (files && files.length > 0) {
        fileUrls = await uploadMultipleProductFiles(user?.username, files);
      }

      const finalFileUrls = [...(product.file_url || []), ...fileUrls];

      const productData = {
        name: product.title,
        description: product.description || '',
        price: product.price || 0,
        type: 'shopCard',
        product_type: product.product_type || 'digital',
        images: finalImages,
        file_url: finalFileUrls,
        access_url: product.access_url || [],
        discount_id: product.discount_id || null, // Store the discount ID
      };

      // Update the product in products_data table
      await updateProduct(productId, productData);

      // Update the product in items_data table (both items and mobile_items columns)
      await updateProductInItems(user?.username, productId, productData);

      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId
            ? {
                ...p,
                title: product.title,
                description: product.description,
                price: product.price,
                images: finalImages,
                image: finalImages[0],
                file_url: finalFileUrls,
                access_url: product.access_url || p.access_url,
                type: 'shopCard',
                product_type: product.product_type || p.product_type || null,
                discount_id: product.discount_id, // Update discount_id in state
              }
            : p
        )
      );

      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  const deleteProduct = async (product) => {
    try {
      // Delete the product from products_data table
      await deleteProductFromDB(user?.username, product.id);
      // Remove the product from items_data table (both items and mobileItems columns)
      //this is being done in deleteProductFromDB.

      // Update local products state
      setProducts((prev) => prev.filter((p) => p.id !== product.id));

      // Remove product from ItemsContext to prevent it from reappearing
      if (removeProductFromContext) {
        removeProductFromContext(product.id);
      }

      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const addDiscount = async (discountData) => {
    try {
      const newDiscount = await createDiscount({
        username: user?.username,
        name: discountData.description || 'Unnamed Discount', // This will use the name passed from UI
        type: discountData.type,
        value:
          discountData.type === 'percentage'
            ? discountData.percentage
            : discountData.amount,
      });

      setDiscounts((prev) => [...prev, newDiscount]);
      toast.success('Discount added successfully!');
      return newDiscount;
    } catch (error) {
      console.error('Error adding discount:', error);
      toast.error('Failed to add discount');
      throw error;
    }
  };

  const editDiscount = async (discountId, discountData) => {
    try {
      const updatedData = {
        name: discountData.description || 'Unnamed Discount', // This will use the name passed from UI
        type: discountData.type,
        value:
          discountData.type === 'percentage'
            ? discountData.percentage
            : discountData.amount,
      };

      const updatedDiscount = await updateDiscount(discountId, updatedData);

      setDiscounts((prev) =>
        prev.map((d) => (d.id === discountId ? updatedDiscount : d))
      );

      toast.success('Discount updated successfully!');
      return updatedDiscount;
    } catch (error) {
      console.error('Error updating discount:', error);
      toast.error('Failed to update discount');
      throw error;
    }
  };

  const deleteDiscountItem = async (discountId) => {
    try {
      await deleteDiscountFromDB(discountId);
      setDiscounts((prev) => prev.filter((d) => d.id !== discountId));
      toast.success('Discount deleted successfully!');
    } catch (error) {
      console.error('Error deleting discount:', error);
      toast.error('Failed to delete discount');
    }
  };

  const addTestimonial = (testimonial) => {
    try {
      const newTestimonials = [...testimonials, testimonial];
      setTestimonials(newTestimonials);

      // Save to localStorage (temporary solution)
      localStorage.setItem(
        `testimonials_${user?.username}`,
        JSON.stringify(newTestimonials)
      );

      toast.success('Thank you for your review!');
      return true;
    } catch (error) {
      console.error('Error adding testimonial:', error);
      toast.error('Failed to submit review. Please try again.');
      return false;
    }
  };

  const deleteTestimonial = (testimonialId) => {
    try {
      const updatedTestimonials = testimonials.filter(
        (t) => t.id !== testimonialId
      );
      setTestimonials(updatedTestimonials);

      // Update localStorage
      localStorage.setItem(
        `testimonials_${user?.username}`,
        JSON.stringify(updatedTestimonials)
      );

      toast.success('Review deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete review');
      return false;
    }
  };

  const editTestimonial = (testimonialId, updatedData) => {
    try {
      const updatedTestimonials = testimonials.map((t) =>
        t.id === testimonialId ? { ...t, ...updatedData } : t
      );

      setTestimonials(updatedTestimonials);

      // Update localStorage
      localStorage.setItem(
        `testimonials_${user?.username}`,
        JSON.stringify(updatedTestimonials)
      );

      toast.success('Review updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast.error('Failed to update review');
      return false;
    }
  };

  // ==============================================================================
  // Product Reviews Functions (Database)
  // ==============================================================================

  // Smart loading - only load what's needed when needed
  const loadProductLikes = async (
    productId,
    merchantUsername,
    userEmail = null
  ) => {
    const key = `${productId}_${merchantUsername}`;

    // Check if likes are already loaded
    if (productLikes[key] && productLikes[key].loaded) {
      return productLikes[key];
    }

    try {
      const promises = [
        supabase.rpc('get_product_like_count', {
          p_product_id: productId,
          p_username: merchantUsername,
        }),
      ];

      if (userEmail) {
        promises.push(
          supabase.rpc('user_liked_product', {
            p_product_id: productId,
            p_username: merchantUsername,
            p_user_email: userEmail,
          })
        );
      }

      const results = await Promise.all(promises);
      const [likeCountResult, userLikedResult] = results;

      const likesData = {
        count: likeCountResult.data || 0,
        userLiked: userEmail ? userLikedResult?.data || false : false,
        loaded: true,
      };

      setProductLikes((prev) => ({ ...prev, [key]: likesData }));
      return likesData;
    } catch (error) {
      console.error('Error loading product likes:', error);
      const fallbackData = { count: 0, userLiked: false, loaded: true };
      setProductLikes((prev) => ({ ...prev, [key]: fallbackData }));
      return fallbackData;
    }
  };

  // Load reviews only when needed (e.g., when user scrolls to reviews section)
  const loadProductReviewsOnDemand = async (productId, merchantUsername) => {
    const key = `${productId}_${merchantUsername}`;

    // Check if reviews are already loaded
    if (productReviews[key] && reviewStats[key]) {
      return {
        reviews: productReviews[key],
        stats: reviewStats[key],
      };
    }

    try {
      const [reviewsResult, statsResult] = await Promise.all([
        supabase
          .from('product_reviews')
          .select(
            `
            id,
            rating,
            review_text,
            created_at,
            updated_at,
            helpful_count,
            user_email,
            user_name
          `
          )
          .eq('product_id', productId)
          .eq('username', merchantUsername)
          .order('created_at', { ascending: false }),

        supabase.rpc('get_product_review_stats', {
          p_product_id: productId,
          p_username: merchantUsername,
        }),
      ]);

      const reviews = reviewsResult.data || [];
      const stats = statsResult.data?.[0] || {
        avg_rating: 0,
        total_reviews: 0,
        rating_breakdown: {},
      };

      setProductReviews((prev) => ({ ...prev, [key]: reviews }));
      setReviewStats((prev) => ({ ...prev, [key]: stats }));

      return { reviews, stats };
    } catch (error) {
      console.error('Error loading product reviews:', error);
      const fallbackStats = {
        avg_rating: 0,
        total_reviews: 0,
        rating_breakdown: {},
      };
      setProductReviews((prev) => ({ ...prev, [key]: [] }));
      setReviewStats((prev) => ({ ...prev, [key]: fallbackStats }));
      return { reviews: [], stats: fallbackStats };
    }
  };

  // Legacy functions for backward compatibility
  const loadProductReviews = async (productId, merchantUsername) => {
    const result = await loadProductReviewsOnDemand(
      productId,
      merchantUsername
    );
    return result.reviews;
  };

  const loadReviewStats = async (productId, merchantUsername) => {
    const result = await loadProductReviewsOnDemand(
      productId,
      merchantUsername
    );
    return result.stats;
  };

  // Add a new review
  const addProductReview = async (
    productId,
    merchantUsername,
    userEmail,
    rating,
    reviewText,
    displayName = null
  ) => {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .insert({
          product_id: productId,
          username: merchantUsername,
          user_email: userEmail,
          user_name: displayName,
          rating: rating,
          review_text: reviewText,
        })
        .select(
          `
          id,
          rating,
          review_text,
          created_at,
          helpful_count,
          user_email,
          user_name
        `
        )
        .single();

      if (error) throw error;

      // Update local state
      const key = `${productId}_${merchantUsername}`;
      setProductReviews((prev) => ({
        ...prev,
        [key]: [data, ...(prev[key] || [])],
      }));

      // Refresh stats
      await loadReviewStats(productId, merchantUsername);

      toast.success('Review added successfully!');
      return data;
    } catch (error) {
      console.error('Error adding review:', error);

      if (error.code === '23505') {
        toast.error('You have already reviewed this product');
      } else {
        toast.error('Failed to add review');
      }
      throw error;
    }
  };

  // Update an existing review
  const updateProductReview = async (reviewId, rating, reviewText) => {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .update({
          rating: rating,
          review_text: reviewText,
        })
        .eq('id', reviewId)
        .select(
          `
          id,
          product_id,
          username,
          rating,
          review_text,
          created_at,
          updated_at,
          helpful_count,
          user_email
        `
        )
        .single();

      if (error) throw error;

      // Update local state
      const key = `${data.product_id}_${data.username}`;
      setProductReviews((prev) => ({
        ...prev,
        [key]: (prev[key] || []).map((review) =>
          review.id === reviewId ? data : review
        ),
      }));

      // Refresh stats
      await loadReviewStats(data.product_id, data.username);

      toast.success('Review updated successfully!');
      return data;
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review');
      throw error;
    }
  };

  // Delete a review
  const deleteProductReview = async (reviewId, productId, merchantUsername) => {
    try {
      const { error } = await supabase
        .from('product_reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;

      // Update local state
      const key = `${productId}_${merchantUsername}`;
      setProductReviews((prev) => ({
        ...prev,
        [key]: (prev[key] || []).filter((review) => review.id !== reviewId),
      }));

      // Refresh stats
      await loadReviewStats(productId, merchantUsername);

      toast.success('Review deleted successfully!');
      return true;
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
      throw error;
    }
  };

  // ==============================================================================
  // Product Likes Functions (Database)
  // ==============================================================================

  // Updated functions to use smart loading
  const loadProductLikeCount = async (productId, merchantUsername) => {
    const result = await loadProductLikes(productId, merchantUsername);
    return result.count;
  };

  const checkUserLikedProduct = async (
    productId,
    merchantUsername,
    userEmail
  ) => {
    const result = await loadProductLikes(
      productId,
      merchantUsername,
      userEmail
    );
    return result.userLiked;
  };

  // Toggle product like
  const toggleProductLike = async (productId, merchantUsername, userEmail) => {
    try {
      const key = `${productId}_${merchantUsername}`;
      const currentLike = productLikes[key]?.userLiked || false;
      const currentCount = productLikes[key]?.count || 0;

      // Optimistically update UI first to prevent flickering
      const newLikedState = !currentLike;
      const newCount = currentCount + (currentLike ? -1 : 1);

      setProductLikes((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          userLiked: newLikedState,
          count: Math.max(0, newCount), // Ensure count doesn't go negative
        },
      }));

      // Then perform the database operation
      if (currentLike) {
        // Unlike the product
        const { error } = await supabase
          .from('product_likes')
          .delete()
          .eq('product_id', productId)
          .eq('username', merchantUsername)
          .eq('user_email', userEmail);

        if (error) throw error;
      } else {
        // Like the product
        const { error } = await supabase.from('product_likes').insert({
          product_id: productId,
          username: merchantUsername,
          user_email: userEmail,
        });

        if (error) throw error;
      }

      return newLikedState;
    } catch (error) {
      console.error('Error toggling product like:', error);

      // Revert the optimistic update on error
      const key = `${productId}_${merchantUsername}`;
      const originalLike = !productLikes[key]?.userLiked || false;
      const originalCount = productLikes[key]?.count || 0;

      setProductLikes((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          userLiked: originalLike,
          count: Math.max(0, originalCount + (originalLike ? 1 : -1)),
        },
      }));

      toast.error('Failed to update like status');
      throw error;
    }
  };

  // ==============================================================================
  // Helper Functions
  // ==============================================================================

  // Get reviews for a specific product
  const getProductReviews = (productId, merchantUsername) => {
    const key = `${productId}_${merchantUsername}`;
    return productReviews[key] || [];
  };

  // Get review stats for a specific product
  const getReviewStats = (productId, merchantUsername) => {
    const key = `${productId}_${merchantUsername}`;
    return (
      reviewStats[key] || {
        avg_rating: 0,
        total_reviews: 0,
        rating_breakdown: {},
      }
    );
  };

  // Get like data for a specific product
  const getProductLikes = (productId, merchantUsername) => {
    const key = `${productId}_${merchantUsername}`;
    return productLikes[key] || { count: 0, userLiked: false };
  };

  // Calculate stats from orders
  const ordersStats = React.useMemo(() => {
    const totalOrders = orders.length;
    // Only count revenue from completed orders with successful payments
    const totalRevenue = orders
      .filter(
        (order) =>
          order.status === 'completed' &&
          (order.payment_status === 'completed' ||
            order.paymentStatus === 'completed')
      )
      .reduce((sum, order) => sum + (Number(order.total) || 0), 0);
    const completedOrders = orders.filter(
      (order) => order.status === 'completed'
    ).length;
    const pendingOrders = orders.filter(
      (order) => order.status === 'pending' || order.status === 'processing'
    ).length;

    return {
      totalOrders,
      totalRevenue,
      completedOrders,
      pendingOrders,
    };
  }, [orders]);

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        loading,
        view,
        setView,
        discounts,
        addProduct,
        editProduct,
        deleteProduct,
        loadProducts,
        uploadFileWithProgress,
        fileUploadProgress,
        isUploading,
        addDiscount,
        editDiscount,
        deleteDiscount: deleteDiscountItem,
        loadDiscounts,
        testimonials,
        addTestimonial,
        deleteTestimonial,
        editTestimonial,
        // Product Reviews (Database)
        loadProductLikes, // Smart likes loading
        loadProductReviewsOnDemand, // Smart reviews loading
        loadProductReviews,
        loadReviewStats,
        addProductReview,
        updateProductReview,
        deleteProductReview,
        getProductReviews,
        getReviewStats,
        // Product Likes (Database)
        loadProductLikeCount,
        checkUserLikedProduct,
        toggleProductLike,
        getProductLikes,
        // Orders
        orders,
        ordersLoading,
        ordersError,
        loadOrders,
        ordersStats,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
