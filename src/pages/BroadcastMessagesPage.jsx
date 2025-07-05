// src/pages/BroadcastMessagesPage.jsx
import React from 'react';

const BroadcastMessagesPage = () => {
  const messages = [
    {
      id: 1,
      type: 'info',
      title: '🛠 Scheduled Maintenance',
      color: 'blue',
      message:
        'The platform will be under maintenance on Sunday, July 7th from 2:00 AM to 5:00 AM.',
    },
    {
      id: 2,
      type: 'success',
      title: '✅ Market Open',
      color: 'green',
      message: 'All exchanges are operating normally. Happy Trading!',
    },
    {
      id: 3,
      type: 'warning',
      title: '⚠️ Margin Rule Update',
      color: 'yellow',
      message:
        'New SEBI margin rules apply from July 10th. Please review your positions accordingly.',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📢 Broadcast Messages</h2>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
  <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
    View real-time platform announcements, trade alerts, maintenance notices, and other important updates.
  </p>

  <div className="space-y-4">
    {messages.map((msg) => (
      <div
        key={msg.id}
        className={`border-l-4 bg-opacity-50 p-4 rounded shadow-sm ${
          msg.color === 'blue'
            ? 'border-blue-500 bg-blue-100 dark:bg-blue-950'
            : msg.color === 'green'
            ? 'border-green-500 bg-green-100 dark:bg-green-950'
            : msg.color === 'yellow'
            ? 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900'
            : 'border-gray-500 bg-gray-100 dark:bg-gray-800'
        }`}
      >
        <h4
          className={`font-semibold mb-1 ${
            msg.color === 'blue'
              ? 'text-blue-700 dark:text-blue-300'
              : msg.color === 'green'
              ? 'text-green-700 dark:text-green-300'
              : msg.color === 'yellow'
              ? 'text-yellow-700 dark:text-yellow-300'
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {msg.title}
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300">{msg.message}</p>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default BroadcastMessagesPage;
