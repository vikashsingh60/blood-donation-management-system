import React from "react";
import { useNavigate } from "react-router-dom";

import heroImage from "../assets/Hero.jpeg";
import NotificationPanel from "../components/NotificationPanel";

const DonorDashboard = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed p-6"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <div className="w-full flex items-center justify-between bg-black/40 backdrop-blur-lg border border-white/10 rounded-3xl px-6 py-5 shadow-2xl">
          <div>
            <h1 className="text-4xl font-bold text-red-500">
              Blood Donation System
            </h1>

            <p className="text-gray-200 text-sm mt-1">
              Smart Donor Dashboard
            </p>
          </div>

          <button
            onClick={logoutHandler}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg"
          >
            Logout
          </button>
        </div>

        {/* Notifications */}
        <div className="mt-6">
          <NotificationPanel role="donor" userId={localStorage.getItem("userId")} />
        </div>

        {/* Hero Section */}
        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          {/* Welcome Card */}
          <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-3xl p-10 shadow-2xl">
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Welcome Donor ❤️
            </h2>

            <p className="text-white text-lg leading-relaxed">
              Thank you for being a lifesaver. Manage your blood donation
              activity, availability, emergency requests, and donation history
              directly from your dashboard.
            </p>

            <button className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg">
              Donate Now
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-3xl p-10 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-8">
              Donor Profile
            </h3>

            <div className="space-y-5 text-white text-lg">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-300">Name</span>
                <span className="font-semibold">Vikash</span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-300">Blood Group</span>
                <span className="font-semibold">O+</span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-300">Age</span>
                <span className="font-semibold">19</span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-300">Last Donation</span>
                <span className="font-semibold">04 Feb 2025</span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-300">Status</span>

                <span className="text-green-400 font-bold">
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-gray-300 text-lg font-semibold">
              Total Donations
            </h3>

            <p className="text-6xl font-bold text-red-500 mt-5">
              12
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-gray-300 text-lg font-semibold">
              Lives Saved
            </h3>

            <p className="text-6xl font-bold text-green-400 mt-5">
              36
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-gray-300 text-lg font-semibold">
              Reward Points
            </h3>

            <p className="text-6xl font-bold text-yellow-300 mt-5">
              250
            </p>
          </div>
        </div>

        {/* Emergency Requests */}
        <div className="mt-10 bg-black/40 backdrop-blur-lg border border-white/10 rounded-3xl p-10 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-white">
              Emergency Requests
            </h2>

            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl transition font-semibold">
              View All
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Request Card */}
            <div className="bg-white/10 rounded-3xl p-6 border border-white/10 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-white">
                  City Hospital
                </h3>

                <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Urgent
                </span>
              </div>

              <p className="text-gray-200 mt-4 text-lg">
                O+ blood required for emergency surgery.
              </p>

              <button className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl transition font-semibold">
                Accept Request
              </button>
            </div>

            {/* Request Card */}
            <div className="bg-white/10 rounded-3xl p-6 border border-white/10 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-white">
                  AIIMS Delhi
                </h3>

                <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Medium
                </span>
              </div>

              <p className="text-gray-200 mt-4 text-lg">
                A+ donor needed for accident patient.
              </p>

              <button className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl transition font-semibold">
                Accept Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;