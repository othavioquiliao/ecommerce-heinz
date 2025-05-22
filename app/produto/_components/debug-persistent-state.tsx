"use client";

import { useEffect, useState } from "react";

export function DebugPersistentState() {
  const [debugData, setDebugData] = useState<any>({});
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("product-state");
          if (stored) {
            const parsed = JSON.parse(stored);
            setDebugData({ "product-state": parsed.value || parsed });
          } else {
            setDebugData({});
          }
        } catch (e) {
          setDebugData({});
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded text-xs z-50"
      >
        Debug
      </button>
    );
  }

  const forceReload = () => {
    window.location.reload();
  };

  const clearStorage = () => {
    localStorage.removeItem("product-state");
    setDebugData({});
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded text-xs max-w-sm overflow-auto max-h-96 z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">🔍 Debug - Estados Persistentes</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-red-400 hover:text-red-300"
        >
          ✕
        </button>
      </div>
      <div className="flex gap-1 mb-2">
        <button
          onClick={forceReload}
          className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
        >
          🔄 Reload
        </button>
        <button
          onClick={clearStorage}
          className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
        >
          🗑️ Clear
        </button>
      </div>
      <div className="space-y-2">
        {Object.keys(debugData).length === 0 ? (
          <p className="text-gray-400">Nenhum dado persistente encontrado</p>
        ) : (
          Object.entries(debugData).map(([key, value]) => (
            <div key={key} className="border-b border-gray-600 pb-1">
              <div className="text-yellow-300 font-mono text-xs">{key}:</div>
              <div className="text-green-300 font-mono text-xs">
                {typeof value === "object"
                  ? JSON.stringify(value, null, 1)
                  : String(value)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
