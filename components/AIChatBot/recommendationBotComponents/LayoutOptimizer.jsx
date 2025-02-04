'use client';

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  BarChart2,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Loader2,
  Info,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import optimizeLayout from '@/lib/utils/optimizeLayout';
import ReactMarkdown from 'react-markdown';
import { useAnalytics } from '@/app/contexts/AnalyticsContext';

const LayoutOptimizer = (
  {
    isOpen,
    onOpenChange,
    items,
    mobileItems,
    theme,
    profile,
    setItems,
    setMobileItems,
  },
  ref
) => {
  const [modalView, setModalView] = useState('form'); // 'form', 'optimizing', 'plan', 'results'
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [optimizationFeedback, setOptimizationFeedback] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentThinkingStep, setCurrentThinkingStep] = useState(0);
  const { analyticsData } = useAnalytics();
  const [plan, setPlan] = useState('');

  // Reset modal state when closed
  useEffect(() => {
    if (!isOpen) {
      // Reset state after a short delay to allow closing animation
      const timer = setTimeout(() => {
        if (!isOpen) {
          setModalView('form');
          setProgress(0);
          setOptimizationFeedback(null);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Progress animation for the optimizing state
  useEffect(() => {
    if (modalView === 'optimizing') {
      const thinkingSteps = [
        'Analyzing current layout...',
        'Evaluating visual hierarchy...',
        'Checking balance and alignment...',
        'Assessing content flow...',
        'Optimizing mobile layout...',
        'Calculating improvement scores...',
        'Finalizing optimization plan...',
      ];

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + 1, 100);
          return newProgress;
        });
      }, 80);

      const thinkingInterval = setInterval(() => {
        setCurrentThinkingStep((prev) => (prev + 1) % thinkingSteps.length);
      }, 2500);

      return () => {
        clearInterval(progressInterval);
        clearInterval(thinkingInterval);
      };
    }
  }, [modalView]);

  // Handle start optimization
  const handleStartOptimize = async () => {
    try {
      setIsOptimizing(true);
      setModalView('optimizing');
      setProgress(0);

      const response = await optimizeLayout({
        profileDetails: profile,
        items,
        mobileItems,
        theme,
        execute: false,
        feedback: null,
        analytics: analyticsData,
        plan: plan ? plan : '',
      });
      if (!response.success) {
        throw new Error(response.error || 'Failed to optimize layout');
      }
      setPlan(response.plan);

      setOptimizationResult({
        beforeScore: response.beforeScore,
        afterScore: response.afterScore,
        plan: response.plan,
        improvements: response.improvements || [],
      });
      setModalView('plan');
    } catch (error) {
      console.error('Error optimizing layout:', error);
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.error('Optimization Failed', {
          description: 'Could not optimize layout. Please try again.',
        });
      }
      // Reset state and close modal on error
      onOpenChange(false);
      setModalView('form');
      setProgress(0);
    } finally {
      setIsOptimizing(false);
    }
  };

  // Handle optimization feedback
  const handleOptimizationExecution = async (execute = true) => {
    try {
      if (execute) {
        setModalView('optimizing');
        setIsOptimizing(true);
        setProgress(0);

        console.log('payload', {
          profileDetails: profile,
          items,
          mobileItems,
          theme,
          analytics: analyticsData,
          execute: true,
          plan: plan || '',
        });

        const response = await optimizeLayout({
          profileDetails: profile,
          items,
          mobileItems,
          theme,
          execute: true,
          analytics: analyticsData,
          plan: plan || '',
        });
        if (!response.success) {
          throw new Error(response.error || 'Failed to execute optimization');
        }
        console.log('response from execute', response);
        setItems(response.items);
        setMobileItems(response.mobileItems);
        setOptimizationResult({
          beforeScore: response.beforeScore,
          afterScore: response.afterScore,
          analysis: response.analysis,
          improvements: response.improvements || [],
        });
        setModalView('results');
      } else {
        setModalView('optimizing');
        setIsOptimizing(true);
        setProgress(0);
        const feedback = 'Please provide a different optimization approach.';
        setOptimizationFeedback(feedback);
        const response = await optimizeLayout({
          profileDetails: profile,
          items,
          mobileItems,
          theme,
          execute: false,
          feedback,
          analytics: analyticsData,
          plan: plan || '',
        });
        if (!response.success) {
          throw new Error(response.error || 'Failed to generate new plan');
        }
        setOptimizationResult({
          beforeScore: response.beforeScore,
          afterScore: response.afterScore,
          plan: response.plan,
          improvements: response.improvements || [],
        });
        setModalView('plan');
      }
    } catch (error) {
      console.error('Error handling optimization feedback:', error);
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.error('Optimization Failed', {
          description:
            'Could not process optimization feedback. Please try again.',
        });
      }
      // Reset state and close modal on error
      onOpenChange(false);
      setModalView('form');
      setProgress(0);
    } finally {
      setIsOptimizing(false);
    }
  };

  // Close modal handler
  const handleCloseModal = () => {
    if (isOptimizing) return;
    onOpenChange(false);
    // State will be reset in the useEffect when isOpen becomes false
  };

  // Expose methods for external components to call
  const showPlan = (response) => {
    if (!response) return;

    setOptimizationResult({
      beforeScore: response.beforeScore,
      afterScore: response.afterScore,
      plan: response.plan,
      improvements: response.improvements || [],
    });
    setModalView('plan');
  };

  const showResults = () => {
    setModalView('results');
  };

  // Make these methods available to parent components
  useImperativeHandle(
    ref,
    () => ({
      showPlan,
      showResults,
      openModal: () => onOpenChange(true),
      closeModal: () => onOpenChange(false),
    }),
    [onOpenChange]
  );

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500 dark:text-green-400';
    if (score >= 60) return 'text-blue-500 dark:text-blue-400';
    if (score >= 40) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  const formatImprovements = (improvements) => {
    if (
      !improvements ||
      !Array.isArray(improvements) ||
      improvements.length === 0
    ) {
      return (
        <p className="text-sm opacity-80">No specific improvements listed.</p>
      );
    }
    return (
      <ul className="mt-2 space-y-2">
        {improvements.map((improvement, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-2"
          >
            <CheckCircle2 className="mt-1 h-4 w-4 text-green-500" />
            <span className="text-sm">{improvement}</span>
          </motion.li>
        ))}
      </ul>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[500px] w-[95%] max-w-2xl overflow-y-auto overflow-x-hidden rounded-xl p-0">
        {/* Form View */}
        {modalView === 'form' && (
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:border-blue-800/30 dark:from-blue-900/30 dark:to-indigo-900/30">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-blue-700 dark:text-blue-300">
                <div className="rounded-lg bg-blue-600 p-2 dark:bg-blue-500">
                  <BarChart2 size={20} className="text-white" />
                </div>
                Optimize Layout
              </h3>
            </div>
            <div className="mb-6">
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Our AI will analyze your current layout and suggest
                optimizations to improve its effectiveness and visual appeal.
              </p>
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-800/30 dark:bg-blue-900/20">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  The optimization will only rearrange your existing cards
                  without changing their content.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleStartOptimize}
                className="flex items-center gap-2 rounded-lg bg-blue-600 bg-blue-700 px-4 py-2 text-white transition-colors dark:bg-blue-500 dark:bg-blue-600"
              >
                <BarChart2 size={18} />
                Analyze My Layout
              </button>
            </div>
          </div>
        )}
        {/* Optimizing View */}
        {modalView === 'optimizing' && (
          <div className="p-6">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative mb-6 h-24 w-24">
                <svg
                  className="h-full w-full"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    className="dark:stroke-gray-700"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (progress / 100) * 283}
                    className="dark:stroke-blue-400"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-10 w-10 animate-spin text-blue-500 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Analyzing Your Layout
              </h3>
              <p className="mb-4 font-medium text-blue-600 dark:text-blue-400">
                {Math.round(progress)}%
              </p>
              <div className="max-w-sm text-center">
                <p className="animate-pulse text-sm text-gray-600 dark:text-gray-300">
                  {
                    [
                      'Analyzing current layout...',
                      'Evaluating visual hierarchy...',
                      'Checking balance and alignment...',
                      'Assessing content flow...',
                      'Optimizing mobile layout...',
                      'Calculating improvement scores...',
                      'Finalizing optimization plan...',
                    ][currentThinkingStep]
                  }
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Plan View */}
        {modalView === 'plan' && optimizationResult && (
          <div className="flex h-full w-full flex-col overflow-x-hidden">
            <div className="border-b border-gray-200 p-6 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                  <BarChart2 className="h-5 w-5 text-blue-500" />
                  Optimization Plan
                </h3>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto p-6">
              <div className="mb-6 space-y-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm dark:border-gray-600 dark:bg-gray-700">
                  {optimizationResult.plan ? (
                    <div className="prose dark:prose-invert max-w-none">
                      <ReactMarkdown>{optimizationResult.plan}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300">
                      No plan available.
                    </p>
                  )}
                </div>
              </div>
              {optimizationResult.beforeScore !== undefined &&
                optimizationResult.afterScore !== undefined && (
                  <div className="mb-6 mt-4 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                    <div className="space-y-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Current Score
                      </span>
                      <div
                        className={`text-xl font-bold ${getScoreColor(optimizationResult.beforeScore)}`}
                      >
                        {optimizationResult.beforeScore}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <span className="text-xl">→</span>
                    </div>
                    <div className="space-y-1 text-right">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Predicted Score
                      </span>
                      <div
                        className={`text-xl font-bold ${getScoreColor(optimizationResult.afterScore)}`}
                      >
                        {optimizationResult.afterScore}
                      </div>
                    </div>
                  </div>
                )}
            </div>
            <div className="border-t border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex justify-between">
                <button
                  onClick={() => handleStartOptimize()}
                  className="flex items-center gap-2 rounded-lg bg-gray-200 bg-gray-300 px-4 py-2 text-gray-800 transition-colors dark:bg-gray-600 dark:bg-gray-700 dark:text-gray-200"
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>Nah, could be better</span>
                </button>
                <button
                  onClick={() => handleOptimizationExecution(true)}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 bg-blue-700 px-4 py-2 text-white transition-colors dark:bg-blue-500 dark:bg-blue-600"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Yes, implement this</span>
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Results View */}
        {modalView === 'results' && optimizationResult && (
          <div className="flex h-full flex-col">
            <div className="border-b border-gray-200 p-6 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Layout Optimized
                </h3>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto p-6">
              <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                <div className="space-y-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Before
                  </span>
                  <div
                    className={`text-2xl font-bold ${getScoreColor(optimizationResult.beforeScore)}`}
                  >
                    {optimizationResult.beforeScore}
                  </div>
                </div>
                <div className="flex items-center text-gray-400">
                  <span className="text-xl">→</span>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    After
                  </span>
                  <div
                    className={`text-2xl font-bold ${getScoreColor(optimizationResult.afterScore)}`}
                  >
                    {optimizationResult.afterScore}
                  </div>
                </div>
              </div>
              {optimizationResult.analysis && (
                <div className="mb-6 space-y-3">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">
                    Analysis:
                  </h4>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm dark:border-gray-600 dark:bg-gray-700">
                    <div className="prose dark:prose-invert max-w-none">
                      <ReactMarkdown>
                        {optimizationResult.analysis}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
              <div className="mb-6 space-y-3">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Improvements Made:
                </h4>
                <div className="text-gray-700 dark:text-gray-300">
                  {formatImprovements(optimizationResult.improvements)}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="rounded-lg bg-blue-600 bg-blue-700 px-4 py-2 text-white transition-colors dark:bg-blue-500 dark:bg-blue-600"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Add forwardRef to make ref accessible
export default forwardRef(LayoutOptimizer);
