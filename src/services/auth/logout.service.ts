import StatusCode from "~/helpers/statusCode";
import prisma from "../prisma"
import AppError from "~/exceptions/generic.exception";
import { SessionService } from "../session.service";

export namespace LogoutService {
	export const execute = async (session_key: string) => {
		const userSession = await prisma.users_sessions.findFirst({
			where: {
				session_key
			}
		})

		if (!userSession) {
			throw new AppError('SESSION_NOT_FOUND', StatusCode.NOT_FOUND);
		}

		await SessionService.destroySession(session_key)

		return { message: 'OK' }
	}
}
