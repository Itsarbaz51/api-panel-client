import { z } from "zod";

export const serviceValidation = z.object({
  name: z.string().min(2, "Name is required"),
  code: z.string().min(2, "Code is required"),
  isActive: z.boolean().default(true),
});
