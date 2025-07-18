import React, { useState, useEffect } from "react";
import axios from "axios";
import URLS from "../../config/apiUrls";
import { INDEX_OPTIONS } from "../../utils/indexOptions";
import useOptionChain from "../../hooks/useOptionChain";

export default function OptionChainHeader() {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("Nifty 50");

  const { optionChain, spotData, loading, fetchOptionChain } = useOptionChain(selectedIndex);
  const mobileNumber = localStorage.getItem("mobileNumber");

  const handleSelect = (symbol) => {
    setQuery(symbol);
    setSelectedIndex(symbol);
    fetchOptionChain(symbol); // 🔁 trigger fetching new option chain
  };

  return (
    <div style={{ top: "-22px", position: "relative" }} className="sticky top-0 z-50 bg-gray-900">
      <div className="flex items-center justify-between px-4 py-1.5 bg-gray-800 border-b border-gray-700 shadow-md">
        <div className="relative flex items-center space-x-2 text-white">
          <select
            value={selectedIndex}
            onChange={(e) => handleSelect(e.target.value)}
            className="bg-gray-700 text-blue-400 scrollbar-hide placeholder-gray-400 px-2 py-1 text-sm rounded w-24 focus:outline-none"
          >
            {INDEX_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="bg-gray-700 px-2 py-1 rounded text-white">LTP & OI</div>
          <div className="bg-gray-700 px-2 py-1 rounded text-gray-400">Greeks</div>
          <select className="bg-gray-700 px-2 py-1 rounded text-white appearance-none focus:outline-none" defaultValue="2025-07-17">
            <option value="2025-07-17">17 JUL 2025</option>
            <option value="2025-07-24">24 JUL 2025</option>
            <option value="2025-07-31">31 JUL 2025</option>
          </select>
          <div className="bg-gray-700 px-2 py-1 rounded text-white">Charts</div>
        </div>
      </div>

      <div className="w-full bg-gray-900">
        <div className="grid grid-cols-5 text-center text-gray-400 text-xs py-1 border-b border-gray-700">
          <div>OI (CE)</div>
          <div>LTP (CE)</div>
          <div>Strike</div>
          <div>LTP (PE)</div>
          <div>OI (PE)</div>
        </div>
      </div>
    </div>
  );
}
