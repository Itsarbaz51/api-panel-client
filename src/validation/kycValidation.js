import { z } from 'zod';

export const kycValidation = z.object({
	registrationNumber: z
		.string()
		.trim()
		.min(1, 'Registration Number is required')
		.max(20, 'Registration Number cannot exceed 20 characters'),

	fullName: z
		.string()
		.trim()
		.min(2, 'Full Name is required')
		.max(50, 'Maximum 50 characters allowed')
		.regex(/^[a-zA-Z\s]+$/, 'Only letters and spaces are allowed'),

	dob: z.string().min(1, 'Date of Birth is required'),

	gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
		errorMap: () => ({
			message: 'Please select a valid gender',
		}),
	}),

	email: z.string().trim().email('Enter a valid email address'),

	phoneNumber: z
		.string()
		.length(10, 'Phone number must be exactly 10 digits')
		.regex(/^\d+$/, 'Only numbers are allowed'),

	companyName: z
		.string()
		.trim()
		.min(2, 'Company name is required')
		.max(100, 'Maximum 100 characters allowed'),

	businessType: z.enum([
		'PVT_LTD',
		'PUB_LTD',
		'PARTNERSHIP',
		'PROPRIETORSHIP',
		'LLP',
	]),

	kycType: z.enum(['MANUAL', 'DIGITAL', 'AADHAAR']),

	homeAddress: z.string().trim().min(3, 'Home address is required'),

	homeCity: z.string().trim().min(2, 'Home city is required'),

	homeState: z.string().trim().min(2, 'Home state is required'),

	homePin: z.string().regex(/^\d{6}$/, 'PIN code must be exactly 6 digits'),

	businessAddress: z.string().optional(),

	businessCity: z.string().optional(),

	businessState: z.string().optional(),

	businessPin: z
		.string()
		.optional()
		.refine(
			(val) => !val || /^\d{6}$/.test(val),
			'Business PIN must be 6 digits',
		),

	pan: z
		.string()
		.optional()
		.refine(
			(val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val),
			'Invalid PAN number',
		),

	aadhaar: z
		.string()
		.optional()
		.refine((val) => !val || /^\d{12}$/.test(val), 'Aadhaar must be 12 digits'),

	gst: z
		.string()
		.optional()
		.refine(
			(val) =>
				!val || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/.test(val),
			'Invalid GST number',
		),

	remarks: z
		.string()
		.max(500, 'Remarks cannot exceed 500 characters')
		.optional(),
});
