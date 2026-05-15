import { useNavigate } from "react-router-dom";
import NotificationPanel from "../components/NotificationPanel";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const userId = localStorage.getItem("userId"); // Assuming we store userId in localStorage

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl space-y-6">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-8 mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-red-600">Patient Dashboard</h1>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>
          <p className="text-gray-600">Request blood, track ABHA-based assistance, and view emergency support.</p>
        </div>

        <NotificationPanel role="patient" userId={userId} />
      </div>
    </div>
  );
};

export default PatientDashboard;
