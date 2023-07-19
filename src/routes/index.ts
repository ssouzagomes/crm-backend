import { FastifyInstance } from "fastify";
import { healthRoutes } from "./health.routes";
import { userRoutes } from "./user.routes";

export const bootRoutes = (fastify: FastifyInstance) => {
  fastify.register(healthRoutes, { prefix: '/v1.0/health' })
  fastify.register(userRoutes, { prefix: '/v1.0/Users' })
}