import { useState, useEffect, useRef } from "react";
import axios from "axios";
import URLS from "../config/apiUrls";
import { showToast, showConfirmDialog } from "../utils/alerts";
import { filterSymbols } from "../utils/searchUtils";
import useDebounce from "../utils/useDebounce";
import { io } from "socket.io-client";
import {
  saveAllSymbols,
  getAllSymbols,
  saveWatchSymbol,
  deleteWatchSymbol,
  getAllWatchSymbols,
} from "../utils/allSymbolDB";

export default function useWatchList() {
  const [watchList, setWatchList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSymbols, setFilteredSymbols] = useState([]);
  const [allSymbols, setAllSymbols] = useState([]);
  const searchRef = useRef(null);
  const debouncedTerm = useDebounce(searchTerm, 50);
  const mobileNumber = localStorage.getItem("mobileNumber");

  const socketRef = useRef(null);

  useEffect(() => {
    if (!watchList.length || !mobileNumber) return;

    const tokens = watchList.map((item) => ({
      instrument_token: item.token,
      exchange_segment: item.segment,
    }));

    // Send subscription request
    axios.post(`${URLS.livedata}`, {
      tokens,
      mobile: mobileNumber,
    });

    // Connect WebSocket
    if (!socketRef.current) {
      socketRef.current = io(URLS.websocket);
    }
    socketRef.current.on("price_update", (msg) => {
      setWatchList((prev) =>
        prev.map((item) =>
          item.token === msg.tk
            ? {
                ...item,
                ltp: msg.ltp ?? item.ltp,
                change: msg.cng ?? item.change,
                changePercent: msg.nc ?? item.changePercent,
                ohlc: {
                  open: msg.op ?? item.ohlc.open,
                  high: msg.h ?? item.ohlc.high,
                  low: msg.lo ?? item.ohlc.low,
                  close: msg.c ?? item.ohlc.close,
                },
              }
            : item
        )
      );
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [watchList, mobileNumber]);

  useEffect(() => {
    const loadWatchList = async () => {
      const saved = await getAllWatchSymbols();
      setWatchList(saved || []);
    };
    loadWatchList();
  }, []);

  // Fetch and cache symbols
  useEffect(() => {
    const loadSymbols = async () => {
      const cached = await getAllSymbols();
      if (cached.length > 0) {
        setAllSymbols(cached);
      } else {
        try {
          const res = await axios.get(URLS.symbols);
          const symbols = res.data.symbols || [];
          setAllSymbols(symbols);
          saveAllSymbols(symbols);
        } catch (err) {
          console.error("Symbol fetch failed", err);
        }
      }
    };
    loadSymbols();
  }, []);

  // Filter symbol list on input
  useEffect(() => {
    const fetchFiltered = async () => {
      if (!debouncedTerm || allSymbols.length === 0) {
        setFilteredSymbols([]);
        return;
      }

      const results = await filterSymbols({
        searchTerm: debouncedTerm,
        allSymbols,
        watchList,
      });
      debugger;
      setFilteredSymbols(results);
    };

    fetchFiltered();
  }, [debouncedTerm, allSymbols, watchList]);

  const fetchSymbolData = async (symbol) => {
    try {
      const res = await axios.post(URLS.quotes, { mobileNumber, symbol });
      const data = res.data?.data?.data?.[0];
      return data;
    } catch (err) {
      showToast({
        type: "error",
        title: "Error",
        text: err.response?.data?.message || "Error fetching quote.",
      });
      return null;
    }
  };

  const addToWatchList = async (symbol) => {
    const data = await fetchSymbolData(symbol);

    if (!data) return;

    const newStock = {
      symbol: data.trading_symbol,
      ltp: parseFloat(data.last_traded_price || 0),
      change: parseFloat(data.change || 0),
      changePercent: parseFloat(data.net_change_percentage || 0),
      ohlc: data.ohlc || {},
      segment: data.exchange_segment || "",
      token: data.instrument_token || "",
    };

    setWatchList((prev) => {
      const alreadyExists = prev.some(
        (item) => item.symbol === newStock.symbol
      );
      if (!alreadyExists) {
        saveWatchSymbol(newStock); // ✅ Only save if not a duplicate
        return [...prev, newStock];
      }
      return prev;
    });

    setSearchTerm("");
    setFilteredSymbols([]);
  };

  const removeFromWatchList = async (symbol) => {
    const confirmed = await showConfirmDialog({
      title: "Remove Stock?",
      text: `Are you sure you want to remove ${symbol}?`,
      confirmButtonText: "Yes, remove it",
    });

    if (confirmed) {
      await deleteWatchSymbol(symbol);
      setWatchList((prev) => prev.filter((item) => item.symbol !== symbol));
      showToast({
        type: "success",
        title: "Removed",
        text: `${symbol} removed from your watchlist.`,
      });
    }
  };

  return {
    searchRef,
    searchTerm,
    setSearchTerm,
    filteredSymbols,
    watchList,
    addToWatchList,
    removeFromWatchList,
  };
}
