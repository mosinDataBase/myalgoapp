import React, { createContext, useContext, useState } from "react";

// Create a context
const MasterDataContext = createContext();

// Create a provider component
export const MasterDataProvider = ({ children }) => {
  const [nseSymbols, setNseSymbols] = useState([]);

  return (
    <MasterDataContext.Provider value={{ nseSymbols, setNseSymbols }}>
      {children}
    </MasterDataContext.Provider>
  );
};

// Create a custom hook to use the context
export const useMasterData = () => useContext(MasterDataContext);
