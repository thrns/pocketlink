'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Plus,
  AlertCircle,
  Search,
} from 'lucide-react';
import { useOnboarding } from '@/app/contexts/OnboardingContext';
import { toast } from 'sonner';
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaTiktok,
  FaGithub,
  FaPinterest,
  FaReddit,
  FaYoutube,
  FaFacebook,
  FaSnapchatGhost,
  FaDiscord,
  FaTwitch,
  FaBehance,
  FaDribbble,
  FaMedium,
} from 'react-icons/fa';

// Supported Social Media Platforms - Enhanced with more options
const socialPlatforms = [
  {
    name: 'Instagram',
    prefix: 'https://instagram.com/',
    icon: <FaInstagram className="text-2xl text-pink-500" />,
    color: 'from-pink-400 to-purple-500',
    lightColor: 'bg-pink-50 border-pink-200',
    placeholder: 'yourusername',
  },
  {
    name: 'Twitter/X',
    prefix: 'https://twitter.com/',
    icon: <FaTwitter className="text-2xl text-blue-400" />,
    color: 'from-blue-400 to-blue-600',
    lightColor: 'bg-blue-50 border-blue-200',
    placeholder: 'yourusername',
  },
  {
    name: 'LinkedIn',
    prefix: 'https://linkedin.com/in/',
    icon: <FaLinkedin className="text-2xl text-blue-600" />,
    color: 'from-blue-500 to-blue-700',
    lightColor: 'bg-blue-50 border-blue-200',
    placeholder: 'yourprofile',
  },
  {
    name: 'TikTok',
    prefix: 'https://www.tiktok.com/@',
    icon: <FaTiktok className="text-2xl text-black" />,
    color: 'from-gray-700 to-gray-900',
    lightColor: 'bg-gray-50 border-gray-200',
    placeholder: 'username',
  },
  {
    name: 'GitHub',
    prefix: 'https://github.com/',
    icon: <FaGithub className="text-2xl text-gray-800" />,
    color: 'from-gray-600 to-gray-800',
    lightColor: 'bg-gray-50 border-gray-200',
    placeholder: 'username',
  },
  {
    name: 'Pinterest',
    prefix: 'https://pinterest.com/',
    icon: <FaPinterest className="text-2xl text-red-500" />,
    color: 'from-red-500 to-red-700',
    lightColor: 'bg-red-50 border-red-200',
    placeholder: 'username',
  },
  {
    name: 'Reddit',
    prefix: 'https://reddit.com/u/',
    icon: <FaReddit className="text-2xl text-orange-500" />,
    color: 'from-orange-400 to-orange-600',
    lightColor: 'bg-orange-50 border-orange-200',
    placeholder: 'username',
  },
  {
    name: 'YouTube',
    prefix: 'https://www.youtube.com/c/',
    icon: <FaYoutube className="text-2xl text-red-600" />,
    color: 'from-red-500 to-red-700',
    lightColor: 'bg-red-50 border-red-200',
    placeholder: 'channel',
  },
  {
    name: 'Facebook',
    prefix: 'https://www.facebook.com/',
    icon: <FaFacebook className="text-2xl text-blue-600" />,
    color: 'from-blue-500 to-blue-700',
    lightColor: 'bg-blue-50 border-blue-200',
    placeholder: 'pagename',
  },
  {
    name: 'Snapchat',
    prefix: 'https://www.snapchat.com/add/',
    icon: <FaSnapchatGhost className="text-2xl text-yellow-500" />,
    color: 'from-yellow-400 to-yellow-600',
    lightColor: 'bg-yellow-50 border-yellow-200',
    placeholder: 'username',
  },
  {
    name: 'Discord',
    prefix: 'https://discord.com/users/',
    icon: <FaDiscord className="text-2xl text-indigo-500" />,
    color: 'from-indigo-400 to-indigo-600',
    lightColor: 'bg-indigo-50 border-indigo-200',
    placeholder: 'user#0000',
  },
  {
    name: 'Twitch',
    prefix: 'https://twitch.tv/',
    icon: <FaTwitch className="text-2xl text-purple-600" />,
    color: 'from-purple-500 to-purple-700',
    lightColor: 'bg-purple-50 border-purple-200',
    placeholder: 'username',
  },
  {
    name: 'Behance',
    prefix: 'https://behance.net/',
    icon: <FaBehance className="text-2xl text-blue-800" />,
    color: 'from-blue-600 to-blue-800',
    lightColor: 'bg-blue-50 border-blue-200',
    placeholder: 'username',
  },
  {
    name: 'Dribbble',
    prefix: 'https://dribbble.com/',
    icon: <FaDribbble className="text-2xl text-pink-600" />,
    color: 'from-pink-500 to-pink-700',
    lightColor: 'bg-pink-50 border-pink-200',
    placeholder: 'username',
  },
  {
    name: 'Medium',
    prefix: 'https://medium.com/@',
    icon: <FaMedium className="text-2xl text-gray-800" />,
    color: 'from-gray-600 to-gray-900',
    lightColor: 'bg-gray-50 border-gray-200',
    placeholder: 'username',
  },
];

export default function OnboardingSocials() {
  const {
    nextStep,
    prevStep,
    socialLinks,
    setSocialLinks,
    selectedLinks,
    setSelectedLinks,
    inputValues,
    setInputValues,
  } = useOnboarding();
  const [isLoaded, setIsLoaded] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedPlatform, setDraggedPlatform] = useState(null);
  const newInputRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Auto-focus on input when a new platform is added
  useEffect(() => {
    if (newInputRef.current) {
      newInputRef.current.focus();
    }
  }, [selectedLinks.length]);

  // Handle input change
  const handleChange = (platform, value) => {
    // Store the input value
    setInputValues((prev) => ({ ...prev, [platform]: value }));

    // Also update the selectedLinks array to include the full URL
    setSelectedLinks((prevLinks) =>
      prevLinks.map((link) => {
        if (link.platform === platform) {
          // Remove @ if user adds it at the beginning
          const cleanUsername = value.startsWith('@')
            ? value.substring(1)
            : value;
          // Update the link with the full URL
          return {
            ...link,
            username: cleanUsername,
            url: platform + cleanUsername,
          };
        }
        return link;
      })
    );
  };

  // Handle adding/removing platforms
  const togglePlatform = (platform) => {
    if (selectedLinks.some((link) => link.platform === platform.prefix)) {
      // Remove platform from selected links
      setSelectedLinks(
        selectedLinks.filter((link) => link.platform !== platform.prefix)
      );
      setInputValues((prev) => {
        const updated = { ...prev };
        delete updated[platform.prefix];
        return updated;
      });
    } else {
      // Check if limit of 5 is exceeded
      if (selectedLinks.length >= 5) {
        toast.error('Maximum Links Reached', {
          description: 'You can only select up to 5 social media links.',
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#E11D48',
            border: '1px solid rgba(225, 29, 72, 0.2)',
            borderRadius: '12px',
          },
          icon: <AlertCircle className="text-red-500" />,
          duration: 3000,
        });
        return;
      }

      // Add platform to selected links with empty username and URL
      setSelectedLinks([
        ...selectedLinks,
        {
          platform: platform.prefix,
          name: platform.name,
          icon: platform.icon,
          color: platform.color,
          lightColor: platform.lightColor,
          placeholder: platform.placeholder,
          username: '', // Initialize with empty username
          url: platform.prefix, // Initialize with just the platform URL prefix
        },
      ]);
    }
  };

  // Handle continue button click
  const handleContinue = () => {
    // Use the selectedLinks that already contain the URLs and usernames
    const verifiedLinks = selectedLinks.map((link) => {
      // Get username from inputValues first, then from link if available
      const username = inputValues[link.platform] || link.username || '';
      // Remove @ if user adds it at the beginning
      const cleanUsername = username.startsWith('@')
        ? username.substring(1)
        : username;

      // Construct the full URL
      const fullUrl = link.platform + cleanUsername;

      return {
        platform: link.platform,
        username: cleanUsername,
        url: fullUrl,
        name: link.name,
        icon: link.icon,
      };
    });

    setSocialLinks(verifiedLinks);

    // Show success toast before proceeding
    toast.success('Social links saved!', {
      description: `${verifiedLinks.length} links added to your profile`,
      style: {
        background: 'rgba(255, 255, 255, 0.95)',
        color: '#10B981',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        borderRadius: '12px',
      },
      duration: 2000,
    });

    setTimeout(() => {
      nextStep();
    }, 600);
  };

  // Check if form has valid input to enable the continue button
  const hasValidInput = () => {
    if (selectedLinks.length === 0) return true;

    // Check both inputValues and the username in selectedLinks
    return !selectedLinks.some(
      (link) =>
        (inputValues[link.platform] &&
          inputValues[link.platform].trim() !== '') ||
        (link.username && link.username.trim() !== '')
    );
  };

  // Filter platforms based on search
  const filteredPlatforms = socialPlatforms.filter(
    (platform) =>
      platform.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedLinks.some((link) => link.platform === platform.prefix)
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
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

  // New list item animation
  const listItemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      x: -100,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.main
      className="mt-12 flex min-h-screen flex-col items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-xl"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className="mb-10 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-purple-700 to-indigo-500 bg-clip-text text-3xl font-bold text-gray-800 text-transparent">
            Connect Your Social Media
          </h1>
          <p className="mb-2 text-gray-600">
            Add up to 5 of your social profiles - we'll create the links for you
          </p>
          <motion.div
            className="mt-2 flex items-center justify-center space-x-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`h-2 w-8 rounded-full ${
                  i < selectedLinks.length
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500'
                    : 'bg-gray-200'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Input Fields for Selected Platforms */}
        <motion.div variants={itemVariants} className="mb-8 space-y-4">
          <AnimatePresence>
            {selectedLinks.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 text-center"
              >
                <div className="mb-3 flex justify-center">
                  {socialPlatforms.slice(0, 5).map((platform, i) => (
                    <motion.div
                      key={i}
                      className="mx-1 opacity-75"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 0.8 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      {platform.icon}
                    </motion.div>
                  ))}
                </div>
                <p className="font-medium text-gray-600">
                  Select your preferred social platforms below
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedLinks.map((link, index) => {
              // Find the matching platform to get details
              const platformInfo = socialPlatforms.find(
                (p) => p.prefix === link.platform
              );

              return (
                <motion.div
                  key={link.platform}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="w-full"
                  drag={false}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragStart={() => setDraggedPlatform(link.platform)}
                  onDragEnd={() => setDraggedPlatform(null)}
                >
                  <motion.div
                    animate={{
                      scale: focusedInput === link.platform ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`flex w-full items-center justify-between rounded-xl border-2 p-4 ${link.lightColor} relative overflow-hidden`}
                  >
                    {/* Platform Icon */}
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white">
                      {link.icon}
                    </div>

                    {/* Input Field */}
                    <div className="relative mx-3 flex-1">
                      <div className="flex items-center">
                        <div className="mr-1 flex items-center text-sm font-medium text-gray-500">
                          <span className="hidden sm:inline">
                            {
                              link.platform
                                .replace('https://', '')
                                .split('.com')[0]
                            }
                          </span>
                          <span className="sm:hidden">
                            {platformInfo?.name || 'Social'}
                          </span>
                          <span>.com/</span>
                        </div>
                        <Input
                          type="text"
                          ref={
                            index === selectedLinks.length - 1
                              ? newInputRef
                              : null
                          }
                          value={
                            inputValues[link.platform] || link.username || ''
                          }
                          onChange={(e) =>
                            handleChange(link.platform, e.target.value)
                          }
                          onFocus={() => setFocusedInput(link.platform)}
                          onBlur={() => setFocusedInput(null)}
                          placeholder={link.placeholder || 'username'}
                          className="w-full border-0 bg-transparent p-2 focus:outline-none focus:ring-0"
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <AnimatePresence>
                        {inputValues[link.platform] && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="text-green-500"
                          >
                            <CheckCircle size={20} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          togglePlatform({
                            prefix: link.platform,
                            name: link.name,
                          })
                        }
                        className="p-2 text-red-500 text-red-700 transition-colors duration-200"
                        aria-label="Remove platform"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>

                    {/* Animated Background Gradient on Focus */}
                    {focusedInput === link.platform && (
                      <motion.div
                        className={`absolute inset-0 -z-10 bg-gradient-to-r ${link.color} opacity-5`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.05 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Message when max reached */}
        <AnimatePresence>
          {selectedLinks.length >= 5 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <div className="flex items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-600">
                <AlertCircle size={16} />
                <p>
                  Maximum of 5 social links reached. Remove one to add another.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search and Platform Selection */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">
              {selectedLinks.length < 5
                ? 'Add your platforms:'
                : 'Maximum platforms reached:'}
            </h3>

            {/* Platform Counter */}
            <span className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-500">
              {selectedLinks.length}/5 selected
            </span>
          </div>

          {/* Search Input */}
          {selectedLinks.length < 5 && (
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder="Search for platforms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                size={16}
              />
            </div>
          )}

          {/* Platform Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {filteredPlatforms.map((platform) => (
              <motion.button
                key={platform.name}
                onClick={() => togglePlatform(platform)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`flex w-full items-center justify-start gap-2 rounded-lg border p-3 transition-all duration-300 ${
                  selectedLinks.length >= 5
                    ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                    : `bg-gradient-to-r ${platform.color} text-white`
                }`}
                disabled={selectedLinks.length >= 5}
              >
                <div className="flex-shrink-0">{platform.icon}</div>
                <span className="flex items-center gap-1 truncate text-sm font-medium">
                  <Plus size={14} /> {platform.name}
                </span>
              </motion.button>
            ))}

            {/* No Results Message */}
            {filteredPlatforms.length === 0 && searchTerm !== '' && (
              <div className="col-span-3 py-6 text-center text-gray-500">
                No platforms found matching "{searchTerm}"
              </div>
            )}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div variants={itemVariants} className="flex w-full gap-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-1/2"
          >
            <Button
              onClick={prevStep}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-100 bg-gray-200 px-4 py-5 font-medium text-gray-800 transition-all duration-300"
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
              onClick={handleContinue}
              disabled={hasValidInput()}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 from-purple-700 to-indigo-600 to-indigo-700 px-4 py-5 font-medium text-white transition-all duration-300 disabled:opacity-70"
            >
              <span>Continue</span>
              <ArrowRight size={18} />
            </Button>
          </motion.div>
        </motion.div>

        <motion.button
          variants={itemVariants}
          onClick={nextStep}
          className="group mx-auto mt-6 block text-sm text-gray-500 text-gray-700 underline transition-colors duration-300"
        >
          Skip this step
          <span className="group-translate-x-1 ml-1 inline-block transition-transform">
            →
          </span>
        </motion.button>
      </motion.div>
    </motion.main>
  );
}
