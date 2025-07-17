import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex flex-col flex-1 overflow-hidden scrollbar-hide">
          <main className="flex-1 p-4 pt-20 overflow-hidden scrollbar-hide">{children}</main>
          <footer className="bg-gray-200 text-center text-sm text-gray-600 py-2">
            © {new Date().getFullYear()} Algo Platform. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
