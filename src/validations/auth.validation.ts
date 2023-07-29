import { z } from "zod";

export const authValidation = z
	.object({
		email: z.string().email("EMAIL_INVALID").endsWith('@crm.com', 'NOT_CRM_MAIL_VALID'),
		password: z.string().min(6, "PASSWORD_MIN_LENGTH"),
	})
	.strict();

export const checkVerificationValidation = z
  .object({
    value: z.string().email("EMAIL_INVALID").endsWith('@crm.com', 'NOT_CRM_MAIL_VALID'),
  })
  .strict();
