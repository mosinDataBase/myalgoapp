import {
  FaArrowUp,
  FaBookOpen,
  FaMedal,
  FaRupeeSign,
} from 'react-icons/fa';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-white text-gray-900">
      
      {/* Header */}
      <header className="p-4 shadow bg-white dark:bg-white">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-black">📊 Dashboard</h1>
      </header>

      {/* Content (flex-1 = scrollable body) */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <div className="bg-purple-50 dark:bg-white rounded-lg p-2 text-center shadow">
            <FaArrowUp className="text-purple-600 mx-auto text-lg mb-1" />
            <p className="text-sm text-gray-600">Trades Today</p>
            <p className="text-xl font-bold">6</p>
          </div>
          <div className="bg-white rounded-lg p-2 text-center shadow">
            <FaBookOpen className="text-cyan-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Open Positions</p>
            <p className="text-xl font-bold">6</p>
          </div>
          <div className="bg-rose-50 dark:bg-white rounded-lg p-2 text-center shadow">
            <FaMedal className="text-rose-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Win Rate</p>
            <p className="text-xl font-bold">100%</p>
          </div>
          <div className="bg-green-50 dark:bg-white rounded-lg p-2 text-center shadow">
            <FaRupeeSign className="text-green-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Cumulative P/L</p>
            <p className="text-xl font-bold">₹10,000</p>
          </div>
          <div className="bg-gray-100 dark:bg-white rounded-lg p-2 text-center shadow">
            <p className="text-sm text-gray-600">Mode</p>
            <p className="text-xl font-semibold text-indigo-500">Forward Testing</p>
          </div>
        </section>

        {/* Dashboard Main (scrolls if needed) */}
        <section className="flex-1 overflow-y-auto">
          <Dashboard />
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
