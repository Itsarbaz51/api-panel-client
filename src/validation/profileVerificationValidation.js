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
  homeAddress: z.string().min(1, "Home address is required"),
  homeCity: z.string().min(1, "Home city is required"),
  homeState: z.string().min(1, "Home state is required"),
  homePin: z.string().min(6, "PIN code must be 6 digits"),
  businessAddress: z.string().optional(),
  businessCity: z.string().optional(),
  businessState: z.string().optional(),
  businessPin: z.string().optional(),
  pan: z.string().min(10, "Invalid PAN number configuration").max(10),
  aadhaar: z.string().min(12, "Aadhaar must be 12 digits").max(12),
  gst: z.string().optional(),
  remarks: z.string().optional(),
});
