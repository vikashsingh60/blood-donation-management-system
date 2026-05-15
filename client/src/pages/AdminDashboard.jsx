import { useNavigate } from "react-router-dom";
import NotificationPanel from "../components/NotificationPanel";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-red-600">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl"
          >
            Logout
          </button>
        </div>
        <p className="text-gray-600">Full admin access: manage users, analytics, and flagged requests.</p>
      </div>

      {/* Notifications */}
      <div className="mt-6">
        <NotificationPanel role="admin" userId={localStorage.getItem("userId")} />
      </div>
    </div>
  );
};

export default AdminDashboard;
