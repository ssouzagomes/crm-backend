export class PresenterFactory<T> {
	public readonly result: T;

	public readonly message?: string[];

	public readonly isValid: boolean;

	constructor(result: T, isValid: boolean, message?: string[]) {
		this.result = result;
		this.message = message;
		this.isValid = isValid;
	}
}
