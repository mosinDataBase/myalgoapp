import React, { useRef, useState } from "react";
import { Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { initSymbolDB } from "../utils/allSymbolDB";

const Header = () => {
  const [tradingStarted, setTradingStarted] = useState(true);
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const closeTimeoutRef = useRef(null);
  const dataString = sessionStorage.getItem("data");
  const userData = dataString ? JSON.parse(dataString) : null;
  // Toggle user menu on mobile
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  const handleLogout = async () => {
    localStorage.clear();
    sessionStorage.clear();

    const deleteRequest = indexedDB.deleteDatabase("MarketSymbolsDB");

    deleteRequest.onsuccess = () => {
      console.log("✅ IndexedDB deleted successfully");
    };

    deleteRequest.onerror = () => {
      console.error("❌ Failed to delete IndexedDB");
    };

    deleteRequest.onblocked = () => {
      console.warn("⚠️ Deletion blocked: DB still in use (close other tabs)");
    };

    navigate("/");
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  // When mouse leaves dropdown area, wait 200ms before closing
  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setUserMenuOpen(false);
    }, 200);
  };

  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-3">
      <div className="flex items-center gap-2">
        <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded">
          Semi
        </button>
        <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded">
          Auto
        </button>
        <button className="bg-indigo-600 text-white px-4 py-1 rounded">
          Forward Testing
        </button>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700 dark:text-gray-300">
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
          {/* User info button */}
          <button
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
            <span className="text-gray-700 text-sm">
              {userData.greetingName}
            </span>
          </button>

          {/* Dropdown menu */}
          <div
            className={`
              absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md
              transition-opacity duration-200
              ${
                userMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }     
            `}
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
