// src/utils/allSymbolDB.jsx
import { openDB } from "idb";

// ------------------
// DB Setup Constants
// ------------------
const DB_NAME = "MarketSymbolsDB";
const DB_VERSION = 3; // 🔼 bumped version to trigger `upgrade`
const SYMBOLS_STORE = "symbols";
const WATCHLIST_STORE = "watchlist";
const SECURE_CONFIG_STORE = "secure_config"; // 🔐 New store

// ------------------
// Web Crypto Helpers
// ------------------
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const secret = "myalgo@123"; // 🔒 Static passphrase (can be dynamic if needed)

async function getCryptoKey() {
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("salt"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encryptText(text) {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await getCryptoKey();
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(text)
  );
  return { iv: Array.from(iv), data: Array.from(new Uint8Array(encrypted)) };
}

async function decryptText({ iv, data }) {
  const key = await getCryptoKey();
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(iv) },
    key,
    new Uint8Array(data)
  );
  return decoder.decode(decrypted);
}

// ------------------
// Init DB + Stores
// ------------------
export const initSymbolDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(SYMBOLS_STORE)) {
        const symbolStore = db.createObjectStore(SYMBOLS_STORE, {
          keyPath: "symbol",
        });
        symbolStore.createIndex("symbol", "symbol", { unique: true });
        symbolStore.createIndex("name", "name", { unique: false });
      }

      if (!db.objectStoreNames.contains(WATCHLIST_STORE)) {
        db.createObjectStore(WATCHLIST_STORE, { keyPath: "symbol" });
      }

      if (!db.objectStoreNames.contains(SECURE_CONFIG_STORE)) {
        db.createObjectStore(SECURE_CONFIG_STORE);
      }
    },
  });
};

// ------------------
// 🔐 Secure Storage
// ------------------
export const secureStore = async (key, value) => {
  const db = await initSymbolDB();
  const encrypted = await encryptText(value); // ✅ Do this BEFORE transaction
  const tx = db.transaction(SECURE_CONFIG_STORE, "readwrite");
  tx.store.put(encrypted, key);
  await tx.done;
};


export const secureRetrieve = async (key) => {
  const db = await initSymbolDB();
  const encrypted = await db.get(SECURE_CONFIG_STORE, key);
  if (!encrypted) return null;

  try {
    return await decryptText(encrypted);
  } catch (err) {
    console.error("Decryption failed", err);
    return null;
  }
};

export const clearSecureStorage = async (key) => {
  const db = await initSymbolDB();
  const tx = db.transaction(SECURE_CONFIG_STORE, "readwrite");
  key ? await tx.store.delete(key) : await tx.store.clear();
  await tx.done;
};

// ------------------
// 📦 Symbol Store
// ------------------
export const saveAllSymbols = async (symbols) => {
  const db = await initSymbolDB();
  const tx = db.transaction(SYMBOLS_STORE, "readwrite");
  const store = tx.objectStore(SYMBOLS_STORE);
  await store.clear();
  symbols.forEach((s) => {
    store.put({
      ...s,
      symbol: s.symbol.toLowerCase(),
      name: s.name.toLowerCase(),
    });
  });
};

export const getAllSymbols = async () => {
  const db = await initSymbolDB();
  return db.getAll(SYMBOLS_STORE);
};

// ------------------
// 📈 Watchlist Store
// ------------------
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
