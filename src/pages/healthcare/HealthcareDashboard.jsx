import DashboardShell from "../../components/dashboard/DashboardShell";

import { healthcareDashboardData } from "./healthcareData";

export default function HealthcareDashboard() {
  return <DashboardShell data={healthcareDashboardData} />;
}
