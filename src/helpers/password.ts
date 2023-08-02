import bcrypt from 'bcryptjs';
import generator from 'generate-password';

export const encriptPassword = (password: string) => bcrypt.hashSync(password, 13);

export const decriptPassword = async (password: string, to_compare: string): Promise<Boolean> => await bcrypt.compare(password, to_compare);

export const validatePassword = (password: string) => {
	const rgx = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
	return rgx.test(password);
};

export const generatePassword = (): string => {
	return generator.generate({
		length: 14,
		numbers: true,
	});
};
