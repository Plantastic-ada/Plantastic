import { createContext, useContext, type ReactNode, useState } from "react";
import type { EncyclopediaContextType } from "../types/EncyclopediaContextType";
import type { PlantSummary } from "../types/PlantSummary";
import { useAuth } from "./AuthContext";

export const EncyclopediaContext = createContext<EncyclopediaContextType | undefined>(undefined);

export default function EncyclopediaProvider({ children }: { children: ReactNode }) {
	const { refreshAuth, isLoading } = useAuth();

	const [encyclopediaPlants, setEncyclopediaPlants] = useState<PlantSummary[]>([]);

	const refreshEncyclopedia = async () => {
		await refreshAuth();
	};

	const addPlantToEncyclopedia = (plant: PlantSummary) => {
		setEncyclopediaPlants((prev) => [plant, ...prev]);
	};

	return (
		<EncyclopediaContext.Provider
			value={{
				encyclopediaPlants,
				isLoading,
				refreshEncyclopedia,
				addPlantToEncyclopedia,
			}}
		>
			{children}
		</EncyclopediaContext.Provider>
	);
}

export const useEncyclopedia = () => {
	const context = useContext(EncyclopediaContext);
	if (!context) {
		throw new Error("useEncyclopedia must be used within EncyclopediaProvider");
	}
	return context;
};
