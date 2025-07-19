import React, { createContext, useContext, useState, useEffect } from "react";

const IndicesContext = createContext();

export const IndicesProvider = ({ children }) => {
  const [indicesContext, setIndicesContext] = useState([]);

 
  return (
    <IndicesContext.Provider value={{ indicesContext, setIndicesContext}}>
      {children}
    </IndicesContext.Provider>
  );
};

export const useIndices = () => useContext(IndicesContext);
