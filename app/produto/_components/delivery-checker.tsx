"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, CheckCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDeliveryChecker } from "./hooks/use-delivery-checker";
import { APP_TEXTS } from "./constants";

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
    <div className="space-y-4">
      <h3 className="font-semibold text-lg flex items-center">
        <Truck className="mr-2 h-5 w-5 text-[#e50000]" />
        {APP_TEXTS.checkDelivery}
      </h3>

      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder={APP_TEXTS.enterCep}
          value={formattedCep}
          onChange={(e) => handleCepChange(e.target.value)}
          maxLength={9}
          className="max-w-[200px]"
          onKeyPress={(e) => e.key === "Enter" && !isLoading && checkDelivery()}
        />
        <Button
          onClick={checkDelivery}
          disabled={isLoading || formattedCep.replace(/\D/g, "").length !== 8}
          className="bg-black hover:bg-gray-800 text-white disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {APP_TEXTS.check}
        </Button>
      </div>

      <AnimatePresence>
        {addressData && deliveryEstimate && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="border-green-200 bg-green-50/80 backdrop-blur-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <div className="space-y-3">
                  <p className="font-semibold text-green-700 text-base">
                    {APP_TEXTS.deliveryAvailable}
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-800 font-medium text-sm">
                      📍 {addressData.logradouro}, {addressData.bairro}
                    </p>
                    <p className="text-gray-700 font-medium text-sm">
                      🏙️ {addressData.localidade}/{addressData.uf}
                    </p>
                    <p className="text-[#e50000] font-bold text-sm bg-red-50 px-2 py-1 rounded-md">
                      🚚 Entrega estimada: {deliveryEstimate}
                    </p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
