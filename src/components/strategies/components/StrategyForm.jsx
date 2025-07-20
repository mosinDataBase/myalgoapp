import React, { useState } from 'react';
import StrategyLegInput from './StrategyLegInput';

const StrategyForm = () => {
  const [legs, setLegs] = useState([{ strike: '', type: 'CE', action: 'SELL' }]);

  const addLeg = () => setLegs([...legs, { strike: '', type: 'CE', action: 'SELL' }]);

  return (
    <div className="bg-white p-4 shadow rounded mb-4">
      <h2 className="text-lg font-medium mb-2">Strategy Legs</h2>
      {legs.map((leg, index) => (
        <StrategyLegInput key={index} index={index} leg={leg} />
      ))}
      <button onClick={addLeg} className="mt-2 px-4 py-1 bg-blue-600 text-white rounded">
        Add Leg
      </button>
    </div>
  );
};

export default StrategyForm;
