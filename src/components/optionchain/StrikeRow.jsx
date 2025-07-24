

export default function StrikeRow({ data, liveQuotes, isSpotRow = false, strikeDiff = 0 }) {

  console.log("data ins strike row:",data)

  // Now use `stikedata` in place of `indicesContext`

  if (!data) return null;

  const { strike } = data;

  const extractStrike = (ts) => {
    const match = ts?.match(/(\d+)(CE|PE)$/);
    return match ? parseFloat(match[1]) : null;
  };

  const strik = parseFloat(strike);
  if (isNaN(strike)) return null;

  const ceQuote = liveQuotes?.find(
    (q) => extractStrike(q.ts) === strike && q.ts.endsWith("CE")
  );
  const peQuote = liveQuotes?.find(
    (q) => extractStrike(q.ts) === strike && q.ts.endsWith("PE")
  );

  const getVal = (obj, shortKey, longKey, fallback = 0) =>
    parseFloat(obj?.[shortKey] ?? obj?.[longKey] ?? fallback) || 0;

  const callOi = getVal(ceQuote, "oi", "open_interest");
  const callLtp = getVal(ceQuote, "ltp", "last_traded_price");
  const putLtp = getVal(peQuote, "ltp", "last_traded_price");
  const putOi = getVal(peQuote, "oi", "open_interest");

  const format = (val) => (val !== undefined && !isNaN(val) ? val.toFixed(2) : "--");

  const ceBg = isSpotRow
    ? "bg-gray-800"
    : strikeDiff < 0
    ? "bg-gray-900"
    : "bg-gray-700";

  const peBg = isSpotRow
    ? "bg-gray-800"
    : strikeDiff < 0
    ? "bg-gray-700"
    : "bg-gray-900";

  const strikeBg = isSpotRow ? "bg-gray-800" : "bg-gray-900";

  return (
    <div className="grid grid-cols-5 text-center items-center text-sm border-b border-gray-700">
      <div className={`flex flex-col items-center relative py-1 ${ceBg}`}>
        <span className="text-green-400">{format(callOi)}</span>
        <div
          className="h-1 bg-red-900 absolute bottom-0 left-0 rounded"
          style={{ width: `${Math.min(callOi, 100)}%` }}
        />
      </div>

      <div className={`text-red-400 py-1 ${ceBg}`}>{format(callLtp)}</div>

      <div className={`font-bold text-white py-1 ${strikeBg}`}>{strike}</div>

      <div className={`text-green-400 py-1 ${peBg}`}>{format(putLtp)}</div>

      <div className={`flex flex-col items-center relative py-1 ${peBg}`}>
        <span className="text-red-400">{format(putOi)}</span>
        <div
          className="h-1 bg-green-700 absolute bottom-0 left-0 rounded"
          style={{ width: `${Math.min(putOi, 100)}%` }}
        />
      </div>
    </div>
  );
}
