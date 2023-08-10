import _ from 'lodash'
import { UserTypes } from "~/types/user.types";
import { registerUserValidation } from "~/validations/user.validation";
import { encriptPassword, generatePassword } from "~/helpers/password";
import AppError from "~/exceptions/generic.exception";
import StatusCode from "~/helpers/statusCode";
import prisma from "../prisma";
import { UpdateUserPermissionService } from '../permissions/update-user-permission.service';
import { mailProvider } from '~/shared/providers/mail';

export namespace RegisterUserService {
  export const execute = async (model: UserTypes.RegisterParams) => {
    const { name, email, flags, team_id, permissionAKA } = await registerUserValidation.parseAsync(model)

    const emailExist = await prisma.users.findFirst({
      where: {
        email: email.toLowerCase()
      }
    })

    if (emailExist) {
      throw new AppError('USER_ALREADY_EXIST', StatusCode.BAD_REQUEST)
    }

    const password = generatePassword()

		const teamExist = await prisma.teams.findFirst({
			where: {
				id: team_id
			}
		})

		// if (!teamExist) {
    //   throw new AppError('TEAM_NOT_FOUND', StatusCode.NOT_FOUND)
    // }

    const user = await prisma.users.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: encriptPassword(password),
				// team_id,
      },
			select: {
				id: true,
				email: true,
				created_at: true,
			}
    })

		await UpdateUserPermissionService.execute(user.id, flags, permissionAKA)

		await mailProvider.sendMail({
			to: 'ssouza.gomes10@gmail.com',
			subject: 'Bem vindo ao CRM',
			template: 'confirm_account',
			keys: {
				name,
				password,
				url: `${process.env.APP_CLIENT}/login`
			}
		})

    return { ..._.omit(user, 'password') }
  }
}
