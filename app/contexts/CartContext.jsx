'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

const CART_STORAGE_KEY = 'pocketlink_cart';
const CartContext = createContext();

// Helper function to show toasts with consistent position
const showToast = (message, type = 'success') => {
  if (type === 'success') {
    toast.success(message, {
      position: 'top-center',
      duration: 2000,
      id: message, // Prevent duplicate toasts with same message
    });
  } else if (type === 'error') {
    toast.error(message, {
      position: 'top-center',
      duration: 2000,
      id: message, // Prevent duplicate toasts with same message
    });
  }
};

// Safe localStorage helper functions
const getFromStorage = (key) => {
  if (typeof window === 'undefined') return null;
  try {
    const item = window.localStorage.getItem(key);

    if (!item) return null;

    const parsed = JSON.parse(item);

    // Ensure we always return an array for cartItems
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(
      `CartContext: Error reading ${key} from localStorage:`,
      error
    );
    // Clear the corrupted data
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      // Ignore secondary errors
      console.error('CartContext: Failed to remove corrupted data:', e);
    }
    return [];
  }
};

const saveToStorage = (key, data) => {
  if (typeof window === 'undefined') return;

  // Ensure we're not trying to store invalid data
  if (data === undefined || data === null) {
    console.error(`CartContext: Attempted to save invalid data to ${key}`);
    return;
  }

  // For cart data, verify each item has string image
  if (key === CART_STORAGE_KEY && Array.isArray(data)) {
    // Create a deep copy to avoid mutating the original data
    const sanitizedData = data.map((item) => {
      if (!item) return item;

      // Ensure item is a valid object
      const safeItem = { ...item };

      // Fix image to be a string if needed
      if (safeItem.image && typeof safeItem.image !== 'string') {
        safeItem.image =
          Array.isArray(safeItem.image) && safeItem.image.length > 0
            ? safeItem.image[0]
            : safeItem.image?.toString() || '';
      }

      // Ensure quantity is a number
      if (safeItem.quantity !== undefined) {
        safeItem.quantity = Number(safeItem.quantity) || 1;
      }

      // Ensure price is a number
      if (safeItem.price !== undefined) {
        safeItem.price = Number(safeItem.price) || 0;
      }

      return safeItem;
    });

    try {
      window.localStorage.setItem(key, JSON.stringify(sanitizedData));
    } catch (error) {
      // If storing fails (e.g., due to quota exceeded), try to store a simplified version
      try {
        const minimalData = sanitizedData.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          // Skip image as it's usually the largest part
        }));
        window.localStorage.setItem(key, JSON.stringify(minimalData));
      } catch (fallbackError) {
        // Last resort: clear storage if we can't even store minimal data
        try {
          window.localStorage.removeItem(key);
        } catch (e) {
          // Give up at this point
        }
      }
    }
  } else {
    try {
      // For cart data, ensure it's an array
      if (key === CART_STORAGE_KEY && !Array.isArray(data)) {
        window.localStorage.setItem(key, JSON.stringify([]));
        return;
      }

      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      // Silently fail if storage operations don't work
    }
  }
};

// Helper function to calculate the discounted price
const calculateDiscountedPrice = (price, discount) => {
  if (!discount || !price) return price;

  const originalPrice = parseFloat(price);
  if (isNaN(originalPrice)) return price;

  if (discount.type === 'percentage') {
    const discountAmount = originalPrice * (discount.value / 100);
    return originalPrice - discountAmount;
  } else if (discount.type === 'fixed') {
    const discountedPrice = originalPrice - parseFloat(discount.value);
    return discountedPrice > 0 ? discountedPrice : 0;
  }

  return price;
};

// Helper function to validate product data
const validateProduct = (product) => {
  if (!product) return null;
  if (!product.id || !product.title || product.price === undefined) return null;

  // Calculate the final price if there's a discount
  let finalPrice = Number(product.price) || 0;
  if (product.discount) {
    finalPrice = calculateDiscountedPrice(finalPrice, product.discount);
  }

  const validatedProduct = {
    id: product.id,
    title: String(product.title).substring(0, 100), // Limit title length
    price: finalPrice, // Use the calculated final price
    originalPrice: Number(product.price) || 0, // Store original price for reference
    image:
      typeof product.image === 'string'
        ? product.image
        : Array.isArray(product.image) && product.image.length > 0
          ? String(product.image[0])
          : null,
    variant: product.variant || null,
    discount: product.discount ? product.discount : null, // Keep the discount info
    quantity: Number(product.quantity) || 1,
    file_url: product.file_url || null,
    access_url: product.access_url || null,
    type: product.type || 'shopCard',
    product_type: product.product_type || null,
  };

  return validatedProduct;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {}, [cartItems]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = getFromStorage(CART_STORAGE_KEY);

        // Validate each item in the cart to ensure data integrity
        const validatedCart = Array.isArray(savedCart)
          ? savedCart
              .filter((item) => item && item.id && item.title)
              .map((item) => ({
                ...item,
                price: Number(item.price) || 0,
                quantity: Number(item.quantity) || 1,
                // Ensure image is a string
                image: typeof item.image === 'string' ? item.image : null,
              }))
          : [];

        setCartItems(validatedCart);
      } catch (error) {
        console.error('Failed to load cart from storage:', error);
        setCartItems([]);
      }
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      // Ensure cartItems is an array before saving
      const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
      saveToStorage(CART_STORAGE_KEY, safeCartItems);
    }
  }, [cartItems, isInitialized]);

  // Add item to cart (with quantity)
  const addToCart = (product) => {
    const productToAdd = validateProduct(product);

    if (!productToAdd) {
      return;
    }

    setCartItems((prevCart) => {
      // Ensure prevCart is an array
      const safeCart = Array.isArray(prevCart) ? prevCart : [];

      const existingItem = safeCart.find((item) => item.id === productToAdd.id);
      if (existingItem) {
        // Update quantity without modifying other properties unnecessarily
        return safeCart.map((item) =>
          item.id === productToAdd.id
            ? {
                ...item,
                quantity: Math.min(
                  9999,
                  (Number(item.quantity) || 0) +
                    (Number(productToAdd.quantity) || 1)
                ),
              }
            : item
        );
      } else {
        // Add new item with default quantity 1 or specified quantity
        return [...safeCart, productToAdd];
      }
    });

    // Avoid showing a toast for programmatic additions
    if (!product.silent) {
      showToast(`${productToAdd.title} added to cart`);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    if (!productId) return;

    setCartItems((prevCart) => {
      // Ensure prevCart is an array
      const safeCart = Array.isArray(prevCart) ? prevCart : [];
      return safeCart.filter((item) => item && item.id !== productId);
    });

    showToast(`Item removed from cart`, 'error');
  };

  // Update item quantity
  const updateCartQuantity = (productId, newQuantity) => {
    if (!productId) return;

    // Ensure newQuantity is a number and within reasonable bounds
    const safeQuantity = Math.min(9999, Math.max(0, Number(newQuantity) || 0));

    if (safeQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevCart) => {
      // Ensure prevCart is an array
      const safeCart = Array.isArray(prevCart) ? prevCart : [];

      return safeCart.map((item) =>
        item && item.id === productId
          ? { ...item, quantity: safeQuantity }
          : item
      );
    });
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(CART_STORAGE_KEY);
      } catch (error) {
        // Silently fail if storage operations don't work
      }
    }
  };

  // Get cart total
  const getCartTotal = () => {
    if (!Array.isArray(cartItems)) return 0;

    return cartItems.reduce((total, item) => {
      if (
        !item ||
        typeof item.price !== 'number' ||
        typeof item.quantity !== 'number'
      ) {
        return total;
      }
      return total + item.price * item.quantity;
    }, 0);
  };

  // Get cart item count
  const getCartItemCount = () => {
    if (!Array.isArray(cartItems)) return 0;

    return cartItems.reduce((count, item) => {
      if (!item || typeof item.quantity !== 'number') {
        return count;
      }
      return count + item.quantity;
    }, 0);
  };

  // Check if a product is in the cart
  const isInCart = (productId) => {
    if (!Array.isArray(cartItems) || !productId) return false;
    return cartItems.some(
      (item) => item && item.id === productId && item.quantity > 0
    );
  };

  // Remove product from cart when it's deleted (silent removal)
  const removeDeletedProduct = (productId) => {
    if (!productId) return;

    setCartItems((prevCart) => {
      // Ensure prevCart is an array
      const safeCart = Array.isArray(prevCart) ? prevCart : [];
      const filteredCart = safeCart.filter(
        (item) => item && item.id !== productId
      );

      // Only log if something was actually removed
      if (filteredCart.length !== safeCart.length) {
        console.log('🗑️ Removed deleted product from cart:', productId);
      }

      return filteredCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        isInCart,
        removeDeletedProduct,
        isInitialized,
        isCheckoutOpen,
        setIsCheckoutOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
