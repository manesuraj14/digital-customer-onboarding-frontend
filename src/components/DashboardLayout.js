import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const location = useLocation();

  const hideSidebar =
    location.pathname === "/dashboard/banking" ||
    location.pathname.startsWith("/dashboard/banking/account-opening") ||
    location.pathname.startsWith("/dashboard/banking/kyc");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {!hideSidebar && <Sidebar />}

      <div
        className={`
          flex-1 p-8 pt-28
          ${!hideSidebar ? "ml-64" : ""}
        `}
      >
        {children}
      </div>
    </div>
  );
}
