import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../utils/api";
import type { AuthContextType } from "../types/AuthContextType";
import type { UserPlant } from "../types/UserPlant";
import type { ApiPlantDto } from "../dto/ApiPlantDto";
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [plants, setPlants] = useState<UserPlant[]>([]);
  const navigate = useNavigate();

  const verifyInitialAuth = async () => {
    try {
      const response = await fetchAPI("/me/my-digital-garden", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        const transformedPlants = data.map((plant: ApiPlantDto) => {
          return {
            id: plant.id,
            nickname: plant.nickname,
            commonName: plant.commonName,
            lastWatering: plant.lastWatering,
            nextWatering: plant.nextWatering,
            imageUrl: plant.userPlantImageUrl || plant.plantImageUrl,
          };
        });
        setPlants(transformedPlants);
        setPlants(data || []);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setPlants([]);
      }
    } catch (error) {
      console.error("Auth error:", error);
      setIsAuthenticated(false);
      setPlants([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyInitialAuth();
  }, []);

  const refreshAuth = async () => {
    setIsLoading(true);
    await verifyInitialAuth();
  };

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
      localStorage.removeItem("authToken");
      setPlants([]);
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    }
  };

  const resetAuthState = () => {
    setIsAuthenticated(null);
    setPlants([]);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        plants,
        refreshAuth,
        logout,
        resetAuthState,
      }}
    >
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
