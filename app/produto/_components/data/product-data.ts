import type { Product, ProductItem } from "../types";

// Isso aqui e para fazer o mock do produto que esta sendo vendido
export const productData: Product = [
  {
    id: "1",
    name: "Ketchup Tradicional Heinz",
    tamanho: ["397g", "567g", "1.033g"],
    preco: [15.99, 19.99, 25.99],
    descricao:
      "O Ketchup Favorito da América. Feito com tomates vermelhos e maduros para o sabor encorpado e inconfundível do Heinz.",
    imagens: {
      tradicional397: [
        "/img/tradicional/397.jpg",
        "/img/tradicional/nutricional.jpg",
        "/img/tradicional/397-lado.jpg",
        "/img/tradicional/100-vegetal.jpg",
      ],
      tradicional567: [
        "/img/tradicional/567.jpg",
        "/img/tradicional/nutricional.jpg",
        "/img/tradicional/567-lado.jpg",
        "/img/tradicional/100-vegetal.jpg",
      ],
      tradicional1033: [
        "/img/tradicional/1033.jpg",
        "/img/tradicional/nutricional.jpg",
        "/img/tradicional/1033-lado.jpg",
        "/img/tradicional/100-vegetal.jpg",
      ],
    },
    variants: {
      tamanho: ["397g", "567g", "1.033g"],
      tipo: ["Tradicional", "Vegetal", "Light"],
    },
    stock: 50,
    rating: 4.8,
    reviews: 189,
  },
  {
    id: "2",
    name: "Maionese Heinz",
    tamanho: ["215g", "390g", "400g"],
    preco: [13.99, 14.49, 15.99],
    descricao:
      "A Maionese Heinz é cremosa, saborosa e contém ovos caipiras, que dão a ela um sabor inigualável.",
    imagens: {
      maionese215: [
        "/img/maionese/215.jpg",
        "/img/maionese/nutricional.jpg",
        "/img/maionese/390-lado.jpg",
        "/img/maionese/100-ovo.jpg",
      ],
      maionese390: [
        "/img/maionese/390.jpg",
        "/img/maionese/nutricional.jpg",
        "/img/maionese/390-lado.jpg",
        "/img/maionese/100-ovo.jpg",
      ],
      maionese400: [
        "/img/maionese/400.jpg",
        "/img/maionese/nutricional.jpg",
        "/img/maionese/400-lado.jpg",
        "/img/maionese/100-ovo.jpg",
      ],
    },
    variants: {
      tamanho: ["215g", "390g", "400g"],
      tipo: ["Tradicional", "Light"],
    },
    stock: 35,
    rating: 4.5,
    reviews: 234,
  },
  {
    id: "3",
    name: "Mostarda Heinz",
    tamanho: ["200g", "255g"],
    preco: [15.99, 16.99],
    descricao:
      "A Mostarda Heinz é intensa e tem aquele delicioso sabor tradicional da mostarda. Produzida com grãos de mostarda de verdade e com 6 ingredientes de qualidade.",
    imagens: {
      mostarda200: [
        "/img/mostarda/200.jpg",
        "/img/mostarda/nutricional.jpg",
        "/img/mostarda/200-lado.jpg",
        "/img/mostarda/mais-sabor.jpg",
      ],
      mostarda255: [
        "/img/mostarda/255.jpg",
        "/img/mostarda/nutricional.jpg",
        "/img/mostarda/255-lado.jpg",
        "/img/mostarda/mais-sabor.jpg",
      ],
    },
    variants: {
      tamanho: ["200g", "255g"],
      tipo: ["Tradicional", "Picante"],
    },
    stock: 25,
    rating: 4.7,
    reviews: 198,
  },
];

// Função para obter produto por ID
export const getProductById = (id: string): ProductItem | undefined => {
  return productData.find((product) => product.id === id);
};

// Função para obter lista de variedades disponíveis
export const getAvailableVarieties = (): Array<{
  id: string;
  name: string;
}> => {
  return productData.map((product) => {
    let name = "Outros";
    if (product.name.includes("Ketchup")) name = "Ketchup";
    else if (product.name.includes("Maionese")) name = "Maionese";
    else if (product.name.includes("Mostarda")) name = "Mostarda";

    return {
      id: product.id,
      name,
    };
  });
};

// Mapeia tamanhos para chaves de imagens de forma mais type-safe
export const sizeToImageKeyMap: Record<string, Record<string, string>> = {
  "1": {
    "397g": "tradicional397",
    "567g": "tradicional567",
    "1.033g": "tradicional1033",
  },
  "2": {
    "215g": "maionese215",
    "390g": "maionese390",
    "400g": "maionese400",
  },
  "3": {
    "200g": "mostarda200",
    "255g": "mostarda255",
  },
};

// Função utilitária para obter imagens por tamanho e produto
export const getImagesBySize = (productId: string, size: string): string[] => {
  const product = getProductById(productId);
  if (!product) return [];

  const imageKey = sizeToImageKeyMap[productId]?.[size];
  return imageKey ? product.imagens[imageKey] || [] : [];
};

// Função utilitária para obter preço por índice de tamanho e produto
export const getPriceBySize = (productId: string, size: string): number => {
  const product = getProductById(productId);
  if (!product) return 0;

  const sizeIndex = product.tamanho.findIndex((t) => t === size);
  return product.preco[sizeIndex >= 0 ? sizeIndex : 0];
};
