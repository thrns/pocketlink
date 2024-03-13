'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiSmartphone,
  FiCalendar,
  FiBook,
  FiBarChart2,
  FiSend,
  FiMail,
  FiShield,
  FiLock,
  FiUsers,
  FiX,
  FiDollarSign,
} from 'react-icons/fi';
import Link from 'next/link';
import {
  countryCurrencyMap,
  currencySymbols,
  exchangeRates,
} from '@/constants/countryCurrency';
import { FaMoneyBill } from 'react-icons/fa';

export const CompetitorComparison = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [currency, setCurrency] = useState('INR');
  const [loading, setLoading] = useState(true);

  // Base prices in INR
  const baseFeatures = [
    {
      name: 'Mobile Optimized "Link-in-Bio" Store',
      description: 'Replaces Squarespace, Linktree',
      icon: <FiSmartphone className="h-5 w-5" />,
      basePrice: 2400, // ₹2400
    },
    {
      name: 'Calendar Invites & Bookings',
      description: 'Replaces Calendly, Acuity Scheduling',
      icon: <FiCalendar className="h-5 w-5" />,
      basePrice: 1250, // ₹1250
    },
    {
      name: 'Course Builder',
      description: 'Replaces Kajabi',
      icon: <FiBook className="h-5 w-5" />,
      basePrice: 9900, // ₹9900
    },
    {
      name: 'Audience Analytics',
      description: 'Replaces Google Analytics',
      icon: <FiBarChart2 className="h-5 w-5" />,
      basePrice: 830, // ₹830
    },
    {
      name: 'Instagram AutoDMs',
      description: 'Replaces ManyChat',
      icon: <FiSend className="h-5 w-5" />,
      basePrice: 1250, // ₹1250
    },
    {
      name: 'Email List / Newsletter Builder',
      description: '',
      icon: <FiMail className="h-5 w-5" />,
      basePrice: 2400, // ₹2400
    },
    {
      name: 'Social Media Template Library',
      description: '',
      icon: <FiShield className="h-5 w-5" />,
      basePrice: 2500, // ₹2500
    },
    {
      name: 'Exclusive Creator Community Access',
      description: '',
      icon: <FiLock className="h-5 w-5" />,
      basePrice: 8070, // ₹8070
    },
    {
      name: '1:1 Creator Strategy Coaching',
      description: '',
      icon: <FiUsers className="h-5 w-5" />,
      basePrice: 8240, // ₹8240
    },
  ];

  // Pocketlink base price in INR
  const pocketlinkBasePrice = 499; // ₹499

  // Format price based on currency
  const formatPrice = (inrPrice) => {
    const convertedPrice = Math.round(inrPrice * exchangeRates[currency]);
    const symbol = currencySymbols[currency];

    // Format based on currency
    if (currency === 'INR') {
      return `${symbol}${convertedPrice.toLocaleString('en-IN')}`;
    }
    return `${symbol}${convertedPrice.toLocaleString('en-US')}`;
  };

  // Convert features to include formatted prices
  const features = baseFeatures.map((feature) => ({
    ...feature,
    price: formatPrice(feature.basePrice),
  }));

  const totalPrice = baseFeatures.reduce((sum, feature) => {
    return sum + Math.round(feature.basePrice * exchangeRates[currency]);
  }, 0);

  // Detect user's country and set appropriate currency
  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        // Set currency based on country code
        if (data.country_code) {
          setCurrency(
            countryCurrencyMap[data.country_code] || countryCurrencyMap.DEFAULT
          );
        }
      } catch (error) {
        console.error('Failed to detect country:', error);
        // Default to INR if detection fails
        setCurrency('INR');
      } finally {
        setLoading(false);
      }
    };

    detectUserCountry();
  }, []);

  // Show loading state while detecting location
  if (loading) {
    return (
      <section className="relative overflow-hidden bg-white py-16 font-onest text-black md:py-24">
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-12">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                A Simpler Solution <span className="inline-block">💰</span>
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                Loading pricing for your region...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative flex h-auto w-full items-start justify-center overflow-hidden bg-white py-16 font-onest text-black md:py-24"
    >
      {/* Left side floating images */}
      <div className="pointer-events-none hidden md:flex md:w-1/4 md:flex-col md:items-end md:justify-center md:gap-12">
        <motion.img
          src="/landingpage/hero/card1.png"
          alt="Card 1"
          className="hidden h-auto w-44 object-contain opacity-60 md:mt-24 md:block"
          initial={{ x: '50vw', y: '50vh', scale: 0.3, opacity: 0, rotate: 0 }}
          animate={
            inView ? { x: 0, y: 0, scale: 1, opacity: 1, rotate: -15 } : {}
          }
          transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
        />
        <motion.img
          src="/landingpage/hero/card2.png"
          alt="Card 2"
          className="hidden h-auto w-44 object-contain opacity-55 md:block"
          initial={{ x: '50vw', y: '50vh', scale: 0.3, opacity: 0, rotate: 0 }}
          animate={
            inView ? { x: 0, y: 0, scale: 1, opacity: 1, rotate: -12 } : {}
          }
          transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
        />

        <motion.img
          src="/landingpage/hero/card3.png"
          alt="Card 3"
          className="hidden h-auto w-44 object-contain opacity-50 md:block"
          initial={{ x: '50vw', y: '50vh', scale: 0.3, opacity: 0, rotate: 0 }}
          animate={
            inView ? { x: 0, y: 0, scale: 1, opacity: 1, rotate: -18 } : {}
          }
          transition={{ duration: 1.6, delay: 0.3, ease: 'easeOut' }}
        />
        <motion.img
          src="/landingpage/hero/card4.png"
          alt="Card 4"
          className="hidden h-auto w-44 object-contain opacity-45 md:block"
          initial={{ x: '50vw', y: '50vh', scale: 0.3, opacity: 0, rotate: 0 }}
          animate={
            inView ? { x: 0, y: 0, scale: 1, opacity: 1, rotate: -10 } : {}
          }
          transition={{ duration: 1.8, delay: 0.4, ease: 'easeOut' }}
        />
        <motion.img
          src="/landingpage/hero/card5.png"
          alt="Card 5"
          className="hidden h-auto w-44 object-contain opacity-40 md:block"
          initial={{ x: '50vw', y: '50vh', scale: 0.3, opacity: 0, rotate: 0 }}
          animate={
            inView ? { x: 0, y: 0, scale: 1, opacity: 1, rotate: -20 } : {}
          }
          transition={{ duration: 2.0, delay: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Right side floating images */}

      <div className="z-10 mx-auto w-full sm:px-2 md:relative md:w-2/4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              A Simpler Solution <span className="inline-block">💰</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              No more paying for 5+ different apps!
            </p>
          </div>

          {/* Pricing Card */}
          <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl bg-white">
            <div className="p-8">
              {/* Features List */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        {feature.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">
                          {feature.name}
                        </h3>
                        {feature.description && (
                          <p className="text-sm text-gray-500">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="text-lg font-bold text-gray-900">
                        {feature.price}
                      </span>
                    </div>
                  </div>
                ))}

                {/* What You'd Spend Otherwise */}
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
                      <FiX className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-400">
                        What You'd Spend Otherwise
                      </h3>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-lg font-bold text-red-500">
                      {formatPrice(totalPrice)}/mo
                    </span>
                  </div>
                </div>

                {/* Join the Pocketlink Fam */}
                <div className="mt-6 rounded-xl bg-gradient-to-r from-bento-violet to-bento-indigo p-1">
                  <div className="flex items-center justify-between rounded-lg bg-white p-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-bento-violet to-bento-indigo text-white">
                        <FaMoneyBill className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">
                          Join the Pocketlink Fam{' '}
                          <span className="inline-block">✨</span>
                        </h3>
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(pocketlinkBasePrice)}/mo
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <Link
                  href="/pricing"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-bento-violet to-bento-indigo px-8 py-4 text-lg font-semibold text-white transition-all delay-200"
                >
                  Get Started for Free!
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none hidden md:flex md:w-1/4 md:flex-col md:items-start md:justify-center md:gap-12">
        <motion.img
          src="/landingpage/hero/card1.png"
          alt="Card 2"
          className="hidden h-auto w-44 object-contain opacity-60 md:block md:mt-24"
          initial={{ x: '-50vw', y: '50vh', scale: 0.3, opacity: 0, rotate: 0 }}
          animate={
            inView ? { x: 0, y: 0, scale: 1, opacity: 1, rotate: 15 } : {}
          }
          transition={{ duration: 1.3, delay: 0.15, ease: 'easeOut' }}
        />
        <motion.img
          src="/landingpage/hero/card2.png"
          alt="Card 3"
          className="hidden h-auto w-44 object-contain opacity-55 md:block"
          initial={{ x: '-50vw', y: '50vh', scale: 0.3, opacity: 0, rotate: 0 }}
          animate={
            inView ? { x: 0, y: 0, scale: 1, opacity: 1, rotate: 12 } : {}
          }
          transition={{ duration: 1.5, delay: 0.25, ease: 'easeOut' }}
        />
        <motion.img
          src="/landingpage/hero/card3.png"
          alt="Card 4"
          className="hidden h-auto w-44 object-contain opacity-50 md:block"
          initial={{ x: '-50vw', y: '50vh', scale: 0.3, opacity: 0, rotate: 0 }}
          animate={
            inView ? { x: 0, y: 0, scale: 1, opacity: 1, rotate: 18 } : {}
          }
          transition={{ duration: 1.7, delay: 0.35, ease: 'easeOut' }}
        />

        <motion.img
          src="/landingpage/hero/card5.png"
          alt="Card 6"
          className="hidden h-auto w-44 object-contain opacity-40 md:block"
          initial={{ x: '-50vw', y: '50vh', scale: 0.3, opacity: 0, rotate: 0 }}
          animate={
            inView ? { x: 0, y: 0, scale: 1, opacity: 1, rotate: 20 } : {}
          }
          transition={{ duration: 2.1, delay: 0.55, ease: 'easeOut' }}
        />
        <motion.img
          src="/landingpage/hero/card6.png"
          alt="Card 6"
          className="hidden h-auto w-44 object-contain opacity-40 md:block"
          initial={{ x: '-50vw', y: '50vh', scale: 0.3, opacity: 0, rotate: 0 }}
          animate={
            inView ? { x: 0, y: 0, scale: 1, opacity: 1, rotate: 20 } : {}
          }
          transition={{ duration: 2.1, delay: 0.55, ease: 'easeOut' }}
        />
      </div>
    </section>
  );
};

export default CompetitorComparison;
