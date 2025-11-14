// Checks if the user is logged in, clears infos if logged out, retrieves users infos 

import type { UserPlant } from "./UserPlant";

export interface AuthContextType {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  plants: UserPlant[];
  refreshAuth: () => Promise<void>; 
  logout: () => Promise<void>;
  resetAuthState: () => void;
}
