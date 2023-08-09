import fs from 'fs'
import handlebars from 'handlebars'
import { ParseEmailTemplate } from '../types'

interface MailTemplateProvider {
	parse(data: ParseEmailTemplate): Promise<string>
}

export const handlebarsProvider = ((): MailTemplateProvider => {
	const parse = async ({ file, variables }: ParseEmailTemplate) => {
		const templateFileContent = await fs.promises.readFile(file, {
			encoding: 'utf-8'
		})

		const parseTemplate = handlebars.compile(templateFileContent)

		return parseTemplate(variables)
	}

	return { parse }
})()
