'use client';

import React from 'react';
import { Container } from '@/components/ui/container';
import Footer from '../components/Footer';

const AboutUsPage = () => {
  return (
    <>
      <Container className="w-full py-40">
        <h1 className="mb-6 text-3xl font-bold">About Pocketlink</h1>

        <div className="prose dark:prose-invert">
          <p className="mb-4">
            Pocketlink is an{' '}
            <strong>AI-powered creator-led e-commerce platform</strong> that
            revolutionizes how creators turn content directly into commerce. We
            combine the simplicity of conversational automation, robust
            e-commerce capabilities, and hyperpersonalized design to create the
            ultimate content-to-commerce hub.
          </p>

          <h2 className="mb-3 mt-6 text-xl font-semibold">
            The Creator-Led E-commerce Revolution
          </h2>
          <p>
            We're positioned at the forefront of the creator-led e-commerce
            movement—a fundamentally different approach from traditional
            e-commerce that integrates{' '}
            <strong>content as the primary sales driver</strong> rather than
            treating it as separate marketing activity. This addresses the core
            limitation that existing solutions fail to solve effectively.
          </p>

          <h2 className="mb-3 mt-6 text-xl font-semibold">
            What Makes Us Different
          </h2>
          <p className="mb-4">
            Unlike traditional link-in-bio tools or complex e-commerce
            platforms, Pocketlink makes{' '}
            <strong>content the primary sales interface</strong>. We're the only
            platform that seamlessly integrates content presentation,
            conversational commerce, AI personalization, and full e-commerce
            functionality in a creator-optimized package.
          </p>

          <ul className="my-3 list-disc pl-6">
            <li>
              <strong>Content-First Commerce:</strong> Your content becomes your
              storefront, creating more authentic and engaging purchase
              experiences.
            </li>
            <li>
              <strong>AI-Powered Hyperpersonalization:</strong> Provide
              personalized experiences to thousands of followers simultaneously
              with our proprietary AI engine.
            </li>
            <li>
              <strong>Integrated Business Operations:</strong> Sell products,
              automate conversations, and track analytics—all from one
              creator-optimized platform.
            </li>
            <li>
              <strong>Owned Customer Relationships:</strong> Build direct
              relationships with your audience instead of competing for
              attention on social platforms.
            </li>
          </ul>

          <h2 className="mb-3 mt-6 text-xl font-semibold">Our Mission</h2>
          <p>
            To dominate the creator-led e-commerce space by becoming the
            definitive platform where{' '}
            <strong>content becomes the storefront</strong>. We empower creators
            to build sustainable, scalable businesses that own their customer
            relationships and revenue streams.
          </p>

          <h2 className="mb-3 mt-6 text-xl font-semibold">Contact Us</h2>
          <p>
            We're here to support you! If you have questions, feedback, or need
            assistance, feel free to reach out:
          </p>
          <div className="mt-3">
            <p>
              <strong>Pocketlink Headquarters:</strong>
            </p>
            <p>Astrapi Money Pvt Ltd</p>
            
            <p className="mt-2">
              Email:{' '}
              <a
                href="mailto:support@pocketlink.co"
                className="text-black dark:text-white"
              >
                support@pocketlink.co
              </a>
            </p>
            <p>Phone: +91 9840572975</p>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default AboutUsPage;
