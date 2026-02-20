import { motion } from "framer-motion";

export default function PageHeader({
  title,
  subtitle,
  action,
  breadcrumbs = [],
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`mb-6 ${className}`}
    >
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-300">/</span>}
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="hover:text-primary transition-colors"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-gray-900 font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Title Section */}
      <div className="flex items-center justify-between">
        <div>
          {title && (
            <h1 className="text-2xl font-semibold text-gray-900">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </motion.div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
  className = "",
}) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div>
        {title && (
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        )}
        {subtitle && (
          <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
