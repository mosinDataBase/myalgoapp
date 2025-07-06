// src/utils/searchUtils.jsx

export async function filterSymbols({ searchTerm, watchList = [] }) {
  if (!searchTerm || searchTerm.trim().length < 3) return [];

  const term = searchTerm.toLowerCase();

  const db = await import("./allSymbolDB.jsx").then((m) => m.initSymbolDB());
  const store = db.transaction("symbols", "readonly").store;

  const seen = new Set(watchList.map((item) => item.symbol));
  const matchedSymbols = new Set();
  const results = [];

  // 1️⃣ Prefix match on symbol
  const symbolIndex = store.index("symbol");
  let cursor = await symbolIndex.openCursor(
    IDBKeyRange.bound(term, term + "\uffff")
  );
  while (cursor) {
    const s = cursor.value;
    if (!seen.has(s.symbol) && !matchedSymbols.has(s.symbol)) {
      results.push(s);
      matchedSymbols.add(s.symbol);
    }
    cursor = await cursor.continue();
  }

  // 2️⃣ Prefix match on name
  const nameIndex = store.index("name");
  cursor = await nameIndex.openCursor(IDBKeyRange.bound(term, term + "\uffff"));
  while (cursor) {
    const s = cursor.value;
    if (!seen.has(s.symbol) && !matchedSymbols.has(s.symbol)) {
      results.push(s);
      matchedSymbols.add(s.symbol);
    }
    cursor = await cursor.continue();
  }

  // 3️⃣ Smart fallback
  cursor = await store.openCursor();
  while (cursor) {
    const s = cursor.value;
    const combined = `${s.name}${s.symbol}`.toLowerCase();
    if (
      combined.includes(term) &&
      !seen.has(s.symbol) &&
      !matchedSymbols.has(s.symbol)
    ) {
      results.push(s);
      matchedSymbols.add(s.symbol);
    }
    cursor = await cursor.continue();
  }

  // 4️⃣ FUTURE-style decoding (e.g., NIFTY25JULFUT)
  cursor = await store.openCursor();
  while (cursor) {
    const s = cursor.value;
    const raw = s.symbol.toLowerCase();
    if (!raw.endsWith("fut")) {
      cursor = await cursor.continue();
      continue;
    }

    const match = raw.match(/([a-z]+)(\d{2})([a-z]{3})fut/);
    if (!match) {
      cursor = await cursor.continue();
      continue;
    }

    const [, name, year, month] = match;
    const composed = `${name}${year}${month}`;

    if (
      (composed.includes(term) ||
        `${name} ${year}${month}`.includes(term) ||
        `${name.toUpperCase()} ${year}${month.toUpperCase()}`.includes(
          searchTerm
        )) &&
      !seen.has(s.symbol) &&
      !matchedSymbols.has(s.symbol)
    ) {
      results.push(s);
      matchedSymbols.add(s.symbol);
    }

    cursor = await cursor.continue();
  }

  // 5️⃣ Tokenized match
  const parts = term.match(/\w+/g) || [];
  if (parts.length > 1) {
    cursor = await store.openCursor();
    while (cursor) {
      const s = cursor.value;
      const combined =
        s.name === s.symbol
          ? s.symbol.toLowerCase()
          : `${s.name} ${s.symbol}`.toLowerCase();

      const match = parts.every((p) => combined.includes(p));

      if (match && !seen.has(s.symbol) && !matchedSymbols.has(s.symbol)) {
        results.push(s);
        matchedSymbols.add(s.symbol);
      }

      cursor = await cursor.continue();
    }
  }
  debugger;
  console.log("filter data: ", results.slice(0, 200));
  return results.slice(0, 200); // limit results
}
