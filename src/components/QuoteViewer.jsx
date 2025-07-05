import React from 'react';

const QuoteViewer = () => (
  <div className="bg-white p-4 rounded-lg shadow col-span-2">
    <h3 className="text-lg font-semibold mb-2">Quote Viewer</h3>
    <div className="grid grid-cols-2 gap-2">
      <div>LTP: ₹1527.40</div>
      <div>Change: 0%</div>
      <div>High: ₹1529.50</div>
      <div>Low: ₹1517.25</div>
    </div>
  </div>
);

export default QuoteViewer;
