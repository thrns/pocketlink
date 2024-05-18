'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/Clients/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import {
  Check,
  AlertCircle,
  Info,
  XCircle,
  ArrowLeft,
  Frown,
  Mail,
  Shield,
  Clock,
} from 'lucide-react';
import Image from 'next/image';

export default function UnsubscribePage({ params }) {
  const { tenant } = params;
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('loading');
  const [tenantName, setTenantName] = useState(tenant || '');

  // Check subscription status immediately when component mounts
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (!email || !tenant) {
        setStatus('error');
        setLoading(false);
        return;
      }

      try {
        // Fetch the subscription data for this tenant
        const { data, error: fetchError } = await supabase
          .from('subscriptions')
          .select('subscribed, unsubscribed')
          .eq('username', tenant)
          .single();

        if (fetchError) {
          console.error('Error fetching subscription data:', fetchError);
          setStatus('error');
          return;
        }

        // Check if the user exists in subscribed or unsubscribed lists
        const subscribed = data?.subscribed || [];
        const unsubscribed = data?.unsubscribed || [];

        // Check if already unsubscribed
        const isAlreadyUnsubscribed = unsubscribed.some(
          (item) => item.email?.toLowerCase() === email.toLowerCase()
        );

        if (isAlreadyUnsubscribed) {
          setStatus('success');
          return;
        }

        const isSubscribed = subscribed.some(
          (member) => member.email?.toLowerCase() === email.toLowerCase()
        );

        if (!isSubscribed) {
          setStatus('not-found');
        } else {
          setStatus('confirm');
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
        setStatus('error');
      } finally {
        setLoading(false);
      }
    };

    checkSubscriptionStatus();
  }, [email, tenant]);

  const handleUnsubscribe = async () => {
    if (!email || !tenant) {
      toast.error('Missing required information', {
        description: 'Email or account information is missing.',
      });
      setStatus('error');
      return;
    }

    setLoading(true);

    try {
      // Fetch the subscription data for this tenant
      const { data, error: fetchError } = await supabase
        .from('subscriptions')
        .select('subscribed, unsubscribed')
        .eq('username', tenant)
        .single();

      if (fetchError) {
        console.error('Error fetching subscription data:', fetchError);
        setStatus('error');
        setLoading(false);
        return;
      }

      // Check if the user exists in the subscribed list
      const subscribed = data?.subscribed || [];
      const unsubscribed = data?.unsubscribed || [];

      // Find the member to be unsubscribed
      const memberToUnsubscribe = subscribed.find(
        (member) => member.email?.toLowerCase() === email.toLowerCase()
      );

      if (!memberToUnsubscribe) {
        setStatus('not-found');
        setLoading(false);
        return;
      }

      // Remove from subscribed list
      const updatedSubscribed = subscribed.filter(
        (member) => member.email?.toLowerCase() !== email.toLowerCase()
      );

      // Add to unsubscribed list with timestamp and member data
      const unsubscribeEntry = {
        ...memberToUnsubscribe,
        unsubscribed_at: new Date().toISOString(),
      };

      const updatedUnsubscribed = [...unsubscribed, unsubscribeEntry];

      // Update the subscription data
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({
          subscribed: updatedSubscribed,
          unsubscribed: updatedUnsubscribed,
        })
        .eq('username', tenant);

      if (updateError) {
        console.error('Error updating subscription data:', updateError);
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch (error) {
      console.error('Unsubscribe operation failed:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Handle different states for the UI
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center p-8 text-center">
            <div className="relative mb-6">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-violet-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Mail className="h-6 w-6 text-violet-500" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              Checking subscription status...
            </h3>
            <p className="text-sm text-gray-500">
              Please wait while we verify your subscription
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="p-8 text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full border border-green-200 bg-green-50 p-4">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Successfully Unsubscribed
            </h2>
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <p className="mb-2 text-sm text-gray-700">
                <span className="font-medium">{email}</span> has been removed
                from
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {tenantName}'s mailing list
              </p>
            </div>
            <div className="mb-6 flex items-center justify-center gap-2 text-sm text-green-600">
              <Shield className="h-4 w-4" />
              <span>
                Your information is safely stored for compliance purposes
              </span>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                className="mx-auto flex items-center gap-2 border-gray-300 bg-gray-50 px-6 py-2 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Visit {tenantName}'s page
              </Button>
            </Link>
          </div>
        );

      case 'error':
        return (
          <div className="p-8 text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full border border-red-200 bg-red-50 p-4">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Something Went Wrong
            </h2>
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">
                We encountered an error while processing your unsubscribe
                request. This could be due to a temporary issue with our
                servers.
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-violet-500 from-violet-600 to-purple-600 to-purple-700 text-white transition-colors"
              >
                Try Again
              </Button>
              <Link href="/">
                <Button
                  variant="outline"
                  className="flex w-full items-center justify-center gap-2 border-gray-300 bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Return to homepage
                </Button>
              </Link>
            </div>
          </div>
        );

      case 'not-found':
        return (
          <div className="p-8 text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full border border-yellow-200 bg-yellow-50 p-4">
              <Info className="h-10 w-10 text-yellow-600" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Email Not Found
            </h2>
            <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="mb-2 text-sm text-yellow-800">The email address</p>
              <p className="mb-2 rounded border border-yellow-300 bg-white px-3 py-2 font-mono text-sm text-gray-900">
                {email}
              </p>
              <p className="text-sm text-yellow-800">
                is not currently subscribed to{' '}
                <span className="font-medium">{tenantName}'s</span> mailing
                list.
              </p>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                className="mx-auto flex items-center gap-2 border-gray-300 bg-gray-50 px-6 py-2 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to homepage
              </Button>
            </Link>
          </div>
        );

      case 'confirm':
        return (
          <div className="p-8 text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 p-4">
              <Frown className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Confirm Unsubscribe
            </h2>
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="mb-3 text-sm text-blue-800">
                You are about to unsubscribe from{' '}
                <span className="font-semibold">{tenantName}'s</span> mailing
                list.
              </p>
              <div className="mb-3 flex items-center justify-center gap-2 text-xs text-blue-700">
                <Mail className="h-4 w-4" />
                <span className="rounded border border-blue-300 bg-white px-2 py-1 font-mono">
                  {email}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-blue-600">
                <Clock className="h-3 w-3" />
                <span>This action will take effect immediately</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleUnsubscribe}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-500 from-red-600 to-red-600 to-red-700 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Processing...
                  </div>
                ) : (
                  'Confirm Unsubscribe'
                )}
              </Button>
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Keep me subscribed
                </Button>
              </Link>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              <Shield className="h-3 w-3" />
              <span>
                Your information will be stored for compliance purposes
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 pt-24">
      {/* Enhanced Navigation Bar */}
      <div className="fixed left-0 top-4 z-50 w-full">
        <div className="mx-auto flex w-[95%] max-w-7xl items-center justify-between rounded-2xl border border-white/20 bg-white/80 px-8 py-3 shadow-lg backdrop-blur-md">
          <Link
            href="https://www.pocketlink.co"
            className="flex items-center gap-2"
          >
            <div className="relative">
              <Image
                width={40}
                height={40}
                src="/ogImg.png"
                alt="Pocketlink"
                className="rounded-lg p-1.5"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-600/20"></div>
            </div>
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-xl font-semibold text-transparent">
              Pocketlink
            </span>
          </Link>

          <a
            href="https://www.pocketlink.co"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-gradient-to-r from-violet-500 from-violet-600 to-purple-600 to-purple-700 px-5 py-2.5 font-medium text-white shadow-lg transition-all duration-200"
          >
            Create Your Pocketlink
          </a>
        </div>
      </div>

      {/* Enhanced Main Card */}
      <div className="mt-8 w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-md">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-600 p-6">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-white/10"></div>
          <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-white/10"></div>
          <div className="relative z-10">
            <div className="mb-2 flex items-center justify-center gap-3">
              <Mail className="h-6 w-6 text-white" />
              <h1 className="text-2xl font-bold text-white">
                Subscription Management
              </h1>
            </div>
            <p className="text-center text-sm text-white/80">
              Manage your email preferences
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">{renderContent()}</div>
      </div>

      {/* Enhanced Footer */}
      <div className="mt-12 text-center">
        <p className="mb-2 text-sm text-gray-500">
          Powered by{' '}
          <span className="font-semibold text-violet-600">Pocketlink</span>
        </p>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Pocketlink. All rights reserved.
        </p>
      </div>
    </main>
  );
}
