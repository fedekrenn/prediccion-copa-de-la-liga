import { z } from "zod";

export const ValidUser = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(10, { message: "Email must be at least 10 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
