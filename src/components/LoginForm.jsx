import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../utils/alerts";
import Loading from "../utils/Loading";
import URLS from "../config/apiUrls";

export default function LoginForm({ isEmbedded = false, onSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [consumerKey, setConsumerKey] = useState("");
  const [consumerSecret, setConsumerSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedKey = sessionStorage.getItem("consumerKey");
    const savedSecret = sessionStorage.getItem("consumerSecret");

    if (savedKey && savedSecret) {
      setConsumerKey(savedKey);
      setConsumerSecret(savedSecret);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      showToast({
        type: "warning",
        title: "Invalid number",
        text: "Mobile number must be 10 digits.",
      });
      return;
    }

    try {
      setLoading(true);
      const mobileNumber = `+91${phoneNumber}`;

      const res = await axios.post(URLS.login, {
        mobileNumber,
        password,
        consumerKey,
        consumerSecret,
      });

      if (res.data.status === "success") {
        localStorage.setItem("mobileNumber", mobileNumber);
        if (typeof onSuccess === "function") {
          onSuccess(mobileNumber);
        } else {
          navigate("/otp");
        }
      } else {
        showToast({
          type: "error",
          title: "Login failed",
          text: res.data.message || "Invalid credentials",
        });
      }
    } catch (err) {
      showToast({
        type: "error",
        title: "Login failed",
        text: err.response?.data?.message || "Please enter correct credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={
        isEmbedded
          ? "bg-transparent"
          : "flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-100 to-blue-100 dark:from-gray-900 dark:to-gray-800"
      }
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        {/* Title + Settings Icon */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Algo Login
          </h2>
          {(!consumerKey || !consumerSecret) && (
            <button
              type="button"
              onClick={() => setShowConfig(true)}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              title="Configure Keys"
            >
              <FiSettings size={20} />
            </button>
          )}
        </div>

        {/* phone input */}
        <div className="flex mb-4">
          <span className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-r-0 rounded-l text-gray-600 dark:text-gray-300">
            +91
          </span>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            className="flex-1 p-2 border border-gray-300 dark:border-gray-700 dark:text-white text-gray-800 bg-white dark:bg-gray-800 rounded-r focus:outline-none"
            placeholder="Mobile Number"
            required
          />
        </div>

        {/* password input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:text-white text-gray-800 bg-white dark:bg-gray-800 rounded mb-4 focus:outline-none"
          placeholder="Password"
          required
        />

        {/* login button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {loading && <Loading text="Authenticating..." />}

        {/* Settings Modal */}
        {/* Settings Modal */}
        {showConfig && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-md w-full max-w-sm relative">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Configure API Keys
              </h3>

              <input
                type="text"
                placeholder="Consumer Key"
                value={consumerKey}
                onChange={(e) => setConsumerKey(e.target.value)}
                className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              />
              <input
                type="text"
                placeholder="Consumer Secret"
                value={consumerSecret}
                onChange={(e) => setConsumerSecret(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowConfig(false)}
                  className="px-4 py-2 text-sm bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!consumerKey || !consumerSecret) {
                      showToast({
                        type: "warning",
                        title: "Missing Fields",
                        text: "Please fill in both Consumer Key and Secret.",
                      });
                      return;
                    }

                    // 👉 Store in sessionStorage
                    sessionStorage.setItem("consumerKey", consumerKey);
                    sessionStorage.setItem("consumerSecret", consumerSecret);

                    showToast({
                      type: "success",
                      title: "Saved",
                      text: "API keys saved successfully.",
                    });

                    setTimeout(() => {
                      setShowConfig(false);
                    }, 1000);
                  }}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
