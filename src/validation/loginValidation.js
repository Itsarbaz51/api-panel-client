import { z } from "zod";

export const loginValidation = z.object({
  identify: z.string().min(1, "Email or Username is required"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordValidation = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
