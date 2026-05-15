import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") navigate("/admin");
    else if (role === "hospital") navigate("/hospital");
    else if (role === "donor") navigate("/donor");
    else if (role === "patient") navigate("/patient");
    else navigate("/login");
  }, [navigate]);

  return null;
};

export default Dashboard; // ✅ ये जरूरी है