import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string({message:"required"})
    .email({ message: "Must be a valid email address" }),
})