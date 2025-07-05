// src/pages/DashboardPage.jsx

import {
  FaArrowUp,
  FaBookOpen,
  FaMedal,
  FaRupeeSign,
} from 'react-icons/fa';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  

  return (
    <div className="p-6">
      {/* Header with Trading Toggle */}
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold !text-white dark:!text-black">📊 Dashboard</h1>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-purple-50 dark:bg-white rounded-lg p-4 text-center shadow">
          <FaArrowUp className="text-purple-600 mx-auto mb-1" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Trades Today</p>
          <p className="text-xl font-bold">6</p>
        </div>
        <div className="bg-white dark:bg-white rounded-lg p-4 text-center shadow">
          <FaBookOpen className="text-cyan-600 mx-auto mb-1" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Open Positions</p>
          <p className="text-xl font-bold">6</p>
        </div>
        <div className="bg-rose-50 dark:bg-white rounded-lg p-4 text-center shadow">
          <FaMedal className="text-rose-600 mx-auto mb-1" />
          <p className="text-sm text-gray-500 dark:text-gray-300">Win Rate</p>
          <p className="text-xl font-bold">100%</p>
        </div>
        <div className="bg-green-50 dark:bg-white rounded-lg p-4 text-center shadow">
          <FaRupeeSign className="text-green-600 mx-auto mb-1" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Cumulative P/L</p>
          <p className="text-xl font-bold">₹10,000</p>
        </div>
        <div className="bg-gray-100 dark:bg-white rounded-lg p-4 text-center shadow">
          <p className="text-sm text-gray-600 dark:text-gray-300">Mode</p>
          <p className="text-xl font-semibold text-indigo-500">Forward Testing</p>
        </div>
      </div>

      {/* Main Dashboard Components */}
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
