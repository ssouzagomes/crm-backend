export class PresenterFactory<T> {
	public readonly data: T;

	public readonly message?: string[];

	public readonly isValid: boolean;

	constructor(data: T, isValid: boolean, message?: string[]) {
		this.data = data;
		this.message = message;
		this.isValid = isValid;
	}
}
