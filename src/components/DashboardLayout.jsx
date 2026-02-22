import React from "react";
import Sidebar from "./ui/Sidebar";

export default function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div
        className={`
          flex-1 p-8 pt-24 transition-all duration-300
          ${sidebarCollapsed ? "ml-20" : "ml-[280px]"}
        `}
      >
        {children}
      </div>
    </div>
  );
}
