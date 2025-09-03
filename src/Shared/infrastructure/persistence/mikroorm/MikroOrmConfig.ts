import { defineConfig } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { env } from '#root/config/env.ts';

const mikroOrmConfig = defineConfig({
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
  seeder: {
    path: 'dist/seeders',
    pathTs: 'src/seeders',
  },
  debug: env.NODE_ENV === 'development',
  logger: (message) => console.log(message),
});

export default mikroOrmConfig;
