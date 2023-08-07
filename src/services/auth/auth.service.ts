import { AuthTypes } from "~/types/auth.types";
import { authValidation } from "~/validations/auth.validation";
import AppError from "~/exceptions/generic.exception";
import StatusCode from "~/helpers/statusCode";
import { decriptPassword } from "~/helpers/password";
import prisma from "../prisma";
import { CreateVerificationService } from "./create-verification.service";

export namespace AuthService {
	export const execute = async (model: AuthTypes.AuthParams) => {
		const { email, password } = await authValidation.parseAsync(model);

		const user = await prisma.users.findFirst({
			where: {
				email: email.toLowerCase(),
				enabled: true,
			}
		})

		if (!user) {
			throw new AppError('EMAIL_OR_PASSWORD_INVALID', StatusCode.BAD_REQUEST);
		}

		const passwordMatches = await decriptPassword(password, user.password);

		if (!passwordMatches) {
			throw new AppError('EMAIL_OR_PASSWORD_INVALID', StatusCode.BAD_REQUEST);
		}

		const uuid = await CreateVerificationService.execute({ value: user.email });

		return {
			uuid
		}
	}
}
