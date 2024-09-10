import React, { useState, useMemo, useCallback } from 'react';
import { myTheme } from '@/lib/utils/TableThemes';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import {
  ClientSideRowModelModule,
  ValidationModule,
  PaginationModule,
  DateFilterModule,
  CellStyleModule,
  TextFilterModule,
  RowSelectionModule,
} from 'ag-grid-community';
import { useRouter } from 'next/navigation';
import { useAudience } from '@/app/contexts/AudienceContext';
import { Input } from '@/components/ui/input';
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
import { PlusIcon, Trash2Icon, Edit2, Plus, File } from 'lucide-react';

import Link from 'next/link';
import { toast } from 'sonner';
import ImportSubscribersModal from '../components/ImportSubscribersModal';

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

const SubscriptionsSection = () => {
  const { subscriptions, subscribed, unsubscribed, deleteSubscription } =
    useAudience();
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [gridApi, setGridApi] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Helper function to count subscribed users
  const getSubscribedCount = (subscribed) => {
    return subscribed ? Object.keys(subscribed).length : 0;
  };

  // Helper function to count unsubscribed users
  const getUnsubscribedCount = (unsubscribed) => {
    return unsubscribed ? Object.keys(unsubscribed).length : 0;
  };

  // Helper function to count form fields
  const getFormFieldsCount = (form_fields) => {
    return form_fields ? Object.keys(form_fields).length : 0;
  };

  // Filter subscriptions based on search text
  const filteredSubscriptions = useMemo(() => {
    if (!subscriptions) return [];

    if (!searchText.trim()) {
      return subscriptions;
    }

    const searchLower = searchText.toLowerCase().trim();

    return subscriptions.filter((subscription) => {
      const name = subscription.subscription_name || 'Untitled Subscription';
      const description = subscription.subscription_description || '';

      return (
        name.toLowerCase().includes(searchLower) ||
        description.toLowerCase().includes(searchLower)
      );
    });
  }, [subscriptions, searchText]);

  // Handle selection changes
  const onSelectionChanged = useCallback(() => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedNodes();
      setSelectedRows(selectedNodes.map((node) => node.data));
    }
  }, [gridApi]);

  // Handle bulk delete
  const handleBulkDelete = async () => {
    setIsDeleting(true);
    try {
      // Delete all selected subscriptions
      const deletePromises = selectedRows.map((subscription) =>
        deleteSubscription({ subscriptionToDelete: subscription })
      );

      await Promise.all(deletePromises);

      toast.success(
        `Successfully deleted ${selectedRows.length} subscriptions`
      );

      // Clear selection
      if (gridApi) {
        gridApi.deselectAll();
      }
      setSelectedRows([]);
      setBulkDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Failed to delete some subscriptions');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = useCallback((subscription, event) => {
    event.stopPropagation();
    setSubscriptionToDelete(subscription);
    setDeleteDialogOpen(true);
  }, []);

  // Handle edit click
  const handleEditClick = useCallback(
    (subscription, event) => {
      event.stopPropagation();
      router.push(`/dashboard/subscriptions/${subscription.uuid}/edit`);
    },
    [router]
  );

  // Subscription name cell renderer with click handler
  const subscriptionNameRenderer = useCallback(
    (params) => {
      const name = params.value || 'Untitled Subscription';
      const description = params.data.subscription_description;

      return (
        <div
          className="cursor-pointer py-1"
          onClick={() => {
            router.push(`/dashboard/subscriptions/${params.data.uuid}`);
          }}
        >
          <h1 className="font-medium text-gray-900">{name}</h1>
          {description && (
            <p className="max-w-xs truncate text-xs text-gray-500">
              {description}
            </p>
          )}
        </div>
      );
    },
    [router]
  );

  // Column definitions for AG-Grid
  const columnDefs = useMemo(
    () => [
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
        headerName: 'Subscription',
        field: 'subscription_name',
        sortable: true,
        filter: 'agTextColumnFilter',
        flex: 2,
        cellRenderer: subscriptionNameRenderer,
        cellClass: 'bg-blue-50',
      },
      {
        headerName: 'Subscribed',
        field: 'subscribed',
        sortable: true,
        filter: 'agNumberColumnFilter',
        flex: 1,
        cellClass: 'text-center',
        valueGetter: (params) => getSubscribedCount(params.data.subscribed),
        cellRenderer: (params) => {
          const count = params.value || 0;
          return (
            <div className="flex items-center justify-center">
              <span className="font-medium text-gray-900">
                {count.toLocaleString()}
              </span>
            </div>
          );
        },
      },
      {
        headerName: 'Unsubscribed',
        field: 'unsubscribed',
        sortable: true,
        filter: 'agNumberColumnFilter',
        flex: 1,
        cellClass: 'text-center',
        valueGetter: (params) => getUnsubscribedCount(params.data.unsubscribed),
        cellRenderer: (params) => {
          const count = params.value || 0;
          return (
            <span className="text-gray-600">{count.toLocaleString()}</span>
          );
        },
      },
      {
        headerName: 'Form Fields',
        field: 'form_fields',
        sortable: true,
        filter: 'agNumberColumnFilter',
        flex: 1,
        cellClass: 'text-center',
        valueGetter: (params) => getFormFieldsCount(params.data.form_fields),
        cellRenderer: (params) => {
          const count = params.value || 0;
          return count > 0 ? (
            <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
              {count} field{count !== 1 ? 's' : ''}
            </span>
          ) : (
            <span className="text-gray-400">-</span>
          );
        },
      },
      {
        headerName: 'Created',
        field: 'created_at',
        sortable: true,
        filter: 'agDateColumnFilter',
        flex: 1.2,
        cellClass: 'text-center',
        valueFormatter: (params) => formatDate(params.value),
      },
      {
        headerName: 'Actions',
        field: 'actions',
        sortable: false,
        filter: false,
        width: 120,
        pinned: 'right',
        cellClass: 'text-center',
        cellRenderer: (params) => (
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleEditClick(params.data, e);
              }}
              className="inline-flex items-center justify-center rounded-md bg-blue-50 p-2 text-blue-600 text-gray-400 transition-colors"
              aria-label="Edit subscription"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDeleteClick(params.data, e);
              }}
              className="inline-flex items-center justify-center rounded-md bg-red-50 p-2 text-gray-400 text-red-600 transition-colors"
              aria-label="Delete subscription"
            >
              <Trash2Icon className="h-4 w-4" />
            </button>
          </div>
        ),
      },
    ],
    [handleDeleteClick, handleEditClick, subscriptionNameRenderer]
  );

  const defaultColDef = useMemo(
    () => ({
      width: 150,
      resizable: true,
    }),
    []
  );

  const gridOptions = useMemo(
    () => ({
      rowHeight: 90,
      suppressRowClickSelection: true,
    }),
    []
  );

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  }, []);

  const onRowClicked = (event) => {
    // Don't navigate if clicking on checkbox or action buttons
    if (
      event.event.target.type === 'checkbox' ||
      event.event.target.closest('button')
    ) {
      return;
    }
    router.push(`/dashboard/subscriptions/${event.data.uuid}`);
  };

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg bg-white">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
            <File className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            Create your first subscription
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            Set up subscription forms to start collecting and managing your
            audience data.
          </p>
          <Link
            href={'/dashboard/subscriptions/new'}
            className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-bento-violet/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Subscription
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-2 flex w-full flex-grow flex-col gap-2">
        <div className="flex flex-col gap-3 rounded-lg border bg-white p-4">
          {/* Search and bulk actions */}
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="w-full sm:w-2/3 lg:w-1/2">
              <Input
                type="text"
                placeholder={`Search ${
                  subscriptions?.length || 0
                } subscriptions... (Name, Description)`}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:ring-purple-500"
              />
              {searchText.trim() && (
                <p className="mt-1 text-sm text-gray-600">
                  Showing {filteredSubscriptions?.length || 0} of{' '}
                  {subscriptions?.length || 0} subscriptions
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Bulk delete button */}
              {selectedRows.length > 0 && (
                <>
                  <span className="text-sm text-gray-600">
                    {selectedRows.length} selected
                  </span>
                  <button
                    onClick={() => setBulkDeleteDialogOpen(true)}
                    className="flex items-center rounded-lg bg-red-600 bg-red-700 px-3 py-1.5 text-sm font-medium text-white"
                  >
                    <Trash2Icon size={16} className="mr-1.5" />
                    Delete Selected
                  </button>
                </>
              )}

              <ImportSubscribersModal />
            </div>
          </div>
        </div>

        {/* AG-Grid Table */}
        <div
          className="ag-theme-alpine flex-grow"
          style={{ width: '100%', height: '600px' }}
        >
          <AgGridReact
            rowData={filteredSubscriptions}
            columnDefs={columnDefs}
            gridOptions={gridOptions}
            onGridReady={onGridReady}
            onRowClicked={onRowClicked}
            onSelectionChanged={onSelectionChanged}
            theme={myTheme}
            modules={[
              ClientSideRowModelModule,
              ValidationModule,
              PaginationModule,
              RowSelectionModule,
            ]}
            defaultColDef={defaultColDef}
            animateRows={true}
            rowSelection="multiple"
            noRowsOverlayComponent={() => (
              <div className="p-6 text-center text-gray-500">
                {searchText.trim() ? (
                  <div>
                    <p>No subscriptions found matching "{searchText}"</p>
                    <p className="mt-2 text-sm">
                      Try adjusting your search terms or clear the search to see
                      all {subscriptions?.length || 0} subscriptions.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>No subscriptions found.</p>
                    <p className="mt-2 text-sm">
                      Create your first subscription to get started.
                    </p>
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {/* Single Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              <span>
                Are you sure you want to delete "
                {subscriptionToDelete?.subscription_name || 'this subscription'}
                "? This action cannot be undone and will remove all associated
                data.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (e) => {
                e.stopPropagation();
                setIsDeleting(true);
                try {
                  await deleteSubscription({ subscriptionToDelete });
                  toast.success(
                    `Subscription "${subscriptionToDelete?.subscription_name || ''}" deleted successfully`
                  );
                  setDeleteDialogOpen(false);
                } catch (error) {
                  toast.error('Failed to delete subscription');
                } finally {
                  setIsDeleting(false);
                }
              }}
              disabled={isDeleting}
              className="bg-red-600 bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Multiple Subscriptions</AlertDialogTitle>
            <AlertDialogDescription>
              <span>
                Are you sure you want to delete {selectedRows.length}{' '}
                subscription{selectedRows.length !== 1 ? 's' : ''}? This action
                cannot be undone and will remove all associated data.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              disabled={isDeleting}
              className="bg-red-600 bg-red-700 focus:ring-red-600"
            >
              {isDeleting
                ? 'Deleting...'
                : `Delete ${selectedRows.length} Subscription${selectedRows.length !== 1 ? 's' : ''}`}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SubscriptionsSection;
