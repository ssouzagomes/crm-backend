import { z } from "zod";

export const registerUserValidation = z
  .object({
		pin: z.string(),
    name: z.string().min(3, 'NAME_MIN_LENGTH_3').max(50, 'NAME_MAX_LENGTH_50'),
    email: z.string().email('EMAIL_INVALID').endsWith('@crm.com', 'NOT_CRM_MAIL_VALID'),
    flags: z.string().array(),
		permissionAKA: z.string().array(),
		team_id: z.number().nonnegative(),
  })
  .strict();

export const updateUserPermissions = z
	.object({
		user_id: z.number(),
		flags: z.string().array(),
		permissionAKA: z.string().array(),
		by_user_id: z.number().optional(),
	});
