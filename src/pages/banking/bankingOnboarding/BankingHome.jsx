import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Landmark,
  ShieldCheck,
  Search,
  TrendingUp,
  HandCoins,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Building2,
} from "lucide-react";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function BankingHome() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Savings Account Opening",
      description: "Open a fully digital savings account with secure identity verification.",
      icon: Landmark,
      path: "/dashboard/banking/account-opening",
      color: "bg-primary",
      features: ["Instant Account", "Zero Balance", "Online Banking"],
    },
    {
      title: "Digital KYC Verification",
      description: "Complete mandatory identity verification using PAN and Aadhaar.",
      icon: ShieldCheck,
      path: "/dashboard/banking/kyc",
      color: "bg-secondary",
      features: ["Aadhaar Based", "Video KYC", "Instant Verification"],
    },
    {
      title: "Track Application Status",
      description: "Track real-time onboarding and KYC approval status.",
      icon: Search,
      path: "/dashboard/banking/track",
      color: "bg-success",
      features: ["Real-time Updates", "Application ID", "24/7 Access"],
      button: true,
    },
    {
      title: "Credit Score Check",
      description: "Check your CIBIL credit score instantly with secure authentication.",
      icon: TrendingUp,
      path: "/dashboard/banking/credit-score",
      color: "bg-warning",
      features: ["Free Score", "Credit Report", "Monthly Updates"],
    },
    {
      title: "Personal Loan",
      description: "Apply for instant personal loan with quick approval and EMI options.",
      icon: HandCoins,
      path: "/dashboard/banking/personal-loan",
      color: "bg-error",
      features: ["Quick Approval", "Flexible EMI", "Minimal Documents"],
    },
  ];

  const stats = [
    { label: "Total Applications", value: "2,547", icon: Building2, color: "text-primary" },
    { label: "Approved", value: "2,189", icon: CheckCircle, color: "text-success" },
    { label: "Pending", value: "312", icon: Clock, color: "text-warning" },
    { label: "Active Users", value: "1,890", icon: Users, color: "text-secondary" },
  ];

  const recentApplications = [
    { id: "APP-001", name: "John Doe", type: "Savings Account", status: "approved", date: "2024-01-15" },
    { id: "APP-002", name: "Jane Smith", type: "Personal Loan", status: "pending", date: "2024-01-14" },
    { id: "APP-003", name: "Mike Johnson", type: "KYC Verification", status: "processing", date: "2024-01-14" },
    { id: "APP-004", name: "Sarah Williams", type: "Savings Account", status: "rejected", date: "2024-01-13" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Banking Services"
        subtitle="Manage your digital banking operations and applications"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Banking" },
        ]}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Services Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.features.map((feature, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600"
                        >
                          <CheckCircle className="w-3 h-3 text-success" />
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Button */}
                    <Button
                      variant="outline"
                      className="w-full"
                      icon={ArrowRight}
                      iconPosition="right"
                      onClick={() => navigate(service.path)}
                    >
                      {service.button ? "Track Now" : "Get Started"}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Applications */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/banking/track")}>
            View All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Application ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-primary">{app.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{app.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{app.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{app.date}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={app.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    approved: "bg-success-100 text-success-700",
    pending: "bg-warning-100 text-warning-700",
    processing: "bg-secondary-100 text-secondary-700",
    rejected: "bg-error-100 text-error-700",
  };

  const labels = {
    approved: "Approved",
    pending: "Pending",
    processing: "Processing",
    rejected: "Rejected",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
