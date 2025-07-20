import React from 'react';

const MarketWatch = () => (
  <div className="bg-white p-2 rounded shadow-sm w-full max-w-xs text-xs">
    <div className="font-medium text-gray-700 mb-1">Market Watch</div>
    <ul className="divide-y divide-gray-200">
      {['RELIANCE', 'NIFTY 50', 'AXISBANK'].map((sym) => (
        <li key={sym} className="py-1 flex justify-between text-gray-600">
          <span>{sym}</span>
          <span>₹{(Math.random() * 1000 + 1000).toFixed(2)}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default MarketWatch;
