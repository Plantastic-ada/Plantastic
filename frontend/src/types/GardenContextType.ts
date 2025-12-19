import type { UserPlant } from "./UserPlant";

export interface GardenContextType {
  plants: UserPlant[];
  refreshGarden: () => Promise <void>;
  isLoading: boolean;
}
