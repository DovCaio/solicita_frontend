import { Request } from "@/types/Request";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useApiError } from "@/hooks/useApiErrorContext";

import {
  categoryLabels,
  statusLabels,
  statusStyles,
} from "@/types/EnumsAuxMapper";

interface RequestDetailProps {
  request: Request;
}

export const RequestDetail = ({ request }: RequestDetailProps) => {
  const createdAt = new Date(request.createdAt).toLocaleString("pt-BR");
  const updatedAt = request.updatedAt
    ? new Date(request.updatedAt).toLocaleString("pt-BR")
    : "Não atualizada";

  const { showError } = useApiError();
  const route = useRouter();

  const deleteRequest = async () => {
    api
      .delete(`/requests/${request.id}`, { withCredentials: true })
      .then((_) => {
        route.push("/requests");
      })
      .catch((error) => {
        const apiError = error as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };

        showError(
          apiError.response?.data?.message ||
            "Falha ao deletar a requisição. Por favor, tente novamente mais tarde.",
        );
      });
  };

  return (
    <div className="xl:col-span-7">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/[0.03]">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={deleteRequest}
            className="flex h-8 w-8 items-center justify-center bg-red-400 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </button>
        </div>
        {/* Cabeçalho */}
        <div className="border-b border-gray-200 px-6 py-5 dark:border-white/5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                Solicitação #{request.id}
              </p>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {request.title}
              </h2>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${statusStyles[request.status]}`}
            >
              {statusLabels[request.status]}
            </span>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="space-y-6 p-6">
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Descrição
            </h3>

            <p className="text-sm leading-6 whitespace-pre-wrap text-gray-600 dark:text-gray-400">
              {request.description}
            </p>
          </div>

          {/* Informações */}
          <div className="grid grid-cols-1 gap-5 border-t border-gray-200 pt-6 sm:grid-cols-2 dark:border-white/5">
            <div>
              <p className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Categoria
              </p>

              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {categoryLabels[request.category]}
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Solicitante
              </p>

              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {request.username}
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Criada em
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                {createdAt}
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Última atualização
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                {updatedAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
