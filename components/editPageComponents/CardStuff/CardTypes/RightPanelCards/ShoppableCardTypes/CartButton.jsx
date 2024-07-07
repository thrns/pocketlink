// CartButton.jsx
'use client';

import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

const CartButton = ({ product, onIncrease, onDecrease, tenant = false }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
    if (onIncrease) onIncrease(product);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
      if (onDecrease) onDecrease(product);
    }
  };

  if (quantity === 0) {
    return (
      <button
        onClick={handleIncrease}
        className="flex w-full items-center justify-center rounded bg-black py-2 text-sm text-white"
      >
        <ShoppingCart size={16} className="mr-1" />
        ADD TO CART
      </button>
    );
  }

  return (
    <div className="flex w-full items-center justify-between rounded border">
      <button onClick={handleDecrease} className="p-2">
        <Minus size={16} />
      </button>
      <span>{quantity}</span>
      <button onClick={handleIncrease} className="p-2">
        <Plus size={16} />
      </button>
    </div>
  );
};

export default CartButton;
