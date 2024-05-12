'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { useCheckout } from '@/app/contexts/CheckoutContext';
import { useCheckoutAuth } from '@/app/contexts/CheckoutAuthContext';
import { toast } from 'sonner';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  AtSign,
  Mail,
  KeyRound,
  ArrowRight,
  Loader2,
  ChevronLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import Cookies from 'js-cookie';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Safe storage operations
const safeSetStorage = (key, value) => {
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(key, value);
    }
    return true;
  } catch (e) {
    return false;
  }
};

// Safe cookie operations
const safeGetCookie = (name) => {
  try {
    // First try js-cookie
    let value = Cookies.get(name);

    // If not found, try manual cookie parsing
    if (!value && typeof document !== 'undefined') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          value = cookie.substring(name.length + 1);
          break;
        }
      }
    }

    return value;
  } catch (e) {
    return null;
  }
};

const CheckoutAuthenticationDialog = ({
  isOpen,
  onClose,
  tenant,
  onAuthSuccess,
}) => {
  const { loadUserProfile } = useCheckout() || {};
  const {
    sendEmailOTP,
    verifyOTP,
    isAuthenticating,
    otpSession,
    setMerchant,
    currentMerchant,
  } = useCheckoutAuth() || {};

  const isMobile = useMediaQuery('(max-width: 768px)');
  const previousTenant = useRef(null);

  // Auth states
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('enterEmail');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isTypingEmail, setIsTypingEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [internalLoading, setInternalLoading] = useState(false);

  // Check for authentication cookie on dialog open
  useEffect(() => {
    if (!isOpen) return;

    // Check for auth cookie
    safeGetCookie('pocketlink_auth');
  }, [isOpen]);

  // Set current merchant based on tenant prop when dialog is open
  useEffect(() => {
    if (!isOpen || !tenant || typeof setMerchant !== 'function') return;

    if (
      !currentMerchant ||
      (currentMerchant.username !== tenant && previousTenant.current !== tenant)
    ) {
      try {
        // Set the merchant information (setMerchant will handle ID generation and lookup)
        setMerchant({
          username: tenant, // setMerchant will handle ID generation and lookup
          name: tenant,
        });

        // Update the ref to avoid redundant updates
        previousTenant.current = tenant;
      } catch (error) {
        // Fail silently
      }
    }
  }, [isOpen, tenant, currentMerchant, setMerchant]);

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setStep('enterEmail');
      setOtp('');
      setEmailError('');
      // Don't reset email if we have it, for better UX
    }
  }, [isOpen]);

  // Cooldown timer effect for OTP resend
  useEffect(() => {
    let interval;

    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => Math.max(0, prev - 1));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendCooldown]);

  // Handle email validation
  const validateEmail = (email) => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }

    if (!EMAIL_REGEX.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }

    setEmailError('');
    return true;
  };

  // Handle email submission and OTP sending
  const handleSendOTP = async () => {
    if (!validateEmail(email) || typeof sendEmailOTP !== 'function') {
      return;
    }

    try {
      setInternalLoading(true);

      // Ensure merchant information is set before sending OTP
      if (
        tenant &&
        typeof setMerchant === 'function' &&
        (!currentMerchant || currentMerchant.username !== tenant)
      ) {
        // Set the merchant information (setMerchant will handle ID generation and lookup)
        setMerchant({
          username: tenant, // setMerchant will handle ID generation and lookup
          name: tenant,
        });
      }

      const result = await sendEmailOTP(email);

      if (result && result.success) {
        setStep('verifyOTP');
        setResendCooldown(30); // Start 30-second cooldown

        // Store email for recovery
        safeSetStorage('checkout_last_email', email);
        if (tenant) {
          safeSetStorage('checkout_last_merchant', tenant);
        }
      } else {
        toast.error('Failed to send verification code. Please try again.');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setInternalLoading(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async (isAutoVerify = false, otpValue = null) => {
    const currentOtp = otpValue || otp;

    if (
      !currentOtp ||
      currentOtp.length < 6 ||
      typeof verifyOTP !== 'function'
    ) {
      if (!isAutoVerify) {
        toast.error('Please enter a complete verification code');
      }
      return;
    }

    // Ensure the OTP is processed as a clean string (remove any formatting)
    const otpString = currentOtp.toString().replace(/[^0-9]/g, '');

    if (otpString.length !== 6) {
      if (!isAutoVerify) {
        toast.error('Please enter a valid 6-digit code');
      }
      return;
    }

    try {
      setInternalLoading(true);

      // Ensure merchant information is set before verification
      if (
        tenant &&
        typeof setMerchant === 'function' &&
        (!currentMerchant || currentMerchant.username !== tenant)
      ) {
        // Set the merchant information (setMerchant will handle ID generation and lookup)
        setMerchant({
          username: tenant, // setMerchant will handle ID generation and lookup
          name: tenant,
        });
      }

      // This will trigger manual authentication in the auth context (isManualAuth = true)
      const success = await verifyOTP(otpString);

      if (success) {
        // Store email in session storage for cross-page persistence
        safeSetStorage('checkout_user_email', email.trim().toLowerCase());

        // Load user profile after successful verification
        if (typeof loadUserProfile === 'function') {
          try {
            await loadUserProfile();
          } catch (error) {
            // Continue even if profile loading fails
          }
        }

        toast.success('Successfully verified');

        // Notify parent component of authentication success
        // This will trigger the opening of the checkout
        if (typeof onAuthSuccess === 'function') {
          onAuthSuccess();
        }

        // Close this dialog
        if (typeof onClose === 'function') {
          onClose();
        }
      } else {
        // Only show error for manual verification
        if (!isAutoVerify) {
          toast.error('Invalid verification code. Please try again.');
        }
      }
    } catch (err) {
      // Only show error for manual verification
      if (!isAutoVerify) {
        toast.error('An error occurred during verification. Please try again.');
      }
    } finally {
      setInternalLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (step === 'enterEmail') {
        handleSendOTP();
      } else if (step === 'verifyOTP' && otp.length === 6) {
        handleVerifyOTP();
      }
    }
  };

  // Determine if we're in a loading state (either from context or internal state)
  const isLoading = isAuthenticating || internalLoading;

  const renderContent = () => {
    const ContentWrapper = isMobile ? SheetContent : DialogContent;
    const HeaderWrapper = isMobile ? SheetHeader : DialogHeader;
    const TitleWrapper = isMobile ? SheetTitle : DialogTitle;
    const DescriptionWrapper = isMobile ? SheetDescription : DialogDescription;

    const contentClasses = isMobile
      ? 'overflow-y-auto max-h-[60vh] rounded-t-lg'
      : 'sm:max-w-md max-h-[90vh] overflow-y-auto';

    return (
      <ContentWrapper
        side={isMobile ? 'bottom' : undefined}
        className={contentClasses}
      >
        <HeaderWrapper className="sticky top-0 z-10 bg-white pb-2 text-center">
          <div className="mb-2 flex items-center justify-center">
            {step === 'verifyOTP' && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-0"
                onClick={() => setStep('enterEmail')}
                disabled={isLoading}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            <TitleWrapper className="text-xl font-bold">
              {step === 'enterEmail'
                ? 'Sign in to continue'
                : 'Verify your email'}
            </TitleWrapper>
          </div>
          <DescriptionWrapper className="text-center text-sm text-gray-500">
            {step === 'enterEmail'
              ? 'Enter your email to continue with checkout'
              : `We've sent a code to ${email}`}
          </DescriptionWrapper>
        </HeaderWrapper>

        <div className="flex flex-col gap-6 py-4">
          {step === 'enterEmail' ? (
            // Email input step
            <div className="space-y-4">
              <div className="relative">
                <AtSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  className={`pl-10 transition-all ${emailError ? 'border-red-500 ring-red-100' : isTypingEmail ? 'border-blue-500 ring-2 ring-blue-100' : ''}`}
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  onFocus={() => setIsTypingEmail(true)}
                  onBlur={() => setIsTypingEmail(false)}
                  onKeyDown={handleKeyDown}
                  autoComplete="pocketlink-email"
                  disabled={isLoading}
                />
                {emailError && (
                  <div className="mt-1 flex items-center text-sm text-red-500">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {emailError}
                  </div>
                )}
              </div>

              <Button
                className="h-12 w-full transition-all duration-300"
                onClick={handleSendOTP}
                disabled={isLoading || !email || !!emailError}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending code...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    or continue with
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="h-12 w-full"
                disabled={true}
                onClick={() => setShowPassword(true)}
              >
                <KeyRound className="mr-2 h-5 w-5" />
                Password
              </Button>
            </div>
          ) : (
            // OTP verification step
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4 rounded-full bg-blue-50 p-4">
                  <Mail className="h-12 w-12 text-blue-500" />
                </div>

                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                    if (value.length === 6) {
                      // Auto-submit when all digits are entered
                      setTimeout(() => {
                        if (!isLoading) {
                          handleVerifyOTP(true, value); // Pass flag and current value for auto-verification
                        }
                      }, 300);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={0} className="h-12 w-12" />
                    <InputOTPSlot index={1} className="h-12 w-12" />
                    <InputOTPSlot index={2} className="h-12 w-12" />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={3} className="h-12 w-12" />
                    <InputOTPSlot index={4} className="h-12 w-12" />
                    <InputOTPSlot index={5} className="h-12 w-12" />
                  </InputOTPGroup>
                </InputOTP>

                <p className="mt-6 flex items-center justify-center text-sm text-gray-500">
                  {resendCooldown > 0 ? (
                    <>
                      <Clock className="mr-1 h-4 w-4 text-gray-400" />
                      Resend available in {resendCooldown}s
                    </>
                  ) : (
                    <>
                      Didn't receive a code?{' '}
                      <button
                        onClick={handleSendOTP}
                        disabled={resendCooldown > 0 || isLoading}
                        className="ml-1 font-medium text-blue-600 underline focus:outline-none disabled:text-gray-400"
                      >
                        Resend
                      </button>
                    </>
                  )}
                </p>
              </div>

              <Button
                className="mt-6 h-12 w-full transition-all duration-300"
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length < 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Verify and continue
                  </>
                )}
              </Button>

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setStep('enterEmail')}
                disabled={isLoading}
              >
                Use a different email
              </Button>
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          By continuing, you agree to our{' '}
          <a href="#" className="text-primary underline underline-offset-4">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary underline underline-offset-4">
            Privacy Policy
          </a>
          .
        </div>
      </ContentWrapper>
    );
  };

  // Ensure both dialog types handle open/close state consistently
  const onDialogOpenChange = (open) => {
    if (!open && typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <>
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={onDialogOpenChange}>
          {renderContent()}
        </Sheet>
      ) : (
        <Dialog open={isOpen} onOpenChange={onDialogOpenChange}>
          {renderContent()}
        </Dialog>
      )}
    </>
  );
};

export default CheckoutAuthenticationDialog;
