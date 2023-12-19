import { anyid } from "anyid";
import { v4 as uuidv4 } from 'uuid';
import StatusCode from "../../helpers/statusCode";
import AppError from "../../exceptions/generic.exception";
import { AuthTypes } from "../../types/auth.types";
import prisma from "../prisma"
import { mailProvider } from "src/shared/providers/mail";

export namespace ResendVerificationService {
	export const execute = async (uuid: string) => {
		if (!uuid) {
			throw new AppError("UUID_NOT_PROVIDED", StatusCode.BAD_REQUEST);
		}

		const verification = await prisma.verifications.findFirst({
			where: {
				uuid
			}
		})

		if (!verification) {
			throw new AppError("VERIFICATION_NOT_FOUND", 	StatusCode.NOT_FOUND);
		}

		const token = anyid().encode('0').length(6).random().id();

		const user = await prisma.users.findFirst({
			where: {
				email: verification.value,
				enabled: true
			},
			select: {
				id: true,
				name: true,
				email: true,
			}
		})

		if (!user) {
			throw new AppError('USER_NOT_FOUND', StatusCode.BAD_REQUEST);
		}

		const newVerification = await prisma.verifications.create({
			data: {
				token,
				uuid: uuidv4(),
				max_attempts: 3,
				status: AuthTypes.VerificationStatus.UNVERIFIED,
				value: verification.value,
				type: AuthTypes.VerificationTypes.MAIL,
			}
		})

		await mailProvider.sendMail({
			to: 'ssouza.gomes10@gmail.com',
			subject: 'Aqui está o seu código de confirmação',
			template: 'confirm_login_pin',
			keys: {
				name: user.name,
				token,
				url: `${process.env.APP_CLIENT}/login`
			}
		})

		return newVerification.uuid
	}
}
