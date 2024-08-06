import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Home,
  Bot,
  BarChart2,
  TrendingUp,
  Share2,
  Globe,
  Wand2,
  Palette,
} from 'lucide-react';

// First, define premium features array
const premiumFeatures = [
  'Sales Bot',
  'Analytics',
  'Traffic Analytics',
  'Custom Domain',
  'AI Templates',
  'Premium Themes',
];

const navigationItems = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Sales Bot', // Premium
    href: '/dashboard/sales',
    icon: Bot,
  },
  {
    name: 'Analytics', // Premium
    href: '/dashboard/analytics',
    icon: BarChart2,
  },
  {
    name: 'Traffic Analytics', // Premium
    href: '/dashboard/traffic',
    icon: TrendingUp,
  },
  {
    name: 'Custom Domain', // Premium
    href: '/dashboard/domain',
    icon: Globe,
  },
  {
    name: 'AI Templates', // Premium
    href: '/dashboard/templates',
    icon: Wand2,
  },
  {
    name: 'Premium Themes', // Premium
    href: '/dashboard/themes',
    icon: Palette,
  },
];

// Then in the navigation items mapping
{
  navigationItems.map((item) => (
    <Link
      key={item.name}
      href={item.href}
      className={cn(
        'flex items-center gap-2 rounded-lg px-3 py-2 transition-colors',
        pathname === item.href
          ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
          : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50'
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.name}</span>
      {premiumFeatures.includes(item.name) && !isPremium && (
        <Crown className="ml-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
      )}
    </Link>
  ));
}
