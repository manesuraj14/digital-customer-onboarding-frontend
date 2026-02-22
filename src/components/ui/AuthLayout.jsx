import { motion } from "framer-motion";
import { Shield, Globe, Zap } from "lucide-react";

export default function AuthLayout({ children, title }) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-600 to-secondary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        </div>

        {/* Content */}
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
              Secure & Seamless
              <br />
              Customer Onboarding
            </h2>

            <p className="text-lg text-white/80 mb-10 max-w-md">
              Experience enterprise-grade digital onboarding with bank-level security, 
              instant verification, and seamless integration.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              <FeatureItem 
                icon={Shield} 
                title="Bank-Grade Security" 
                description="256-bit encryption with SOC 2 compliance" 
              />
              <FeatureItem 
                icon={Zap} 
                title="Instant Verification" 
                description="Complete onboarding in under 3 minutes" 
              />
              <FeatureItem 
                icon={Globe} 
                title="Global Compliance" 
                description="KYC, AML, and GDPR ready" 
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Wave */}
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-500">Enter your credentials to continue</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-card p-8">
            {children}
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-8">
            © 2024 Digital Onboarding. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-sm text-white/70">{description}</p>
      </div>
    </div>
  );
}
