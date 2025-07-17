import React from "react";

export default function StrikeRow({ data, isSpotRow = false, strikeDiff = 0 }) {
  if (!data) return null;

  const { strike, callOi, callLtp, putLtp, putOi } = data;

  const format = (val) => val?.toFixed(2);

  // 🔵 Background coloring logic:
  const ceBg = isSpotRow
    ? "bg-gray-800"
    : strikeDiff < 0
    ? "bg-gray-900"
    : "bg-gray-700"; // CE darker above, lighter below

  const peBg = isSpotRow
    ? "bg-gray-800"
    : strikeDiff < 0
    ? "bg-gray-700"
    : "bg-gray-900"; // PE lighter above, darker below

  const strikeBg = isSpotRow ? "bg-gray-800" : "bg-gray-900";

  return (
    <div className="grid grid-cols-5 text-center items-center text-sm border-b border-gray-700">
      {/* CE OI with bar */}
      <div className={`flex flex-col items-center relative py-1 ${ceBg}`}>
        <span className="text-green-400">{format(callOi)}</span>
        <div
          className="h-1 bg-red-900 absolute bottom-0 left-0 rounded"
          style={{ width: `${Math.min(callOi, 100)}%` }}
        />
      </div>

      {/* CE LTP */}
      <div className={`text-red-400 py-1 ${ceBg}`}>{format(callLtp)}</div>

      {/* Strike */}
      <div className={`font-bold text-white py-1 ${strikeBg}`}>{strike}</div>

      {/* PE LTP */}
      <div className={`text-green-400 py-1 ${peBg}`}>{format(putLtp)}</div>

      {/* PE OI with bar */}
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
