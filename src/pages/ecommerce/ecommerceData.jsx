export const ecommerceDashboardData = {
  title: "E-Commerce Onboarding Dashboard",

  completion: [
    { name: "Completed", value: 91 },
    { name: "Remaining", value: 9 }
  ],

  risks: [
    { label: "GST Verification Pending", value: 33, color: "text-yellow-500" },
    { label: "Bank Details Failed", value: 14, color: "text-red-500" }
  ],

  insights: [
    "⚡ Highest onboarding success rate",
    "📈 Seller activation increased by 22%",
    "🏆 Lowest drop-off across all domains"
  ],

  performance: [
    { name: "E-Commerce", users: 275 }
  ],

  funnel: [
    { stage: "Signup", users: 340 },
    { stage: "GST Verify", users: 295 },
    { stage: "Bank Link", users: 265 },
    { stage: "Approved", users: 250 }
  ]
};
