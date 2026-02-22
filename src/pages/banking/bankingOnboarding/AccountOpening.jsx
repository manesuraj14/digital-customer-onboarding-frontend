import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  User,
  MapPin,
  Users,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Upload,
} from "lucide-react";
import BackToBanking from "../../../components/BackToBanking";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Input, { Select } from "../../../components/ui/Input";
import Stepper from "../../../components/ui/Stepper";

export default function AccountOpening() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    bank: "",
    accountType: "",
    fullName: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    pincode: "",
    nominee: "",
    panFile: null,
    aadhaarFile: null,
    consent: false,
  });

  const steps = [
    { title: "Bank", icon: Building2 },
    { title: "Personal", icon: User },
    { title: "Address", icon: MapPin },
    { title: "Nominee", icon: Users },
    { title: "Documents", icon: FileText },
    { title: "Review", icon: CheckCircle },
    { title: "Consent", icon: CheckCircle },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const isFilled = (fields) =>
    fields.every((field) => formData[field]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const submitData = new FormData();

      submitData.append("bankName", formData.bank);
      submitData.append("accountType", formData.accountType);
      submitData.append("fullName", formData.fullName);
      submitData.append("dob", formData.dob);
      submitData.append("gender", formData.gender);
      submitData.append("address", formData.address);
      submitData.append("city", formData.city);
      submitData.append("pincode", formData.pincode);
      submitData.append("nominee", formData.nominee);
      submitData.append("panFile", formData.panFile);
      submitData.append("aadhaarFile", formData.aadhaarFile);
      submitData.append("consent", formData.consent);

      const response = await fetch(
        "http://localhost:8081/api/banking/apply",
        {
          method: "POST",
          body: submitData,
        }
      );

      if (!response.ok) {
        throw new Error("Application submission failed");
      }

      const result = await response.json();
      localStorage.setItem("lastApplicationId", result.applicationId);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting the application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Screen
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
            Application Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-8">
            Your application has been received and is being processed. You will receive updates via email and SMS.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8 inline-block">
            <p className="text-sm text-gray-500 mb-1">Application ID</p>
            <p className="text-2xl font-bold text-primary">
              {localStorage.getItem("lastApplicationId") || "APP-" + Date.now()}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/dashboard/banking/track")}>
              Track Application
            </Button>
            <Button variant="outline" onClick={() => navigate("/dashboard/banking")}>
              Back to Banking
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <BackToBanking />

      <PageHeader
        title="Account Opening"
        subtitle="Complete the form below to open a new bank account"
        breadcrumbs={[
          { label: "Banking", href: "/dashboard/banking" },
          { label: "Account Opening" },
        ]}
      />

      {/* Stepper */}
      <Card className="mb-8">
        <Stepper steps={steps.map(s => s.title)} currentStep={step} />
      </Card>

      {/* Form Content */}
      <Card>
        <AnimatePresence mode="wait">
          {/* STEP 1 - BANK */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Select Bank & Account Type</h3>
                  <p className="text-sm text-gray-500">Choose your preferred bank and account category</p>
                </div>
              </div>

              <div className="space-y-5">
                <Select
                  label="Select Bank"
                  name="bank"
                  value={formData.bank}
                  onChange={handleChange}
                  options={[
                    { value: "HDFC Bank", label: "HDFC Bank" },
                    { value: "ICICI Bank", label: "ICICI Bank" },
                    { value: "Axis Bank", label: "Axis Bank" },
                  ]}
                  required
                />

                <Select
                  label="Account Type"
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  options={[
                    { value: "Savings Account", label: "Savings Account" },
                    { value: "Current Account", label: "Current Account" },
                    { value: "Salary Account", label: "Salary Account" },
                    { value: "Student Account", label: "Student Account" },
                  ]}
                  required
                />
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  disabled={!formData.bank || !formData.accountType}
                  onClick={next}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2 - PERSONAL */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>
                  <p className="text-sm text-gray-500">Enter your personal information</p>
                </div>
              </div>

              <div className="space-y-5">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name as per ID proof"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Date of Birth"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />

                  <Select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    options={[
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                      { value: "Other", label: "Other" },
                    ]}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={back} icon={ArrowLeft}>
                  Back
                </Button>
                <Button
                  disabled={!isFilled(["fullName", "dob", "gender"])}
                  onClick={next}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 - ADDRESS */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Address Details</h3>
                  <p className="text-sm text-gray-500">Enter your current residential address</p>
                </div>
              </div>

              <div className="space-y-5">
                <Input
                  label="Full Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                  />

                  <Input
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter 6-digit pincode"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={back} icon={ArrowLeft}>
                  Back
                </Button>
                <Button
                  disabled={!isFilled(["address", "city", "pincode"])}
                  onClick={next}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4 - NOMINEE */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Nominee Details</h3>
                  <p className="text-sm text-gray-500">Add a nominee for your account</p>
                </div>
              </div>

              <div className="space-y-5">
                <Input
                  label="Nominee Name"
                  name="nominee"
                  value={formData.nominee}
                  onChange={handleChange}
                  placeholder="Enter nominee's full name"
                  required
                />
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={back} icon={ArrowLeft}>
                  Back
                </Button>
                <Button
                  disabled={!formData.nominee}
                  onClick={next}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 5 - DOCUMENTS */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Document Upload</h3>
                  <p className="text-sm text-gray-500">Upload required documents for verification</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* PAN Card */}
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    name="panFile"
                    accept=".jpg,.png,.pdf"
                    onChange={handleChange}
                    className="hidden"
                    id="pan-upload"
                  />
                  <label htmlFor="pan-upload" className="cursor-pointer">
                    {formData.panFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="w-8 h-8 text-success" />
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{formData.panFile.name}</p>
                          <p className="text-sm text-gray-500">Click to change file</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <p className="font-medium text-gray-900 mb-1">Upload PAN Card</p>
                        <p className="text-sm text-gray-500">JPG, PNG or PDF (max 5MB)</p>
                      </>
                    )}
                  </label>
                </div>

                {/* Aadhaar Card */}
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    name="aadhaarFile"
                    accept=".jpg,.png,.pdf"
                    onChange={handleChange}
                    className="hidden"
                    id="aadhaar-upload"
                  />
                  <label htmlFor="aadhaar-upload" className="cursor-pointer">
                    {formData.aadhaarFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="w-8 h-8 text-success" />
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{formData.aadhaarFile.name}</p>
                          <p className="text-sm text-gray-500">Click to change file</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <p className="font-medium text-gray-900 mb-1">Upload Aadhaar Card</p>
                        <p className="text-sm text-gray-500">JPG, PNG or PDF (max 5MB)</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={back} icon={ArrowLeft}>
                  Back
                </Button>
                <Button
                  disabled={!formData.panFile || !formData.aadhaarFile}
                  onClick={next}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 6 - REVIEW */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Review & Verify</h3>
                  <p className="text-sm text-gray-500">Please review your application details</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <ReviewItem label="Bank" value={formData.bank} />
                <ReviewItem label="Account Type" value={formData.accountType} />
                <ReviewItem label="Full Name" value={formData.fullName} />
                <ReviewItem label="Date of Birth" value={formData.dob} />
                <ReviewItem label="Gender" value={formData.gender} />
                <ReviewItem label="Address" value={formData.address} />
                <ReviewItem label="City" value={formData.city} />
                <ReviewItem label="Pincode" value={formData.pincode} />
                <ReviewItem label="Nominee" value={formData.nominee} />
                <ReviewItem 
                  label="PAN Card" 
                  value={formData.panFile?.name || "Not uploaded"} 
                />
                <ReviewItem 
                  label="Aadhaar Card" 
                  value={formData.aadhaarFile?.name || "Not uploaded"} 
                />
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={back} icon={ArrowLeft}>
                  Back
                </Button>
                <Button onClick={next} icon={ArrowRight} iconPosition="right">
                  Proceed to Consent
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 7 - CONSENT */}
          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Final Consent & Submission</h3>
                  <p className="text-sm text-gray-500">Review and accept terms to submit your application</p>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-6 mb-6">
                <h4 className="font-medium text-gray-900 mb-4">Terms & Conditions</h4>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• I confirm that all information provided is true and accurate.</p>
                  <p>• I authorize the bank to verify all provided documents.</p>
                  <p>• I agree to the bank's terms and conditions and privacy policy.</p>
                  <p>• I understand that providing false information may result in account closure.</p>
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
                  I hereby confirm that all the information provided is accurate and I agree to the bank's terms and conditions.
                  <span className="text-error ml-1">*</span>
                </span>
              </label>

              <div className="flex justify-between">
                <Button variant="outline" onClick={back} icon={ArrowLeft}>
                  Back
                </Button>
                <Button
                  disabled={!formData.consent || isSubmitting}
                  onClick={handleSubmit}
                  loading={isSubmitting}
                >
                  Submit Application
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}

function ReviewItem({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-200 last:border-0">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}
