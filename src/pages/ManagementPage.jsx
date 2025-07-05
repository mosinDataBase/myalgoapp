// src/pages/ManagementPage.jsx
import React from 'react';

const ManagementPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">🧩 Management Console</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Management */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">👤 User Management</h3>
          <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside">
            <li>View active users</li>
            <li>Manage user roles and permissions</li>
            <li>Reset user passwords</li>
            <li>Enable/Disable trading access</li>
          </ul>
        </div>

        {/* Strategy Management */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">📈 Strategy Management</h3>
          <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside">
            <li>Create, edit or delete algo strategies</li>
            <li>Assign strategies to user groups</li>
            <li>Monitor strategy usage and stats</li>
          </ul>
        </div>

        {/* System Config */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">⚙️ System Configuration</h3>
          <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside">
            <li>Configure API keys and secrets</li>
            <li>Manage WebSocket endpoints</li>
            <li>Change default order settings</li>
          </ul>
        </div>

        {/* Logs & Analytics */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">📊 Logs & Analytics</h3>
          <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside">
            <li>Audit user activity</li>
            <li>View login/logout history</li>
            <li>Track error logs</li>
            <li>Export logs as CSV</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagementPage;
