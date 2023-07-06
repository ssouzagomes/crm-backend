import { FastifyReply, FastifyRequest } from "fastify";
import { PresenterFactory } from "~/factory/presenter.factory";
import StatusCode from "~/helpers/statusCode";

export namespace HealthController {
  export const health = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const result = {
        status: 'OK',
        date: new Date()
      }

      return res.status(StatusCode.OK).send(new PresenterFactory(result, true))
    } catch (error) { 
    }
  }
}