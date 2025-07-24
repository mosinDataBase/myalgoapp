import React, { useEffect, useRef, useState } from "react";
import OptionChainHeader from "./OptionChainHeader";
import OptionChainGrid from "./OptionChainGrid";
import useOptionChain from "../../hooks/useOptionChain";
import { useIndices } from "../../contexts/IndicesContext";

export default function OptionsChainPage() {
  const [spotPrice, setSpotPrice] = useState(0);
  const [spotChange, setSpotChange] = useState(0);
  const [optionData, setOptionData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("Nifty");
  const spotPriceRef = useRef(spotPrice);
  const lastValidIndicesRef = useRef([]);

  const {
    optionChain,
    liveQuotes,
    expiries,
    selectedExpiry,
    setSelectedExpiry,
    spotData,
    loading,
    
    fetchOptionChain,
  } = useOptionChain(selectedIndex);

  const { indicesContext } = useIndices();

  const handleIndexChange = (symbol) => {
    setSelectedIndex(symbol);
    // expiry + chain are handled via effect in hook
  };

  const handleExpiryChange = (expiry) => {
    setSelectedExpiry(expiry); // updates expiry and triggers effect inside hook
  };

// utils/generateDummyOptionChain.js
function generateOptionChainStrickessteps(centerStrike, stepSize = 50, countBefore = 50, countAfter = 50) {
  const data = [];
  const strikePriceStep = [];

  const totalStrikes = countBefore + countAfter + 1;

  for (let i = -countBefore; i <= countAfter; i++) {
    const strike = centerStrike + i * stepSize;
    const strikeStr = strike.toString();

    // Add CE and PE quotes
    strikePriceStep.push({
      strikeStr :`${strikeStr}`
    });
  }

  return  strikePriceStep;
}



  const indicesList = ["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCPNIFTY"];
   const indexSymbolMap = {
      NIFTY: "26000",
      BANKNIFTY: "26009",
      FINNIFTY: "26037",
      MIDCPNIFTY: "26074",
    };

useEffect(() => {

      
   if (!indicesContext || !Array.isArray(indicesContext)) return;
  if (indicesContext && indicesContext.length && selectedIndex) {
    const selectedKey = selectedIndex.toLowerCase();
    lastValidIndicesRef.current = indicesContext;

    const strikeData = Object.entries(indexSymbolMap)
      .filter(([key]) => key.toLowerCase() === selectedKey)
      .map(([key, symbol]) => {
        
        const index =
          indicesContext.find((item) => item.ts === key) ||
          indicesContext.find((item) => item.tk?.toString() === symbol);
          
          setSpotPrice(index?.ltp);
          // Set dummy option data here
        
          //setSpotChange(strikeData);
          //setOptionData(indicesContext);

        return {
          key,
          tk: index?.tk ?? null,
          ltp: index?.ltp ?? null,
        };
      });
      
    console.log("Filtered strikeData:", strikeData);
    console.log("spotPrice:", spotPrice);
  }
}, [indicesContext, selectedIndex]);




  return (
    <div className="flex flex-col h-full">
      {/* Sticky OptionChainHeader (second header) */}
      <div className="sticky top-0 z-20 bg-gray-900 border-b border-gray-800">
        <OptionChainHeader
          selectedIndex={selectedIndex}
          onIndexChange={handleIndexChange}
          expiryList={expiries}
          handleExpiryChange={handleExpiryChange}
        />
      </div>

      {/* Column Headers - Sticky */}

      {/* Scrollable Grid */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <OptionChainGrid
          liveQuotes={liveQuotes}
          selectedIndex={selectedIndex}
          data={optionData}
          spotPrice={spotPrice}
          spotChange={spotChange}
        />
      </div>
    </div>
  );
}
