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
}
