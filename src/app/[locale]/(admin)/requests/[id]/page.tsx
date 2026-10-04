"use client";
import ComponentCard from "@/components/common/ComponentCard";
import { RequestDetail } from "@/components/request/RequestDetail";
import { RequestEditForm } from "@/components/request/UpdateRequest";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Request } from "@/types/Request";
import { api } from "@/lib/api";
import { LoadingRequestDetails } from "@/components/loading/LoadingRequestDetails";

export default function RequestPage() {
  const params = useParams<{ id: string }>();
  const id: number = parseInt(params.id);
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState<Request | null>(null);
  useEffect(() => {
    api
      .get(`/requests/${id}`, { withCredentials: true })
      .then((response) => {
        setRequest(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          error.response?.data?.message ||
            "Falha ao buscar detalhes da requisição. talvez a requisição não exista ou ocorreu um erro no servidor.",
        );
        setLoading(false);
      });
  }, []);
  return (
    <ComponentCard title={`Detalhes da Requisição ${id}`}>
      <div className="space-y-6 xl:col-span-7">
        {loading ? (
          <LoadingRequestDetails />
        ) : request === null ? (
          <p className="text-gray-700 dark:text-gray-300">
            Requisição não encontrada.
          </p>
        ) : (
          <>
            <RequestDetail request={request} />
            <RequestEditForm request={request} onUpdated={setRequest} />
          </>
        )}
      </div>
    </ComponentCard>
  );
}
