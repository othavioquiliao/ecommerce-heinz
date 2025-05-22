"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { APP_TEXTS } from "./constants";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 10,
  disabled = false,
}: QuantitySelectorProps) {
  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      onChange(value);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-900">{APP_TEXTS.quantity}</h3>
      <div className="flex items-center space-x-3">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecrement}
            disabled={disabled || quantity <= min}
            className="h-10 w-10 p-0"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </motion.div>

        <Input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={max}
          disabled={disabled}
          className="w-20 text-center"
        />

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={handleIncrement}
            disabled={disabled || quantity >= max}
            className="h-10 w-10 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </motion.div>

        <span className="text-sm text-gray-500 ml-2">Máx: {max}</span>
      </div>
    </div>
  );
}
