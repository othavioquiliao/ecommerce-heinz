"use client";

import { Truck, CheckCircle, Loader2 } from "lucide-react";
import { useDeliveryChecker } from "./hooks/use-delivery-checker";

export function DeliveryChecker() {
  const {
    formattedCep,
    addressData,
    isLoading,
    deliveryEstimate,
    handleCepChange,
    checkDelivery,
  } = useDeliveryChecker();

  return (
    <div className="space-y-1">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Truck className="w-5 h-5 text-red-600" />
        Consultar entrega
      </h3>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={formattedCep}
          onChange={(e) => handleCepChange(e.target.value)}
          maxLength={9}
          className="max-w-[200px] px-3 py-2 border rounded-md"
          onKeyPress={(e) => e.key === "Enter" && !isLoading && checkDelivery()}
        />
        <button
          onClick={checkDelivery}
          disabled={isLoading || formattedCep.replace(/\D/g, "").length !== 8}
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Consultar
        </button>
      </div>

      {addressData && deliveryEstimate && (
        <div className="border border-green-200 bg-green-50 p-4 rounded-md">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
            <div className="space-y-2">
              <p className="font-semibold text-green-700">Entrega disponível</p>
              <p className="text-gray-800 text-sm">
                📍 {addressData.logradouro}, {addressData.bairro}
              </p>
              <p className="text-gray-700 text-sm">
                🏙️ {addressData.localidade}/{addressData.uf}
              </p>
              <p className="text-red-600 font-bold text-sm bg-red-50 px-2 py-1 rounded">
                🚚 Entrega estimada: {deliveryEstimate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
