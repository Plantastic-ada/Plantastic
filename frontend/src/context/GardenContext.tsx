import { createContext, useContext,  type ReactNode } from "react";
import type { GardenContextType } from "../types/GardenContextType";
import { useAuth } from "./AuthContext";

export const GardenContext = createContext<GardenContextType | undefined>(
  undefined
);

export default function GardenProvider({ children }: { children: ReactNode }) {
  const {refreshAuth, isLoading, plants} = useAuth()
  const refreshGarden = async () => {
    await refreshAuth()
};

  return (
    <GardenContext.Provider
      value={{
        refreshGarden, isLoading, plants
      }}
    >
        {children}
    </GardenContext.Provider>
  );
}

export const useGarden = () => {
  const context = useContext(GardenContext);
  if (!context) {
    throw new Error("useGarden must be used within GardenProvider");
  }
  return context;
};
