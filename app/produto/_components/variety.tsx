"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { getAvailableVarieties } from "./data/product-data";

interface VarietySelectorProps {
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function VarietySelector({
  selectedValue,
  onChange,
}: VarietySelectorProps) {
  const varieties = getAvailableVarieties();

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-900">Variedade</h3>
      <RadioGroup
        value={selectedValue}
        onValueChange={onChange}
        className="flex flex-wrap gap-3"
      >
        {varieties.map((variety) => (
          <div key={variety.id} className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Label
                htmlFor={`variety-${variety.id}`}
                className={`px-4 py-2 rounded-md border cursor-pointer flex items-center justify-center ${
                  selectedValue === variety.id
                    ? "bg-[#e50000] text-white border-[#e50000]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
              >
                <RadioGroupItem
                  value={variety.id}
                  id={`variety-${variety.id}`}
                  className="sr-only"
                />
                {variety.name}
              </Label>
            </motion.div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
