import { FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { PresenterFactory } from '~/factory';
import StatusCode from '~/helpers/statusCode';
import parseZodErrors from '~/helpers/zodErros';

class AppError {
	public readonly message: string;

	public readonly statusCode: number;

	constructor(message: string, statusCode: number) {
		this.message = message;
		this.statusCode = statusCode;
	}

	// we should save that error log on somewhere... maybe google cloud logging? 
	public static handleException(error: any, res: FastifyReply) {

		if (error?.response?.data) {
			return res.status(error.statusCode).send(new PresenterFactory(null, false, [error.response?.data]));
		}

		if (error instanceof ZodError) {
			return res.status(StatusCode.BAD_REQUEST).send(new PresenterFactory(null, false, parseZodErrors(error)));
		}
    
		if (error instanceof AppError) {
			return res.status(error.statusCode).send(new PresenterFactory(null, false, [error.message]));
		}

		return res.status(500).send(new PresenterFactory(null, false, [JSON.stringify(error)]));
	}
}

export default AppError;
