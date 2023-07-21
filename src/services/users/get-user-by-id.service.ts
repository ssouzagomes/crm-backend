import { UserTypes } from "~/types/user.types";
import { idValidation } from "~/validations/generic.validation";
import prisma from "../prisma";
import StatusCode from "~/helpers/statusCode";
import AppError from "~/exceptions/generic.exception";
import _ from "lodash";

export namespace GetUserByIdService {
	export const execute = async (model: UserTypes.GetByIdParams) => {
		const { id } = await idValidation.parseAsync({ id: +model.id })

		const user = await prisma.users.findFirst({
			where: {
				id
			}
		})

		if (!user) {
			throw new AppError('USER_NOT_FOUND', StatusCode.NOT_FOUND)
		}

		return { ..._.omit(user, 'password')}
	}
}