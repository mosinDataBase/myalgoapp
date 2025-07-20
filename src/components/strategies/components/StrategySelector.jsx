import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChessBoard } from "react-icons/fa"; // Optional: Icon for flair

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
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm border border-gray-200">
      <div className="flex items-center mb-3">
        <FaChessBoard className="text-blue-600 mr-2" />
        <h2 className="text-md font-semibold text-gray-800">Select a Strategy</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {strategies.map((strategy) => {
          const isSelected = selectedStrategies.includes(strategy.value);
          return (
            <button
              key={strategy.value}
              onClick={() => toggleStrategy(strategy.value)}
              className={`text-sm font-medium px-3 py-2 rounded-full border transition duration-200 ease-in-out ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-700 shadow"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400"
              }`}
            >
              {strategy.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StrategySelector;
