import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth.controller";
import { authorization } from "../middlewares/authorization.middleware";

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
	fastify.route({
		method: 'POST',
		url: '/Logout',
		handler: AuthController.logout,
		preHandler: [authorization]
	});
	fastify.route({
		method: 'POST',
		url: '/ForgotPassword',
		handler: AuthController.forgotPassword,
	})
	fastify.route({
		method: 'POST',
		url: '/ChangePassword',
		handler: AuthController.changePassword,
		preHandler: [authorization]
	})
	fastify.route({
		method: 'POST',
		url: '/ResetPassword',
		handler: AuthController.resetPassword,
	})
}
