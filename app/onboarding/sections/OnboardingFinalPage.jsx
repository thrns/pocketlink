'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  RefreshCw,
  Edit2,
  ArrowLeft,
  CheckCircle,
  User,
  Upload,
  Camera,
} from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/app/contexts/OnboardingContext';
import { avatarFileUpload } from '@/lib/helpers/supabaseStorageHelpers';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';

export default function OnboardingFinalPage({ nextStep }) {
  // =========== HOOKS =========== //
  const { user, setUser } = useAuth();
  const {
    bio: onboardingBio,
    setBio: setOnboardingBio,
    name: onboardingName,
    setName: setOnboardingName,
    topics,
    prevStep,
  } = useOnboarding();
  const router = useRouter();

  // =========== STATES =========== //
  const [bio, setBio] = useState('');
  const [name, setName] = useState(
    onboardingName || user?.displayName || user?.name || ''
  );
  const [isGeneratingQuote, setIsGeneratingQuote] = useState(false);
  const [isEditing, setIsEditing] = useState({
    name: false,
    bio: false,
  });
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSuccessIcon, setShowSuccessIcon] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarURL || null);

  // =========== REFS =========== //
  const nameRef = useRef(null);
  const bioRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
    generateMovieQuote();
  }, []);

  // Initialize bio from onboarding context
  useEffect(() => {
    if (onboardingBio) {
      setBio(onboardingBio);
    } else {
      setBio('');
    }
  }, [onboardingBio]);

  // =========== HANDLE INPUT CHANGE =========== //
  const handleInputChange = (field, value) => {
    const sanitizedValue = value.replace(/<[^>]+>/g, '');

    if (field === 'name') {
      setName(sanitizedValue.slice(0, 35));
      setOnboardingName(sanitizedValue.slice(0, 35)); // Update onboarding name
    } else if (field === 'bio') {
      const newBio = sanitizedValue.slice(0, 300);
      setBio(newBio);
      setOnboardingBio(newBio); // Directly set the bio
    }
  };

  // =========== ENABLE EDITING =========== //
  const enableEditing = (field) => {
    setIsEditing({ ...isEditing, [field]: true });

    setTimeout(() => {
      if (field === 'name' && nameRef.current) {
        nameRef.current.focus();
      } else if (field === 'bio' && bioRef.current) {
        bioRef.current.focus();
      }
    }, 0);
  };

  // =========== HANDLE BLUR  =========== //
  const handleBlur = (field, e) => {
    handleInputChange(field, e.target.innerText.replace(/\n/g, '\n'));
    setIsEditing({ ...isEditing, [field]: false });

    // Show success icon briefly
    setShowSuccessIcon(true);
    setTimeout(() => setShowSuccessIcon(false), 1500);
  };

  // =========== HANDLE MOUSE DOWN =========== //
  const handleMouseDown = (e) => {
    e.stopPropagation();
  };

  // =========== FORMAT TEXT =========== //
  const formatText = (text) => {
    if (!text || text.length === 0) return 'Enter bio...';

    return text
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">$1</a>'
      )
      .replace(/\n/g, '<br>');
  };

  // =========== GENERATE MOVIE QUOTE =========== //
  const generateMovieQuote = async () => {
    try {
      setIsGeneratingQuote(true);

      // Default to placeholder topics if no topics are available
      const userTopics =
        topics.length > 0 ? topics : ['inspiration', 'motivation', 'creative'];

      const response = await fetch('/api/generate-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topics: userTopics }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate quote');
      }

      const data = await response.json();
      const newBio = data.quote;

      setBio(newBio);
      setOnboardingBio(newBio); // Set bio in onboarding context as well
    } catch (error) {
      console.error('Error generating movie quote:', error);
    } finally {
      setIsGeneratingQuote(false);
    }
  };

  // =========== HANDLE FINISH =========== //
  const handleFinish = () => {
    setConfirmationOpen(true);
  };

  const confirmFinish = () => {
    nextStep(); // Go to loading step
    // You could also add any final data submission here
  };

  // =========== HANDLE AVATAR UPLOAD =========== //
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simple validation for image files
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Size validation (max 5MB)
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 5) {
      toast.error('Image is too large. Maximum size is 5MB');
      return;
    }

    // Create a preview
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);

    try {
      setUploading(true);

      // Upload the file using our helper function
      const avatarUrl = await avatarFileUpload(
        user?.username || user?.uuid,
        'avatar',
        file
      );

      if (!avatarUrl) {
        throw new Error('Failed to get uploaded avatar URL');
      }

      // Update local auth context with new avatar URL
      setUser({
        ...user,
        avatarURL: avatarUrl,
      });

      toast.success('Avatar uploaded successfully!');

      // Show success icon briefly
      setShowSuccessIcon(true);
      setTimeout(() => setShowSuccessIcon(false), 1500);
    } catch (error) {
      console.error('Avatar upload error:', error);
      toast.error(
        'Failed to upload avatar: ' + (error.message || 'Unknown error')
      );
      // Reset preview if upload failed
      setAvatarPreview(user?.avatarURL || null);
    } finally {
      setUploading(false);
      // Clean up the preview URL to prevent memory leaks
      URL.revokeObjectURL(previewUrl);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 },
    },
  };

  // =========== JSX =========== //
  return (
    <motion.div
      className="mt-12 flex min-h-screen flex-col items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-purple-700 to-indigo-500 bg-clip-text text-3xl font-bold text-gray-800 text-transparent">
            Complete Your Profile
          </h1>
          <p className="text-gray-600">
            Just a few finishing touches before you're all set
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex w-full flex-col items-center"
        >
          {/* Avatar */}
          <motion.div
            className="relative mb-6 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={handleAvatarClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-white">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-500">
                  <User className="h-16 w-16 text-white" />
                </div>
              )}

              {/* Overlay with camera icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 opacity-100 transition-opacity duration-300">
                {uploading ? (
                  <Loader2 className="h-10 w-10 animate-spin text-white" />
                ) : (
                  <Camera className="h-10 w-10 text-white" />
                )}
              </div>
            </div>

            {/* Upload text below avatar */}
            <div className="mt-2 text-center text-sm font-medium text-purple-600">
              {uploading ? 'Uploading...' : 'Click to upload'}
            </div>
          </motion.div>

          {/* Name (click to edit) */}
          <motion.div variants={itemVariants} className="relative mb-6 w-full">
            <div
              className={`cursor-pointer rounded-lg p-4 transition-all duration-300 ${
                isEditing.name
                  ? 'border-2 border-purple-200 bg-purple-50'
                  : 'border-2 border-transparent bg-gray-50'
              }`}
              onClick={() => enableEditing('name')}
              onMouseDown={handleMouseDown}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">
                  Display Name
                </span>
                {!isEditing.name && (
                  <Edit2 size={14} className="text-gray-400" />
                )}
              </div>

              {isEditing.name ? (
                <div
                  contentEditable
                  ref={nameRef}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleBlur('name', e)}
                  className="w-full bg-transparent text-lg font-semibold outline-none focus:ring-0"
                >
                  {name}
                </div>
              ) : (
                <h2 className="text-lg font-semibold">
                  {name?.length > 0 ? name : 'Enter your name'}
                </h2>
              )}
            </div>

            <AnimatePresence>
              {showSuccessIcon && isEditing.name === false && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute right-4 top-4 text-green-500"
                >
                  <CheckCircle size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Bio with Refresh Button */}
          <motion.div variants={itemVariants} className="relative mb-6 w-full">
            <div
              className={`cursor-pointer rounded-lg p-4 transition-all duration-300 ${
                isEditing.bio
                  ? 'border-2 border-purple-200 bg-purple-50'
                  : 'border-2 border-transparent bg-gray-50'
              }`}
              onClick={() => enableEditing('bio')}
              onMouseDown={handleMouseDown}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Bio</span>
                {!isEditing.bio && (
                  <Edit2 size={14} className="text-gray-400" />
                )}
              </div>

              {isEditing.bio ? (
                <div
                  contentEditable
                  ref={bioRef}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleBlur('bio', e)}
                  className="max-h-[250px] min-h-[120px] w-full overflow-y-auto whitespace-pre-wrap break-words bg-transparent text-gray-600 outline-none focus:ring-0"
                >
                  {bio}
                </div>
              ) : (
                <div
                  className="min-h-[120px] w-full whitespace-pre-wrap break-words text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: formatText(bio),
                  }}
                />
              )}
            </div>

            {/* Generate New Bio Button */}
            <div className="absolute bottom-4 right-4">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={generateMovieQuote}
                disabled={isGeneratingQuote}
                className="rounded-full border border-gray-200 bg-white p-2 text-gray-600 text-purple-600 transition-colors duration-300 focus:outline-none"
              >
                {isGeneratingQuote ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </motion.button>
            </div>

            <AnimatePresence>
              {showSuccessIcon && isEditing.bio === false && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute right-4 top-4 text-green-500"
                >
                  <CheckCircle size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-4 flex w-full gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-1/2"
            >
              <Button
                onClick={prevStep}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-200 bg-gray-300 px-4 py-5 font-medium text-gray-800 transition-all duration-300"
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-1/2"
            >
              <Button
                onClick={handleFinish}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 from-purple-700 to-indigo-600 to-indigo-700 px-4 py-5 font-medium text-white shadow-lg transition-all duration-300"
              >
                <span>Complete Setup</span>
                <CheckCircle size={18} />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {confirmationOpen && (
          <AlertDialog
            open={confirmationOpen}
            onOpenChange={setConfirmationOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Finish onboarding?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your profile will be created with the information you've
                  provided. You can always edit your profile later.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border border-gray-200">
                  Cancel
                </AlertDialogCancel>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertDialogAction
                    onClick={confirmFinish}
                    className="bg-gradient-to-r from-purple-600 from-purple-700 to-indigo-600 to-indigo-700"
                  >
                    Complete Setup
                  </AlertDialogAction>
                </motion.div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
