'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const CreateYourPocketlinkButton = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Link
        href="https://pocketlink.co/signup?referral=pocket"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white shadow-lg transition-all"
      >
        <Image
          src="/ogImg.png"
          width={20}
          height={20}
          alt="PocketLink"
          className="rounded-full"
        />
        <span>Create your pocketlink</span>
      </Link>
    </motion.div>
  );
};

export default CreateYourPocketlinkButton;
