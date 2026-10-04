import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Dashboard() {
  return (
    <div className="space-y-6 xl:col-span-7">
      <DashboardMetrics />
    </div>
  );
}
