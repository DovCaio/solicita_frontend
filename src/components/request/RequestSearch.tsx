"use client";

import { useApiError } from "@/hooks/useApiErrorContext";
import { api } from "@/lib/api";

interface RequestSearchProps {
  data: any[];
  setData: (data: never[]) => void;
}

export const RequestSearch = ({ data, setData }: RequestSearchProps) => {
  const { showError } = useApiError();

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const filters = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      status: formData.get("status") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
    };

    console.log("Filtros:", filters);

    api
      .get("/requests", {
        params: filters,
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        showError(
          error.response?.data?.message ||
            "Falha ao buscar requisições. Por favor, tente novamente mais tarde.",
        );
      });
  };

  return (
    <form
      onSubmit={search}
      className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="xl:col-span-2">
          <label
            htmlFor="title"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Título
          </label>

          <input
            type="text"
            id="title"
            name="title"
            placeholder="Buscar por título..."
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-sm transition-colors outline-none placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-400"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Categoria
          </label>

          <select
            id="category"
            name="category"
            defaultValue=""
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 shadow-sm transition-colors outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-400"
          >
            <option value="">Todas</option>
            <option value="TI">TI</option>
            <option value="RH">RH</option>
            <option value="COMPRAS">Compras</option>
            <option value="FINANCEIRO">Financeiro</option>
            <option value="INFRAESTRUTURA">Infraestrutura</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>

          <select
            id="status"
            name="status"
            defaultValue=""
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 shadow-sm transition-colors outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-400"
          >
            <option value="">Todos</option>
            <option value="ABERTO">Aberto</option>
            <option value="EM_ATENDIMENTO">Em Atendimento</option>
            <option value="CONCLUIDO">Concluído</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="startDate"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            De
          </label>

          <input
            type="date"
            id="startDate"
            name="startDate"
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 shadow-sm transition-colors outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-400"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Até
          </label>

          <input
            type="date"
            id="endDate"
            name="endDate"
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 shadow-sm transition-colors outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-400"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="h-11 rounded-lg bg-brand-500 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-600 focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};
