import { INDEX_OPTIONS } from "../../utils/indexOptions";

export default function OptionChainHeader({
  selectedIndex,
  expiryList,
  selectedExpiry,
  handleExpiryChange,
  onIndexChange,
}) {
  const handleSelect = (symbol) => {
    onIndexChange(symbol); // lift to parent
  };

  return (
    <div
      style={{ top: "-5px", position: "relative" }}
      className="sticky top-0 z-50 bg-gray-900"
    >
      <div className="flex items-center justify-between px-4 py-1.5 bg-gray-800 border-b border-gray-700 shadow-md">
        <div className="relative flex items-center space-x-2 text-white">
          <select
            value={selectedIndex}
            onChange={(e) => handleSelect(e.target.value)}
            className="bg-gray-700 text-blue-400 scrollbar-hide placeholder-gray-400 px-2 py-1 text-sm rounded w-24 focus:outline-none"
          >
            {INDEX_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="bg-gray-700 px-2 py-1 rounded text-white">
            LTP & OI
          </div>
          <div className="bg-gray-700 px-2 py-1 rounded text-gray-400">
            Greeks
          </div>
          <select
            value={selectedExpiry}
            onChange={(e) => handleExpiryChange(e.target.value)}
            className="bg-gray-700 px-2 py-1 rounded text-white appearance-none focus:outline-none"
          >
            {expiryList.map((expiry, index) => {
              const adjustedExpiry = (Number(expiry) + 315513000) * 1000; // convert to ms
              const date = new Date(adjustedExpiry);
              const display = date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }); // e.g., "31 Jul 2025"

              return (
                <option key={index} value={expiry}>
                  {display}
                </option>
              );
            })}
          </select>
          <div className="bg-gray-700 px-2 py-1 rounded text-white">Charts</div>
        </div>
      </div>

      <div className="w-full bg-gray-900">
        <div className="grid grid-cols-5 text-center text-gray-400 text-xs py-1 border-b border-gray-700">
          <div>OI (CE)</div>
          <div>LTP (CE)</div>
          <div>Strike</div>
          <div>LTP (PE)</div>
          <div>OI (PE)</div>
        </div>
      </div>
    </div>
  );
}
