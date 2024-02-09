'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { ref, get } from 'firebase/database';
import { realDb } from '@/Clients/FireUserNameDb';
import { useOnboarding } from '@/app/contexts/OnboardingContext';

export default function OnboardingUsername() {
  const {
    nextStep,
    prevStep,
    setUsername,
    username,
    usernameVerified,
    setUsernameVerified,
  } = useOnboarding();
  const [isValid, setIsValid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  // Debounce username checking
  useEffect(() => {
    const timer = setTimeout(() => {
      if (username.length >= 3 && !usernameVerified) {
        checkUsernameAvailability();
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [username]);

  // Check Username Availability
  const checkUsernameAvailability = async () => {
    if (username.length < 3) {
      setIsValid(false);
      setUsernameVerified(false);
      toast({
        title: 'Username too short',
        description: 'Username must be at least 3 characters long.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const firstLetter = username[0];
      const usernameRef = ref(realDb, `usernames/${firstLetter}/${username}`);
      const snapshot = await get(usernameRef);

      if (snapshot.exists()) {
        setIsValid(false);
        setUsernameVerified(false);
        toast.error('Username Unavailable', {
          description: 'This username is already taken. Try another.',
          style: {
            backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
            color: 'white',
            borderRadius: '8px',
          },
        });
      } else {
        setIsValid(true);
        setUsernameVerified(true);
        toast.success('Username Verified', {
          description: `"${username}" is available! You can proceed.`,
          style: {
            backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD)',
            color: 'white',
            borderRadius: '8px',
          },
        });
      }
    } catch (err) {
      console.error('Error checking username:', err.message);
      setIsValid(false);
      setUsernameVerified(false);
      toast.error('Error', {
        description: 'An error occurred while checking availability.',
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
          color: 'white',
          borderRadius: '8px',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Input Changes
  const handleChange = (e) => {
    let value = e.target.value.toLowerCase();

    // Remove invalid characters
    if (/[^a-z0-9]/.test(value)) {
      toast.error('Invalid Input', {
        description: 'Only lowercase letters & numbers are allowed!',
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
          color: 'white',
          borderRadius: '8px',
        },
      });
      value = value.replace(/[^a-z0-9]/g, '');
    }

    // Prevent usernames from starting with numbers
    if (/^\d/.test(value)) {
      toast.error('Invalid Input', {
        description: 'Username cannot start with a number!',
        style: {
          backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
          color: 'white',
          borderRadius: '8px',
        },
      });
      value = value.replace(/^\d+/g, '');
    }

    setUsername(value);
    setIsValid(null);
    setUsernameVerified(false); // Reset verification when username changes
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-4 bg-gradient-to-r from-purple-700 to-indigo-500 bg-clip-text text-3xl font-bold text-gray-800 text-transparent">
            Choose Your Username
          </h1>
          <p className="text-sm text-gray-500">
            This will be your unique identity.{' '}
            <span className="font-medium text-amber-600">
              Once set, it cannot be changed.
            </span>
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* USERNAME INPUT WITH ANIMATIONS */}
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
                value={username}
                onChange={handleChange}
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
                  {(isValid === true || usernameVerified) && !loading && (
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center text-xs italic text-gray-500"
          >
            Usernames must be unique, start with a letter, and contain only
            lowercase letters & numbers.
          </motion.p>

          {/* Username strength indicator */}
          {username.length > 0 && !usernameVerified && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      username.length < 3
                        ? '33%'
                        : username.length < 5
                          ? '66%'
                          : '100%',
                    background:
                      username.length < 3
                        ? '#ef4444'
                        : username.length < 5
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
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {!usernameVerified ? (
              <motion.div
                key="verify"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  onClick={checkUsernameAvailability}
                  disabled={loading || username.length < 3}
                  className="w-full rounded-lg bg-gradient-to-r from-purple-600 from-purple-700 to-indigo-600 to-indigo-700 px-6 py-6 text-lg font-medium text-white shadow-lg transition-all duration-300 disabled:opacity-70 disabled:shadow-none"
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
              </motion.div>
            ) : (
              <motion.div
                key="navigation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex gap-3"
              >
                <Button
                  onClick={prevStep}
                  className="flex w-1/2 items-center justify-center gap-2 rounded-lg bg-gray-200 bg-gray-300 px-4 py-5 font-medium text-gray-800 transition-all duration-300"
                >
                  <ArrowLeft size={18} />
                  <span>Back</span>
                </Button>
                <Button
                  onClick={nextStep}
                  className="flex w-1/2 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 from-purple-700 to-indigo-600 to-indigo-700 px-4 py-5 font-medium text-white shadow-lg transition-all duration-300"
                >
                  <span>Continue</span>
                  <ArrowRight size={18} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-10 text-xs text-gray-500"
      >
        Need help? Contact{' '}
        <a
          href="mailto:support@pocketlink.co"
          className="font-medium text-purple-600 transition-colors duration-300 hover:text-purple-800"
        >
          support@pocketlink.co
        </a>
      </motion.footer>
    </main>
  );
}
