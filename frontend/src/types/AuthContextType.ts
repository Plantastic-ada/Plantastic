// Checks if the user is logged in, clears infos if logged out, retrieves users infos
import type { UserPlant } from "./UserPlant";
import type { AuthUser } from "./AuthUser";

export interface AuthContextType {
	isAuthenticated: boolean | null;
	isLoading: boolean;
	plants: UserPlant[];
	user: AuthUser | null;
	isAdmin: boolean | null;
	refreshAuth: () => Promise<void>;
	logout: () => Promise<void>;
	resetAuthState: () => void;
}
