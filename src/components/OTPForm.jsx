import React, { useState } from "react";
import axios from "axios";
import URLS from "../config/apiUrls";
import { showToast } from "../utils/alerts";
import Loading from "../utils/Loading";

const OTPForm = ({ mobileNumber, onSuccess }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(URLS.otpVerify, {
        mobileNumber,
        otp,
      });

      if (res.status === 200) {
        onSuccess(res.data); // Pass token & sid to parent
      } else {
        showToast({
          type: "info",
          title: "OTP verification failed",
          text: "OTP verification failed. Please try again.",
        });
      }
    } catch (err) {
      showToast({
        type: "info",
        title: "OTP verification failed",
        text: err.response?.data?.message || "OTP verification failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      {loading ? (
        <Loading text="Verifying OTP..." />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
            Enter OTP
          </h2>
          <form onSubmit={handleOTPSubmit} className="space-y-4">
            <input
              type="text"
              style={{ color: "black" }}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default OTPForm;
