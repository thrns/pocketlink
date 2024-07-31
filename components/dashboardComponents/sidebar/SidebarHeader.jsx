'use client';

import { SidebarHeader } from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { Crown, Clock, Sparkles } from 'lucide-react';
import { useSubscription } from '@/app/contexts/SubscriptionContext';
import { useRouter } from 'next/navigation';
import { FaExclamation, FaLevelUpAlt } from 'react-icons/fa';

const SidebarHeaderComponent = ({ onClose }) => {
  const { isPremium, inFreeTrial, getRemainingTrialDays, plan } =
    useSubscription();
  const router = useRouter();

  return (
    <SidebarHeader className="relative flex items-center justify-between p-6">
      <div className="flex items-center justify-center gap-2">
        <Image src="/ogImg.png" width={25} height={25} alt="Logo" />
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          Pocketlink
        </span>

        {/* Premium Badge - Absolute Top Right */}
        {isPremium && (
          <div className="relative inline-flex items-center">
            {plan === 'business' ? (
              <>
                <span className="relative flex animate-shiny-text  items-center gap-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 p-1 text-xs font-medium text-white shadow-sm ring-1 ring-inset ring-amber-500/20 duration-100">
                  <Crown
                    size={10}
                    className="fill-yellow-100 text-yellow-100"
                  />
                </span>
              </>
            ) : plan === 'starter' ? (
              <>
                <span className="relative flex animate-shiny-text  items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-400 to-violet-500 p-1 text-xs font-medium text-white shadow-sm ring-1 ring-inset ring-violet-500/20">
                  <Crown
                    size={10}
                    className="fill-purple-100 text-purple-100"
                  />
                </span>
              </>
            ) : (
              <>
                <span className="animate-shiny-text  relative flex items-center gap-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 p-1 text-xs font-medium text-white shadow-sm ring-1 ring-inset ring-amber-500/20">
                  <Crown
                    size={10}
                    className="fill-yellow-100 text-yellow-100"
                  />
                </span>
              </>
            )}
           
          </div>
        )}
        
      </div>

      {!isPremium && inFreeTrial && (
        <div className="relative inline-flex items-center">
          <span className="relative flex animate-pulse items-center gap-2 text-xs text-bento-indigo">
            <Clock size={10} />
            Trial: {getRemainingTrialDays()} days left
          </span>
        </div>
      )}

      {!isPremium && !inFreeTrial && (
        <Link href="/pricing" className="relative inline-flex items-center">
          <span className="relative flex animate-pulse items-center gap-2 text-xs text-bento-indigo">
            <Sparkles size={10} className="text-purple-100" />
            Get Premium
          </span>
        </Link>
      )}
    </SidebarHeader>
  );
};

export default SidebarHeaderComponent;
