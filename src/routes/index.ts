import { FastifyInstance } from "fastify";
import { healthRoutes } from "./health.routes";
import { userRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";

export const bootRoutes = (fastify: FastifyInstance) => {
  fastify.register(healthRoutes, { prefix: '/v1.0/health' })
  fastify.register(userRoutes, { prefix: '/v1.0/Users' })
	fastify.register(authRoutes, { prefix: '/v1.0/Auth' })
}
