// src/components/NetPosition/PositionCard.jsx
import React from 'react';
import { formatNumber } from './positionUtils';
import TypeBadge from './TypeBadge';

const PositionCard = ({ pos }) => {
  const renderActionButtons = () => {
    if (!pos.isActive) return null;

    return (
      <div className="mt-3 flex gap-2">
        <button className="flex-1 bg-red-100 text-red-700 font-medium text-sm px-3 py-1.5 rounded hover:bg-red-200">
          Square Off
        </button>
        {pos.isBuyPosition ? (
          <button className="flex-1 bg-green-100 text-green-700 font-medium text-sm px-3 py-1.5 rounded hover:bg-green-200">
            Buy More
          </button>
        ) : (
          <button className="flex-1 bg-yellow-100 text-yellow-700 font-medium text-sm px-3 py-1.5 rounded hover:bg-yellow-200">
            Sell More
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      className={`bg-white shadow rounded-lg border border-gray-200 px-4 py-3 ${
        !pos.isActive ? 'opacity-50' : ''
      }`}
    >
      <div className="flex justify-between items-center mb-1">
        <div className="font-semibold text-base text-gray-800">{pos.trdSym}</div>
        <TypeBadge pos={pos} />
      </div>
      <div className="text-xs text-gray-500 mb-2">
        {pos.sym} • {pos.prod} • Exp: {pos.expDt || '--'}
      </div>

      <div className="text-sm flex justify-between">
        <span>Buy Qty:</span>
        <span className="font-medium">{pos.buyQty}</span>
      </div>
      <div className="text-sm flex justify-between">
        <span>Sell Qty:</span>
        <span className="font-medium">{pos.sellQty}</span>
      </div>
      <div className="text-sm flex justify-between">
        <span>Net Qty:</span>
        <span className="font-medium">{pos.netQty}</span>
      </div>
      <div className="text-sm flex justify-between">
        <span>Avg. Price:</span>
        <span className="font-medium">₹{formatNumber(pos.avgPrice)}</span>
      </div>

      <div className="text-sm flex justify-between">
        <span>LTP:</span>
        <span className="font-medium">
          {pos.ltp ? `₹${formatNumber(pos.ltp)}` : '--'}
        </span>
      </div>

      <div className="text-sm flex justify-between mt-2">
        <span>PnL:</span>
        <span
          className={`font-semibold ${
            pos.pnl >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          ₹{formatNumber(pos.pnl)}
        </span>
      </div>

      {/* 🔘 Action Buttons */}
      {renderActionButtons()}
    </div>
  );
};

export default PositionCard;
