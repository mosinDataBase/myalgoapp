import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import useWatchList from "../hooks/useWatchList";
import MobileStockCard from "./mobile/MobileStockCard";
import { FaPlusCircle } from "react-icons/fa";

const WatchListPage = () => {
  const {
    searchRef,
    searchTerm,
    setSearchTerm,
    filteredSymbols,
    watchList,
    addToWatchList,
    removeFromWatchList,
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
        {filteredSymbols.length > 0 && (
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
                    key={s.symbol}
                    className="hover:bg-blue-50 border-t cursor-pointer"
                    onClick={() => addToWatchList(s.symbol)}
                  >
                    <td className="px-2 py-2 truncate">
                      {s.name.toUpperCase()}
                    </td>
                    <td className="px-2 py-2 text-gray-700 truncate">
                      {s.symbol.toUpperCase()}
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
                className={`border-t ${
                  stock.change < 0 ? "bg-red-50" : "bg-green-50"
                }`}
              >
                <td className="px-4 py-2 font-medium">{stock.symbol}</td>
                <td className="px-4 py-2">{stock.ltp.toFixed(2)}</td>
                <td className="px-4 py-2">{stock.change.toFixed(2)}</td>
                <td
                  className={`px-4 py-2 ${
                    stock.change < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {stock.change > 0 && "+"}
                  {stock.changePercent.toFixed(2)}%
                </td>
                <td className="px-4 py-2">{stock.ohlc.open || "-"}</td>
                <td className="px-4 py-2">{stock.ohlc.high || "-"}</td>
                <td className="px-4 py-2">{stock.ohlc.low || "-"}</td>
                <td className="px-4 py-2">{stock.ohlc.close || "-"}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => removeFromWatchList(stock.symbol)}
                    className="text-red-500 hover:text-red-700 text-xl"
                    title="Remove from Watchlist"
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
