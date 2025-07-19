import { useEffect, useState, useRef } from "react";
import axios from "axios";
import URLS from "../config/apiUrls";
import { io } from "socket.io-client";
import { showToast } from "../utils/alerts";

const useMainIndex = () => {
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataString = sessionStorage.getItem("data");
  const userData = dataString ? JSON.parse(dataString) : null;
  const mobile = localStorage.getItem("mobileNumber") || userData?.mobileNumber;

  const socketRef = useRef(null);
  const liveMapRef = useRef({});
  const mobileNo = useRef(mobile);

  // ✅ Detect browser refresh and store reconnect flag
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("index_socket_reconnect", "true");
      localStorage.setItem("index_last_seen", Date.now().toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // ✅ Setup socket connection with refresh reconnect logic
  useEffect(() => {
    if (!mobileNo.current) return;

    // 🔁 Detect reconnect scenario
    const shouldReconnect = localStorage.getItem("index_socket_reconnect");
    const lastSeen = parseInt(localStorage.getItem("index_last_seen"), 10);
    const withinGrace = Date.now() - lastSeen < 100000; // 10 sec

    if (shouldReconnect && withinGrace) {
      console.log("⏪ Reconnecting index socket after refresh...");
    }

    // Cleanup existing socket if any
    if (socketRef.current) {
      try {
        socketRef.current.disconnect();
      } catch (_) {}
      socketRef.current = null;
    }

    // Clear reconnect flag
    localStorage.removeItem("index_socket_reconnect");
    localStorage.removeItem("index_last_seen");

    // 🧠 Initialize socket
    const socket = io(URLS.socketBase, { transports: ["websocket"] });
    socketRef.current = socket;
    liveMapRef.current = {};

    socket.on("connect", () => {
      console.log("🔗 Main index socket connected");
      socket.emit("register_mobile", { mobile: mobileNo.current });
    });

    socket.on("live_index_data", (payload) => {
      try {
        const quotesArray = payload?.data?.data;
        if (!Array.isArray(quotesArray)) return;

        let hasUpdates = false;
        const newQuotesMap = { ...liveMapRef.current };

        quotesArray.forEach((quote) => {
          const key = `${quote.ts}-${quote.e}`;
          const existing = liveMapRef.current[key];

          if (!existing || existing.ltp !== quote.ltp) {
            newQuotesMap[key] = quote;
            hasUpdates = true;
          }
        });

        if (hasUpdates) {
          liveMapRef.current = newQuotesMap;
          setIndices(Object.values(newQuotesMap));
        }
      } catch (err) {
        showToast({
          type: "error",
          title: "Live Data Error",
          text: err.message || "Failed to update index quotes",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Main index socket disconnected");
    });

    // No need to manually disconnect on unmount — let refresh/reconnect logic handle it
  }, []);

  // 🔁 One-time fetch fallback (optional)
  useEffect(() => {
    const fetchIndices = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          URLS.getMainIndices,
          { mobile },
          { headers: { "Content-Type": "application/json" } }
        );
        const data = res.data?.data || [];
        // Optional fallback:
        // setIndices(data);
      } catch (err) {
        console.error("Error fetching index data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIndices();
  }, []);

  return { indices, loading };
};

export default useMainIndex;
