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
  const socketConnectedRef = useRef(false);
  const positionsMapRef = useRef({}); // 🔁 Keeps position data in memory

  const mobile = localStorage.getItem('mobileNumber');

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await axios.post(URLS.netPositions, { mobile });
        if (res.data.status === 'success') {
          const enriched = enrichPositions(res.data.positions);
          const sorted = sortPositions(enriched);

          // Update ref map
          const map = {};
          sorted.forEach((pos) => {
            map[`${pos.tok}-${pos.exSeg}`] = { ...pos };
          });
          positionsMapRef.current = map;

          setPositions(Object.values(map));
          setTotalPnl(Object.values(map).reduce((acc, p) => acc + p.pnl, 0));

          connectSocket();
        }
      } catch (err) {
        console.error('Failed to fetch net positions:', err);
      } finally {
        setLoading(false);
      }
    };

    const connectSocket = () => {
      if (socketConnectedRef.current || socketRef.current) return;

      socketRef.current = io(URLS.socketBase, {
        transports: ['websocket'],
      });

      socketConnectedRef.current = true;

      socketRef.current.on('live_data', (payload) => {
        if (payload?.type === 'stock_feed' && Array.isArray(payload.data)) {
          let hasUpdates = false;

          payload.data.forEach((item) => {
            
            const key = `${item.tk}-${item.e}`;
            const existing = positionsMapRef.current[key];
            if (!existing) return;

            const ltp = Number(item.ltp);
            const livePnl = existing.isActive
              ? existing.isBuyPosition
                ? (ltp - existing.avgBuyPrice) * Math.abs(existing.netQty)
                : (existing.avgSellPrice - ltp) * Math.abs(existing.netQty)
              : existing.pnl;

            // Only update if LTP actually changed
            if (existing.ltp !== ltp || existing.livePnl !== livePnl) {
              positionsMapRef.current[key] = {
                ...existing,
                ltp,
                livePnl,
              };
              hasUpdates = true;
            }
          });

          if (hasUpdates) {
            const updated = Object.values(positionsMapRef.current);
            setPositions(updated);
            const total = updated.reduce((acc, p) => acc + (p.livePnl ?? p.pnl), 0);
            setTotalPnl(total);
          }
        }
      });
    };

    if (mobile) fetchPositions();

    return () => {
      if (socketRef.current) {
        socketRef.current.emit('unsubscribe_all', { mobile });
        socketRef.current.disconnect();
        socketRef.current = null;
        socketConnectedRef.current = false;
      }

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
            {positions.map((pos) => (
              <PositionCard key={`${pos.tok}-${pos.exSeg}`} pos={pos} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NetPositionPage;
