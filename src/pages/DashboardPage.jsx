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
    <div className="min-h-screen bg-gray-100 dark:bg-white text-gray-900 p-4">
      
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-black">📊 Dashboard</h1>
      </header>

      {/* Content Wrapper: Makes everything below header scrollable if needed */}
      <div className="flex flex-col gap-1">

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <div className="bg-purple-50 dark:bg-white rounded-lg p-0.5 text-center shadow">
            <FaArrowUp className="text-purple-600 mx-auto text-lg mb-1" />
            <p className="text-sm text-gray-600">Trades Today</p>
            <p className="text-xl font-bold">6</p>
          </div>
          <div className="bg-white rounded-lg p-0.5 text-center shadow">
            <FaBookOpen className="text-cyan-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Open Positions</p>
            <p className="text-xl font-bold">6</p>
          </div>
          <div className="bg-rose-50 dark:bg-white rounded-lg p-0.5 text-center shadow">
            <FaMedal className="text-rose-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Win Rate</p>
            <p className="text-xl font-bold">100%</p>
          </div>
          <div className="bg-green-50 dark:bg-white rounded-lg p-0.5 text-center shadow">
            <FaRupeeSign className="text-green-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Cumulative P/L</p>
            <p className="text-xl font-bold">₹10,000</p>
          </div>
          <div className="bg-gray-100 dark:bg-white rounded-lg p-0.5 text-center shadow">
            <p className="text-sm text-gray-600">Mode</p>
            <p className="text-xl font-semibold text-indigo-500">Forward Testing</p>
          </div>
        </section>

        {/* Dashboard Main Section (Scrollable if needed) */}
        <section className="overflow-y-auto scrollbar-hide">
          <Dashboard />
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
