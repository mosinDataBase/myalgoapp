// src/components/NetPosition/positionUtils.js

export const formatNumber = (value, decimals = 2) => {
  const num = parseFloat(value);
  return isNaN(num) ? '-' : num.toFixed(decimals);
};

export const sortPositions = (positions) => {
  return positions.sort((a, b) => {
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
    const cfBuyQty = parseInt(pos.cfBuyQty || 0);
    const flBuyQty = parseInt(pos.flBuyQty || 0);
    const cfSellQty = parseInt(pos.cfSellQty || 0);
    const flSellQty = parseInt(pos.flSellQty || 0);

    const buyQty = cfBuyQty + flBuyQty;
    const sellQty = cfSellQty + flSellQty;
    const netQty = buyQty - sellQty;

    const cfBuyAmt = parseFloat(pos.cfBuyAmt || 0);
    const buyAmt = parseFloat(pos.buyAmt || 0);
    const cfSellAmt = parseFloat(pos.cfSellAmt || 0);
    const sellAmt = parseFloat(pos.sellAmt || 0);

    const totalBuyAmt = cfBuyAmt + buyAmt;
    const totalSellAmt = cfSellAmt + sellAmt;

    const avgBuyPrice = buyQty !== 0 ? totalBuyAmt / buyQty : 0;
    const avgSellPrice = sellQty !== 0 ? totalSellAmt / sellQty : 0;

    const isActive = netQty !== 0;
    const isBuyPosition = netQty > 0;

    const pnl = totalSellAmt - totalBuyAmt;

    return {
      ...pos,
      cfBuyQty,
      flBuyQty,
      cfSellQty,
      flSellQty,
      buyQty,
      sellQty,
      netQty,
      totalBuyAmt,
      totalSellAmt,
      avgBuyPrice,
      avgSellPrice,
      pnl,
      isActive,
      isBuyPosition,
      livePnl: null, // This will be updated live via socket
    };
  });
};
