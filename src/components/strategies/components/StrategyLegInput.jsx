import React from 'react';

const StrategyLegInput = ({ index, leg }) => {
  return (
    <div className="flex gap-2 mb-2">
      <input
        type="number"
        placeholder="Strike"
        className="border rounded p-1 w-24"
        defaultValue={leg.strike}
      />
      <select className="border rounded p-1">
        <option value="CE">CE</option>
        <option value="PE">PE</option>
      </select>
      <select className="border rounded p-1">
        <option value="BUY">BUY</option>
        <option value="SELL">SELL</option>
      </select>
    </div>
  );
};

export default StrategyLegInput;
