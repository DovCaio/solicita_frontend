"use client";
import ComponentCard from "@/components/common/ComponentCard";
import { CreateRequest } from "@/components/request/CreateRequest";
import { RequestSearch } from "@/components/request/RequestSearch";
import { RequestTable } from "@/components/request/RequestTable";
import { useApiError } from "@/hooks/useApiErrorContext";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { Request } from "@/types/Request";

export default function RequestsPage() {
  const [data, setData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  const { showError } = useApiError();

  useEffect(() => {
    api
      .get("/requests", { withCredentials: true })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        showError(error.response?.data?.message);
        setLoading(false);
      });
  }, []);

  return (
    <ComponentCard title="Requisições">
      <div className="space-y-6 xl:col-span-7">
        <div>
          <CreateRequest data={data} setData={setData} />
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
          <RequestSearch data={data} setData={setData} />
          <RequestTable data={data} loading={loading} />
        </div>
      </div>
    </ComponentCard>
  );
}
