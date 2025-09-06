import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from "#root/config/env.ts";

let drizzleClient: ReturnType<typeof drizzle> | null = null;
let pool: Pool | null = null;

export function createPostgresConnection() {
  if (!pool) {
    pool = new Pool({
      connectionString: env.DATABASE_URL,
      ssl: false,
    });
  }

  if (!drizzleClient) {
    drizzleClient = drizzle(pool);
  }

  return drizzleClient;
}

export function getPostgresConnection() {
  if (!drizzleClient) {
    throw new Error('PostgreSQL connection not initialized. Call createPostgresConnection() first.');
  }
  return drizzleClient;
}

export async function closePostgresConnection(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
    drizzleClient = null;
  }
}