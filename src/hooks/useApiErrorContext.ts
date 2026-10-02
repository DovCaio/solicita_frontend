import { useContext } from "react";
import { ApiErrorContext } from "@/context/ApiErrorProvider";

export function useApiError() {
  const context = useContext(ApiErrorContext);

  if (!context) {
    throw new Error(
      "useApiError deve ser utilizado dentro de ApiErrorProvider",
    );
  }

  return context;
}
