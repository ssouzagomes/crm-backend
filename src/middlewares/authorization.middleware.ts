import { users_sessions } from "@prisma/client";
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import AppError from "~/exceptions/generic.exception";
import StatusCode from "~/helpers/statusCode";
import { SessionService } from "~/services/session.service";

export const authorization = async (request: FastifyRequest, _: FastifyReply, next: HookHandlerDoneFunction): Promise<void> => {
	const authHeader = request.headers.authorization;
	const lastLocation = request.headers['x-location'];

	if (!authHeader) {
		throw new AppError('MISSING_TOKEN', StatusCode.UNAUTHORIZED);
	}

	try {
		const sess: users_sessions | null = await SessionService.isValid(authHeader, String(lastLocation));

		if (!sess) {
			throw new AppError('INVALID_SESSION', StatusCode.UNAUTHORIZED);
		}

		(request as any).user = {
			id: sess.user_id
		};
	} catch (error) {
		throw new AppError("INVALID_SESSION", StatusCode.UNAUTHORIZED);
	}
}
