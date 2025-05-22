"use client";

import { ProductImageGallery } from "@/app/produto/_components/product-image-gallery";
import { ProductInfo } from "@/app/produto/_components/product-info";
import { VariantSelector } from "@/app/produto/_components/variant-selector";
import { QuantitySelector } from "@/app/produto/_components/quantity-selector";
import { DeliveryChecker } from "@/app/produto/_components/delivery-checker";
import { AddToCartSection } from "@/app/produto/_components/add-to-cart-section";
import { useProductVariants } from "@/app/produto/_components/hooks/use-product-variants";
import { useCart } from "@/app/produto/_components/hooks/use-cart";
import VarietySelector from "@/app/produto/_components/variety";
export default function ProductPage() {
  const {
    selectedProductId,
    currentProduct,
    selectedVariants,
    currentImages,
    currentPrice,
    quantity,
    handleProductChange,
    handleVariantChange,
    handleQuantityChange,
  } = useProductVariants();

  const { handleAddToCart: addToCart } = useCart();

  const handleAddToCart = () => {
    if (currentProduct) {
      addToCart(currentProduct, selectedVariants, quantity, currentPrice);
    }
  };

  // Se não há produto atual, mostrar loading ou erro
  if (!currentProduct) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm p-4 md:p-8">
          {/* Sessao das imagens do produto */}
          <ProductImageGallery images={currentImages} />

          {/* Sessao das informacoes do produto */}
          <div className="space-y-6">
            <ProductInfo
              name={currentProduct.name}
              price={currentPrice}
              description={currentProduct.descricao}
              rating={currentProduct.rating}
              reviews={currentProduct.reviews}
            />

            <div className="space-y-6 pt-4 border-t border-gray-100">
              {/* Selecionador de variedade */}
              <VarietySelector
                selectedValue={selectedProductId}
                onChange={handleProductChange}
              />

              {/* Selecionador de variantes */}
              {Object.entries(currentProduct.variants).map(
                ([category, options]) => (
                  <VariantSelector
                    key={category}
                    category={category}
                    options={options}
                    selectedValue={
                      selectedVariants[
                        category as keyof typeof selectedVariants
                      ]
                    }
                    onChange={(value) => handleVariantChange(category, value)}
                  />
                )
              )}

              {/* Selecionador de quantidade */}
              <QuantitySelector
                quantity={quantity}
                onChange={handleQuantityChange}
                max={currentProduct.stock}
              />

              {/* Sessao de adicao ao carrinho */}
              <AddToCartSection
                onAddToCart={handleAddToCart}
                quantity={quantity}
              />
            </div>

            {/* Sessao de verificacao de entrega */}
            <div className="pt-6 border-t border-gray-100">
              <DeliveryChecker />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
