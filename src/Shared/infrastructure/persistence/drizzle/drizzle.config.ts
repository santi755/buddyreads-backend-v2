import { defineConfig } from 'drizzle-kit';
import { env } from '#root/config/env.ts';

export default defineConfig({
  schema: './src/**/*.schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
});