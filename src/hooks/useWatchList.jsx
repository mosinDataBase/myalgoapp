import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import URLS from "../config/apiUrls";
import { showToast, showConfirmDialog } from "../utils/alerts";
import useDebounce from "../utils/useDebounce";
import { io } from "socket.io-client";

export default function useWatchList() {

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSymbols, setFilteredSymbols] = useState([]);
  const [watchListToken, setWatchListToken] = useState([]);
  const searchRef = useRef(null);
  const debouncedTerm = useDebounce(searchTerm, 50);
  const mobileNumber = localStorage.getItem("mobileNumber");
  const mobile = useRef(localStorage.getItem("mobileNumber"));

  const location = useLocation();
  const isWatchListPage = location.pathname === "/watchlist";

  const [watchList, setWatchList] = useState([]);


  const socketRef = useRef(null);

  // Fetch and cache symbols

  const loadSymbols = async (query) => {
    if (!query || query.length < 3) return; // only trigger when 3+ characters typed

    try {
      const res = await axios.post(URLS.symbolSearch, {
        q: query,
        segment: "nse_cm",
        phone: mobileNumber,
      });
      return res.data || [];
    } catch (err) {
      console.error("Symbol fetch failed", err);
    }
  };

  // Filter symbol list on input
  useEffect(() => {
    const fetchFiltered = async () => {
      if (!debouncedTerm || debouncedTerm.length < 3) {
        setFilteredSymbols([]);
        return;
      }
      if (debouncedTerm.length >= 3 && searchTerm.length >= 3) {
        const symbolRes = await loadSymbols(debouncedTerm);
        console.log(symbolRes);
        setFilteredSymbols(symbolRes);
      }
    };

    fetchFiltered();
  }, [debouncedTerm, watchList]);

  const fetchSymbolData = async (symbol) => {
    try {
      const res = await axios.post(URLS.quotes, {
        mobileNumber,
        symbol,
        expiry: "0", // or whichever expiry you're targeting
        segment: "nse_cm", // or "nse_fo", "mcx_fo", etc.
      });

      const tokens = res.data?.tokens;
      const data = res.data?.data;
      const rawData = res.data;
      setWatchListToken(tokens);
      return rawData;
    } catch (err) {
      showToast({
        type: "error",
        title: "Error",
        text: err.response?.data?.message || "Error fetching quote.",
      });
      return null;
    }
  };

  const handleAddToWatchList = (selectedPsymbol) => {
    const symbolData = filteredSymbols.find(
      (item) => item.pSymbolName === selectedPsymbol
    );

    if (!symbolData) return;

    const newItem = {
      token: symbolData.pSymbol,
      symbol: symbolData.pSymbolName,
      exchSeg: symbolData.pExchSeg,
      ltp: 0,
      change: 0,
      changePercent: 0,
      ohlc: {},
    };

    setWatchList((prev) => [...prev, newItem]);

    // TODO: subscribe to WebSocket here if needed
  };

  const addToWatchList = async (pSymbol) => {
    const rawData = await fetchSymbolData(pSymbol);

    if (!rawData) {
      showToast({
        type: "error",
        title: "Invalid Symbol",
        text: `No valid data for ${pSymbol}`,
      });
      return;
    }
    handleAddToWatchList(pSymbol);
    // ✅ Ensure socket is connected and listening
    if (!socketRef.current) {
      socketRef.current = io(URLS.socketBase, { transports: ["websocket"] });

      socketRef.current.on("connect", () => {
        console.log("🔗 Option chain socket connected");
        socketRef.current.emit("register_mobile", { mobile: mobile.current });
      });

      socketRef.current.on("quotes_quotes_update", (msg) => {
        handleQuoteUpdate(msg);
      });
    }

    setSearchTerm("");
    setFilteredSymbols([]);
  };

  const handleQuoteUpdate = (msg) => {
    if (msg?.type !== "quotes" || !Array.isArray(msg.data)) return;

    setWatchList((prevList) =>
      prevList.map((item) => {
        const update = msg.data.find(
          (d) => d && String(d.instrument_token) === String(item.token)
        );
        if (!update) return item;

        const ltp = parseFloat(update.last_traded_price);
        const close = parseFloat(update.ohlc?.close || ltp);
        debugger;
        // ✅ Always use update.change if it's a number (even 0)
        const change = !isNaN(parseFloat(update.change))
          ? parseFloat(update.change)
          : parseFloat((ltp - close).toFixed(2));

        // ✅ Same logic for percent change
        const changePercent = !isNaN(parseFloat(update.net_change_percentage))
          ? parseFloat(update.net_change_percentage)
          : close !== 0
          ? parseFloat(((change / close) * 100).toFixed(2))
          : 0;

        return {
          ...item,
          ltp,
          change,
          changePercent,
          ohlc: {
            open: parseFloat(update.ohlc?.open) || item.ohlc?.open,
            high: parseFloat(update.ohlc?.high) || item.ohlc?.high,
            low: parseFloat(update.ohlc?.low) || item.ohlc?.low,
            close,
          },
        };
      })
    );
  };

  const removeFromWatchList = async (symbol) => {
    const confirmed = await showConfirmDialog({
      title: "Remove Stock?",
      text: `Are you sure you want to remove ${symbol}?`,
      confirmButtonText: "Yes, remove it",
    });

    if (confirmed) {
      setWatchList((prev) => prev.filter((item) => item.symbol !== symbol));
      showToast({
        type: "success",
        title: "Removed",
        text: `${symbol} removed from your watchlist.`,
      });
    }
  };

 
  useEffect(() => {
  if (watchList.length > 0) {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }
}, [watchList]);

useEffect(() => {
  const storedList = localStorage.getItem("watchList");
  if (storedList) {
    try {
      const parsedList = JSON.parse(storedList);
      setWatchList(parsedList);
    } catch (err) {
      console.error("Failed to parse watchList from localStorage", err);
    }
  }
}, []);

const handleBuy = (symbol) => {
    console.log("Buy", symbol);
    // Open buy modal or redirect to buy page here
  };

  // ✅ Sell handler
  const handleSell = (symbol) => {
    console.log("Sell", symbol);
    // Open sell modal or redirect to sell page here
  };


  return {
    handleBuy,
    handleSell,
    searchRef,
    searchTerm,
    setSearchTerm,
    filteredSymbols,
    watchList,
    addToWatchList,
    removeFromWatchList,
  };
}
