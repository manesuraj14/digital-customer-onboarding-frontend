export const realestateDashboardData = {
  title: "Real Estate Onboarding Dashboard",

  completion: [
    { name: "Completed", value: 73 },
    { name: "Remaining", value: 27 }
  ],

  risks: [
    { label: "Property Docs Pending", value: 96, color: "text-yellow-500" },
    { label: "Ownership Verification Failed", value: 34, color: "text-red-500" },
    { label: "Manual Review", value: 58, color: "text-orange-500" }
  ],

  insights: [
    "🏠 High volume onboarding from Tier-2 cities",
    "⚠️ Document verification causing delays",
    "📈 Broker onboarding increased this month"
  ],

  performance: [
    { name: "Real Estate", users: 410 }
  ],

  funnel: [
    { stage: "Signup", users: 560 },
    { stage: "KYC", users: 480 },
    { stage: "Property Docs", users: 410 },
    { stage: "Approved", users: 350 }
  ]
};
