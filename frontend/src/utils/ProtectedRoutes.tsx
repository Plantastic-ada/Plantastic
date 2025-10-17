import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === false) {
    // For logout
    return <Navigate to="/login" replace />;
  }
  // If nul or true, directs to Home
  return <Outlet />;
};

export default ProtectedRoutes;