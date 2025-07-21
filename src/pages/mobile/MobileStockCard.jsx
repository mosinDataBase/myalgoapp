import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const MobileStockCard = ({
  stock,
  removeFromWatchList,
  onAddToOrder,
  onChangeQty,
  onChangePrice,
  showToast,
}) => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(stock.ltp || 0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleQtyChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQty(value);
    onChangeQty?.(value);
  };

  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value);
    setPrice(value);
    onChangePrice?.(value);
  };

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center">
        <div onClick={toggleExpand} className="cursor-pointer">
          <p className="font-semibold text-lg">{stock.symbol}</p>
          <p className="text-sm text-gray-500">LTP: ₹{stock.ltp}</p>
        </div>
        <button
          onClick={() => {
            removeFromWatchList?.(stock.symbol);
            showToast?.(`${stock.symbol} removed from watchlist`);
          }}
          className="text-red-500 text-sm"
        >
          <MdDeleteOutline />
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-2">
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              value={qty}
              onChange={handleQtyChange}
              className="w-1/2 px-2 py-1 border rounded"
              placeholder="Qty"
            />
            <input
              type="number"
              min="0"
              value={price}
              onChange={handlePriceChange}
              className="w-1/2 px-2 py-1 border rounded"
              placeholder="Price"
            />
          </div>

          <div className="flex justify-between mt-2">
            <button
              onClick={() => onAddToOrder?.(stock.symbol, qty, price, "Buy")}
              className="w-1/2 mr-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Buy
            </button>
            <button
              onClick={() => onAddToOrder?.(stock.symbol, qty, price, "Sell")}
              className="w-1/2 ml-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Sell
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileStockCard;
