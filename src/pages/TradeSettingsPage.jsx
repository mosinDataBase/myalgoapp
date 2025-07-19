// src/pages/TradeSettingsPage.jsx
import React, { useState } from 'react';

const TradeSettingsPage = () => {
  const [settings, setSettings] = useState({
    maxTradeValue: 100000,
    riskPercentage: 2,
    autoSquareOff: true,
    notifyOnExecution: true,
    slippageTolerance: 0.5,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send settings to backend API here
 
    alert('Trade settings updated successfully.');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Trade Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700">Max Trade Value (₹)</label>
          <input
            type="number"
            name="maxTradeValue"
            value={settings.maxTradeValue}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Risk % Per Trade</label>
          <input
            type="number"
            name="riskPercentage"
            value={settings.riskPercentage}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="100"
            className="w-full mt-1 px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Slippage Tolerance (%)</label>
          <input
            type="number"
            name="slippageTolerance"
            value={settings.slippageTolerance}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            className="w-full mt-1 px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="autoSquareOff"
            checked={settings.autoSquareOff}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600"
          />
          <label className="text-gray-700">Enable Auto Square-Off</label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="notifyOnExecution"
            checked={settings.notifyOnExecution}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600"
          />
          <label className="text-gray-700">Notify on Order Execution</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default TradeSettingsPage;
