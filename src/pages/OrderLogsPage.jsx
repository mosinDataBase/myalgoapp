import React, { useEffect, useState } from "react";
import axios from "axios";
import URLS from "../config/apiUrls";

const OrderLogsPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const mobile = localStorage.getItem("mobileNumber");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.post(URLS.orderLogs, { mobile });
        if (res.data.status === "success") {
          setOrders(res.data.orders);
        }
      } catch (err) {
        console.error("Failed to fetch order logs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (mobile) fetchOrders();
  }, [mobile]);

  const statusBadge = (status) => {
    const lower = (status || "").toLowerCase();
    if (lower === "completed" || lower === "executed" || lower === "complete") {
      return "bg-green-100 text-green-700";
    } else if (lower === "cancelled" || lower === "rejected") {
      return "bg-red-100 text-red-600";
    } else if (lower === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }
    return "bg-gray-100 text-gray-700";
  };
  // Sort orders based on ordDtTm (latest first)
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.ordDtTm);
    const dateB = new Date(b.ordDtTm);
    return dateB - dateA; // DESC by default
  });

  const filteredOrders = sortedOrders
    .filter((order) => {
      const status = (order.ordSt || "").toLowerCase();
      return statusFilter === "all" || status === statusFilter.toLowerCase();
    })
    .sort((a, b) => new Date(b.ordDtTm) - new Date(a.ordDtTm));

  return (
    <div className="p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">📄 Order Logs</h2>

      {loading ? (
        <div className="text-gray-500">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500">No orders found.</div>
      ) : (
        <>
          {/* ✅ Desktop Table View (visible only on sm and up) */}
          <div className="hidden sm:block overflow-auto rounded-lg shadow border bg-white">
            <table className="min-w-full text-sm text-left divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-3 py-2">S.No.</th>
                  <th className="px-3 py-2">Time</th>
                  <th className="px-3 py-2">Symbol</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2 text-right">Qty</th>
                  <th className="px-3 py-2 text-right">Price</th>
                  <th className="px-3 py-2">
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-xs font-medium text-gray-700">
                        Status
                      </span>
                      <select
                        className="border text-xs px-2 py-1 rounded focus:outline-none"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">All</option>
                        <option value="complete">Complete</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="rejected">Rejected</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-3 py-2">{idx + 1}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {order.ordDtTm}
                    </td>
                    <td className="px-3 py-2">{order.trdSym}</td>
                    <td
                      className={`px-3 py-2 font-medium ${
                        order.trnsTp === "B" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {order.trnsTp === "B" ? "BUY" : "SELL"}
                    </td>
                    <td className="px-3 py-2 text-right">{order.qty}</td>
                    <td className="px-3 py-2 text-right">₹{order.prc}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`text-xs px-2 py-1 rounded ${statusBadge(
                          order.ordSt
                        )}`}
                      >
                        {order.ordSt?.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Mobile Card View (visible only on small screens) */}
          <div className="block sm:hidden space-y-4">
            {/* ✅ Mobile Filter Dropdown */}
            <div className="block sm:hidden mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Filter by Status
              </label>
              <select
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="complete">Complete</option>
                <option value="cancelled">Cancelled</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {filteredOrders.map((order, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg px-4 py-3 border border-gray-200"
              >
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{order.ordDtTm || "--"}</span>
                  <span className="text-xs">
                    {order.vldt || "LIMIT - NRML"}
                  </span>
                </div>

                <div className="mt-1">
                  <div className="font-semibold text-base text-gray-800 flex flex-wrap gap-2">
                    {order.sym || "—"}
                    {order.optTp && order.optTp !== "XX" && (
                      <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                        {order.strikePrice || ""} {order.optTp}
                      </span>
                    )}
                    {order.expDt && (
                      <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                        {order.expDt}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    NSE{" "}
                    {order.trnsTp === "B" ? (
                      <span className="text-green-600 font-semibold">BUY</span>
                    ) : (
                      <span className="text-red-600 font-semibold">SELL</span>
                    )}{" "}
                    {order.fldQty || 0}/{order.qty} Lots
                  </p>
                </div>

                <div className="mt-2 flex justify-between items-center text-sm">
                  <div className="text-gray-700 font-semibold">
                    ₹{order.avgPrc || order.prc || "0.00"}
                  </div>
                  <div
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusBadge(
                      order.ordSt
                    )}`}
                  >
                    {(order.ordSt || "").toUpperCase()}
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

export default OrderLogsPage;
