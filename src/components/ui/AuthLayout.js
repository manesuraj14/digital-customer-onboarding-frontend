import { motion } from "framer-motion";

export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4
    bg-gradient-to-br from-indigo-700 via-purple-600 to-blue-600">

      {/* HEADER */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="/logo.png"
          alt="logo"
          className="h-14 mb-2 object-contain"
        />
        <h1 className="text-white text-2xl font-bold tracking-wide">
          Digital Customer Onboarding
        </h1>
      </div>

      {/* CARD */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-white/95 backdrop-blur-xl
        rounded-2xl shadow-2xl p-10 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {title}
        </h2>

        {children}
      </motion.div>

    </div>
  );
}
