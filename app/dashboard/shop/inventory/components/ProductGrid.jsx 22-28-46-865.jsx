'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Trash,
  Edit,
  FileText,
  Link as LinkIcon,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import EmptyState from '@/components/EmptyState';

// Helper function to get product type display info
const getProductTypeInfo = (product) => {
  switch (product.product_type) {
    case 'physical':
      return {
        label: 'Physical',
        icon: <ShoppingBag size={12} />,
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
      };
    case 'external_link':
      return {
        label: 'External',
        icon: <ExternalLink size={12} />,
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-700',
      };
    default: // digital
      return {
        label:
          product.file_url && product.file_url.length > 0
            ? 'File'
            : product.access_url && product.access_url.length > 0
              ? 'Link'
              : 'Digital',
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

const ProductGrid = ({
  products,
  onDeleteProduct,
  onEditProduct,
  setIsModalOpen,
  setProductToEdit,
  onCreateCategory,
}) => {
  return (
    <div className="w-full">
      {products.length === 0 ? (
        <EmptyState
          title="No products found"
          text="You do not have any products created, make one to get started."
          buttonText="Add a product"
          onClick={() => {
            setProductToEdit(null);
            onCreateCategory();
          }}
        />
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative flex cursor-pointer flex-col items-center justify-between rounded-xl border bg-white p-5 transition duration-300"
            >
              {/* Product Image */}
              <div>
                <div className="relative flex h-36 w-full justify-center">
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : product.image // Fallback to singular image prop if it exists
                          ? product.image
                          : '/placeholder.png'
                    }
                    alt={product.title || product.name || 'Unnamed'}
                    className="h-32 w-32 rounded-md object-cover"
                  />
                </div>

                {/* Product Type Indicator */}
                <div
                  className={`absolute left-3 top-3 flex items-center rounded-md px-2 py-1 text-xs font-medium ${getProductTypeInfo(product).bgColor} ${getProductTypeInfo(product).textColor}`}
                >
                  {getProductTypeInfo(product).icon}
                  <span className="ml-1">
                    {getProductTypeInfo(product).label}
                  </span>
                </div>

                {/* Product Details */}
                <div className="mt-3 w-full text-center">
                  <h2 className="text-md font-semibold text-gray-800">
                    {product.title || product.name}
                  </h2>
                  <p className="text-sm font-medium text-gray-600">
                    ₹{product.price}
                  </p>
                  <p className="text-xs text-gray-500">SKU: {product?.sku}</p>
                </div>
              </div>
              {/* Edit & Delete Buttons */}
              <div className="mt-4 flex w-full flex-col justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-300 hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditProduct(product);
                  }}
                >
                  <Edit size={16} className="mr-1" /> Edit
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full hover:bg-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteProduct(product);
                  }}
                >
                  <Trash size={16} className="mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
