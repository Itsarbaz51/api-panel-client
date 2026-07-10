// validation/profileVerificationValidation.js
import { z } from "zod";

const is18OrOlder = (dob) => {
  if (!dob) return false;
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age >= 18;
};

// Regex to ensure string does not contain any digits (0-9)
const noNumbersRegex = /^[^0-9]*$/;
const noNumbersMessage = "Numbers are not allowed in this field";

// PAN Regex: First 5 letters, then 4 numbers, then 1 letter
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

// Aadhaar Regex: 12 digits (with or without dashes)
const aadhaarRegex = /^[0-9]{12}$/;

export const profileVerificationValidation = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  dob: z.string().refine(is18OrOlder, {
    message: "You must be 18 years or older",
  }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  companyName: z.string().optional(),
  businessType: z.enum([
    "PVT_LTD",
    "PUB_LTD",
    "PARTNERSHIP",
    "PROPRIETORSHIP",
    "LLP",
  ]),
  kycType: z.enum(["MANUAL", "AUTOMATIC"]).default("MANUAL"),
  
  // --- Home Address Validation ---
  homeAddress: z.string().min(1, "Home address is required"),

  homeCity: z
    .string()
    .min(1, "Home city is required")
    .regex(noNumbersRegex, "City name cannot contain numbers"),

  homeState: z
    .string()
    .min(1, "Home state is required")
    .regex(noNumbersRegex, "State name cannot contain numbers"),

  homePin: z.string().min(6, "PIN code must be 6 digits"),

  homeLandmark: z
    .string()
    .regex(noNumbersRegex, "Landmark cannot contain numbers")
    .optional()
    .or(z.literal("")), // Allows empty string
      

  // --- Business Address Validation ---
  businessAddress: z.string().optional(),
  businessCity: z
    .string()
    .regex(noNumbersRegex, "Business city cannot contain numbers")
    .optional()
    .or(z.literal("")),
  businessState: z
    .string()
    .regex(noNumbersRegex, "Business state cannot contain numbers")
    .optional()
    .or(z.literal("")),
  businessPin: z.string().optional(),
  businessLandmark: z
    .string()
    .regex(noNumbersRegex, "Business landmark cannot contain numbers")
    .optional()
    .or(z.literal("")),

  // --- Documents & Others ---
  pan: z
    .string()
    .min(10, "PAN must be exactly 10 characters (5 letters, 4 numbers, 1 letter)")
    .max(10, "PAN must be exactly 10 characters (5 letters, 4 numbers, 1 letter)")
    .regex(panRegex, "PAN must be in format: 5 letters, 4 numbers, 1 letter (e.g., ABCDE1234F)"),
  
  aadhaar: z
    .string()
    .min(12, "Aadhaar must be 12 digits")
    .max(12, "Aadhaar must be 12 digits")
    .regex(aadhaarRegex, "Aadhaar must contain only numbers (12 digits)"),
  
  gst: z.string().optional(),
  remarks: z.string().optional(),
});