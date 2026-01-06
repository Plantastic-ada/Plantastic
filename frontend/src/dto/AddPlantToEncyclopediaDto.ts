export interface AddPlantToEncyclopediaDto {
	commonName: string;
	otherName?: string;
	scientificName: string;
	family: string;
	description: string;
	careLevel: "Easy" | "Medium" | "Hard";
	watering: "Frequent" | "Average" | "Minimum";
	soil?: string;
	lightExposure: string;
	growthRate?: string;
	poisonousToPet: boolean;
	wateringDetails?: string;
	sunlightDetails?: string;
	pruningDetails?: string;
}
