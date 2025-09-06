import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '#root/config/env.ts';

// Configuración de conexión
export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: false, // En desarrollo
});

// Instancia de Drizzle
export const db = drizzle(pool);