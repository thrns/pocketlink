'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { premiumRequest } from '@/constants/emailTemplates/premiumRequest';
import { toast } from 'sonner';
import {
  countryCurrencyMap,
  currencySymbols,
  exchangeRates,
} from '@/constants/countryCurrency';
import { useSubscription } from '@/app/contexts/SubscriptionContext';
import EnhancedDodoCheckoutButton from '@/components/EnhancedDodoCheckoutButton';
import PlanChangeButton from '@/components/PlanChangeButton';

//====== PRICING PAGE COMPONENT ======//
const PricingPage = () => {
  //====== STATE MANAGEMENT ======//
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [currency, setCurrency] = useState('INR');
  const [countryCode, setCountryCode] = useState('US');
  const [loading, setLoading] = useState(true);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestProcessing, setRequestProcessing] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const { user } = useAuth();
  const { isPremium, plan, isActive } = useSubscription();
  const router = useRouter();

  //====== PRICING DATA ======//
  // Pricing data in INR (base currency)
  const pricingData = {
    freemium: {
      monthly: 0,
      yearly: 0,
      features: [
        'Unlimited Cards',
        'Basic Analytics',
        'Mobile Optimization',
        'Standard Themes',
        'Social Media Integration',
        '14-day free trial: Advanced Analytics & Marketing',
      ],
    },
    starter: {
      monthly: 99,
      yearly: 999, // 1 month free (10.9 months)
      features: [
        'Everything in Freemium',
        'Advanced Analytics',
        'Paid Subscriptions',
        'Custom Domain',
        'Remove Pocketlink Branding',
        'Priority Support',
        '1 AI Automation Workflow',
      ],
    },
    business: {
      monthly: 499,
      yearly: 4999, // 1 month free (10 months)
      features: [
        'Everything in Starter',
        'Full E-commerce Features',
        'Marketing Tools',
        'Locked Content',
        'Social Media Automations',
        'AI Agent Assistant',
        'AI Sales Agent',
        'Premium Themes',
        '*Priority access to new features',
      ],
    },
  };

  //====== HELPERS ======//
  // Check if this is the user's current plan
  const isCurrentPlan = (planName) => {
    if (!user || !isActive) return false;
    return plan === planName;
  };

  // Check if user can upgrade to this plan
  const canUpgradeTo = (planName) => {
    if (!user) return true; // Show for non-logged users
    if (!isActive) return true; // No active subscription

    if (planName === 'starter') {
      return plan === 'free' || !plan; // Can upgrade from free
    }
    if (planName === 'business') {
      return plan === 'free' || plan === 'starter' || !plan; // Can upgrade from free or starter
    }
    return false;
  };

  // Check if this is a downgrade attempt
  const isDowngrade = (planName) => {
    if (!user || !isActive) return false;

    if (planName === 'starter' && plan === 'business') return true;
    return false;
  };

  //====== HANDLERS ======//

  //====== UTILITY FUNCTIONS ======//
  // Format price based on currency
  const formatPrice = (inrPrice) => {
    const convertedPrice = Math.round(inrPrice * exchangeRates[currency]);

    // Format based on currency
    if (currency === 'INR') {
      return `${currencySymbols[currency]}${convertedPrice.toLocaleString(
        'en-IN'
      )}`;
    }

    return `${currencySymbols[currency]}${convertedPrice.toLocaleString(
      'en-US'
    )}`;
  };

  //====== EFFECTS ======//
  // Detect user's country and set appropriate currency
  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        // Set country code
        if (data.country_code) {
          setCountryCode(data.country_code);

          // Map country to currency using our constants file
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

  //====== RENDER ======//
  return (
    <main className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-onest">
      {/* Gradient background with texture - only at the top */}
      <div
        className="absolute left-0 right-0 top-0 z-0 h-80"
        style={{
          background:
            'linear-gradient(135deg, #6363F7 0%, #D754AE 50%, #6363F7 100%)',
        }}
      />

      {/* Coarse texture overlay */}
      <div
        className="absolute left-0 right-0 top-0 z-0 h-80 opacity-[0.1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Bottom fade to white overlay */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-40 z-0 h-40"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0) 0%, white 100%)',
        }}
      />

      <section className="relative mt-10 h-full w-full overflow-y-auto md:mt-24">
        <div className="relative mx-auto mb-12 max-w-6xl">
          <div className="mb-16 mt-20 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-4xl font-bold text-white md:text-5xl"
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto max-w-2xl text-lg text-black/50"
            >
              Choose the perfect plan for your needs. All plans include core
              features to help you build your online presence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row"
            >
              <div className="flex items-center justify-center gap-2">
                <Tabs
                  value={billingCycle}
                  onValueChange={(value) => {
                    // Allow both monthly and yearly selections
                    setBillingCycle(value);
                  }}
                  className="w-[300px] sm:w-[400px]"
                >
                  <TabsList className="grid w-full grid-cols-2 rounded-full bg-gray-100 p-1">
                    <TabsTrigger
                      value="monthly"
                      className="rounded-full transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-bento-violet data-[state=active]:shadow-md"
                    >
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger
                      value="yearly"
                      className="rounded-full transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-bento-violet data-[state=active]:shadow-md"
                    >
                      Yearly
                      <Badge
                        variant="secondary"
                        className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      >
                        20% Off
                      </Badge>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </motion.div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-bento-violet"></div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3"
            >
              {/* Freemium Tier */}
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="p-8">
                  <h3 className="text-xl font-semibold">Freemium</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">
                      {formatPrice(pricingData.freemium[billingCycle])}
                    </span>
                    <span className="ml-1 text-gray-500">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-500">
                    Perfect for beginners and personal use. Includes 14-day
                    trial of analytics & marketing.
                  </p>
                </div>
                <div className="bg-gray-50 p-8">
                  <Button
                    onClick={() => router.push('/login')}
                    variant="outline"
                    className="w-full border-bento-pink/50 text-bento-pink hover:bg-bento-violet/5"
                  >
                    Get Started
                  </Button>
                  <div className="mt-8">
                    <p className="mb-4 font-medium text-gray-800">
                      Included features:
                    </p>
                    <ul className="space-y-4">
                      {pricingData.freemium.features.map((feature, index) => (
                        <li key={index} className="flex">
                          <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3.5 w-3.5 text-green-600" />
                          </div>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Starter Tier */}
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className={`overflow-hidden rounded-xl border shadow-md transition-all duration-300 hover:shadow-xl ${
                  isCurrentPlan('starter')
                    ? 'border-green-400 ring-2 ring-green-100'
                    : 'border-bento-violet/20'
                }`}
              >
                <div className="bg-gradient-to-br from-bento-violet/5 to-purple-400/5 p-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Starter</h3>
                    {isCurrentPlan('starter') && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Current Plan
                      </Badge>
                    )}
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">
                      {formatPrice(pricingData.starter[billingCycle])}
                    </span>
                    <span className="ml-1 text-gray-500">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="mt-1 text-sm text-green-600">
                      Save{' '}
                      {formatPrice(
                        pricingData.starter.monthly * 12 -
                          pricingData.starter.yearly
                      )}{' '}
                      per year
                    </p>
                  )}
                  <p className="mt-2 text-gray-500">
                    For growing creators and content professionals
                  </p>
                </div>
                <div className="bg-white p-8">
                  {isCurrentPlan('starter') ? (
                    <Button
                      variant="outline"
                      className="w-full cursor-default border-green-400 text-green-600"
                      disabled
                    >
                      Current Plan
                    </Button>
                  ) : isActive && plan ? (
                    <PlanChangeButton
                      currentPlan={plan}
                      targetPlan="starter"
                      billingCycle={billingCycle}
                    />
                  ) : (
                    <EnhancedDodoCheckoutButton
                      billingCycle={billingCycle}
                      planType="starter"
                      customer={
                        user
                          ? {
                              email: user.email,
                              username: user.username,
                              ...(user.user_metadata?.full_name && {
                                name: user.user_metadata.full_name,
                              }),
                            }
                          : null
                      }
                      onSuccess={(data) => {
                        toast.success(
                          'Payment successful! Welcome to Starter!'
                        );
                        router.push('/dashboard?upgraded=true');
                      }}
                      onError={(error) => {
                        console.error('Checkout error:', error);
                        toast.error('Payment failed. Please try again.');
                      }}
                    />
                  )}

                  <div className="mt-8">
                    <p className="mb-4 font-medium text-gray-800">
                      All starter features:
                    </p>
                    <ul className="space-y-4">
                      {pricingData.starter.features.map((feature, index) => (
                        <li key={index} className="flex">
                          <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-bento-violet/10">
                            <Check className="h-3.5 w-3.5 text-bento-violet" />
                          </div>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Business Tier */}
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className={`relative overflow-hidden rounded-xl border shadow-md transition-all duration-300 hover:shadow-xl ${
                  isCurrentPlan('business')
                    ? 'border-green-400 ring-2 ring-green-100'
                    : 'border-bento-pink/20'
                }`}
              >
                {/* Most Popular tag with gradient */}
                {!isCurrentPlan('business') && (
                  <div className="absolute inset-x-0 top-0 flex justify-center">
                    <div className="rounded-b-lg bg-gradient-to-r from-bento-violet to-bento-indigo px-4 py-1 text-sm font-medium text-white shadow-md">
                      Most Popular
                    </div>
                  </div>
                )}
                <div
                  className={`bg-gradient-to-br from-bento-pink/5 to-orange-400/5 p-8 ${isCurrentPlan('business') ? 'pt-8' : 'pt-10'}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Business</h3>
                    {isCurrentPlan('business') && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Current Plan
                      </Badge>
                    )}
                  </div>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">
                      {formatPrice(pricingData.business[billingCycle])}
                    </span>
                    <span className="ml-1 text-gray-500">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="mt-1 text-sm text-green-600">
                      Save{' '}
                      {formatPrice(
                        pricingData.business.monthly * 12 -
                          pricingData.business.yearly
                      )}{' '}
                      per year
                    </p>
                  )}
                  <p className="mt-2 text-gray-500">
                    For businesses and serious entrepreneurs
                  </p>
                </div>
                <div className="bg-white p-8">
                  {isCurrentPlan('business') ? (
                    <Button
                      variant="outline"
                      className="w-full cursor-default border-green-400 text-green-600"
                      disabled
                    >
                      Current Plan
                    </Button>
                  ) : isActive && plan ? (
                    <PlanChangeButton
                      currentPlan={plan}
                      targetPlan="business"
                      billingCycle={billingCycle}
                      onError={(error) => {
                        console.error('Plan change error:', error);
                      }}
                    />
                  ) : (
                    <EnhancedDodoCheckoutButton
                      billingCycle={billingCycle}
                      planType="business"
                      customer={
                        user
                          ? {
                              email: user.email,
                              username: user.username,
                              ...(user.user_metadata?.full_name && {
                                name: user.user_metadata.full_name,
                              }),
                            }
                          : null
                      }
                      onSuccess={(data) => {
                        toast.success(
                          'Payment successful! Welcome to Business!'
                        );
                        router.push('/dashboard?upgraded=true');
                      }}
                      onError={(error) => {
                        console.error('Checkout error:', error);
                        toast.error('Payment failed. Please try again.');
                      }}
                    />
                  )}

                  <div className="mt-8">
                    <p className="mb-4 font-medium text-gray-800">
                      All business features:
                    </p>
                    <ul className="space-y-4">
                      {pricingData.business.features.map((feature, index) => (
                        <li key={index} className="flex">
                          <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-bento-pink/10">
                            <Check className="h-3.5 w-3.5 text-bento-pink" />
                          </div>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mx-auto mt-24 max-w-4xl"
          >
            <h2 className="mb-12 bg-gradient-to-r from-bento-violet to-bento-indigo bg-clip-text text-center text-2xl font-bold text-transparent md:text-3xl">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  question: 'What is PocketLink?',
                  answer:
                    'PocketLink is a modern, AI-powered link-in-bio solution designed for creators, influencers, and businesses. It transforms your profile link into a dynamic tool for growth, enabling you to showcase your brand, sell products, track analytics, and engage with your audience—all in one place.',
                },
                {
                  question: 'What premium features do I get?',
                  answer:
                    "With our Starter plan, you get Advanced Analytics, Paid Subscriptions, Custom Domain, removed PocketLink branding, and Priority Support. Our Business plan includes everything in Starter plus Full E-commerce Features, Marketing Tools, Social Media Automations, AI Agent Assistant, AI Sales Agent, and Premium Themes. You'll also get early access to new features as they're released.",
                },
                {
                  question: 'How does the AI Chatbot Assistant work?',
                  answer:
                    "The AI Chatbot Assistant acts as your personal sales representative, engaging with visitors when you're away. You can customize its personality, knowledge base, and access to your data, allowing it to answer questions about your products and services 24/7.",
                },
                {
                  question: 'Can I use my own domain name?',
                  answer:
                    'Yes! Premium users can connect their own custom domain to their PocketLink page. This creates a more professional and branded experience for your visitors. We provide easy-to-follow instructions for setting up DNS records with any domain registrar.',
                },
                {
                  question: 'What payment methods do you accept?',
                  answer:
                    'We accept UPI (PhonePe, Google Pay, Paytm, etc.), all major credit cards (Visa, Mastercard, American Express), Google Pay, Apple Pay, NetBanking, and Wallet payments through our secure payment processor. Our payment gateway supports international transactions in multiple currencies, making it easy to subscribe from anywhere in the world.',
                },
                {
                  question: 'Is there a free trial for premium features?',
                  answer:
                    'Yes! New users get a 14-day free trial of advanced analytics and marketing features when they sign up. This gives you time to explore these premium capabilities before deciding if you want to subscribe. After the trial, basic features like themes, social links, and contact forms remain free forever.',
                },
                {
                  question: 'Can I cancel my subscription anytime?',
                  answer:
                    "To cancel your subscription, please email our support team at support@pocketlink.co with your account details. Our team will assist you with the cancellation process. Please note that we don't offer automatic cancellation through the dashboard at this time.",
                },
                {
                  question: 'Do you offer refunds?',
                  answer:
                    'Due to the digital nature of our services, purchases are generally non-refundable once activated. However, we may consider refunds in exceptional circumstances such as accidental duplicate purchases. Please contact our support team if you have concerns.',
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-gray-200"
                >
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between bg-white p-5 hover:bg-gray-50">
                      <span className="font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors group-open:bg-gradient-to-r group-open:from-bento-violet group-open:to-bento-pink group-open:text-white">
                        <svg
                          className="h-4 w-4 transform transition-transform group-open:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                    </summary>
                    <div className="border-t border-gray-200 bg-gray-50 p-5 text-gray-600">
                      {faq.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tax Notice with styled box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mx-auto mt-16 max-w-4xl rounded-xl border border-gray-200 bg-gray-50 p-6"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <svg
                  className="h-5 w-5 text-bento-violet"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  *Prices may vary based on your location due to local tax
                  regulations.
                </p>
                <p className="mt-2">
                  Invoices will be sent to your registered email address after
                  payment.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Additional trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-400"
          >
            <div className="flex items-center">
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center">
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span className="text-sm">Cancel Anytime</span>
            </div>
            <div className="flex items-center">
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                ></path>
              </svg>
              <span className="text-sm">No Setup Fee</span>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <Footer />
      </section>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              Login Required
            </DialogTitle>
            <DialogDescription className="pt-2 text-center">
              You need to be logged in to purchase premium features. Please
              login or create an account to continue.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => setShowLoginDialog(false)}
              className="sm:w-1/2"
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-bento-violet to-bento-indigo transition-shadow hover:shadow-lg sm:w-1/2"
              onClick={() => router.push('/login')}
            >
              Sign in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default PricingPage;
