'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useCart } from '@/app/contexts/CartContext';
import { useCheckout } from '@/app/contexts/CheckoutContext';
import { useCheckoutAuth } from '@/app/contexts/CheckoutAuthContext';
import { Button } from '@/components/ui/button';
import CheckoutDialog from './CheckoutDialog';
import CheckoutAuthenticationDialog from './CheckoutAuthenticationDialog';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Dragger from '@/components/Dragger';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { toast } from 'sonner';
import { isMobile as isPhone } from 'react-device-detect';

// Sound effect
const popSound = '/sounds/pop.mp3';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartQuantity,
    isCheckoutOpen,
    setIsCheckoutOpen,
  } = useCart();
  const { isAuthenticated, currentMerchant, setMerchant } = useCheckoutAuth();
  const { initializeCheckoutSession, setCurrentCheckoutStep } = useCheckout();
  const { AUTH_SUCCESS_EVENT } = useCheckoutAuth();
  const params = useParams();
  const tenant = params.tenant;
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const popoverTriggerRef = useRef(null);
  const checkedAuthRef = useRef(false);
  const checkoutOpenRequestRef = useRef(null);
  const lastCheckoutOpenRef = useRef(0);

  // Pre-compute initial position only once to avoid re-renders
  const initialPosition = useRef({
    x:
      typeof window !== 'undefined'
        ? isMobile
          ? window.innerWidth - 70
          : window.innerWidth - 70
        : isMobile
          ? 300
          : 1200,
    y:
      typeof window !== 'undefined'
        ? isMobile
          ? window.innerHeight - 70
          : isPhone
            ? 70
            : 15
        : isMobile
          ? 600
          : 15,
  }).current;

  // Set current merchant based on tenant - use useCallback to prevent recreation
  const updateMerchant = useCallback(() => {
    if (tenant && (!currentMerchant || currentMerchant.username !== tenant)) {
      // Set the merchant information (setMerchant will handle ID generation and lookup)
      setMerchant({
        username: tenant, // Use tenant as the username
        name: tenant, // Friendly name, will be updated from database if found
      });
    }
  }, [tenant, currentMerchant, setMerchant]);

  // Run merchant update once on mount and when dependencies change
  useEffect(() => {
    updateMerchant();
  }, [updateMerchant]);

  // Consolidated function to handle checkout opening
  const openCheckout = useCallback(
    (source) => {
      // Prevent duplicate opens within a short timeframe (500ms)
      const now = Date.now();
      if (now - lastCheckoutOpenRef.current < 500) {
        return;
      }

      lastCheckoutOpenRef.current = now;

      // Update session storage to indicate checkout was manually opened
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('checkout_last_open', now.toString());
      }

      setCurrentCheckoutStep('checkout');
      setIsCheckoutOpen(true);
      setIsAuthOpen(false); // Always ensure auth is closed
    },
    [setCurrentCheckoutStep, setIsCheckoutOpen]
  );

  // Listen for auth success events
  useEffect(() => {
    const handleAuthSuccess = () => {
      // First make sure auth dialog is closed
      setIsAuthOpen(false);

      // Use the consolidated function with a slight delay
      clearTimeout(checkoutOpenRequestRef.current);
      checkoutOpenRequestRef.current = setTimeout(() => {
        openCheckout('auth_success_event');
      }, 200);
    };

    // Add event listener
    if (typeof window !== 'undefined') {
      window.addEventListener(AUTH_SUCCESS_EVENT, handleAuthSuccess);

      // Cleanup
      return () => {
        window.removeEventListener(AUTH_SUCCESS_EVENT, handleAuthSuccess);
        clearTimeout(checkoutOpenRequestRef.current);
      };
    }
  }, [AUTH_SUCCESS_EVENT, openCheckout]);

  // Additional handler for direct prop-based success
  const handleAuthSuccessProp = useCallback(() => {
    setIsAuthOpen(false);

    // Use the consolidated function
    openCheckout('auth_success_prop');
  }, [openCheckout]);

  // Play sound effect when items are added to cart
  useEffect(() => {
    // Skip this effect on initial render
    if (!isInitialized) return;

    let audio;
    // Only play sound when cart items increase, not on initial load
    if (cartItems.length > 0 && !isPlaying) {
      try {
        if (typeof window !== 'undefined') {
          audio = new Audio(popSound);
          audio.play().catch((err) => console.error('Audio play error:', err));
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Audio initialization error:', error);
      }
    } else if (cartItems.length === 0 && isPlaying) {
      setIsPlaying(false);
    }

    // Cleanup function to release resources
    return () => {
      if (audio) {
        audio.pause();
        audio = null;
      }
    };
  }, [cartItems.length, isPlaying, isInitialized]);

  // Listen for direct checkout trigger events
  useEffect(() => {
    const handleCheckoutTrigger = (event) => {
      // Use the consolidated function
      openCheckout('checkout_trigger_event');

      // Update merchant if provided in the event
      if (event.detail && event.detail.merchant) {
        // Make sure we're following the pattern: username from user?.username, id from user?.uuid
        setMerchant(event.detail.merchant);
      }
    };

    // Add event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('checkout-trigger', handleCheckoutTrigger);

      // Cleanup
      return () => {
        window.removeEventListener('checkout-trigger', handleCheckoutTrigger);
        clearTimeout(checkoutOpenRequestRef.current);
      };
    }
  }, [setMerchant, openCheckout]);

  // Listen for force checkout open events (highest priority)
  useEffect(() => {
    const handleForceOpen = (event) => {
      // Check if we're authenticated
      const isAuthActive =
        typeof window !== 'undefined'
          ? sessionStorage.getItem('pocketlink_auth_active') === 'true'
          : false;

      // Force close any auth dialog immediately
      setIsAuthOpen(false);

      // Prevent duplicate checkout dialogs by ensuring we're not already opening checkout
      if (isCheckoutOpen) {
        return;
      }

      // Update merchant if provided in the event
      if (event.detail && event.detail.merchant) {
        setMerchant(event.detail.merchant);
      }

      // If we're authenticated or force flag is set, open checkout
      if (
        isAuthenticated ||
        isAuthActive ||
        (event.detail && event.detail.force)
      ) {
        // Use the consolidated function
        openCheckout('force_checkout_open_event');
      } else {
        // If we're not authenticated, open auth dialog instead
        setIsAuthOpen(true);
      }
    };

    // Add event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('force-checkout-open', handleForceOpen);

      // Cleanup
      return () => {
        window.removeEventListener('force-checkout-open', handleForceOpen);
        clearTimeout(checkoutOpenRequestRef.current);
      };
    }
  }, [isAuthenticated, isCheckoutOpen, setMerchant, openCheckout]);

  // Prevent checkout if user is not logged in
  const handleProceedToCheckout = useCallback(() => {
    // Close the cart popover first
    setIsCartOpen(false);

    // Initialize checkout session with cart items
    initializeCheckoutSession(cartItems);

    const isAuthActive =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('pocketlink_auth_active') === 'true'
        : false;

    if (!isAuthenticated && !isAuthActive) {
      setIsAuthOpen(true); // Open authentication first
      // Close checkout if open
      setIsCheckoutOpen(false);
    } else {
      // Use the consolidated function
      openCheckout('proceed_to_checkout_button');
    }
  }, [
    cartItems,
    isAuthenticated,
    initializeCheckoutSession,
    openCheckout,
    setIsCheckoutOpen,
  ]);

  // Close the checkout dialog
  const handleCloseCheckout = useCallback(() => {
    setIsCheckoutOpen(false);
    setCurrentCheckoutStep(null);
  }, [setCurrentCheckoutStep, setIsCheckoutOpen]);

  // Toggle cart popover
  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  // Mark component as initialized on mount
  useEffect(() => {
    setIsInitialized(true);
    return () => setIsInitialized(false);
  }, []);

  // Check for cross-merchant authentication on mount - once only
  useEffect(() => {
    // Only run this check once per component instance
    if (checkedAuthRef.current) return;

    // Check if we have auth cookie but component doesn't think we're authenticated
    const storedEmail =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('checkout_user_email')
        : null;

    const authActive =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('pocketlink_auth_active') === 'true'
        : false;

    // Directly check for cookie without domain restriction
    const hasCookie =
      typeof window !== 'undefined'
        ? document.cookie.includes('pocketlink_auth')
        : false;

    // Check cross-merchant auth on mount
    if (tenant) {
      // This will trigger the cross-merchant auth check in CheckoutAuthContext
      setMerchant({
        username: tenant, // setMerchant will handle ID generation and lookup
        name: tenant,
      });

      // Mark that we've checked
      checkedAuthRef.current = true;
    }
  }, [tenant, isAuthenticated, setMerchant]);

  return (
    <>
      {/* Cart Button with Dragger */}
      <Dragger initialPosition={initialPosition}>
        <Popover open={isCartOpen} onOpenChange={setIsCartOpen}>
          <PopoverTrigger asChild>
            <motion.div
              data-cart-trigger
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: cartItems.length === 0 ? 0 : 1,
                opacity: cartItems.length === 0 ? 0 : 1,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="z-50] flex"
              onClick={toggleCart}
              ref={popoverTriggerRef}
              style={{
                pointerEvents: cartItems.length === 0 ? 'none' : 'auto',
              }}
            >
              <div className="relative">
                <Button className="cursor-pointer rounded-full bg-blue-600 px-4 py-6 text-white shadow-lg hover:bg-blue-700">
                  <ShoppingCart size={24} />
                </Button>

                {/* Cart badge with pulse animation */}
                {cartItems.length > 0 && (
                  <AnimatePresence>
                    <motion.div
                      className="absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-red-500 px-2 py-1 text-xs text-white"
                      initial={{ scale: 0.8 }}
                      animate={{
                        scale: [0.8, 1.2, 1],
                        boxShadow: [
                          '0 0 0 0 rgba(239, 68, 68, 0.7)',
                          '0 0 0 4px rgba(239, 68, 68, 0.3)',
                          '0 0 0 0 rgba(239, 68, 68, 0)',
                        ],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 2,
                        repeatDelay: 1,
                      }}
                    >
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Pulse ring animation when cart has items */}
                {cartItems.length > 0 && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ boxShadow: '0 0 0 0 rgba(37, 99, 235, 0)' }}
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(37, 99, 235, 0)',
                        '0 0 0 8px rgba(37, 99, 235, 0.3)',
                        '0 0 0 0 rgba(37, 99, 235, 0)',
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: 'loop',
                      duration: 2,
                      repeatDelay: 0.5,
                    }}
                  />
                )}
              </div>
            </motion.div>
          </PopoverTrigger>

          <PopoverContent
            className="w-[300px] rounded-lg bg-white p-4 shadow-lg dark:bg-gray-900"
            side={isMobile ? 'top' : 'bottom'}
            align="end"
            sideOffset={5}
          >
            <div className="flex flex-col">
              <h2 className="mb-3 text-xl font-medium">Your Cart</h2>

              <div className="max-h-[300px] flex-1 space-y-4 overflow-y-auto py-2">
                {/* Empty cart view */}
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <ShoppingCart className="mb-3 h-12 w-12 text-gray-300" />
                    <p className="mb-1 font-medium text-gray-600">
                      Your cart is empty
                    </p>
                    <p className="max-w-[220px] text-sm text-gray-400">
                      Explore the products and add items to your cart
                    </p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-start justify-center gap-2">
                        {item.image && (
                          <div className="w-10: relative h-10 min-h-10 min-w-10">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="aspect-square h-5 w-5 rounded-md object-cover"
                            />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="line-clamp-2 text-xs font-medium">
                            {item.title}
                          </span>
                          <span className="text-xs text-gray-500">
                            ₹{item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      {/* Quantity Selector */}
                      <div className="flex items-center rounded-lg border border-gray-300 text-sm dark:border-gray-600">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            item.quantity > 1
                              ? updateCartQuantity(item.id, item.quantity - 1)
                              : removeFromCart(item.id)
                          }
                        >
                          <Minus size={12} />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={
                            item.product_type === 'digital' &&
                            item.quantity >= 1
                          }
                          onClick={() => {
                            // Check for digital product quantity limit
                            if (
                              item.product_type === 'digital' &&
                              item.quantity >= 1
                            ) {
                              toast.info(
                                'Digital products are limited to 1 quantity'
                              );
                              return;
                            }
                            updateCartQuantity(item.id, item.quantity + 1);
                          }}
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Show the Checkout Button only when items exist */}
              {cartItems.length > 0 && (
                <div className="mt-4 border-t pt-3">
                  <div className="mb-3 flex justify-between">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-medium">
                      ₹
                      {cartItems
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-blue-600 bg-blue-700 text-white"
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              )}

              {/* Add a "Continue Shopping" button when cart is empty */}
              {cartItems.length === 0 && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-950 dark:text-blue-400"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </Dragger>

      {/* Authentication Dialog */}
      <CheckoutAuthenticationDialog
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
        }}
        tenant={tenant}
        onAuthSuccess={handleAuthSuccessProp}
      />

      {/* Checkout Dialog */}
      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        tenant={tenant}
      />
    </>
  );
};

export default Cart;
