'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaDiscord as DiscordIcon } from 'react-icons/fa';

const CommunitySection = () => {
  return (
    <section className="relative mx-auto mb-20 mt-20 max-w-7xl overflow-hidden px-4 py-16 md:rounded-3xl md:px-0">
      {/* Black gradient background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("/landingpage/discordLandscape.png")`,
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="absolute inset-0 mx-auto w-full bg-gradient-to-r from-black to-black/50" />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Subtle animated elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="bg-white/3 absolute left-20 top-20 h-32 w-32 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.05, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="bg-white/3 absolute bottom-20 right-20 h-24 w-24 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.03, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Left side - Content */}
          <div>
            {/* Header Section */}
            <motion.div
              className="mb-8 md:mb-12"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="mb-6 flex justify-start"
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl"></div>
                  <DiscordIcon className="relative z-10 h-16 w-16 text-white md:h-20 md:w-20" />
                </div>
              </motion.div>

              <h2 className="mb-4 text-left text-3xl font-bold tracking-tight text-white md:text-5xl">
                Join Our{' '}
                <span className="bg-gradient-to-r from-bento-violet to-bento-indigo bg-clip-text text-transparent">
                  Community
                </span>
              </h2>
              <p className="max-w-2xl text-left text-sm text-white/80 md:text-base">
                Connect with thousands of creators, get support, and stay
                updated with the latest features and tips.
              </p>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <a
                  href="https://discord.gg/hwc8gNhdSJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full bg-gray-100 bg-white px-8 py-4 text-base font-bold text-black transition-all duration-300"
                >
                  <DiscordIcon className="group-scale-110 h-6 w-6 transition-transform duration-200" />
                  <span className="hidden md:block">
                    Join Discord Community
                  </span>
                  <span className="block md:hidden">Join Discord</span>
                  <motion.span
                    className="text-xl"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    →
                  </motion.span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Image
          <motion.div
            className="hidden items-center justify-center lg:flex"
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img src="/landingpage/discordLandscape.png" alt="Discord Community" className="w-full h-full aspect-square object-cover rounded-3xl" />
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
