import { UserTypes } from "~/types/user.types";
import { updateUserValidation } from "~/validations/user.validation";
import prisma from "../prisma";
import AppError from "~/exceptions/generic.exception";
import StatusCode from "~/helpers/statusCode";
import { UpdateUserPermissionService } from "../permissions/update-user-permission.service";
import _ from "lodash";

export namespace UpdateUserService {
	export const execute = async (model: UserTypes.UpdateParams) => {
		const { id, name, email, flags, permissionAKA, team_id } = await updateUserValidation.parseAsync(model);

		const user = await prisma.users.findFirst({
			where: {
				id
			}
		})

		if (!user) {
			throw new AppError('USER_NOT_FOUND', StatusCode.NOT_FOUND);
		}

		await UpdateUserPermissionService.execute(user.id, flags, permissionAKA);

		if (user.email !== email) {
			const emailExists = await prisma.users.findFirst({
				where: {
					email
				}
			});

			if (emailExists) {
				throw new AppError('EMAIL_ALREADY_IN_USE', StatusCode.BAD_REQUEST);
			}

			await prisma.users.update({
				where: {
					id
				},
				data: {
					email
				}
			})
		}

		const team = prisma.teams.findUnique({
			where: {
				id: team_id
			},
			select: {
				id: true
			}
		})

		if (!team) {
			throw new AppError('TEAM_NOT_FOUND', StatusCode.NOT_FOUND);
		}

		const updatedUser = await prisma.users.update({
			where: {
				id
			},
			data: {
				name
			}
		})

		return _.omit(updatedUser, ['password', 'pin'])
	};
}
