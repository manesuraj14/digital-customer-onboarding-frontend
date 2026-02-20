import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./ui/Sidebar";

export default function BankingLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className="flex pt-16">
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main
          className={`flex-1 min-h-[calc(100vh-4rem)] transition-all duration-300 ${
            sidebarCollapsed ? "ml-20" : "ml-[280px]"
          }`}
        >
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
