'use client';
import React, { useMemo } from 'react';
import { useCampaigns } from '@/app/contexts/CampaignContext';
import { useAudience } from '@/app/contexts/AudienceContext';
import Link from 'next/link';
import PremiumGate from '@/components/PremiumGate';
import { FEATURES } from '@/constants/features';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import {
  Mail,
  Users,
  FileText,
  Send,
  Clock,
  TrendingUp,
  ListChecks,
  Eye,
  Target,
  Zap,
  Calendar,
  DraftingCompass,
  CheckCircle,
  ArrowRight,
  Plus,
  Activity,
  EyeIcon,
} from 'lucide-react';
import { FaRocket } from 'react-icons/fa';

const MarketingPage = () => {
  const {
    subscribers,
    subscriptions,
    loadingSubscribers,
    loadingSubscriptions,
  } = useAudience();

  const {
    campaigns,
    lists,
    emailTemplates,
    campaignEmails,
    campaignDrafts,
    loadingCampaigns,
    loadingLists,
    loadingTemplates,
    getCampaignEmailCount,
    getCampaignDraftCount,
  } = useCampaigns();

  // Data calculations
  const overviewStats = useMemo(() => {
    const totalCampaigns = campaigns?.length || 0;
    const totalLists = lists?.length || 0;
    const totalTemplates = emailTemplates?.length || 0;
    const totalSubscribers = subscribers?.length || 0;

    // Calculate total emails and drafts across all campaigns
    let totalEmails = 0;
    let totalDrafts = 0;
    let sentEmails = 0;
    let scheduledEmails = 0;
    let failedEmails = 0;
    let pendingEmails = 0;

    campaigns?.forEach((campaign) => {
      const emails = campaignEmails[campaign.uuid] || [];
      const drafts = campaignDrafts[campaign.uuid] || [];

      totalEmails += emails.length;
      totalDrafts += drafts.length;

      // Count emails by status
      emails.forEach((email) => {
        if (email.sent_at) {
          const sentTime = new Date(email.sent_at);
          const now = new Date();
          if (sentTime <= now) {
            // Check if email has failed status
            if (email.status === 'failed' || email.error) {
              failedEmails++;
            } else {
              sentEmails++;
            }
          } else {
            scheduledEmails++;
          }
        } else if (
          email.status === 'pending' ||
          email.status === 'processing'
        ) {
          pendingEmails++;
        } else if (!email.sent_at && !email.status) {
          // Email exists but not sent and no status - likely pending
          pendingEmails++;
        }
      });
    });

    return {
      totalCampaigns,
      totalLists,
      totalTemplates,
      totalSubscribers,
      totalEmails,
      totalDrafts,
      sentEmails,
      scheduledEmails,
      failedEmails,
      pendingEmails,
    };
  }, [
    campaigns,
    lists,
    emailTemplates,
    subscribers,
    campaignEmails,
    campaignDrafts,
  ]);

  // Campaign performance data
  const campaignPerformanceData = useMemo(() => {
    if (!campaigns || campaigns.length === 0) {
      return [
        {
          name: 'No Campaigns',
          emails: 0,
          drafts: 0,
          sent: 0,
          scheduled: 0,
          failed: 0,
          total: 0,
        },
      ];
    }

    return campaigns.map((campaign) => {
      const emails = campaignEmails[campaign.uuid] || [];
      const drafts = campaignDrafts[campaign.uuid] || [];

      let sentCount = 0;
      let scheduledCount = 0;
      let failedCount = 0;
      let pendingCount = 0;

      emails.forEach((email) => {
        if (email.sent_at) {
          const sentTime = new Date(email.sent_at);
          const now = new Date();
          if (sentTime <= now) {
            if (email.status === 'failed' || email.error) {
              failedCount++;
            } else {
              sentCount++;
            }
          } else {
            scheduledCount++;
          }
        } else if (
          email.status === 'pending' ||
          email.status === 'processing'
        ) {
          pendingCount++;
        } else if (!email.sent_at && !email.status) {
          pendingCount++;
        }
      });

      return {
        name:
          campaign.campaign_name?.substring(0, 12) +
            (campaign.campaign_name?.length > 12 ? '...' : '') || 'Untitled',
        fullName: campaign.campaign_name || 'Untitled Campaign',
        emails: emails.length,
        drafts: drafts.length,
        sent: sentCount,
        scheduled: scheduledCount,
        failed: failedCount,
        pending: pendingCount,
        total: emails.length + drafts.length,
        created: campaign.created_at
          ? new Date(campaign.created_at).toLocaleDateString()
          : 'N/A',
      };
    });
  }, [campaigns, campaignEmails, campaignDrafts]);

  // List size distribution
  const listSizeData = useMemo(() => {
    const sizeRanges = {
      '0-50': 0,
      '51-200': 0,
      '201-500': 0,
      '501-1000': 0,
      '1000+': 0,
    };

    // If no lists, return empty state data
    if (!lists || lists.length === 0) {
      return [
        { range: 'No Lists', count: 1, percentage: 100, totalContacts: 0 },
      ];
    }

    let totalContacts = 0;
    lists.forEach((list) => {
      const size = list.list?.length || 0;
      totalContacts += size;

      if (size <= 50) sizeRanges['0-50']++;
      else if (size <= 200) sizeRanges['51-200']++;
      else if (size <= 500) sizeRanges['201-500']++;
      else if (size <= 1000) sizeRanges['501-1000']++;
      else sizeRanges['1000+']++;
    });

    return Object.entries(sizeRanges)
      .filter(([range, count]) => count > 0) // Only show ranges with data
      .map(([range, count]) => ({
        range,
        count,
        percentage: Math.round((count / lists.length) * 100),
        avgSize: Math.round(totalContacts / lists.length),
        totalLists: lists.length,
        totalContacts,
      }));
  }, [lists]);

  // Email status distribution
  const emailStatusData = useMemo(() => {
    const data = [];

    if (overviewStats.sentEmails > 0) {
      data.push({
        name: 'Sent',
        value: overviewStats.sentEmails,
        color: '#10B981',
      });
    }

    if (overviewStats.scheduledEmails > 0) {
      data.push({
        name: 'Scheduled',
        value: overviewStats.scheduledEmails,
        color: '#F59E0B',
      });
    }

    if (overviewStats.totalDrafts > 0) {
      data.push({
        name: 'Drafts',
        value: overviewStats.totalDrafts,
        color: '#6B7280',
      });
    }

    if (overviewStats.pendingEmails > 0) {
      data.push({
        name: 'Pending',
        value: overviewStats.pendingEmails,
        color: '#3B82F6',
      });
    }

    if (overviewStats.failedEmails > 0) {
      data.push({
        name: 'Failed',
        value: overviewStats.failedEmails,
        color: '#EF4444',
      });
    }

    // If no data, show empty state data
    if (data.length === 0) {
      data.push({ name: 'No Emails', value: 1, color: '#E5E7EB' });
    }

    return data;
  }, [overviewStats]);

  // Activity timeline (last 7 days real data)
  const activityData = useMemo(() => {
    const days = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD format

      // Count campaigns created on this day
      const campaignsCreated =
        campaigns?.filter((campaign) => {
          if (!campaign.created_at) return false;
          const campaignDate = new Date(campaign.created_at)
            .toISOString()
            .split('T')[0];
          return campaignDate === dateStr;
        }).length || 0;

      // Count emails sent on this day
      let emailsSent = 0;
      campaigns?.forEach((campaign) => {
        const emails = campaignEmails[campaign.uuid] || [];
        emails.forEach((email) => {
          if (email.sent_at) {
            const sentDate = new Date(email.sent_at)
              .toISOString()
              .split('T')[0];
            if (sentDate === dateStr) {
              emailsSent++;
            }
          }
        });
      });

      // Count lists created/updated on this day
      const listsUpdated =
        lists?.filter((list) => {
          if (!list.updated_at && !list.created_at) return false;
          const listDate = new Date(list.updated_at || list.created_at)
            .toISOString()
            .split('T')[0];
          return listDate === dateStr;
        }).length || 0;

      days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        campaigns: campaignsCreated,
        emails: emailsSent,
        lists: listsUpdated,
      });
    }
    return days;
  }, [campaigns, campaignEmails, lists]);

  // Color schemes
  const COLORS = [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#F97316',
  ];
  const RADIAL_COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

  const isLoading =
    loadingCampaigns || loadingLists || loadingTemplates || loadingSubscribers;

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="text-center">
          <Activity className="mx-auto mb-2 h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-500">Loading marketing insights...</p>
        </div>
      </div>
    );
  }

  return (
    <PremiumGate
      featureKey={FEATURES.EMAIL_MARKETING}
      featureName="Email Marketing"
      description="Create email campaigns, manage subscriber lists, and track engagement metrics to grow your audience and boost conversions."
      dummyData={
        <div className="min-h-screen w-full bg-gray-50 p-6">
          <div className="pointer-events-none space-y-6 opacity-60">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Marketing Dashboard
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-100">
                      Total Campaigns
                    </p>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-100">
                      Email Lists
                    </p>
                    <p className="text-3xl font-bold">8</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-100">
                      Subscribers
                    </p>
                    <p className="text-3xl font-bold">1,247</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-100">
                      Templates
                    </p>
                    <p className="text-3xl font-bold">15</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Recent Campaigns
                </h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-gray-100 pb-3"
                    >
                      <div>
                        <h4 className="font-medium">
                          Summer Sale Campaign #{i}
                        </h4>
                        <p className="text-sm text-gray-500">Sent 2 days ago</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">45.2% Open Rate</p>
                        <p className="text-sm text-gray-500">
                          2,340 recipients
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Performance Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Opens</span>
                    <span className="font-semibold">15,342</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Click Rate</span>
                    <span className="font-semibold">12.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-semibold">3.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenue Generated</span>
                    <span className="font-semibold">$4,250</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-start justify-start gap-4 sm:items-center">
            <div className="rounded-xl bg-bento-violet p-3">
              <EyeIcon className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Marketing Dashboard
              </h1>
              <p className="text-gray-600">
                Build email lists and campaigns to engage your audience.
              </p>
            </div>
          </div>
        </div>
        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Emails Sent
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {overviewStats.sentEmails}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Scheduled Emails
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {overviewStats.scheduledEmails}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Draft Emails
                </p>
                <p className="text-2xl font-bold text-gray-600">
                  {overviewStats.totalDrafts}
                </p>
              </div>
              <DraftingCompass className="h-8 w-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-gray-200 bg-white p-6 text-black"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Campaigns
                </p>
                <p className="text-3xl font-bold">
                  {overviewStats.totalCampaigns}
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
            <Link
              href="/dashboard/marketing/campaigns"
              className="mt-2 inline-flex items-center text-sm text-gray-500"
            >
              View All <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl border border-gray-200 bg-white p-6 text-black"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Email Lists</p>
                <p className="text-3xl font-bold">{overviewStats.totalLists}</p>
              </div>
              <ListChecks className="h-8 w-8 text-green-500" />
            </div>
            <Link
              href="/dashboard/marketing/lists"
              className="mt-2 inline-flex items-center text-sm text-gray-500"
            >
              Manage Lists <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.13 }}
            className="rounded-xl border border-gray-200 bg-white p-6 text-black"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Subscribers</p>
                <p className="text-3xl font-bold">
                  {overviewStats.totalSubscribers}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
            <Link
              href="/dashboard/marketing/subscribers"
              className="mt-2 inline-flex items-center text-sm text-gray-500"
            >
              View Subscribers <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="rounded-xl border border-gray-200 bg-white p-6 text-black"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Templates</p>
                <p className="text-3xl font-bold">
                  {overviewStats.totalTemplates}
                </p>
              </div>
              <FileText className="h-8 w-8 text-orange-500" />
            </div>
            <Link
              href="/dashboard/marketing/templates"
              className="mt-2 inline-flex items-center text-sm text-gray-500"
            >
              View Templates <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Campaign Performance */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.17 }}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Campaign Performance
              </h3>
              <Target className="h-5 w-5 text-gray-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  fontSize={12}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis fontSize={12} tick={{ fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value, name, props) => [
                    value,
                    name,
                    `Campaign: ${props.payload.fullName || props.payload.name}`,
                  ]}
                />
                <Legend />
                <Bar
                  dataKey="sent"
                  fill="#10B981"
                  name="Sent"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="scheduled"
                  fill="#F59E0B"
                  name="Scheduled"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="drafts"
                  fill="#6B7280"
                  name="Drafts"
                  radius={[2, 2, 0, 0]}
                />
                {overviewStats.failedEmails > 0 && (
                  <Bar
                    dataKey="failed"
                    fill="#EF4444"
                    name="Failed"
                    radius={[2, 2, 0, 0]}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Email Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.17 }}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Email Status Distribution
              </h3>
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={emailStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {emailStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* List Size Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.17 }}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                List Size Distribution
              </h3>
              <Users className="h-5 w-5 text-gray-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={listSizeData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" fontSize={12} tick={{ fill: '#6b7280' }} />
                <YAxis
                  type="category"
                  dataKey="range"
                  fontSize={12}
                  tick={{ fill: '#6b7280' }}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value, name, props) => {
                    const data = props.payload;
                    if (data.range === 'No Lists') {
                      return ['No lists created yet', ''];
                    }
                    return [
                      `${value} lists (${data.percentage}%)`,
                      `Size Range: ${data.range} contacts`,
                    ];
                  }}
                  labelFormatter={(label, payload) => {
                    if (
                      payload &&
                      payload[0] &&
                      payload[0].payload.totalLists
                    ) {
                      return `Total: ${payload[0].payload.totalLists} lists, ${payload[0].payload.totalContacts} contacts`;
                    }
                    return label;
                  }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.17 }}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                7-Day Activity
              </h3>
              <Activity className="h-5 w-5 text-gray-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" fontSize={12} tick={{ fill: '#6b7280' }} />
                <YAxis fontSize={12} tick={{ fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return `${label} (${payload[0].payload.date})`;
                    }
                    return label;
                  }}
                  formatter={(value, name) => [
                    value,
                    name,
                    value === 1 ? name.slice(0, -1) : name, // Remove 's' for singular
                  ]}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="emails"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.6}
                  name="Emails Sent"
                />
                <Area
                  type="monotone"
                  dataKey="campaigns"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                  name="Campaigns Created"
                />
                <Area
                  type="monotone"
                  dataKey="lists"
                  stackId="1"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.6}
                  name="Lists Updated"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </PremiumGate>
  );
};

export default MarketingPage;
