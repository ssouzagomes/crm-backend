import { FastifyInstance } from "fastify";
import { AuthController } from "~/controllers/auth.controller";

export const authRoutes = async (fastify: FastifyInstance) => {
	fastify.route({
		method: 'POST',
    url: '/Login',
    handler: AuthController.auth
	})
	fastify.route({
		method: 'POST',
		url: '/CheckVerification',
		handler: AuthController.checkVerification
	})
	fastify.route({
		method: 'POST',
		url: '/ResendVerification',
		handler: AuthController.resendVerification,
	});
}
