import { z } from 'zod';

export const idValidation = z.object({
	id: z.number().nonnegative(),
});

export const paginateValidation = z.object({
	page: z.number().nonnegative().default(0).optional(),
	perPage: z.number().nonnegative().default(10).optional(),
});
