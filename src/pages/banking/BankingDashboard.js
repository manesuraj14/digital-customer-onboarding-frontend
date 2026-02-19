import DashboardShell from "../../components/dashboard/DashboardShell";

import { bankingDashboardData } from "./bankingData";


export default function BankingDashboard() {
  return (
    <>
      
      <DashboardShell data={bankingDashboardData} />
    </>
  );
}
