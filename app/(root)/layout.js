'use client';

// React Imports
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Navigation Components
import Navbar from '@/components/landingpageComponents/Navigation/Navbar';
import MobileNavbar from '@/components/landingpageComponents/Navigation/MobileNavbar';

// Context Providers
import { ItemsProvider } from '../contexts/ItemsContext';
import { ControllerProvider } from '../contexts/ControllerContext';
import { ThemeProvider } from '../contexts/ThemeContext';

// Font imports
import { Onest } from 'next/font/google';

// Load Onest font from Google
const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-onest',
  display: 'swap',
});

import '../../components/styles.css'; // Import component styles at the top

export default function RootLayout({ children }) {
  // State for navigation and tenant checking
  const [openNav, setOpenNav] = useState(false);
  const [isTenant, setIsTenant] = useState(false);
  const pathname = usePathname();

  // Check if current hostname is a tenant subdomain
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      const parts = host.split('.');
      setIsTenant(parts.length > 2 && parts[0] !== 'localhost');
    }
  }, []);

  // Paths where the navigation should be shown
  const publicPaths = [
    '/',
    '/login',
    '/signup',
    '/privacy',
    '/terms',
    '/templates',
    '/contact',
    '/store',
    '/about-us',
    '/pricing',
    '/blog',
    '/refund-policy',
  ];

  // Only show navbar on public paths and when not on tenant subdomains
  const showNavbar = publicPaths.includes(pathname) && !isTenant;

  return (
    <main className={`flex min-h-screen w-full ${onest.variable} `}>
      <aside className="flex w-full flex-col items-start">
        {/* Navigation Components */}
        {showNavbar && <Navbar openNav={openNav} setOpenNav={setOpenNav} />}
        {showNavbar && (
          <MobileNavbar openNav={openNav} setOpenNav={setOpenNav} />
        )}

        {/* Application Providers */}
        <ControllerProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <ItemsProvider>{children}</ItemsProvider>
          </ThemeProvider>
        </ControllerProvider>
      </aside>
    </main>
  );
}
