import { FastifyReply, FastifyRequest } from "fastify";
import AppError from "~/exceptions/generic.exception";
import { PresenterFactory } from "~/factory/presenter.factory";
import StatusCode from "~/helpers/statusCode";
import { AuthService } from "~/services/auth/auth.service";
import { AuthTypes } from "~/types/auth.types";

export namespace AuthController {
	export const auth = async (req: FastifyRequest<{ Body: AuthTypes.AuthParams }>, res: FastifyReply) => {
		try {
			const result = await AuthService.execute(req.body);

			return res.status(StatusCode.OK).send(new PresenterFactory(result, true))
		} catch (error) {
			return AppError.handleException(error, res);
		}
	}

  export const checkVerification = async (req: FastifyRequest<{ Body: AuthTypes.CheckVerificationParams }>, res: FastifyReply) => {
    try {
			// req.body.ua = req.headers['user-agent'] || '';
			// req.body.ip = req.ip || ''

			// const result = await CheckVerfic(req.body);

      return res.status(StatusCode.OK).send(new PresenterFactory({} as any, true))
    } catch (error) {
			return AppError.handleException(error, res);
    }
  }
}
