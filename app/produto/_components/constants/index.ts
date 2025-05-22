// Cores do tema
export const COLORS = {
  primary: "#e50000",
  primaryHover: "#c00000",
  secondary: "#f4f4f4",
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f59e0b",
} as const;

// Configurações de entrega
export const DELIVERY_CONFIG = {
  baseDays: 3,
  maxVariation: 3,
  freeShippingThreshold: 100,
} as const;

// Textos da aplicação
export const APP_TEXTS = {
  addToCart: "Adicionar ao Carrinho",
  addToFavorites: "Adicionar aos Favoritos",
  checkDelivery: "Verificar Disponibilidade de Entrega",
  deliveryAvailable: "Entrega disponível para este endereço!",
  productDetails: "Detalhes do Produto",
  inStock: "Em Estoque",
  freeShipping: "Frete grátis em compras acima de R$ 100",
  enterCep: "Digite o CEP (CEP)",
  check: "Verificar",
  quantity: "Quantidade",
} as const;

// Mensagens de toast
export const TOAST_MESSAGES = {
  delivery: {
    invalidCep: {
      title: "CEP inválido",
      description: "Por favor, digite um CEP com 8 dígitos válidos",
    },
    cepNotFound: {
      title: "CEP não encontrado",
      description: "Verifique se o CEP está correto e tente novamente",
    },
    connectionError: {
      title: "Erro ao verificar CEP",
      description: "Verifique sua conexão e tente novamente",
    },
    success: {
      title: "Endereço encontrado!",
      getDescription: (city: string, state: string) =>
        `Entrega disponível para ${city}/${state}`,
    },
  },
} as const;

// Validações
export const VALIDATION = {
  cepLength: 8,
  cepRegex: /^\d{8}$/,
} as const;
