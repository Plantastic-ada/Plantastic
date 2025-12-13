export interface Plant {
	id: number;
	commonName: string;
	otherName: string;
	scientificName: string;
	family: string;
	description: string;
	careLevel: string;
	imageUrl: string;
	watering: string;
	soil: string;
	light: string;
	growthRate: string;
	poisonousToPets: boolean;
	wateringDetails?: string;
	sunlightDetails?: string;
	pruningDetails?: string;
}
