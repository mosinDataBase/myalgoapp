import React, { useState, useEffect, useRef } from "react";
import URLS from "../config/apiUrls";
import axios from "axios";
import { showConfirmDialog, showToast } from "../utils/alerts";
import { MdDeleteOutline } from "react-icons/md";
import { filterSymbols } from "../utils/searchUtils";
import useDebounce from "../utils/useDebounce";

const WatchListPage = () => {
  const [watchList, setWatchList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSymbols, setFilteredSymbols] = useState([]);
  const searchRef = useRef(null);
  const mobileNumber = localStorage.getItem("mobileNumber");
  const [allSymbols, setAllSymbols] = useState([]);
  const debouncedTerm = useDebounce(searchTerm, 200);

  const fetchSymbolList = async () => {
    try {
      const res = await axios.get(URLS.symbols); // Use this new endpoint
      return res.data.symbols || [];
    } catch (err) {
      console.error("Failed to fetch symbol list", err);
      return [];
    }
  };

  useEffect(() => {
    const getSymbols = async () => {
      const symbols = await fetchSymbolList();
      setAllSymbols(symbols);
    };
    getSymbols();
  }, []);

  const fetchSymbolData = async (inputSymbol) => {
    try {
      const res = await axios.post(URLS.quotes, {
        mobileNumber,
        symbol: inputSymbol,
      });

      const responseData = res.data?.data?.data;

      // If response is a list with one object, return it as quote
      if (responseData?.[0]?.trading_symbol) {
        return responseData[0]; // full quote
      }

      // Otherwise treat it as list of matching names
      return { symbols: responseData || [] };
    } catch (err) {
      showToast({
        type: "error",
        title: "Error",
        text:
          err.response?.data?.message || "Server error while fetching symbols.",
      });
      return null;
    } finally {
    }
  };

  useEffect(() => {
    const results = filterSymbols({
      searchTerm: debouncedTerm,
      allSymbols,
      watchList,
    });
    setFilteredSymbols(results);
  }, [debouncedTerm, allSymbols, watchList]);

  const handleAddSymbolClick = async (symbol) => {
    debugger;
    await handleAddToWatchList(symbol); // ✅ Proper async await
  };

  const handleAddToWatchList = async (symbol) => {
    try {
      debugger;
      const data = await fetchSymbolData(symbol);
      if (!data) return;
      const newStock = {
        symbol: data.trading_symbol,
        ltp: parseFloat(data.last_traded_price || 0),
        change: parseFloat(data.change || 0),
        changePercent: parseFloat(data.net_change_percentage || 0),
        ohlc: data.ohlc || {},
        segment: data.exchange_segment || "",
        token: data.instrument_token || "",
      };

      // ✅ Use functional update
      setWatchList((prevList) => {
        debugger;
        const alreadyExists = prevList.some(
          (item) => item.symbol === newStock.symbol
        );
        if (!alreadyExists) {
          console.log("✅ Adding to watchList:", newStock);
          return [...prevList, newStock];
        }
        return prevList;
      });

      setSearchTerm("");
      setFilteredSymbols([]);
    } catch (err) {
      console.error("❌ Error adding to watchlist:", err);
    }
  };

  const handleRemoveFromWatchList = async (symbol) => {
    const confirmed = await showConfirmDialog({
      title: "Remove Stock?",
      text: `Are you sure you want to remove ${symbol} from your watchlist?`,
      confirmButtonText: "Yes, remove it",
    });

    if (confirmed) {
      setWatchList((prev) => prev.filter((item) => item.symbol !== symbol));
      showToast({
        type: "success",
        title: "Removed!",
        text: `${symbol} removed from your watchlist.`,
      });
    }
  };

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
                    onClick={() => handleAddSymbolClick(s.symbol)}
                  >
                    <td className="px-4 py-2">{s.name}</td>
                    <td className="px-4 py-2 text-gray-700">{s.symbol}</td>
                    <td className="px-4 py-2 text-right text-blue-500 font-semibold">
                      ➕ Add
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
                    onClick={() => handleRemoveFromWatchList(stock.symbol)}
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
                <td colSpan="8" className="text-center text-gray-500 py-6">
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
