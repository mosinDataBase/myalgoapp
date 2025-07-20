import React, { useState, useEffect, useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const MobileStockCard = ({
  stock,
  removeFromWatchList,
  onAddToOrder,
  onConfirm,
  onChangeQty,
  onChangePrice,
  showToast,
}) => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(stock.ltp);

  const handleCardClick = (e) => {
    if (e.target.closest("button[data-action='delete']")) return;
    setExpanded((prev) => !prev);
  };

  const handleQtyChange = (e) => {
    const value = parseInt(e.target.value);
    setQty(value);
    onChangeQty?.(stock.symbol, value);
  };

  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value);
    setPrice(value);
    onChangePrice?.(stock.symbol, value);
  };

  const handleAdd = () => {
    onAddToOrder?.(stock.symbol, qty, price);
    showToast?.(`${stock.symbol} added to order.`);
  };

  const handleConfirm = () => {
    onConfirm?.(stock.symbol, qty, price);
    showToast?.(`${stock.symbol} confirmed.`);
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

      {/* Expanded Section */}
      {expanded && (
        <div className="mt-3 text-sm text-gray-800 space-y-2">
          {/* Details */}
          <div className="grid grid-cols-2 gap-2">
            <div>Change</div>
            <div
              className={`text-right ${
                stock.change < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {stock.change > 0 && "+"}
              {stock.change.toFixed(2)}
            </div>

            <div>% Change</div>
            <div
              className={`text-right ${
                stock.change < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {stock.change > 0 && "+"}
              {stock.changePercent.toFixed(2)}%
            </div>

            <div>Open</div>
            <div className="text-right">{stock.ohlc.open || "-"}</div>

            <div>High</div>
            <div className="text-right">{stock.ohlc.high || "-"}</div>

            <div>Low</div>
            <div className="text-right">{stock.ohlc.low || "-"}</div>

            <div>Close</div>
            <div className="text-right">{stock.ohlc.close || "-"}</div>
          </div>

          {/* Order Controls */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <input
              type="number"
              className="border rounded p-1"
              value={qty}
              min={1}
              onChange={handleQtyChange}
              placeholder="Qty"
            />
            <input
              type="number"
              className="border rounded p-1"
              value={price}
              onChange={handlePriceChange}
              placeholder="Price"
            />
          </div>

          <div className="flex justify-between mt-2">
            <button
              onClick={handleAdd}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
            <button
              onClick={handleConfirm}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileStockCard;
