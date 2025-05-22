import { useState, useEffect } from "react";
import type { ProductState } from "../types";

const STORAGE_KEY = "product-state";
const EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutos

interface StorageItem {
  value: ProductState;
  timestamp: number;
}

const defaultState: ProductState = {
  productId: "1",
  variants: { tamanho: "", tipo: "" },
  quantity: 1,
  imageIndex: 0,
};

export const useSimplePersistent = () => {
  const [state, setState] = useState<ProductState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega estado do localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: StorageItem = JSON.parse(stored);

        // Verifica se expirou
        if (Date.now() - parsed.timestamp > EXPIRATION_TIME) {
          localStorage.removeItem(STORAGE_KEY);
          console.log("⏰ Estado expirado, usando padrão");
        } else {
          setState(parsed.value);
          console.log("📖 Estado carregado:", parsed.value);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar estado:", error);
    }

    setIsLoaded(true);
  }, []);

  // Salva estado no localStorage
  const updateState = (newState: Partial<ProductState>) => {
    const updatedState = { ...state, ...newState };
    setState(updatedState);

    if (isLoaded && typeof window !== "undefined") {
      try {
        const item: StorageItem = {
          value: updatedState,
          timestamp: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
        console.log("💾 Estado salvo:", updatedState);
      } catch (error) {
        console.error("Erro ao salvar estado:", error);
      }
    }
  };

  return {
    state,
    updateState,
    isLoaded,
  };
};
