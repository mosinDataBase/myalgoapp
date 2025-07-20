import React from 'react';

const QuoteViewer = () => (
  <div className="bg-white p-2 rounded shadow-sm w-full max-w-xs text-xs">
    <div className="font-medium text-gray-700 mb-1">Quote Viewer</div>
    <div className="grid grid-cols-2 gap-1 text-gray-600">
      <div>LTP: ₹1527.40</div>
      <div>Change: 0%</div>
      <div>High: ₹1529.50</div>
      <div>Low: ₹1517.25</div>
    </div>
  </div>
);

export default QuoteViewer;
