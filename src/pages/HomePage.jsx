import React, { useState } from "react";
import HomeLayout from "../components/homeLogin/HomeLayout";
import LoginForm from "../components/LoginForm";
import OTPPage from "./OTPPage";

export default function HomePage() {
  const [step, setStep] = useState("welcome");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleLoginSuccess = (mobile) => {
    setMobileNumber(mobile);
    setStep("otp");
  };

  const handleOTPVerified = (data) => {
    localStorage.setItem("authToken", data.data?.token || "");
    sessionStorage.setItem("authToken", data.data?.token || "");
    sessionStorage.setItem("sid", data.data?.sid || "");
    sessionStorage.setItem("ucc", data.data?.ucc || "");
    sessionStorage.setItem("data", JSON.stringify(data.data));
    window.location.href = "/dashboard";
  };

  return (
    <HomeLayout
      onLoginClick={() => setStep("login")}
      onHomeClick={() => setStep("welcome")}
    >
      <div className="w-full max-w-md transition-all duration-300">
        {step === "welcome" && (
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Welcome to Algo Trading Platform
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              A simple and secure way to manage your trades and watchlists.
            </p>
            <button
              onClick={() => setStep("login")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md shadow-md transition"
            >
              Login to Continue
            </button>
          </div>
        )}

        {step === "login" && (
          <div className="bg-transparent shadow-none">
            <LoginForm isEmbedded onSuccess={handleLoginSuccess} />
          </div>
        )}
        {step === "otp" && mobileNumber && (
          <OTPPage mobileNumber={mobileNumber} onSuccess={handleOTPVerified} />
        )}
      </div>
    </HomeLayout>
  );
}
