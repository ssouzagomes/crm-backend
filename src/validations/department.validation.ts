import { z } from "zod";

export const createDepartmentValidation = z
	.object({
		name: z.string().min(2, 'NAME_MIN_LENGTH_3').max(50, 'NAME_MAX_LENGTH_50'),
		description: z.string().max(250, 'DESCRIPTION_MAX_LENGTH_250').optional(),
	})
	.strict();
