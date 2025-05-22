import { useState, useMemo, useEffect } from "react";
import type { ProductVariants, ProductItem } from "../types";
import {
  productData,
  getImagesBySize,
  getPriceBySize,
  getProductById,
} from "../data/product-data";

// Isso aqui e para fazer o mock das variantes do produto
export const useProductVariants = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>("1");
  const [selectedVariants, setSelectedVariants] = useState<ProductVariants>({
    tamanho: "",
    tipo: "",
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  // Obtém o produto atual baseado no ID selecionado
  const currentProduct = useMemo(() => {
    return getProductById(selectedProductId);
  }, [selectedProductId]);

  // Inicializa as variantes quando o produto muda
  useEffect(() => {
    if (currentProduct) {
      setSelectedVariants({
        tamanho: currentProduct.variants.tamanho[0] || "",
        tipo: currentProduct.variants.tipo[0] || "",
      });
    }
  }, [currentProduct]);

  // Obtém o preço atual baseado no tamanho selecionado
  const currentPrice = useMemo(() => {
    if (!currentProduct || !selectedVariants.tamanho) return 0;
    return getPriceBySize(selectedProductId, selectedVariants.tamanho);
  }, [selectedProductId, selectedVariants.tamanho, currentProduct]);

  // Atualiza as imagens quando o produto ou tamanho muda
  useEffect(() => {
    if (currentProduct && selectedVariants.tamanho) {
      const images = getImagesBySize(
        selectedProductId,
        selectedVariants.tamanho
      );
      setCurrentImages(images);
    }
  }, [selectedProductId, selectedVariants.tamanho, currentProduct]);

  const handleProductChange = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleVariantChange = (category: string, value: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return {
    selectedProductId,
    currentProduct,
    selectedVariants,
    currentImages,
    currentPrice,
    quantity,
    handleProductChange,
    handleVariantChange,
    handleQuantityChange,
  };
};
