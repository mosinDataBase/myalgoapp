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
  const [expiries, setExpiries] = useState([]);
  const [selectedExpiry, setSelectedExpiry] = useState(null); // 🆕 Add expiry state
  
  const indexSym = selectedIndexSymbol.toUpperCase();
  //const strikePrice = localStorage.getItem(indexSym);
  const strikePrice = "25034"

  const fetchExpiries = useCallback(async (symbol = selectedIndexSymbol) => {
    try {
      const res = await axios.get(URLS.getExpiries, {
        params: {
          symbol,
          segment: "nse_fo",
        },
      });
      const fetched = res?.data?.expiries || [];
      setExpiries(fetched);
      if (fetched.length > 0) {
        setSelectedExpiry(fetched[0]); // default to first expiry
      }
    } catch (err) {
      showToast({
        type: "error",
        title: "Expiry Fetch Failed",
        text: err?.response?.data?.message || "Failed to fetch expiry dates.",
      });
    }
  }, [selectedIndexSymbol]);

  const fetchOptionChain = useCallback(async (symbol = selectedIndexSymbol, expiry = selectedExpiry) => {
    if (!symbol || !expiry) return;

    setLoading(true);
    try {
      const res = await axios.post(URLS.quotes, {
        mobileNumber,
        symbol,
        strikePrice,
        segment: "nse_fo",
        expiry, // 🆕 Send expiry
      });
      
      const livetokens = res?.data?.tokens;
     
       localStorage.setItem("livetokens", JSON.stringify(livetokens));
      
    } catch (err) {
      showToast({
        type: "error",
        title: "Fetch Failed",
        text: err?.response?.data?.message || "Failed to load options chain.",
      });
    } finally {
      setLoading(false);
    }
  }, [mobileNumber, selectedIndexSymbol, selectedExpiry]);

  useOptionChainLive({ selectedIndexSymbol, setLiveQuotes });

  useEffect(() => {
    if (selectedIndexSymbol) {
      fetchExpiries(selectedIndexSymbol);
    }
  }, [selectedIndexSymbol, fetchExpiries]);

  useEffect(() => {
    if (selectedIndexSymbol && selectedExpiry) {
      fetchOptionChain(selectedIndexSymbol, selectedExpiry);
    }
  }, [selectedIndexSymbol, selectedExpiry, fetchOptionChain]);

  return {
    loading,
    spotData,
    optionChain,
    fetchOptionChain,
    liveQuotes,
    expiries,
    selectedExpiry,
    setSelectedExpiry, // 🆕 expose setter to parent
  };
}

