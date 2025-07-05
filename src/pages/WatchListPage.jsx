import React, { useState, useEffect, useRef } from 'react';

const allSymbols = ['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK', 'SBIN', 'AXISBANK', 'ITC', 'WIPRO'];

const WatchListPage = () => {
  const [watchList, setWatchList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSymbols, setFilteredSymbols] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim()) {
      const matches = allSymbols
        .filter((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((s) => !watchList.some((item) => item.symbol === s));
      setFilteredSymbols(matches);
    } else {
      setFilteredSymbols([]);
    }
  }, [searchTerm, watchList]);

  const handleAddToWatchList = (symbol) => {
    const newStock = {
      symbol,
      ltp: parseFloat((Math.random() * 1000 + 1000).toFixed(2)),
      change: parseFloat((Math.random() * 4 - 2).toFixed(2)),
    };
    setWatchList((prev) => [...prev, newStock]);
    setSearchTerm('');
    setFilteredSymbols([]);
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
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {filteredSymbols.length > 0 && (
          <ul className="absolute z-50 w-full bg-white border border-t-0 rounded-b shadow max-h-48 overflow-y-auto">
            {filteredSymbols.map((symbol) => (
              <li
                key={symbol}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleAddToWatchList(symbol)}
              >
                ➕ {symbol}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* WatchList Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Symbol</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">LTP (₹)</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {watchList.map((stock, index) => (
              <tr key={index} className={`border-t ${stock.change < 0 ? 'bg-red-50' : 'bg-green-50'}`}>
                <td className="px-6 py-3 font-medium text-gray-800">{stock.symbol}</td>
                <td className="px-6 py-3">{stock.ltp.toFixed(2)}</td>
                <td
                  className={`px-6 py-3 ${
                    stock.change < 0 ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {stock.change > 0 && '+'}
                  {stock.change}%
                </td>
              </tr>
            ))}
            {watchList.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-6">No stocks in watchlist.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WatchListPage;
