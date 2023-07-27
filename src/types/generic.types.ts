import { z } from "zod";
import { idValidation } from "~/validations/generic.validation";

export namespace GenericTypes {
	export type id = z.infer<typeof idValidation>
	export type PaginatorParams<T> = {
		filter: T;
		page: string | number;
		perPage: string | number;
		orderBy: string;
		sortOrder: 'asc' | 'desc';
	}
}
