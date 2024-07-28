'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton'; // Import ShadCN skeleton
import {
  ChevronUp,
  LogOutIcon,
  UserRoundPen,
  Crown,
  Clock,
  Sparkles,
} from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { Coin } from 'react-bootstrap-icons';
import { signout } from '@/lib/actions/auth-actions';
import { useSubscription } from '@/app/contexts/SubscriptionContext';

export function SidebarFooterComponent() {
  const { user, setUser } = useAuth();
  const { isPremium, inFreeTrial, getRemainingTrialDays, plan } =
    useSubscription();
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  // Ensure the component renders only after hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    // Skeleton fallback while waiting for hydration
    return (
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Skeleton for avatar */}
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              {/* Skeleton for name and username */}
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* Skeleton for settings icon */}
          <Skeleton className="h-6 w-6 rounded-md" />
        </div>

        {/* Skeleton for logout button */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
        

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="mb-2 flex h-auto w-full justify-between rounded-xl border p-2">
                <div className="tour-sidebar-footer flex h-full w-full justify-between gap-2">
                  <Avatar>
                    <Image
                      fill="true"
                      src={user?.avatarURL || '/placeholder-avatar.png'}
                      alt={user?.name || 'User'}
                    />
                    <AvatarFallback>
                      {user?.name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase() || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-full leading-tight">
                    <p className="font-semibold">
                      {user?.name || 'Loading...'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.username || '...'}
                    </p>
                  </div>
                  <ChevronUp className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <SidebarMenuButton
                  className=""
                  onClick={() => router.push('/dashboard/settings')}
                >
                  <UserRoundPen /> Account
                </SidebarMenuButton>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SidebarMenuButton className="">
                  <Coin /> Billings
                </SidebarMenuButton>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SidebarMenuButton
                  className=""
                  onClick={async () => {
                    setUser(null);
                    localStorage.removeItem('user');
                    await signout();
                  }}
                >
                  <LogOutIcon /> Logout
                </SidebarMenuButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
