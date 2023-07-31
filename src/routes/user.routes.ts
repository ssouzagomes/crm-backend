import { FastifyInstance } from "fastify";
import { UserController } from "~/controllers/user.controller";
import { authorization } from "~/middlewares/authorization.middleware";


export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/Register',
    handler: UserController.register,
		preHandler: [authorization]
  }),
	fastify.route({
		method: 'GET',
		url: '/:id',
		handler: UserController.getById,
		preHandler: [authorization]
	})
	fastify.route({
		method: 'GET',
		url: '/',
		handler: UserController.getAll,
		preHandler: [authorization]
	})
	fastify.route({
		method: 'PUT',
		url: '/:id',
		handler: UserController.update,
		preHandler: [authorization]
	})
	fastify.route({
		method: 'PUT',
		url: '/Disable/:id',
		handler: UserController.disable,
		preHandler: [authorization]
	})
}
