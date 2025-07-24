import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import URLS from "../config/apiUrls";
import { showToast } from "../utils/alerts";

export default function useOptionChainLive({ selectedIndexSymbol, setLiveQuotes }) {
  const socketRef = useRef(null);
  const liveMapRef = useRef({});
  const mobileNo = useRef(localStorage.getItem("mobileNumber"));
  console.log(mobileNo)
  const reconnectAttempts = useRef(0);
  const reconnectMaxAttempts = 5;

  const connectSocket = () => {
    const socket = io(URLS.socketBase, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: reconnectMaxAttempts,
      reconnectionDelay: 1000, // first retry after 1s
      reconnectionDelayMax: 5000, // cap delay at 5s
    });

    socketRef.current = socket;
    liveMapRef.current = {};

    socket.on("connect", () => {
      console.log("🔗 Option chain socket connected");
      reconnectAttempts.current = 0;
      socket.emit("register_mobile", { mobile: mobileNo.current });
    });

    socket.on("option_data_update", (payload) => {debugger
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

    socket.on("disconnect", (reason) => {
      console.log("❌ Option chain socket disconnected: ", reason);
    });

    socket.io.on("option_data_update", () => {
      reconnectAttempts.current += 1;
      console.log(`🔁 Reconnection attempt #${reconnectAttempts.current}`);
    });

    socket.io.on("option_data_update", () => {
      console.warn("❌ Reconnection failed. Retrying manually in 5 seconds...");
      setTimeout(() => {
        if (reconnectAttempts.current < reconnectMaxAttempts) {
          console.log("🔁 Manual reconnection attempt...");
          connectSocket();
        }
      }, 5000);
    });
  };

  useEffect(() => {
    if (!selectedIndexSymbol || !mobileNo.current) return;

    if (socketRef.current) {
      try {
        socketRef.current.disconnect();
      } catch (_) {}
      socketRef.current = null;
    }

    connectSocket(); // 🔌 Initial connection

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("unsubscribe_all", { mobile: mobileNo.current });
        socketRef.current.disconnect();
        socketRef.current = null;
      }

      // Also inform backend to clean up
      fetch(URLS.unsubscribeOptions, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: mobileNo.current }),
      }).catch((err) => console.warn("Backend unsubscribe failed:", err));
    };
  }, [selectedIndexSymbol]);
}
