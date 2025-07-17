import React, { useEffect, useRef, useState } from "react";
import OptionChainHeader from "./OptionChainHeader";
import OptionChainGrid from "./OptionChainGrid";
import BottomBar from "./BottomBar";

export default function OptionsChainPage() {
  const [spotPrice, setSpotPrice] = useState(25300);
  const [spotChange, setSpotChange] = useState(0);
  const [optionData, setOptionData] = useState([]);

  const spotPriceRef = useRef(spotPrice);


  const generateDummyData = (base) =>
    Array.from({ length: 30 }, (_, i) => ({
      strike: 24500 + i * 50,
      callOi: 10000 + i * 500,
      callLtp: (120 + i) + (Math.random() * 10 - 5),
      putOi: 9000 + i * 400,
      putLtp: (100 - i) + (Math.random() * 10 - 5),
    }));

  useEffect(() => {
  const interval = setInterval(() => {
    const change = Math.floor(Math.random() * 20 - 10); // ±10
    const newPrice = spotPriceRef.current + change;

    spotPriceRef.current = newPrice;
    setSpotPrice(newPrice);
    setSpotChange(change);
    setOptionData(generateDummyData(newPrice));
  }, 2000);

  return () => clearInterval(interval);
}, []);

return (
  <div className="flex flex-col h-full">
    {/* Sticky OptionChainHeader (second header) */}
    <div className="sticky top-0 z-20 bg-gray-900 border-b border-gray-800">
      <OptionChainHeader />
    </div>

     {/* Column Headers - Sticky */}
      

    {/* Scrollable Grid */}
    <div className="flex-1 overflow-y-auto scrollbar-hide">
      <OptionChainGrid
        data={optionData}
        spotPrice={spotPrice}
        spotChange={spotChange}
      />
    </div>
  </div>
);

}
