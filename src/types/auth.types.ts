import { z } from 'zod';
import { checkVerificationValidation } from '~/validations/auth.validation';

export namespace AuthTypes {
  export type CheckVerificationParams = z.infer<typeof checkVerificationValidation>;
}