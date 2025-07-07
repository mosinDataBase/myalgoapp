export async function filterSymbols({ searchTerm, watchList = [] }) {
  if (!searchTerm || searchTerm.trim().length < 3) return [];

  const term = searchTerm.toLowerCase();
  const db = await import("./allSymbolDB.jsx").then((m) => m.initSymbolDB());
  const store = db.transaction("symbols", "readonly").store;

  const seen = new Set(watchList.map((item) => item.symbol));
  const matchedSymbols = new Set();
  const results = [];

  const addMatch = (s) => {
    if (!seen.has(s.symbol) && !matchedSymbols.has(s.symbol)) {
      results.push(s);
      matchedSymbols.add(s.symbol);
    }
  };

  // 🔹 Search by symbol
  try {
    const symbolIndex = store.index("symbol");
    let cursor = await symbolIndex.openCursor(
      IDBKeyRange.bound(term, term + "\uffff")
    );
    while (cursor && results.length < 50) {
      addMatch(cursor.value);
      cursor = await cursor.continue();
    }
  } catch (e) {
    console.warn("Symbol index not found", e);
  }

  // 🔹 Search by name
  try {
    const nameIndex = store.index("name");
    let cursor = await nameIndex.openCursor(
      IDBKeyRange.bound(term, term + "\uffff")
    );
    while (cursor && results.length < 100) {
      addMatch(cursor.value);
      cursor = await cursor.continue();
    }
  } catch (e) {
    console.warn("Name index not found", e);
  }
  console.log("search results", results);
  return results.slice(0, 50);
}

// src/utils/normalizeSymbolData.js
export function normalizeSymbolData(raw, fallbackSymbol = "") {
  if (!raw || typeof raw !== "object") return null;

  const symbol = (raw.trading_symbol || raw.ts || fallbackSymbol || "")
    .toUpperCase()
    .trim();
  const token = raw.instrument_token || raw.tk || "";

  // 🔐 Ensure valid token and symbol
  if (!symbol || !token) return null;

  const toNum = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? 0 : n;
  };

  const ltp = toNum(raw.ltp || raw.last_traded_price);

  // 🔐 Optionally block if LTP is 0
  if (ltp === 0) return null;

  return {
    symbol,
    token,
    segment: raw.exchange_segment || raw.e || "",
    ltp,
    change: toNum(raw.cng || raw.change),
    changePercent: toNum(raw.nc || raw.net_change_percentage),
    ohlc: {
      open: toNum(raw.op || raw.ohlc?.open),
      high: toNum(raw.h || raw.ohlc?.high),
      low: toNum(raw.lo || raw.ohlc?.low),
      close: toNum(raw.c || raw.ohlc?.close),
    },
    upper_circuit: toNum(raw.ucl || raw.upper_circuit_limit),
    lower_circuit: toNum(raw.lcl || raw.lower_circuit_limit),
    last_traded_quantity: toNum(raw.ltq || raw.last_traded_quantity),
    precision: toNum(raw.precision || raw.prec),
    request_type: raw.request_type || "",
    name: raw.name || "",
    week_high: toNum(raw["52week_high"]),
    week_low: toNum(raw["52week_low"]),
  };
}
