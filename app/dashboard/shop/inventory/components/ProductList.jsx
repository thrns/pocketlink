'use client';

import React, { useMemo, useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Trash,
  Edit,
  FileText,
  Link as LinkIcon,
  ShoppingBag,
  ExternalLink,
  Search,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { isMobile } from 'react-device-detect';
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
import { Card, CardContent } from '@/components/ui/card';

// Register AG-Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowSelectionModule,
  ValidationModule,
  PaginationModule,
  CellStyleModule,
  TextFilterModule,
]);

// Helper function to get product type display info
const getProductTypeInfo = (product) => {
  switch (product.product_type) {
    case 'physical':
      return {
        label: 'Physical Product',
        icon: <ShoppingBag size={12} />,
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
      };
    case 'external_link':
      return {
        label: 'External Product',
        icon: <ExternalLink size={12} />,
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-700',
      };
    default: // digital
      return {
        label:
          product.file_url && product.file_url.length > 0
            ? 'File Download'
            : product.access_url && product.access_url.length > 0
              ? 'Access Link'
              : 'Digital Product',
        icon:
          product.file_url && product.file_url.length > 0 ? (
            <FileText size={12} />
          ) : product.access_url && product.access_url.length > 0 ? (
            <LinkIcon size={12} />
          ) : (
            <FileText size={12} />
          ),
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
      };
  }
};

const ProductList = ({
  products,
  onDeleteProduct,
  onEditProduct,
  setIsModalOpen,
  setProductToEdit,
  onCreateCategory,
}) => {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!searchText.trim()) return products;

    const searchLower = searchText.toLowerCase();
    return products.filter((product) => {
      return (
        (product.title || product.name || '')
          .toLowerCase()
          .includes(searchLower) ||
        (product.description || '').toLowerCase().includes(searchLower) ||
        (product.type || '').toLowerCase().includes(searchLower)
      );
    });
  }, [products, searchText]);

  const handleDeleteClick = useCallback((product, event) => {
    event.stopPropagation();
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  }, []);

  const handleEditClick = useCallback(
    (product, event) => {
      event.stopPropagation();
      onEditProduct(product);
    },
    [onEditProduct]
  );

  const handleBulkDelete = useCallback(async () => {
    if (selectedRows.length === 0) return;

    try {
      // Delete all selected products
      await Promise.all(
        selectedRows.map((product) => onDeleteProduct(product))
      );
      setSelectedRows([]);
      setBulkDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error during bulk delete:', error);
    }
  }, [selectedRows, onDeleteProduct]);

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
        headerName: 'Product',
        field: 'title',
        flex: 2,
        cellRenderer: (params) => {
          const product = params.data;
          const productTypeInfo = getProductTypeInfo(product);

          // Default gradient options for products without images
          const defaultGradients = [
            '/shop/gradients/shopGradient1.jpg',
            '/shop/gradients/shopGradient2.jpg',
            '/shop/gradients/shopGradient3.jpg',
            '/shop/gradients/shopGradient4.jpg',
          ];

          // Helper function to get product image or fallback gradient
          const getProductImage = (product, index) => {
            // Check for valid product images (not placeholder, not empty, not null)
            if (
              product.images &&
              product.images.length > 0 &&
              product.images[0] &&
              !product.images[0].includes('placeholder') &&
              product.images[0].trim() !== ''
            ) {
              return product.images[0];
            }
            if (
              product.image &&
              product.image.trim() !== '' &&
              !product.image.includes('placeholder')
            ) {
              return product.image;
            }
            // Use index to get consistent gradient for each product
            // If index is undefined, use a hash of the product ID for consistency
            const fallbackIndex =
              index !== undefined
                ? index
                : Math.abs(
                    product.id
                      .split('-')
                      .join('')
                      .split('')
                      .reduce((a, b) => a + b.charCodeAt(0), 0)
                  );
            return defaultGradients[fallbackIndex % defaultGradients.length];
          };

          const imageUrl = getProductImage(product, params.rowIndex);

          return (
            <div className="flex items-center space-x-4 py-2">
              <img
                key={`${product.id}-${params.rowIndex}`}
                src={imageUrl}
                alt={product.title || product.name || 'Unnamed'}
                className="h-12 w-12 rounded-lg border object-cover"
                onError={(e) => {
                  console.log('Image failed to load:', imageUrl);
                  // Fallback to first gradient if image fails
                  e.target.src = defaultGradients[0];
                }}
              />
              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-800">
                  {product.title || product.name}
                </h3>
                <p className="max-w-xs truncate text-sm text-gray-500">
                  {product.description || 'No description'}
                </p>
              </div>
            </div>
          );
        },
        sortable: true,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Price',
        field: 'price',
        width: 120,
        cellRenderer: (params) => (
          <span className="font-semibold text-gray-800">₹{params.value}</span>
        ),
        sortable: true,
        filter: 'agNumberColumnFilter',
        cellClass: 'flex items-center',
      },
      {
        headerName: 'Type',
        field: 'type',
        width: 160,
        cellRenderer: (params) => {
          const product = params.data;
          const typeInfo = getProductTypeInfo(product);

          return (
            <span
              className={`flex items-center rounded-md px-2 py-1 text-xs font-medium ${typeInfo.bgColor} ${typeInfo.textColor}`}
            >
              {typeInfo.icon}
              <span className="ml-1">{typeInfo.label}</span>
            </span>
          );
        },
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
              className="h-8 border-gray-300 px-2 hover:bg-gray-100"
              onClick={(e) => handleEditClick(params.data, e)}
            >
              <Edit size={14} className={isMobile ? "" : "mr-1"} />
              {!isMobile && " Edit"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="h-8 bg-red-600 px-2 hover:bg-red-600"
              onClick={(e) => handleDeleteClick(params.data, e)}
            >
              <Trash size={14} className={isMobile ? "" : "mr-1"} />
              {!isMobile && " Delete"}
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

  if (products.length === 0) {
    return (
      <Card className="rounded-xl border border-gray-200 bg-white">
        <CardContent className="p-0">
          <div className="flex flex-col items-center justify-center py-16">
            {/* Empty State Illustration */}
            <EmptyState
              title="No products found"
              text="You do not have any products created, make one to get started."
              buttonText="Add a product"
              onClick={() => {
                setProductToEdit(null);
                onCreateCategory();
              }}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Products Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="w-full p-4">
          {/* Desktop Layout */}
          <div className="mb-4 hidden w-full items-center justify-between md:flex">
            <div className="flex items-center gap-4">
              <h2 className="min-w-max text-lg font-semibold text-gray-900">
                Products ({filteredProducts.length})
              </h2>
            </div>
            <div className="max-w-1/2 ml-6 flex w-full items-center justify-end gap-2">
              {selectedRows.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setBulkDeleteDialogOpen(true)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
                >
                  <Trash size={14} />
                  Delete Selected ({selectedRows.length})
                </Button>
              )}

              <div className="relative w-full max-w-lg">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="mb-4 flex flex-col gap-3 md:hidden">
            {/* Heading Row */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Products ({filteredProducts.length})
              </h2>
              {selectedRows.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setBulkDeleteDialogOpen(true)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
                >
                  <Trash size={14} />
                  Delete Selected ({selectedRows.length})
                </Button>
              )}
            </div>
            
            {/* Search Row */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 600, width: '100%' }}
          >
            <AgGridReact
              rowData={filteredProducts}
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
              suppressRowClickSelection={true}
            />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to delete "${productToDelete?.title || productToDelete?.name}"? This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (productToDelete) {
                  await onDeleteProduct(productToDelete);
                  setDeleteDialogOpen(false);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
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
            <AlertDialogTitle>Delete Selected Products</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to delete ${selectedRows.length} selected product${selectedRows.length > 1 ? 's' : ''}? This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-red-600 bg-red-700"
            >
              Delete {selectedRows.length} Product
              {selectedRows.length > 1 ? 's' : ''}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductList;
