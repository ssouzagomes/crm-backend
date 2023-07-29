import { FastifyInstance } from "fastify";
import { AuthController } from "~/controllers/auth.controller";

export const authRoutes = async (fastify: FastifyInstance) => {
	fastify.route({
		method: 'POST',
    url: '/Login',
    handler: AuthController.auth
	})
}
