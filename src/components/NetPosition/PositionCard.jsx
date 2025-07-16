// src/components/NetPosition/PositionCard.jsx

import React from 'react';
import { formatNumber } from './positionUtils';
import TypeBadge from './TypeBadge';

const PositionCard = ({ pos }) => {
  const {
    sym,
    trdSym,
    expDt,
    prod,
    buyQty,
    sellQty,
    netQty,
    avgPrice,
    ltp,
    livePnl,
    pnl,
    isBuyPosition,
    isActive,
  } = pos;

  const pnlValue = livePnl ?? pnl;
  const pnlColor = pnlValue >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div
      className={`rounded-xl border shadow-sm p-4 bg-white space-y-2 ${
        !isActive ? 'opacity-50' : ''
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="font-semibold text-gray-800">{trdSym || sym}</div>
        <TypeBadge pos={pos} />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Product: {prod}</span>
        <span>Expiry: {expDt || '--'}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mt-2">
        <div className="text-gray-600">Buy Qty: <span className="font-medium text-gray-800">{buyQty}</span></div>
        <div className="text-gray-600 text-right">Sell Qty: <span className="font-medium text-gray-800">{sellQty}</span></div>
        <div className="text-gray-600">Net Qty: <span className="font-medium text-gray-800">{netQty}</span></div>
        <div className="text-gray-600 text-right">Avg Price: ₹<span className="font-medium text-gray-800">{formatNumber(avgPrice)}</span></div>
        <div className="text-gray-600">LTP: <span className="font-medium text-gray-800">{ltp ? `₹${formatNumber(ltp)}` : '--'}</span></div>
        <div className={`text-right font-semibold ${pnlColor}`}>
          P&L: ₹{formatNumber(pnlValue)}
        </div>
      </div>

      {isActive && (
        <div className="flex justify-end gap-2 mt-3">
          <button className="bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded hover:bg-red-200">
            Square Off
          </button>
          {isBuyPosition ? (
            <button className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded hover:bg-green-200">
              Buy More
            </button>
          ) : (
            <button className="bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded hover:bg-yellow-200">
              Sell More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PositionCard;
