import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import AppError from "~/exceptions/generic.exception";
import StatusCode from "~/helpers/statusCode";

export const authorization = async (request: FastifyRequest, _: FastifyReply, next: HookHandlerDoneFunction): Promise<void> => {
	const authHeader = request.headers.authorization;
	const lastLocation = request.headers['x-location'];

	if (!authHeader) {
		throw new AppError('MISSING_TOKEN', StatusCode.UNAUTHORIZED);
	}

	try {
		// const session: users_sessions | null = await session

	} catch (error) {

	}
}
