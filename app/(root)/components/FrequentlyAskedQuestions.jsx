'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What makes PocketLink different from other link-in-bio tools?',
    answer:
      'PocketLink is designed as a visual catalog platform, not just a link organizer. Unlike basic link-in-bio tools, PocketLink offers drag-and-drop customization, interactive grid layouts for showcasing portfolios and products, premium content gates, and detailed analytics—all optimized for creators who want to beautifully display their work and connect with their audience.',
  },
  {
    question: 'How quickly can I set up my PocketLink page?',
    answer:
      'You can have a professional-looking PocketLink page ready in under 2 minutes. Simply choose from our library of customizable templates, drag and drop your content, links, and media, then publish instantly. No coding skills required, and our intuitive interface makes setup effortless even for beginners.',
  },
  {
    question: 'What types of content can I showcase on PocketLink?',
    answer:
      'PocketLink supports all types of content: portfolios, social media links, videos, digital products, services, blog posts, newsletters, exclusive content, and more. You can create visual grids, carousels, and interactive sections to display your work exactly how you envision it.',
  },
  {
    question: 'Does PocketLink work well on mobile devices?',
    answer:
      'Absolutely! PocketLink is built mobile-first, ensuring your page looks stunning and loads fast on all devices. With most social media traffic coming from mobile, our responsive templates are optimized for touch navigation and quick browsing on smartphones and tablets.',
  },
  {
    question: 'Is PocketLink free to use?',
    answer:
      'Yes, PocketLink offers a robust free plan that includes customizable templates, unlimited links, basic analytics, and mobile optimization. For advanced features like premium content gates, detailed analytics, AI assistance, and priority support, paid plans are available starting at affordable rates.',
  },
  {
    question: 'Can I customize the design to match my brand?',
    answer:
      'Definitely! PocketLink provides extensive customization options including custom colors, fonts, layouts, and templates. You can upload your own images, adjust spacing and styling, and create a page that perfectly reflects your personal or brand aesthetic without any design limitations.',
  },
  {
    question: 'What kind of analytics does PocketLink provide?',
    answer:
      'PocketLink offers comprehensive analytics including page views, click tracking, visitor demographics, traffic sources, and engagement metrics. You can see which content performs best, where your visitors come from, and how they interact with your page to optimize your content strategy.',
  },
  {
    question: 'Can I offer exclusive or premium content through PocketLink?',
    answer:
      'Yes! PocketLink includes built-in premium content gates that let you offer exclusive videos, downloads, newsletters, or VIP access to your most engaged followers. You can create different access levels and provide special content for subscribers or paying supporters.',
  },
  {
    question: 'How does PocketLink handle multiple social media platforms?',
    answer:
      'PocketLink seamlessly integrates with all major social platforms. You can embed your latest posts, sync your social feeds, and create unified branding across Instagram, TikTok, YouTube, Twitter, and more—all from one beautiful, centralized hub that updates automatically.',
  },
  {
    question: 'Is there community support available?',
    answer:
      'Yes! PocketLink has an active Discord community where creators share tips, templates, and feedback. You also get access to setup guides, video tutorials, and responsive customer support to help you make the most of your page and connect with other creators.',
  },
];

const FrequentlyAskedQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="faqs"
      className="relative mt-12 overflow-hidden bg-white font-onest md:mt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: '-100px' }}
        className="mb-6 text-center"
      >
        <h2 className="mb-4 text-3xl font-medium text-gray-900 md:text-4xl">
          FAQ
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Everything you need to know about how PocketLink helps maximize your
          affiliate commissions
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-3xl px-4"
      >
        {faqs.map((faq, index) => (
          <motion.div key={index} variants={itemVariants} className="mb-2">
            <div
              className={`overflow-hidden rounded-xl border border-gray-200 ${
                openIndex === index ? '' : ''
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex w-full items-center justify-between bg-gray-50 p-5 text-left transition-colors focus:outline-none"
              >
                <span className="font-medium text-gray-900">
                  {faq.question}
                </span>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    openIndex === index
                      ? 'bg-gradient-to-r from-bento-violet to-bento-indigo text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <svg
                    className={`h-4 w-4 transform transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
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
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-gray-200 bg-gray-50 p-5 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-2 text-center mt-10"
      >
        <p className="text-gray-600">Still have questions, lets chat!</p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href="/contact"
          className="inline-flex items-center rounded-full bg-black px-8 py-4 font-medium text-white transition-all duration-300"
        >
          Contact us
          <svg
            className="ml-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default FrequentlyAskedQuestions;
