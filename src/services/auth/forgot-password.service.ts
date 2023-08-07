import { v4 as uuidV4 } from 'uuid'
import { AuthTypes } from "~/types/auth.types"
import { forgotPasswordValidation } from "~/validations/auth.validation"
import AppError from "~/exceptions/generic.exception"
import StatusCode from "~/helpers/statusCode"
import { mailProvider } from '~/shared/providers/mail'
import prisma from "../prisma"

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

		console.log(storage)

		// await mailProvider()

		return storage.value
	}
}
