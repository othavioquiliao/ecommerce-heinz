"use client";

import { APP_TEXTS } from "./constants";

interface ProductDetailsSectionProps {
  description: string;
}

export function ProductDetailsSection({
  description,
}: ProductDetailsSectionProps) {
  return (
    <div className="pt-6 border-t border-gray-100">
      <h3 className="font-semibold text-lg mb-3">{APP_TEXTS.productDetails}</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}
