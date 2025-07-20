export async function filterSymbols({ searchTerm, allSymbols = [], watchList = [] }) {
  if (!searchTerm || searchTerm.trim().length < 3) return [];

  const term = searchTerm.toLowerCase();
  const seen = new Set(watchList.map((item) => item.symbol));
  const matchedSymbols = new Set();
  const results = [];

  const addMatch = (s) => {
    const name = (s.pSymbolName || "").toLowerCase();
    const group = s.pGroup;

    if (
      name.includes(term) &&
      group === "EQ" &&
      !seen.has(s.pSymbolName) &&
      !matchedSymbols.has(s.pSymbolName)
    ) {
      results.push({
        symbol: s.pSymbolName,
        token: s.pSymbol,
        segment: s.pExchSeg,
        name: s.pDesc || s.pSymbolName,
      });
      matchedSymbols.add(s.pSymbolName);
    }
  };

  for (const symbol of allSymbols) {
    if (results.length >= 50) break;
    addMatch(symbol);
  }

  return results;
}
