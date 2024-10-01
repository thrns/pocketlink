'use client';

import React from 'react';
import { useSubscription } from '@/app/contexts/SubscriptionContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  Gift,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

export default function SubscriptionStatus() {
  const {
    loading,
    isPremium,
    isActive,
    inFreeTrial,
    plan,
    cycle,
    expiry,
    freeTrialEndsAt,
    getRemainingTrialDays,
    getFormattedExpiryDate,
    checkoutUrl,
  } = useSubscription();

  const router = useRouter();

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200"></div>
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-2">
      {inFreeTrial && (
        <div className="bg-amber-400 py-1 text-center text-sm font-medium text-amber-900">
          Free trial - {getRemainingTrialDays()} days remaining
        </div>
      )}

      {isActive && (
        <div className="bg-green-500 py-1 text-center text-sm font-medium text-white">
          Active subscription
        </div>
      )}

      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          {isPremium ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Premium Features Active</span>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-red-500" />
              <span>Premium Features Inactive</span>
            </>
          )}
        </CardTitle>
        <CardDescription>
          {isPremium
            ? inFreeTrial
              ? "You're currently using premium features during your free trial period."
              : 'Your subscription is active and premium features are enabled.'
            : "You don't currently have access to premium features."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Plan</span>
            </div>
            <Badge variant={plan === 'premium' ? 'default' : 'outline'}>
              {plan === 'premium' ? 'Premium' : 'Free'}
            </Badge>
          </div>

          {isActive && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Billing Cycle</span>
                </div>
                <span className="text-sm font-medium">
                  {cycle === 'yearly'
                    ? 'Annual'
                    : cycle === 'monthly'
                      ? 'Monthly'
                      : 'N/A'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Renews On</span>
                </div>
                <span className="text-sm font-medium">
                  {getFormattedExpiryDate('subscription')}
                </span>
              </div>
            </>
          )}

          {inFreeTrial && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Trial Ends</span>
              </div>
              <span className="text-sm font-medium">
                {getFormattedExpiryDate('trial')}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 pt-2">
        {!isActive && (
          <Button
            onClick={() => router.push(checkoutUrl)}
            className="w-full bg-gradient-to-r from-purple-600 from-purple-700 to-blue-500 to-blue-600"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {inFreeTrial ? 'Subscribe Now' : 'Get Premium'}
          </Button>
        )}

        {isActive && (
          <Button variant="outline" size="sm">
            Manage Subscription
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
