import React, { createContext, useContext, useEffect, useState } from "react";
import useMainIndex from "../hooks/useMainIndex";


const IndicesContext = createContext();

export const IndicesProvider = ({ children }) => {
  const [indicesContext, setIndicesContext] = useState([]);

  const { indices } = useMainIndex(); 

  useEffect(() => {
    if (Array.isArray(indices) && indices.length) {
      // Prevent unnecessary updates
      const prev = JSON.stringify(indicesContext);
      const next = JSON.stringify(indices);
      if (prev !== next) {
        setIndicesContext(indices);
      }
    }
  }, [indices]);

  return (
    <IndicesContext.Provider value={{ indicesContext, setIndicesContext }}>
      {children}
    </IndicesContext.Provider>
  );
};

export const useIndices = () => {
  const context = useContext(IndicesContext);
  if (!context) {
    throw new Error("useIndices must be used within an IndicesProvider");
  }

  const { indicesContext, setIndicesContext } = context;

  return {
    // Always return an array to avoid crashes
    indicesContext: Array.isArray(indicesContext) ? indicesContext : [],
    setIndicesContext,
  };
};
