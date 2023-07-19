import _ from 'lodash'
import { UserTypes } from "~/types/user.types";
import { registerUserValidation } from "~/validations/user.validation";
import { encriptPassword, generatePassword } from "~/helpers/password";
import prisma from "../prisma";
import AppError from "~/exceptions/generic.exception";
import StatusCode from "~/helpers/statusCode";

export namespace RegisterUserService {
  export const execute = async (model: UserTypes.RegisterParams) => {
    const { name, email } = await registerUserValidation.parseAsync(model)

    const emailExist = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase()
      }
    })

		console.log(emailExist)
    if (emailExist) {
      throw new AppError('USER_ALREADY_EXIST', StatusCode.BAD_REQUEST)
    }

    const password = generatePassword()


		console.log(password)

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: encriptPassword(password)
      }
    })

    return { ..._.omit(user, 'password') }
  }
}
