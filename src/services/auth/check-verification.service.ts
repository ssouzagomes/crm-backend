import { differenceInHours } from "date-fns";
import _ from "lodash";
import { AuthTypes } from "~/types/auth.types";
import { checkVerificationValidation } from "~/validations/auth.validation";
import AppError from "~/exceptions/generic.exception";
import StatusCode from "~/helpers/statusCode";
import prisma from "../prisma";
import { SessionService } from "../session.service";

export namespace CheckVerificationService {
	export const execute = async (model: AuthTypes.CheckVerificationParams) => {
		const { uuid, token, ip, ua, device, client_info } = await checkVerificationValidation.parseAsync(model);

		const verification = await prisma.verifications.findFirst({
			where: {
				uuid
			}
		})

		if (!verification) {
			throw new AppError("UUID_INVALID", StatusCode.BAD_REQUEST);
		}

		if (differenceInHours(verification.created_at, Date.now()) > 2) {
			throw new AppError("UUID_EXPIRED", StatusCode.BAD_REQUEST);
		}

		if (verification.status === AuthTypes.VerificationStatus.UNVERIFIED) {
			if (verification.attempts >= verification.max_attempts) {
				await prisma.verifications.update({
					where: {
						id: verification.id
					},
					data: {
						status: AuthTypes.VerificationStatus.REPROVED
					}
				})
				throw new AppError('TOO_MANY_ATTEMPTS', StatusCode.BAD_REQUEST);
			}

			if (verification.token === token) {
				await prisma.verifications.update({
					where: {
						id: verification.id
					},
					data: {
						status: AuthTypes.VerificationStatus.VERIFIED,
					}
				})

				const user = await prisma.users.findFirst({
					where: {
						email: verification.value
					}
				})

				if (!user) {
					return
				}

				const sessionKey = await SessionService.create({
					user_id: user.id,
					ip,
					device,
					ua,
					client_info
				})

				return {
					user: {
						..._.omit(user, ['password']),
						pin: !!user?.pin
					},
					session_key: sessionKey
				}
			}

			await prisma.verifications.update({
				where: {
					id: verification.id
				},
				data: {
					attempts: verification.attempts + 1
				}
			})

			throw new AppError('TOKEN_INVALID', StatusCode.BAD_REQUEST);
		} else if (verification.status === AuthTypes.VerificationStatus.REPROVED) {
			throw new AppError('TOO_MANY_ATTEMPTS', StatusCode.BAD_REQUEST);
		}

		return {
			message: 'OK'
		}
	}
}
