import React, { useEffect, useState } from "react";
import axios from "axios";
import URLS from "../config/apiUrls"; // Adjust path if needed

const TradesPage = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const mobile = localStorage.getItem("mobileNumber");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.post(URLS.orderLogs, { mobile });
        if (res.data.status === "success") {
          const executed = res.data.orders.filter((order) =>
            ["complete", "completed", "executed"].includes(
              (order.ordSt || "").toLowerCase()
            )
          );
          // Optional: Sort by most recent
          const sorted = executed.sort(
            (a, b) => new Date(b.ordDtTm) - new Date(a.ordDtTm)
          );
          setTrades(sorted);
        }
      } catch (err) {
        console.error("Failed to fetch trades:", err);
      } finally {
        setLoading(false);
      }
    };

    if (mobile) fetchOrders();
  }, [mobile]);

  const formatExchange = (exSeg = "") => {
    return exSeg.split("_")[0]?.toUpperCase() || "--";
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">✅ Executed Trades</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : trades.length === 0 ? (
        <p className="text-gray-500">No executed trades found.</p>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto border shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 text-sm bg-white">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">S.No.</th>
                  <th className="px-4 py-3 text-left">Symbol</th>
                  <th className="px-4 py-3 text-left">Exchange</th>
                  <th className="px-4 py-3 text-left">Qty</th>
                  <th className="px-4 py-3 text-left">Order Type</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {trades.map((trade, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{index+1}</td>
                    <td className="px-4 py-2">{trade.trdSym}</td>
                    <td className="px-4 py-3">{formatExchange(trade.exSeg)}</td>
                    <td className="px-4 py-2">{trade.qty}</td>

                    <td className="px-4 py-2">{trade.prod || "NRML"}</td>

                    <td
                      className={`px-4 py-2 font-medium ${
                        trade.trnsTp === "B" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {trade.trnsTp === "B" ? "BUY" : "SELL"}
                    </td>
                    <td className="px-4 py-2">₹{trade.avgPrc || trade.prc}</td>
                    <td className="px-4 py-2">{trade.ordDtTm}</td>
                    <td className="px-4 py-2 text-blue-600">
                      {(trade.ordSt || "").toUpperCase()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-4">
            {trades.map((trade, index) => (
              <div
                key={index}
                className="bg-white border shadow rounded-lg px-4 py-3"
              >
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{trade.ordDtTm}</span>

                  <span>{trade.prod || "NRML"}</span>
                </div>

                <div className="mt-1 text-gray-800 font-semibold text-base">
                  {trade.trdSym}
                </div>

                <div className="mt-1 text-sm text-gray-600">
                  {trade.trnsTp === "B" ? (
                    <span className="text-green-600 font-semibold">BUY</span>
                  ) : (
                    <span className="text-red-600 font-semibold">SELL</span>
                  )}{" "}
                  {trade.qty} Qty
                </div>

                <div className="text-sm text-gray-500">
                  Exchange:{" "}
                  <span className="font-medium">
                    {formatExchange(trade.exSeg)}
                  </span>
                </div>

                <div className="mt-2 flex justify-between text-sm items-center">
                  <div className="text-gray-700 font-medium">
                    ₹{trade.avgPrc || trade.prc}
                  </div>
                  <div className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                    {(trade.ordSt || "").toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TradesPage;
