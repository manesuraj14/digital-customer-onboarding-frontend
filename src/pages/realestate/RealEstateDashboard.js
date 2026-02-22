import DashboardShell from "../../components/dashboard/DashboardShell";

import { realestateDashboardData } from "./realestateData";

export default function RealEstateDashboard() {
  return <DashboardShell data={realestateDashboardData} />;
}
