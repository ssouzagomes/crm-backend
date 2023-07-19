import { z } from "zod";

export const registerUserValidation = z
  .object({
    name: z.string().min(3, 'NAME_MIN_LENGTH_3').max(50, 'NAME_MAX_LENGTH_50'),
    email: z.string().email('EMAIL_INVALID').endsWith('@crm.com', 'NOT_CRM_MAIL_VALID'),
    flags: z.string().array(),
  })
  .strict();