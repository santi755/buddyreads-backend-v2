import { DataSource } from 'typeorm';
import { env } from '#root/config/env.ts';
import { UserEntity } from '#root/src/AuthContext/infrastructure/persistence/entities/User.entity.ts';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.POSTGRES_HOST || 'postgres',
  port: env.POSTGRES_PORT || 5432,
  username: env.POSTGRES_USER || 'postgres',
  password: env.POSTGRES_PASSWORD || 'password',
  database: env.POSTGRES_DB || 'buddyreads',
  synchronize: false, // ❌ No usar en producción
  logging: env.NODE_ENV === 'development',
  entities: [UserEntity],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
}); 