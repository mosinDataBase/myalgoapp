// src/components/Sidebar.jsx
// Top of your Sidebar.jsx or any component where you use these icons
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

const Sidebar = () => {
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
    <div className="bg-white shadow-lg w-60 min-h-screen p-4">
      {/* Logo Section */}
      <div className="mb-6 text-center">
        <Link to="/dashboard">
          <img src={logo} alt="MyALGOFOX Logo" className="w-36 mx-auto" />
        </Link>
      </div>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 text-gray-700 hover:text-purple-600 transition-colors ${
                  isActive ? "font-semibold text-purple-600" : ""
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-5 left-5">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-8 h-8"
        />
      </div>
    </div>
  );
};

export default Sidebar;
