import DashboardShell from "../../components/dashboard/DashboardShell";

import { ecommerceDashboardData } from "./ecommerceData";

export default function EcommerceDashboard() {
  return <DashboardShell data={ecommerceDashboardData} />;
}
