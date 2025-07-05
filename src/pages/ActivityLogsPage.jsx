// src/pages/ActivityLogsPage.jsx
import React from 'react';

const ActivityLogsPage = () => {
  const logs = [
    {
      time: '2025-07-05 12:21',
      user: 'MASULA',
      activity: 'Logged In',
      status: 'Success',
      statusColor: 'text-green-600',
    },
    {
      time: '2025-07-05 12:30',
      user: 'MASULA',
      activity: 'Placed Buy Order (RELIANCE)',
      status: 'Executed',
      statusColor: 'text-blue-600',
    },
    {
      time: '2025-07-05 12:45',
      user: 'MASULA',
      activity: 'Modified Order (NIFTY)',
      status: 'Pending',
      statusColor: 'text-yellow-600',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📝 Activity Logs</h2>

      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Activity</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map((log, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3">{log.time}</td>
                <td className="px-4 py-3">{log.user}</td>
                <td className="px-4 py-3">{log.activity}</td>
                <td className={`px-4 py-3 font-medium ${log.statusColor}`}>{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        This section shows user actions such as logins, order events, and platform activity.
      </p>
    </div>
  );
};

export default ActivityLogsPage;
