import { z } from 'zod';
import { authValidation, changePasswordValidation, checkVerificationValidation, createVerificationValidation, forgotPasswordValidation, resetPasswordValidation } from '../validations/auth.validation';

export namespace AuthTypes {
	export type AuthParams = z.infer<typeof authValidation>;
	export type CreateVerificationParams = z.infer<typeof createVerificationValidation>;
  export type CheckVerificationParams = z.infer<typeof checkVerificationValidation>;
	export type ForgotPasswordParams = z.infer<typeof forgotPasswordValidation>;
	export type ChangePasswordParams = z.infer<typeof changePasswordValidation>;
	export type ResetPasswordParams = z.infer<typeof resetPasswordValidation>;
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
