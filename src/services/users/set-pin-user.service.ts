import _ from "lodash";
import { UserTypes } from "../../types/user.types";
import { setPinValidation } from "../../validations/user.validation";
import AppError from "../../exceptions/generic.exception";
import StatusCode from "../../helpers/statusCode";
import prisma from "../prisma";
import { encriptPassword } from "src/helpers/password";
import { CheckIfUserPinIsValidService } from "./check-if-user-pin-is-valid.service";

export namespace SetPinUserService {
	export const execute = async (model: UserTypes.SetPinParams) => {
		const { id, pin, type, newPin } = await setPinValidation.parseAsync(model);

		const user = await prisma.users.findFirst({
			where: {
				id
			}
		})

		if (!user) {
			throw new AppError('USER_NOT_FOUND', StatusCode.NOT_FOUND);
		}

		var setPin = async (uid: number, pin: string) => {
			await prisma.users.update({
				where: {
					id: uid,
				},
				data: {
					pin: encriptPassword(pin),
				},
			});
		}

		if(type !== 'update') {
			if(!user.pin) {
				await setPin(id, pin);
			} else {
				throw new AppError('USER_ALREADY_PIN', StatusCode.BAD_REQUEST)
			}

		} else {
			if(!newPin)	throw new AppError('NEW_PIN_REQUIRED', StatusCode.BAD_REQUEST);
 		 	await CheckIfUserPinIsValidService.execute(user.id, pin);
			await setPin(id, newPin);
		}

		return { message: 'OK' };
	};
}
