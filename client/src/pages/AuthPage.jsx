import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

const initialRegisterData = {
  role: "donor",
  name: "",
  email: "",
  phone: "",
  password: "",
  bloodGroup: "",
  age: "",
  lastDonationDate: "",
  abhaNumber: "",
  diseaseDetails: "",
  bloodRequirement: "",
  hospitalName: "",
  hospitalType: "",
  hospitalLicense: "",
  address: "",
  contactNumber: ""
};

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [step, setStep] = useState("login");
  const [loginRole, setLoginRole] = useState("patient");
  const [loginMethod, setLoginMethod] = useState("abha");
  const [abha, setAbha] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpUserId, setOtpUserId] = useState(localStorage.getItem("otpUserId") || "");
  const [registerData, setRegisterData] = useState(initialRegisterData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.pathname === "/register") {
      setTab("register");
    } else {
      setTab("login");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (tab === "login") {
      setStep("login");
    }
  }, [tab]);

  useEffect(() => {
    if (loginRole === "patient") {
      setLoginMethod("abha");
    } else {
      setLoginMethod("email");
    }
  }, [loginRole]);

  const handleTabChange = (selectedTab) => {
    if (selectedTab === tab) return;
    setTab(selectedTab);
    setStep("login");
    if (selectedTab === "register") {
      navigate("/register", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const role = params.get("role");
    const error = params.get("error");

    if (error) {
      alert("Social login failed. Please try again.");
    }

    if (token) {
      localStorage.setItem("token", token);
      if (role) {
        localStorage.setItem("role", role);
      }
      params.delete("token");
      params.delete("role");
      params.delete("error");
      const nextRoute = role === "admin"
        ? "/admin"
        : role === "hospital"
          ? "/hospital"
          : role === "donor"
            ? "/donor"
            : "/dashboard";
      navigate(nextRoute, { replace: true });
    }
  }, [location.search, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (loginMethod === "email") {
        const res = await API.post("/api/auth/login", {
          email: loginEmail,
          password: loginPassword
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("userId", res.data.user._id);
        const nextRoute = res.data.user.role === "admin"
          ? "/admin"
          : res.data.user.role === "hospital"
            ? "/hospital"
            : res.data.user.role === "donor"
              ? "/donor"
              : "/dashboard";
        navigate(nextRoute, { replace: true });
      } else {
        const payload = loginMethod === "abha"
          ? { abhaNumber: abha }
          : { phone: mobileNumber };

        const res = await API.post("/api/auth/login", payload);
        setOtpUserId(res.data.userId);
        localStorage.setItem("otpUserId", res.data.userId);
        setStep("verify");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const storedUserId = otpUserId || localStorage.getItem("otpUserId");
      const res = await API.post("/api/auth/verify-otp", { userId: storedUserId, otp });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
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
      alert(error.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const {
      role,
      email,
      phone,
      abhaNumber,
      diseaseDetails,
      bloodRequirement,
      bloodGroup,
      age,
      address,
      hospitalName,
      hospitalType,
      hospitalLicense,
      contactNumber
    } = registerData;

    if (role === "patient") {
      if (!phone) {
        alert("Patient registration requires a phone number.");
        return;
      }
      if (!abhaNumber || !/^[0-9]{12,14}$/.test(abhaNumber)) {
        alert("Patient ABHA number must be 12-14 digits.");
        return;
      }
      if (!diseaseDetails || !bloodRequirement) {
        alert("Patient registration requires disease details and blood requirement.");
        return;
      }
    }

    if (role === "donor") {
      if (!bloodGroup || !age || !address) {
        alert("Donor registration requires blood group, age, and address.");
        return;
      }
      if (!email && !phone) {
        alert("Donor registration requires either email or phone.");
        return;
      }
    }

    if (role === "hospital") {
      if (!hospitalName || !hospitalType || !hospitalLicense || !address || !contactNumber) {
        alert("Hospital registration requires hospital name, type, license, address, and contact number.");
        return;
      }
    }

    setLoading(true);
    try {
      const payload = Object.fromEntries(
        Object.entries(registerData).filter(([, value]) => value !== "" && value !== null && value !== undefined)
      );
      await API.post("/api/auth/register", payload);
      alert("Registration successful. Please login to continue.");
      setRegisterData(initialRegisterData);
      handleTabChange("login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Registration failed. Please check the details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 xl:grid-cols-[1.15fr_0.95fr] items-center">
            <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-red-50 via-white to-rose-100 p-10 shadow-[0_40px_120px_rgba(252,74,74,0.15)] dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.18),_transparent_28%)]" />
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-red-200 opacity-40 blur-3xl dark:bg-red-500/20" />
              <div className="relative z-10 grid gap-8">
                <div className="max-w-xl">
                  <p className="inline-flex items-center rounded-full border border-red-200 bg-white/80 px-4 py-2 text-sm font-semibold text-red-700 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 dark:text-rose-300">
                    <span className="mr-2 text-xl">💉</span> Trusted blood matching for every emergency
                  </p>
                  <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
                    Fast, safe blood support with one login.
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
                    Access donors, hospitals and emergency blood requests from the same secure portal. Get instant ABHA login support, verify safely and start matching immediately.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[32px] border border-white/80 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Emergency ready</h3>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Open support for urgent requests and reach the nearest hospital instantly.</p>
                  </div>
                  <div className="rounded-[32px] border border-white/80 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Verified access</h3>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Patient ABHA or donor/hospital login with secure credential verification.</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[32px] bg-white/95 p-5 shadow-sm dark:bg-slate-900/90">
                    <p className="text-2xl font-bold text-red-600">+1.2k</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Verified donors</p>
                  </div>
                  <div className="rounded-[32px] bg-white/95 p-5 shadow-sm dark:bg-slate-900/90">
                    <p className="text-2xl font-bold text-red-600">98%</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Emergency response rate</p>
                  </div>
                  <div className="rounded-[32px] bg-white/95 p-5 shadow-sm dark:bg-slate-900/90">
                    <p className="text-2xl font-bold text-red-600">24/7</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Hospital network support</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[40px] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:bg-slate-950">
              <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Account access</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">Login or Register</h2>
                </div>
                <div className="inline-flex rounded-full bg-slate-100 p-1 text-sm dark:bg-slate-800">
                  <button
                    onClick={() => handleTabChange("login")}
                    className={`rounded-full px-5 py-2 transition ${tab === "login" ? "bg-red-600 text-white shadow-lg" : "text-slate-600 hover:text-red-600 dark:text-slate-300"}`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleTabChange("register")}
                    className={`rounded-full px-5 py-2 transition ${tab === "register" ? "bg-red-600 text-white shadow-lg" : "text-slate-600 hover:text-red-600 dark:text-slate-300"}`}
                  >
                    Register
                  </button>
                </div>
              </div>

              <div className="mb-6 text-center text-sm text-slate-500 dark:text-slate-400">
                Secure access powered by blood donation workflow and ABHA-based patient verification.
              </div>

              {tab === "login" ? (
                <div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                    <form onSubmit={step === "verify" ? handleVerifyOTP : handleLogin} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">User role</label>
                          <select
                            value={loginRole}
                            onChange={(e) => setLoginRole(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                          >
                            <option value="patient">Patient</option>
                            <option value="donor">Donor</option>
                            <option value="hospital">Hospital</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Authentication method</label>
                          <select
                            value={loginMethod}
                            onChange={(e) => setLoginMethod(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                          >
                            {loginRole === "patient" && <option value="abha">ABHA + OTP</option>}
                            <option value="email">Email + Password</option>
                            <option value="mobile">Mobile Number + OTP</option>
                          </select>
                        </div>
                      </div>

                      {step !== "verify" && (
                        loginMethod === "abha" ? (
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">ABHA Card Number</label>
                            <input
                              value={abha}
                              onChange={(e) => setAbha(e.target.value)}
                              placeholder="Enter your ABHA number"
                              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                              required
                            />
                          </div>
                        ) : loginMethod === "mobile" ? (
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Mobile number</label>
                            <input
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              placeholder="Enter your phone number"
                              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                              required
                            />
                          </div>
                        ) : (
                          <>
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Email address</label>
                              <input
                                type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                required
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                              <input
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                required
                              />
                            </div>
                          </>
                        )
                      )}

                      {step === "verify" ? (
                        <>
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">OTP code</label>
                            <input
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              placeholder="Enter OTP"
                              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-3xl bg-red-600 px-5 py-4 text-base font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {loading ? "Verifying..." : "Verify OTP"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setStep("login");
                              setOtp("");
                            }}
                            className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-base font-semibold text-slate-700 transition hover:border-red-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                          >
                            Back to login
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-3xl bg-red-600 px-5 py-4 text-base font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {loading ? "Loading..." : loginRole === "patient" ? "Send OTP" : "Login"}
                          </button>
                          <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                            {loginMethod === "email" && "Use email and password to sign in."}
                            {loginMethod === "mobile" && "Enter your registered mobile number to receive an OTP."}
                            {loginMethod === "abha" && "Patients use ABHA Number to receive an OTP."}
                          </p>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              ) : (
                <div>
                  <form onSubmit={handleRegister} className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Select role</label>
                      <select
                        name="role"
                        value={registerData.role}
                        onChange={handleRegisterChange}
                        className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      >
                        <option value="patient">Patient</option>
                        <option value="donor">Donor</option>
                        <option value="hospital">Hospital</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Full name</label>
                      <input
                        name="name"
                        value={registerData.name}
                        onChange={handleRegisterChange}
                        placeholder="Your full name"
                        className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                        required
                      />
                    </div>

                    {registerData.role !== "hospital" ? (
                      <>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Email address</label>
                          <input
                            name="email"
                            type="email"
                            value={registerData.email}
                            onChange={handleRegisterChange}
                            placeholder="you@example.com"
                            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required={registerData.role === "hospital"}
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Phone number</label>
                          <input
                            name="phone"
                            value={registerData.phone}
                            onChange={handleRegisterChange}
                            placeholder="Enter your phone"
                            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required={registerData.role === "patient"}
                          />
                        </div>
                        {registerData.role === "donor" && (
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Donor registration needs at least one contact method: email or phone.
                          </p>
                        )}
                        {registerData.role === "patient" && (
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Patient registration requires a phone number for OTP verification.
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Email address</label>
                          <input
                            name="email"
                            type="email"
                            value={registerData.email}
                            onChange={handleRegisterChange}
                            placeholder="hospital email"
                            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                      <input
                        name="password"
                        type="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        placeholder="Create a strong password"
                        className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                        required
                      />
                    </div>

                    {registerData.role === "patient" && (
                      <>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">ABHA Card Number</label>
                          <input
                            name="abhaNumber"
                            value={registerData.abhaNumber}
                            onChange={handleRegisterChange}
                            placeholder="12-14 digit ABHA number"
                            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Health details</label>
                          <input
                            name="diseaseDetails"
                            value={registerData.diseaseDetails}
                            onChange={handleRegisterChange}
                            placeholder="Disease details"
                            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Blood requirement</label>
                          <input
                            name="bloodRequirement"
                            value={registerData.bloodRequirement}
                            onChange={handleRegisterChange}
                            placeholder="Required blood details"
                            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required
                          />
                        </div>
                      </>
                    )}

                    {registerData.role === "donor" && (
                      <>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Blood group</label>
                          <select
                            name="bloodGroup"
                            value={registerData.bloodGroup}
                            onChange={handleRegisterChange}
                            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required
                          >
                            <option value="">Select blood group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                          </select>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Age</label>
                            <input
                              name="age"
                              type="number"
                              min="18"
                              value={registerData.age}
                              onChange={handleRegisterChange}
                              placeholder="Your age"
                              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                              required
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Last donation</label>
                            <input
                              name="lastDonationDate"
                              type="date"
                              value={registerData.lastDonationDate}
                              onChange={handleRegisterChange}
                              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Address</label>
                          <input
                            name="address"
                            value={registerData.address}
                            onChange={handleRegisterChange}
                            placeholder="City, state, street"
                            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required
                          />
                        </div>
                      </>
                    )}

                    {registerData.role === "hospital" && (
                      <>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Hospital Name</label>
                          <input
                            name="hospitalName"
                            value={registerData.hospitalName}
                            onChange={handleRegisterChange}
                            placeholder="Hospital or clinic name"
                            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required
                          />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Hospital type</label>
                            <select
                              name="hospitalType"
                              value={registerData.hospitalType}
                              onChange={handleRegisterChange}
                              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                              required
                            >
                              <option value="">Select type</option>
                              <option value="private">Private</option>
                              <option value="government">Government</option>
                              <option value="aiims">AIIMS / Medical College</option>
                            </select>
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">License number</label>
                            <input
                              name="hospitalLicense"
                              value={registerData.hospitalLicense}
                              onChange={handleRegisterChange}
                              placeholder="Medical license number"
                              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Address</label>
                          <input
                            name="address"
                            value={registerData.address}
                            onChange={handleRegisterChange}
                            placeholder="Full hospital address"
                            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Contact number</label>
                          <input
                            name="contactNumber"
                            value={registerData.contactNumber}
                            onChange={handleRegisterChange}
                            placeholder="Hospital phone number"
                            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required
                          />
                        </div>
                      </>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-3xl bg-red-600 px-5 py-4 text-base font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? "Registering..." : "Create account"}
                    </button>
                  </form>
                </div>
              )}

              <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                {tab === "login" ? (
                  <>
                    New here? <button type="button" onClick={() => handleTabChange("register")} className="font-semibold text-red-600 hover:text-red-400">Create an account</button>
                  </>
                ) : (
                  <>
                    Already registered? <button type="button" onClick={() => handleTabChange("login")} className="font-semibold text-red-600 hover:text-red-400">Sign in</button>
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
