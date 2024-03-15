'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaDiscord,
  FaFacebook,
} from 'react-icons/fa';
import Image from 'next/image';
import LazyImage from './LazyImage';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden rounded-t-3xl bg-gray-100 pb-8 pt-16 font-onest">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Main Footer Content */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Logo and Tagline */}
          <div className="text-center md:col-span-4 md:text-left">
            <div className="mb-4 flex items-center justify-center md:justify-start">
              {/* Logo with LazyImage */}
              <div className="relative mr-4 h-[30px] w-[30px]">
                <LazyImage
                  src="/ogImg.png"
                  alt="PocketLink logo"
                  width={30}
                  height={30}
                />
              </div>
              <span className="text-xl font-semibold text-black">
                Pocketlink
              </span>
            </div>

            <h2 className="mb-4 text-2xl font-medium text-black md:text-3xl">
              <span>Beyond Link in bio</span>
            </h2>

            <p className="mb-6 text-black/80">
              Empowering Creator Economy with AI and Design.
            </p>

            {/* Social Icons */}
            <div className="flex justify-center space-x-4 md:justify-start">
              <SocialIcon
                icon={<FaTwitter size={18} />}
                href="https://twitter.com/pocketlinkco"
              />
              <SocialIcon
                icon={<FaLinkedin size={18} />}
                href="https://www.linkedin.com/company/pocketlink/"
              />
              <SocialIcon
                icon={<FaFacebook size={18} />}
                href="https://www.facebook.com/people/Pocketlink/61577724813375/"
              />
              <SocialIcon
                icon={<FaInstagram size={18} />}
                href="https://www.instagram.com/pocketlink.co/"
              />
              <SocialIcon
                icon={<FaDiscord size={18} />}
                href="https://discord.gg/hwc8gNhdSJ"
              />
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="text-center md:col-span-2 md:text-left">
            <h3 className="mb-4 font-semibold text-black">Pages</h3>
            <ul className="space-y-3">
              <FooterLink href="/login">Login</FooterLink>
              <FooterLink href="/signup">Signup</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/about-us">About Us</FooterLink>
              <FooterLink href="/blog">
                Blog
              </FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </ul>
          </div>

          <div className="text-center md:col-span-2 md:text-left">
            <h3 className="mb-4 font-semibold text-black">Legal</h3>
            <ul className="space-y-3">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/refund-policy">Refund Policy</FooterLink>
            </ul>
          </div>

          <div className="text-center md:col-span-4 md:text-left">
            <h3 className="mb-4 font-semibold text-black">Subscribe</h3>
            <p className="mb-4 text-black/80">
              Get the latest news and updates from Pocketlink
            </p>

            {/* Newsletter Signup */}
            <div className="flex justify-center md:justify-start">
              <input
                disabled
                type="email"
                placeholder="Enter your email (coming soon)"
                className="rounded-l-lg border border-black/20 bg-white/10 px-4 py-2 text-black placeholder-black/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                disabled
                className="rounded-r-lg bg-black px-4 py-2 font-medium text-purple-200"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 border-t border-white/20 pt-6"></div>

        {/* Bottom Info Section */}
        <div className="flex flex-col items-center justify-between text-sm text-black/60 md:flex-row">
          <p className="text-center md:text-left">
            © Pocketlink {currentYear}. All rights reserved
          </p>

          {/* Company Address - Indian Address for Legal Compliance */}
          <div className="mt-4 text-center md:mt-0 md:text-right">
            <p className="text-xs text-black/40">
              Pocketlink is a product of Astrapi Money Pvt Ltd
            </p>
            <p className="text-xs text-black/40">CIN: U62011TN2024PTC172257</p>
          </div>
        </div>

        {/* Additional Legal Address Info - Enhanced for SEO but kept discreet */}
        <div className="mt-6 text-center text-xs text-black/40">
          {/* <p>Sf No 61/2 7a1/a2,b Bl 1c, Kaveri Ngr,velapanchavadi, Ayapakkam, Tiruvallur, Poonamallee, Tamil Nadu, India, 600077</p> */}
          {/* <p>Phone: +91 9840572975 | Email: support@pocketlink.co</p> */}
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }) => (
  <li>
    <Link href={href} className="text-black text-black/70 transition-colors">
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ icon, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, y: -3 }}
    whileTap={{ scale: 0.95 }}
    className="flex h-10 w-10 items-center justify-center rounded-full bg-white bg-white/10 text-black text-purple-600 backdrop-blur-sm transition-colors"
  >
    {icon}
  </motion.a>
);

export default Footer;
