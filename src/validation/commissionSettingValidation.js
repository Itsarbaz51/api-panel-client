import { z } from "zod";

export const commissionSettingValidation = z
  .object({
    // TARGET
    scope: z.enum(["USER", "PACKAGE"]),

    targetUserId: z.string().optional(),

    packageId: z.string().optional(),

    serviceProviderId: z.string().min(1, "Service Provider is required"),

    // BASIC
    isActive: z.boolean().optional(),

    supportsSlab: z.boolean().optional(),

    supportPaymentMethod: z.boolean().optional(),

    // PAYMENT
    paymentMethod: z.string().optional(),

    network: z.string().optional(),

    // BBPS
    category: z.string().optional(),

    operator: z.string().optional(),

    operatorCode: z.string().optional(),

    // DMT
    bankCode: z.string().optional(),

    transactionType: z.string().optional(),

    // SLAB
    minAmount: z.coerce.number().optional(),

    maxAmount: z.coerce.number().optional(),

    // COMMISSION
    mode: z.enum(["NONE", "COMMISSION", "SURCHARGE"]),

    type: z.enum(["NONE", "FLAT", "PERCENTAGE"]),

    value: z.coerce.number(),

    // TAX
    applyTDS: z.boolean().optional(),

    tdsPercent: z.coerce.number().optional(),

    applyGST: z.boolean().optional(),

    gstPercent: z.coerce.number().optional(),
  })
  .superRefine((data, ctx) => {
    // USER VALIDATION
    if (data.scope === "USER" && !data.targetUserId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["targetUserId"],
        message: "User is required",
      });
    }

    // PACKAGE VALIDATION
    if (data.scope === "PACKAGE" && !data.packageId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["packageId"],
        message: "Package is required",
      });
    }

    // BOTH NOT ALLOWED
    if (data.targetUserId && data.packageId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["targetUserId"],
        message: "Only one of User or Package can be selected",
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["packageId"],
        message: "Only one of User or Package can be selected",
      });
    }
  });
