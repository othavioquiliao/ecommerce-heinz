"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { APP_TEXTS } from "./constants";

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
  // Format the price with 2 decimal places
  const formattedPrice = price.toFixed(2);

  // Create an array of 5 stars for the rating
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(rating));

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{name}</h1>
        <Badge className="bg-[#e50000] md:flex hidden">Heinz</Badge>
      </div>

      <div className="flex items-center space-x-1">
        {stars.map((filled, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
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

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-gray-900"
      >
        R$ {formattedPrice}
      </motion.div>

      <p className="text-gray-600">{description}</p>

      <div className="flex items-center space-x-2 text-sm">
        <span className="text-green-600 font-medium">
          ✓ {APP_TEXTS.inStock}
        </span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-600">{APP_TEXTS.freeShipping}</span>
      </div>
    </div>
  );
}
