// src/pages/TradesPage.jsx
import React, { useEffect, useState } from 'react';

const sampleTrades = [
  {
    id: 'T-1001',
    symbol: 'NIFTY25JUL23600CE',
    exchange: 'NSE_FO',
    quantity: 75,
    buySell: 'Buy',
    price: 42.5,
    status: 'Executed',
    time: '10:23:45',
  },
  {
    id: 'T-1002',
    symbol: 'BANKNIFTY25JUL46200PE',
    exchange: 'NSE_FO',
    quantity: 15,
    buySell: 'Sell',
    price: 135.75,
    status: 'Executed',
    time: '10:25:11',
  },
  {
    id: 'T-1003',
    symbol: 'RELIANCE',
    exchange: 'NSE_CM',
    quantity: 50,
    buySell: 'Buy',
    price: 2850,
    status: 'Executed',
    time: '10:28:20',
  },
];

const TradesPage = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    // In real app, fetch from API
    setTrades(sampleTrades);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Executed Trades</h2>

      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Trade ID</th>
              <th className="px-4 py-3 text-left">Symbol</th>
              <th className="px-4 py-3 text-left">Exchange</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Buy/Sell</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {trades.map((trade) => (
              <tr key={trade.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{trade.id}</td>
                <td className="px-4 py-3">{trade.symbol}</td>
                <td className="px-4 py-3">{trade.exchange}</td>
                <td className="px-4 py-3">{trade.quantity}</td>
                <td className={`px-4 py-3 font-medium ${trade.buySell === 'Buy' ? 'text-green-600' : 'text-red-600'}`}>
                  {trade.buySell}
                </td>
                <td className="px-4 py-3">₹{trade.price}</td>
                <td className="px-4 py-3">{trade.time}</td>
                <td className="px-4 py-3 text-blue-600">{trade.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {trades.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No trades found.</p>
        )}
      </div>
    </div>
  );
};

export default TradesPage;
