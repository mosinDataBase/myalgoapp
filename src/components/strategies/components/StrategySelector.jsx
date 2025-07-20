import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StrategySelector = () => {
  const [selectedStrategies, setSelectedStrategies] = useState([]);
  const navigate = useNavigate();

  const strategies = [
    { name: "Straddle", value: "straddle" },
    { name: "Iron Condor", value: "iron_condor" },
    { name: "Covered Call", value: "covered_call" },
    { name: "Short Strangle", value: "short_strangle" },
  ];

  const toggleStrategy = (value) => {
    const newSelected = selectedStrategies.includes(value)
      ? selectedStrategies.filter((s) => s !== value)
      : [...selectedStrategies, value];
    setSelectedStrategies(newSelected);

    if (newSelected.length > 0) {
      navigate("/confirmOrder", { state: { selectedStrategies: newSelected } });
    }
  };

  return (
    <div className="bg-white shadow-sm rounded p-2 w-full max-w-xs">
      <div className="text-sm font-medium text-gray-700 mb-2">Strategies</div>
      <div className="grid grid-cols-2 gap-1">
        {strategies.map((strategy) => (
          <span
            key={strategy.value}
            onClick={() => toggleStrategy(strategy.value)}
            className={`text-xs px-2 py-1 rounded cursor-pointer text-center transition ${
              selectedStrategies.includes(strategy.value)
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {strategy.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StrategySelector;
