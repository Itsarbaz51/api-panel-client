import { z } from "zod";

export const userValidation = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name is required")
    .max(50, "Maximum 50 characters allowed")
    .regex(/^[a-zA-Z\s]+$/, "Only letters are allowed"),

  companyName: z
    .string()
    .trim()
    .min(2, "Company name is required")
    .max(100, "Maximum 100 characters allowed"),

  companyType: z.enum(["PRIVATE_LIMITED", "PUBLIC_LIMITED", "LLP"]),

  status: z.enum(["ACTIVE", "IN_ACTIVE", "DELETED"]),

  email: z.string().trim().email("Enter valid email"),

  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  packageId: z
    .string()
    .min(1, "Package is required")
    .uuid("Select a valid package"),

  profileImage: z
    .instanceof(File)
    .optional()
    .nullable(),
});
