export const bankingDashboardData = {
  title: "Banking Onboarding Dashboard",

  completion: [
    { name: "Completed", value: 81 },
    { name: "Remaining", value: 19 }
  ],

  risks: [
    { label: "Pending KYC", value: 210, color: "text-yellow-500" },
    { label: "PAN Mismatch", value: 74, color: "text-red-500" }
  ],

  insights: [
    "📈 Banking onboarding speed improved by 18%",
    "⚠️ PAN mismatch rate increased"
  ],

  performance: [
    { name: "Banking", users: 920 }
  ],

  funnel: [
    { stage: "Signup", users: 980 },
    { stage: "KYC", users: 760 },
    { stage: "Approved", users: 620 }
  ]
};
