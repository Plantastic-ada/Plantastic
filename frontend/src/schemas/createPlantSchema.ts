import { z } from "zod";

export const createPlantSchema = z.object({
  plantId: z.number().positive(),
  nickname: z.string().min(1).optional(),
  acquisitionDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  lastWatering: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format").optional(),
  picture: z.string(),
});

export type CreateUserPlantDTO = z.infer<typeof createPlantSchema>;
