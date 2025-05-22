export interface ProductItem {
  id: string;
  name: string;
  tamanho: string[];
  preco: number[];
  descricao: string;
  imagens: Record<string, string[]>;
  variants: {
    tamanho: string[];
    tipo: string[];
  };
  stock: number;
  rating: number;
  reviews: number;
}

export type Product = ProductItem[];

export interface ProductVariants {
  tamanho: string;
  tipo: string;
}

export interface AddressData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface CartItem {
  product: ProductItem;
  variants: ProductVariants;
  quantity: number;
  price: number;
}

export type SizeVariant = "397g" | "567g" | "1.033g";
export type ProductType = "Tradicional" | "Vegetal" | "Light";
