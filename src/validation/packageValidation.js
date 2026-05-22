import { z } from "zod";

export const packageValidation = z.object({
  name: z.string().min(1, "Package name is required"),
});
