import React from 'react';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
const Hero = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleClaim = (e) => {
    e.preventDefault();
    const clean = (username || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, '');
    if (clean) {
      router.push(`/signup?username=${encodeURIComponent(clean)}`);
    } else {
      router.push('/signup');
    }
  };

  return (
    <section className="bg-background relative mt-28 flex flex-col items-center justify-start p-4 pb-16 md:mt-28 md:min-h-[80vh] md:py-16 md:pb-12">
      {/*============= Animated Title and Text =============*/}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatedGradientText>
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
          <span className="inline animate-gradient bg-gradient-to-r from-bento-violet to-bento-indigo bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
            Welcome to Pocketlink
          </span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedGradientText>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="z-10 mt-4 text-4xl font-semibold tracking-tight text-black dark:text-white md:text-6xl"
        >
          Your Brand, Your Store <br />
          <motion.span className="relative inline-block animate-shine bg-gradient-to-r from-bento-violet to-bento-indigo bg-clip-text pr-2 italic text-transparent">
            Personalized
          </motion.span>{' '}
          in Every Detail.
        </motion.h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          Automate your brand, grow your audience, and turn clicks into sales,
          all from one beautiful link.
        </p>
      </motion.div>

      {/*============= CTA Button =============*/}
      <div className="mb-10 mt-10 flex w-full max-w-2xl items-center justify-center md:flex-wrap">
        <form
          onSubmit={handleClaim}
          className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 pl-1 pr-2">
            <Image
              src="/android-chrome-192x192.png"
              alt="pocketlink logo"
              width={24}
              height={24}
              className="rounded"
            />
            <span className="text-sm font-semibold text-gray-900">
              pocketlink.co/
            </span>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="yourname"
            className="flex-1 border-0 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            aria-label="Your username"
          />
          <button
            type="submit"
            className="hidden whitespace-nowrap rounded-lg bg-bento-pink px-4 py-3 text-sm font-semibold text-white transition-colors md:block"
          >
            Claim your username
          </button>
          <button className="block rounded-lg bg-bento-pink p-2 text-white md:hidden">
            <ChevronRight />
          </button>
        </form>
      </div>

      {/*============= Two Section Video Grid =============*/}
      <div className="h-full md:max-w-6xl md:px-8">
        <div className="flex h-full min-h-max flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
          {/* Left Section - For Creators Video */}
          <div className="flex flex-col gap-3">
            <div className="h-50 w-50 relative overflow-hidden rounded-2xl bg-black md:rounded-3xl">
              <video
                className="w-full object-cover object-top"
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src="https://nrmyvnoocshxoqmibdip.supabase.co/storage/v1/object/public/LANDINGPAGE_VIDEOS/for-creators.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <h3 className="text-center text-lg font-semibold text-gray-900 dark:text-white">
              For Creators
            </h3>
          </div>

          {/* Right Section - For Businesses Video */}
          <div className="flex flex-col gap-3">
            <div
              className="h-50 w-50 relative overflow-hidden rounded-2xl md:rounded-3xl"
              style={{ backgroundColor: '#8c52ff' }}
            >
              <video
                className="h-full w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src="https://nrmyvnoocshxoqmibdip.supabase.co/storage/v1/object/public/LANDINGPAGE_VIDEOS/for-businesses.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <h3 className="text-center text-lg font-semibold text-gray-900 dark:text-white">
              For Solo-Preneurs and Brands
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
