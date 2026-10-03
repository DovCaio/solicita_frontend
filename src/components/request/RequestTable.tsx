"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApiError } from "@/hooks/useApiErrorContext";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { LoadingTable } from "../loading/LoadingTable";
import { useRouter } from "@/i18n/navigation";

interface Request {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  createdAt: string;
}

export const RequestTable = () => {
  const [data, setData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  const { showError } = useApiError();

  const route = useRouter();

  useEffect(() => {
    api
      .get("/requests", { withCredentials: true })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        showError(
          error.response.data?.message ||
            "Falha ao buscar requisições. Por favor, recarregue a página.",
        );
        setLoading(false);
      });
  }, []);

  return (
    <Table>
      <TableHeader className="border-b border-gray-100 dark:border-white/5">
        <TableRow>
          <TableCell
            isHeader
            className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
          >
            Título
          </TableCell>
          <TableCell
            isHeader
            className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
          >
            Descrição
          </TableCell>
          <TableCell
            isHeader
            className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
          >
            Categoria
          </TableCell>
          <TableCell
            isHeader
            className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
          >
            Status
          </TableCell>
          <TableCell
            isHeader
            className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
          >
            Criada em
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
        {loading ? (
          <LoadingTable cellQuantity={5} />
        ) : (
          data.map((request) => (
            <TableRow
              key={request.id}
              className="hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5"
              onClick={() => {
                route.push(`/requests/${request.id}`);
              }}
            >
              <TableCell className="px-5 py-3 text-start text-theme-sm text-gray-700 dark:text-gray-300">
                {request.title}
              </TableCell>
              <TableCell className="px-5 py-3 text-start text-theme-sm text-gray-700 dark:text-gray-300">
                {request.description}
              </TableCell>
              <TableCell className="px-5 py-3 text-start text-theme-sm text-gray-700 dark:text-gray-300">
                {request.category}
              </TableCell>
              <TableCell className="px-5 py-3 text-start text-theme-sm text-gray-700 dark:text-gray-300">
                {request.status}
              </TableCell>
              <TableCell className="px-5 py-3 text-start text-theme-sm text-gray-700 dark:text-gray-300">
                {request.createdAt}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
