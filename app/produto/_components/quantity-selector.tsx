"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
}

export function QuantitySelector({
  quantity,
  onChange,
  max = 10,
}: QuantitySelectorProps) {
  const increment = () => quantity < max && onChange(quantity + 1);
  const decrement = () => quantity > 1 && onChange(quantity - 1);

  return (
    <div className="space-y-1">
      <h3 className="font-medium text-gray-900">Quantidade</h3>
      <div className="flex items-center gap-2">
        <button
          onClick={decrement}
          disabled={quantity <= 1}
          className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
        >
          <Minus className="w-4 h-4" />
        </button>

        <span className="w-12 text-center font-medium">{quantity}</span>

        <button
          onClick={increment}
          disabled={quantity >= max}
          className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
        </button>

        <span className="text-sm text-gray-500">Máx: {max}</span>
      </div>
    </div>
  );
}
