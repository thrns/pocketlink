import React from 'react';
import { CiMenuFries } from 'react-icons/ci';
import Link from 'next/link'; // Use Next.js Link for navigation
import Image from 'next/image';

const MobileNavbar = ({ openNav, setOpenNav }) => {
  return (
    <nav className="fixed left-1/2 top-4 z-50 mx-auto flex w-[95%] -translate-x-1/2 items-center justify-between rounded-xl border border-gray-100 bg-white/70 p-3 backdrop-blur-2xl dark:border-gray-800 dark:bg-[#0b0b0b]/70 md:hidden">
      {/* Logo */}
      <div className="">
        <Link href="/">
          <div onClick={() => setOpenNav(!openNav)}>
            <Image
              width={40}
              height={40}
              src="/ogImg.png"
              alt="Pocketlink"
              className="p-1.5"
            />
          </div>
        </Link>
      </div>

      {/* Hamburger Menu Button */}
      <div>
        <button
          className="text-2xl text-black dark:text-white"
          onClick={() => setOpenNav(!openNav)}
        >
          <CiMenuFries />
        </button>
      </div>
    </nav>
  );
};

export default MobileNavbar;
