import { useState, useEffect } from "react";

import {
  Search,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  FileText,
  Building2,
  User,
  Calendar,
  Copy,
} from "lucide-react";

import BackToBanking from "../../../components/BackToBanking";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import StatusBadge from "../../../components/ui/StatusBadge";

export default function TrackApplication() {

  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  /* Auto load last application ID */
  useEffect(() => {
    const savedId = localStorage.getItem("applicationId");
    if (savedId) setId(savedId);
  }, []);

  const track = async () => {

    if (!id.trim()) {
      setError("Please enter an application ID");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {

      const res = await fetch(
        `http://localhost:8081/api/banking/status/${id}`
      );

      if (!res.ok) throw new Error("Application not found");

      const result = await res.json();

      setData(result);

      localStorage.setItem("applicationId", result.applicationId);

    } catch {

      setError("Application not found. Please check your application ID.");

    } finally {

      setLoading(false);

    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data?.applicationId || id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* Correct backend status mapping */

  const getStatusDetails = (status) => {

    const normalized = status?.toUpperCase();

    const statusMap = {

      PENDING: {
        label: "Submitted",
        description:
          "Your application has been received and is being processed.",
        icon: FileText,
        color: "text-secondary",
        bgColor: "bg-secondary/10",
      },

      KYC_VERIFIED: {
        label: "KYC Verified",
        description:
          "Your KYC documents have been verified successfully.",
        icon: CheckCircle,
        color: "text-success",
        bgColor: "bg-success/10",
      },

      APPROVED: {
        label: "Approved",
        description:
          "Congratulations! Your account has been approved.",
        icon: CheckCircle,
        color: "text-success",
        bgColor: "bg-success/10",
      },

      REJECTED: {
        label: "Rejected",
        description:
          "Your application has been rejected. Please contact support.",
        icon: XCircle,
        color: "text-error",
        bgColor: "bg-error/10",
      },
    };

    return statusMap[normalized] || statusMap.PENDING;
  };

  const timelineSteps = [
    { label: "Application Submitted" },
    { label: "Document Verification" },
    { label: "Background Check" },
    { label: "Final Approval" },
  ];

  return (
    <div className="max-w-4xl mx-auto">

      <BackToBanking />

      <PageHeader
        title="Track Application"
        subtitle="Enter your application ID to check the status of your account opening request"
        breadcrumbs={[
          { label: "Banking", href: "/dashboard/banking" },
          { label: "Track Application" },
        ]}
      />

      {/* Search Card */}

      <Card className="mb-8">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex-1">

            <Input
              label="Application ID"
              placeholder="Enter your application ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              icon={Search}
              onKeyPress={(e) => e.key === "Enter" && track()}
            />

          </div>

          <div className="flex items-end">

            <Button
              onClick={track}
              loading={loading}
              className="w-full md:w-auto"
            >
              Track Status
            </Button>

          </div>

        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-error-50 border border-error-200 rounded-xl"
          >
            <p className="text-error text-sm">{error}</p>
          </motion.div>
        )}

      </Card>

      {/* Results */}

      {data && (

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >

          {/* Status Card */}

          <Card className="mb-6">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

              <div>

                <p className="text-sm text-gray-500 mb-1">
                  Application Status
                </p>

                <StatusBadge status={data.status} size="lg" />

              </div>

              <div className="flex items-center gap-3">

                <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center gap-2">

                  <span className="text-sm text-gray-600">ID:</span>

                  <span className="font-mono font-medium text-gray-900">
                    {data.applicationId}
                  </span>

                  <button
                    onClick={copyToClipboard}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                </div>

              </div>

            </div>

            {/* Status Description */}

            <div className={`rounded-xl p-6 ${getStatusDetails(data.status).bgColor}`}>

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">

                  {(() => {
                    const StatusIcon = getStatusDetails(data.status).icon;
                    return (
                      <StatusIcon
                        className={`w-6 h-6 ${getStatusDetails(data.status).color}`}
                      />
                    );
                  })()}

                </div>

                <div>

                  <h3 className={`text-lg font-semibold ${getStatusDetails(data.status).color}`}>
                    {getStatusDetails(data.status).label}
                  </h3>

                  <p className="text-gray-600 mt-1">
                    {getStatusDetails(data.status).description}
                  </p>

                </div>

              </div>

            </div>

          </Card>

          {/* Application Details */}

          <Card className="mb-6">

            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Application Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <Detail icon={Building2} label="Bank" value={data.bankName} />

              <Detail icon={User} label="Applicant Name" value={data.fullName} />

              <Detail icon={Calendar} label="Application Date" value={data.submittedDate} />

              <Detail icon={FileText} label="Account Type" value={data.accountType} />

            </div>

          </Card>

          {/* Timeline */}

          <Card>

            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Application Timeline
            </h3>

            <div className="relative">

              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

              <div className="space-y-6">

                {timelineSteps.map((step, index) => {

                  const status = data.status?.toUpperCase();

                  const isCompleted =
                    index === 0 ||
                    (index === 1 && status !== "PENDING") ||
                    (index === 2 && status === "KYC_VERIFIED") ||
                    (index === 3 && status === "APPROVED");

                  const isCurrent =
                    (index === 1 && status === "PENDING") ||
                    (index === 2 && status === "KYC_VERIFIED");

                  const isPending = !isCompleted && !isCurrent;

                  return (

                    <div key={index} className="relative flex items-start gap-4">

                      <div
                        className={`
                          relative z-10 w-8 h-8 rounded-full flex items-center justify-center
                          ${isCompleted ? "bg-success text-white" : ""}
                          ${isCurrent ? "bg-warning text-white" : ""}
                          ${isPending ? "bg-gray-200 text-gray-400" : ""}
                        `}
                      >

                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : isCurrent ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}

                      </div>

                      <div className="flex-1 pt-1">

                        <p
                          className={`font-medium ${
                            isCompleted || isCurrent
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </p>

                      </div>

                    </div>

                  );

                })}

              </div>

            </div>

          </Card>

        </motion.div>

      )}

    </div>
  );
}

function Detail({ icon: label, value }) {

  return (

    <div className="flex items-start gap-3">

      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value || "N/A"}</p>
      </div>

    </div>

  );

}