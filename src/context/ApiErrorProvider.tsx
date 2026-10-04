"use client";

import { createContext, useContext, useState } from "react";
import Alert from "@/components/ui/alert/Alert";

interface ApiErrorContextData {
  showError: (message: string) => void;
  clearError: () => void;
}

export const ApiErrorContext = createContext<ApiErrorContextData | null>(null);

export function ApiErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);

  function showError(message: string) {
    setError(message);

    setTimeout(() => {
      setError(null);
    }, 5000);
  }

  function clearError() {
    setError(null);
  }

  return (
    <ApiErrorContext.Provider value={{ showError, clearError }}>
      {children}

      {error && (
        <div className="fixed right-4 bottom-4 z-50 max-w-md">
          <Alert title="Erro" variant="error" message={error} />
        </div>
      )}
    </ApiErrorContext.Provider>
  );
}
