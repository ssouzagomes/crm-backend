import { Prisma } from "@prisma/client";
import { PaginatorFactory } from "~/factory/paginator.factory";
import { UserTypes } from "~/types/user.types";
import prisma from "../prisma";
import { PaginationFactory } from "~/factory";

export namespace GetAllUsersService {
	export const execute = async (paginator: PaginatorFactory<UserTypes.Filters>) => {
		const { page, perPage, query, orderBy, sortOrder } = paginator

		const order: Prisma.Enumerable<Prisma.usersOrderByWithRelationInput> = {}

		switch (orderBy) {
			case 'created_at':
				order.created_at = sortOrder
		}

		const [items, total] = await Promise.all([
			prisma.users.findMany({
				where: {
					enabled: (query?.enabled !== null && query?.enabled !== undefined) ? query.enabled === 'true' : undefined,
					name: query?.name ? { contains: query.name } : undefined,
					email: query?.email ? { contains: query.email } : undefined
				},
				select: {
					id: true,
					name: true,
					email: true,
					first_login: true,
					permission: true,
					team: true,
				},
				orderBy: { ...order },
				skip: (page - 1) * perPage,
				take: perPage
			}),
			prisma.users.count({
				where: {
					enabled: (query?.enabled !== null && query?.enabled !== undefined) ? query.enabled === 'true' : undefined,
					name: query?.name ? { contains: query.name } : undefined,
					email: query?.email ? { contains: query.email } : undefined
				}
			})
		])

		return new PaginationFactory(items, page, perPage, total)
	}
}
