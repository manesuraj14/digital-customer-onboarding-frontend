import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-indigo-900 via-indigo-700 to-blue-600
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
      text-white px-6"
    >
      <div className="text-center max-w-4xl">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-6"
        >
          Transform Your Customer <br />
          <span className="text-yellow-400">Onboarding Experience</span>
        </motion.h1>

        <p className="text-lg md:text-xl text-indigo-100 mb-10">
          A secure, scalable and modern digital onboarding platform for
          enterprises.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="px-8 py-3 bg-white text-indigo-700 rounded-lg font-semibold
                       hover:scale-105 hover:shadow-xl transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 border border-white rounded-lg font-semibold
                       hover:bg-white hover:text-indigo-700 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
