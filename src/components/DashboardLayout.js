import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./ui/Sidebar";

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const hideSidebar =
    location.pathname === "/dashboard/banking" ||
    location.pathname.startsWith("/dashboard/banking/account-opening") ||
    location.pathname.startsWith("/dashboard/banking/kyc");

  return (
    <div className="flex min-h-screen bg-background">
      {!hideSidebar && (
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}

      <div
        className={`
          flex-1 p-8 pt-24 transition-all duration-300
          ${!hideSidebar ? (sidebarCollapsed ? "ml-20" : "ml-[280px]") : ""}
        `}
      >
        {children}
      </div>
    </div>
  );
}
