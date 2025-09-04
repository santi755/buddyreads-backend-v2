import { defineConfig } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export default defineConfig({
  driver: PostgreSqlDriver,
  dbName: 'buddyreads',
  host: 'postgres',
  port: 5432,
  user: 'postgres',
  password: 'password',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
  // ✅ Configurar cache para evitar problemas de permisos
  cache: {
    enabled: false, // Deshabilitar cache
  },
  // ✅ O configurar cache en directorio con permisos
  // cache: {
  //   adapter: FileCacheAdapter,
  //   options: { cacheDir: '/tmp/mikro-orm-cache' }
  // },
  debug: process.env.NODE_ENV === 'development',
});
