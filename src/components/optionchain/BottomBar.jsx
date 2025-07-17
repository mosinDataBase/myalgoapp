import React from "react";
import { FaPlus, FaLightbulb } from "react-icons/fa";

export default function BottomBar() {
  return (
    <div
      className="
        w-full
        flex justify-center gap-4
        px-4
        py-3
        fixed left-0 z-50
        bottom-4 md:bottom-12
      "
    >
      <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-500 whitespace-nowrap">
        <FaPlus /> Basket/Watchlist
      </button>
      <button className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-cyan-500 whitespace-nowrap">
        <FaLightbulb /> Create strategy
      </button>
    </div>
  );
}
