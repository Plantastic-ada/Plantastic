import { z } from "zod";

export const createUserPlantSchema = z.object({
	plantId: z.number().positive(),
	nickname: z.string().nullable(),
	acquisitionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
	lastWatering: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
		.nullable(),
	picture: z.string(),
});

export type CreateUserPlantDTO = z.infer<typeof createUserPlantSchema>;
