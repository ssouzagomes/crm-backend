import { FastifyReply, FastifyRequest } from "fastify";
import AppError from "~/exceptions/generic.exception";
import { PresenterFactory } from "~/factory/presenter.factory";
import StatusCode from "~/helpers/statusCode";
import { RegisterUserService } from "~/services/users/register-user.service";
import { UserTypes } from "~/types/user.types";

export namespace UserController {
  export const register = async (
    req: FastifyRequest<{
      Body: UserTypes.RegisterParams
  }>, res: FastifyReply) => {
    try {
      const result = await RegisterUserService.execute({ ...req.body })

      return res.status(StatusCode.OK).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }
}
