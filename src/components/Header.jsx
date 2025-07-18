import React, { useRef, useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { showToast } from "../utils/alerts";
import axios from "axios";
import URLS from "../config/apiUrls";

const Header = ({ toggleSidebar }) => {
  const [tradingStarted, setTradingStarted] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const closeTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const dataString = sessionStorage.getItem("data");
  const userData = dataString ? JSON.parse(dataString) : null;

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = async () => {
  try {
    const dataString = sessionStorage.getItem("data");
    const userData = dataString ? JSON.parse(dataString) : null;
    const mobileNumber = localStorage.getItem("mobileNumber") || userData?.mobileNumber;

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
  }finally{
     localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  }
};

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setUserMenuOpen(false);
    }, 200);
  };

  // ✅ Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById("user-dropdown");
      const button = document.getElementById("user-button");
      if (
        userMenuOpen &&
        dropdown &&
        !dropdown.contains(event.target) &&
        button &&
        !button.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  return (
    <header style={{ paddingRight: "16.5rem" }} className="flex justify-between items-center bg-white shadow px-4 py-3 md:px-6 fixed top-0 z-40 w-full">

      
      {/* Left side buttons and hamburger */}
      <div className="flex items-center gap-2">
        {/* Hamburger - visible only on mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-600 text-xl mr-2"
        >
          <FaBars />
        </button>

        {/* Semi/Auto/Forward Testing buttons */}
        <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-sm">
          Semi
        </button>
        <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-sm">
          Auto
        </button>
        <button className="bg-indigo-600 text-white px-4 py-1 rounded text-sm">
          Forward Testing
        </button>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
          Trading is Started
        </span>
        <Switch
          checked={tradingStarted}
          onChange={setTradingStarted}
          className={`${
            tradingStarted ? "bg-green-500" : "bg-gray-400"
          } relative inline-flex h-6 w-11 items-center rounded-full transition`}
        >
          <span
            className={`${
              tradingStarted ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>

        {/* User menu */}
        <div className="relative group">
          <button
            id="user-button"
            onClick={toggleUserMenu}
            className="flex items-center gap-2 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={userMenuOpen}
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
              <span role="img" aria-label="User">
                👤
              </span>
            </div>
            <span className="text-gray-700 text-sm hidden sm:inline">
              {userData?.greetingName || "User"}
            </span>
          </button>

          {/* Dropdown */}
          <div
            id="user-dropdown"
            className={`absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md transition-opacity duration-200 z-50 ${
              userMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => alert("User Management clicked")}
            >
              User Management
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
