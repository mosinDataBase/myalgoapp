// src/components/NetPosition/NetPositionPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import URLS from '../../config/apiUrls';
import PositionTable from './PositionTable';
import PositionCard from './PositionCard';
import { formatNumber, sortPositions, enrichPositions } from './positionUtils';

const NetPositionPage = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPnl, setTotalPnl] = useState(0);
  const socketRef = useRef(null);
  const mobile = localStorage.getItem('mobileNumber');

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await axios.post(URLS.netPositions, { mobile }); // 🔁 Backend already subscribes here
        if (res.data.status === 'success') {
          const enriched = enrichPositions(res.data.positions);
          const sorted = sortPositions(enriched);
          setPositions(sorted);

          const total = sorted.reduce((acc, pos) => acc + pos.pnl, 0);
          setTotalPnl(total);

          // 🔌 Connect to receive WebSocket updates (no need to emit subscribe)
          connectSocket();
        }
      } catch (err) {
        console.error('Failed to fetch net positions:', err);
      } finally {
        setLoading(false);
      }
    };

    const connectSocket = () => {
      socketRef.current = io(URLS.socketBase); // 🌐 should be base socket.io server URL

      socketRef.current.on('ltp_update', (data) => {
        setPositions((prev) =>
          prev.map((pos) =>
            pos.token === data.tk && pos.exchangeSegment === data.e
              ? { ...pos, ltp: data.ltp }
              : pos
          )
        );
      });
    };

    if (mobile) fetchPositions();

    return () => {
      // 🔌 Unsubscribe client-side
      if (socketRef.current) {
        socketRef.current.emit('unsubscribe_all', { mobile }); // 🔄 optional, depending on your backend
        socketRef.current.disconnect();
        socketRef.current = null;
      }

      // 🔁 Also tell backend to unsubscribe tokens
      axios
        .post(URLS.wsUnsubscribe, { mobile })
        .catch((err) => console.warn('Backend unsubscribe failed:', err));
    };
  }, [mobile]);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">📌 Net Positions</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : positions.length === 0 ? (
        <p className="text-gray-500">No positions found.</p>
      ) : (
        <>
          <div className="mb-4 px-4 py-3 border rounded-lg shadow-sm bg-white flex justify-between items-center">
            <span className="font-medium text-gray-600">Total P&L:</span>
            <span
              className={`text-lg font-semibold ${
                totalPnl >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              ₹{formatNumber(totalPnl)}
            </span>
          </div>

          <PositionTable positions={positions} />

          <div className="block sm:hidden space-y-4 mt-4">
            {positions.map((pos, i) => (
              <PositionCard key={i} pos={pos} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NetPositionPage;
