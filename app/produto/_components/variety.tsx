"use client";

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
    <div className="space-y-1">
      <h3 className="font-medium text-gray-900">Variedade</h3>
      <div className="flex gap-3 w-full flex-wrap">
        {varieties.map((variety) => (
          <button
            key={variety.id}
            onClick={() => onChange(variety.id)}
            className={`px-4 py-2 rounded-md border transition-colors min-w-fit font-bold ${
              selectedValue === variety.id
                ? "bg-red-600 text-white border-red-600"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            }`}
          >
            {variety.name}
          </button>
        ))}
      </div>
    </div>
  );
}
