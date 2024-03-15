'use client';
import React, { useRef, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const FeaturesShowcase = () => {
  // Create refs for videos to manage them programmatically (6 features, desktop + mobile)
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const videoRef4 = useRef(null);
  const videoRef5 = useRef(null);
  const videoRef6 = useRef(null);
  const mobileVideoRef1 = useRef(null);
  const mobileVideoRef2 = useRef(null);
  const mobileVideoRef3 = useRef(null);
  const mobileVideoRef4 = useRef(null);
  const mobileVideoRef5 = useRef(null);
  const mobileVideoRef6 = useRef(null);

  // Feature data hashmap
  const featuresData = {
    'drag-drop': {
      videoSrc:
        'https://nrmyvnoocshxoqmibdip.supabase.co/storage/v1/object/public/LANDINGPAGE_VIDEOS/easy%20to%20edit.mp4',
      videoRef: videoRef1,
      mobileVideoRef: mobileVideoRef1,
      description:
        'Our intuitive drag-and-drop builder empowers creators to design professional pages without any coding knowledge. With real-time preview and smart templates, you can launch your brand presence in minutes, not hours.',
      leftCards: [
        {
          gradient: 'from-orange-400 to-orange-500',
          mainStat: '24/7',
          icon: '/landingpage/3dicons/fire.png',
          subtitle: 'AI Assistant',
          title: 'AI Chatbot',
          description: '24/7 support',
        },
        {
          gradient: 'from-purple-400 to-purple-500',
          mainStat: '50+',
          icon: '/landingpage/3dicons/paint.png',
          subtitle: 'Templates',
          title: 'Ready Designs',
          description: 'Pre-built layouts',
        },
      ],
      rightCards: [
        {
          gradient: 'from-blue-400 to-blue-500',
          mainStat: '99%',
          icon: '/landingpage/3dicons/target.png',
          subtitle: 'Uptime',
          title: 'Fast & Reliable',
          description: 'Always online',
        },
        {
          gradient: 'from-green-400 to-green-500',
          mainStat: '5min',
          icon: '/landingpage/3dicons/crown.png',
          subtitle: 'Setup Time',
          title: 'Quick Launch',
          description: 'Go live fast',
        },
      ],
    },
    analytics: {
      videoSrc:
        'https://nrmyvnoocshxoqmibdip.supabase.co/storage/v1/object/public/LANDINGPAGE_VIDEOS/unlock-analytics.mp4',
      videoRef: videoRef2,
      mobileVideoRef: mobileVideoRef2,
      description:
        'Go beyond basic metrics with hyper-detailed analytics. See exactly where your audience comes from, down to city and district-level demographics, with real-time insights that help you optimize your content strategy.',
      leftCards: [
        {
          gradient: 'from-cyan-400 to-cyan-500',
          mainStat: '50+',
          icon: '/landingpage/3dicons/chart.png',
          subtitle: 'Metrics',
          title: 'Deep Analytics',
          description: 'Detailed insights',
        },
        {
          gradient: 'from-indigo-400 to-indigo-500',
          mainStat: 'Real-time',
          icon: '/landingpage/3dicons/target.png',
          subtitle: 'Updates',
          title: 'Live Data',
          description: 'Instant tracking',
        },
      ],
      rightCards: [
        {
          gradient: 'from-emerald-400 to-emerald-500',
          mainStat: '95%',
          icon: '/landingpage/3dicons/target.png',
          subtitle: 'Accuracy',
          title: 'Precise Data',
          description: 'Reliable metrics',
        },
        {
          gradient: 'from-rose-400 to-rose-500',
          mainStat: 'City-level',
          icon: '/landingpage/3dicons/globe.png',
          subtitle: 'Location',
          title: 'Geo Tracking',
          description: 'Detailed location',
        },
      ],
    },
    'email-marketing': {
      videoSrc:
        'https://nrmyvnoocshxoqmibdip.supabase.co/storage/v1/object/public/LANDINGPAGE_VIDEOS/Marketing%20page%20video.mp4',
      videoRef: videoRef3,
      mobileVideoRef: mobileVideoRef3,
      description:
        'Nurture and grow your audience with built-in, powerful email campaigns. No need for third-party tools - create, send, and track professional email marketing campaigns directly from your dashboard.',
      leftCards: [
        {
          gradient: 'from-violet-400 to-violet-500',
          mainStat: '10K+',
          icon: '/landingpage/3dicons/mail.png',
          subtitle: 'Emails/month',
          title: 'Bulk Sending',
          description: 'High volume',
        },
        {
          gradient: 'from-amber-400 to-amber-500',
          mainStat: '85%',
          icon: '/landingpage/3dicons/chart.png',
          subtitle: 'Open Rate',
          title: 'High Engagement',
          description: 'Better delivery',
        },
      ],
      rightCards: [
        {
          gradient: 'from-teal-400 to-teal-500',
          mainStat: '20+',
          icon: '/landingpage/3dicons/paint.png',
          subtitle: 'Templates',
          title: 'Email Designs',
          description: 'Ready layouts',
        },
        {
          gradient: 'from-pink-400 to-pink-500',
          mainStat: 'Auto',
          icon: '/landingpage/3dicons/robot.png',
          subtitle: 'Campaigns',
          title: 'Smart Automation',
          description: 'Set & forget',
        },
      ],
    },
    'locked-content': {
      videoSrc:
        'https://nrmyvnoocshxoqmibdip.supabase.co/storage/v1/object/public/LANDINGPAGE_VIDEOS/Subscribe.mp4',
      videoRef: videoRef4,
      mobileVideoRef: mobileVideoRef4,
      description:
        'Monetize your content with exclusive subscriptions and paywalls. Create premium content tiers, manage subscriber access, and build recurring revenue streams with our integrated subscription system.',
      leftCards: [
        {
          gradient: 'from-yellow-400 to-yellow-500',
          mainStat: '3 Tiers',
          icon: '/landingpage/3dicons/crown.png',
          subtitle: 'Subscription',
          title: 'Premium Plans',
          description: 'Multiple levels',
        },
        {
          gradient: 'from-red-400 to-red-500',
          mainStat: '100%',
          icon: '/landingpage/3dicons/lock.png',
          subtitle: 'Secure',
          title: 'Content Lock',
          description: 'Protected access',
        },
      ],
      rightCards: [
        {
          gradient: 'from-lime-400 to-lime-500',
          mainStat: '$500+',
          icon: '/landingpage/3dicons/money.png',
          subtitle: 'Monthly',
          title: 'Revenue',
          description: 'Recurring income',
        },
        {
          gradient: 'from-sky-400 to-sky-500',
          mainStat: '24h',
          icon: '/landingpage/3dicons/target.png',
          subtitle: 'Setup',
          title: 'Quick Launch',
          description: 'Fast deployment',
        },
      ],
    },
    ecommerce: {
      videoSrc:
        'https://nrmyvnoocshxoqmibdip.supabase.co/storage/v1/object/public/LANDINGPAGE_VIDEOS/ecommerce.mp4',
      videoRef: videoRef5,
      mobileVideoRef: mobileVideoRef5,
      description:
        'Sell physical products, digital downloads, or services seamlessly. Manage orders, payments, and fulfillment all in one place with integrated e-commerce tools.',
      leftCards: [
        {
          gradient: 'from-orange-500 to-red-600',
          mainStat: 'Smart',
          icon: '/landingpage/3dicons/cart.png',
          subtitle: 'Shopping Cart',
          title: 'Smart Cart',
          description: 'Intelligent checkout',
        },
        {
          gradient: 'from-green-500 to-teal-600',
          mainStat: 'Secure',
          icon: '/landingpage/3dicons/card.png',
          subtitle: 'Payments',
          title: 'Safe Transactions',
          description: 'Protected payments',
        },
      ],
      rightCards: [
        {
          gradient: 'from-blue-500 to-cyan-600',
          mainStat: 'Auto',
          icon: '/landingpage/3dicons/box.png',
          subtitle: 'Fulfillment',
          title: 'Order Management',
          description: 'Automated processing',
        },
        {
          gradient: 'from-purple-500 to-pink-600',
          mainStat: 'Sales',
          icon: '/landingpage/3dicons/chart.png',
          subtitle: 'Analytics',
          title: 'Revenue Tracking',
          description: 'Detailed reports',
        },
      ],
    },
    'ai-assistant': {
      videoSrc:
        'https://nrmyvnoocshxoqmibdip.supabase.co/storage/v1/object/public/LANDINGPAGE_VIDEOS/chatbot.webm',
      videoRef: videoRef6,
      mobileVideoRef: mobileVideoRef6,
      description:
        'Turn visitors into customers anytime, day or night, with your AI-powered, customizable agent. Train your chatbot with your content for personalized interactions.',
      leftCards: [
        {
          gradient: 'from-cyan-500 to-blue-600',
          mainStat: 'AI-Powered',
          icon: '/landingpage/3dicons/robot.png',
          subtitle: 'Responses',
          title: 'Smart AI',
          description: 'Intelligent replies',
        },
        {
          gradient: 'from-emerald-500 to-green-600',
          mainStat: '24/7',
          icon: '/landingpage/3dicons/clock.png',
          subtitle: 'Availability',
          title: 'Always On',
          description: 'Never offline',
        },
      ],
      rightCards: [
        {
          gradient: 'from-violet-500 to-purple-600',
          mainStat: 'Smart',
          icon: '/landingpage/3dicons/target.png',
          subtitle: 'Learning',
          title: 'Adaptive AI',
          description: 'Learns & improves',
        },
        {
          gradient: 'from-amber-500 to-orange-600',
          mainStat: 'Multi-language',
          icon: '/landingpage/3dicons/globe.png',
          subtitle: 'Support',
          title: 'Global Ready',
          description: 'Worldwide support',
        },
      ],
    },
  };

  // Tab configuration map
  const tabsConfig = [
    { value: 'drag-drop', label: 'No Code Builder' },
    { value: 'analytics', label: 'Advanced Analytics' },
    { value: 'email-marketing', label: 'Marketing Tools' },
    { value: 'subscriptions', label: 'Subscriptions' },
    { value: 'locked-content', label: 'Paywall Content' },
    { value: 'custom-domain', label: 'Custom Domain' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'ai-assistant', label: 'AI Chatbot' },
    { value: 'ai-chatbot', label: 'Auto DM' },
    { value: 'auto-dm', label: 'Auto Comments' },
    { value: 'one-tap-checkout', label: 'One Tap Checkout' },
    { value: 'infinite-pages', label: 'Infinite Pages' },
    { value: 'auto-sync-socials', label: 'Auto-sync socials' },
  ];

  // Handle video loading and playback
  useEffect(() => {
    const loadVideos = () => {
      // Get all video elements
      const videos = [
        videoRef1.current,
        videoRef2.current,
        videoRef3.current,
        videoRef4.current,
        videoRef5.current,
        videoRef6.current,
        mobileVideoRef1.current,
        mobileVideoRef2.current,
        mobileVideoRef3.current,
        mobileVideoRef4.current,
        mobileVideoRef5.current,
        mobileVideoRef6.current,
      ].filter(Boolean);

      // Setup each video
      videos.forEach((video) => {
        if (video) {
          // Force load and play
          video.load();

          // Add event listener for when metadata is loaded
          video.onloadedmetadata = () => {
            video.play().catch((e) => console.error('Video play failed:', e));
          };

          // Error handling
          video.onerror = (e) => {
            console.error('Video error:', e);
          };
        }
      });
    };

    loadVideos();

    // Clean up
    return () => {
      const videos = [
        videoRef1.current,
        videoRef2.current,
        videoRef3.current,
        videoRef4.current,
        videoRef5.current,
        videoRef6.current,
        mobileVideoRef1.current,
        mobileVideoRef2.current,
        mobileVideoRef3.current,
        mobileVideoRef4.current,
        mobileVideoRef5.current,
        mobileVideoRef6.current,
      ].filter(Boolean);

      videos.forEach((video) => {
        if (video) {
          video.pause();
          video.src = '';
          video.load();
        }
      });
    };
  }, []);

  // Reusable TabContent component
  const TabContentComponent = ({ value, featureData }) => (
    <TabsContent value={value} className="mt-0">
      <div className="flex flex-col gap-8">
        {/* Main content with video */}
        <div className="flex flex-col items-stretch gap-6 md:flex-row md:gap-8">
          {/* Video Section - Full Width */}
          <div className="h-full w-full">
            {/* Mobile video */}
            <div className="mb-4 block aspect-video w-full overflow-hidden rounded-lg md:hidden">
              <video
                ref={featureData.mobileVideoRef}
                playsInline
                autoPlay
                muted
                loop
                className="h-full w-full bg-white object-cover object-center"
              >
                <source src={featureData.videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Desktop video */}
            <motion.div
              className="hidden aspect-video h-full w-full overflow-hidden rounded-lg md:block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{
                y: [0, -6, 0, -10, 0],
                x: [0, -4, 0, 2, 0],
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                y: { repeat: Infinity, duration: 7, ease: 'easeInOut' },
                x: { repeat: Infinity, duration: 9, ease: 'easeInOut' },
              }}
              viewport={{ once: true }}
            >
              <video
                ref={featureData.videoRef}
                playsInline
                autoPlay
                muted
                loop
                className="h-full w-full bg-black object-cover object-center"
              >
                <source src={featureData.videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </div>

        {/* Description below video */}
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-base text-gray-600 md:text-lg">
            {featureData.description}
          </p>
        </motion.div>
      </div>
    </TabsContent>
  );

  // Fallback TabContent component for tabs without feature data
  const ComingSoonTabContent = ({ value }) => (
    <TabsContent value={value} className="mt-0">
      <div className="flex flex-col gap-8">
        {/* Coming Soon Placeholder */}
        <motion.div
          className="flex aspect-video w-full items-center justify-center rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="mb-4 text-6xl">🎨</div>
            <h3 className="mb-2 text-2xl font-medium text-gray-700">
              Graphic Coming Soon
            </h3>
            <p className="text-gray-500">
              We're working on something amazing for this feature!
            </p>
          </div>
        </motion.div>

        {/* Coming Soon Description */}
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-base text-gray-600 md:text-lg">
            This feature is currently in development. Stay tuned for exciting
            updates and new capabilities coming your way!
          </p>
        </motion.div>
      </div>
    </TabsContent>
  );

  return (
    <section
      id="features"
      className="w-full overflow-hidden bg-white py-12 font-onest md:py-16 2xl:py-14"
    >
      <div className="mx-auto mt-4 max-w-6xl px-4 sm:px-6 md:mt-0">
        {/* Section Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-medium text-gray-900 md:text-5xl">
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-bento-violet to-bento-indigo bg-clip-text text-transparent">
              Modern Creators
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 md:text-xl">
            Everything you need to build, grow, and monetize your online
            presence
          </p>
        </motion.div>

        <Tabs defaultValue="drag-drop" className="w-full">
          {/* Tabs List */}
          <TabsList className="scrollbar-hide mb-12 flex h-auto w-full items-start justify-start gap-2 overflow-x-auto scroll-smooth bg-transparent p-0 px-4 md:grid md:grid-cols-6 md:gap-4 md:overflow-x-visible md:px-0">
            {tabsConfig.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex-shrink-0 whitespace-nowrap rounded-full border border-black/20 bg-white/10 px-3 py-2 text-sm font-medium text-black backdrop-blur-sm transition-all hover:bg-black/5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-bento-violet data-[state=active]:to-bento-indigo data-[state=active]:text-white data-[state=active]:shadow-lg sm:px-4 sm:text-base"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Contents - Rendered dynamically */}
          {tabsConfig.map((tab) => {
            // Check if tab has feature data
            if (featuresData[tab.value]) {
              return (
                <TabContentComponent
                  key={tab.value}
                  value={tab.value}
                  featureData={featuresData[tab.value]}
                />
              );
            } else {
              // Render coming soon content for tabs without feature data
              return <ComingSoonTabContent key={tab.value} value={tab.value} />;
            }
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
