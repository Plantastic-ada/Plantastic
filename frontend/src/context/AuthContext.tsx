import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../utils/api";
import type { AuthContextType } from "../types/AuthContextType";
import type { UserPlant } from "../types/UserPlant";
import type { AuthUser } from "../types/AuthUser";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [plants, setPlants] = useState<UserPlant[]>([]);
	const [user, setUser] = useState<AuthUser | null>(null);
	const isAdmin = user?.role === "ROLE_ADMIN";
	const navigate = useNavigate();

	const verifyInitialAuth = async () => {
		try {
			const response = await fetchAPI("/me/my-digital-garden", {
				method: "GET",
			});
			if (response.ok) {
				const data = await response.json();
				setUser(data.user);
				setPlants(data.digitalGarden || []);
				setIsAuthenticated(true);
			} else {
				setUser(null);
				setIsAuthenticated(false);
				setPlants([]);
			}
		} catch (error) {
			console.error("Auth error:", error);
			setUser(null);
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
			setUser(null);
			setPlants([]);
			setIsAuthenticated(false);
			navigate("/login", { replace: true });
		}
	};

	const resetAuthState = () => {
		setIsAuthenticated(null);
		setUser(null);
		setPlants([]);
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				isLoading,
				plants,
				user,
				isAdmin,
				refreshAuth,
				logout,
				resetAuthState,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
};
