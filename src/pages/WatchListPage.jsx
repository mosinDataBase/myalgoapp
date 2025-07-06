import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import useWatchList from "../hooks/useWatchList";

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
          <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-b-lg shadow-lg max-h-64 overflow-y-auto">
            <table className="w-full text-sm table-auto">
              <thead className="bg-gray-50 sticky top-0 text-left text-gray-600 font-medium">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Symbol</th>
                  <th className="px-4 py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSymbols.map((s) => (
                  <tr
                    key={s.symbol}
                    className="hover:bg-blue-50 border-t cursor-pointer"
                    onClick={() => addToWatchList(s.symbol)}
                  >
                    <td className="px-4 py-2">{s.name}</td>
                    <td className="px-4 py-2 text-gray-700">{s.symbol}</td>
                    <td className="px-4 py-2 text-right text-blue-500 font-semibold">
                      Add ➕
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* WatchList Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
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
            {watchList.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-6">
                  No stocks in watchlist.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WatchListPage;
