import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import VerifyOTP from "./pages/VerifyOTP";
import FindBlood from "./pages/FindBlood";
import Donate from "./pages/Donate";
import Footer from "./components/Footer";

/* FEATURE PAGES */
import AIMatching from "./pages/AIMatching";
import LiveLocation from "./pages/LiveLocation";
import NearbyHospitals from "./pages/NearbyHospitals";
import EmergencyRoute from "./pages/EmergencyRoute";
import EmergencyRequest from "./pages/EmergencyRequest";
import MatchedDonors from "./pages/MatchedDonors";

/* 🔒 PROTECTED ROUTE */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  useEffect(() => {
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    };

    let timer = null;
    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(logout, 30 * 60 * 1000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);
    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="flex-1">
          <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/verify" element={<VerifyOTP />} />
        <Route path="/find-blood" element={<FindBlood />} />
        <Route path="/donate" element={<Donate />} />

        {/* FEATURE ROUTES */}
        <Route path="/ai-matching" element={<AIMatching />} />
        <Route path="/live-location" element={<LiveLocation />} />
        <Route path="/hospitals" element={<NearbyHospitals />} />
        <Route path="/emergency" element={<EmergencyRoute />} />
        <Route path="/emergency-request" element={<EmergencyRequest />} />
        <Route path="/matched-donors" element={<MatchedDonors />} />

        {/* PROTECTED ROUTES */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/patient" element={<ProtectedRoute allowedRoles={["patient"]}><PatientDashboard /></ProtectedRoute>} />
        <Route path="/donor" element={<ProtectedRoute allowedRoles={["donor"]}><DonorDashboard /></ProtectedRoute>} />
        <Route path="/hospital" element={<ProtectedRoute allowedRoles={["hospital"]}><HospitalDashboard /></ProtectedRoute>} />
      </Routes>
    </div>
    <Footer />
  </div>
</BrowserRouter>
  );
}

export default App;