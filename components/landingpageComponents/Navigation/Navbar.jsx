// components/Navbar.js
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { Menu, Link2, Bot, ShoppingCart, Workflow, Clock } from 'lucide-react';
import UserPopup from './UserPopup';

// Import shadcn Navigation Menu components
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

// Import component styles first
import '../../styles.css';

const Navbar = ({ openNav, setOpenNav, user }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener to track when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      // Show navbar background as soon as user starts scrolling
      if (window.scrollY > 10) {
        // Using a small threshold for better UX
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (section) => {
    // Close the mobile nav
    setOpenNav(false);

    // If not on homepage, navigate to homepage with hash
    if (pathname !== '/') {
      router.push(`/#${section}`);
      return;
    }

    // If on homepage, scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle hash navigation on page load
  useEffect(() => {
    if (typeof window !== 'undefined' && pathname === '/') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [pathname]);

  // Dynamic navbar styles based on scroll position
  const navbarStyles = scrolled
    ? 'bg-white dark:bg-[#0b0b0b] border border-gray-100 dark:border-gray-800  '
    : 'bg-transparent border-transparent';

  // Dynamic bg and text color based on scroll position
  const bgTextColor = scrolled
    ? 'text-black dark:text-white hover:bg-zinc-800 hover:text-white'
    : 'text-black hover:bg-zinc-100 hover:text-black';

  return (
    <>
      {/* Desktop Navigation using shadcn NavigationMenu */}
      <div
        className={`fixed left-1/2 top-4 z-50 mx-auto hidden w-[95%] max-w-7xl -translate-x-1/2 items-center justify-between rounded-xl px-8 py-2.5 transition-all duration-300 md:flex ${navbarStyles}`}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`flex items-center gap-1.5 text-xl font-medium`}
        >
          <Image
            width={40}
            height={40}
            src="/ogImg.png"
            alt="Pocketlink"
            className="p-1.5"
          />
          Pocketlink
        </Link>

        {/* Navigation Menu */}
        {!user && (
          <NavigationMenu>
            <NavigationMenuList>
              {/* <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()}
                  onClick={() => scrollToSection("home")}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem> */}

              {/* Products Dropdown Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`${bgTextColor} bg-transparent`}
                >
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                    {/* Link in Bio */}
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md bg-slate-100 p-3 leading-none no-underline outline-none transition-colors dark:bg-slate-800">
                        <div className="flex items-center gap-2">
                          <div className="rounded-md bg-slate-100 p-2 dark:bg-slate-800">
                            <Link2 size={20} className="text-bento-violet" />
                          </div>
                          <div>
                            <div className="text-sm font-medium leading-none">
                              Link in Bio
                            </div>
                            <p className="mt-1 line-clamp-2 text-sm leading-snug text-slate-500 dark:text-slate-400">
                              Create a beautiful story telling page for your
                              audience
                            </p>
                          </div>
                        </div>
                      </NavigationMenuLink>
                    </Link>

                    {/* Automation Canvas - Coming Soon */}
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none">
                      <div className="flex items-center gap-2">
                        <div className="rounded-md bg-slate-100 p-2 dark:bg-slate-800">
                          <Workflow size={20} className="text-blue-500" />
                        </div>
                        <div>
                          <div className="flex items-center text-sm font-medium leading-none">
                            Automation Canvas
                            <span className="ml-2 rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                              Soon
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-sm leading-snug text-slate-500 dark:text-slate-400">
                            Build automated workflows with our powerful visual
                            canvas
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Customer Support Agents - Coming Soon */}
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none">
                      <div className="flex items-center gap-2">
                        <div className="rounded-md bg-slate-100 p-2 dark:bg-slate-800">
                          <Bot size={20} className="text-green-500" />
                        </div>
                        <div>
                          <div className="flex items-center text-sm font-medium leading-none">
                            Customer Support Agents
                            <span className="ml-2 rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                              Soon
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-sm leading-snug text-slate-500 dark:text-slate-400">
                            AI-powered support agents that handle customer
                            inquiries 24/7
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 2 Click Checkout - Coming Soon */}
                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none">
                      <div className="flex items-center gap-2">
                        <div className="rounded-md bg-slate-100 p-2 dark:bg-slate-800">
                          <ShoppingCart size={20} className="text-purple-500" />
                        </div>
                        <div>
                          <div className="flex items-center text-sm font-medium leading-none">
                            2 Click Checkout
                            <span className="ml-2 rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                              Soon
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-sm leading-snug text-slate-500 dark:text-slate-400">
                            Streamlined checkout process for faster conversions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem className="cursor-pointer">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${bgTextColor} bg-transparent`}
                  onClick={() => scrollToSection('features')}
                >
                  Features
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* <NavigationMenuItem>
                <Link href="/templates" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} ${bgTextColor} bg-transparent`}
                  >
                    Explore
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem> */}

              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} ${bgTextColor} bg-transparent`}
                  >
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="cursor-pointer">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${bgTextColor} bg-transparent`}
                  onClick={() => scrollToSection('faqs')}
                >
                  FAQs
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/blog"
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} ${bgTextColor} bg-transparent`}
                  >
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* User Menu */}
        <div className="z-10">
          <UserPopup
            user={user}
            setOpenNav={setOpenNav}
            openNav={openNav}
            scrolled={scrolled}
          />
        </div>
      </div>

      {/* Mobile menu toggle button */}
      <div className="fixed right-4 top-4 z-50 md:hidden">
        <button
          className={`rounded-md p-2 transition-all duration-300 ${
            scrolled
              ? 'bg-gray-100 text-black dark:bg-gray-800 dark:text-white'
              : 'bg-transparent text-white'
          }`}
          onClick={() => setOpenNav(!openNav)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <nav
        className={`fixed z-40 mx-auto flex w-full flex-col items-center justify-center gap-8 ${
          openNav ? 'top-0' : 'top-[-150%]'
        } left-0 h-screen rounded-b-2xl transition-all duration-500 ease-in-out md:hidden ${
          scrolled
            ? 'bg-white text-black dark:bg-[#0b0b0b] dark:text-white'
            : 'bg-white/95 dark:bg-[#0b0b0b]/95'
        }`}
      >
        {/* Close Button for Mobile */}
        <button
          className="absolute right-4 top-6 text-4xl text-black dark:text-white"
          onClick={() => setOpenNav(false)}
        >
          <IoCloseSharp />
        </button>

        {/* Logo */}
        <div className="mt-16">
          <Link href="/" onClick={() => setOpenNav(false)}>
            <span className="flex items-center justify-center gap-2 text-2xl">
              <Image
                width={50}
                height={50}
                src="/ogImg.png"
                alt="Pocketlink"
                className="p-2"
              />
              Pocketlink
            </span>
          </Link>
        </div>

        {/* Mobile Navigation Links */}
        {!user && (
          <div className="flex w-full flex-col items-center gap-6 px-6 text-lg">
            <button
              onClick={() => scrollToSection('home')}
              className="w-full py-2 text-center text-bento-violet transition-colors"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection('features')}
              className="w-full py-2 text-center text-bento-violet transition-colors"
            >
              Features
            </button>
            <Link
              href="/pricing"
              onClick={() => setOpenNav(false)}
              className="w-full py-2 text-center text-bento-violet transition-colors"
            >
              Pricing
            </Link>
            <button
              onClick={() => scrollToSection('faqs')}
              className="w-full py-2 text-center text-bento-violet transition-colors"
            >
              FAQs
            </button>
            <Link
              href="/blog"
              onClick={() => setOpenNav(false)}
              className="w-full py-2 text-center text-bento-violet transition-colors"
            >
              Blog
            </Link>
          </div>
        )}

        {/* Mobile User Menu */}
        <div className="mt-8">
          <UserPopup
            user={user}
            setOpenNav={setOpenNav}
            openNav={openNav}
            scrolled={scrolled}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
