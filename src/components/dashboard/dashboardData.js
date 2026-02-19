export const masterDashboardData = {
  title: "Customer Onboarding Control Center",

  completion: [
    { name: "Completed", value: 72 },
    { name: "Remaining", value: 28 }
  ],

  risks: [
    { label: "Pending KYC", value: 325, color: "text-yellow-500" },
    { label: "Failed Verification", value: 147, color: "text-red-500" },
    { label: "Manual Review", value: 89, color: "text-orange-500" }
  ],

  insights: [
    "📈 Overall onboarding improved by 12%",
    "⚡ E-Commerce has highest success rate",
    "📉 Healthcare drop-off at KYC stage"
  ],

  performance: [
    { name: "Banking", users: 920 },
    { name: "Healthcare", users: 540 },
    { name: "Real Estate", users: 410 },
    { name: "E-Commerce", users: 275 }
  ],

  funnel: [
    { stage: "Signup", users: 2145 },
    { stage: "Email Verify", users: 1820 },
    { stage: "KYC", users: 1320 },
    { stage: "Approved", users: 980 }
  ]
};
