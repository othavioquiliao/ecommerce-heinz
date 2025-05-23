import { useState } from "react";
import type { AddressData } from "../types";
import { TOAST_MESSAGES, DELIVERY_CONFIG } from "../constants";
import { toast } from "sonner";
export const useDeliveryChecker = () => {
  const [cep, setCep] = useState("");
  const [formattedCep, setFormattedCep] = useState("");
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);

  const validateAndFormatCep = (value: string): boolean => {
    const cleanValue = value.replace(/\D/g, "");
    setCep(cleanValue);

    if (cleanValue.length <= 8) {
      setFormattedCep(cleanValue.replace(/(\d{5})(\d{3})/, "$1-$2"));
    }

    return cleanValue.length === 8 && /^\d{8}$/.test(cleanValue);
  };

  const generateDeliveryEstimate = (cepCode: string): string => {
    // Cálculo determinístico baseado no CEP
    const cepSum = cepCode
      .split("")
      .reduce((sum, digit) => sum + (parseInt(digit) || 0), 0);

    const variation = (cepSum % DELIVERY_CONFIG.maxVariation) + 1;
    const deliveryDays = DELIVERY_CONFIG.baseDays + variation;

    return `${deliveryDays}-${deliveryDays + 1} dias úteis`;
  };

  const resetDeliveryData = () => {
    setAddressData(null);
    setDeliveryEstimate(null);
  };

  // Isso aqui e para verificar se o CEP e valido e se a entrega esta disponivel
  const checkDelivery = async () => {
    if (!validateAndFormatCep(cep)) {
      toast.error(TOAST_MESSAGES.delivery.invalidCep.title, {
        description: TOAST_MESSAGES.delivery.invalidCep.description,
      });
      resetDeliveryData();
      return;
    }

    setIsLoading(true);
    resetDeliveryData();

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!response.ok) {
        throw new Error("Erro na consulta");
      }

      const data = await response.json();

      if (data.erro) {
        toast.error(TOAST_MESSAGES.delivery.cepNotFound.title, {
          description: TOAST_MESSAGES.delivery.cepNotFound.description,
        });
      } else {
        setAddressData(data);
        setDeliveryEstimate(generateDeliveryEstimate(cep));

        toast.success(TOAST_MESSAGES.delivery.success.title, {
          description: TOAST_MESSAGES.delivery.success.getDescription(
            data.localidade,
            data.uf
          ),
        });
      }
    } catch {
      toast.error(TOAST_MESSAGES.delivery.connectionError.title, {
        description: TOAST_MESSAGES.delivery.connectionError.description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formattedCep,
    addressData,
    isLoading,
    deliveryEstimate,
    handleCepChange: validateAndFormatCep,
    checkDelivery,
  };
};
