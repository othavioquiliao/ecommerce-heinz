import { useState, useMemo, useEffect } from "react";
import type { ProductItem } from "../types";
import {
  getImagesBySize,
  getPriceBySize,
  getProductById,
} from "../data/product-data";
import { useSimplePersistent } from "./use-simple-persistent";

export const useProductVariants = () => {
  const { state, updateState, isLoaded } = useSimplePersistent();
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  // Obtém o produto atual
  const currentProduct = useMemo(() => {
    return getProductById(state.productId);
  }, [state.productId]);

  // Inicializa valores padrão apenas na primeira carga
  useEffect(() => {
    if (isLoaded && currentProduct) {
      const needsInit = !state.variants.tamanho || !state.variants.tipo;

      if (needsInit) {
        updateState({
          variants: {
            tamanho: currentProduct.variants.tamanho[0] || "",
            tipo: currentProduct.variants.tipo[0] || "",
          },
        });
      }
    }
  }, [isLoaded]);

  // Atualiza imagens quando produto ou tamanho muda
  useEffect(() => {
    if (currentProduct && state.variants.tamanho) {
      const images = getImagesBySize(state.productId, state.variants.tamanho);
      setCurrentImages(images);
    } else if (currentProduct) {
      // Fallback para primeiro tamanho
      const firstSize = currentProduct.variants.tamanho[0];
      if (firstSize) {
        const images = getImagesBySize(state.productId, firstSize);
        setCurrentImages(images);
      }
    }
  }, [state.productId, state.variants.tamanho, currentProduct]);

  // Obtém preço atual
  const currentPrice = useMemo(() => {
    if (!currentProduct || !state.variants.tamanho) return 0;
    return getPriceBySize(state.productId, state.variants.tamanho);
  }, [state.productId, state.variants.tamanho, currentProduct]);

  // Handlers
  const handleProductChange = (productId: string) => {
    // Busca o novo produto para pegar as variantes disponíveis
    const newProduct = getProductById(productId);
    if (newProduct) {
      // Automaticamente seleciona o primeiro tamanho e tipo disponíveis
      updateState({
        productId,
        variants: {
          tamanho: newProduct.variants.tamanho[0] || "",
          tipo: newProduct.variants.tipo[0] || "",
        },
        imageIndex: 0, // Reseta para primeira imagem
      });
    }
  };

  const handleVariantChange = (category: string, value: string) => {
    updateState({
      variants: {
        ...state.variants,
        [category]: value,
      },
    });
  };

  const handleQuantityChange = (quantity: number) => {
    updateState({ quantity });
  };

  const handleImageChange = (imageIndex: number) => {
    updateState({ imageIndex });
  };

  return {
    selectedProductId: state.productId,
    currentProduct,
    selectedVariants: state.variants,
    currentImages,
    currentPrice,
    quantity: state.quantity,
    imageIndex: state.imageIndex,
    handleProductChange,
    handleVariantChange,
    handleQuantityChange,
    handleImageChange,
    isLoaded,
  };
};
