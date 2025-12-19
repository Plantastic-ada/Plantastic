import { z } from "zod";

export const addPlantToEncyclopediaSchema = z.object({
	commonName: z.string().min(1, "Common name is required"),
	scientificName: z.string().min(1, "Scientific name is required"),
	otherName: z.string().optional(),
	family: z.string(),
	description: z.string(),
	careLevel: z.enum(["Easy", "Medium", "Hard"]),
	watering: z.enum(["Frequent", "Average", "Minimum"]),
	soil: z.string().optional(),
	lightExposure: z.string(),
	growthRate: z.string().optional(),
	poisonousToPet: z.boolean(),
	wateringDetails: z.string().optional(),
	sunlightDetails: z.string().optional(),
	pruningDetails: z.string().optional(),
});

export type AddPlantToEncyclopediaDTO = z.infer<typeof addPlantToEncyclopediaSchema>;
