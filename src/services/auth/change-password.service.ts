import AppError from "~/exceptions/generic.exception";
import { decriptPassword, encriptPassword, validatePassword } from "~/helpers/password";
import StatusCode from "~/helpers/statusCode";
import { AuthTypes } from "~/types/auth.types";
import { changePasswordValidation } from "~/validations/auth.validation";
import prisma from "../prisma";

export namespace ChangePasswordService {
	export const execute = async (model: AuthTypes.ChangePasswordParams) => {
		const { id, old_password, password } = await changePasswordValidation.parseAsync(model)

		const validPass = validatePassword(password)

		if (!validPass) {
			throw new AppError('PASSWORD_INVALID', StatusCode.BAD_REQUEST)
		}

		const user = await prisma.users.findFirst({
			where: {
				id,
				enabled: true,
			},
			select: {
				id: true,
				password: true,
				first_login: true,
			}
		})

		if (!user) {
			throw new AppError('USER_NOT_FOUND', StatusCode.NOT_FOUND)
		}

		const passwordMatches = await decriptPassword(old_password, user.password)

		if (!passwordMatches) {
			throw new AppError('OLD_PASSWORD_INCORRECT', StatusCode.BAD_REQUEST)
		}

		await prisma.users.update({
			where: {
				id
			},
			data: {
				password: await encriptPassword(password),
				first_login: false
			}
		})

		return { message: 'OK' }
	}
}
