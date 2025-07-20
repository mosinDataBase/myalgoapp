import React from 'react';

const RecentOrders = () => (
  <div className="bg-white rounded shadow-sm p-2 w-full max-w-xs">
    <div className="text-sm font-medium text-gray-700 mb-1">Recent Orders</div>
    <ul className="divide-y text-xs text-gray-600">
      <li className="py-1">BUY RELIANCE @ ₹2,580</li>
      <li className="py-1">SELL NIFTY @ 23,260</li>
    </ul>
  </div>
);

export default RecentOrders;
