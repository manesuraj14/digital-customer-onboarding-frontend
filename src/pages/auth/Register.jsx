import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../services/api";
import { Mail, Lock, User, Phone, CheckCircle } from "lucide-react";
import Input, { PasswordInput } from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setMsg("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setMsg("");
    try {
      await API.post("/auth/register", {
        ...form,
        phone: form.phone.startsWith("+91") ? form.phone : `+91${form.phone}`,
      });
      setSuccess(true);
      setMsg("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = [
    { met: form.password.length >= 6, text: "At least 6 characters" },
    { met: /[A-Z]/.test(form.password), text: "One uppercase letter" },
    { met: /[0-9]/.test(form.password), text: "One number" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-600 to-secondary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        </div>

        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl font-bold">D</span>
              </div>
              <span className="text-2xl font-bold">Digital Onboarding</span>
            </div>

            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Join Thousands of
              <br />
              Businesses
            </h2>

            <p className="text-lg text-white/80 mb-10 max-w-md">
              Create your account and start transforming your customer onboarding experience today.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-xl font-bold text-primary">Digital Onboarding</span>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500">Fill in your details to get started</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-card p-8">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Registration Successful!</h3>
                <p className="text-gray-500">Redirecting to login...</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                {msg && !success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-error-50 border border-error-200 text-error rounded-xl text-sm"
                  >
                    {msg}
                  </motion.div>
                )}

                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  icon={User}
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  icon={Mail}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter your phone number"
                  icon={Phone}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />

                <PasswordInput
                  label="Password"
                  placeholder="Create a password"
                  icon={Lock}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  required
                />

                {/* Password Requirements */}
                {form.password && (
                  <div className="space-y-2">
                    {passwordRequirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          req.met ? "bg-success" : "bg-gray-200"
                        }`}>
                          {req.met && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`text-xs ${req.met ? "text-success" : "text-gray-500"}`}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  icon={Lock}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  required
                />

                <Button type="submit" loading={loading} className="w-full">
                  Create Account
                </Button>
              </form>
            )}

            {!success && (
              <div className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-semibold hover:text-primary-600">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
