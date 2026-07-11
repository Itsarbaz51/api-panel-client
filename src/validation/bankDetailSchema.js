import { z } from "zod";

export const bankDetailSchema = z.object({
  accountHolder: z.string().min(3, "Account holder name is required").max(100),

  accountNumber: z
    .string()
    .min(8, "Account number is too short")
    .max(18, "Maximum 18 digits"),

  phoneNumber: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

  accountType: z.enum(["PERSONAL", "BUSINESS"], {
    required_error: "Select account type",
  }),

  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code"),

  bankName: z.string().min(2, "Bank name is required").max(100),

  isPrimary: z.boolean().default(false),

  bankProofFile: z.any().optional(),
});

export const defaultValues = {
  userId: "",

  accountHolder: "",

  accountNumber: "",

  phoneNumber: "",

  accountType: "SAVINGS",

  ifscCode: "",

  bankName: "",

  isPrimary: false,

  bankProofFile: null,
};
