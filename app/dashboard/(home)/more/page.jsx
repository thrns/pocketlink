'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  Settings,
  UserCog,
  CreditCard,
  HelpCircle,
  MessageSquare,
  Star,
  LogOut,
  ShoppingCart,
  Bot,
  Cable,
  Megaphone,
  EyeIcon,
  List,
  FileText,
  ShoppingBag,
  ContainerIcon,
  Crown,
  Workflow,
  Home,
  Edit2Icon,
  Palette,
  PieChart,
  BicepsFlexed,
} from 'lucide-react';
import { CiDiscount1 } from 'react-icons/ci';
import { FaPeopleGroup } from 'react-icons/fa6';
import { useAuth } from '@/app/contexts/AuthContext';
import { useSubscription } from '@/app/contexts/SubscriptionContext';
import { FEATURES } from '@/constants/features';

export default function MorePage() {
  const router = useRouter();
  const { logout } = useAuth();
  const { canAccessFeature } = useSubscription();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuSections = [
    {
      title: 'HOME',
      items: [
        {
          name: 'Edit',
          href: '/dashboard',
          icon: Edit2Icon,
          isPremium: false,
        },
        {
          name: 'Theme',
          href: '/dashboard/theme',
          icon: Palette,
          isPremium: false,
        },
        {
          name: 'Templates',
          href: '/dashboard/templates',
          icon: FileText,
          isPremium: false,
        },
      ],
    },
    {
      title: 'ANALYTICS',
      items: [
        {
          name: 'Overview',
          href: '/dashboard/analytics?preview=true',
          icon: PieChart,
          isPremium: !canAccessFeature(FEATURES.ADVANCED_ANALYTICS),
        },
        {
          name: 'Performance',
          href: '/dashboard/analytics/performance?preview=true',
          icon: BicepsFlexed,
          isPremium: !canAccessFeature(FEATURES.ADVANCED_ANALYTICS),
        },
      ],
    },
    {
      title: 'SUBSCRIPTIONS',
      items: [
        {
          name: 'Audience',
          href: '/dashboard/subscriptions',
          icon: FaPeopleGroup,
          isPremium: !canAccessFeature(FEATURES.PAID_SUBSCRIPTIONS),
        },
      ],
    },
    {
      title: 'MARKETING',
      items: [
        {
          name: 'Overview',
          href: '/dashboard/marketing',
          icon: EyeIcon,
          isPremium: !canAccessFeature(FEATURES.EMAIL_MARKETING),
        },
        {
          name: 'Lists',
          href: '/dashboard/marketing/lists',
          icon: List,
          isPremium: !canAccessFeature(FEATURES.EMAIL_MARKETING),
        },
        {
          name: 'Campaigns',
          href: '/dashboard/marketing/campaigns',
          icon: MessageSquare,
          isPremium: !canAccessFeature(FEATURES.EMAIL_MARKETING),
        },
        {
          name: 'Templates',
          href: '/dashboard/marketing/templates',
          icon: FileText,
          isPremium: !canAccessFeature(FEATURES.EMAIL_MARKETING),
        },
      ],
    },
    {
      title: 'AUTOMATION',
      items: [
        {
          name: 'Chatbot',
          href: '/dashboard/sales-bot',
          icon: Bot,
          isPremium: !canAccessFeature(FEATURES.SALES_BOT),
        },
        {
          name: 'Auto DMs',
          href: '#',
          icon: MessageSquare,
          isPremium: true,
          comingSoon: true,
        },
        {
          name: 'Auto Comments',
          href: '#',
          icon: MessageSquare,
          isPremium: true,
          comingSoon: true,
        },
        {
          name: 'Lead Magnets',
          href: '#',
          icon: Megaphone,
          isPremium: true,
          comingSoon: true,
        },
      ],
    },
    {
      title: 'SHOP',
      items: [
        {
          name: 'Purchases',
          href: '/dashboard/shop',
          icon: ShoppingBag,
          isPremium: !canAccessFeature(FEATURES.ECOMMERCE_SHOP),
        },
        {
          name: 'Inventory',
          href: '/dashboard/shop/inventory',
          icon: ContainerIcon,
          isPremium: !canAccessFeature(FEATURES.ECOMMERCE_SHOP),
        },
        {
          name: 'Discounts',
          href: '/dashboard/shop/discounts',
          icon: CiDiscount1,
          isPremium: !canAccessFeature(FEATURES.ECOMMERCE_SHOP),
        },
      ],
    },
    {
      title: 'TOOLS',
      items: [
        {
          name: 'Integrations',
          href: '/dashboard/integrations',
          icon: Cable,
          isPremium: false,
        },
      ],
    },
    {
      title: 'ACCOUNT',
      items: [
        {
          name: 'Settings',
          href: '/dashboard/settings',
          icon: Settings,
          isPremium: false,
        },
      ],
    },
  ];

  return (
    <div className="flex h-full w-full flex-col overflow-auto">
      <div className="min-h-screen space-y-8 px-4 py-6">
        {menuSections.map((section) => (
          <div key={section.title}>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {section.title}
            </h2>
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              {section.items.map((item, index) => {
                const IconComponent = item.icon;
                const isComingSoon = item.comingSoon;
                const isDisabled = isComingSoon || item.href === '#';
                
                const content = (
                  <div
                    className={`flex items-center justify-between p-4 transition-colors ${
                      isDisabled 
                        ? 'cursor-not-allowed opacity-60' 
                        : 'hover:bg-gray-50'
                    } ${
                      index !== section.items.length - 1
                        ? 'border-b border-gray-100'
                        : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                        {item.isPremium && (
                          <Crown className="absolute -right-1 -top-1 h-3 w-3 fill-purple-400 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {item.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isComingSoon && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                          Soon
                        </span>
                      )}
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                );

                return isDisabled ? (
                  <div key={`${item.href}-${index}`}>
                    {content}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center rounded-lg p-4 text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="mr-2 h-5 w-5" />
            <span className="font-medium">Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
