import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Landmark,
  HeartPulse,
  Home,
  ShoppingCart
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-indigo-600 h-[calc(100vh-80px)] fixed left-0 top-20 p-4">


      {/* MAIN */}
      <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />

      {/* DOMAINS */}
      <div className="mt-6">
        <p className="text-indigo-200 text-sm mb-2 px-2 uppercase">
          Domains
        </p>

        <SidebarLink to="/dashboard/banking-analytics" icon={Landmark} label="Banking" />

        <SidebarLink to="/dashboard/healthcare" icon={HeartPulse} label="Healthcare" />
        <SidebarLink to="/dashboard/realestate" icon={Home} label="Real Estate" />
        <SidebarLink to="/dashboard/ecommerce" icon={ShoppingCart} label="E-Commerce" />
      </div>

      {/* SYSTEM */}
      <div className="mt-6">
        <p className="text-indigo-200 text-sm mb-2 px-2 uppercase">
          System
        </p>

        <SidebarLink to="/dashboard/users" icon={Users} label="Users" />
        <SidebarLink to="/dashboard/reports" icon={FileText} label="Reports" />
        <SidebarLink to="/dashboard/settings" icon={Settings} label="Settings" />
      </div>
    </aside>
  );
}

/* ================= REUSABLE LINK ================= */
function SidebarLink({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-4 py-2 rounded-lg transition
        ${isActive
          ? "bg-white text-indigo-600 font-semibold"
          : "text-white hover:bg-indigo-500"}
        `
      }
    >
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
  );
}
