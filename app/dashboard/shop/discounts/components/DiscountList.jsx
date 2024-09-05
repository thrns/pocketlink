'use client';

import React, { useMemo, useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, Percent, DollarSign, Search } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { myTheme } from '@/lib/utils/TableThemes';
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

import {
  ClientSideRowModelModule,
  ValidationModule,
  RowSelectionModule,
  PaginationModule,
  CellStyleModule,
  TextFilterModule,
} from 'ag-grid-community';

// Register AG-Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowSelectionModule,
  ValidationModule,
  PaginationModule,
  CellStyleModule,
  TextFilterModule,
]);

const DiscountList = ({ discounts, onEdit, onDelete, onCreateDiscount }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [discountToDelete, setDiscountToDelete] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  const filteredDiscounts = useMemo(() => {
    if (!searchText.trim()) return discounts;

    const searchLower = searchText.toLowerCase();
    return discounts.filter((discount) => {
      return (
        (discount.name || '').toLowerCase().includes(searchLower) ||
        (discount.type || '').toLowerCase().includes(searchLower) ||
        discount.value.toString().includes(searchLower)
      );
    });
  }, [discounts, searchText]);

  const handleDeleteClick = useCallback((discount, event) => {
    event.stopPropagation();
    setDiscountToDelete(discount);
    setDeleteDialogOpen(true);
  }, []);

  const handleEditClick = useCallback(
    (discount, event) => {
      event.stopPropagation();
      onEdit(discount);
    },
    [onEdit]
  );

  const handleBulkDelete = useCallback(async () => {
    if (selectedRows.length === 0) return;

    try {
      // Delete all selected discounts
      await Promise.all(selectedRows.map((discount) => onDelete(discount.id)));
      setSelectedRows([]);
      setBulkDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error during bulk delete:', error);
    }
  }, [selectedRows, onDelete]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: '',
        width: 50,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        pinned: 'left',
        sortable: false,
        filter: false,
        resizable: false,
      },
      {
        headerName: 'Discount',
        field: 'name',
        flex: 2,
        cellRenderer: (params) => {
          const discount = params.data;

          return (
            <div className="flex items-center space-x-4 py-2">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  discount.type === 'percentage'
                    ? 'bg-blue-100'
                    : 'bg-green-100'
                }`}
              >
                {discount.type === 'percentage' ? (
                  <Percent className="h-6 w-6 text-blue-600" />
                ) : (
                  <DollarSign className="h-6 w-6 text-green-600" />
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-800">
                  {discount.name || 'Unnamed Discount'}
                </h3>
              </div>
            </div>
          );
        },
        sortable: true,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Value',
        field: 'value',
        width: 140,
        cellRenderer: (params) => {
          const discount = params.data;
          return discount.type === 'percentage' ? (
            <span className="font-medium text-blue-600">
              {discount.value}% Off
            </span>
          ) : (
            <span className="font-medium text-green-600">
              ₹{discount.value} Off
            </span>
          );
        },
        sortable: true,
        filter: 'agNumberColumnFilter',
        cellClass: 'flex items-center',
      },
      {
        headerName: 'Type',
        field: 'type',
        width: 120,
        cellRenderer: (params) => (
          <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
            {params.value === 'percentage' ? 'Percentage' : 'Fixed'}
          </span>
        ),
        sortable: true,
        filter: 'agTextColumnFilter',
        cellClass: 'flex items-center',
      },
      {
        headerName: 'Actions',
        width: 220,
        pinned: 'right',
        cellRenderer: (params) => (
          <div className="flex space-x-2 py-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-gray-300 bg-gray-100 px-2"
              onClick={(e) => handleEditClick(params.data, e)}
            >
              <Edit size={14} className="mr-1" /> Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="h-8 bg-red-600 px-2"
              onClick={(e) => handleDeleteClick(params.data, e)}
            >
              <Trash2 size={14} className="mr-1" /> Delete
            </Button>
          </div>
        ),
        sortable: false,
        filter: false,
        cellClass: 'flex items-center',
      },
    ],
    [handleDeleteClick, handleEditClick]
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  );

  const gridOptions = useMemo(
    () => ({
      rowHeight: 80,
      suppressRowClickSelection: true,
    }),
    []
  );

  const onSelectionChanged = useCallback((params) => {
    const selectedNodes = params.api.getSelectedNodes();
    setSelectedRows(selectedNodes.map((node) => node.data));
  }, []);

  if (discounts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8">
        <EmptyState
          title="No discounts available"
          text="You do not have any discounts created. Create one to get started."
          buttonText="Add a discount"
          onClick={onCreateDiscount}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Discounts Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="min-w-max text-lg font-semibold text-gray-900">
                Discounts ({filteredDiscounts.length})
              </h2>
            </div>
            <div className="max-w-1/2 ml-6 flex w-full items-center justify-end gap-2">
              {selectedRows.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setBulkDeleteDialogOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  Delete Selected ({selectedRows.length})
                </Button>
              )}
              <div className="relative w-full max-w-lg">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search discounts..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 500, width: '100%' }}
          >
            <AgGridReact
              rowData={filteredDiscounts}
              columnDefs={columnDefs}
              gridOptions={gridOptions}
              theme={myTheme}
              modules={[
                ClientSideRowModelModule,
                ValidationModule,
                RowSelectionModule,
                TextFilterModule,
              ]}
              rowSelection="multiple"
              defaultColDef={defaultColDef}
              animateRows={true}
              onSelectionChanged={onSelectionChanged}
            />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Discount</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to delete "${discountToDelete?.name || 'this discount'}"? This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (discountToDelete) {
                  await onDelete(discountToDelete.id);
                  setDeleteDialogOpen(false);
                }
              }}
              className="bg-red-600 bg-red-700"
            >
              Delete
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
            <AlertDialogTitle>Delete Selected Discounts</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to delete ${selectedRows.length} selected discount${selectedRows.length > 1 ? 's' : ''}? This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-red-600 bg-red-700"
            >
              Delete {selectedRows.length} Discount
              {selectedRows.length > 1 ? 's' : ''}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DiscountList;
