import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../utils/api";
import type { AuthContextType } from "../types/AuthContextType";
import type { UserPlant } from "../types/UserPlant";

/* eslint-disable react-refresh/only-export-components */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  // Returns data
  const checkAuth = async (): Promise<UserPlant[] | null> => {

    try {
      const response = await fetchAPI("/me/my-digital-garden", {
        method: "GET",
      });

      // UNAUTHORIZED RESPONSE
      if (response.status === 401) {
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
        return null;
      }

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        return data; // returns plants but do not stores them
      } else {
        setIsAuthenticated(false);
        return null;
      }
    } catch (_error) {
      console.error("checkAuth - Error:", _error); 
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
      return null;
    }
  };

  // LOGOUT 
  const logout = async (): Promise<void> => {
    console.debug("Logging out...");

    try {
      const response = await fetchAPI("/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        console.debug("Logout successful");
      } else {
        console.warn("Logout returned non-OK status:", response.status);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // CLEANS LOCAL STORAGE EVEN IF IT'S EMPTY
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    }
  };

  // RESET AUTH STATE TO NULL AND NOT FALSE
  const resetAuthState = () => {
    setIsAuthenticated(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, logout, resetAuthState }}>
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
