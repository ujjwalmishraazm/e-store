// lib/validation/registerSchema.ts
import { z } from "zod";

const usernameRegex = /^[A-Za-z0-9_]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." })
      .max(15, { message: "Username must be at most 15 characters." })
      .trim()
      .regex(usernameRegex, {
        message: "Username can only contain letters, numbers and underscores.",
      }),
    email: z.string().trim().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .max(12, { message: "Password must be at most 12 characters long." })
      .regex(passwordRegex, {
        message:
          "Password must include uppercase, lowercase, number and special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], 
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export default registerSchema;
