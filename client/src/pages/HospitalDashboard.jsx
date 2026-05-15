import { useNavigate } from "react-router-dom";
import NotificationPanel from "../components/NotificationPanel";

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-red-600">Hospital Dashboard</h1>
            <p className="mt-2 text-gray-600 dark:text-slate-300">
              Manage blood stock, patient requests and emergency response from one place.
            </p>
          </div>
          <button
            onClick={logout}
            className="w-full sm:w-auto bg-red-500 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Notifications */}
        <div className="mb-8">
          <NotificationPanel role="hospital" userId={localStorage.getItem("userId")} />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.3em] text-red-500">Current Inventory</p>
            <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-slate-100">320+</h2>
            <p className="mt-2 text-gray-600 dark:text-slate-300">Units available across blood groups</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.3em] text-red-500">Active Requests</p>
            <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-slate-100">24</h2>
            <p className="mt-2 text-gray-600 dark:text-slate-300">Pending patient and emergency approvals</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.3em] text-red-500">Emergency Alerts</p>
            <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-slate-100">8</h2>
            <p className="mt-2 text-gray-600 dark:text-slate-300">High-priority blood requests in progress</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Hospital Actions</h2>
            <p className="mt-3 text-gray-600 dark:text-slate-300">
              Quickly approve incoming requests, update blood stock and communicate with donors.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button className="rounded-2xl border border-red-500 px-5 py-3 text-red-600 font-semibold hover:bg-red-500 hover:text-white transition">
                Update Stock
              </button>
              <button onClick={() => navigate('/emergency')} className="rounded-2xl bg-red-600 px-5 py-3 text-white font-semibold hover:bg-red-700 transition">
                View Emergency Requests
              </button>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">AI Support</h2>
            <p className="mt-3 text-gray-600 dark:text-slate-300">
              Hospital teams can connect with the nearest compatible donors instantly with priority matching.
            </p>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-gray-200 p-4 dark:border-slate-700">
                <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">Blood compatibility</p>
                <p className="text-sm text-gray-500 dark:text-slate-300">Real-time compatibility suggestions for urgent cases.</p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-4 dark:border-slate-700">
                <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">Live response</p>
                <p className="text-sm text-gray-500 dark:text-slate-300">Track donor availability and request accept/reject status.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
