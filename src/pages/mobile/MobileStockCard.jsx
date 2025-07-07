// src/components/MobileStockCard.jsx
import React, { useState, useEffect, useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const MobileStockCard = ({ stock, removeFromWatchList }) => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  const handleCardClick = (e) => {
    if (e.target.closest("button[data-action='delete']")) return;
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className={`rounded-lg shadow p-4 border cursor-pointer transition ${
        stock.change < 0 ? "bg-red-50" : "bg-green-50"
      }`}
    >
      {/* Header Row */}
      <div className="flex justify-between items-center mb-2 border-b pb-2">
        <div>
          <h3 className="text-lg font-semibold">{stock.symbol}</h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-800 font-semibold">
            ₹{stock.ltp.toFixed(2)}
          </div>

          <div className="text-gray-600 text-lg">
            {expanded ? <FaChevronUp /> : <FaChevronDown />}
          </div>

          <button
            data-action="delete"
            onClick={() => removeFromWatchList(stock.symbol)}
            className="text-red-500 hover:text-red-700 text-xl"
            title="Remove"
          >
            <MdDeleteOutline />
          </button>
        </div>
      </div>

      {/* Table-Like Expanded Details */}
      {expanded && (
        <div className="mt-3 text-sm text-gray-800">
          <div className="grid grid-cols-2 py-1 border-b">
            <div className="font-medium">Change</div>
            <div
              className={`text-right ${
                stock.change < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {stock.change > 0 && "+"}
              {stock.change.toFixed(2)}
            </div>
          </div>

          <div className="grid grid-cols-2 py-1 border-b">
            <div className="font-medium">% Change</div>
            <div
              className={`text-right ${
                stock.change < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {stock.change > 0 && "+"}
              {stock.changePercent.toFixed(2)}%
            </div>
          </div>

          <div className="grid grid-cols-2 py-1 border-b">
            <div className="font-medium">Open</div>
            <div className="text-right">{stock.ohlc.open || "-"}</div>
          </div>

          <div className="grid grid-cols-2 py-1 border-b">
            <div className="font-medium">High</div>
            <div className="text-right">{stock.ohlc.high || "-"}</div>
          </div>

          <div className="grid grid-cols-2 py-1 border-b">
            <div className="font-medium">Low</div>
            <div className="text-right">{stock.ohlc.low || "-"}</div>
          </div>

          <div className="grid grid-cols-2 py-1">
            <div className="font-medium">Close</div>
            <div className="text-right">{stock.ohlc.close || "-"}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileStockCard;
