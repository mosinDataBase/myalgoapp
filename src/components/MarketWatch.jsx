import React from 'react';

const MarketWatch = () => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-2">Market Watch</h3>
    <ul className="divide-y">
      {['RELIANCE', 'NIFTY 50', 'AXISBANK'].map((sym) => (
        <li key={sym} className="py-2 flex justify-between">
          <span>{sym}</span>
          <span>₹{(Math.random()*1000+1000).toFixed(2)}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default MarketWatch;
