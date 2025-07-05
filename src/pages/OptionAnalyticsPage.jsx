// src/pages/OptionAnalyticsPage.jsx
import React, { useState } from 'react';

const OptionAnalyticsPage = () => {
  const [symbol, setSymbol] = useState('NIFTY');
  const [expiry, setExpiry] = useState('25JUL2025');

  const mockOptionData = [
    {
      strikePrice: 22500,
      callOI: 54000,
      putOI: 32000,
      callLTP: 120.5,
      putLTP: 85.25,
      ivCall: 18.3,
      ivPut: 21.7,
    },
    {
      strikePrice: 22600,
      callOI: 62000,
      putOI: 35000,
      callLTP: 96.75,
      putLTP: 105.6,
      ivCall: 19.1,
      ivPut: 22.4,
    },
    {
      strikePrice: 22700,
      callOI: 70000,
      putOI: 27000,
      callLTP: 82.2,
      putLTP: 125.9,
      ivCall: 17.8,
      ivPut: 23.5,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📊 Option Analytics</h2>

      <div className="bg-white dark:bg-gray-900 p-4 rounded shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="text"
            className="border rounded px-4 py-2 w-full md:w-1/3 dark:bg-gray-800 dark:text-white"
            placeholder="Enter Symbol (e.g. NIFTY)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
          <input
            type="text"
            className="border rounded px-4 py-2 w-full md:w-1/3 dark:bg-gray-800 dark:text-white"
            placeholder="Expiry (e.g. 25JUL2025)"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full md:w-auto">
            Analyze
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 text-sm rounded shadow border">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Strike</th>
              <th className="px-4 py-2 text-right text-green-600">Call OI</th>
              <th className="px-4 py-2 text-right text-green-600">Call LTP</th>
              <th className="px-4 py-2 text-right text-green-600">IV (Call)</th>
              <th className="px-4 py-2 text-right text-red-500">Put OI</th>
              <th className="px-4 py-2 text-right text-red-500">Put LTP</th>
              <th className="px-4 py-2 text-right text-red-500">IV (Put)</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {mockOptionData.map((row, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2 font-semibold">{row.strikePrice}</td>
                <td className="px-4 py-2 text-right">{row.callOI}</td>
                <td className="px-4 py-2 text-right">₹{row.callLTP}</td>
                <td className="px-4 py-2 text-right">{row.ivCall}%</td>
                <td className="px-4 py-2 text-right">{row.putOI}</td>
                <td className="px-4 py-2 text-right">₹{row.putLTP}</td>
                <td className="px-4 py-2 text-right">{row.ivPut}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        Analyze open interest (OI), LTP, and implied volatility (IV) across strikes for your selected symbol and expiry.
      </p>
    </div>
  );
};

export default OptionAnalyticsPage;
