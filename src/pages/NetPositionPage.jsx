// src/pages/NetPositionPage.jsx
import React from 'react';

const NetPositionPage = () => {
  const mockPositions = [
    {
      symbol: 'RELIANCE',
      exchange: 'NSE',
      buyQty: 100,
      sellQty: 50,
      netQty: 50,
      avgPrice: 2725.5,
      pnl: 1250.0,
    },
    {
      symbol: 'BANKNIFTY25JUL46000CE',
      exchange: 'NFO',
      buyQty: 50,
      sellQty: 50,
      netQty: 0,
      avgPrice: 310.2,
      pnl: -400.0,
    },
    {
      symbol: 'TCS',
      exchange: 'BSE',
      buyQty: 200,
      sellQty: 0,
      netQty: 200,
      avgPrice: 3585.1,
      pnl: 0.0,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📌 Net Positions</h2>

      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Symbol</th>
              <th className="px-4 py-3 text-left">Exchange</th>
              <th className="px-4 py-3 text-right">Buy Qty</th>
              <th className="px-4 py-3 text-right">Sell Qty</th>
              <th className="px-4 py-3 text-right">Net Qty</th>
              <th className="px-4 py-3 text-right">Avg. Price</th>
              <th className="px-4 py-3 text-right">PnL (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {mockPositions.map((pos, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3">{pos.symbol}</td>
                <td className="px-4 py-3">{pos.exchange}</td>
                <td className="px-4 py-3 text-right">{pos.buyQty}</td>
                <td className="px-4 py-3 text-right">{pos.sellQty}</td>
                <td className="px-4 py-3 text-right">{pos.netQty}</td>
                <td className="px-4 py-3 text-right">₹{pos.avgPrice.toFixed(2)}</td>
                <td
                  className={`px-4 py-3 text-right font-medium ${
                    pos.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  ₹{pos.pnl.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NetPositionPage;
