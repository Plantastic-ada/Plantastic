import type { PlantSummary } from "./PlantSummary";

export type EncyclopediaContextType = {
	encyclopediaPlants: PlantSummary[];
	isLoading: boolean;
	refreshEncyclopedia: () => Promise<void>;
	addPlantToEncyclopedia: (plant: PlantSummary) => void;
};
