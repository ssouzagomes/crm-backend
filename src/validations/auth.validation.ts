import { z } from "zod";

export const authValidation = z
	.object({
		email: z.string().email("EMAIL_INVALID").endsWith('@crm.com', 'NOT_CRM_MAIL_VALID'),
		password: z.string().min(6, "PASSWORD_MIN_LENGTH"),
	})
	.strict();

export const createVerificationValidation = z
  .object({
    value: z.string().email("EMAIL_INVALID").endsWith('@crm.com', 'NOT_CRM_MAIL_VALID'),
  })
  .strict();

export const checkVerificationValidation = z
	.object({
		uuid: z.string().uuid('UUID_REQUIRED'),
		token: z.string().max(6, 'TOKEN_INVALID').min(6, 'TOKEN_INVALID'),
		ip: z.string(),
		ua: z.string(),
		device: z.string(),
		client_info: z.string(),
	})
	.strict();
