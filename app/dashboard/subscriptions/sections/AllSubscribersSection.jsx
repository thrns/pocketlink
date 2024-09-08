import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { myTheme } from '@/lib/utils/TableThemes';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import {
  ClientSideRowModelModule,
  ValidationModule,
  RowSelectionModule,
  PaginationModule,
  TextFilterModule,
  CellStyleModule,
} from 'ag-grid-community';
import { useAudience } from '@/app/contexts/AudienceContext';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import ImportSubscribersModal from '../components/ImportSubscribersModal';

// Register AG-Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  RowSelectionModule,
  PaginationModule,
  CellStyleModule,
]);

const AllSubscribersSection = () => {
  const [searchText, setSearchText] = useState('');
  const [gridApi, setGridApi] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  // Get context data
  const { subscribed, unsubscribed } = useAudience();

  // Process subscriptions data into flat subscriber list
  const allSubscribers = useMemo(() => {
    if (!subscribed || !unsubscribed) {
      console.error('Missing data:', {
        subscribed: !!subscribed,
        unsubscribed: !!unsubscribed,
      });
      return [];
    }

    const subscribers = [];

    // Process subscribed users
    Object.entries(subscribed).forEach(
      ([subscriptionName, subscribersList]) => {
        if (Array.isArray(subscribersList)) {
          subscribersList.forEach((subscriber) => {
            subscribers.push({
              name: subscriber.name || subscriber.subscriber_name || 'Unknown',
              email:
                subscriber.email || subscriber.subscriber_email || 'Unknown',
              subscription: subscriptionName,
              status: 'subscribed',
              timestamp:
                subscriber.timestamp ||
                subscriber.created_at ||
                new Date().toISOString(),
              // Add unique ID for grid selection
              id: `${subscriptionName}-${
                subscriber.email || subscriber.subscriber_email
              }-subscribed`,
            });
          });
        }
      }
    );

    // Process unsubscribed users
    Object.entries(unsubscribed).forEach(
      ([subscriptionName, subscribersList]) => {
        if (Array.isArray(subscribersList)) {
          subscribersList.forEach((subscriber) => {
            subscribers.push({
              name: subscriber.name || subscriber.subscriber_name || 'Unknown',
              email:
                subscriber.email || subscriber.subscriber_email || 'Unknown',
              subscription: subscriptionName,
              status: 'unsubscribed',
              timestamp:
                subscriber.timestamp ||
                subscriber.created_at ||
                new Date().toISOString(),
              // Add unique ID for grid selection
              id: `${subscriptionName}-${
                subscriber.email || subscriber.subscriber_email
              }-unsubscribed`,
            });
          });
        }
      }
    );

    return subscribers;
  }, [subscribed, unsubscribed]);

  // Filter subscribers based on search text
  const processedSubscribers = useMemo(() => {
    if (!searchText.trim()) {
      return allSubscribers;
    }

    const searchLower = searchText.toLowerCase().trim();

    return allSubscribers.filter((subscriber) => {
      return (
        (subscriber.name &&
          subscriber.name.toLowerCase().includes(searchLower)) ||
        (subscriber.email &&
          subscriber.email.toLowerCase().includes(searchLower)) ||
        (subscriber.subscription &&
          subscriber.subscription.toLowerCase().includes(searchLower)) ||
        (subscriber.status &&
          subscriber.status.toLowerCase().includes(searchLower))
      );
    });
  }, [allSubscribers, searchText]);

  // Helper function for status styling
  const getStatusClass = (status) => {
    switch (status) {
      case 'subscribed':
        return 'bg-green-100 text-green-800';
      case 'unsubscribed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // ===== GRID HANDLERS ===== //

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Name',
        field: 'name',
        sortable: true,
        filter: 'agTextColumnFilter',
        flex: 1.5,
      },
      {
        headerName: 'Email',
        field: 'email',
        sortable: true,
        filter: 'agTextColumnFilter',
        flex: 2,
        cellClass: 'font-medium',
      },
      {
        headerName: 'Subscription',
        field: 'subscription',
        sortable: true,
        filter: 'agTextColumnFilter',
        flex: 2,
      },
      {
        headerName: 'Status',
        field: 'status',
        sortable: true,
        filter: 'agTextColumnFilter',
        flex: 1.5,
        cellRenderer: (params) => {
          return (
            <span
              className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-4 ${getStatusClass(
                params.value
              )}`}
            >
              {params.value}
            </span>
          );
        },
      },
      {
        headerName: 'Timestamp',
        field: 'timestamp',
        sortable: true,
        filter: 'agDateColumnFilter',
        flex: 1.5,
        valueFormatter: (params) =>
          params.value ? new Date(params.value).toLocaleDateString() : '',
      },
    ],
    [getStatusClass]
  );

  const defaultColDef = useMemo(
    () => ({
      width: 200,
      resizable: true,
    }),
    []
  );

  const gridOptions = useMemo(
    () => ({
      rowHeight: 50,
      suppressRowClickSelection: false,
    }),
    []
  );

  // Handler for AG-Grid selection changes
  const onSelectionChanged = useCallback(() => {
    if (gridApi) {
      setSelectedRows(gridApi.getSelectedRows());
    }
  }, [gridApi]);

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  }, []);

  // ===== /GRID HANDLERS/ ===== //

  return (
    <div className="mt-2 flex w-full flex-grow flex-col gap-2">
      <div className="flex flex-col gap-3 rounded-lg border bg-white p-4">
        {/* Search Bar */}
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="w-full sm:w-2/3 lg:w-1/2">
            <Input
              type="text"
              placeholder={`Search ${
                allSubscribers?.length || 0
              } subscribers... (Name, Email, Subscription, Status)`}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:ring-purple-500"
            />
            {searchText.trim() && (
              <p className="mt-1 text-sm text-gray-600">
                Showing {processedSubscribers?.length || 0} of{' '}
                {allSubscribers?.length || 0} subscribers
              </p>
            )}
          </div>

          <ImportSubscribersModal />
        </div>

        {/* Bulk Actions Toolbar - Appears when rows are selected */}
        {selectedRows.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-purple-200 bg-purple-50 p-3">
            <span className="text-sm font-medium text-purple-700">
              {selectedRows.length} subscriber
              {selectedRows.length > 1 ? 's' : ''} selected.
            </span>
            {/* Actions will be added here later */}
          </div>
        )}
      </div>

      {/* Always show the grid container, let AG-Grid handle empty state */}
      <div
        className="ag-theme-alpine flex-grow"
        style={{ width: '100%', height: '600px' }}
      >
        <AgGridReact
          rowData={processedSubscribers}
          columnDefs={columnDefs}
          gridOptions={gridOptions}
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          theme={myTheme}
          modules={[
            ClientSideRowModelModule,
            ValidationModule,
            RowSelectionModule,
            TextFilterModule,
            CellStyleModule,
          ]}
          rowSelection="multiple"
          defaultColDef={defaultColDef}
          animateRows={true}
          noRowsOverlayComponent={() => (
            <div className="p-6 text-center text-gray-500">
              {searchText.trim() ? (
                <div>
                  <p>No subscribers found matching "{searchText}"</p>
                  <p className="mt-2 text-sm">
                    Try adjusting your search terms or clear the search to see
                    all {allSubscribers?.length || 0} subscribers.
                  </p>
                </div>
              ) : (
                <div>
                  <p>No subscribers found.</p>
                  <p className="mt-2 text-sm">
                    {!Object.keys(subscribed || {}).length &&
                      !Object.keys(unsubscribed || {}).length &&
                      'No subscribers in any subscription.'}
                  </p>
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default AllSubscribersSection;
