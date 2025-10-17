import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.email("Invalid email format"),
    username: z
      .string()
      .min(3, "Must be at least 3 characters"),
    password: z
      .string()
      .min(8, "Your password is too short")
      .regex(
        /[A-Z]/,
        "Your password must contain at least one uppercase letter"
      )
      .regex(
        /[a-z]/,
        "Your password must contain at least one lowercase letter"
      )
      .regex(/[0-9]/, "Your password must contain at least one digit")
      .regex(
        /[#?!@$ %^&*-]/,
        "Your password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
