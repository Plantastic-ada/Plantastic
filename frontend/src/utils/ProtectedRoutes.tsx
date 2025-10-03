import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    if (isAuthenticated === null) {
      checkAuth();
    }
  }, [isAuthenticated, checkAuth]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">⏳ Loading...</p>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;




// import { Outlet, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchAPI } from "../utils/api";

// // Set up for navigation to check mocked token
// const ProtectedRoutes = () => {
//   const navigate = useNavigate();
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     const verifyToken = async () => {
// // CHECKS IF TOKEN IN LOCAL STORAGE, FUNCTION TO REMOVE LATER
//       if (localStorage.getItem("authToken")) {
//         console.warn(
//           "TOKEN STILL PRESENT IN LOCAL STORAGE !"
//         );
//         localStorage.removeItem("authToken");
//       }

//       try {
//         // const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
//         const response = await fetchAPI("/auth/login",{
//           method: "GET",
//         });
//         if (!response.ok) {
//           navigate("/login", { replace: true });
//           console.log("Protected routes", response);
//           return;
//         }
//       } catch (error) {
//         console.error("Token verification failed: ", error);
//         navigate("/login", { replace: true });
//       } finally {
//         setChecking(false);
//       }
//     };
//     verifyToken();
//   }, [navigate]);

//   if (checking) return <p>⏳ Checking authentication...</p>;
//   return <Outlet />;
// };

// export default ProtectedRoutes;
