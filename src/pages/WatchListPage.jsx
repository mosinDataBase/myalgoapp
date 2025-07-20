import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import useWatchList from "../hooks/useWatchList";
import MobileStockCard from "./mobile/MobileStockCard";
import { FaPlusCircle } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const WatchListPage = () => {
  const {
    searchRef,
    searchTerm,
    setSearchTerm,
    filteredSymbols,
    watchList,
    addToWatchList,
    removeFromWatchList,
    handleBuy,
    handleSell,
    openModal,
    closeModal,
    handleConfirmAction,
    priceType,
    setPriceType,
    limitPrice,
    setLimitPrice,
    selectedStock,
    actionType,
    modalOpen,
    quantity, 
    setQuantity
  } = useWatchList();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📈 Watch List</h2>

      {/* Search Input */}
      <div className="mb-6 max-w-md relative">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search symbol (e.g., TCS)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {searchTerm.length >= 3 && filteredSymbols.length > 0 && (
          <div className="absolute z-50 inset-x-0 bg-white border border-gray-300 rounded-b-lg shadow-lg max-h-64 overflow-y-auto text-sm">
            <table className="w-full table-fixed">
              <thead className="bg-gray-50 sticky top-0 text-gray-600">
                <tr>
                  <th className="px-2 py-2 w-1/3 text-left">Name</th>
                  <th className="px-2 py-2 w-1/3 text-left">Symbol</th>
                  <th className="px-2 py-2 w-1/3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSymbols.map((s) => (
                  <tr
                    key={s.pSymbol}
                    className="hover:bg-blue-50 border-t cursor-pointer"
                    onClick={() => addToWatchList(s.pSymbolName)}
                  >
                    <td className="px-2 py-2 truncate">
                      {s.pDesc.toUpperCase()}
                    </td>
                    <td className="px-2 py-2 text-gray-700 truncate">
                      {s.pSymbolName.toUpperCase()}
                    </td>
                    <td className="px-2 py-2 text-right text-blue-600 hover:text-blue-800">
                      <FaPlusCircle className="inline-block text-lg" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* WatchList Table */}
      {/* ✅ TABLE VIEW: Desktop Only */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full min-w-[900px] bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Stock Name</th>
              <th className="px-4 py-2 text-left">LTP (₹)</th>
              <th className="px-4 py-2 text-left">Change (₹)</th>
              <th className="px-4 py-2 text-left">% Change</th>
              <th className="px-4 py-2 text-left">Open</th>
              <th className="px-4 py-2 text-left">High</th>
              <th className="px-4 py-2 text-left">Low</th>
              <th className="px-4 py-2 text-left">Close</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watchList.map((stock, index) => (
              <tr
                key={index}
                className={`border-t group  ${
                  stock.change < 0 ? "bg-red-50" : "bg-green-50"
                }`}
              >
                <td className="px-4 py-2 font-medium">{stock.symbol}</td>

                <td className="px-4 py-2">
                  {isFinite(stock.ltp) ? stock.ltp.toFixed(2) : "-"}
                </td>

                <td className="px-4 py-2">
                  {isFinite(stock.change) ? stock.change.toFixed(2) : "-"}
                </td>

                <td
                  className={`px-4 py-2 ${
                    stock.change < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {stock.change > 0 ? "+" : ""}
                  {isFinite(stock.changePercent)
                    ? stock.changePercent.toFixed(2)
                    : "0.00"}
                  %
                </td>

                <td className="px-4 py-2">
                  {isFinite(stock.ohlc.open) ? stock.ohlc.open.toFixed(2) : "-"}
                </td>

                <td className="px-4 py-2">
                  {isFinite(stock.ohlc.high) ? stock.ohlc.high.toFixed(2) : "-"}
                </td>

                <td className="px-4 py-2">
                  {isFinite(stock.ohlc.low) ? stock.ohlc.low.toFixed(2) : "-"}
                </td>

                <td className="px-4 py-2">
                  {isFinite(stock.ohlc.close)
                    ? stock.ohlc.close.toFixed(2)
                    : "-"}
                </td>

                <td className="px-4 py-2">
                  <div className="flex space-x-2 items-center opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      className="px-3 py-1 rounded bg-green-100 text-green-800 hover:bg-green-600 hover:text-white transition-colors"
                      onClick={() => openModal(stock.symbol, "Buy")}
                    >
                      Buy
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-100 text-red-800 hover:bg-red-600 hover:text-white transition-colors"
                      onClick={() => openModal(stock.symbol, "Sell")}
                    >
                      Sell
                    </button>
                    <button
                      onClick={() => removeFromWatchList(stock.symbol)}
                      className="text-red-500 hover:text-red-700 text-xl"
                      title="Remove from Watchlist"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     {modalOpen && selectedStock && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
      <button
        onClick={closeModal}
        className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
      >
        <FiX size={24} />
      </button>

      <h3 className="text-xl font-semibold mb-4">
        Confirm {actionType} Order
      </h3>

      <div className="space-y-2 text-sm">
        <p>
          <strong>Symbol:</strong> {selectedStock.symbol}
        </p>
        <p>
          <strong>LTP:</strong> ₹{selectedStock.ltp?.toFixed(2) ?? "--"}
        </p>
        <p>
          <strong>Change:</strong> ₹{selectedStock.change?.toFixed(2) ?? "--"}
        </p>
        <p>
          <strong>% Change:</strong>{" "}
          {selectedStock.changePercent?.toFixed(2) ?? "--"}%
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {/* Quantity input */}
        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <input
            type="number"
            min={1}
            defaultValue={1}
            
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Price Type dropdown */}
        <div>
          <label className="block text-sm font-medium">Price Type</label>
          <select
            value={priceType}
            onChange={(e) => setPriceType(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Market">Market</option>
            <option value="Limit">Limit</option>
          </select>
        </div>

        {/* Limit Price input (only shown when type = Limit) */}
        {priceType === "Limit" && (
          <div>
            <label className="block text-sm font-medium">Limit Price</label>
            <input
              type="number"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter limit price"
            />
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 rounded text-white ${
            actionType === "Buy"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
          onClick={handleConfirmAction}
        >
          Confirm {actionType}
        </button>
      </div>
    </div>
  </div>
)}

      

      {/* ✅ CARD VIEW: Mobile Only */}

      {/* ✅ CARD VIEW: Mobile Only */}
      <div className="block md:hidden space-y-2 px-2">
        {watchList.length === 0 ? (
          <p className="text-center text-gray-500">No stocks in watchlist.</p>
        ) : (
          watchList.map((stock, index) => (
            <MobileStockCard
              key={index}
              stock={stock}
              removeFromWatchList={removeFromWatchList}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WatchListPage;
