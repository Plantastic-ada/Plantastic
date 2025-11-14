import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">⏳ Loading...</p>
      </div>
    );
  }

  if (isAuthenticated === false) {
    // For logout
    return <Navigate to="/login" replace />;
  }
  // If null or true, directs to Home
  return <Outlet />;
};

export default ProtectedRoutes;
