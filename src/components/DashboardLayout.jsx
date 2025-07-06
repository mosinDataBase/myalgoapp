import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content & Footer */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Scrollable Main */}
          <main className="flex-1 overflow-y-auto p-4">{children}</main>

          {/* Footer */}
          <footer className="bg-gray-200 text-center text-sm text-gray-600 py-2">
            © {new Date().getFullYear()} Algo Platform. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
