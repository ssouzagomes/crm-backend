import { FastifyInstance } from "fastify";
import { HealthController } from "../controllers/health.controller";

export const healthRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: HealthController.health
  })
}
