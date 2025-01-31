'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Wand2,
  LayoutTemplate,
  X,
  Info,
  CheckCircle2,
  BarChart2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useItems } from '@/app/contexts/ItemsContext';
import { useFetch } from '@/app/contexts/FetcherContext';
import generateFullLayout from '@/lib/utils/generateFullLayout';
import optimizeLayout from '@/lib/utils/optimizeLayout';
import LayoutGeneratorModal from './recommendationBotComponents/LayoutGeneratorModal';
import LayoutOptimizer from './recommendationBotComponents/LayoutOptimizer';
import { toast } from 'sonner';

const LayoutManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [generationStep, setGenerationStep] = useState('idle'); // idle, planning, generating, complete
  const [generationMode, setGenerationMode] = useState('fresh'); // fresh, retain, update
  const [generationResult, setGenerationResult] = useState(null); // Store generation result for the modal
  const [optimizationDetails, setOptimizationDetails] = useState(null);
  const [optimizationFeedback, setOptimizationFeedback] = useState(null);
  const [showOptimizeModal, setShowOptimizeModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [isApiRunning, setIsApiRunning] = useState(false);

  const {
    items,
    mobileItems,
    setItems,
    themeData,
    setMobileItems,
    theme,
    setThemeData,
    profile,
  } = useFetch();

  // Add useRef for the modals and button container
  const layoutGeneratorRef = useRef(null);
  const layoutOptimizerRef = useRef(null);
  const floatingButtonRef = useRef(null);
  const actionsContainerRef = useRef(null);

  // Show tooltip randomly
  useEffect(() => {
    const showTooltipRandomly = () => {
      if (!isOpen) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 5000);
      }
    };

    const randomDelay = Math.floor(Math.random() * 60000) + 30000;
    const timeoutId = setTimeout(showTooltipRandomly, randomDelay);

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  // Handle clicks outside of the buttons to close the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the floating menu when clicking outside
      if (
        isOpen &&
        floatingButtonRef.current &&
        actionsContainerRef.current &&
        !floatingButtonRef.current.contains(event.target) &&
        !actionsContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // Add the event listener when menu is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle modal state changes to ensure only one modal is open at a time
  useEffect(() => {
    if (showGenerateModal && showOptimizeModal) {
      // If somehow both modals are open, close the optimizer
      setShowOptimizeModal(false);
    }
  }, [showGenerateModal, showOptimizeModal]);

  const handleGenerateFullLayout = () => {
    // Don't open if API is running or optimize modal is open
    if (isApiRunning || showOptimizeModal) {
      if (showOptimizeModal) {
        // Show notification that another modal is open
        if (typeof window !== 'undefined' && window.toast) {
          window.toast.error('Action Blocked', {
            description: 'Please close the Layout Optimizer first.',
          });
        }
      }
      return;
    }

    // Close optimize modal if open
    setShowOptimizeModal(false);
    setShowGenerateModal(true);

    // Use the exposed openModal method from the ref
    if (layoutGeneratorRef.current) {
      layoutGeneratorRef.current.openModal();
    }
  };

  const handleOptimizeLayout = () => {
    // Don't open if API is running or generate modal is open
    if (isApiRunning || showGenerateModal) {
      if (showGenerateModal) {
        // Show notification that another modal is open
        if (typeof window !== 'undefined' && window.toast) {
          window.toast.error('Action Blocked', {
            description: 'Please close the Layout Generator first.',
          });
        }
      }
      return;
    }

    // Close generate modal if open
    setShowGenerateModal(false);
    setShowOptimizeModal(true);
  };

  const handleSubmitLayoutDescription = async ({
    userPrompt,
    cardCount,
    generationMode,
  }) => {
    // Don't run if another API call is in progress
    if (isApiRunning) {
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.error('Process Blocked', {
          description: 'Another operation is in progress. Please wait.',
        });
      }
      return;
    }

    try {
      setIsLoading(true);
      setIsApiRunning(true);
      setGenerationResult(null);
      setGenerationStep('planning');

      // Use the utility function with userPrompt parameter and cardCount
      const result = await generateFullLayout({
        userPrompt: userPrompt,
        profileDetails: profile,
        themeData: themeData,
        items: items,
        mobileItems: mobileItems,
        cardCount: cardCount,
        generationMode: generationMode, // Pass the generation mode
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to generate layout');
      }

      setGenerationStep('generating');

      // Small delay to show the generating step
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update items with the generated layout
      if (result.items && Array.isArray(result.items)) {
        setItems(result.items);
      }

      if (result.mobileItems && Array.isArray(result.mobileItems)) {
        setMobileItems(result.mobileItems);
      }

      // Apply theme if provided in the result
      if (result.theme) {
        setThemeData(result.theme);
      }

      // Update generation result for the modal
      const updatedDetails = {
        rating: result.rating,
        reason:
          result.reason || 'Full layout generated based on your description.',
        layoutPlan: result.layoutPlan,
        items: result.items,
        mobileItems: result.mobileItems,
        theme: result.theme,
      };

      setGenerationResult(updatedDetails); // Set the result for the modal

      // Set generation step to complete
      setGenerationStep('complete');

      // Set isLoading to false IMMEDIATELY after receiving and processing the response
      setIsLoading(false);

      // Reset input fields and close the dropdown
      setIsOpen(false);

      // Show success notification
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.success('Layout Generated', {
          description: 'Your new layout has been generated successfully.',
          style: {
            backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD)',
            color: 'white',
            borderRadius: '8px',
          },
        });
      }
    } catch (error) {
      console.error('Error generating full layout:', error);
      setGenerationStep('idle');
      setIsLoading(false); // Make sure to reset loading state on error too
      setShowGenerateModal(false);

      // Reset state
      if (layoutGeneratorRef.current) {
        layoutGeneratorRef.current.closeModal();
      }

      // Show error notification
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.error('Generation Failed', {
          description: 'Could not generate layout. Please try again.',
          style: {
            backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
            color: 'white',
            borderRadius: '8px',
          },
        });
      }
    } finally {
      setGenerationStep('idle');
      setIsApiRunning(false);
    }
  };

  const handleOptimizationSubmit = async ({ execute, feedback }) => {
    // Don't run if another API call is in progress
    if (isApiRunning) {
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.error('Process Blocked', {
          description: 'Another operation is in progress. Please wait.',
        });
      }
      return;
    }

    try {
      setIsLoading(true);
      setIsApiRunning(true);

      const response = await optimizeLayout({
        profileDetails: profile,
        items,
        mobileItems,
        theme: themeData,
        execute,
        feedback,
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to optimize layout');
      }

      // Store the optimization details
      setOptimizationDetails({
        beforeScore: response.beforeScore,
        afterScore: response.afterScore,
        plan: response.plan,
        analysis: response.analysis,
        improvements: response.improvements || [],
      });

      // If this was just a plan (not execution), show the plan in the modal
      if (!execute) {
        if (layoutOptimizerRef.current) {
          layoutOptimizerRef.current.showPlan(response);
        }
      } else {
        // If we executed the plan, update the items
        setItems(response.items);
        setMobileItems(response.mobileItems);

        // Show results in the modal
        if (layoutOptimizerRef.current) {
          layoutOptimizerRef.current.showResults();
        }

        // Show success notification
        if (typeof window !== 'undefined' && window.toast) {
          window.toast.success('Layout Optimized', {
            description: `Layout score improved from ${response.beforeScore} to ${response.afterScore}`,
            style: {
              backgroundImage: 'linear-gradient(135deg, #9C40FF, #5300AD)',
              color: 'white',
              borderRadius: '8px',
            },
          });
        }

        // Reset feedback
        setOptimizationFeedback(null);
      }
    } catch (error) {
      console.error('Error optimizing layout:', error);

      // Reset state and close modal on error
      setShowOptimizeModal(false);

      // Show error notification
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.error('Optimization Failed', {
          description: 'Could not optimize layout. Please try again.',
          style: {
            backgroundImage: 'linear-gradient(135deg, #c92222, #8a0303)',
            color: 'white',
            borderRadius: '8px',
          },
        });
      }
    } finally {
      setIsLoading(false);
      setIsApiRunning(false);
    }
  };

  // Handle modal close events
  const handleGenerateModalClose = () => {
    setShowGenerateModal(false);
    if (layoutGeneratorRef.current) {
      layoutGeneratorRef.current.closeModal();
    }
  };

  const handleOptimizeModalClose = () => {
    setShowOptimizeModal(false);
  };

  return (
    <>
      {/* Toaster Component */}

      {/* Floating Action Button */}
      {/*<div className="fixed bottom-4 right-4 z-[49]" ref={floatingButtonRef}>
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`absolute bottom-16 right-0 whitespace-nowrap rounded-lg px-3 py-2 shadow-lg ${
                theme?.textMode === 'dark'
                  ? 'border border-gray-700 bg-gray-800 text-white'
                  : 'border border-gray-200 bg-white text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-violet-500" />
                <span className="text-sm">Try AI layout tools!</span>
              {/*  <span className="ml-1 rounded-full border border-violet-500/30 bg-violet-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-violet-500 dark:border-violet-400/30 dark:bg-violet-400/20 dark:text-violet-400">
                  BETA
                </span>
              </div>
              <div className="absolute bottom-0 right-6 h-2 w-2 translate-y-1/2 rotate-45 transform border-b border-r bg-inherit"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative flex items-center justify-center rounded-full p-4 shadow-lg ${
            theme?.textMode === 'dark'
              ? 'border-2 border-violet-600 bg-gray-800 text-violet-400'
              : 'border-2 border-violet-500 bg-white text-violet-600'
          } ${isOpen ? 'ring-2 ring-violet-400 ring-opacity-50' : ''}`}
          onClick={() => {
            toast.info('Coming Soon!', {
              description: 'This feature will be available soon.',
              style: {
                background: 'linear-gradient(135deg, #9C40FF, #5300AD)',
                color: 'white',
                borderRadius: '8px',
              },
            });
          }}
          disabled={isApiRunning}
          data-tooltip-id="more-components"
        >
          <Wand2 className="h-6 w-6" />
         {/* <span className="absolute -right-1 -top-1 rounded-full border border-white bg-violet-500 px-1.5 py-0.5 text-[9px] font-semibold text-white">
            BETA
          </span>
        </motion.button>
      </div> */}

      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <div
            ref={actionsContainerRef}
            className="fixed bottom-20 right-4 z-[100] flex flex-col items-end gap-2"
          >
            {/* Optimize Layout Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.1 }}
              onClick={handleOptimizeLayout}
              disabled={isLoading || isApiRunning || showGenerateModal}
              className={`flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg ${
                theme?.textMode === 'dark'
                  ? 'bg-blue-600 bg-blue-700 text-white'
                  : 'bg-blue-500 bg-blue-600 text-white'
              } ${isLoading || isApiRunning || showGenerateModal ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <div className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5" />
                <span>
                  {isApiRunning && showOptimizeModal
                    ? 'Optimizing...'
                    : 'Optimize Layout'}
                </span>
              </div>
              {/* <span className="ml-1.5 rounded-full border border-white/30 bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold">
                BETA
              </span>*/}
            </motion.button>

            {/* Generate Full Layout Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.2 }}
              onClick={handleGenerateFullLayout}
              disabled={isLoading || isApiRunning || showOptimizeModal}
              className={`flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg ${
                theme?.textMode === 'dark'
                  ? 'bg-violet-600 bg-violet-700 text-white'
                  : 'bg-violet-500 bg-violet-600 text-white'
              } ${isLoading || isApiRunning || showOptimizeModal ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <div className="flex items-center gap-2">
                <LayoutTemplate className="h-5 w-5" />
                <span>
                  {isApiRunning && showGenerateModal
                    ? 'Generating...'
                    : 'Generate Full Layout'}
                </span>
              </div>
              {/*<span className="ml-1.5 rounded-full border border-white/30 bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold">
                BETA
              </span>*/}
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Use the LayoutGeneratorModal with proper props */}
      <LayoutGeneratorModal
        ref={layoutGeneratorRef}
        isOpen={showGenerateModal}
        onClose={handleGenerateModalClose}
        onGenerate={handleSubmitLayoutDescription}
        isGenerating={isLoading && showGenerateModal}
        generationResult={generationResult}
      />

      {/* Use the LayoutOptimizer modal with proper props */}
      <LayoutOptimizer
        ref={layoutOptimizerRef}
        isOpen={showOptimizeModal}
        onOpenChange={handleOptimizeModalClose}
        items={items}
        mobileItems={mobileItems}
        theme={themeData}
        profile={profile}
        setItems={setItems}
        setMobileItems={setMobileItems}
      />
    </>
  );
};

export default LayoutManager;
