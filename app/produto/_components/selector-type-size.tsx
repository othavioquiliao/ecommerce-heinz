"use client";

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
  const displayNames: Record<string, string> = {
    tamanho: "Tamanho",
    tipo: "Tipo",
  };

  const categoryName =
    displayNames[category] ||
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="space-y-1">
      <h3 className="font-medium text-gray-900">{categoryName}</h3>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-4 py-2 rounded-md border transition-colors min-w-fit font-bold ${
              selectedValue === option
                ? "bg-red-600 text-white border-red-600"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
