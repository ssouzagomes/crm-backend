export class PaginationFactory<T> {
	public readonly items: T[];

	public readonly page: number;

	public readonly perPage: number;

	public readonly total: number;

	public readonly totalPages: number;

	constructor(items: T[], page: number, perPage: number, total: number) {
		this.items = items;
		this.page = page;
		this.perPage = perPage;
		this.total = total;
		this.totalPages = total > perPage ? Math.ceil(total / perPage) : 1;
	}
}
