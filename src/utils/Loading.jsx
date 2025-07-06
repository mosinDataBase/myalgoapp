import React from 'react';

const Loading = ({ text = 'Loading...' }) => {
  return (
    <div className="flex justify-center items-center h-full w-full p-4">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </div>
  );
};

export default Loading;
