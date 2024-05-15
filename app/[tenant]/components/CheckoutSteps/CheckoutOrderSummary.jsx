'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Package, ShoppingBag, Truck, CreditCard, Check } from 'lucide-react';

const CheckoutOrderSummary = ({
  items,
  subtotal,
  shipping,
  total,
  className,
}) => {
  // Calculate total quantity
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate estimated delivery dates
  const today = new Date();
  const deliveryStart = new Date(today);
  deliveryStart.setDate(today.getDate() + 3); // Example: 3 days from now
  const deliveryEnd = new Date(today);
  deliveryEnd.setDate(today.getDate() + 5); // Example: 5 days from now

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="text-primary h-4 w-4" />
          <h3 className="text-base font-semibold">Order Summary</h3>
        </div>
        <div className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
          {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
        </div>
      </div>

      {/* Main Content Box */}
      <div className="space-y-3 rounded-lg border bg-white p-3">
        {/* Items Scroll Area */}
        <ScrollArea className="h-[150px] rounded-md border bg-gray-50/50">
          <div className="space-y-3 p-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-3 border-b border-gray-100 pb-3 last:border-0"
              >
                {/* Image */}
                <div className="relative flex-shrink-0">
                  <div className="relative h-12 w-12 overflow-hidden rounded border bg-white">
                    {item.thumbnail || item.image ? (
                      <Image
                        src={item.thumbnail || item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 50px, 50px" // Optimize image loading
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                        <Package className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  {/* Quantity Badge - positioned outside the image */}
                  <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-lg ring-2 ring-white">
                    {item.quantity}
                  </div>
                </div>
                {/* Item Details */}
                <div className="min-w-0 flex-1">
                  <h4 className="line-clamp-1 text-xs font-medium">
                    {item.title}
                  </h4>
                  {item.variant && (
                    <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                      {item.variant}
                    </p>
                  )}
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      ₹{item.price.toFixed(2)}
                    </span>
                    <span className="text-xs font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Totals Section */}
        <div className="space-y-2 pt-2">
          {/* Subtotal */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">₹{subtotal.toFixed(2)}</span>
          </div>
          {/* Shipping */}
          {/* <div className="flex justify-between items-center text-xs">
            <span className="text-gray-600">Shipping</span>
            <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium"}>
              {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
            </span>
          </div> */}

          {/* Optional: Add discounts/taxes here if needed, keep styling minimal */}

          <Separator className="my-2" />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Total</span>
            <span className="text-primary text-base font-bold">
              ₹{total.toFixed(2)}
            </span>
          </div>

          {/* Delivery Estimate (Optional - can be removed if too much) */}
          {/* <div className="mt-3 pt-2 border-t border-dashed border-gray-200">
            <div className="flex items-center text-xs text-gray-500">
              <Truck className="h-3 w-3 mr-1.5 flex-shrink-0" />
              <span>Est. Delivery: {formatDate(deliveryStart)} - {formatDate(deliveryEnd)}</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
