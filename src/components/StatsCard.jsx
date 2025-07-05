import React from 'react';

const StatsCard = ({ title, value, delta }) => (
  <div className="bg-white p-4 rounded-lg shadow flex flex-col">
    <h3 className="text-sm text-gray-500">{title}</h3>
    <div className="flex items-center gap-2 mt-2">
      <h2 className="text-2xl font-semibold">{value}</h2>
      {delta && <span className={`text-sm ${delta.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{delta}</span>}
    </div>
  </div>
);

export default StatsCard;
