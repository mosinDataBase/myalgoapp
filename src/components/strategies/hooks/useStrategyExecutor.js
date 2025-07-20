import { useState } from 'react';

const useStrategyExecutor = () => {
  const [status, setStatus] = useState('idle');

  const runStrategy = async (legs) => {
    setStatus('running');
    // TODO: connect to Flask backend and trigger strategy logic
    setTimeout(() => setStatus('completed'), 2000);
  };

  return { status, runStrategy };
};

export default useStrategyExecutor;
