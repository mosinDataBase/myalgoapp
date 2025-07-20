import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedStrategies } = location.state || { selectedStrategies: [] };

  const handleConfirm = () => {
    alert(`Order confirmed for: ${selectedStrategies.join(', ')}`);
    // Navigate or trigger execution here
    navigate('/dashboard');
  };

  const handleBack = () => {
    navigate(-1); // go back to strategy selector
  };

  if (selectedStrategies.length === 0) {
    return (
      <div className="p-4">
        <p>No strategies selected.</p>
        <button onClick={handleBack} className="mt-2 bg-gray-300 px-4 py-2 rounded">Go Back</button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow rounded-xl max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Confirm Your Strategy</h2>
      <ul className="mb-4 list-disc list-inside">
        {selectedStrategies.map((strategy) => (
          <li key={strategy} className="capitalize">{strategy.replace('_', ' ')}</li>
        ))}
      </ul>
      <div className="flex justify-between">
        <button onClick={handleBack} className="bg-gray-300 px-4 py-2 rounded">Back</button>
        <button onClick={handleConfirm} className="bg-green-600 text-white px-4 py-2 rounded">Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmOrderPage;
