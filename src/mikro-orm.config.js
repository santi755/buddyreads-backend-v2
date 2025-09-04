const { defineConfig } = require('@mikro-orm/core');
const { PostgreSqlDriver } = require('@mikro-orm/postgresql');

module.exports = defineConfig({
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
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
  },
  cache: {
    enabled: false, // Deshabilitar para evitar problemas
  },
  debug: process.env.NODE_ENV === 'development',
  logger: console.log,
});