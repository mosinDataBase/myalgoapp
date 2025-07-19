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

  useEffect(() => {
    
    if (!indicesContext || !Array.isArray(indicesContext)) return;
    setOptionData(indicesContext)
   localStorage.setItem("indicesContext", JSON.stringify(indicesContext));
    const selected = indicesContext.find(
      (item) => item.ts?.toLowerCase() === selectedIndex.toLowerCase()
    );

    if (selected) {
      const ltp = parseFloat(selected.ltp);
      const change = parseFloat(selected.cng);
      setSpotPrice(ltp);
      setSpotChange(change);
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
