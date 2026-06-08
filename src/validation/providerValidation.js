import { z } from "zod";

export const providerValidation = z.object({
  name: z.string().min(2, "Name is required"),

  code: z.string().min(2, "Code is required"),

  type: z.string().optional(),

  isActive: z.boolean().default(true),
});