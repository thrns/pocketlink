'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, BarChart3, Users, MoreHorizontal, Crown } from 'lucide-react';
import { FaPeopleGroup } from 'react-icons/fa6';
import { useSubscription } from '@/app/contexts/SubscriptionContext';
import { FEATURES } from '@/constants/features';

export default function BottomNavigation() {
  const pathname = usePathname();
  const { canAccessFeature } = useSubscription();

  // Navigation items based on the actual sidebar structure
  const navItems = [
    {
      label: 'Home',
      href: '/dashboard',
      icon: Home,
      isActive:
        pathname === '/dashboard' ||
        pathname.startsWith('/dashboard/theme') ||
        pathname.startsWith('/dashboard/templates'),
    },
    {
      label: 'Insights',
      href: '/dashboard/analytics?preview=true',
      icon: BarChart3,
      isActive: pathname.startsWith('/dashboard/analytics'),
      isPremium: !canAccessFeature(FEATURES.ADVANCED_ANALYTICS),
    },
    {
      label: 'Audience',
      href: '/dashboard/subscriptions',
      icon: FaPeopleGroup,
      isActive: pathname.startsWith('/dashboard/subscriptions'),
      isPremium: !canAccessFeature(FEATURES.PAID_SUBSCRIPTIONS),
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
        {navItems.map((item) => {
          const IconComponent = item.icon;
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
                {item.isPremium && (
                  <Crown className="absolute -right-1 -top-1 h-3 w-3 fill-bento-indigo text-bento-indigo" />
                )}
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
