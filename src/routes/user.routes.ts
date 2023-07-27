import { FastifyInstance } from "fastify";
import { UserController } from "~/controllers/user.controller";


export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/Register',
    handler: UserController.register
  }),
	fastify.route({
		method: 'GET',
		url: '/:id',
		handler: UserController.getById
	})
	fastify.route({
		method: 'GET',
		url: '/',
		handler: UserController.getAll
	})
	fastify.route({
		method: 'PUT',
		url: '/:id',
		handler: UserController.update,
		// preHandler: [authorization]
	})
	fastify.route({
		method: 'PUT',
		url: '/Disable/:id',
		handler: UserController.disable,
		// preHandler: [authorization]
	})
}
