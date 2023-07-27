import AppError from "~/exceptions/generic.exception"
import StatusCode from "~/helpers/statusCode"
import prisma from "../prisma"
import { decriptPassword } from "~/helpers/password"

export namespace CheckIfUserPinIsValidService {
	export const execute = async (user_id: number, pin: string): Promise<void> => {
		if (!pin) {
			throw new AppError('PIN_REQUIRED', StatusCode.BAD_REQUEST)
		}

		const user = await prisma.users.findUnique({
			where: {
				id: user_id
			},
			select: {
				pin: true
			}
		})

		if (!user) {
			throw new AppError('USER_NOT_FOUND', StatusCode.NOT_FOUND)
		}

		if (!user.pin) {
			throw new AppError('THERES_NO_PIN_IN_THIS_USER', StatusCode.BAD_REQUEST)
		}

		const pinIsValid = await decriptPassword(pin, user.pin!)

		if (!pinIsValid) {
			throw new AppError('INVALID_PIN', StatusCode.BAD_REQUEST)
		}
	}
}
