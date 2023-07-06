import { z } from "zod";

export const checkVerificationValidation = z
  .object({
    value: z.string().email("EMAIL_INVALID").endsWith('@crm.com', 'NOT_CRM_MAIL_VALID'),
  })
  .strict();