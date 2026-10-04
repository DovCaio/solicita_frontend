import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solicita Dashboard",
  description: "Essa é a home page do Solicita",
};

export default function Dashboard() {
  return (
    <div className="space-y-6 xl:col-span-7">
      <DashboardMetrics />
    </div>
  );
}
