import React from 'react';
import StrategySummary from './StrategySummary';
import LiveStatusPanel from './LiveStatusPanel';

const StrategyRunner = () => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <StrategySummary />
      <LiveStatusPanel />
    </div>
  );
};

export default StrategyRunner;
