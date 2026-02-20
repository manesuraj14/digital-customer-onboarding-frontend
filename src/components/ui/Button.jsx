import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = "left",
  className = "",
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm",
    secondary: "bg-secondary text-white hover:bg-secondary-600 focus:ring-secondary-500 shadow-sm",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary-500",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
    success: "bg-success text-white hover:bg-success-600 focus:ring-success-500 shadow-sm",
    danger: "bg-error text-white hover:bg-error-600 focus:ring-error-500 shadow-sm",
    warning: "bg-warning text-white hover:bg-warning-600 focus:ring-warning-500 shadow-sm",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </>
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon className="w-4 h-4 mr-2" />}
          {children}
          {Icon && iconPosition === "right" && <Icon className="w-4 h-4 ml-2" />}
        </>
      )}
    </motion.button>
  );
}

export function IconButton({ icon: Icon, variant = "ghost", size = "md", className = "", ...props }) {
  const sizes = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  const variants = {
    primary: "text-primary hover:bg-primary-50",
    secondary: "text-secondary hover:bg-secondary-50",
    ghost: "text-gray-500 hover:bg-gray-100",
    danger: "text-error hover:bg-error-50",
  };

  return (
    <button
      className={`rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
