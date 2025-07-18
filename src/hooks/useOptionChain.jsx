import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import URLS from "../config/apiUrls";
import { showToast } from "../utils/alerts";
import useOptionChainLive from "./useOptionChainLive"; // 🔗 Live updates

export default function useOptionChain(selectedIndexSymbol) {
  const [optionChain, setOptionChain] = useState([]);
  const [loading, setLoading] = useState(false);
  const [spotData, setSpotData] = useState(null);
  const [liveQuotes, setLiveQuotes] = useState([]);
  const mobileNumber = localStorage.getItem("mobileNumber");
  const strikePrice = 25953;

  const fetchOptionChain = useCallback(async (symbol = selectedIndexSymbol) => {
    if (!symbol) return;

    setLoading(true);
    try {
      const res = await axios.post(URLS.quotes, {
        mobileNumber,
        symbol,
        strikePrice,
        segment: "nse_fo",
      });

      const spot = res?.data?.data?.data?.[0];
      setSpotData(spot);

      await axios.post(URLS.quotesLive, {
        mobileNumber,
        symbols: [symbol],
      });

    } catch (err) {
      console.log("Error fetching option chain", err?.response?.data);
      showToast({
        type: "error",
        title: "Fetch Failed",
        text: err?.response?.data?.message || "Failed to load options chain.",
      });
    } finally {
      setLoading(false);
    }
  }, [mobileNumber, selectedIndexSymbol]);

  // ✅ Live quote updates
  //useOptionChainLive({selectedIndexSymbol,setLiveQuotes});

  useEffect(() => {
    if (selectedIndexSymbol) {
      fetchOptionChain(selectedIndexSymbol);
    }
  }, [selectedIndexSymbol, fetchOptionChain]);

  return {
    loading,
    spotData,
    optionChain,
    fetchOptionChain,
    liveQuotes, // 🔁 Expose for UI if needed
  };
}
