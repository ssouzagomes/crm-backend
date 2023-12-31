import _ from "lodash";
import { UserTypes } from "../../types/user.types";
import { idValidation } from "../../validations/generic.validation";
import StatusCode from "../../helpers/statusCode";
import AppError from "../../exceptions/generic.exception";
import prisma from "../prisma";

export namespace GetUserByIdService {
	export const execute = async (model: UserTypes.GetByIdParams) => {
		const { id } = await idValidation.parseAsync({ id: +model.id })

		const user = await prisma.users.findFirst({
			where: {
				id
			},
			select: {
				id: true,
				name: true,
				email: true,
				enabled: true,
				first_login: true,
				permission: true,
				team: true,
				created_at: true,
				updated_at: true,
			},
		})

		if (!user) {
			throw new AppError('USER_NOT_FOUND', StatusCode.NOT_FOUND)
		}

		return { ..._.omit(user, 'password')}
	}
}
