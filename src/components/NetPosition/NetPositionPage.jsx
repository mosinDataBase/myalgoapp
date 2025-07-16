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
        const res = await axios.post(URLS.netPositions, { mobile });
        if (res.data.status === 'success') {
          const enriched = enrichPositions(res.data.positions);
          const sorted = sortPositions(enriched);
          setPositions(sorted);

          const total = sorted.reduce((acc, pos) => acc + pos.pnl, 0);
          setTotalPnl(total);

          connectSocket();
        }
      } catch (err) {
        console.error('Failed to fetch net positions:', err);
      } finally {
        setLoading(false);
      }
    };

    const connectSocket = () => {
      socketRef.current = io(URLS.socketBase);

      socketRef.current.on('ltp_update', (data) => {
        setPositions((prev) => {
          const updated = prev.map((pos) => {
            if (pos.tok === data.tk && pos.exSeg === data.e) {
              const ltp = data.ltp;
              const livePnl = pos.isActive
                ? pos.isBuyPosition
                  ? (ltp - pos.avgBuyPrice) * Math.abs(pos.netQty)
                  : (pos.avgSellPrice - ltp) * Math.abs(pos.netQty)
                : pos.pnl;

              return {
                ...pos,
                ltp,
                livePnl,
              };
            }
            return pos;
          });

          const total = updated.reduce(
            (acc, pos) => acc + (pos.livePnl ?? pos.pnl),
            0
          );
          setTotalPnl(total);

          return updated;
        });
      });
    };

    if (mobile) fetchPositions();

    return () => {
      if (socketRef.current) {
        socketRef.current.emit('unsubscribe_all', { mobile });
        socketRef.current.disconnect();
        socketRef.current = null;
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
