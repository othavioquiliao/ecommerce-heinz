"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { APP_TEXTS } from "./constants";

interface AddToCartSectionProps {
  onAddToCart: () => void;
  disabled?: boolean;
  quantity?: number;
}

export function AddToCartSection({
  onAddToCart,
  disabled = false,
  quantity = 1,
}: AddToCartSectionProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-4">
      <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
        <Button
          className="w-full bg-[#e50000] hover:bg-[#c00000] text-white"
          size="lg"
          onClick={onAddToCart}
          disabled={disabled}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {quantity > 1
            ? `${APP_TEXTS.addToCart} (${quantity})`
            : APP_TEXTS.addToCart}
        </Button>
      </motion.div>

      <motion.div whileTap={{ scale: 0.95 }} className="md:flex hidden">
        <Button variant="outline" size="lg" className="h-full">
          <Heart className="h-5 w-5" />
          <span className="sr-only">{APP_TEXTS.addToFavorites}</span>
        </Button>
      </motion.div>
    </div>
  );
}
