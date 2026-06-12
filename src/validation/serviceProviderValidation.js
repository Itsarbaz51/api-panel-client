import { z } from "zod";

export const serviceProviderValidation = z.object({
  serviceId: z.string().min(1, "Service required"),
  providerId: z.string().min(1, "Provider required"),
  baseUrl: z.string().optional(),
  isActive: z.boolean().default(true),
  mode: z.enum(["NONE", "COMMISSION", "SURCHARGE"]).default("NONE"),
  pricingValueType: z.enum(["NONE", "FIXED", "PERCENTAGE"]).default("NONE"),
  value: z.coerce.number().default(0),
  providerCost: z.coerce.number().default(0),
  minAmount: z.coerce.number().optional(),
  maxAmount: z.coerce.number().optional(),
  handlePath: z.string().optional(),
});
