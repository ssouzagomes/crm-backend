import { FastifyInstance } from "fastify";
import { healthRoutes } from "./health.routes";

export const bootRoutes = (fastify: FastifyInstance) => {
  fastify.register(healthRoutes, { prefix: '/v1.0/health' })
}