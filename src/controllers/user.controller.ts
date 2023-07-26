import { FastifyReply, FastifyRequest } from "fastify";
import AppError from "~/exceptions/generic.exception";
import { PaginatorFactory } from "~/factory/paginator.factory";
import { PresenterFactory } from "~/factory/presenter.factory";
import StatusCode from "~/helpers/statusCode";
import { GetAllUsersService } from "~/services/users/get-all-users.service";
import { GetUserByIdService } from "~/services/users/get-user-by-id.service";
import { RegisterUserService } from "~/services/users/register-user.service";
import { GenericTypes } from "~/types/generic.types";
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

	export const getById = async (
    req: FastifyRequest<{
      Params: UserTypes.GetByIdParams
  }>, res: FastifyReply) => {
    try {
      const result = await GetUserByIdService.execute(req.params)

      return res.status(StatusCode.OK).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }

	export const getAll = async (
    req: FastifyRequest<{
      Querystring: GenericTypes.PaginatorParams<UserTypes.Filters | string>
  }>, res: FastifyReply) => {
    try {
			const { page, perPage, filter, orderBy, sortOrder } = req.query

			const query: UserTypes.Filters =
				!filter || filter === 'null' ? ({} as UserTypes.Filters) : (filter as UserTypes.Filters)

			const paginator = new PaginatorFactory<UserTypes.Filters>(
				{
					...query
				},
				page ? Number(page)	: 1,
				perPage ? Number(perPage) : 10,
				orderBy,
				sortOrder
			)

      const result = await GetAllUsersService.execute(paginator)

      return res.status(StatusCode.OK).send(new PresenterFactory(result, true))
    } catch (error) {
			return AppError.handleException(error, res)
    }
  }
}
