import { z } from "zod"; 

export const loginSchema = z.object({
  pseudoOrEmail: z.string().min(3),
  password: z.string(),
})

export type LoginFormData = z.infer<typeof loginSchema>;