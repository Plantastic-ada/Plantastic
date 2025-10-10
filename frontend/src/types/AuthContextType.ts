// Checks if the user is logged in, clears infos if logged out, retrieves users infos 

import type { UserPlant } from "./UserPlant";

export interface AuthContextType {
  isAuthenticated: boolean | null;
  checkAuth: () => Promise<UserPlant[] | null>;
  logout: () => Promise<void>;
  resetAuthState: () => void;
}
