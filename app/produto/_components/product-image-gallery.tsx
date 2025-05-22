"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductImageGalleryProps {
  images: string[];
}

export function ProductImageGallery({ images = [] }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset selectedImageIndex quando as imagens mudarem
  useEffect(() => {
    setSelectedImageIndex(0);
    console.log("Imagens na galeria:", images);
  }, [images]);

  // Verifica se temos imagens para mostrar
  const hasImages = Array.isArray(images) && images.length > 0;

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handlePrevImage = () => {
    if (!hasImages) return;
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!hasImages) return;
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // Se não houver imagens, mostre um placeholder
  if (!hasImages) {
    return (
      <div className="space-y-4">
        <div className="relative rounded-lg overflow-hidden bg-white aspect-square flex items-center justify-center">
          <p className="text-gray-400">Imagens não disponíveis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative rounded-lg overflow-hidden bg-white aspect-square">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <div
              className={`relative w-full h-full cursor-${
                isZoomed ? "zoom-out" : "zoom-in"
              }`}
              onClick={toggleZoom}
            >
              <Image
                src={images[selectedImageIndex] || "/placeholder.svg"}
                alt={`Imagem do produto ${selectedImageIndex + 1}`}
                fill
                className={`object-contain transition-transform duration-300 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white/90"
            onClick={handlePrevImage}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Imagem anterior</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white/90"
            onClick={handleNextImage}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima imagem</span>
          </Button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative rounded-md overflow-hidden border-2 flex-shrink-0 ${
              selectedImageIndex === index
                ? "border-[#e50000]"
                : "border-transparent"
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <div className="relative w-16 h-16 cursor-pointer">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Miniatura ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
