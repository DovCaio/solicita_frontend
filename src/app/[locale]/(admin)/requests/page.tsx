import ComponentCard from "@/components/common/ComponentCard";
import { CreateRequest } from "@/components/request/CreateRequest";
import { RequestTable } from "@/components/request/RequestTable";

export default function RequestsPage() {
  return (
    <ComponentCard title="Requisições">
      <div className="space-y-6 xl:col-span-7">
        <div>
          <CreateRequest />
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
          <RequestTable />
        </div>
      </div>
    </ComponentCard>
  );
}
