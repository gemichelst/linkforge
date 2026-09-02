import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: any };

let prismaClient: any;
if (globalForPrisma.prisma) {
  prismaClient = globalForPrisma.prisma;
} else {
  try {
    prismaClient = new PrismaClient({ log: ['error', 'warn'] });
  } catch (error) {
    console.warn('[AI Studio] Database not connected — using mock');
    const noOp = { 
      findMany: async () => [], 
      findFirst: async () => null,
      findUnique: async () => null, 
      create: async (d: any) => d?.data ?? {},
      update: async (d: any) => d?.data ?? {}, 
      delete: async () => ({}) 
    };
    prismaClient = new Proxy({}, { get: () => noOp });
  }
}

export const prisma = prismaClient;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;