"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface VariantSelectorProps {
  category: string;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export function VariantSelector({
  category,
  options,
  selectedValue,
  onChange,
}: VariantSelectorProps) {
  const categoryDisplayNames: Record<string, string> = {
    tamanho: "Tamanho",
    tipo: "Tipo",
  };

  const getDisplayName = (category: string): string => {
    return (
      categoryDisplayNames[category] ||
      category.charAt(0).toUpperCase() + category.slice(1)
    );
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-900">{getDisplayName(category)}</h3>
      <RadioGroup
        value={selectedValue}
        onValueChange={onChange}
        className="flex flex-wrap gap-3"
      >
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Label
                htmlFor={`${category}-${option}`}
                className={`px-4 py-2 rounded-md border cursor-pointer flex items-center justify-center ${
                  selectedValue === option
                    ? "bg-[#e50000] text-white border-[#e50000]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
              >
                <RadioGroupItem
                  value={option}
                  id={`${category}-${option}`}
                  className="sr-only"
                />
                {option}
              </Label>
            </motion.div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
