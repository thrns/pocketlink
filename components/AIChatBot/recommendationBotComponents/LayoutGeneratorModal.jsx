'use client';

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  X,
  Loader2,
  Check,
  LayoutTemplate,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { layoutPromptRecommendations } from './generatorPromptRecommendations';

// Import Shadcn UI components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

// Enhanced Modal component with Shadcn UI while maintaining original design
const LayoutGeneratorModal = forwardRef(
  (
    {
      onGenerate,
      isOpen,
      onClose,
      isGenerating = false,
      generationResult = null,
    },
    ref
  ) => {
    const [userPrompt, setUserPrompt] = useState('');
    const [numberOfCards, setNumberOfCards] = useState(10);
    const [generationMode, setGenerationMode] = useState('fresh');
    const [currentThinkingStep, setCurrentThinkingStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [modalView, setModalView] = useState('form'); // 'form', 'generating', 'results'
    const [activeCategory, setActiveCategory] = useState('Business'); // Default active category
    const [hasError, setHasError] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const promptInputRef = useRef(null);
    const categoriesContainerRef = useRef(null);

    // Animation variants for consistent animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          staggerChildren: 0.1,
          duration: 0.3,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          when: 'afterChildren',
          staggerChildren: 0.05,
          staggerDirection: -1,
          duration: 0.2,
        },
      },
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 300, damping: 24 },
      },
      exit: { y: -10, opacity: 0, transition: { duration: 0.2 } },
    };

    // Reset modal state when closed
    useEffect(() => {
      if (!isOpen) {
        // Reset state after a short delay to allow closing animation
        const timer = setTimeout(() => {
          if (!isOpen) {
            setModalView('form');
            setProgress(0);
            setHasError(false);
          }
        }, 300);
        return () => clearTimeout(timer);
      } else if (isOpen && modalView === 'form') {
        // Focus on prompt input when modal opens
        setTimeout(() => {
          if (promptInputRef.current) {
            promptInputRef.current.focus();
          }
        }, 100);
      }
    }, [isOpen, modalView]);

    // Switch to generating view when generation starts
    useEffect(() => {
      if (isGenerating && modalView !== 'generating') {
        setModalView('generating');
        setProgress(0);
        setHasError(false);
      } else if (
        !isGenerating &&
        generationResult &&
        modalView === 'generating'
      ) {
        // Force progress to complete before showing results
        setProgress(100);

        // Short delay to allow progress animation to finish
        const timer = setTimeout(() => {
          setModalView('results');
        }, 500);

        return () => clearTimeout(timer);
      } else if (!isGenerating && !generationResult && hasError) {
        // Handle error state - reset to form view
        setModalView('form');
      }
    }, [isGenerating, generationResult, modalView, hasError]);

    // Force progress to complete when generation is done
    useEffect(() => {
      if (!isGenerating && modalView === 'generating' && progress < 100) {
        // Quickly finish the progress animation
        const timer = setTimeout(() => {
          setProgress(100);
        }, 100);

        return () => clearTimeout(timer);
      }
    }, [isGenerating, modalView, progress]);

    // Handle animation for the thinking steps during generation
    useEffect(() => {
      if (modalView === 'generating') {
        const currentModeSteps = getThinkingStepsForMode(generationMode);

        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            const newProgress = Math.min(prev + 1, 100);
            return newProgress;
          });
        }, 80); // Slightly faster progress for better UX

        const thinkingInterval = setInterval(() => {
          setCurrentThinkingStep(
            (prev) => (prev + 1) % currentModeSteps.length
          );
        }, 2500); // Slightly longer to give users time to read

        return () => {
          clearInterval(progressInterval);
          clearInterval(thinkingInterval);
        };
      }
    }, [modalView, generationMode]);

    // Add mode-specific thinking steps
    const getThinkingStepsForMode = (mode) => {
      const baseSteps = [
        'Analyzing requirements...',
        'Exploring design patterns...',
        'Optimizing component hierarchy...',
        'Finalizing color schemes...',
        'Applying responsive guidelines...',
        'Refining visual hierarchy...',
        'Polishing interactions...',
        'Performing quality checks...',
        'Preparing final output...',
      ];

      // Add mode-specific steps
      if (mode === 'fresh') {
        return [
          'Analyzing requirements...',
          'Creating new layout structure...',
          'Generating fresh component arrangement...',
          ...baseSteps.slice(2),
        ];
      } else if (mode === 'retain') {
        return [
          'Analyzing requirements...',
          'Evaluating existing cards...',
          'Identifying areas for additions...',
          'Preserving existing card positioning...',
          'Generating complementary components...',
          ...baseSteps.slice(4),
        ];
      } else if (mode === 'update') {
        return [
          'Analyzing requirements...',
          'Evaluating current layout structure...',
          'Identifying enhancement opportunities...',
          'Creatively updating existing components...',
          'Ensuring design consistency...',
          ...baseSteps.slice(4),
        ];
      }

      return baseSteps;
    };

    // Format recommendation reason text with enhanced UI
    const formatRecommendationReason = (reason) => {
      if (!reason) return null;

      // Split by potential sections (looking for score patterns like (20/25))
      const sections = reason.split(/(?=- )/);

      return sections.map((section, index) => {
        if (
          section.includes('(') &&
          section.includes('/') &&
          section.includes(')')
        ) {
          // This is a scoring section
          const scoreMatch = section.match(/\((\d+)\/(\d+)\)/);
          const sectionText = section.replace(/\((\d+)\/(\d+)\)/, '').trim();

          if (scoreMatch) {
            const score = parseInt(scoreMatch[1]);
            const total = parseInt(scoreMatch[2]);
            const percentage = (score / total) * 100;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="mb-4 last:mb-0"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    {percentage >= 80 ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                        <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                      </div>
                    ) : percentage >= 60 ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
                        <Check className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                      </div>
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/40">
                        <Sparkles className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <p className="mb-1 font-medium text-gray-800 dark:text-gray-200">
                        {sectionText.replace(/^- /, '').split(':')[0]}
                      </p>
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                        {score}/{total}
                      </span>
                    </div>
                    <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                      {sectionText.split(':').slice(1).join(':').trim()}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{
                            duration: 0.8,
                            ease: 'easeOut',
                            delay: index * 0.1,
                          }}
                          className={`h-full rounded-full ${
                            percentage >= 80
                              ? 'bg-green-500 dark:bg-green-400'
                              : percentage >= 60
                                ? 'bg-blue-500 dark:bg-blue-400'
                                : 'bg-yellow-500 dark:bg-yellow-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }
        }

        // Regular text section with animation
        return (
          <motion.p
            key={index}
            variants={itemVariants}
            className="mb-3 text-gray-600 dark:text-gray-300"
          >
            {section}
          </motion.p>
        );
      });
    };

    // Copy to clipboard function
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    };

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      openModal: () => {
        setModalView('form');
        setHasError(false);
      },
      closeModal: () => {
        onClose?.();
      },
      setError: () => {
        setHasError(true);
        setModalView('form');
      },
    }));

    const handleGenerate = () => {
      // Call the onGenerate callback if provided
      if (onGenerate) {
        try {
          onGenerate({
            userPrompt: userPrompt,
            cardCount: numberOfCards,
            generationMode: generationMode,
          });
        } catch (error) {
          console.error('Error in generation:', error);
          setHasError(true);
          setModalView('form');

          if (typeof window !== 'undefined' && window.toast) {
            window.toast.error('Generation Failed', {
              description: 'Could not generate layout. Please try again.',
            });
          }
        }
      }

      // The view will be switched to generating in the useEffect
    };

    const handleRestartGeneration = () => {
      // Reset to the form view
      setModalView('form');
      setHasError(false);
    };

    // Get the color based on rating score
    const getColorForRating = (rating) => {
      if (rating >= 80) return 'text-green-500 dark:text-green-400';
      if (rating >= 60) return 'text-blue-500 dark:text-blue-400';
      if (rating >= 40) return 'text-yellow-500 dark:text-yellow-400';
      return 'text-red-500 dark:text-red-400';
    };

    // Get the background color based on rating score
    const getBgColorForRating = (rating) => {
      if (rating >= 80) return 'bg-green-500 dark:bg-green-400';
      if (rating >= 60) return 'bg-blue-500 dark:bg-blue-400';
      if (rating >= 40) return 'bg-yellow-500 dark:bg-yellow-400';
      return 'bg-red-500 dark:bg-red-400';
    };

    // Render the form view with original styling
    const renderFormView = () => (
      <motion.div
        className="max-h-[500px] max-w-5xl overflow-y-auto p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Enhanced Header with Accent Background */}
        <motion.div
          variants={itemVariants}
          className="mb-6 flex items-center justify-between rounded-lg border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 dark:border-indigo-800/30 dark:from-indigo-900/30 dark:to-purple-900/30"
        >
          <h3 className="flex items-center gap-2 text-xl font-semibold text-indigo-700 dark:text-indigo-300">
            <div className="rounded-lg bg-indigo-600 p-2 dark:bg-indigo-500">
              <LayoutTemplate size={20} className="text-white" />
            </div>
            Generate Full Layout
          </h3>
        </motion.div>

        {/* Enhanced Prompt Input with Character Count and Template Chips */}
        <motion.div variants={itemVariants} className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
              Describe what kind of layout you want
            </label>
          </div>

          <div className="relative">
            <textarea
              ref={promptInputRef}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 pr-10 transition-all focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400"
              rows={3}
              placeholder="e.g., A clean professional portfolio layout for a photographer with a dark theme"
            />
          </div>
        </motion.div>

        {/* Layout Prompt Recommendations */}
        <motion.div variants={itemVariants} className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
              Layout Recommendations
            </label>
            <button
              onClick={() => {
                if (categoriesContainerRef.current) {
                  categoriesContainerRef.current.scrollLeft += 200;
                }
              }}
              className="rounded-full bg-gray-100 bg-gray-200 p-1 text-xs dark:bg-gray-600 dark:bg-gray-700"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Categories Tabs */}
          <div
            ref={categoriesContainerRef}
            className="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent mb-2 flex overflow-x-auto pb-2"
          >
            {layoutPromptRecommendations.map((category) => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={`mr-2 flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category.category
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                    : 'bg-gray-100 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>

          {/* Prompt Chips for Selected Category */}
          <div className="grid grid-cols-2 gap-2">
            {layoutPromptRecommendations
              .find((cat) => cat.category === activeCategory)
              ?.prompts.map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => setUserPrompt(prompt.prompt)}
                  className="rounded-lg border border-gray-200 bg-gray-50 bg-white p-3 text-left transition-all dark:border-gray-700 dark:bg-gray-700 dark:bg-gray-800"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-lg">{prompt.icon}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {prompt.label}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                    {prompt.description}
                  </p>
                </button>
              ))}
          </div>
        </motion.div>

        {/* Enhanced Cards Number Selection with Visual Indicator */}
        <motion.div
          variants={itemVariants}
          className="mb-5 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
              Number of cards to generate:
            </p>
            <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xl font-semibold text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400">
              {numberOfCards}
            </span>
          </div>

          <div className="relative pt-1">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{
                  width: `${((numberOfCards - 5) / 45) * 100}%`,
                }}
              ></div>
            </div>

            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                5
              </span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                50+
              </span>
            </div>

            <input
              type="range"
              min="5"
              max="50"
              value={numberOfCards}
              onChange={(e) => setNumberOfCards(parseInt(e.target.value))}
              className="absolute inset-0 h-2 w-full cursor-pointer opacity-0"
            />
          </div>

          <div className="mt-3 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Fewer, larger cards</span>
            <span>More, smaller cards</span>
          </div>
        </motion.div>

        {/* Enhanced Mode Selection with Icons and Better Visual Hierarchy */}
        <motion.div variants={itemVariants} className="mb-6">
          <p className="mb-3 block text-sm font-medium text-gray-800 dark:text-gray-200">
            Layout Generation Mode:
          </p>
          <div className="grid grid-cols-1 gap-3">
            {[
              {
                id: 'fresh',
                title: 'Start Fresh',
                description:
                  'Generate a completely new layout (replaces existing cards)',
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M8 16H3v5" />
                  </svg>
                ),
              },
              {
                id: 'retain',
                title: 'Retain Cards',
                description:
                  'Keep your existing cards and add new ones to complement them',
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 12h6" />
                    <path d="M9 16h6" />
                    <path d="M12 8v8" />
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                  </svg>
                ),
              },
              {
                id: 'update',
                title: 'Creative Update',
                description:
                  'Creatively modify your existing layout while preserving its essence',
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                    <path d="M12 3v12" />
                  </svg>
                ),
              },
            ].map((mode) => (
              <label
                key={mode.id}
                className={`flex cursor-pointer items-center rounded-lg border-2 p-4 transition-all ${
                  generationMode === mode.id
                    ? 'border-indigo-300 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-900/20'
                    : 'border-gray-200 border-indigo-200 bg-white dark:border-gray-700 dark:border-indigo-800/50 dark:bg-gray-800'
                }`}
              >
                <div className="flex-shrink-0">
                  <input
                    type="radio"
                    value={mode.id}
                    checked={generationMode === mode.id}
                    onChange={() => setGenerationMode(mode.id)}
                    className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 dark:text-indigo-400 dark:focus:ring-indigo-400"
                  />
                </div>
                <div className="ml-3 flex flex-1 items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      {mode.icon}
                      <span className="ml-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                        {mode.title}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {mode.description}
                    </p>
                  </div>
                  {generationMode === mode.id && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-indigo-600 dark:text-indigo-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Footer with Updated Button Design */}
        <motion.div
          variants={itemVariants}
          className="mt-2 flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700"
        >
          <button
            onClick={onClose}
            disabled={isGenerating}
            className={`rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 font-medium text-gray-700 transition-all dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 ${
              isGenerating ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={!userPrompt.trim() || isGenerating}
            className={`flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 font-medium text-white shadow-lg transition-all ${
              !userPrompt.trim() || isGenerating
                ? 'cursor-not-allowed opacity-50'
                : ''
            }`}
          >
            <LayoutTemplate size={18} />
            Generate Layout
          </motion.button>
        </motion.div>
      </motion.div>
    );

    // Render the generating view with original styling
    const renderGeneratingView = () => (
      <motion.div
        className="p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Generating Your Layout
          </h2>
          <p className="mx-auto max-w-lg text-gray-600 dark:text-gray-400">
            Creating a custom layout with {numberOfCards} cards in{' '}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {generationMode}
            </span>{' '}
            mode
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative mx-auto mb-8 h-48 w-48"
        >
          {/* Outer rotating circle */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-900"
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Middle pulsing circle */}
          <motion.div
            className="absolute inset-4 rounded-full border-4 border-purple-300 dark:border-purple-800"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Animated dots with trails */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: -360 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <React.Fragment key={i}>
                <motion.div
                  className="absolute h-3 w-3 rounded-full bg-indigo-600 dark:bg-indigo-500"
                  style={{
                    top: `${50 + 40 * Math.sin((i * Math.PI) / 3)}%`,
                    left: `${50 + 40 * Math.cos((i * Math.PI) / 3)}%`,
                  }}
                  animate={{
                    opacity: [0.7 + (i % 3) * 0.1, 1, 0.7 + (i % 3) * 0.1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                />
                {/* Add trailing effect */}
                <motion.div
                  className="absolute h-2 w-2 rounded-full bg-indigo-400 opacity-30 dark:bg-indigo-600"
                  style={{
                    top: `${50 + 40 * Math.sin((i * Math.PI) / 3 - 0.1)}%`,
                    left: `${50 + 40 * Math.cos((i * Math.PI) / 3 - 0.1)}%`,
                  }}
                />
                <motion.div
                  className="absolute h-1.5 w-1.5 rounded-full bg-indigo-300 opacity-20 dark:bg-indigo-700"
                  style={{
                    top: `${50 + 40 * Math.sin((i * Math.PI) / 3 - 0.2)}%`,
                    left: `${50 + 40 * Math.cos((i * Math.PI) / 3 - 0.2)}%`,
                  }}
                />
              </React.Fragment>
            ))}
          </motion.div>

          {/* Center elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Background glow effect */}
            <motion.div
              className="absolute h-16 w-16 rounded-full bg-indigo-500 opacity-20 blur-xl dark:bg-indigo-600"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <Loader2 className="relative z-10 h-10 w-10 animate-spin text-indigo-600 dark:text-indigo-400" />
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mb-8 h-6 text-center text-lg text-gray-600 dark:text-gray-400"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {getThinkingStepsForMode(generationMode)[currentThinkingStep]}
        </motion.p>

        {/* Enhanced Progress bar with stages */}
        <motion.div variants={itemVariants} className="mx-auto mb-6 max-w-md">
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 dark:from-indigo-600 dark:via-purple-600 dark:to-indigo-700"
              style={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>

          <div className="mt-3 flex justify-between text-xs font-medium">
            <motion.div
              className={`flex flex-col items-center ${
                progress >= 0
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
              animate={{
                scale: progress < 25 && progress > 0 ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 1,
                repeat: progress < 25 && progress > 0 ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              <div
                className={`mb-1 h-3 w-3 rounded-full ${
                  progress > 0
                    ? 'bg-indigo-600 dark:bg-indigo-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              ></div>
              <span>Planning</span>
            </motion.div>

            <motion.div
              className={`flex flex-col items-center ${
                progress >= 25
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
              animate={{
                scale: progress >= 25 && progress < 50 ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 1,
                repeat: progress >= 25 && progress < 50 ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              <div
                className={`mb-1 h-3 w-3 rounded-full ${
                  progress >= 25
                    ? 'bg-indigo-600 dark:bg-indigo-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              ></div>
              <span>Creating</span>
            </motion.div>

            <motion.div
              className={`flex flex-col items-center ${
                progress >= 50
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
              animate={{
                scale: progress >= 50 && progress < 75 ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 1,
                repeat: progress >= 50 && progress < 75 ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              <div
                className={`mb-1 h-3 w-3 rounded-full ${
                  progress >= 50
                    ? 'bg-indigo-600 dark:bg-indigo-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              ></div>
              <span>Optimizing</span>
            </motion.div>

            <motion.div
              className={`flex flex-col items-center ${
                progress >= 75
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
              animate={{ scale: progress >= 75 ? [1, 1.05, 1] : 1 }}
              transition={{
                duration: 1,
                repeat: progress >= 75 ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              <div
                className={`mb-1 h-3 w-3 rounded-full ${
                  progress >= 75
                    ? 'bg-indigo-600 dark:bg-indigo-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              ></div>
              <span>Finalizing</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mx-auto max-w-md rounded-lg bg-gray-50 px-6 py-4 text-center text-sm text-gray-500 dark:bg-gray-800/50 dark:text-gray-400"
        >
          <p>
            {progress < 25
              ? 'Analyzing your requirements and planning the optimal layout structure...'
              : progress < 50
                ? 'Creating component hierarchy and establishing visual relationships...'
                : progress < 75
                  ? 'Optimizing for responsiveness and applying design principles...'
                  : 'Finalizing and preparing your custom layout for presentation...'}
          </p>
        </motion.div>
      </motion.div>
    );

    // Render the results view with original styling
    const renderResultsView = () => {
      if (!generationResult) return null;

      return (
        <motion.div
          className="max-h-[500px] max-w-5xl overflow-y-auto p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={itemVariants}
            className="z-10 flex items-center justify-between border-b border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRestartGeneration}
                className="rounded-full bg-gray-100 bg-gray-200 p-2 text-gray-600 transition-colors dark:bg-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                <ArrowLeft size={18} />
              </motion.button>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Layout Generation Results
              </h2>
            </div>
          </motion.div>

          {/* Scrollable Content Area */}
          <ScrollArea className="h-[350px] pr-4">
            <div className="space-y-6 p-6">
              {/* Quality Score with Enhanced Presentation */}
              {generationResult.rating && (
                <motion.div
                  variants={itemVariants}
                  className="dark:to-gray-750 flex items-center justify-between rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-5 dark:border-gray-700 dark:from-gray-800"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        QUALITY SCORE
                      </h3>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div
                        className={`text-4xl font-bold ${getColorForRating(
                          generationResult.rating
                        )}`}
                      >
                        {generationResult.rating}
                      </div>
                      <div className="flex flex-col">
                        {generationResult.rating > 90 && (
                          <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            <Check size={12} />
                            Optimal
                          </div>
                        )}
                        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {generationResult.rating >= 80
                            ? 'Excellent'
                            : generationResult.rating >= 60
                              ? 'Good'
                              : generationResult.rating >= 40
                                ? 'Adequate'
                                : 'Needs Improvement'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-20 w-20">
                    <svg viewBox="0 0 36 36" className="h-full w-full">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                        className="dark:stroke-gray-700"
                      />
                      <motion.path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={
                          generationResult.rating >= 80
                            ? '#22C55E'
                            : generationResult.rating >= 60
                              ? '#3B82F6'
                              : generationResult.rating >= 40
                                ? '#EAB308'
                                : '#EF4444'
                        }
                        strokeWidth="3"
                        initial={{ strokeDasharray: '0, 100' }}
                        animate={{
                          strokeDasharray: `${generationResult.rating}, 100`,
                        }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="stroke-current"
                      />
                    </svg>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.5,
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Check
                        className={`h-8 w-8 ${getColorForRating(
                          generationResult.rating
                        )}`}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Generation Summary with Enhanced Design */}
              <motion.div
                variants={itemVariants}
                className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800/80"
              >
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                  <LayoutTemplate
                    className="text-indigo-500 dark:text-indigo-400"
                    size={18}
                  />
                  Generation Summary
                </h3>
                <div className="mb-5 grid grid-cols-3 gap-4">
                  <motion.div
                    className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50"
                    whileHover={{
                      y: -2,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                  >
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      MODE
                    </p>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          generationMode === 'fresh'
                            ? 'bg-green-500'
                            : generationMode === 'retain'
                              ? 'bg-blue-500'
                              : 'bg-purple-500'
                        }`}
                      ></div>
                      <p className="text-sm font-medium capitalize text-gray-900 dark:text-gray-100">
                        {generationMode}
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50"
                    whileHover={{
                      y: -2,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                  >
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      CARDS
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {generationResult.items?.length || 0}
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50"
                    whileHover={{
                      y: -2,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                  >
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      MOBILE CARDS
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {generationResult.mobileItems?.length || 0}
                      </p>
                    </div>
                  </motion.div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Layout generated based on your description:
                  </p>
                  <motion.div
                    className="rounded-lg border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-800/30 dark:bg-indigo-900/20"
                    whileHover={{ x: 5 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    }}
                  >
                    <p className="text-sm italic leading-relaxed text-indigo-700 dark:text-indigo-300">
                      "{userPrompt}"
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Layout Plan with Code Highlighting and Expandable View */}
              {generationResult.layoutPlan && (
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="4 17 10 11 4 5"></polyline>
                        <line x1="12" y1="19" x2="20" y2="19"></line>
                      </svg>
                      Layout Plan
                    </h3>
                    <button
                      className="flex items-center gap-1 rounded-full bg-gray-100 bg-gray-200 px-3 py-1 text-xs text-gray-600 transition-colors dark:bg-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      onClick={() =>
                        copyToClipboard(generationResult.layoutPlan)
                      }
                    >
                      {copySuccess ? (
                        <>
                          <Check size={12} />
                          Copied
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="9"
                              y="9"
                              width="13"
                              height="13"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <motion.div
                    className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
                    whileHover={{
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                  >
                    <ScrollArea className="max-h-64 pr-2">
                      <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-300">
                        {generationResult.layoutPlan}
                      </pre>
                    </ScrollArea>
                  </motion.div>
                </motion.div>
              )}

              {/* Design Reasoning with Enhanced Scoring UI */}
              {generationResult.reason && (
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                    <Sparkles
                      size={18}
                      className="text-indigo-500 dark:text-indigo-400"
                    />
                    Design Reasoning
                  </h3>
                  <motion.div
                    className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
                    variants={containerVariants}
                  >
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {formatRecommendationReason(generationResult.reason)}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Action buttons */}
              <motion.div
                variants={itemVariants}
                className="mt-6 flex justify-end gap-3 pt-4"
              >
                <button
                  onClick={handleRestartGeneration}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 font-medium text-gray-700 transition-all dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  <RefreshCw size={16} />
                  Regenerate
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 font-medium text-white shadow-lg transition-all">
                  Apply Layout
                </button>
              </motion.div>
            </div>
          </ScrollArea>
        </motion.div>
      );
    };

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="max-w-2xl p-0"
          onInteractOutside={(e) => {
            // Prevent closing during generation
            if (isGenerating) {
              e.preventDefault();
            }
          }}
          onEscapeKeyDown={(e) => {
            // Prevent closing during generation
            if (isGenerating) {
              e.preventDefault();
            }
          }}
        >
          {modalView === 'form' && renderFormView()}
          {modalView === 'generating' && renderGeneratingView()}
          {modalView === 'results' && renderResultsView()}
        </DialogContent>
      </Dialog>
    );
  }
);

// Add a display name for the component
LayoutGeneratorModal.displayName = 'LayoutGeneratorModal';

export default LayoutGeneratorModal;
