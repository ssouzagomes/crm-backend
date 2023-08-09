export interface SendMail {
	to: string;
	subject: string;
	template?: string;
	from?: string;
	keys?: TemplateVariables
}

export interface Variables {
	[key: string]: string | number | object
}

export interface MailProvider {
	sendMail: (data: SendMail) => Promise<void>
}

export interface ParseEmailTemplate {
	file: string;
	variables: TemplateVariables;
}

export interface TemplateVariables {
	[key: string]: string | number | object
}
