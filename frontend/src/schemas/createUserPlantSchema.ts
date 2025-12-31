import { z } from "zod";

export const createUserPlantSchema = z.object({
  plantId: z.number().positive(),
  nickname: z.string().nullable(),
  acquisitionDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .refine((date) => new Date(date) <= new Date(), {
      message: "Acquisition date cannot be in the future",
    }),
  lastWatering: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .refine((date) => new Date(date) <= new Date(), {
      message: "Acquisition date cannot be in the future",
    })
    .optional()
    .nullable(),
  picture: z.string(),
});

export type CreateUserPlantDTO = z.infer<typeof createUserPlantSchema>;
