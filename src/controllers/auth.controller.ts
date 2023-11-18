import { FastifyReply, FastifyRequest } from "fastify";
import AppError from "../exceptions/generic.exception";
import { PresenterFactory } from "../factory/presenter.factory";
import StatusCode from "../helpers/statusCode";
import { AuthService } from "../services/auth/auth.service";
import { ChangePasswordService } from "../services/auth/change-password.service";
import { CheckVerificationService } from "../services/auth/check-verification.service";
import { ForgotPasswordService } from "../services/auth/forgot-password.service";
import { LogoutService } from "../services/auth/logout.service";
import { ResendVerificationService } from "../services/auth/resend-verification.service";
import { ResetPasswordService } from "../services/auth/reset-password.service";
import { AuthTypes } from "../types/auth.types";

export namespace AuthController {
	export const auth = async (req: FastifyRequest<{ Body: AuthTypes.AuthParams }>, res: FastifyReply) => {
		try {
			const result = await AuthService.execute(req.body);

			return res.status(StatusCode.OK).send(new PresenterFactory(result, true))
		} catch (error) {
			return AppError.handleException(error, res);
		}
	}

	export const checkVerification = async (req: FastifyRequest<{ Body: AuthTypes.CheckVerificationParams }>, res: FastifyReply) => {
		try {
			req.body.ua = req.headers['user-agent'] || '';
			req.body.ip = req.ip || ''

			const result = await CheckVerificationService.execute(req.body);

			return res.status(StatusCode.OK).send(new PresenterFactory(result, true))
		} catch (error) {
			return AppError.handleException(error, res);
		}
	}

	export const resendVerification = async (req: FastifyRequest<{ Body: { uuid: string } }>, res: FastifyReply) => {
		try {
			const result = await ResendVerificationService.execute(req.body.uuid);
			return res.status(StatusCode.OK).send(new PresenterFactory(result, true))
		} catch (error) {
			return AppError.handleException(error, res);
		}
	}

	export const logout = async (req: FastifyRequest<{ Body: { session_key: string } }>, res: FastifyReply) => {
		try {
			const result = await LogoutService.execute(req.body.session_key);
			return res.status(StatusCode.OK).send(new PresenterFactory(result, true))
		} catch (error) {
			return AppError.handleException(error, res);
		}
	}

	export const forgotPassword = async (req: FastifyRequest<{ Body: AuthTypes.ForgotPasswordParams }>, res: FastifyReply) => {
		try {
			const result = await ForgotPasswordService.execute(req.body);
			return res.status(StatusCode.OK).send(new PresenterFactory(result, true))
		} catch (error) {
			return AppError.handleException(error, res);
		}
	}

	export const changePassword = async (req: FastifyRequest<{ Body: AuthTypes.ChangePasswordParams }>, res: FastifyReply) => {
		try {
			const result = await ChangePasswordService.execute(req.body);
			return res.status(StatusCode.OK).send(new PresenterFactory(result, true))
		} catch (error) {
			return AppError.handleException(error, res);
		}
	}

	export const resetPassword = async (req: FastifyRequest<{ Body: AuthTypes.ResetPasswordParams }>, res: FastifyReply) => {
		try {
			const result = await ResetPasswordService.execute(req.body);
			return res.status(StatusCode.OK).send(new PresenterFactory(result, true))
		} catch (error) {
			return AppError.handleException(error, res);
		}
	}
}
