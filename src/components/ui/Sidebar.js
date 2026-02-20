import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Landmark,
  HeartPulse,
  Home,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Building2,
  Shield,
  Search,
} from "lucide-react";

export default function Sidebar({ isCollapsed, onToggle }) {
  const location = useLocation();

  const mainLinks = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  ];

  const domainLinks = [
    { 
      to: "/dashboard/banking", 
      icon: Landmark, 
      label: "Banking",
      children: [
        { to: "/dashboard/banking/account-opening", icon: Building2, label: "Account Opening" },
        { to: "/dashboard/banking/kyc", icon: Shield, label: "KYC Verification" },
        { to: "/dashboard/banking/track", icon: Search, label: "Track Application" },
      ]
    },
    { to: "/dashboard/healthcare", icon: HeartPulse, label: "Healthcare" },
    { to: "/dashboard/realestate", icon: Home, label: "Real Estate" },
    { to: "/dashboard/ecommerce", icon: ShoppingCart, label: "E-Commerce" },
  ];

  const systemLinks = [
    { to: "/dashboard/users", icon: Users, label: "Users" },
    { to: "/dashboard/reports", icon: FileText, label: "Reports" },
    { to: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="fixed left-0 top-16 bottom-0 bg-primary z-40 flex flex-col"
    >
      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {/* Main Section */}
        <div className="mb-6">
          {!isCollapsed && (
            <p className="px-3 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              Main
            </p>
          )}
          {mainLinks.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>

        {/* Domains Section */}
        <div className="mb-6">
          {!isCollapsed && (
            <p className="px-3 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              Domains
            </p>
          )}
          {domainLinks.map((link) => (
            link.children ? (
              <ExpandableLink
                key={link.to}
                to={link.to}
                icon={link.icon}
                label={link.label}
                children={link.children}
                isCollapsed={isCollapsed}
                location={location}
              />
            ) : (
              <SidebarLink
                key={link.to}
                to={link.to}
                icon={link.icon}
                label={link.label}
                isCollapsed={isCollapsed}
              />
            )
          ))}
        </div>

        {/* System Section */}
        <div>
          {!isCollapsed && (
            <p className="px-3 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              System
            </p>
          )}
          {systemLinks.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/10">
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-xs text-white/70 mb-2">Need Help?</p>
            <p className="text-xs text-white/50">Contact support for assistance</p>
          </div>
        </div>
      )}
    </motion.aside>
  );
}

function SidebarLink({ to, icon: Icon, label, isCollapsed }) {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(to + "/");

  return (
    <NavLink
      to={to}
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mb-1
        ${isActive
          ? "bg-white text-primary font-semibold"
          : "text-white/80 hover:bg-white/10 hover:text-white"
        }
        ${isCollapsed ? "justify-center" : ""}
      `}
      title={isCollapsed ? label : undefined}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
      {!isCollapsed && <span className="text-sm">{label}</span>}
    </NavLink>
  );
}

function ExpandableLink({ to, icon: Icon, label, children, isCollapsed, location }) {
  const [isExpanded, setIsExpanded] = useState(
    location.pathname.startsWith(to)
  );
  
  const isActive = location.pathname.startsWith(to);
  const hasActiveChild = children?.some(child => 
    location.pathname.startsWith(child.to)
  );

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mb-1
          ${isActive || hasActiveChild
            ? "bg-white text-primary font-semibold"
            : "text-white/80 hover:bg-white/10 hover:text-white"
          }
          ${isCollapsed ? "justify-center" : ""}
        `}
        title={isCollapsed ? label : undefined}
      >
        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive || hasActiveChild ? "text-primary" : ""}`} />
        {!isCollapsed && (
          <>
            <span className="text-sm flex-1 text-left">{label}</span>
            <ChevronRight
              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
            />
          </>
        )}
      </button>
      
      <AnimatePresence>
        {!isCollapsed && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                className={`
                  flex items-center gap-3 pl-11 pr-3 py-2 rounded-lg transition-all duration-200 mb-1
                  ${location.pathname === child.to
                    ? "bg-white/20 text-white"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <child.icon className="w-4 h-4" />
                <span className="text-sm">{child.label}</span>
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
