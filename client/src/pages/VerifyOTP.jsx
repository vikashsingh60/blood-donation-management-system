import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const VerifyOTP = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    try {
      const userId = localStorage.getItem("otpUserId");
      if (!userId) {
        alert("OTP session expired. Please login again.");
        return navigate("/login");
      }

      const res = await API.post("/api/auth/verify-otp", {
        userId,
        otp
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.removeItem("otpUserId");

      const nextRoute = res.data.user.role === "admin"
        ? "/admin"
        : res.data.user.role === "hospital"
          ? "/hospital"
          : res.data.user.role === "donor"
            ? "/donor"
            : "/dashboard";

      navigate(nextRoute, { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Verify OTP</h1>
        <input
          type="text"
          placeholder="Enter OTP"
          className="border p-3 w-full rounded-xl mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          onClick={handleVerify}
          className="w-full bg-red-500 text-white px-4 py-3 rounded-xl"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;