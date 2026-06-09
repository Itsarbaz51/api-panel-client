import { z } from "zod";

export const commissionSettingValidation = z
  .object({
    serviceProviderId: z.string().min(1, "Service Provider is required"),

    value: z.coerce.number(),

    mode: z.enum(["NONE", "COMMISSION", "SURCHARGE"]),

    type: z.enum(["NONE", "FLAT", "PERCENTAGE"]),

    scope: z.enum(["USER", "PACKAGE"]),

    targetUserId: z.string().optional(),

    packageId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.scope === "USER" && !data.targetUserId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["targetUserId"],
        message: "User is required",
      });
    }

    if (data.scope === "PACKAGE" && !data.packageId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["packageId"],
        message: "Package is required",
      });
    }

    if (data.targetUserId && data.packageId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["targetUserId"],
        message: "Only one of User or Package can be selected",
      });
    }
  });
