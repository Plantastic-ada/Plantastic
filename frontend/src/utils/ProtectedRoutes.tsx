import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Set up for navigation to check mocked token
const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
// CHECKS IF TOKEN IN LOCAL STORAGE, FUNCTION TO REMOVE LATER
      if (localStorage.getItem("authToken")) {
        console.warn(
          "⚠️ TOKEN STILL PRESENT IN LOCAL STORAGE !"
        );
        localStorage.removeItem("authToken");
      }

      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include", //check for token is in HttpOnly cookie
        });
        if (!response.ok) {
          navigate("/login", { replace: true });
          return;
        }
      } catch (error) {
        console.error("Token verification failed: ", error);
        navigate("/login", { replace: true });
      } finally {
        setChecking(false);
      }
    };
    verifyToken();
  }, [navigate]);

  if (checking) return <p>⏳ Checking authentication...</p>;
  return <Outlet />;
};

export default ProtectedRoutes;
