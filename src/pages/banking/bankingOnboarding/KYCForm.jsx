import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Upload,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import BackToBanking from "../../../components/BackToBanking";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

export default function KYCForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    pan: "",
    aadhaar: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            KYC Verification Submitted!
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Your KYC documents have been submitted successfully. Verification typically takes 24-48 hours. You'll receive updates via email and SMS.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8 inline-block">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-success" />
              <div className="text-left">
                <p className="text-sm text-gray-500">Verification Status</p>
                <p className="font-semibold text-gray-900">Under Review</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.location.href = "/dashboard/banking/track"}>
              Track Status
            </Button>
            <Button variant="outline" onClick={() => window.location.href = "/dashboard/banking"}>
              Back to Banking
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <BackToBanking />

      <PageHeader
        title="KYC Verification"
        subtitle="Complete your identity verification to enable all banking features"
        breadcrumbs={[
          { label: "Banking", href: "/dashboard/banking" },
          { label: "KYC Verification" },
        ]}
      />

      {/* Progress Steps */}
      <Card className="mb-8">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: "Enter Details" },
            { num: 2, label: "Upload Documents" },
            { num: 3, label: "Verification" },
          ].map((s, index) => (
            <div key={s.num} className="flex items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold
                  ${step >= s.num
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-400"
                  }
                `}
              >
                {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
              </div>
              <span
                className={`
                  ml-2 text-sm font-medium hidden sm:block
                  ${step >= s.num ? "text-gray-900" : "text-gray-400"}
                `}
              >
                {s.label}
              </span>
              {index < 2 && (
                <div
                  className={`
                    w-12 sm:w-24 h-0.5 mx-4
                    ${step > s.num ? "bg-primary" : "bg-gray-200"}
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Enter Details */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Identity Information</h3>
                  <p className="text-sm text-gray-500">Enter your PAN and Aadhaar details</p>
                </div>
              </div>

              <div className="space-y-5">
                <Input
                  label="PAN Number"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  placeholder="Enter your PAN number (e.g., ABCDE1234F)"
                  maxLength={10}
                  required
                />

                <Input
                  label="Aadhaar Number"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleChange}
                  placeholder="Enter your 12-digit Aadhaar number"
                  maxLength={12}
                  required
                />

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Important</p>
                      <p className="text-sm text-amber-700 mt-1">
                        Please ensure your name in PAN and Aadhaar matches exactly. 
                        Any mismatch may result in verification failure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  type="button"
                  disabled={!formData.pan || !formData.aadhaar}
                  onClick={() => setStep(2)}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Upload Documents */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Upload className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Document Upload</h3>
                  <p className="text-sm text-gray-500">Upload your identity documents</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* PAN Upload */}
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-primary transition-colors cursor-pointer">
                  <input type="file" accept=".jpg,.png,.pdf" className="hidden" id="pan-doc" />
                  <label htmlFor="pan-doc" className="cursor-pointer">
                    <div className="text-center">
                      <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                      <p className="font-medium text-gray-900 mb-1">Upload PAN Card</p>
                      <p className="text-sm text-gray-500">JPG, PNG or PDF (max 5MB)</p>
                    </div>
                  </label>
                </div>

                {/* Aadhaar Upload */}
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-primary transition-colors cursor-pointer">
                  <input type="file" accept=".jpg,.png,.pdf" className="hidden" id="aadhaar-doc" />
                  <label htmlFor="aadhaar-doc" className="cursor-pointer">
                    <div className="text-center">
                      <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                      <p className="font-medium text-gray-900 mb-1">Upload Aadhaar Card</p>
                      <p className="text-sm text-gray-500">JPG, PNG or PDF (max 5MB)</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" type="button" onClick={() => setStep(1)} icon={ArrowLeft}>
                  Back
                </Button>
                <Button type="button" onClick={() => setStep(3)} icon={ArrowRight} iconPosition="right">
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Consent & Submit */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Consent & Submit</h3>
                  <p className="text-sm text-gray-500">Review and accept to submit your KYC</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="font-medium text-gray-900 mb-4">Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">PAN Number</span>
                    <span className="font-medium text-gray-900">{formData.pan || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Aadhaar Number</span>
                    <span className="font-medium text-gray-900">
                      {formData.aadhaar ? `XXXX-XXXX-${formData.aadhaar.slice(-4)}` : "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-6 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Terms of Consent</h4>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• I consent to verify my identity using my PAN and Aadhaar details.</p>
                  <p>• I authorize the storage and processing of my personal information.</p>
                  <p>• I understand that providing false information is a criminal offense.</p>
                </div>
              </div>

              <label className="flex items-start gap-3 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">
                  I agree to share my information for KYC verification and accept the terms of service.
                  <span className="text-error ml-1">*</span>
                </span>
              </label>

              <div className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setStep(2)} icon={ArrowLeft}>
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={!formData.consent}
                  loading={loading}
                >
                  Submit KYC
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </Card>
    </div>
  );
}
