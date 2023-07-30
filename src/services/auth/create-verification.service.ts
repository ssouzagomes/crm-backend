import { AuthTypes } from "~/types/auth.types";
import { createVerificationValidation } from "~/validations/auth.validation";
import prisma from "../prisma";
import AppError from "~/exceptions/generic.exception";
import StatusCode from "~/helpers/statusCode";
import { anyid } from "anyid";
import { v4 as uuidV4 } from 'uuid';

export namespace CreateVerificationService {
	export const execute = async (model: AuthTypes.CreateVerificationParams) => {
		const { value } = await createVerificationValidation.parseAsync(model);

		const user = await prisma.users.findFirst({
			where: {
				email: value.toLowerCase(),
				enabled: true,
			},
			select: {
				id: true,
				name: true,
				email: true,
			}
		})

		if (!user) {
			throw new AppError('USER_NOT_FOUND', StatusCode.NOT_FOUND);
		}

		const token = anyid().encode('0').length(6).random().id();

		const verification = await prisma.verifications.create({
			data: {
				token,
				uuid: uuidV4(),
				max_attempts: 3,
				status: AuthTypes.VerificationStatus.UNVERIFIED,
				value,
				type: AuthTypes.VerificationTypes.MAIL,
			}
		})

		return verification.uuid;
	}
}
