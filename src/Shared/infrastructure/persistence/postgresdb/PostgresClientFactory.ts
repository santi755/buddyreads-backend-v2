import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from '#root/src/mikro-orm.config.ts';

let mikroOrm: MikroORM | null = null;

export async function createPostgresConnection(): Promise<MikroORM> {
  if (!mikroOrm) {
    mikroOrm = await MikroORM.init(mikroOrmConfig);
  }

  return mikroOrm;
}

export function getPostgresConnection(): MikroORM {
  if (!mikroOrm) {
    throw new Error(
      'PostgreSQL connection not initialized. Call createPostgresConnection() first.'
    );
  }
  return mikroOrm;
}

export async function closePostgresConnection(): Promise<void> {
  if (mikroOrm) {
    await mikroOrm.close();
    mikroOrm = null;
  }
}

export async function runMigrations(): Promise<void> {
  const orm = await createPostgresConnection();
  await orm.getMigrator().up();
}
