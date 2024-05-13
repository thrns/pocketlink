'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/app/contexts/CartContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useCheckout } from '@/app/contexts/CheckoutContext';
import { useCheckoutAuth } from '@/app/contexts/CheckoutAuthContext';
import { usePaymentGateway } from '@/app/contexts/PaymentGatewayContext';
import CheckoutAuthenticationDialog from './CheckoutAuthenticationDialog';
import CheckoutAddressStep from './CheckoutSteps/CheckoutAddressStep';
import CheckoutPaymentStep from './CheckoutSteps/CheckoutPaymentStep';
import CheckoutOrderSummary from './CheckoutSteps/CheckoutOrderSummary';
import EaseBuzzPaymentGateway from './payment/EaseBuzzPaymentGateway';
import RazorpayPaymentGateway from './payment/RazorpayPaymentGateway';
import {
  ArrowLeft,
  Check,
  Loader2,
  ShoppingBag,
  CreditCard,
  ClipboardList,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import { digitalPurchase } from '@/constants/emailTemplates/digitalPurchase';

// Steps in the checkout process
const CHECKOUT_STEPS = {
  CHECKOUT: 'checkout',
  PAYMENT_GATEWAY: 'payment_gateway',
  CONFIRMATION: 'confirmation',
  PAYMENT_FAILURE: 'payment_failure',
};

const CheckoutDialog = ({ isOpen, onClose, tenant }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { cartItems, clearCart, isCheckoutOpen, setIsCheckoutOpen } = useCart();
  const { isAuthenticated, isLoading: authLoading } = useCheckoutAuth();
  const { paymentGateways } = usePaymentGateway();
  const {
    currentCheckoutStep,
    setCurrentCheckoutStep,
    selectedAddress,
    selectedPaymentGateway,
    userProfile,
    isProcessingPayment,
    setIsProcessingPayment,
    processPayment,
    checkoutSession,
    initializeCheckoutSession,
    loadUserProfile,
    loadUserAddresses,
    handlePaymentSuccess: contextHandlePaymentSuccess,
    handlePaymentFailure: contextHandlePaymentFailure,
  } = useCheckout();

  // Local state
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [pendingOrderData, setPendingOrderData] = useState(null);
  const dataLoadedRef = useRef(false);
  const prevAuthRef = useRef(isAuthenticated);
  const dialogContentRef = useRef(null);

  // NEW: Track the last time checkout was opened to prevent duplicates
  const lastOpenTimeRef = useRef(0);
  const forceCloseRequestRef = useRef(false);

  // Check if cart contains any physical products that require shipping
  const hasPhysicalProducts = cartItems.some((item) => {
    // Debug: Log product types to console for troubleshooting
    console.log('🛒 Cart item product_type:', {
      title: item.title,
      product_type: item.product_type,
      type: item.type,
      file_url: item.file_url,
      access_url: item.access_url,
    });

    // Physical products explicitly marked as 'physical' require shipping
    return item.product_type === 'physical';
  });

  // For backward compatibility and clearer logic
  // isDigitalOnly = true when cart contains ONLY digital/external products (no physical products)
  // isDigitalOnly = false when cart contains ANY physical products (mixed or all physical)
  const isDigitalOnly = !hasPhysicalProducts && cartItems.length > 0;

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate shipping cost - only apply to physical products
  const shipping = hasPhysicalProducts ? 0 : 0; // Free shipping for now
  const total = subtotal + shipping;

  // Memoized function to check for duplicate open requests
  const shouldHandleOpenRequest = useCallback(() => {
    const now = Date.now();
    const timeSinceLastOpen = now - lastOpenTimeRef.current;

    // If opened within last 500ms, ignore this request
    if (timeSinceLastOpen < 500) {
      return false;
    }

    // Update last open time
    lastOpenTimeRef.current = now;
    return true;
  }, []);

  // Set up checkout session when dialog opens
  useEffect(() => {
    if (isOpen && !checkoutSession) {
      if (!shouldHandleOpenRequest()) return;

      initializeCheckoutSession(cartItems);
    }

    // Reset force close request flag when dialog actually opens
    if (isOpen) {
      forceCloseRequestRef.current = false;
    }
  }, [
    isOpen,
    cartItems,
    checkoutSession,
    initializeCheckoutSession,
    shouldHandleOpenRequest,
  ]);

  // Function to render the combined checkout step content
  const renderCombinedCheckoutStep = () => {
    return (
      <div className="space-y-8">
        {/* Order Summary Section */}
        <div>
          <CheckoutOrderSummary
            items={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
        </div>

        {/* Address Section - Only show when cart contains physical products that need shipping */}
        {hasPhysicalProducts && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <CheckoutAddressStep />
          </div>
        )}

        {/* Payment Section - Only show for paid products */}
        {total > 0 && <CheckoutPaymentStep />}
      </div>
    );
  };

  // Check if user is authenticated on open
  useEffect(() => {
    if (isOpen && !authLoading) {
      if (isAuthenticated) {
        // User is authenticated, set the checkout step if not already set
        if (!currentCheckoutStep) {
          setCurrentCheckoutStep(CHECKOUT_STEPS.CHECKOUT);
        }

        // Force a user profile load if we're authenticated but don't have profile data
        if (!userProfile) {
          loadUserProfile();
        }

        // Load user addresses only once
        if (!dataLoadedRef.current) {
          dataLoadedRef.current = true;

          // Load addresses with error handling
          loadUserAddresses()
            .then((addresses) => {
              // Successfully loaded addresses
            })
            .catch((error) => {
              console.error('[Checkout] Error loading addresses:', error);
              // Reset the ref if loading failed to allow retry
              dataLoadedRef.current = false;
            });
        }
      } else if (!forceCloseRequestRef.current) {
        // If we're not authenticated, request closure
        forceCloseRequestRef.current = true;

        // Check if this is a valid reason to close
        const authVerifiedTime = parseInt(
          sessionStorage.getItem('auth_verified_timestamp') || '0'
        );
        const currentTime = Date.now();

        // Only close if we're not in a post-verification state
        if (!authVerifiedTime || currentTime - authVerifiedTime > 2000) {
          if (typeof onClose === 'function') {
            // Use setTimeout to avoid React state update errors
            setTimeout(() => {
              onClose();
            }, 0);
          }
        }
      }
    }
  }, [
    isOpen,
    isAuthenticated,
    authLoading,
    currentCheckoutStep,
    setCurrentCheckoutStep,
    userProfile,
    loadUserProfile,
    loadUserAddresses,
    onClose,
  ]);

  // Listen for the force-checkout-open event
  useEffect(() => {
    const handleForceOpen = (event) => {
      setIsProcessingPayment(false);

      if (!shouldHandleOpenRequest()) return;

      // Don't process if this is coming from EaseBuzz and we're already handling checkout state
      if (
        event.detail &&
        event.detail.source &&
        event.detail.source.startsWith('easebuzz_') &&
        (event.detail.paymentStatus || event.detail.paymentStep)
      ) {
        // Handle payment status from EaseBuzz directly
        if (event.detail.paymentStatus === 'success') {
          setCurrentCheckoutStep(CHECKOUT_STEPS.CONFIRMATION);
          setOrderCompleted(true);
          // Set order number if provided
          if (event.detail.orderNumber) {
            setOrderNumber(event.detail.orderNumber);
          }
        } else if (event.detail.paymentStatus === 'failure') {
          setCurrentCheckoutStep(CHECKOUT_STEPS.PAYMENT_FAILURE);
          setPendingOrderData({
            orderNumber: event.detail.orderNumber,
            failureReason: event.detail.failureReason || 'Payment failed',
          });
        } else if (event.detail.paymentStep) {
          // Map old step values to new ones if necessary
          const step = event.detail.paymentStep;
          // Set explicit step
          setCurrentCheckoutStep(step);
        }
        return;
      }

      // If we receive user data in the event, make sure it's saved
      if (event.detail) {
        if (event.detail.email) {
          sessionStorage.setItem('checkout_user_email', event.detail.email);

          // Update localStorage user data if needed
          try {
            const userData = localStorage.getItem('pocketlink_user');
            if (userData) {
              const parsed = JSON.parse(userData);
              if (!parsed.email) {
                parsed.email = event.detail.email;
                localStorage.setItem('pocketlink_user', JSON.stringify(parsed));
              }
            } else {
              localStorage.setItem(
                'pocketlink_user',
                JSON.stringify({
                  email: event.detail.email,
                })
              );
            }
          } catch (err) {
            console.error('Error updating user data in storage:', err);
          }
        }

        // Load user profile to ensure we have the latest data
        loadUserProfile();
      }

      // Set the step to CHECKOUT
      setCurrentCheckoutStep(CHECKOUT_STEPS.CHECKOUT);
    };

    window.addEventListener('force-checkout-open-easebuzz', handleForceOpen);
    window.addEventListener('force-checkout-open-razorpay', handleForceOpen);

    return () => {
      window.removeEventListener(
        'force-checkout-open-easebuzz',
        handleForceOpen
      );
      window.removeEventListener(
        'force-checkout-open-razorpay',
        handleForceOpen
      );
    };
  }, [setCurrentCheckoutStep, loadUserProfile, shouldHandleOpenRequest]);

  // Listen for the EaseBuzz specific event
  useEffect(() => {
    const handleEasebuzzForceOpen = (event) => {
      // Prevent processing duplicate events
      const eventTimestamp = Date.now();
      const lastEventTime = parseInt(
        sessionStorage.getItem('easebuzz_last_event') || '0'
      );

      // Skip if another event was processed in the last 500ms (debounce)
      if (eventTimestamp - lastEventTime < 500) {
        return;
      }

      // Store timestamp of this event
      sessionStorage.setItem('easebuzz_last_event', eventTimestamp.toString());

      // Reopen the modal if it is not already open
      if (!isOpen) {
        setIsCheckoutOpen(true);
      }

      setIsProcessingPayment(false);

      // Handle payment status
      if (event.detail.paymentStatus === 'success') {
        setCurrentCheckoutStep(CHECKOUT_STEPS.CONFIRMATION);
        setOrderCompleted(true);
        if (event.detail.orderNumber) {
          setOrderNumber(event.detail.orderNumber);
        }
        // Clear any pending order data on success
        setPendingOrderData(null);
      } else if (event.detail.paymentStatus === 'failure') {
        setCurrentCheckoutStep(CHECKOUT_STEPS.PAYMENT_FAILURE);
        setPendingOrderData({
          orderNumber: event.detail.orderNumber,
          failureReason: event.detail.failureReason || 'Payment failed',
          total: total,
        });
      } else if (event.detail.paymentStatus === 'cancelled') {
        // Handle user cancelled flow
        if (event.detail.paymentStep) {
          // Map old step values to new ones if necessary
          const step = event.detail.paymentStep;

          setCurrentCheckoutStep(step);
        } else {
          setCurrentCheckoutStep(CHECKOUT_STEPS.CHECKOUT);
        }
        setPendingOrderData(null); // Clear pending order data
      }
    };

    window.addEventListener(
      'force-checkout-open-easebuzz',
      handleEasebuzzForceOpen
    );
    return () => {
      window.removeEventListener(
        'force-checkout-open-easebuzz',
        handleEasebuzzForceOpen
      );
    };
  }, [
    isOpen,
    setCurrentCheckoutStep,
    setIsProcessingPayment,
    setIsCheckoutOpen,
  ]);

  // Listen for the Razorpay specific event
  useEffect(() => {
    const handleRazorpayForceOpen = (event) => {
      // Prevent processing duplicate events
      const eventTimestamp = Date.now();
      const lastEventTime = parseInt(
        sessionStorage.getItem('razorpay_last_event') || '0'
      );

      if (eventTimestamp - lastEventTime < 2000) {
        return;
      }

      sessionStorage.setItem('razorpay_last_event', eventTimestamp.toString());

      // Only handle if we're not already open to avoid conflicts
      if (!isOpen) {
        setIsCheckoutOpen(true);
      }

      // Reset processing state
      setIsProcessingPayment(false);

      // Handle different payment statuses
      if (event.detail) {
        switch (event.detail.paymentStatus) {
          case 'success':
            setCurrentCheckoutStep(CHECKOUT_STEPS.CONFIRMATION);
            break;
          case 'failure':
            setCurrentCheckoutStep(CHECKOUT_STEPS.PAYMENT_FAILURE);
            setPaymentFailureReason(
              event.detail.failureReason ||
                'Your payment could not be processed. Please try again.'
            );
            break;
          case 'cancelled':
            if (event.detail.paymentStep === 'checkout') {
              setCurrentCheckoutStep(CHECKOUT_STEPS.CHECKOUT);
            }
            break;
        }

        setPendingOrderData(null); // Clear pending order data
      }
    };

    window.addEventListener(
      'force-checkout-open-razorpay',
      handleRazorpayForceOpen
    );
    return () => {
      window.removeEventListener(
        'force-checkout-open-razorpay',
        handleRazorpayForceOpen
      );
    };
  }, [
    isOpen,
    setCurrentCheckoutStep,
    setIsProcessingPayment,
    setIsCheckoutOpen,
  ]);

  // Reset the checkout state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      // Don't reset everything immediately to allow for smooth animations
      const timeout = setTimeout(() => {
        if (orderCompleted) {
          clearCart();
          setOrderCompleted(false);
        }
        // We don't reset currentCheckoutStep here as we want to remember where user was
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, clearCart, orderCompleted]);

  // Make sure auth dialog is never opened from checkout
  useEffect(() => {
    if (authDialogOpen) {
      setAuthDialogOpen(false);
    }
  }, [authDialogOpen]);

  useEffect(() => {
    // Scroll to the top of the dialog content whenever the step changes
    if (dialogContentRef.current) {
      dialogContentRef.current.scrollTop = 0;
    }
  }, [currentCheckoutStep]);

  // Handle auth success
  const handleAuthSuccess = () => {
    setAuthDialogOpen(false);
    setCurrentCheckoutStep(CHECKOUT_STEPS.CHECKOUT);
  };

  // Render step indicators with proper styling
  // const renderStepIndicators = () => {
  //   if (currentCheckoutStep === CHECKOUT_STEPS.CONFIRMATION ||
  //     currentCheckoutStep === CHECKOUT_STEPS.PAYMENT_GATEWAY ||
  //     currentCheckoutStep === CHECKOUT_STEPS.PAYMENT_FAILURE) return null;

  //   // For the combined step, we only need one step
  //   const steps = [
  //     { key: CHECKOUT_STEPS.CHECKOUT, label: "Checkout", icon: <ShoppingBag className="h-4 w-4" /> }
  //   ];

  //   return (
  //     // <div className="flex justify-center px-4 py-4 border-b bg-white">
  //     //   {steps.map((step) => (
  //     //     <div key={step.key} className="flex flex-col items-center">
  //     //       <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white ">
  //     //         {step.icon}
  //     //       </div>
  //     //       <span className="text-xs mt-2 font-medium text-primary">
  //     //         {step.label}
  //     //       </span>
  //     //     </div>
  //     //   ))}
  //     // </div>
  //     <div>

  //     </div>
  //   );
  // };

  // Navigate to the previous step
  const goBack = () => {
    switch (currentCheckoutStep) {
      case CHECKOUT_STEPS.PAYMENT_GATEWAY:
        setCurrentCheckoutStep(CHECKOUT_STEPS.CHECKOUT);
        setPendingOrderData(null);
        break;
      case CHECKOUT_STEPS.PAYMENT_FAILURE:
        setCurrentCheckoutStep(CHECKOUT_STEPS.CHECKOUT);
        break;
      default:
        onClose();
    }
  };

  // Navigate to the next step
  const goNext = () => {
    switch (currentCheckoutStep) {
      case CHECKOUT_STEPS.CHECKOUT:
        handlePlaceOrder();
        break;
      default:
        onClose();
    }
  };

  //====== EMAIL CONFIRMATION FOR DIGITAL PURCHASES ======//
  const sendDigitalPurchaseEmail = async (orderData) => {
    try {
      // Format current date for receipt
      const orderDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // Get transaction ID or generate one if not available (moved up)
      const orderId =
        orderData?.orderNumber ||
        orderNumber ||
        `ORDER_${Date.now().toString()}`;

      // Prepare items data for email template
      const emailItems = cartItems.map((item) => {
        // Parse access_url if it's a string (JSON format)
        let accessUrls = [];
        if (item.access_url) {
          if (typeof item.access_url === 'string') {
            try {
              // Try to parse as JSON
              accessUrls = JSON.parse(item.access_url);
            } catch (e) {
              // If parsing fails, check if it's already a string URL
              accessUrls = [item.access_url];
              console.error('Error parsing access_url:', e);
            }
          } else if (Array.isArray(item.access_url)) {
            // If it's already an array
            accessUrls = item.access_url;
          }
        }

        // Ensure fileUrls is always an array
        const fileUrls = Array.isArray(item.file_url) ? item.file_url : [];

        // Generate secure download URLs for files
        const secureDownloadUrls = fileUrls
          .map((url) => {
            console.log('🔍 Processing file URL:', url);

            // Skip if URL is still example.com (means upload failed)
            if (!url || url.includes('example.com')) {
              console.warn('⚠️ Skipping invalid file URL:', url);
              return null;
            }

            // Extract the file path from the Supabase URL
            let urlPath = '';
            try {
              if (url.includes('/storage/v1/object/public/products/')) {
                // New Supabase format
                urlPath = url.split('/storage/v1/object/public/products/')[1];
              } else if (url.includes('/products/')) {
                // Fallback format
                urlPath = url.split('/products/')[1];
              } else {
                console.warn('⚠️ Could not extract path from URL:', url);
                return null;
              }
            } catch (e) {
              console.error('❌ Error extracting URL path:', e);
              return null;
            }

            const customerEmail = userProfile?.email || 'customer@example.com';

            console.log('✅ Generated download path:', urlPath);

            // Create secure download URL with absolute path
            const baseUrl =
              typeof window !== 'undefined'
                ? window.location.origin
                : process.env.NEXT_PUBLIC_APP_URL || 'https://pocketlink.co';

            return `${baseUrl}/api/download/${urlPath}?email=${encodeURIComponent(customerEmail)}&product_id=${item.id}&order_id=${orderId}`;
          })
          .filter((url) => url !== null); // Remove any null URLs

        return {
          icon: item.product_type === 'digital' ? '📁' : '📦',
          title: item.title || item.name,
          quantity: item.quantity,
          price: item.price,
          totalPrice: (item.price * item.quantity).toFixed(2),
          fileUrls: secureDownloadUrls, // Use secure URLs instead of direct URLs
          accessUrls: accessUrls,
          hasFileUrls: secureDownloadUrls.length > 0,
          hasAccessUrls: accessUrls.length > 0,
        };
      });

      // Replace template variables
      let emailTemplate = digitalPurchase;
      emailTemplate = emailTemplate.replace(
        /{{userName}}/g,
        userProfile?.username || userProfile?.name || 'Customer'
      );
      emailTemplate = emailTemplate.replace(/{{orderId}}/g, orderId);
      emailTemplate = emailTemplate.replace(/{{orderDate}}/g, orderDate);
      emailTemplate = emailTemplate.replace(
        /{{orderTotal}}/g,
        `₹${total.toFixed(2)}`
      );
      emailTemplate = emailTemplate.replace(
        /{{supportEmail}}/g,
        'support@pocketlink.co'
      );

      // Generate receipt items HTML
      let receiptItemsHtml = '';
      emailItems.forEach((item) => {
        receiptItemsHtml += `
          <tr>
            <td class="receipt-label">${item.title} × ${item.quantity}</td>
            <td class="receipt-value">₹${item.totalPrice}</td>
          </tr>
        `;
      });

      // Replace receipt items placeholder if it exists
      emailTemplate = emailTemplate.replace(
        '<!-- {{RECEIPT_ITEMS}} -->',
        receiptItemsHtml
      );

      // Handle the items loop in the template
      let itemsHtml = '';
      emailItems.forEach((item) => {
        const itemHtml = `
          <tr>
            <td>
              <div class="item-card">
                <div class="item-header">
                  <div class="item-icon-cell">
                    <div class="item-icon">${item.icon}</div>
                  </div>
                  <div class="item-details">
                    <h3 class="item-title">${item.title}</h3>
                  </div>
                </div>
                
                ${
                  item.hasFileUrls
                    ? `
                  <div class="download-files-section">
                    <div class="download-files-title">Download Files:</div>
                    ${item.fileUrls
                      .map(
                        (url, index) => `
                      <a href="${url}" class="download-button">📥 Download File ${index + 1}</a>
                    `
                      )
                      .join('')}
                  </div>
                `
                    : ''
                }
                
                ${
                  item.hasAccessUrls
                    ? `
                  <div class="access-url-section">
                    <div class="access-url-title">Access Links:</div>
                    <ul class="access-url-list">
                      ${item.accessUrls
                        .map(
                          (url) => `
                        <li class="access-url-item">
                          <a href="${url}" class="access-url">${url}</a>
                        </li>
                      `
                        )
                        .join('')}
                    </ul>
                  </div>
                `
                    : ''
                }
              </div>
            </td>
          </tr>
        `;
        itemsHtml += itemHtml;
      });

      // Replace the items section with our generated HTML
      emailTemplate = emailTemplate.replace(
        /{{#each items}}[\s\S]*?{{\/each}}/g,
        itemsHtml
      );

      // Clean up any remaining handlebars tags
      emailTemplate = emailTemplate.replace(
        /{{#if hasFileUrls}}[\s\S]*?{{\/if}}/g,
        ''
      );
      emailTemplate = emailTemplate.replace(
        /{{#if hasAccessUrls}}[\s\S]*?{{\/if}}/g,
        ''
      );
      emailTemplate = emailTemplate.replace(
        /{{#each fileUrls}}[\s\S]*?{{\/each}}/g,
        ''
      );
      emailTemplate = emailTemplate.replace(
        /{{#each accessUrls}}[\s\S]*?{{\/each}}/g,
        ''
      );
      emailTemplate = emailTemplate.replace(/{{[^{}]+}}/g, ''); // Remove any other remaining template tags

      // Call the sendDigitalPurchaseEmail API (uses cron server)
      const response = await fetch('/api/sendDigitalPurchaseEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: userProfile?.email || 'customer@example.com',
          userName: userProfile?.username || userProfile?.name || 'Customer',
          orderId: orderId,
          emailTemplate: emailTemplate,
          subject: `Your Digital Purchase Confirmation - Order #${orderId} 📁`,
        }),
      });

      if (!response.ok) {
        console.error(
          'Failed to queue digital purchase email:',
          response.status
        );
      } else {
        toast.success(
          'Digital purchase confirmation email queued successfully'
        );
      }
    } catch (error) {
      console.error(
        'Error sending digital purchase confirmation email:',
        error
      );
    }
  };

  // Process the order
  const handlePlaceOrder = async () => {
    // Validate required data before proceeding
    // Only check for shipping address if cart is not digital-only
    if (!isDigitalOnly && !selectedAddress) {
      console.error(
        '❌ [CHECKOUT] Missing shipping address for non-digital order'
      );
      toast.error('Please select a shipping address');
      return;
    }

    // Skip payment gateway validation if total is zero
    if (total > 0 && !selectedPaymentGateway) {
      console.error('❌ [CHECKOUT] Missing payment gateway for paid order');
      toast.error(
        'Payment Gateway is not configured by the owner, sorry you cant purchase this..'
      );
      return;
    }

    try {
      // Clear any previous order data and errors
      setPendingOrderData(null);
      setIsProcessingPayment(true);

      // Check which payment gateway we're using
      const isEasebuzzPayment =
        selectedPaymentGateway?.toLowerCase() === 'easebuzz';
      const isRazorpayPayment =
        selectedPaymentGateway?.toLowerCase() === 'razorpay';

      const paymentPayload = {
        items: cartItems,
        amount: total,
        shippingCost: shipping,
        shipping: isDigitalOnly ? null : selectedAddress?.id, // Pass null for digital-only orders
        isEasebuzzPayment, // Pass flag for EaseBuzz payment
        isRazorpayPayment, // Pass flag for Razorpay payment
        isDigitalOnly, // Pass digital-only flag
      };

      const result = await processPayment(paymentPayload);

      if (result.success) {
        setOrderNumber(result.orderNumber);

        if (result.requiresGateway && (result.gatewayType === 'easebuzz' || result.gatewayType === 'razorpay')) {
          // For EaseBuzz or Razorpay, go to payment gateway step
          setPendingOrderData({
            orderNumber: result.orderNumber,
            total: result.total,
            orderData: result.orderData,
          });
          setCurrentCheckoutStep(CHECKOUT_STEPS.PAYMENT_GATEWAY);
          // Note: We don't reset isProcessingPayment here as the payment gateway component
          // will handle showing its own loading state
        } else {
          // For normal payments (free or direct), go to confirmation
          // Send digital purchase email if order contains only digital products
          if (isDigitalOnly) {
            await sendDigitalPurchaseEmail({
              orderNumber: result.orderNumber,
              ...result,
            });
          }

          setCurrentCheckoutStep(CHECKOUT_STEPS.CONFIRMATION);
          setOrderCompleted(true);
          setIsProcessingPayment(false);
        }
      } else {
        console.error('❌ [CHECKOUT] Payment failed:', result.error);
        toast.error(result.error || 'Payment processing failed');
        setIsProcessingPayment(false);
      }
    } catch (error) {
      console.error(
        '💥 [CHECKOUT] Payment processing failed with exception:',
        error
      );
      console.error('💥 [CHECKOUT] Error stack:', error.stack);
      toast.error('Payment processing failed. Please try again.');
      setIsProcessingPayment(false);
    }
  };

  // Handle EaseBuzz payment success
  const handlePaymentSuccess = async (response) => {
    if (!pendingOrderData) {
      console.error('No pending order data available for payment success');
      return;
    }

    try {
      // Use the checkout context to update the order status
      const result = await contextHandlePaymentSuccess(
        pendingOrderData.orderNumber,
        response
      );

      if (!result.success) {
        console.error('Error updating order status:', result.error);
        toast.error(
          'Payment was successful, but there was an issue updating your order.'
        );
      }

      // Send digital purchase email if order contains only digital products
      if (isDigitalOnly) {
        await sendDigitalPurchaseEmail({
          orderNumber: pendingOrderData.orderNumber,
          ...response,
        });
      }

      // Move to confirmation step
      setOrderCompleted(true);
      setCurrentCheckoutStep(CHECKOUT_STEPS.CONFIRMATION);
    } catch (err) {
      console.error('Error processing payment success:', err);
      toast.error(
        'Payment was successful, but there was an error processing your order.'
      );

      // Still move to confirmation since payment was successful
      setOrderCompleted(true);
      setCurrentCheckoutStep(CHECKOUT_STEPS.CONFIRMATION);
    }
  };

  // Handle EaseBuzz payment failure
  const handlePaymentFailure = async (reason) => {
    if (reason === 'user_cancelled') {
      // Go back to checkout step if user cancelled
      setCurrentCheckoutStep(CHECKOUT_STEPS.CHECKOUT);
      setPendingOrderData(null);
      return;
    }

    try {
      if (!pendingOrderData || !pendingOrderData.orderNumber) {
        console.error('No valid order number available for payment failure');
        // Show generic failure
        setCurrentCheckoutStep(CHECKOUT_STEPS.PAYMENT_FAILURE);
        setPendingOrderData({
          orderNumber: 'Unknown',
          failureReason: reason || 'Payment processing error',
        });
        return;
      }

      // Use the checkout context to update the order status
      const result = await contextHandlePaymentFailure(
        pendingOrderData.orderNumber,
        reason
      );

      if (!result.success) {
        console.error('Error updating order failure status:', result.error);
        toast.error('There was a problem processing your payment status.');
      }

      // Show payment failure step
      setCurrentCheckoutStep(CHECKOUT_STEPS.PAYMENT_FAILURE);
      setPendingOrderData({
        ...pendingOrderData,
        failureReason: reason || 'Unknown error',
      });
    } catch (err) {
      console.error('Error processing payment failure:', err);
      toast.error('Payment failed. Please try a different payment method.');

      // Show payment failure step
      setCurrentCheckoutStep(CHECKOUT_STEPS.PAYMENT_FAILURE);
      setPendingOrderData({
        ...pendingOrderData,
        failureReason: 'Error processing payment',
      });
    }
  };

  // Determine next button text based on current step
  const getNextButtonText = () => {
    switch (currentCheckoutStep) {
      case CHECKOUT_STEPS.CHECKOUT:
        if (total === 0) {
          return isDigitalOnly ? 'Complete Order' : 'Place Order';
        }
        return isDigitalOnly ? 'Pay and Complete' : 'Pay and Place Order';
      case CHECKOUT_STEPS.CONFIRMATION:
        return 'Continue Shopping';
      default:
        return 'Continue';
    }
  };

  // Check if next button should be disabled
  const isNextButtonDisabled = () => {
    switch (currentCheckoutStep) {
      case CHECKOUT_STEPS.CHECKOUT:
        // For free products, skip payment gateway validation
        if (total === 0) {
          // For digital-only free orders, don't require shipping address
          if (isDigitalOnly) {
            return isProcessingPayment;
          }
          // For physical free orders, require shipping address
          return !selectedAddress || isProcessingPayment;
        }

        // For paid products, require payment gateway
        // For digital-only orders, don't require shipping address
        if (isDigitalOnly) {
          return !selectedPaymentGateway || isProcessingPayment;
        }
        return (
          !selectedAddress || !selectedPaymentGateway || isProcessingPayment
        );
      default:
        return false;
    }
  };

  // Show next button based on current step
  const shouldShowNextButton = () => {
    return currentCheckoutStep !== CHECKOUT_STEPS.PAYMENT_GATEWAY;
  };

  // Get dialog title based on current step
  const getDialogTitle = () => {
    switch (currentCheckoutStep) {
      case CHECKOUT_STEPS.CHECKOUT:
        return 'Checkout';
      case CHECKOUT_STEPS.PAYMENT_GATEWAY:
        return 'Complete Payment';
      case CHECKOUT_STEPS.CONFIRMATION:
        return 'Order Confirmed';
      case CHECKOUT_STEPS.PAYMENT_FAILURE:
        return 'Payment Failed';
      default:
        return 'Checkout';
    }
  };

  // Render the appropriate step content
  const renderStepContent = () => {
    switch (currentCheckoutStep) {
      case CHECKOUT_STEPS.CHECKOUT:
        return renderCombinedCheckoutStep();
      case CHECKOUT_STEPS.PAYMENT_GATEWAY:
        // Get the active payment gateway
        const activeGateway = paymentGateways.find(gateway => gateway.is_active);
        const gatewayName = activeGateway?.gateway_name?.toLowerCase();
        
        // Render the appropriate payment gateway component
        if (gatewayName === 'razorpay') {
          return (
            <RazorpayPaymentGateway
              orderDetails={pendingOrderData}
              onSuccess={handlePaymentSuccess}
              onFailure={handlePaymentFailure}
              onTemporaryClose={() => {
                // Close the modal while payment is being processed in external gateway
                setIsCheckoutOpen(false);
              }}
            />
          );
        } else if (gatewayName === 'easebuzz') {
          return (
            <EaseBuzzPaymentGateway
              orderDetails={pendingOrderData}
              onSuccess={handlePaymentSuccess}
              onFailure={handlePaymentFailure}
              onTemporaryClose={() => {
                // Close the modal while payment is being processed in external gateway
                setIsCheckoutOpen(false);
              }}
            />
          );
        } else {
          // Default fallback if no recognized gateway is active
          return (
            <div className="flex flex-col items-center justify-center py-10">
              <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold text-amber-600 mb-2">
                No Payment Gateway Available
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Please contact the merchant to set up a payment method.
              </p>
              <Button onClick={goBack}>Go Back</Button>
            </div>
          );
        }
      case CHECKOUT_STEPS.CONFIRMATION:
        return (
          <div className="space-y-6 py-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-bold">
                Thank You for Your Order!
              </h3>
              <p className="text-lg text-gray-600">
                Your order #{orderNumber} has been placed successfully.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-gray-600">
                We'll send a confirmation to{' '}
                {userProfile?.email || 'your email'}.
              </p>
              <p className="mt-2 text-gray-600">
                You can track your order status in your account.
              </p>
            </div>
          </div>
        );
      case CHECKOUT_STEPS.PAYMENT_FAILURE:
        return (
          <div className="space-y-6 py-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-10 w-10 text-red-600" />
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-bold">Payment Failed</h3>
              <p className="text-lg text-gray-600">
                There was a problem processing your payment.
              </p>
              <p className="mt-2 text-gray-500">
                {pendingOrderData?.failureReason ||
                  'Please try again or use a different payment method.'}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-gray-600">
                Your order has not been confirmed.
              </p>
              <div className="mt-4">
                <Button
                  onClick={() => {
                    // Clear the pendingOrderData before returning to checkout
                    setPendingOrderData(null);
                    setCurrentCheckoutStep(CHECKOUT_STEPS.CHECKOUT);
                  }}
                  className="w-full px-8 sm:w-auto"
                >
                  Return to Checkout
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Sync with authentication status - only run when authentication status changes
  useEffect(() => {
    const syncAuthState = () => {
      // Only process if authentication state actually changed
      if (isAuthenticated !== prevAuthRef.current) {
        prevAuthRef.current = isAuthenticated;

        if (isAuthenticated && !currentCheckoutStep && isOpen) {
          setCurrentCheckoutStep(CHECKOUT_STEPS.CHECKOUT);
        }
      }
    };

    syncAuthState();

    // Also check sessionStorage for auth status
    const authActive =
      sessionStorage.getItem('pocketlink_auth_active') === 'true';
    if (authActive && !isAuthenticated) {
      window.dispatchEvent(
        new CustomEvent('pocketlink_auth_update', {
          detail: { isAuthenticated: true },
        })
      );
    }

    const handleAuthChange = (event) => {
      // Debounce the auth change handler to prevent multiple rapid changes
      clearTimeout(window.authChangeTimeout);
      window.authChangeTimeout = setTimeout(() => {
        // Always sync auth state when explicit event is received
        if (event.detail && event.detail.isAuthenticated !== undefined) {
          prevAuthRef.current = event.detail.isAuthenticated;
        }

        syncAuthState();

        // If we have email in the event, ensure it's stored
        if (event.detail && event.detail.email) {
          sessionStorage.setItem('checkout_user_email', event.detail.email);

          // Only load user profile if needed
          if (!userProfile || userProfile.email !== event.detail.email) {
            loadUserProfile();
          }
        }
      }, 100);
    };

    window.addEventListener('pocketlink_auth_update', handleAuthChange);

    return () => {
      window.removeEventListener('pocketlink_auth_update', handleAuthChange);
      clearTimeout(window.authChangeTimeout);
    };
  }, [
    isAuthenticated,
    currentCheckoutStep,
    isOpen,
    loadUserProfile,
    userProfile,
  ]);

  // Fix dialog rendering by ensuring we don't have conflicting dialogs
  const shouldShowDialog = isOpen && !authDialogOpen;

  return (
    <>
      <CheckoutAuthenticationDialog
        isOpen={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        tenant={tenant}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Mobile View: Sheet */}
      {isMobile ? (
        <Sheet
          open={shouldShowDialog}
          onOpenChange={(open) => setIsCheckoutOpen(open)}
        >
          <SheetContent
            side="bottom"
            className="max-h-[75vh] overflow-y-auto overflow-x-hidden rounded-t-lg p-4"
            ref={dialogContentRef}
          >
            <div className="z-50 w-full bg-white">
              <SheetHeader className="flex items-center border-b px-4 pb-3 pt-4">
                {currentCheckoutStep !== CHECKOUT_STEPS.CONFIRMATION &&
                  currentCheckoutStep !== CHECKOUT_STEPS.PAYMENT_GATEWAY && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={goBack}
                      className="absolute left-4 mr-2 bg-gray-100"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  )}
                <SheetTitle className="mx-auto text-center text-xl font-bold">
                  {getDialogTitle()}
                </SheetTitle>
              </SheetHeader>

              {/* Step indicators */}
              {/* {renderStepIndicators()} */}
            </div>

            <div className="w-full p-4">{renderStepContent()}</div>

            <Separator className="my-4 w-full" />

            {currentCheckoutStep !== CHECKOUT_STEPS.CONFIRMATION &&
              currentCheckoutStep !== CHECKOUT_STEPS.PAYMENT_GATEWAY && (
                <div className="mb-4 w-full space-y-2 px-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {/* <div className="flex justify-between items-center text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                  </div> */}
                  <div className="flex items-center justify-between pt-2 text-base font-medium">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              )}

            {shouldShowNextButton() && (
              <Button
                className="h-12 w-full rounded-none text-base font-medium shadow-lg transition-shadow"
                onClick={
                  currentCheckoutStep === CHECKOUT_STEPS.CONFIRMATION
                    ? onClose
                    : goNext
                }
                disabled={isNextButtonDisabled()}
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  getNextButtonText()
                )}
              </Button>
            )}
          </SheetContent>
        </Sheet>
      ) : (
        /* Desktop View: Dialog */
        <Dialog open={shouldShowDialog} onOpenChange={onClose}>
          <DialogContent
            className="flex max-h-[80vh] flex-col items-start justify-start overflow-y-auto overflow-x-hidden sm:max-w-md md:max-w-xl"
            ref={dialogContentRef}
          >
            <div className="w-full bg-white">
              <DialogHeader className="flex items-center border-b pb-3">
                {currentCheckoutStep !== CHECKOUT_STEPS.CONFIRMATION &&
                  currentCheckoutStep !== CHECKOUT_STEPS.PAYMENT_GATEWAY && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={goBack}
                      className="absolute left-4 mr-2 bg-gray-100"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  )}
                <DialogTitle className="mx-auto text-center text-xl font-bold">
                  {getDialogTitle()}
                </DialogTitle>
              </DialogHeader>

              {/* Step indicators */}
              {/* {renderStepIndicators()} */}
            </div>

            <div className="w-full">{renderStepContent()}</div>

            <Separator className="my-4 w-full" />

            {currentCheckoutStep !== CHECKOUT_STEPS.CONFIRMATION &&
              currentCheckoutStep !== CHECKOUT_STEPS.PAYMENT_GATEWAY && (
                <div className="mb-4 w-full space-y-2 rounded-lg bg-gray-50 p-4 px-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {/* <div className="flex justify-between items-center text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                  </div> */}
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center font-semibold">
                      <CreditCard className="mr-2 h-4 w-4 text-blue-600" />
                      <span>Total</span>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-lg font-bold text-transparent">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

            {shouldShowNextButton() && (
              <Button
                className="mx-auto mb-4 h-12 w-full px-4 text-base font-medium shadow-lg transition-shadow"
                onClick={
                  currentCheckoutStep === CHECKOUT_STEPS.CONFIRMATION
                    ? onClose
                    : goNext
                }
                disabled={isNextButtonDisabled()}
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  getNextButtonText()
                )}
              </Button>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CheckoutDialog;
