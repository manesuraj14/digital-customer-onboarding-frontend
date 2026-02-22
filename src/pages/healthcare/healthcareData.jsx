export const healthcareDashboardData = {
  title: "Healthcare Onboarding Dashboard",

  completion: [
    { name: "Completed", value: 64 },
    { name: "Remaining", value: 36 }
  ],

  risks: [
    { label: "Pending Consent", value: 142, color: "text-yellow-500" },
    { label: "Insurance Mismatch", value: 58, color: "text-red-500" },
    { label: "Manual Review", value: 41, color: "text-orange-500" }
  ],

  insights: [
    "📉 24% drop-off at consent stage",
    "⚠️ Insurance validation delays detected",
    "📈 OPD onboarding improved this week"
  ],

  performance: [
    { name: "Healthcare", users: 540 }
  ],

  funnel: [
    { stage: "Signup", users: 820 },
    { stage: "Email Verify", users: 690 },
    { stage: "Consent", users: 540 },
    { stage: "Approved", users: 410 }
  ]
};
