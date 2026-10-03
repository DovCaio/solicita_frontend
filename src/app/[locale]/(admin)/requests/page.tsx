import { RequestTable } from "@/components/request/RequestTable";

export default function RequestsPage() {
  return (
    <div className="space-y-6 xl:col-span-7">
      <h1 className="text-title-md font-semibold text-gray-800 dark:text-white/90">
        Requisições
      </h1>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
        <RequestTable />
      </div>
    </div>
  );
}
