'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/app/contexts/OnboardingContext';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function OnboardingGreeting() {
  const { nextStep } = useOnboarding();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
  };

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="flex max-w-md flex-col items-center justify-center space-y-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
      >
        {/* Animated stars in the background */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * 100 - 50 + '%',
                y: Math.random() * 100 - 50 + '%',
                scale: Math.random() * 0.5 + 0.5,
                opacity: 0,
              }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 5,
              }}
            >
              <Sparkles
                className="text-purple-300"
                size={Math.random() * 16 + 8}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile: Show Pocket image, Desktop: Hide it since it's on the left panel */}
        <motion.div className="relative md:hidden" variants={itemVariants}>
          <motion.div
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-400/20 to-indigo-400/20 blur-xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          <motion.div
            whileHover={{
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 },
            }}
            className="relative"
          >
            <Image
              src="/AI/pocket.png"
              alt="Pocket Character"
              width={220}
              height={220}
              className="drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold tracking-tight"
          variants={itemVariants}
        >
          <span className="md:hidden">
            Hey! I'm{' '}
            <motion.span
              className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% center', '100% center'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              Pocket
            </motion.span>
          </span>
          <span className="hidden md:block">
            Welcome to{' '}
            <motion.span
              className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% center', '100% center'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              Pocketlink
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          className="max-w-xs text-lg text-gray-600"
          variants={itemVariants}
        >
          <span className="md:hidden">
            Your AI companion for creating awesome links and content.
          </span>
          <span className="hidden md:block">
            Let's create your personalized link-in-bio page.
          </span>
        </motion.p>

        <motion.div className="mt-6 w-full" variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 from-purple-700 to-indigo-600 to-indigo-700 px-8 py-6 text-lg font-medium text-white shadow-lg shadow-purple-500/25 transition-all duration-300"
              onClick={nextStep}
            >
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-400/30 to-indigo-400/30"
                animate={{
                  x: ['0%', '100%'],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              />
              <span className="flex items-center gap-2">
                Let's Create Your Pocketlink{' '}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                >
                  <ArrowRight className="ml-1" />
                </motion.span>
              </span>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-6 text-sm text-gray-500"
          variants={itemVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span>Empowering creator economy using AI and Design.</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
