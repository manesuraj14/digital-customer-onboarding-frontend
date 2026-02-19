import { useNavigate } from "react-router-dom";
import {
  Landmark,
  ShieldCheck,
  Search,
  TrendingUp,
  HandCoins
} from "lucide-react";

export default function BankingHome() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Savings Account Opening",
      description:
        "Open a fully digital savings account with secure identity verification.",
      icon: Landmark,
      path: "/dashboard/banking/account-opening",
    },
    {
      title: "Digital KYC Verification",
      description:
        "Complete mandatory identity verification using PAN and Aadhaar.",
      icon: ShieldCheck,
      path: "/dashboard/banking/kyc",
    },
    {
      title: "Track Application Status",
      description:
        "Track real-time onboarding and KYC approval status.",
      icon: Search,
      path: "/dashboard/banking/status",
    },
    {
      title: "Credit Score Check",
      description:
        "Check your CIBIL credit score instantly with secure authentication.",
      icon: TrendingUp,
      path: "/dashboard/banking/credit-score",
    },
    {
      title: "Personal Loan",
      description:
        "Apply for instant personal loan with quick approval and EMI options.",
      icon: HandCoins,
      path: "/dashboard/banking/personal-loan",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">
        Banking Onboarding Services
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <div
              key={index}
              onClick={() => navigate(service.path)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl 
                         transition duration-300 cursor-pointer border 
                         hover:border-indigo-500 group"
            >
              <Icon
                size={36}
                className="text-indigo-600 mb-4 group-hover:scale-110 transition"
              />

              <h3 className="text-lg font-semibold mb-2">
                {service.title}
              </h3>

              <p className="text-sm text-gray-600">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
