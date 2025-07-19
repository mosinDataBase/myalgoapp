import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import URLS from "../config/apiUrls";
import { showToast } from "../utils/alerts";

export default function useOptionChainLive({selectedIndexSymbol, setLiveQuotes}) {
  const socketRef = useRef(null);
  const liveMapRef = useRef({});
  const mobile = useRef(localStorage.getItem("mobileNumber"));

  useEffect(() => {
    if (!selectedIndexSymbol || !mobile.current) return;

    // Cleanup existing socket if already connected
    if (socketRef.current) {
      try {
        socketRef.current.disconnect();
      } catch (_) {}
      socketRef.current = null;
    }

    // Initialize fresh socket
    const socket = io(URLS.socketBase, { transports: ["websocket"] });
    socketRef.current = socket;

    liveMapRef.current = {}; // Reset quotes map on new symbol
    let unsubscribeTimer = null;

    socket.on("connect", () => {
      console.log("🔗 Option chain socket connected");
      socket.emit("register_mobile", { mobile: mobile.current });
    });

    socket.on("option_quotes_update", (payload) => { 
      try {
   
        if (!Array.isArray(payload?.data)) return;

        let hasUpdates = false;
        const newQuotesMap = { ...liveMapRef.current };

        payload.data.forEach((quote) => {
          const key = `${quote.ts}-${quote.e}`;
          const existing = liveMapRef.current[key];

          if (!existing || existing.ltp !== quote.ltp) {
            newQuotesMap[key] = quote;
            hasUpdates = true;
          }
        });

        if (hasUpdates) {
          liveMapRef.current = newQuotesMap;
          setLiveQuotes(Object.values(newQuotesMap));
        }
      } catch (err) {
        showToast({
          type: "error",
          title: "Live Data Error",
          text: err.message || "Failed to update option quotes",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Option chain socket disconnected");
    });

    return () => {
      // Delay unsubscribe to allow server to finish sending any last packets
      unsubscribeTimer = setTimeout(() => {
        if (socketRef.current) {
          socketRef.current.emit("unsubscribe_all", { mobile: mobile.current });
          socketRef.current.disconnect();
          socketRef.current = null;
        }

        // Also inform backend to clean up subscriptions
        fetch(URLS.unsubscribeOptions, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: mobile.current }),
        }).catch((err) => console.warn("Backend unsubscribe failed:", err));
      }, 1000); // 🔁 Add a 1 second grace period
    };
  }, [selectedIndexSymbol]);
}
