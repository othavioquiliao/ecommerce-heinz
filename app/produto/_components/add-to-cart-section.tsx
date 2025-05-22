"use client";

import { ShoppingCart, Heart } from "lucide-react";

interface AddToCartSectionProps {
  onAddToCart: () => void;
  quantity?: number;
}

export function AddToCartSection({
  onAddToCart,
  quantity = 1,
}: AddToCartSectionProps) {
  return (
    <div className="flex gap-3 pt-2">
      <button
        onClick={onAddToCart}
        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-bold flex items-center justify-center gap-2 transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        {quantity > 1
          ? `Adicionar ao carrinho (${quantity})`
          : "Adicionar ao carrinho"}
      </button>

      <button className="hidden md:flex hover:text-red-600 items-center justify-center w-12 h-12 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
        <Heart className="w-5 h-5 " />
      </button>
    </div>
  );
}
