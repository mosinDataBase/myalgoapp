// src/components/NetPosition/PositionTable.jsx

import React from "react";
import { formatNumber } from "./positionUtils";
import TypeBadge from "./TypeBadge";

const PositionTable = ({ positions }) => (
  <div className="hidden sm:block overflow-x-auto shadow border rounded-lg">
    <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-100 text-gray-600">
        <tr>
          <th className="px-4 py-3 text-left">S.No</th>
          <th className="px-4 py-3 text-left">Symbol</th>
          <th className="px-4 py-3 text-left">Product</th>
          <th className="px-4 py-3 text-left">Expiry</th>
          <th className="px-4 py-3 text-right">Buy Qty</th>
          <th className="px-4 py-3 text-right">Sell Qty</th>
          <th className="px-4 py-3 text-right">Net Qty</th>
          <th className="px-4 py-3 text-right">Avg. Price</th>
          <th className="px-4 py-3 text-right">LTP</th>
          <th className="px-4 py-3 text-right">PnL (₹)</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {positions.map((pos, index) => (
          <tr
            key={index}
            className={`group hover:bg-gray-50 transition ${
              !pos.isActive ? "opacity-50" : ""
            }`}
          >
            <td className="px-4 py-3 align-top">{index + 1}</td>
            <td className="px-4 py-3 flex items-center gap-2 align-top">
              {pos.sym} <TypeBadge pos={pos} />
            </td>
            <td className="px-4 py-3 align-top">{pos.prod}</td>
            <td className="px-4 py-3 align-top">{pos.expDt || "--"}</td>
            <td className="px-4 py-3 text-right align-top">{pos.buyQty}</td>
            <td className="px-4 py-3 text-right align-top">{pos.sellQty}</td>
            <td className="px-4 py-3 text-right align-top">{pos.netQty}</td>
            <td className="px-4 py-3 text-right align-top">
              ₹{formatNumber(pos.avgPrice)}
            </td>
            <td className="px-4 py-3 text-right align-top">
              {Number.isFinite(pos.ltp) ? `₹${formatNumber(pos.ltp)}` : "--"}
            </td>
            <td className="px-4 py-3 text-right font-medium align-top">
              <div
                className={`${
                  (pos.livePnl ?? pos.pnl) >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ₹{formatNumber(pos.livePnl ?? pos.pnl)}
              </div>

              {/* 🔘 Hover Buttons */}
              {pos.isActive && (
                <div className="hidden group-hover:flex justify-end gap-2 mt-1">
                  <button className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded hover:bg-red-200">
                    Square Off
                  </button>
                  {pos.isBuyPosition ? (
                    <button className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded hover:bg-green-200">
                      Buy More
                    </button>
                  ) : (
                    <button className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-1 rounded hover:bg-yellow-200">
                      Sell More
                    </button>
                  )}
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PositionTable;
