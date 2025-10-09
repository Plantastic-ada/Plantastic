import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../utils/api";

interface AuthContextType {
  isAuthenticated: boolean | null;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  console.log("🟢🟢🟢 AUTH PROVIDER RENDERED 🟢🟢🟢");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const checkAuth = async () => {
    console.log("🔍 checkAuth - Starting...");

    try {
      const response = await fetchAPI("/me/my-digital-garden", {
        method: "GET",
      });

      console.log("📡 checkAuth - Response status:", response.status);

      if (response.status === 401) {
        console.log("❌ checkAuth - Unauthorized (401)");
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
        return;
      }

      if (response.ok) {
        console.log("✅ checkAuth - Authenticated");
        setIsAuthenticated(true);
      } else {
        console.log("⚠️ checkAuth - Unexpected status:", response.status);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("❌ checkAuth - Error:", error);
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    }
  };

  const logout = () => {
    console.log("🚪 Logging out...");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
