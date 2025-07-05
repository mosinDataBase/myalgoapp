// src/pages/OrdersPage.jsx
import React from 'react';

const OrdersPage = () => {
  const sampleOrders = [
    {
      id: 'ORD123456',
      symbol: 'RELIANCE',
      orderType: 'Buy',
      quantity: 100,
      price: 2725.50,
      status: 'Executed',
      time: '10:32:11 AM',
    },
    {
      id: 'ORD123457',
      symbol: 'NIFTY25JUL18400CE',
      orderType: 'Sell',
      quantity: 75,
      price: 132.25,
      status: 'Pending',
      time: '11:15:42 AM',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>

      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Symbol</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Quantity</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {sampleOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">{order.symbol}</td>
                <td className={`px-4 py-3 ${order.orderType === 'Buy' ? 'text-green-600' : 'text-red-600'}`}>
                  {order.orderType}
                </td>
                <td className="px-4 py-3">{order.quantity}</td>
                <td className="px-4 py-3">₹{order.price}</td>
                <td className="px-4 py-3 font-medium">{order.status}</td>
                <td className="px-4 py-3">{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
