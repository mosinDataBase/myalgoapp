import React, { useEffect, useRef, useState } from "react";
import StrikeRow from "./StrikeRow";
import SpotPriceBar from "./SpotPriceBar";
import BottomBar from "./BottomBar";

export default function OptionChainGrid({ data = [], selectedIndex,liveQuotes = [], spotChange, spotPrice }) {
  const spotRowRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const scrollTimeoutRef = useRef(null);
const STRIKE_STEP_MAP = {
  NIFTY: 50,
  BANKNIFTY: 100,
  FINNIFTY: 50,
  MIDCPNIFTY: 75,
  // default fallback
  DEFAULT: 50

};

const stepSize = STRIKE_STEP_MAP[selectedIndex.toUpperCase()] || STRIKE_STEP_MAP.DEFAULT;
const roundedSpot = Math.round(spotPrice / stepSize) * stepSize;

  // Auto scroll on load or re-enable
  useEffect(() => {
    if (autoScrollEnabled && spotRowRef.current) {
      spotRowRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [autoScrollEnabled, spotPrice]);

  // Disable auto scroll on user scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setAutoScrollEnabled(false);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        setAutoScrollEnabled(true);
      }, 5000); // Re-enable after 5 sec
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  if (!Array.isArray(data)) {
    return <div className="text-center text-red-500">No option data available.</div>;
  }

  return (
    <div className="w-full">
      {/* Sticky Header */}
      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-y-auto h-[calc(100vh-160px)]"
      >
        {data.map((row, index) => {
          const isSpotRow = parseFloat(row.strike) === roundedSpot;
          const strikeDiff = parseFloat(row.strike) - roundedSpot;

          return (
            <React.Fragment key={index}>
              {isSpotRow && (
                <SpotPriceBar
                  spotPrice={spotPrice}
                  spotChange={spotChange}
                />
              )}
              <div ref={isSpotRow ? spotRowRef : null}>
                <StrikeRow
                  data={row}
                  liveQuotes ={liveQuotes}
                  strikeDiff={strikeDiff}
                  isSpotRow={isSpotRow}
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom Bar */}
      <div className="sticky bottom-4 z-10 grid grid-cols-5 pointer-events-none">
        <div className="col-span-2" />
        <div className="flex justify-center pointer-events-auto">
          <BottomBar />
        </div>
        <div className="col-span-2" />
      </div>
    </div>
  );
}
