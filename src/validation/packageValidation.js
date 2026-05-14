import { z } from 'zod';

export const packageValidation = z.object({
	packageName: z.string().min(1, 'Package name is required'),

	price: z.coerce.number().min(1, 'Price must be greater than 0'),

	usersLimit: z.coerce.number().min(1, 'Users limit must be greater than 0'),

	storage: z.string().min(1, 'Storage is required'),

	status: z.enum(['ACTIVE', 'INACTIVE'], {
		message: 'Status is required',
	}),
});
