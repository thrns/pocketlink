'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import EmptyState from '@/components/EmptyState';
import { Input } from '@/components/ui/input';
import {
  Search,
  ChevronDown,
  Filter,
  ShoppingBag,
  TrendingUp,
  Users,
  DollarSign,
  Package,
  Plus,
  ArrowRight,
  Calendar,
  Mail,
  CreditCard,
} from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule, RowSelectionModule } from 'ag-grid-community';
import { myTheme } from '@/lib/utils/TableThemes';
import { useAuth } from '@/app/contexts/AuthContext';
import { useShop } from '@/app/contexts/ShopContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
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

export default function ShopPage() {
  const { user } = useAuth();
  const {
    orders,
    ordersLoading: loading,
    ordersError: error,
    ordersStats: stats,
  } = useShop();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const gridApiRef = useRef(null);



  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Order Details',
        field: 'order_number',
        flex: 1.2,
        sortable: true,
        cellRenderer: (params) => {
          const orderNumber =
            params.data.order_number || params.data.orderNumber;
          const orderDate = params.data.order_date || params.data.orderDate;
          return (
            <div className="flex flex-col py-2">
              <span className="font-semibold text-gray-900">
                #{orderNumber}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                {orderDate ? format(new Date(orderDate), 'dd MMM yyyy') : '-'}
              </span>
            </div>
          );
        },
      },
      {
        headerName: 'Customer',
        field: 'user_email',
        flex: 1.5,
        sortable: true,
        cellRenderer: (params) => {
          const email = params.data.user_email || params.data.userEmail;
          return (
            <div className="flex items-center gap-2 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <span className="truncate text-sm font-medium text-gray-900">
                {email}
              </span>
            </div>
          );
        },
      },
      {
        headerName: 'Status',
        field: 'status',
        flex: 1,
        sortable: true,
        cellRenderer: (params) => {
          const status = params.value;
          return (
            <div className="py-2">
              <Badge
                variant={
                  status === 'completed'
                    ? 'default'
                    : status === 'pending' || status === 'processing'
                      ? 'secondary'
                      : 'outline'
                }
                className={cn(
                  status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : status === 'pending' || status === 'processing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-700'
                )}
              >
                {status}
              </Badge>
            </div>
          );
        },
      },
      {
        headerName: 'Items',
        field: 'itemCount',
        flex: 1,
        sortable: true,
        cellRenderer: (params) => {
          const count = params.data.itemCount || params.data.items?.length || 0;
          const itemsArr = params.data.items || [];
          return (
            <div className="py-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 px-3">
                    <Package className="mr-1 h-3 w-3" />
                    {count} item{count !== 1 ? 's' : ''}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="center" sideOffset={4} className="w-72">
                  <div className="max-h-60 space-y-3 overflow-y-auto">
                    <h4 className="font-medium text-gray-900">Order Items</h4>
                    {itemsArr.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-lg border p-2"
                      >
                        {item.image || (item.images && item.images[0]) ? (
                          <Image
                            src={item.image || item.images?.[0]}
                            alt={item.name || 'item'}
                            width={40}
                            height={40}
                            className="rounded-md border object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                            <Package className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {item.name || item.title || 'Item'}
                          </p>
                          <p className="text-xs text-gray-500">
                            Quantity: {item.quantity || 1}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          );
        },
      },
      {
        headerName: 'Payment',
        field: 'payment_status',
        flex: 1,
        sortable: true,
        cellRenderer: (params) => {
          const paymentStatus =
            params.data.payment_status || params.data.paymentStatus;
          const total = params.data.total || 0;
          const currency = params.data.currency || '₹';

          return (
            <div className="flex flex-col py-2">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-400" />
                <span className="font-semibold text-gray-900">
                  {currency}
                  {Number(total).toFixed(2)}
                </span>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  'w-fit text-xs',
                  paymentStatus === 'completed'
                    ? 'border-green-200 bg-green-50 text-green-700'
                    : paymentStatus === 'pending'
                      ? 'border-yellow-200 bg-yellow-50 text-yellow-800'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                )}
              >
                {paymentStatus}
              </Badge>
            </div>
          );
        },
      },
    ],
    []
  );

  const rowData = React.useMemo(() => {
    if (!orders) return [];
    let rows = orders;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      rows = rows.filter(
        (o) =>
          (o.order_number || '').toLowerCase().includes(q) ||
          (o.status || '').toLowerCase().includes(q) ||
          (o.user_email || '').toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all')
      rows = rows.filter(
        (o) => (o.status || '').toLowerCase() === statusFilter
      );
    return rows;
  }, [orders, searchQuery, statusFilter]);

  const handleQuickSearch = (value) => {
    setSearchQuery(value);
  };

  // Custom ag-grid styles
  const gridOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true,
      flex: 1,
      minWidth: 120,
    },
    suppressRowHoverHighlight: false,
    rowHeight: 80,
    headerHeight: 50,
    animateRows: true,
    suppressCellFocus: true,
    suppressRowClickSelection: true,
  };

  return (
    <PremiumGate
      featureKey={FEATURES.ECOMMERCE_SHOP}
      featureName="E-commerce"
      description="Transform your link-in-bio into a powerful e-commerce platform. Sell products, manage orders, and track revenue directly from your profile."
      dummyData={
        <div className="min-h-screen w-full bg-gray-50 p-6">
          <div className="pointer-events-none space-y-6 opacity-60">
            {/* Header Section */}
            <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center justify-start gap-4">
                <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-3">
                  <ShoppingBag className="h-8 w-8 text-white" />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Orders Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Manage your products, orders, and shop performance
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white">
                  <Package className="h-4 w-4" />
                  Manage Inventory
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Orders
                    </p>
                    <p className="text-2xl font-bold text-gray-900">247</p>
                    <p className="text-xs text-gray-500">All time orders</p>
                  </div>
                  <ShoppingBag className="h-8 w-8 text-blue-500" />
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold text-gray-900">₹45,320</p>
                    <p className="text-xs text-gray-500">All time revenue</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Completed Orders
                    </p>
                    <p className="text-2xl font-bold text-gray-900">198</p>
                    <p className="text-xs text-gray-500">
                      Successfully completed
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Pending Orders
                    </p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-gray-500">Awaiting processing</p>
                  </div>
                  <Users className="h-8 w-8 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="rounded-xl border border-gray-100 bg-white shadow-lg">
              <div className="border-b border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Orders
                </h2>
                <p className="text-gray-600">
                  View and manage your customer orders
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      id: '#3429',
                      customer: 'sarah@example.com',
                      status: 'completed',
                      items: 2,
                      amount: '₹1,299',
                    },
                    {
                      id: '#3428',
                      customer: 'john@example.com',
                      status: 'pending',
                      items: 1,
                      amount: '₹899',
                    },
                    {
                      id: '#3427',
                      customer: 'mike@example.com',
                      status: 'completed',
                      items: 3,
                      amount: '₹2,150',
                    },
                    {
                      id: '#3426',
                      customer: 'lisa@example.com',
                      status: 'processing',
                      items: 1,
                      amount: '₹750',
                    },
                    {
                      id: '#3425',
                      customer: 'david@example.com',
                      status: 'completed',
                      items: 2,
                      amount: '₹1,680',
                    },
                  ].map((order, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-gray-100 py-4"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-gray-500">
                            {order.customer}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          {order.items} items
                        </span>
                        <span className="font-semibold">{order.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <main className="h-full w-full space-y-6 overflow-y-auto p-6">
        {/* Header Section */}
        <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-start justify-start gap-4 sm:items-center">
            <div className="rounded-xl bg-bento-blue p-3">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Orders Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your products, orders, and shop performance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:ml-0 ml-16">
            <Link
              href="/dashboard/shop/inventory"
              className="flex items-center gap-2 rounded-md bg-black p-2 text-white"
            >
              <Package className="h-4 w-4" />
              Manage Inventory
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-xl border border-gray-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Orders
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  stats.totalOrders
                )}
              </div>
              <p className="text-xs text-gray-500">All time orders</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  `₹${stats.totalRevenue.toFixed(2)}`
                )}
              </div>
              <p className="text-xs text-gray-500">All time revenue</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Completed Orders
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  stats.completedOrders
                )}
              </div>
              <p className="text-xs text-gray-500">Successfully completed</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Orders
              </CardTitle>
              <Users className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  stats.pendingOrders
                )}
              </div>
              <p className="text-xs text-gray-500">Awaiting processing</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        <Card className="rounded-xl border border-gray-200 bg-white">
          <CardHeader className="border-b border-gray-200 pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Your Orders
                </CardTitle>
                <CardDescription>
                  View and manage your customer orders
                </CardDescription>
              </div>

              {/* Search and Filter */}
              <div className="flex items-center gap-3">
                <div className="flex w-full max-w-2xl items-center gap-2 rounded-md border bg-white px-3 py-1">
                  <Search size={16} className="text-gray-400" />
                  <Input
                    placeholder="Search orders..."
                    className="w-full border-none p-0 shadow-none focus-visible:ring-0"
                    value={searchQuery}
                    onChange={(e) => handleQuickSearch(e.target.value)}
                  />
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      Filter
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" sideOffset={4} className="w-48">
                    <div className="space-y-1 text-sm">
                      <div className="pb-2 font-medium text-gray-900">
                        Filter by status
                      </div>
                      {['all', 'completed', 'pending', 'processing'].map(
                        (opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setStatusFilter(opt);
                            }}
                            className={`block w-full rounded px-2 py-1.5 text-left transition-colors hover:bg-gray-100 ${statusFilter === opt ? 'bg-blue-50 font-medium text-blue-600' : 'text-gray-700'}`}
                          >
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </button>
                        )
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {loading ? (
              <div className="p-6">
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              </div>
            ) : rowData.length === 0 ? (
              <div className="p-6">
                <EmptyState
                  title="No orders yet"
                  text="Customer orders will appear here as soon as they are placed."
                />
              </div>
            ) : (
              <div
                className="ag-theme-alpine"
                style={{ height: 600, width: '100%' }}
              >
                <style jsx global>{`
                  .ag-theme-quartz {
                    --ag-background-color: #ffffff;
                    --ag-header-background-color: #f8fafc;
                    --ag-header-foreground-color: #374151;
                    --ag-odd-row-background-color: #ffffff;
                    --ag-even-row-background-color: #f9fafb;
                    --ag-row-hover-color: #f3f4f6;
                    --ag-border-color: #e5e7eb;
                    --ag-header-border-color: #e5e7eb;
                    --ag-cell-horizontal-border: #f3f4f6;
                    --ag-font-family:
                      ui-sans-serif, system-ui, -apple-system,
                      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
                      Arial, 'Noto Sans', sans-serif;
                    --ag-font-size: 14px;
                  }
                  .ag-theme-quartz .ag-header-cell-label {
                    font-weight: 600;
                    color: #374151;
                  }
                  .ag-theme-quartz .ag-row {
                    border-bottom: 1px solid #f3f4f6;
                  }
                  .ag-theme-quartz .ag-cell {
                    padding-left: 16px;
                    padding-right: 16px;
                  }
                  .ag-theme-quartz .ag-header-cell {
                    padding-left: 16px;
                    padding-right: 16px;
                  }
                `}</style>
                <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                  modules={[ClientSideRowModelModule, RowSelectionModule]}
                  gridOptions={gridOptions}
                  onGridReady={(params) => {
                    gridApiRef.current = params.api;
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

      </main>
    </PremiumGate>
  );
}
