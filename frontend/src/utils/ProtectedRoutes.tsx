import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  console.error('🔵🔵🔵 PROTECTED ROUTES CALLED 🔵🔵🔵'); 
  alert('ProtectedRoutes appelé !');
  const { isAuthenticated, checkAuth } = useAuth();

  // 🔍 DEBUGGAGE
  console.log('🔒 ProtectedRoutes - isAuthenticated:', isAuthenticated);
  console.log('🔒 ProtectedRoutes - Type:', typeof isAuthenticated);

  useEffect(() => {
    console.log('🔄 useEffect - Checking auth...');
    if (isAuthenticated === null) {
      checkAuth();
    }
  }, [isAuthenticated, checkAuth]);

  // Loading state
  if (isAuthenticated === null) {
    console.log('⏳ Loading auth state...');
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">⏳ Loading...</p>
      </div>
    );
  }

  // ✅ CORRECTION : Redirection si pas authentifié
  if (!isAuthenticated) {
    console.log('❌ Not authenticated - Redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('✅ Authenticated - Rendering protected content');
  return <Outlet />;
};

export default ProtectedRoutes;