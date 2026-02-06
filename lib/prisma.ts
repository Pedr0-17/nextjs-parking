// Prisma Client - Configuración para base de datos
// Será iniciado cuando se integre una BD real

// import { PrismaClient } from '@prisma/client';
//
// const globalForPrisma = global as unknown as { prisma: PrismaClient };
//
// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query'],
//   });
//
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Por ahora, retorna un objeto mock para desarrollo
export const prisma = {
  // Métodos mock que serán implementados con BD real
  user: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => null,
    update: async () => null,
    delete: async () => null,
  },
};

