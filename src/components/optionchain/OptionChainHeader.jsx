import React from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function OptionChainHeader() {
  return (
    <>
      {/* Sticky Top Navigation */}
      <div style={{ top: "-22px", position: "relative" }} className="sticky top-0 z-50 bg-gray-900">
        <div className="flex items-center justify-between px-4 py-1.5 bg-gray-800 border-b border-gray-700 shadow-md">
          <div className="flex items-center space-x-2 text-white">
            <FaChevronLeft />
            <h2 className="text-lg font-semibold text-blue-400">NIFTY</h2>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="bg-gray-700 px-2 py-1 rounded text-white">LTP & OI</div>
            <div className="bg-gray-700 px-2 py-1 rounded text-gray-400">Greeks</div>
            <div className="bg-gray-700 px-2 py-1 rounded text-white">17 JUL 2025</div>
            <div className="bg-gray-700 px-2 py-1 rounded text-white">Charts</div>
          </div>
        </div>

        {/* Sticky Column Headers directly below */}
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
    </>
  );
}
