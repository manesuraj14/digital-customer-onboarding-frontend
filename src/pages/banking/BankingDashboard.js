import { useEffect, useState } from "react";
import axios from "axios";
import DashboardShell from "../../components/dashboard/DashboardShell";

export default function BankingDashboard() {

  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8081/api/banking/analytics")
      .then(res => {

        const d = res.data;

        const formatted = {
          title: "Banking Analytics",

          completion: [
            { name: "Approved", value: d.approved },
            { name: "Pending", value: d.pending }
          ],

          risks: Object.entries(d.accountTypeStats || {}).map(([k,v]) => ({
            label: k,
            value: v,
            color: "text-primary"
          })),

          insights: [
            `📊 Total Applications: ${d.totalApplications}`,
            `✅ Approved: ${d.approved}`,
            `⏳ Pending: ${d.pending}`
          ],

          performance: [
            { name: "Banking", users: d.totalApplications }
          ],

          funnel: [
            { stage: "Applied", users: d.funnel?.[0] || 0 },
            { stage: "Verified", users: d.funnel?.[1] || 0 },
            { stage: "Approved", users: d.funnel?.[2] || 0 }
          ]
        };

        setData(formatted);
      })
      .catch(err => console.error("Analytics load error", err));
  }, []);

  if (!data) return <p className="p-6">Loading analytics...</p>;

  return <DashboardShell data={data} />;
}