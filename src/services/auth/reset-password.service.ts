import AppError from "../../exceptions/generic.exception";
import { encriptPassword, validatePassword } from "../../helpers/password";
import StatusCode from "../../helpers/statusCode";
import { AuthTypes } from "../../types/auth.types";
import { resetPasswordValidation } from "../../validations/auth.validation";
import prisma from "../prisma";
import { differenceInHours } from "date-fns";

export namespace ResetPasswordService {
	export const execute = async (model: AuthTypes.ResetPasswordParams) => {
		const { token, password } = await resetPasswordValidation.parseAsync(model);

		const validPass = validatePassword(password);

		if (!validPass) {
			throw new AppError('INVALID_PASSWORD', StatusCode.BAD_REQUEST);
		}

		const storage = await prisma.users_storage.findFirst({
			where: {
				key: 'recover_password',
				value: token,
			}
		})

		if (!storage) {
			throw new AppError('INVALID_TOKEN', StatusCode.BAD_REQUEST);
		}

		if (differenceInHours(storage.created_at, new Date()) > 2) {
			throw new AppError('TOKEN_EXPIRED', StatusCode.BAD_REQUEST);
		}

		await prisma.users.update({
			where: {
				id: storage.user_id
			},
			data: {
				password: encriptPassword(password)
			}
		})

		return { message: 'OK' }
	}
}
