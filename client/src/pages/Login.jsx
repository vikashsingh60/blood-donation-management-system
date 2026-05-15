import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";
import AuthLayout from "../components/AuthLayout";
import heroImage from "../assets/hero.jpeg";

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");
  const [loginMethod, setLoginMethod] = useState("email"); // "email" or "mobile"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [abhaNumber, setAbhaNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMobileOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginData = role === "patient" && loginMethod === "abha"
        ? { abhaNumber }
        : { phone: mobileNumber };

      const res = await API.post("/api/auth/login", loginData);

      console.log("OTP sent:", res.data);
      localStorage.setItem("otpUserId", res.data.userId);
      setUserId(res.data.userId);
      setOtpSent(true);
      alert("OTP sent to your registered mobile number");
    } catch (error) {
      console.log("OTP Error:", error);
      alert(
        error.response?.data?.message || "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/api/auth/login", {
        role,
        email,
        password,
      });

      console.log("Login Success:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user._id);

      alert("Login Successful");

      const nextRoute =
        res.data.user.role === "admin"
          ? "/admin"
          : res.data.user.role === "hospital"
          ? "/hospital"
          : res.data.user.role === "donor"
          ? "/donor"
          : "/dashboard";

      navigate(nextRoute);
    } catch (error) {
      console.log("Login Error:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div
        className="w-full min-h-screen flex items-center justify-center bg-cover bg-center px-4"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="w-full max-w-md rounded-[32px] bg-white/20 backdrop-blur-lg border border-white/30 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-red-600">
              Login
            </h2>

            <p className="text-white mt-2 font-medium">
              {otpSent
                ? "Enter OTP sent to your mobile"
                : role === "patient" && loginMethod === "abha"
                ? "Login with ABHA Number"
                : loginMethod === "mobile"
                ? "Login with Mobile Number + OTP"
                : "Login with Email + Password"}
            </p>
          </div>

          {otpSent ? (
            <div className="text-center">
              <p className="text-white mb-4">OTP sent to your registered mobile</p>
              <button
                onClick={() => navigate("/verify-otp")}
                className="w-full bg-red-600 text-white py-3 rounded-2xl font-semibold hover:bg-red-700 transition-all duration-300"
              >
                Enter OTP
              </button>
              <button
                onClick={() => {
                  setOtpSent(false);
                  setAbhaNumber("");
                  setMobileNumber("");
                  setLoginMethod("email");
                }}
                className="w-full bg-gray-600 text-white py-3 rounded-2xl font-semibold hover:bg-gray-700 transition-all duration-300 mt-3"
              >
                Back
              </button>
            </div>
          ) : (
            <form onSubmit={
              loginMethod === "email" ? handleLogin :
              role === "patient" && loginMethod === "abha" ? handleMobileOTP :
              handleMobileOTP
            }>
              <select
                className="w-full border border-white/30 bg-white/20 text-white p-3 rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="patient" className="text-black">
                  Patient
                </option>

                <option value="donor" className="text-black">
                  Donor
                </option>

                <option value="hospital" className="text-black">
                  Hospital
                </option>

                <option value="admin" className="text-black">
                  Admin
                </option>
              </select>

              {role === "patient" && (
                <select
                  className="w-full border border-white/30 bg-white/20 text-white p-3 mt-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                  value={loginMethod}
                  onChange={(e) => setLoginMethod(e.target.value)}
                >
                  <option value="abha" className="text-black">
                    ABHA Number + OTP
                  </option>
                  <option value="mobile" className="text-black">
                    Mobile Number + OTP
                  </option>
                  <option value="email" className="text-black">
                    Email + Password
                  </option>
                </select>
              )}

              {role !== "patient" && (
                <select
                  className="w-full border border-white/30 bg-white/20 text-white p-3 mt-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                  value={loginMethod}
                  onChange={(e) => setLoginMethod(e.target.value)}
                >
                  <option value="email" className="text-black">
                    Email + Password
                  </option>
                  <option value="mobile" className="text-black">
                    Mobile Number + OTP
                  </option>
                </select>
              )}

              {loginMethod === "email" ? (
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-white/30 bg-white/20 text-white placeholder-white p-3 mt-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-white/30 bg-white/20 text-white placeholder-white p-3 mt-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </>
              ) : loginMethod === "mobile" || (role === "patient" && loginMethod === "abha") ? (
                <>
                  {role === "patient" && loginMethod === "abha" ? (
                    <input
                      type="text"
                      placeholder="ABHA Number (12-14 digits)"
                      className="w-full border border-white/30 bg-white/20 text-white placeholder-white p-3 mt-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                      value={abhaNumber}
                      onChange={(e) => setAbhaNumber(e.target.value)}
                      required
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Mobile Number"
                      className="w-full border border-white/30 bg-white/20 text-white placeholder-white p-3 mt-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      required
                    />
                  )}
                </>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white mt-5 py-3 rounded-2xl font-semibold hover:bg-red-700 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Processing..." : loginMethod === "email" ? "Login" : "Get OTP"}
              </button>
            </form>
          )}

          <p className="text-sm text-center text-white mt-5">
            Need urgent blood?{" "}
            <Link
              to="/emergency"
              className="text-red-300 hover:text-red-200 font-semibold"
            >
              Open emergency support
            </Link>
          </p>

          <p className="text-sm text-center text-white mt-3">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-red-300 hover:text-red-200 font-semibold"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;