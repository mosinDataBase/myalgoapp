import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmStrategy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const strategies = location.state?.selectedStrategies || [];

  const handleConfirm = async () => {
    try {
      const res = await fetch("/strategy/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ strategies }),
      });

      const data = await res.json();
      alert(data.message || "Strategies started!");
      navigate("/"); // back to dashboard
    } catch (err) {
      console.error(err);
      alert("Error executing strategies");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Confirm Your Strategies</h2>
      <ul className="list-disc list-inside mb-4">
        {strategies.map((s) => (
          <li key={s} className="capitalize text-gray-700">
            {s.replace("_", " ")}
          </li>
        ))}
      </ul>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Confirm & Execute
        </button>
      </div>
    </div>
  );
};

export default ConfirmStrategy;
