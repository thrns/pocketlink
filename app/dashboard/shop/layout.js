'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, Package, BarChart3, Settings, Tag } from 'lucide-react';
import Link from 'next/link';

export default function ShopLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Define shop navigation items
  const shopNavItems = [
    {
      label: 'Dashboard',
      href: '/dashboard/shop',
      icon: BarChart3,
      active: pathname === '/dashboard/shop',
    },
    {
      label: 'Inventory',
      href: '/dashboard/shop/inventory',
      icon: Package,
      active: pathname.startsWith('/dashboard/shop/inventory'),
    },
    {
      label: 'Discounts',
      href: '/dashboard/shop/discounts',
      icon: Tag,
      active: pathname.startsWith('/dashboard/shop/discounts'),
    },
  ];

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto bg-gray-50/50">
      {/* Clean Tab Navigation
      <div className="border-b border-gray-200/80 bg-white ">
        <div className="flex items-center justify-center px-6 py-4">
          <Tabs value={pathname} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100/80 p-1 shadow-inner">
              {shopNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <TabsTrigger 
                    value={item.href}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]: bg-white/60"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </TabsTrigger>
                </Link>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div> */}

      {/* Page Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </main>
  );
}
