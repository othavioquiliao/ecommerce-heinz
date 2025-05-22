"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  imageIndex: number;
  onImageChange: (index: number) => void;
}

export function ProductImageGallery({
  images = [],
  imageIndex,
  onImageChange,
}: ProductImageGalleryProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images.length) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">Sem imagens</p>
      </div>
    );
  }

  const nextImage = () =>
    onImageChange(imageIndex === images.length - 1 ? 0 : imageIndex + 1);
  const prevImage = () =>
    onImageChange(imageIndex === 0 ? images.length - 1 : imageIndex - 1);

  return (
    <div className="space-y-4">
      {/* Imagem Principal */}
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
        <Image
          src={images[imageIndex]}
          alt="Produto"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-contain transition-transform cursor-pointer ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
          priority
        />

        {/* Navegação */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => onImageChange(index)}
              className={`relative w-16 h-16 rounded border-2 cursor-pointer flex-shrink-0 ${
                index === imageIndex ? "border-red-500" : "border-gray-200"
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="64px"
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
