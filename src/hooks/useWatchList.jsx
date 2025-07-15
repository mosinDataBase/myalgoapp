import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import URLS from "../config/apiUrls";
import { showToast, showConfirmDialog } from "../utils/alerts";
import { filterSymbols, normalizeSymbolData } from "../utils/searchUtils";
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

  const location = useLocation();
  const isWatchListPage = location.pathname === "/watchlist";

  const socketRef = useRef(null);

  useEffect(() => {
    if (!watchList.length || !mobileNumber || !isWatchListPage) return;

    const tokens = watchList.map((item) => ({
      instrument_token: item.token,
      exchange_segment: item.segment,
    }));

    // Send subscription request
    axios.post(`${URLS.livedata}`, {
      tokens,
      mobile: mobileNumber,
    });

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
  }, [watchList, mobileNumber, isWatchListPage]);

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
          console.log("symbols", symbols);
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
      if (searchTerm.length >= 3) {
        const results = await filterSymbols({
          searchTerm: debouncedTerm,
          allSymbols,
          watchList,
        });

        setFilteredSymbols(results);
      }
    };

    fetchFiltered();
  }, [debouncedTerm, allSymbols, watchList]);

  const fetchSymbolData = async (symbol) => {
    try {
      const res = await axios.post(URLS.quotes, { mobileNumber, symbol });
      const data = res.data?.data?.data?.[0];
      const rawData = res.data;
      console.log("rawData", rawData);
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
    const rawData = await fetchSymbolData(symbol);

    const data = normalizeSymbolData(rawData, symbol);

    if (!data) {
      showToast({
        type: "error",
        title: "Invalid Symbol",
        text: `No valid data for ${symbol.toUpperCase()}`,
      });
      return;
    }

    setWatchList((prev) => {
      if (!prev.some((item) => item.symbol === data.symbol)) {
        saveWatchSymbol(data);
        return [...prev, data];
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
