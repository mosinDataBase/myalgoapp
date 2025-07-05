// src/pages/OrderLogsPage.jsx
import React from 'react';

const OrderLogsPage = () => {
  const mockOrderLogs = [
    {
      orderId: 'ORD123456',
      symbol: 'RELIANCE',
      type: 'BUY',
      quantity: 100,
      price: 2850,
      status: 'Executed',
      time: '2025-07-05 10:15:23',
    },
    {
      orderId: 'ORD123457',
      symbol: 'NIFTY25JUL22500CE',
      type: 'SELL',
      quantity: 50,
      price: 110.25,
      status: 'Pending',
      time: '2025-07-05 10:16:40',
    },
    {
      orderId: 'ORD123458',
      symbol: 'SBIN',
      type: 'BUY',
      quantity: 200,
      price: 588.75,
      status: 'Cancelled',
      time: '2025-07-05 09:52:10',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📄 Order Logs</h2>

      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Symbol</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-right">Qty</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockOrderLogs.map((log, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3">{log.orderId}</td>
                <td className="px-4 py-3">{log.symbol}</td>
                <td
                  className={`px-4 py-3 font-medium ${
                    log.type === 'BUY' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {log.type}
                </td>
                <td className="px-4 py-3 text-right">{log.quantity}</td>
                <td className="px-4 py-3 text-right">₹{log.price}</td>
                <td
                  className={`px-4 py-3 font-medium ${
                    log.status === 'Executed'
                      ? 'text-green-600'
                      : log.status === 'Pending'
                      ? 'text-yellow-600'
                      : 'text-gray-500'
                  }`}
                >
                  {log.status}
                </td>
                <td className="px-4 py-3">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        View logs of all orders placed across instruments and time. Filter support coming soon.
      </p>
    </div>
  );
};

export default OrderLogsPage;
