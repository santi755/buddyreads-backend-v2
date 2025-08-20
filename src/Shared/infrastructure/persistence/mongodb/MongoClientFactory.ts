import { env } from '#root/config/env.ts';
import { Db, MongoClient } from 'mongodb';

export async function createMongoConnection(): Promise<Db> {
  const client = new MongoClient(env.MONGODB_URI || '');
  await client.connect();

  console.log('MongoDB Client connected');

  return client.db();
}
