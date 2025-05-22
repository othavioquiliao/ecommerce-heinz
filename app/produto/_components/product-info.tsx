"use client";

import { Star } from "lucide-react";

interface ProductInfoProps {
  name: string;
  price: number;
  description: string;
  rating: number;
  reviews: number;
}

export function ProductInfo({
  name,
  price,
  description,
  rating,
  reviews,
}: ProductInfoProps) {
  const formattedPrice = price.toFixed(2);
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(rating));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{name}</h1>

      <div className="flex items-center gap-1">
        {stars.map((filled, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              filled
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">
          {rating} ({reviews} avaliações)
        </span>
      </div>

      <div className="text-3xl font-bold text-gray-900">
        R$ {formattedPrice}
      </div>

      <p className="text-gray-600">{description}</p>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-green-600 font-medium">✓ Em estoque</span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-600">Frete grátis</span>
      </div>
    </div>
  );
}
