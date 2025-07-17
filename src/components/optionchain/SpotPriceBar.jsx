import React from "react";

export default function SpotPriceBar({ spotPrice, spotChange }) {
  const price = parseFloat(spotPrice);
  const change = parseFloat(spotChange);
  const isValid = !isNaN(price) && !isNaN(change);
  const previousPrice = isValid ? price - change : 0;
  const percentChange = isValid && previousPrice !== 0
    ? ((change / previousPrice) * 100).toFixed(2)
    : "0.00";
  const isUp = isValid && change >= 0;

  return (
    <div className="relative h-6">
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="border border-cyan-500 bg-[#0e1015] text-sm px-4 py-0.5 rounded-full text-center shadow-md flex items-center space-x-2">
          <span className="text-cyan-400">Spot price {isValid ? price.toFixed(2) : "--"}</span>
          <span className={isUp ? "text-green-400" : "text-red-400"}>
            {isValid ? `${isUp ? "+" : ""}${change.toFixed(2)} (${percentChange}%)` : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}
