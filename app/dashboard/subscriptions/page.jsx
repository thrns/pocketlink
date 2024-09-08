'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Tabs } from '@/components/ui/acternity-tabs';
import PremiumGate from '@/components/PremiumGate';
import { FEATURES } from '@/constants/features';

import AllSubscribersSection from './sections/AllSubscribersSection';
import SubscriptionsSection from './sections/SubscriptionsSection';
import {
  Users,
  FileText,
  TrendingUp,
  DollarSign,
  Crown,
  Mail,
} from 'lucide-react';
import { MailCheck, Plus, PlusIcon } from 'lucide-react';
import Link from 'next/link';

// Import Modal Component

const tabs = [
  {
    title: 'All Subscribers',
    value: 'all-subscribers',
    content: <AllSubscribersSection />,
  },
  {
    title: 'Subscriptions',
    value: 'subscriptions',
    content: <SubscriptionsSection />,
  },
];

const SubscriptionsPage = () => {
  return (
    <PremiumGate
      featureKey={FEATURES.PAID_SUBSCRIPTIONS}
      featureName="Paid Subscriptions"
      description="Create powerful subscription forms to collect subscriber data and build your audience. Monetize your content with paid subscriptions and manage your community."
      dummyData={
        <div className="min-h-screen w-full bg-gray-50 p-6">
          <div className="pointer-events-none space-y-6 opacity-60">
            {/* Header */}
            <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center justify-start gap-4">
                <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 p-3">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Subscription Management
                  </h1>
                  <p className="text-gray-600">
                    Build and manage subscriber communities
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white">
                <Plus className="h-4 w-4" />
                Create Subscription
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Subscriptions
                    </p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                    <p className="text-xs text-gray-500">Active forms</p>
                  </div>
                  <FileText className="h-8 w-8 text-indigo-500" />
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Subscribers
                    </p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-xs text-gray-500">All forms combined</p>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Monthly Growth
                    </p>
                    <p className="text-2xl font-bold text-gray-900">+12.5%</p>
                    <p className="text-xs text-gray-500">Subscriber growth</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₹24,580</p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-emerald-500" />
                </div>
              </div>
            </div>

            {/* Tabs Content */}
            <div className="rounded-xl border border-gray-100 bg-white shadow-lg">
              <div className="border-b border-gray-100 p-6">
                <div className="flex gap-4">
                  <button className="rounded-lg bg-indigo-100 px-4 py-2 font-medium text-indigo-700">
                    All Subscribers
                  </button>
                  <button className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100">
                    Subscriptions
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Subscription Forms List */}
                <div className="space-y-4">
                  {[
                    {
                      name: 'Newsletter Signup',
                      subscribers: 450,
                      type: 'Free',
                      status: 'Active',
                      created: '2 weeks ago',
                    },
                    {
                      name: 'Premium Content Access',
                      subscribers: 89,
                      type: 'Paid - ₹299/month',
                      status: 'Active',
                      created: '1 month ago',
                    },
                    {
                      name: 'Course Updates',
                      subscribers: 234,
                      type: 'Free',
                      status: 'Active',
                      created: '3 weeks ago',
                    },
                    {
                      name: 'VIP Community',
                      subscribers: 67,
                      type: 'Paid - ₹999/month',
                      status: 'Active',
                      created: '2 months ago',
                    },
                    {
                      name: 'Weekly Digest',
                      subscribers: 312,
                      type: 'Free',
                      status: 'Active',
                      created: '1 week ago',
                    },
                  ].map((form, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`rounded-lg p-2 ${
                            form.type.includes('Paid')
                              ? 'bg-amber-100 text-amber-600'
                              : 'bg-blue-100 text-blue-600'
                          }`}
                        >
                          {form.type.includes('Paid') ? (
                            <Crown className="h-4 w-4" />
                          ) : (
                            <FileText className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {form.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {form.type} • Created {form.created}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {form.subscribers}
                          </p>
                          <p className="text-sm text-gray-500">subscribers</p>
                        </div>
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                          {form.status}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          •••
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Subscribers */}
                <div className="mt-8">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Recent Subscribers
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        email: 'sarah@example.com',
                        form: 'Newsletter Signup',
                        time: '2 minutes ago',
                      },
                      {
                        email: 'john@example.com',
                        form: 'Premium Content Access',
                        time: '15 minutes ago',
                      },
                      {
                        email: 'mike@example.com',
                        form: 'Course Updates',
                        time: '1 hour ago',
                      },
                      {
                        email: 'lisa@example.com',
                        form: 'VIP Community',
                        time: '3 hours ago',
                      },
                      {
                        email: 'david@example.com',
                        form: 'Weekly Digest',
                        time: '5 hours ago',
                      },
                    ].map((subscriber, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b border-gray-100 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                            <Mail className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {subscriber.email}
                            </p>
                            <p className="text-sm text-gray-500">
                              Subscribed to {subscriber.form}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {subscriber.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <main className="h-full w-full space-y-4 overflow-y-auto p-4">
        <aside className="flex h-screen w-full flex-col items-start justify-start gap-2 p-2">
          {/* Header Section */}
          <div className="flex w-full items-center justify-between gap-4">
            <aside className="flex items-center gap-4">
              <div className="rounded-xl bg-bento-violet p-3">
                <MailCheck className="h-8 w-8 text-white" />
              </div>
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  Subscriptions Management
                </h1>
                <p className="text-gray-600">
                  Manage and create your Subscriptions
                </p>
              </div>
            </aside>

            <Link
              href={'/dashboard/subscriptions/new'}
              className="flex items-center rounded-lg bg-black px-4 py-2 font-medium text-white shadow-sm"
            >
              <Plus size={18} className="mr-2" /> Create Subscription
            </Link>
          </div>

          <div className="mt-2 flex w-full items-center gap-4">
            <div className="flex-1">
              <Tabs tabs={tabs} />
            </div>
          </div>
        </aside>
      </main>
    </PremiumGate>
  );
};

export default SubscriptionsPage;
