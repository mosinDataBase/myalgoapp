import React, { useRef, useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

import { FaBars } from "react-icons/fa";
import { useIndices } from "../contexts/IndicesContext";

const Header = ({ toggleSidebar, userData, handleLogout }) => {
  
  const [tradingStarted, setTradingStarted] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  const { indicesContext } = useIndices();

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
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
    <header className="flex flex-wrap items-center bg-white shadow px-4 py-3 md:px-6 fixed top-0 z-40 w-full gap-3">
      {/* Left section */}
      <div className="flex items-center gap-2 flex-wrap min-w-0">
        {/* Hamburger (mobile only) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-600 text-xl mr-2"
        >
          <FaBars />
        </button>

        {/* Semi/Auto/Forward Buttons */}
        <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-sm">
          Semi
        </button>
        <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-sm">
          Auto
        </button>
        <button className="bg-indigo-600 text-white px-4 py-1 rounded text-sm whitespace-nowrap">
          Forward Testing
        </button>

        {/* Indices - horizontal scroll on small screens */}
        <div className="flex items-center gap-4 overflow-x-auto max-w-full scrollbar-hide pl-2">
          {["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCPNIFTY"].map((symbol) => {
            const index = indicesContext?.find((item) => item.ts === symbol);
            const isPositive = parseFloat(index?.nc) > 0;
            const changePercent = parseFloat(index?.nc || 0).toFixed(2);
            const lastTradedPrice = parseFloat(index?.ltp || 0).toFixed(2);

            return (
              <div
                key={symbol}
                className="flex flex-col min-w-[100px] text-xs font-medium"
              >
                <span className="text-gray-800 uppercase font-semibold text-sm">
                  {symbol}
                </span>

                <span className="text-[13px]">
                  {index ? lastTradedPrice : "--"}
                </span>

                <span
                  className={`text-[11px] ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {index
                    ? `${isPositive ? "+" : ""}${(
                        lastTradedPrice - index.c
                      ).toFixed(2)} (${changePercent}%)`
                    : "0.00%"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side controls */}
      <div
        className="flex items-center gap-4 hidden sm:flex"
        style={{ marginLeft: "5%" }}
      >
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

        {/* ✅ Show user info only on desktop */}
        <div className="relative group hidden sm:block">
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
            <span className="text-gray-700 text-sm">
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
