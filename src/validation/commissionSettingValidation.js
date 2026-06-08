import { z } from "zod";

export const commissionSettingValidation = z.object({
  serviceProviderId: z.string().min(1),
  value: z.coerce.number(),
  mode: z.enum(["NONE", "COMMISSION", "SURCHARGE"]),
  type: z.enum(["NONE", "FIXED", "PERCENTAGE"]),
  scope: z.enum(["USER", "PACKAGE"]),
  targetUserId: z.string().optional(),
  packageId: z.string().optional(),
});
