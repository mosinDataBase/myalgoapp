import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to AlgoFox</h1>
        <p className="text-lg mb-6">An advanced algorithmic trading dashboard</p>
        <button
          onClick={handleGoToDashboard}
          className="bg-white text-purple-700 px-6 py-2 rounded shadow hover:bg-gray-200 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default HomePage;
