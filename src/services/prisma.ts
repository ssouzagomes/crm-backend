import { PrismaClient } from '@prisma/client';

// add prisma to the NodeJS global type
const prisma = new PrismaClient();

export * from '@prisma/client';

export default prisma;
