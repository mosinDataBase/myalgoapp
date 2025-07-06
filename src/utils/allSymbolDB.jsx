// src/utils/allSymbolDB.jsx
import { openDB } from "idb";

const DB_NAME = "MarketSymbolsDB";
const DB_VERSION = 2; // 🔼 Bump version to trigger `upgrade`
const SYMBOLS_STORE = "symbols";
const WATCHLIST_STORE = "watchlist";

// 🔧 Initialize the database and both stores
export const initSymbolDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(SYMBOLS_STORE)) {
        db.createObjectStore(SYMBOLS_STORE, { keyPath: "symbol" });
      }

      if (!db.objectStoreNames.contains(WATCHLIST_STORE)) {
        db.createObjectStore(WATCHLIST_STORE, { keyPath: "symbol" });
      }
    },
  });
};

//
// 🔹 SYMBOLS Store Functions
//

export const saveAllSymbols = async (symbols) => {
  const db = await initSymbolDB();
  const tx = db.transaction(SYMBOLS_STORE, "readwrite");
  const store = tx.objectStore(SYMBOLS_STORE);
  await store.clear();
  symbols.forEach((s) => store.put(s));
  await tx.done;
};

export const getAllSymbols = async () => {
  const db = await initSymbolDB();
  return db.getAll(SYMBOLS_STORE);
};

//
// 🔹 WATCHLIST Store Functions
//

export const saveWatchSymbol = async (stock) => {
  const db = await initSymbolDB();
  const tx = db.transaction(WATCHLIST_STORE, "readwrite");
  await tx.store.put(stock);
  await tx.done;
};

export const getAllWatchSymbols = async () => {
  const db = await initSymbolDB();
  return db.getAll(WATCHLIST_STORE);
};

export const deleteWatchSymbol = async (symbol) => {
  const db = await initSymbolDB();
  const tx = db.transaction(WATCHLIST_STORE, "readwrite");
  await tx.store.delete(symbol);
  await tx.done;
};

export const clearWatchList = async () => {
  const db = await initSymbolDB();
  const tx = db.transaction(WATCHLIST_STORE, "readwrite");
  await tx.store.clear();
  await tx.done;
};
