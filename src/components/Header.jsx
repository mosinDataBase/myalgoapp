// src/components/Header.jsx
import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

const Header = () => {
  const [tradingStarted, setTradingStarted] = useState(true);
  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-3">
      <div className="flex items-center gap-2">
        <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded">Semi</button>
        <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded">Auto</button>
        <button className="bg-indigo-600 text-white px-4 py-1 rounded">Forward Testing</button>
      </div>
      <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700 dark:text-gray-300">
                    Trading is Started
                  </span>
                  <Switch
                    checked={tradingStarted}
                    onChange={setTradingStarted}
                    className={`${tradingStarted ? 'bg-green-500' : 'bg-gray-400'}
                      relative inline-flex h-6 w-11 items-center rounded-full transition`}
                  >
                    <span
                      className={`${
                        tradingStarted ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
            <span role="img" aria-label="User">👤</span>
          </div>
          <span className="text-gray-700 text-sm">User</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
