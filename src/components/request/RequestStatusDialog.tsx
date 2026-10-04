"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Request } from "@/types/Request";
import { useApiError } from "@/hooks/useApiErrorContext";
import { statusLabels } from "@/types/EnumsAuxMapper";

interface RequestStatusDialogProps {
  request: Request;
  onUpdated: (request: Request) => void;
  onClose: () => void;
}

export const RequestStatusDialog = ({
  request,
  onUpdated,
  onClose,
}: RequestStatusDialogProps) => {
  const [status, setStatus] = useState<Request["status"]>(request.status);
  const [loading, setLoading] = useState(false);
  const { showError } = useApiError();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === request.status) {
      onClose();
      return;
    }

    try {
      setLoading(true);

      const response = await api.patch(`/requests/${request.id}/status`, {
        status,
      });

      onUpdated(response.data);
      onClose();
    } catch (error) {
      const apiError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      showError(
        apiError.response?.data?.message ||
          "Falha ao atualizar a requisição. Por favor, tente novamente mais tarde.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm dark:bg-gray-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Alterar status
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Solicitação #{request.id}
        </p>
      </div>

      <form onSubmit={submit}>
        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Novo status
          </label>

          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Request["status"])}
          >
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
};
