export function filterSymbols({ searchTerm, allSymbols = [], watchList = [] }) {
  if (!searchTerm || searchTerm.trim().length < 3) return [];

  const term = searchTerm.toLowerCase();

  // 1️⃣ Exclude already added symbols
  let available = allSymbols.filter(
    (s) =>
      typeof s.symbol === "string" &&
      typeof s.name === "string" &&
      !watchList.some((item) => item.symbol === s.symbol)
  );

  // 2️⃣ Match name
  const nameMatches = available
    .filter((s) => s.name.toLowerCase().includes(term))
    .sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aStarts = aName.startsWith(term);
      const bStarts = bName.startsWith(term);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return aName.localeCompare(bName);
    });

  const matchedSymbols = new Set(nameMatches.map((s) => s.symbol));

  // 3️⃣ Match symbol
  const symbolMatches = available.filter(
    (s) =>
      s.symbol.toLowerCase().includes(term) && !matchedSymbols.has(s.symbol)
  );
  symbolMatches.forEach((s) => matchedSymbols.add(s.symbol));

  // 4️⃣ Smart combined fallback
  const smartMatches = available.filter((s) => {
    const combined = `${s.name}${s.symbol}`.toLowerCase();
    return combined.includes(term) && !matchedSymbols.has(s.symbol);
  });
  smartMatches.forEach((s) => matchedSymbols.add(s.symbol));

  // 5️⃣ Tokenized search
  const parts = term.match(/\w+/g) || [];
  const tokenMatches = available.filter((s) => {
    const combined =
      s.name === s.symbol
        ? s.symbol.toLowerCase()
        : `${s.name} ${s.symbol}`.toLowerCase();
    return (
      parts.every((p) => combined.includes(p)) && !matchedSymbols.has(s.symbol)
    );
  });
  tokenMatches.forEach((s) => matchedSymbols.add(s.symbol));

  // ✅ 6️⃣ FUTURE-style decoding (e.g., NIFTY25JULFUT)
  const futureMatches = available.filter((s) => {
    const raw = s.symbol.toLowerCase();
    if (!raw.endsWith("fut")) return false;

    const match = raw.match(/([a-z]+)(\d{2})([a-z]{3})fut/);
    if (!match) return false;

    const [, name, year, month] = match;
    const composed = `${name}${year}${month}`;

    return (
      (composed.includes(term) ||
        `${name} ${year}${month}`.includes(term) ||
        `${name.toUpperCase()} ${year}${month.toUpperCase()}`.includes(
          searchTerm
        )) &&
      !matchedSymbols.has(s.symbol)
    );
  });

  // 🔚 Combine all
  return [
    ...nameMatches,
    ...symbolMatches,
    ...smartMatches,
    ...tokenMatches,
    ...futureMatches,
  ];
}
