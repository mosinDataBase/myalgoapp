import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useMainIndex from "../hooks/useMainIndex";
import { showToast } from "../utils/alerts";
import axios from "axios";
import URLS from "../config/apiUrls";
import { IndicesProvider, useIndices } from "../contexts/IndicesContext"; // ✅ import

const DashboardLayoutContent = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { indices, loading } = useMainIndex();
  const { setIndicesContext } = useIndices(); // ✅ context setter
  const navigate = useNavigate();

  const dataString = sessionStorage.getItem("data");
  const userData = dataString ? JSON.parse(dataString) : null;

  useEffect(() => {
    if (indices?.length) {
      setIndicesContext(indices);
    }
  }, [indices]);

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
          indices={indices}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <div style={{marginTop: "2%"}} className="flex flex-col flex-1 overflow-hidden scrollbar-hide">
          <main className="flex-1 p-4 pt-20 overflow-hidden scrollbar-hide">
            {children}
          </main>
          <footer className="bg-gray-200 text-center text-sm text-gray-600 py-2">
            © {new Date().getFullYear()} Algo Platform. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

// ✅ Wrap the actual layout inside the provider
const DashboardLayout = ({ children }) => (
  <IndicesProvider>
    <DashboardLayoutContent children={children} />
  </IndicesProvider>
);

export default DashboardLayout;
