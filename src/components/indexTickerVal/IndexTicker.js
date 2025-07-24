import React, { useMemo, useRef } from "react";

const indicesList = ["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCPNIFTY"];

const IndexTicker = React.memo(({ symbol, index }) => {
  const isPositive = parseFloat(index?.nc || 0) > 0;
  const changePercent = parseFloat(index?.nc || 0).toFixed(2);
  const lastTradedPrice = parseFloat(index?.ltp || 0).toFixed(2);
  const priceChange = parseFloat(index?.cng || 0).toFixed(2);

  return (
    <div className="flex flex-col min-w-[100px] text-xs font-medium">
      <span className="text-gray-800 uppercase font-semibold text-sm">
        {symbol}
      </span>
      <span className="text-[13px]">
        {index ? lastTradedPrice : "--"}
      </span>
      <span
        className={`text-[11px] ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {index
          ? `${isPositive ? "+" : ""}${priceChange} (${changePercent}%)`
          : "0.00%"}
      </span>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.index?.ltp === nextProps.index?.ltp &&
    prevProps.index?.nc === nextProps.index?.nc &&
    prevProps.index?.cng === nextProps.index?.cng
  );
});

export default function IndexTickerList({ indicesContext, indexSymbolMap }) {
  const previousDataRef = useRef({});

  const memoizedData = useMemo(() => {
    const updatedData = indicesList.map((symbol) => {
      const index =
        indicesContext?.find((item) => item.ts === symbol) ||
        indicesContext?.find(
          (item) => item.tk?.toString() === indexSymbolMap[symbol]
        );

        
        
      // If index exists, update the cache
      if (index) {
        previousDataRef.current[symbol] = index;
        localStorage.setItem(symbol.toLocaleUpperCase(),index?.ltp)
      }

      return {
        symbol,
        index: previousDataRef.current[symbol] || null,
      };
    });

    return updatedData;
  }, [indicesContext]);

  return (
    <div className="flex items-center gap-4 overflow-x-auto max-w-full scrollbar-hide pl-2">
      {memoizedData.map(({ symbol, index }) => (
        <IndexTicker key={symbol} symbol={symbol} index={index} />
      ))}
    </div>
  );
}



