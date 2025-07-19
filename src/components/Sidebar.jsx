// Sidebar.jsx
import React from "react";
import {
  FaChartLine,
  FaClipboardList,
  FaSignal,
  FaUserCog,
  FaListAlt,
  FaEnvelopeOpenText,
  FaCog,
  FaCogs,
} from "react-icons/fa";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import {
  MdOutlineBroadcastOnHome,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo512-bg-remove.png";
import { Switch } from "@headlessui/react";

const Sidebar = ({
  isOpen,
  onClose,
  toggleSidebar,
  indices,
  tradingStarted,
  setTradingStarted,
  toggleUserMenu,
  userMenuOpen,
  handleMouseEnter,
  handleMouseLeave,
  handleLogout,
  userData,
}) => {
  const menuItems = [
    { name: "Home", icon: <FaChartLine />, path: "/dashboard" },
    { name: "Watch List", icon: <FaChartLine />, path: "/watchlist" },
    { name: "Orders", icon: <FaClipboardList />, path: "/orders" },
    {
      name: "Trades",
      icon: <AiOutlineFundProjectionScreen />,
      path: "/trades",
    },
    { name: "Net Position", icon: <FaSignal />, path: "/net-position" },
    { name: "Management", icon: <FaUserCog />, path: "/management" },
    { name: "Order Logs", icon: <FaListAlt />, path: "/order-logs" },
    {
      name: "Activity Logs",
      icon: <FaEnvelopeOpenText />,
      path: "/activity-logs",
    },
    { name: "Trade Setting", icon: <FaCog />, path: "/trade-settings" },
    { name: "Option Analytics", icon: <FaCogs />, path: "/option-analytics" },
    {
      name: "Broadcast Messages",
      icon: <MdOutlineBroadcastOnHome />,
      path: "/broadcast-messages",
    },
    { name: "Support", icon: <MdOutlineSupportAgent />, path: "/support" },
  ];

  return (
    <div
      className={`bg-white shadow-lg w-60 min-h-screen p-4 fixed top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:block`}
    >
      {/* Logo Section */}
      <div className="mb-6 text-center">
        <Link to="/dashboard">
          <img src={logo} alt="MyALGOFOX Logo" className="w-36 mx-auto" />
        </Link>
        <div className="block sm:hidden  flex items-center gap-4">
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
        </div>
      </div>

      <ul className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)] pr-2 scrollbar-hide">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 text-gray-700 hover:text-purple-600 transition-colors ${
                  isActive ? "font-semibold text-purple-600" : ""
                }`
              }
              onClick={onClose} // close menu on click in mobile
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Mobile-only: User Info + Logout */}
      <div className="flex items-center justify-between w-full px-4 py-3 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
            <span role="img" aria-label="User">
              👤
            </span>
          </div>
          <span className="text-gray-700 text-sm font-medium">
            {userData?.greetingName || "User"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>

      {/* WhatsApp Icon - bottom left */}
      <div className="absolute bottom-5 left-5">
        <a
          href="https://wa.me/919999999999" // Replace with actual number
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-8 h-8"
          />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
