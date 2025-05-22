import type { CartItem, ProductVariants, ProductItem } from "../types";
import { toast } from "sonner";

// Isso aqui e para fazer o mock do carrinho de compras
export const useCart = () => {
  const handleAddToCart = (
    product: ProductItem,
    variants: ProductVariants,
    quantity: number = 1,
    price: number
  ) => {
    const cartItem: CartItem = {
      product,
      variants,
      quantity,
      price,
    };

    // Aqui seria integrado com um contexto global de carrinho ou API
    console.log("Item adicionado ao carrinho:", cartItem);

    // Simular feedback de sucesso
    toast.success("Produto adicionado ao carrinho!");

    return cartItem;
  };

  return {
    handleAddToCart,
  };
};
