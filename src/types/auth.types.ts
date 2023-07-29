import { z } from 'zod';
import { authValidation, checkVerificationValidation } from '~/validations/auth.validation';

export namespace AuthTypes {
	export type AuthParams = z.infer<typeof authValidation>;
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
