// src/components/strategies/OptionStrategyBuilder.jsx
import React, { useState } from "react";

const OptionStrategyBuilder = () => {
  const [underlying, setUnderlying] = useState("NIFTY");
  const [expiry, setExpiry] = useState("");
  const [strategyType, setStrategyType] = useState("straddle");
  const [strikeDistance, setStrikeDistance] = useState(0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Options Strategy Builder</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Underlying</label>
          <select
            className="w-full p-2 border rounded"
            value={underlying}
            onChange={(e) => setUnderlying(e.target.value)}
          >
            <option value="NIFTY">NIFTY</option>
            <option value="BANKNIFTY">BANKNIFTY</option>
            <option value="FINNIFTY">FINNIFTY</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Expiry</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Strategy Type</label>
          <select
            className="w-full p-2 border rounded"
            value={strategyType}
            onChange={(e) => setStrategyType(e.target.value)}
          >
            <option value="straddle">ATM Straddle</option>
            <option value="strangle">OTM Strangle</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {strategyType === "strangle" && (
          <div>
            <label className="block text-sm font-medium">Strike Distance (pts)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={strikeDistance}
              onChange={(e) => setStrikeDistance(e.target.value)}
            />
          </div>
        )}
      </div>

      <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
        Generate Strategy
      </button>
    </div>
  );
};

export default OptionStrategyBuilder;
