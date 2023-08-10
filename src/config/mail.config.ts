interface MailConfig {
	transporter: {
		host: string;
		port: number;
		secure: boolean;
		auth: {
			user: string;
			pass: string;
		}
	}
	defaults: {
		from: {
			name: string;
			address: string;
		}
	}
}

export default {
	transporter: {
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT),
		secure: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS
		}
	},
	defaults: {
		from: {
			name: 'CRM',
			address: 'ssouza.gomes10@gmail.com'
		}
	}
} as MailConfig
