import prisma from "../prisma";
import StatusCode from "~/helpers/statusCode";
import AppError from "~/exceptions/generic.exception";

export namespace DisableUserService {
	export const execute = async (id: number) => {
		const user = await prisma.users.findFirst({
			where: {
				id
			},
			select: {
				id: true,
				enabled: true,
			}
		})

		if (!user) {
			throw new AppError('USER_NOT_FOUND', StatusCode.NOT_FOUND)
		}

		await prisma.users.update({
			where: {
				id: user.id
			},
			data: {
				enabled: false
			}
		})

		return { message: 'USER_DISABLED' }
	}
}
