import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  hover = false,
  padding = true,
  title,
  subtitle,
  action,
}) {
  const baseClasses = "bg-white rounded-xl shadow-card border border-gray-100";
  const hoverClasses = hover ? "card-hover cursor-pointer" : "";
  const paddingClasses = padding ? "p-6" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${baseClasses} ${hoverClasses} ${paddingClasses} ${className}`}
    >
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = "" }) {
  return <div className={`p-6 ${className}`} />;
}

export function CardFooter({ children, className = "" }) {
  return (
    <div className={`px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl ${className}`}>
      {children}
    </div>
  );
}
