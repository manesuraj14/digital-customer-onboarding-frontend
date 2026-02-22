import DashboardShell from "./dashboard/DashboardShell";
import { masterDashboardData } from "./dashboard/dashboardData";

export default function Dashboard() {
  return <DashboardShell data={masterDashboardData} />;
}
