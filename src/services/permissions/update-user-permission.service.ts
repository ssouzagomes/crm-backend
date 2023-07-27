import _ from "lodash";
import prisma, { permissions as Permission } from "../prisma";
import AppError from "~/exceptions/generic.exception";
import StatusCode from "~/helpers/statusCode";
import { PermissionsConstant } from "~/constants/permissions.constants";

const akas = ['ADMIN', 'SUPPORT', 'RH', 'COLLABORATOR'];


export namespace UpdateUserPermissionService {
	export const execute = async (userId: number, flags: string[], permissionAKA: string[]) => {
		const akasToAdd = _.intersection(akas, permissionAKA);

		const user = await prisma.users.findFirst({
			where: {
				id: userId
			},
			select: {
				id: true,
				permission_id: true,
			}
		})

		if (!user) {
			throw new AppError('USER_NOT_FOUND', StatusCode.NOT_FOUND)
		}

		const flagsToAdd = {
			AKA: akasToAdd,
		}

		flags?.forEach(flag => {
			const flagIsValid = PermissionsConstant.list().includes(flag);

			if (flagIsValid) {
				flagsToAdd[flag] = flag;
			}
		})

		let permission: Permission | null

		if (!user?.permission_id) {
			permission = await prisma.permissions.create({
				data: {
					flags: flagsToAdd,
				}
			})

			await prisma.users.update({
				where: {
					id: user.id
				},
				data: {
					permission_id: permission.id
				},
				select: {
					id: true
				}
			})
		} else {
			permission = await prisma.permissions.update({
				where: {
					id: user.permission_id
				},
				data: {
					flags: {
						...flagsToAdd
					}
				}
			})
		}
	}
}
