import nodemailer from 'nodemailer';
import { MailProvider, ParseEmailTemplate, SendMail } from './types';
import mailConfig from '~/config/mail.config';
import path from 'path';
import { handlebarsProvider } from './config/handlebars';

export const mailProvider = ((): MailProvider => {
	const sendMail = async ({ to, subject, template, keys }: SendMail) => {
		const transporter = nodemailer.createTransport(mailConfig.transporter)
		const mailData: any = {
			to,
			subject,
			from: mailConfig.defaults.from,
		}

		const view = path.resolve('views', `${template}.hbs`)

		const mailOptions = {
			mailData,
			year: new Date().getFullYear(),
		}

		keys = {
			...keys,
			mailOptions
		}

		const templateData: ParseEmailTemplate = {
			file: view,
			variables: keys
		}

		mailData.html = await handlebarsProvider.parse(templateData)

		await transporter
			.sendMail(mailData)
			.then((r) => {})
			.catch((err) => {
				console.log({ err })
			})
	}

	return { sendMail }
})()
