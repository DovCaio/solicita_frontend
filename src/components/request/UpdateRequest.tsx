"use client";

import { useApiError } from "@/hooks/useApiErrorContext";
import { api } from "@/lib/api";
import { Request } from "@/types/Request";
import { useState } from "react";

interface RequestEditFormProps {
  request: Request;
  onUpdated: (request: Request) => void;
}

export const RequestEditForm = ({
  request,
  onUpdated,
}: RequestEditFormProps) => {
  const [title, setTitle] = useState(request.title);
  const [description, setDescription] = useState(request.description);
  const [category, setCategory] = useState(request.category);
  const { showError } = useApiError();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.put(`/requests/${request.id}`, {
        title,
        description,
        category,
      });

      onUpdated(response.data);
    } catch (error: unknown) {
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
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-white/5 dark:bg-white/[0.03]"
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Editar Solicitação
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Atualize as informações da solicitação.
        </p>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="title"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Título
        </label>

        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={150}
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm text-gray-800 transition-colors outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Descrição
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={6}
          className="w-full resize-none rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-800 transition-colors outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="category"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Categoria
        </label>

        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as Request["category"])}
          required
          className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 transition-colors outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        >
          <option value="TI">TI</option>
          <option value="RH">RH</option>
          <option value="COMPRAS">Compras</option>
          <option value="FINANCEIRO">Financeiro</option>
          <option value="INFRAESTRUTURA">Infraestrutura</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="h-11 rounded-lg bg-brand-500 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-600 focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
        >
          Salvar alterações
        </button>
      </div>
    </form>
  );
};
