import { v4 as uuidV4 } from 'uuid'
import { AuthTypes } from "~/types/auth.types"
import { forgotPasswordValidation } from "~/validations/auth.validation"
import AppError from "~/exceptions/generic.exception"
import StatusCode from "~/helpers/statusCode"
import prisma from "../prisma"
import { mailProvider } from '~/shared/providers/mail'

export namespace ForgotPasswordService {
	export const execute = async (model: AuthTypes.ForgotPasswordParams) => {
		const { email, callbackUrl } = await forgotPasswordValidation.parseAsync(model)

		const user = await prisma.users.findFirst({
			where: {
				email,
				enabled: true,
			},
			select: {
				id: true,
				email: true,
				name: true,
			}
		})

		if (!user) {
			throw new AppError('USER_NOT_FOUND', StatusCode.NOT_FOUND)
		}

		const storage = await prisma.users_storage.create({
			data: {
				user_id: user.id,
				key: 'recover_password',
				value: uuidV4()
			}
		})

		await mailProvider.sendMail({
			to: 'ssouza.gomes10@gmail.com',
			subject: 'Recuperação de senha',
			template: 'recover_password',
			keys: {
				name: user.name,
				url: `${callbackUrl}?token=${storage.value}`
			}
		})

		return storage.value
	}
}
