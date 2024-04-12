'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PulsatingButton } from '@/components/magicui/pulsating-button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  Loader2,
  ChevronRight,
  Check,
  Info,
} from 'lucide-react';
import { ref, get, set } from 'firebase/database';
import { realDb } from '@/Clients/FireUserNameDb';
// Import server action to process claim (will be called after auth)
import { processClaim } from '../lib/claimActions';

export default function LeftPanel({
  profile,
  username,
  tenantTheme,
  isPremium,
  items,
  mobileItems,
  theme,
  ogPreviewType,
}) {
  const router = useRouter();
  const params = useParams();
  const [claimId, setClaimId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Username, 2: Activation Code, 3: Processing/Success
  const [newUsername, setNewUsername] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [usernameVerified, setUsernameVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  // Get claim ID from URL params
  useEffect(() => {
    if (params?.id && params.id[0]) {
      setClaimId(params.id[0]);
    }
  }, [params]);

  if (!profile) {
    return (
      <div className="mt-20 text-center text-gray-500">No profile data...</div>
    );
  }

  const textColor = tenantTheme?.textMode === 'dark' ? 'black' : 'white';
  const descriptionColor =
    tenantTheme?.textMode === 'dark' ? '#1c1c1b' : '#f0f0ed';

  // =========== FORMAT TEXT =========== //
  const formatText = (text) => {
    return text
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">$1</a>'
      )
      .replace(/\n/g, '<br>');
  };

  // Check Username Availability
  const checkUsernameAvailability = async () => {
    if (newUsername.length < 3) {
      setIsValid(false);
      setUsernameVerified(false);
      toast.error('Username too short', {
        description: 'Username must be at least 3 characters long.',
      });
      return;
    }

    setLoading(true);
    try {
      const firstLetter = newUsername[0];
      const usernameRef = ref(
        realDb,
        `usernames/${firstLetter}/${newUsername}`
      );
      const snapshot = await get(usernameRef);

      if (snapshot.exists()) {
        setIsValid(false);
        setUsernameVerified(false);
        toast.error('Username Unavailable', {
          description: 'This username is already taken. Try another.',
        });
      } else {
        setIsValid(true);
        setUsernameVerified(true);
        toast.success('Username Verified', {
          description: `"${newUsername}" is available! You can proceed.`,
        });
      }
    } catch (err) {
      console.error('Error checking username:', err.message);
      setIsValid(false);
      setUsernameVerified(false);
      toast.error('Error', {
        description: 'An error occurred while checking availability.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Username Input Changes
  const handleUsernameChange = (e) => {
    let value = e.target.value.toLowerCase();

    // Remove invalid characters
    if (/[^a-z0-9]/.test(value)) {
      toast.error('Invalid Input', {
        description: 'Only lowercase letters & numbers are allowed!',
      });
      value = value.replace(/[^a-z0-9]/g, '');
    }

    // Prevent usernames from starting with numbers
    if (/^\d/.test(value)) {
      toast.error('Invalid Input', {
        description: 'Username cannot start with a number!',
      });
      value = value.replace(/^\d+/g, '');
    }

    setNewUsername(value);
    setIsValid(null);
    setUsernameVerified(false); // Reset verification when username changes
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(value ? validateEmail(value) : null);
  };

  // Handle Activation Code validation
  const verifyActivationCode = () => {
    if (!email) {
      toast.error('Email Required', {
        description: 'Please enter your email address to continue.',
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid Email', {
        description: 'Please enter a valid email address.',
      });
      return;
    }

    if (!activationCode) {
      toast.error('Activation Code Required', {
        description: 'Please enter the activation code to continue.',
      });
      return;
    }

    if (activationCode === '1208552') {
      toast.success('Code Verified', {
        description: 'Premium access will be activated after claiming.',
      });
      // Move directly to processing step
      handleProcessClaim(true);
    } else {
      toast.error('Invalid Code', {
        description: 'The activation code you entered is invalid.',
      });
    }
  };

  // Process claim directly without Google auth
  const handleProcessClaim = async (isCodeVerified = false) => {
    if (!email) {
      toast.error('Email Required', {
        description: 'Please enter your email address to continue.',
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid Email', {
        description: 'Please enter a valid email address.',
      });
      return;
    }

    if (!activationCode) {
      toast.error('Activation Code Required', {
        description: 'Please enter the activation code to continue.',
      });
      return;
    }

    if (!isCodeVerified) {
      toast.error('Code Verification Required', {
        description: 'Please verify your activation code before claiming.',
      });
      return;
    }

    try {
      setStep(3);
      setProcessing(true);

      // Process the claim with our server action
      const result = await processClaim({
        claimId,
        username: newUsername,
        email,
        profile,
        items,
        mobileItems,
        theme,
        ogPreviewType,
        isCodeVerified: true,
      });

      if (result.success) {
        setClaimSuccess(true);
        toast.success('Claim Successful!', {
          description: `You've successfully claimed this Pocketlink as @${newUsername}`,
        });

        // Redirect after showing success animation
        setTimeout(() => {
          if (window) window.open(`https://${newUsername}.pocketlink.co`);
        }, 3000);
      } else {
        toast.error('Claim Failed', {
          description:
            result.error || 'Something went wrong during claim processing',
        });
        setProcessing(false);
      }
    } catch (error) {
      console.error('Error processing claim:', error);
      toast.error('Processing Error', {
        description: 'An error occurred while processing your claim',
      });
      setProcessing(false);
    }
  };

  // Close modal and reset state
  const handleClose = () => {
    if (processing && !claimSuccess) {
      // Don't allow closing during processing unless successful
      return;
    }

    setIsOpen(false);
    setTimeout(() => {
      setStep(1);
      setNewUsername('');
      setActivationCode('');
      setEmail('');
      setIsValid(null);
      setIsEmailValid(null);
      setUsernameVerified(false);
      setClaimSuccess(false);
    }, 300);
  };

  return (
    <main className="relative mt-10 flex h-full w-full flex-col items-center justify-start rounded-md p-4 text-black dark:text-white">
      <div className="flex w-full flex-col items-center">
        {/* Name (click to edit) */}
        <div className="flex w-full flex-col items-center">
          <p
            style={{ color: textColor }}
            className="text-center text-3xl font-semibold"
          >
            {profile?.name}
          </p>
        </div>

        {/* Description */}
        <div className="relative flex w-full flex-col items-center">
          <p
            style={{ color: descriptionColor }}
            className="w-full whitespace-pre-wrap break-words text-center text-lg"
            dangerouslySetInnerHTML={{
              __html: formatText(profile?.description || ''),
            }}
          />
        </div>
      </div>

      {/* Left Panel Component */}
      <div className="mt-10 flex w-full flex-col items-center justify-center md:mt-4">
        <PulsatingButton
          className="mx-auto text-white"
          onClick={() => setIsOpen(true)}
          disabled={processing}
        >
          {processing ? 'Processing...' : 'Claim this Pocketlink'}
        </PulsatingButton>
      </div>

      {/* Claim Modal */}
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="w-[95%] rounded-lg md:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              {step === 1 && 'Choose Your Username'}
              {step === 2 && 'Complete Your Claim'}
              {step === 3 &&
                (claimSuccess ? 'Claim Successful!' : 'Processing Claim...')}
            </DialogTitle>
          </DialogHeader>

          {/* Step 1: Username Setup */}
          {step === 1 && (
            <div className="space-y-4 py-4">
              <p className="text-center text-sm text-gray-500">
                This will be your unique identity.{' '}
                <span className="font-medium text-amber-600">
                  Once set, it cannot be changed.
                </span>
              </p>

              <div className="relative">
                <motion.div
                  animate={{
                    scale: focused ? 1.02 : 1,
                    boxShadow: focused
                      ? '0 4px 20px rgba(156, 64, 255, 0.15)'
                      : '0 2px 10px rgba(0, 0, 0, 0.05)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="relative flex items-center overflow-hidden rounded-lg"
                >
                  <Input
                    type="text"
                    value={newUsername}
                    onChange={handleUsernameChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Enter your username"
                    className={`w-full border-2 p-4 pr-12 text-lg transition-all duration-200 focus:outline-none focus:ring-0 ${
                      isValid === true
                        ? 'border-green-400 bg-green-50'
                        : isValid === false
                          ? 'border-red-400 bg-red-50'
                          : 'border-gray-200 focus:border-purple-400'
                    }`}
                  />
                  <div className="absolute right-3 flex items-center">
                    <AnimatePresence mode="wait">
                      {loading && (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Loader2
                            className="animate-spin text-purple-500"
                            size={22}
                          />
                        </motion.div>
                      )}
                      {isValid === true && !loading && (
                        <motion.div
                          key="valid"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CheckCircle className="text-green-500" size={22} />
                        </motion.div>
                      )}
                      {isValid === false && !loading && (
                        <motion.div
                          key="invalid"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <XCircle className="text-red-500" size={22} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              <p className="text-center text-xs italic text-gray-500">
                Usernames must be unique, start with a letter, and contain only
                lowercase letters & numbers.
              </p>

              {newUsername.length > 0 && !usernameVerified && (
                <div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          newUsername.length < 3
                            ? '33%'
                            : newUsername.length < 5
                              ? '66%'
                              : '100%',
                        background:
                          newUsername.length < 3
                            ? '#ef4444'
                            : newUsername.length < 5
                              ? '#f59e0b'
                              : '#10b981',
                      }}
                      transition={{ duration: 0.5 }}
                      className="h-full"
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-xs">
                    <span>Too Short</span>
                    <span>Good</span>
                    <span>Perfect</span>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {!usernameVerified ? (
                  <Button
                    onClick={checkUsernameAvailability}
                    disabled={loading || newUsername.length < 3}
                    className="w-full rounded-lg bg-gradient-to-r from-purple-600 from-purple-700 to-indigo-600 to-indigo-700 px-4 py-2 text-white"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={18} />
                        <span>Checking...</span>
                      </div>
                    ) : (
                      <span>Verify Username</span>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setStep(2)}
                    className="w-full rounded-lg bg-gradient-to-r from-purple-600 from-purple-700 to-indigo-600 to-indigo-700 px-4 py-2 text-white"
                  >
                    <span>Continue</span>
                    <ChevronRight size={16} className="ml-2" />
                  </Button>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Step 2: Email and Activation Code */}
          {step === 2 && (
            <div className="space-y-4 py-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                    className={`w-full border-2 p-4 text-base transition-all duration-200 focus:outline-none focus:ring-0 ${
                      isEmailValid === true
                        ? 'border-green-400 bg-green-50'
                        : isEmailValid === false
                          ? 'border-red-400 bg-red-50'
                          : 'border-gray-200 focus:border-purple-400'
                    }`}
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isEmailValid === true && (
                      <CheckCircle className="text-green-500" size={18} />
                    )}
                    {isEmailValid === false && (
                      <XCircle className="text-red-500" size={18} />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-md bg-blue-50 p-3">
                <Info
                  className="mt-0.5 flex-shrink-0 text-blue-500"
                  size={16}
                />
                <p className="text-xs text-blue-700">
                  Please use this email to log in next time to sync your Google
                  account with this profile.
                </p>
              </div>

              {/* Activation Code */}
              <div className="mt-4 space-y-2">
                <label
                  htmlFor="code"
                  className="text-sm font-medium text-gray-700"
                >
                  Activation Code
                </label>
                <Input
                  id="code"
                  type="text"
                  value={activationCode}
                  onChange={(e) => setActivationCode(e.target.value)}
                  placeholder="Enter code: *******"
                  className="w-full border-2 border-gray-200 p-4 text-base transition-all duration-200 focus:border-purple-400 focus:outline-none focus:ring-0"
                  required
                />
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  onClick={verifyActivationCode}
                  disabled={!email || !activationCode || isEmailValid === false}
                  className="w-full rounded-lg bg-gradient-to-r from-purple-600 from-purple-700 to-indigo-600 to-indigo-700 px-4 py-2 text-white"
                >
                  Complete Claim
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Processing/Success Animation */}
          {step === 3 && (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              {!claimSuccess ? (
                // Processing animation
                <div className="flex flex-col items-center space-y-4">
                  <motion.div
                    animate={{
                      rotate: 360,
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                      },
                    }}
                    className="h-16 w-16 rounded-full border-4 border-b-purple-600 border-l-purple-300 border-r-purple-300 border-t-purple-600"
                  />
                  <p className="text-center text-gray-600">
                    Processing your claim...
                    <br />
                    <span className="text-sm text-gray-500">
                      This will only take a moment
                    </span>
                  </p>
                </div>
              ) : (
                // Success animation
                <motion.div
                  className="flex flex-col items-center space-y-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 10,
                      delay: 0.2,
                    }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
                  >
                    <Check
                      className="text-green-600"
                      size={40}
                      strokeWidth={3}
                    />
                  </motion.div>

                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-gray-800">
                      Claim Successful!
                    </h3>
                    <p className="text-gray-600">
                      Your Pocketlink has been claimed as
                    </p>
                    <p className="text-lg font-semibold text-purple-600">
                      @{newUsername}
                    </p>
                    <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-700">
                      <p>
                        Remember to use{' '}
                        <span className="font-semibold">{email}</span> when
                        logging in to access this profile.
                      </p>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                      Redirecting you to your page...
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
