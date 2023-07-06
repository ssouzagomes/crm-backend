import { Permission } from '@prisma/client'

declare module 'fastify' {
  export interface FastifyRequest {
    user: {
      id: number
    }
  }
}