import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from "axios";
import URLS from "../config/apiUrls";
import { IndicesProvider } from "../contexts/IndicesContext"; // ✅ import
import { showToast } from "../utils/alerts";

const DashboardLayoutContent = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const dataString = sessionStorage.getItem("data");
  const userData = dataString ? JSON.parse(dataString) : null;

  const handleLogout = async () => {
    try {
      const dataString = sessionStorage.getItem("data");
      const userData = dataString ? JSON.parse(dataString) : null;
      const mobileNumber =
        localStorage.getItem("mobileNumber") || userData?.mobileNumber;

      if (!mobileNumber) {
        showToast({
          type: "error",
          title: "Session Invalid",
          text: "Mobile number not found in storage.",
        });
        return;
      }

      const response = await axios.post(URLS.logout, { mobileNumber });

      if (response.data.status === "success") {
        showToast({
          type: "success",
          title: "Logout Successful",
          text: "You have been logged out.",
        });
      } else {
        showToast({
          type: "error",
          title: "Logout Failed",
          text: response.data.message || "Something went wrong.",
        });
      }

      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      showToast({
        type: "error",
        title: "Network Error",
        text: "Logout failed. Please try again.",
      });
    } finally {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar
        handleLogout={handleLogout}
        userData={userData}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1">
        <Header
          handleLogout={handleLogout}
          userData={userData}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="flex flex-col flex-1 h-full">
          <main className="flex-1 scrollbar-hide overflow-auto p-4 pt-20">{children}</main>
          <footer className="bg-gray-200 text-center text-sm text-gray-600 py-2">
            © {new Date().getFullYear()} AlgoFox Platform. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

// ✅ Global provider here
const DashboardLayout = ({ children }) => (
  <IndicesProvider>
    <DashboardLayoutContent>{children}</DashboardLayoutContent>
  </IndicesProvider>
);

export default DashboardLayout;
