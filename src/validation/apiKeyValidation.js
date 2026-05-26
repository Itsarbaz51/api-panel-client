import { z } from "zod";

export const apiKeyValidation = z.object({
  name: z.string().min(2, "Name required").max(100).nullable().optional(),

  allowedIps: z
    .array(
      z
        .string()
        .trim()
        .refine(
          (ip) =>
            /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/.test(
              ip,
            ),
          {
            message: "Invalid IPv4 address",
          },
        ),
    )
    .max(100)
    .optional(),

  maxIpLimit: z.coerce
    .number()
    .min(1, "Minimum 1")
    .max(100, "Maximum 100")
    .optional(),

  remarks: z.string().max(500).nullable().optional(),

  isActive: z.boolean().optional(),
});
