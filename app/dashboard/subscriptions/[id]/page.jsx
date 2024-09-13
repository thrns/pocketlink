// SubscriberAnalyticsPage.jsx

'use client';

import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAudience } from '@/app/contexts/AudienceContext';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  UserMinus,
  TrendingUp,
  Trash2Icon,
  UserCheck,
  UserX,
  User2,
} from 'lucide-react';
import {
  ClientSideRowModelModule,
  ValidationModule,
  PaginationModule,
  DateFilterModule,
  CellStyleModule,
  TextFilterModule,
  RowSelectionModule,
} from 'ag-grid-community';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO, subDays, eachDayOfInterval } from 'date-fns';
import PremiumGate from '@/components/PremiumGate';
import { FEATURES } from '@/constants/features';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

// Register AG-Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  TextFilterModule,
  PaginationModule,
  CellStyleModule,
  DateFilterModule,
  RowSelectionModule,
]);

const SubscriberAnalyticsPage = () => {
  const { id } = useParams();
  const { subscriptions, deleteSubscribers, deleteUnsubscribers } =
    useAudience();
  const [activeTab, setActiveTab] = useState('subscribed');

  // Selection state
  const [selectedSubscribed, setSelectedSubscribed] = useState([]);
  const [selectedUnsubscribed, setSelectedUnsubscribed] = useState([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // AG Grid API refs
  const subscribedGridApi = useRef(null);
  const unsubscribedGridApi = useRef(null);

  // Find the current subscription
  const subscription = useMemo(() => {
    return subscriptions?.find((sub) => sub.uuid === id) || null;
  }, [subscriptions, id]);

  // Parse subscribers and unsubscribers from subscription data
  const { subscribers, unsubscribers } = useMemo(() => {
    if (!subscription) return { subscribers: [], unsubscribers: [] };

    const subscribedData = Array.isArray(subscription.subscribed) ? subscription.subscribed : [];
    const subscribers = subscribedData.map((userData, index) => ({
      id: userData.id || `sub-${index}`,
      email: userData.email || 'N/A',
      subscribed_at:
        userData.subscribed_at ||
        userData.timestamp ||
        new Date().toISOString(),
      ...userData,
    }));

    const unsubscribedData = Array.isArray(subscription.unsubscribed) ? subscription.unsubscribed : [];
    const unsubscribers = unsubscribedData.map((userData, index) => ({
      id: userData.id || `unsub-${index}`,
      email: userData.email || 'N/A',
      subscribed_at: userData.subscribed_at || userData.timestamp || null,
      unsubscribed_at:
        userData.unsubscribed_at ||
        userData.timestamp ||
        new Date().toISOString(),
      ...userData,
    }));

    return { subscribers, unsubscribers };
  }, [subscription]);

  // Parse form fields
  const formFields = useMemo(() => {
    if (!subscription?.form_fields) return {};
    try {
      return subscription.form_fields;
    } catch (error) {
      console.error('Error parsing form fields:', error);
      return {};
    }
  }, [subscription]);

  // Simple prediction calculation
  const calculateTrend = (data, field) => {
    if (data.length < 3) return 0;
    const recent = data.slice(-7);
    const older = data.slice(-14, -7);
    const recentAvg =
      recent.reduce((sum, d) => sum + d[field], 0) / recent.length;
    const olderAvg = older.reduce((sum, d) => sum + d[field], 0) / older.length;
    return recentAvg - olderAvg;
  };

  // Calculate timeline data (last 14 days + 7 day trend)
  const timelineData = useMemo(() => {
    const days = eachDayOfInterval({
      start: subDays(new Date(), 13),
      end: new Date(),
    });

    const historicalData = days.map((day) => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const subscribedCount = subscribers.filter(
        (sub) => format(parseISO(sub.subscribed_at), 'yyyy-MM-dd') === dayStr
      ).length;
      const unsubscribedCount = unsubscribers.filter(
        (unsub) =>
          format(parseISO(unsub.unsubscribed_at), 'yyyy-MM-dd') === dayStr
      ).length;

      return {
        date: format(day, 'MMM dd'),
        subscribed: subscribedCount,
        unsubscribed: unsubscribedCount,
      };
    });

    return historicalData;
  }, [subscribers, unsubscribers]);

  // Dynamic column definitions
  const subscribedColumns = useMemo(() => {
    const columns = [
      {
        headerName: '',
        field: 'checkbox',
        width: 50,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        pinned: 'left',
        sortable: false,
        filter: false,
        resizable: false,
      },
      {
        headerName: 'Email',
        field: 'email',
        flex: 2,
        minWidth: 200,
        filter: 'agTextColumnFilter',
      },
    ];

    Object.entries(formFields).forEach(([fieldId, fieldConfig]) => {
      if (fieldConfig.type !== 'email' && fieldConfig.label) {
        columns.push({
          headerName: fieldConfig.label,
          field: fieldConfig.label,
          flex: 1,
          minWidth: 120,
          filter: 'agTextColumnFilter',
        });
      }
    });

    columns.push({
      headerName: 'Subscribed',
      field: 'subscribed_at',
      width: 140,
      filter: 'agDateColumnFilter',
      valueFormatter: (params) => {
        return params.value
          ? format(parseISO(params.value), 'MMM dd, yyyy')
          : 'N/A';
      },
    });

    return columns;
  }, [formFields]);

  const unsubscribedColumns = useMemo(() => {
    const columns = [
      {
        headerName: '',
        field: 'checkbox',
        width: 50,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        pinned: 'left',
        sortable: false,
        filter: false,
        resizable: false,
      },
      {
        headerName: 'Email',
        field: 'email',
        flex: 2,
        minWidth: 200,
        filter: 'agTextColumnFilter',
      },
    ];

    Object.entries(formFields).forEach(([fieldId, fieldConfig]) => {
      if (fieldConfig.type !== 'email' && fieldConfig.label) {
        columns.push({
          headerName: fieldConfig.label,
          field: fieldConfig.label,
          flex: 1,
          minWidth: 120,
          filter: 'agTextColumnFilter',
        });
      }
    });

    columns.push(
      {
        headerName: 'Subscribed',
        field: 'subscribed_at',
        width: 120,
        filter: 'agDateColumnFilter',
        valueFormatter: (params) => {
          return params.value
            ? format(parseISO(params.value), 'MMM dd')
            : 'N/A';
        },
      },
      {
        headerName: 'Unsubscribed',
        field: 'unsubscribed_at',
        width: 140,
        filter: 'agDateColumnFilter',
        valueFormatter: (params) => {
          return params.value
            ? format(parseISO(params.value), 'MMM dd, yyyy')
            : 'N/A';
        },
      }
    );

    return columns;
  }, [formFields]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
    }),
    []
  );

  // Selection handlers
  const onSubscribedSelectionChanged = useCallback(() => {
    if (subscribedGridApi.current) {
      const selectedNodes = subscribedGridApi.current.getSelectedNodes();
      setSelectedSubscribed(selectedNodes.map((node) => node.data));
    }
  }, []);

  const onUnsubscribedSelectionChanged = useCallback(() => {
    if (unsubscribedGridApi.current) {
      const selectedNodes = unsubscribedGridApi.current.getSelectedNodes();
      setSelectedUnsubscribed(selectedNodes.map((node) => node.data));
    }
  }, []);

  // Bulk delete logic
  const handleBulkDelete = async () => {
    setIsDeleting(true);
    try {
      if (activeTab === 'subscribed') {
        await deleteSubscribers({
          subscriptionId: subscription.uuid,
          users: selectedSubscribed,
        });
        toast.success(`Deleted ${selectedSubscribed.length} subscribers`);
        setSelectedSubscribed([]);
        if (subscribedGridApi.current) subscribedGridApi.current.deselectAll();
      } else {
        await deleteUnsubscribers({
          subscriptionId: subscription.uuid,
          users: selectedUnsubscribed,
        });
        toast.success(`Deleted ${selectedUnsubscribed.length} unsubscribers`);
        setSelectedUnsubscribed([]);
        if (unsubscribedGridApi.current)
          unsubscribedGridApi.current.deselectAll();
      }
      setBulkDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Failed to delete');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!subscription) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-500">Loading subscription data...</div>
      </div>
    );
  }

  const retentionRate =
    subscribers.length > 0
      ? (
          (subscribers.length / (subscribers.length + unsubscribers.length)) *
          100
        ).toFixed(1)
      : 0;

  const subscribeTrend = calculateTrend(timelineData, 'subscribed');
  const unsubscribeTrend = calculateTrend(timelineData, 'unsubscribed');

  // Bulk delete button logic
  const selectedCount =
    activeTab === 'subscribed'
      ? selectedSubscribed.length
      : selectedUnsubscribed.length;

  return (
    <PremiumGate
      featureKey={FEATURES.PAID_SUBSCRIPTIONS}
      featureName="Subscription Analytics"
      description="Get detailed analytics and insights for your subscription forms. Track subscriber growth, analyze trends, and view comprehensive data tables with export capabilities."
      dummyData={
        <div className="min-h-screen w-full bg-gray-50 p-6">
          <div className="pointer-events-none space-y-6 opacity-60">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Newsletter Signup Analytics
              </h1>
              <p className="mt-1 text-gray-500">
                Analytics and subscriber data with 10-day predictions
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-medium">Current Subscribers</h3>
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-bold">1,247</div>
                  {/* Mini chart placeholder */}
                  <div className="flex h-20 w-full items-center justify-center rounded border border-green-100 bg-green-50">
                    <div className="text-sm text-green-600">Growth Chart</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-medium">Total Unsubscribed</h3>
                  <User2 className="h-5 w-5 text-red-600" />
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-bold">89</div>
                  <div className="flex h-20 w-full items-center justify-center rounded border border-red-100 bg-red-50">
                    <div className="text-sm text-red-600">Churn Chart</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-medium">Net Growth Rate</h3>
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-bold">93.3%</div>
                  <p className="text-sm text-gray-500">
                    Retention rate over time
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Chart */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">
                  Subscription Timeline & Predictions
                </h2>
                <p className="text-gray-600">
                  Subscriber growth (30 days) and Predictions (next 10 days)
                </p>
              </div>
              <div className="flex h-96 w-full items-center justify-center rounded-lg border border-gray-100 bg-gradient-to-br from-blue-50 to-green-50">
                <div className="text-center">
                  <div className="mb-2 text-lg font-medium text-gray-700">
                    Interactive Growth Chart
                  </div>
                  <div className="text-sm text-gray-500">
                    30-day history + 10-day predictions
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-4 bg-green-500"></div>
                  <span>Historical Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-4 border-t-2 border-dashed border-green-400"></div>
                  <span>Predicted Data</span>
                </div>
              </div>
            </div>

            {/* Data Tables */}
            <div className="rounded-xl border border-gray-100 bg-white shadow-lg">
              <div className="border-b border-gray-100 p-6">
                <div className="flex gap-4">
                  <button className="rounded-lg bg-indigo-100 px-4 py-2 font-medium text-indigo-700">
                    Subscribed (1,247)
                  </button>
                  <button className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100">
                    Unsubscribed (89)
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Table Header */}
                <div className="mb-4 grid grid-cols-4 gap-4 border-b border-gray-100 pb-3 font-medium text-gray-700">
                  <div>Email</div>
                  <div>Full Name</div>
                  <div>Location</div>
                  <div>Subscribed At</div>
                </div>

                {/* Table Rows */}
                <div className="space-y-3">
                  {[
                    {
                      email: 'sarah.johnson@example.com',
                      name: 'Sarah Johnson',
                      location: 'Mumbai, India',
                      date: 'Dec 15, 2024',
                    },
                    {
                      email: 'michael.chen@example.com',
                      name: 'Michael Chen',
                      location: 'Delhi, India',
                      date: 'Dec 14, 2024',
                    },
                    {
                      email: 'priya.sharma@example.com',
                      name: 'Priya Sharma',
                      location: 'Bangalore, India',
                      date: 'Dec 13, 2024',
                    },
                    {
                      email: 'david.wilson@example.com',
                      name: 'David Wilson',
                      location: 'Pune, India',
                      date: 'Dec 12, 2024',
                    },
                    {
                      email: 'ananya.gupta@example.com',
                      name: 'Ananya Gupta',
                      location: 'Chennai, India',
                      date: 'Dec 11, 2024',
                    },
                    {
                      email: 'james.brown@example.com',
                      name: 'James Brown',
                      location: 'Hyderabad, India',
                      date: 'Dec 10, 2024',
                    },
                    {
                      email: 'kavya.reddy@example.com',
                      name: 'Kavya Reddy',
                      location: 'Kolkata, India',
                      date: 'Dec 09, 2024',
                    },
                  ].map((subscriber, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-4 gap-4 border-b border-gray-50 py-3 text-sm"
                    >
                      <div className="text-gray-900">{subscriber.email}</div>
                      <div className="text-gray-700">{subscriber.name}</div>
                      <div className="text-gray-600">{subscriber.location}</div>
                      <div className="text-gray-500">{subscriber.date}</div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing 1-7 of 1,247 subscribers
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="rounded bg-indigo-600 px-3 py-1 text-sm text-white">
                      1
                    </button>
                    <button className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50">
                      2
                    </button>
                    <button className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50">
                      Next
                    </button>
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
        <div>
          <h1 className="text-2xl font-bold">
            {subscription.subscription_name}
          </h1>
          <p className="text-sm text-gray-600">Subscriber analytics and data</p>
        </div>

        {/* Compact Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Subscribers
                </p>
                <p className="text-2xl font-bold">{subscribers.length}</p>
                {subscribeTrend !== 0 && (
                  <p
                    className={`text-xs ${subscribeTrend > 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {subscribeTrend > 0 ? '+' : ''}
                    {subscribeTrend.toFixed(1)} trend
                  </p>
                )}
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Unsubscribed
                </p>
                <p className="text-2xl font-bold">{unsubscribers.length}</p>
                {unsubscribeTrend !== 0 && (
                  <p
                    className={`text-xs ${unsubscribeTrend > 0 ? 'text-red-600' : 'text-green-600'}`}
                  >
                    {unsubscribeTrend > 0 ? '+' : ''}
                    {unsubscribeTrend.toFixed(1)} trend
                  </p>
                )}
              </div>
              <UserMinus className="h-8 w-8 text-red-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Retention Rate
                </p>
                <p className="text-2xl font-bold">{retentionRate}%</p>
                <p className="text-xs text-gray-500">Overall retention</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </Card>
        </div>

        {/* Simple Timeline Chart */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">14-Day Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timelineData}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="subscribed"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#10b981' }}
                  name="Subscribed"
                />
                <Line
                  type="monotone"
                  dataKey="unsubscribed"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#ef4444' }}
                  name="Unsubscribed"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Data Tables */}
        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between px-6 pt-4">
              <TabsList className="grid w-full max-w-[300px] grid-cols-2">
                <TabsTrigger value="subscribed" className="text-sm">
                  Active ({subscribers.length})
                </TabsTrigger>
                <TabsTrigger value="unsubscribed" className="text-sm">
                  Unsubscribed ({unsubscribers.length})
                </TabsTrigger>
              </TabsList>
              {/* Bulk Delete Button */}
              {selectedCount > 0 && (
                <button
                  onClick={() => setBulkDeleteDialogOpen(true)}
                  className="ml-4 flex items-center rounded-lg bg-red-600 bg-red-700 px-3 py-1.5 text-sm font-medium text-white"
                >
                  <Trash2Icon size={16} className="mr-1.5" />
                  Delete Selected ({selectedCount})
                </button>
              )}
            </div>

            <div className="p-6">
              <TabsContent value="subscribed" className="mt-0">
                <div style={{ height: 600, width: '100%' }}>
                  <AgGridReact
                    rowData={subscribers}
                    columnDefs={subscribedColumns}
                    modules={[
                      ClientSideRowModelModule,
                      ValidationModule,
                      PaginationModule,
                      RowSelectionModule,
                    ]}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={15}
                    animateRows={true}
                    rowHeight={40}
                    rowSelection="multiple"
                    suppressRowClickSelection={true}
                    onGridReady={(params) => {
                      subscribedGridApi.current = params.api;
                    }}
                    onSelectionChanged={onSubscribedSelectionChanged}
                  />
                </div>
              </TabsContent>

              <TabsContent value="unsubscribed" className="mt-0">
                <div style={{ height: 600, width: '100%' }}>
                  <AgGridReact
                    rowData={unsubscribers}
                    columnDefs={unsubscribedColumns}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    modules={[
                      ClientSideRowModelModule,
                      ValidationModule,
                      PaginationModule,
                      RowSelectionModule,
                    ]}
                    animateRows={true}
                    rowHeight={40}
                    rowSelection="multiple"
                    suppressRowClickSelection={true}
                    onGridReady={(params) => {
                      unsubscribedGridApi.current = params.api;
                    }}
                    onSelectionChanged={onUnsubscribedSelectionChanged}
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </Card>

        {/* Bulk Delete Confirmation Dialog */}
        <AlertDialog
          open={bulkDeleteDialogOpen}
          onOpenChange={setBulkDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete {selectedCount}{' '}
                {activeTab === 'subscribed' ? 'Subscribers' : 'Unsubscribers'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedCount}{' '}
                {activeTab === 'subscribed' ? 'subscribers' : 'unsubscribers'}?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleBulkDelete}
                disabled={isDeleting}
                className="bg-red-600 bg-red-700 focus:ring-red-600"
              >
                {isDeleting
                  ? 'Deleting...'
                  : `Delete ${selectedCount} ${activeTab === 'subscribed' ? 'Subscriber' : 'Unsubscriber'}${selectedCount !== 1 ? 's' : ''}`}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PremiumGate>
  );
};

export default SubscriberAnalyticsPage;
