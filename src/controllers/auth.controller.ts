import { FastifyReply, FastifyRequest } from "fastify";
import { PresenterFactory } from "~/factory/presenter.factory";
import StatusCode from "~/helpers/statusCode";
import { AuthTypes } from "~/types/auth.types";

export namespace AuthController {
  export const checkVerification = async (req: FastifyRequest<{ Body: AuthTypes.CheckVerificationParams }>, res: FastifyReply) => {
    try {
      return res.status(StatusCode.OK).send(new PresenterFactory({} as any, true))
    } catch (error) {
      
    }
  }
}