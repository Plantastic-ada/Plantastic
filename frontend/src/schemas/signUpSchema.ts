import { z } from "zod";
import { sanitize } from "../utils/sanitize";

export const signUpSchema = z.object({
  pseudo: z
    .string()
    .min(3, "Must be at least 3 characters")
    .transform(sanitize),
  email: z.email("Invalid email format").transform(sanitize),
  password: z
    .string()
    .min(8, "Your password is too short")
    .regex(/[A-Z]/, "Your password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Your password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Your password must contain at least one digit")
    .regex(
      /[#?!@$ %^&*-]/,
      "Your password must contain at least one special character"
    ),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;