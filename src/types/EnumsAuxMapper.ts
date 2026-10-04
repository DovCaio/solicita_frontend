import { Request } from "@/types/Request";

export const categoryLabels: Record<Request["category"], string> = {
  TI: "TI",
  RH: "RH",
  COMPRAS: "Compras",
  FINANCEIRO: "Financeiro",
  INFRAESTRUTURA: "Infraestrutura",
};

export const statusLabels: Record<Request["status"], string> = {
  ABERTO: "Aberto",
  EM_ATENDIMENTO: "Em Atendimento",
  CONCLUIDO: "Concluído",
};

export const statusStyles: Record<Request["status"], string> = {
  ABERTO: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  EM_ATENDIMENTO:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  CONCLUIDO:
    "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",
};
