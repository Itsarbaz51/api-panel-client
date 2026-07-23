import { z } from "zod";

export const documentSchema = z.object({
  type: z.enum(["AADHAR", "PAN", "GST", "USER_PHOTO", "BUSINESS_PHOTO"]),
  file: z.instanceof(File),
  documentNumber: z.string().optional(),
  remarks: z.string().optional(),
});

export const addressSchema = z.object({
  type: z.enum(["HOME", "OFFICE"]),
  address: z.string().min(2, "Address is required"),
  pinCode: z.string().min(6).max(6),
  state: z.string().min(2),
  city: z.string().min(2),
  landmark: z.string().optional(),
});

export const profileVerificationValidation = z.object({
  fullName: z.string().min(2),

  dob: z.string(),

  gender: z.enum(["MALE", "FEMALE", "OTHER"]),

  email: z.email(),

  phoneNumber: z.string().min(10).max(10),

  companyName: z.string().min(2),

  businessType: z.string(),

  kycType: z.string(),

  remarks: z.string().optional(),

  metadata: z.any().optional(),

  addresses: z.array(addressSchema).min(2, "Home & Office address required"),

  documents: z.array(documentSchema).min(5, "All documents are required"),
});
