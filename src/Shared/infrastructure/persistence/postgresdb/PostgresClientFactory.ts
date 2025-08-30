import { env } from "#root/config/env.ts";
import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient | null = null;

export function createPostgresConnection(): PrismaClient {
  if (!prismaClient) {
    prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: env.POSTGRES_DB,
          user: env.POSTGRES_USER,
          password: env.POSTGRES_PASSWORD,
        },
      },
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  return prismaClient;
}

export function getPostgresConnection(): PrismaClient {
  if (!prismaClient) {
    throw new Error('PostgreSQL connection not initialized. Call createPostgresConnection() first.');
  }
  return prismaClient;
}

export async function closePostgresConnection(): Promise<void> {
  if (prismaClient) {
    await prismaClient.$disconnect();
    prismaClient = null;
  }
}