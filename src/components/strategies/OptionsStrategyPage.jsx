import React from 'react';
import StrategyForm from './components/StrategyForm';
import StrategyRunner from './components/StrategyRunner';

const OptionsStrategyPage = () => {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Options Strategy Builder</h1>
      <StrategyForm />
      <StrategyRunner />
    </div>
  );
};

export default OptionsStrategyPage;
