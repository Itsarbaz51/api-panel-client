import { z } from "zod";

export const serviceProviderValidation = z
  .object({
    serviceId: z.string().min(1, "Service is required"),
    providerId: z.string().min(1, "Provider is required"),

    baseUrl: z.string().optional(),
    handlePath: z.string().optional(),

    isActive: z.boolean().default(true),

    mode: z.enum(["NONE", "COMMISSION", "SURCHARGE"]).default("NONE"),

    pricingValueType: z.enum(["NONE", "FLAT", "PERCENTAGE"]).default("NONE"),

    providerCost: z.coerce.number().default(0),

    minAmount: z.coerce.number().optional(),
    maxAmount: z.coerce.number().optional(),

    supportsSlab: z.boolean().default(false),
    supportPaymentMethod: z.boolean().default(false),

    applyGST: z.boolean().default(false),
    gstPercent: z.coerce.number().default(0),

    applyTDS: z.boolean().default(false),
    tdsPercent: z.coerce.number().default(0),

    category: z.string().nullable().optional(),
    operator: z.string().nullable().optional(),
    operatorCode: z.string().nullable().optional(),
    paymentMethod: z.string().nullable().optional(),
    network: z.string().nullable().optional(),
    bankCode: z.string().nullable().optional(),
    transactionType: z.string().nullable().optional(),

    config: z.record(z.string()).default({}),
  })
  .superRefine((data, ctx) => {
    // Slab Validation
    if (data.supportsSlab) {
      if (data.minAmount === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["minAmount"],
          message: "Min Amount is required",
        });
      }

      if (data.maxAmount === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["maxAmount"],
          message: "Max Amount is required",
        });
      }
    }

    // Commission
    if (data.mode === "COMMISSION" && data.applyTDS) {
      if (data.tdsPercent <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["tdsPercent"],
          message: "TDS Percent is required",
        });
      }
    }

    // Surcharge
    if (data.mode === "SURCHARGE" && data.applyGST) {
      if (data.gstPercent <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["gstPercent"],
          message: "GST Percent is required",
        });
      }
    }

    // Payment Method
    if (data.supportPaymentMethod) {
      [
        "category",
        "operator",
        "operatorCode",
        "paymentMethod",
        "network",
        "bankCode",
      ].forEach((field) => {
        if (!data[field]?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message: `${field} is required`,
          });
        }
      });
    }
  });
