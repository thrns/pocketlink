'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Palette, Layout, MoreHorizontal, Move } from 'lucide-react';
import { useController } from '@/app/contexts/ControllerContext';

export default function HomeBottomNav() {
  const pathname = usePathname();
  const { isMobileArrange, setIsMobileArrange } = useController();

  // Handle reArrange button click
  const handleReArrange = () => {
    setIsMobileArrange(!isMobileArrange);
  };

  // Navigation items for home page
  const navItems = [
    {
      label: 'reArrange',
      action: handleReArrange,
      icon: Move,
      isActive: false, // This is an action, not a route
    },
    {
      label: 'Theme',
      href: '/dashboard/theme',
      icon: Palette,
      isActive: pathname.startsWith('/dashboard/theme'),
    },
    {
      label: 'Templates',
      href: '/dashboard/templates',
      icon: Layout,
      isActive: pathname.startsWith('/dashboard/templates'),
    },
    {
      label: 'More',
      href: '/dashboard/more',
      icon: MoreHorizontal,
      isActive: pathname === '/dashboard/more',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          
          // If it's an action (reArrange), render as button
          if (item.action) {
            return (
              <button
                key={index}
                onClick={item.action}
                className={`flex flex-col items-center justify-center rounded-lg px-3 py-2 transition-colors duration-200 ${
                  item.isActive
                    ? 'bg-bento-indigo/10 text-bento-indigo'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="relative">
                  <IconComponent
                    size={20}
                    className={
                      item.isActive ? 'text-bento-indigo' : 'text-gray-600'
                    }
                  />
                </div>
                <span
                  className={`mt-1 text-xs font-medium ${
                    item.isActive ? 'text-bento-indigo' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          // Otherwise, render as Link
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-lg px-3 py-2 transition-colors duration-200 ${
                item.isActive
                  ? 'bg-bento-indigo/10 text-bento-indigo'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="relative">
                <IconComponent
                  size={20}
                  className={
                    item.isActive ? 'text-bento-indigo' : 'text-gray-600'
                  }
                />
              </div>
              <span
                className={`mt-1 text-xs font-medium ${
                  item.isActive ? 'text-bento-indigo' : 'text-gray-600'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}