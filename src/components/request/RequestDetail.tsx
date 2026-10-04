import { Request } from "@/types/Request";

interface RequestDetailProps {
  request: Request;
}

const categoryLabels: Record<Request["category"], string> = {
  TI: "TI",
  RH: "RH",
  COMPRAS: "Compras",
  FINANCEIRO: "Financeiro",
  INFRAESTRUTURA: "Infraestrutura",
};

const statusLabels: Record<Request["status"], string> = {
  ABERTO: "Aberto",
  EM_ATENDIMENTO: "Em Atendimento",
  CONCLUIDO: "Concluído",
};

const statusStyles: Record<Request["status"], string> = {
  ABERTO: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  EM_ATENDIMENTO:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  CONCLUIDO:
    "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",
};

export const RequestDetail = ({ request }: RequestDetailProps) => {
  const createdAt = new Date(request.createdAt).toLocaleString("pt-BR");
  const updatedAt = request.updatedAt
    ? new Date(request.updatedAt).toLocaleString("pt-BR")
    : "Não atualizada";

  return (
    <div className="xl:col-span-7">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/[0.03]">
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
