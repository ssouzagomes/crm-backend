import { z } from 'zod';
import { authValidation, checkVerificationValidation, createVerificationValidation } from '~/validations/auth.validation';

export namespace AuthTypes {
	export type AuthParams = z.infer<typeof authValidation>;
	export type CreateVerificationParams = z.infer<typeof createVerificationValidation>;
  export type CheckVerificationParams = z.infer<typeof checkVerificationValidation>;
	export enum VerificationStatus {
		UNVERIFIED = 'unverified',
		VERIFIED = 'verified',
		REPROVED = 'reproved',
	}
	export enum VerificationTypes {
		MAIL = 'mail',
		PHONE = 'phone',
	}
}
