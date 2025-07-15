// src/components/NetPosition/positionUtils.js

export const formatNumber = (value, decimals = 2) => {
  const num = parseFloat(value);
  return isNaN(num) ? '-' : num.toFixed(decimals);
};

export const sortPositions = (positions) => {
  return positions.sort((a, b) => {
    // Active first, then by symbol ASC
    if (a.isActive && !b.isActive) return -1;
    if (!a.isActive && b.isActive) return 1;
    return a.sym.localeCompare(b.sym);
  });
};

/**
 * Enrich raw API position data with derived fields
 */
export const enrichPositions = (rawPositions) => {
  return rawPositions.map((pos) => {
    const buyAmt = parseFloat(pos.buyAmt || 0);
    const sellAmt = parseFloat(pos.sellAmt || 0);
    const buyQty = parseInt(pos.flBuyQty || 0);
    const sellQty = parseInt(pos.flSellQty || 0);
    const netQty = buyQty - sellQty;

    return {
      ...pos,
      buyQty,
      sellQty,
      netQty,
      avgPrice: buyAmt / (buyQty || 1),
      pnl: sellAmt - buyAmt,
      isActive: netQty !== 0,
      isBuyPosition: netQty > 0,
    };
  });
};
