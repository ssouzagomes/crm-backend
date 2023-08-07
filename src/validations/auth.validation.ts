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

export const forgotPasswordValidation = z
	.object({
		email: z.string().email("EMAIL_INVALID").endsWith('@crm.com', 'NOT_CRM_MAIL_VALID'),
		callbackUrl: z.string().url("CALLBACK_URL_INVALID"),
	})
	.strict();

export const changePasswordValidation = z
	.object({
		id: z.number().int("ID_INVALID"),
		old_password: z.string().min(8, "PASSWORD_MIN_LENGTH"),
		password: z.string().min(8, "PASSWORD_MIN_LENGTH"),
		pin: z.string().optional()
	})
	.strict();

export const resetPasswordValidation = z
	.object({
		token: z.string().uuid('TOKEN_INVALID'),
		password: z.string().min(8, "PASSWORD_MIN_LENGTH").max(32, "PASSWORD_MAX_LENGTH"),
	})
	.strict();
