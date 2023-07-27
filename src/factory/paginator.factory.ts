import { Prisma } from '@prisma/client';

export class PaginatorFactory<T> {
	public readonly query: T;

	public readonly page: number;

	public readonly perPage: number;

	public readonly orderBy?: string;

	public readonly sortOrder?: Prisma.SortOrder;

	constructor(query: T, page: number, perPage: number, orderBy?: string, sortOrder?: Prisma.SortOrder | string) {
		this.query = query;
		this.page = page;
		(this.perPage = perPage), (this.orderBy = orderBy), (this.sortOrder = sortOrder as Prisma.SortOrder);
	}
}
