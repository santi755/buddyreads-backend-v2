import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env['NODE_ENV'] || 'development',
  PORT: process.env['PORT'],
  MONGODB_URI: process.env['MONGODB_URI'],
  GOOGLE_CLIENT_ID: process.env['GOOGLE_CLIENT_ID'],
  GOOGLE_CLIENT_SECRET: process.env['GOOGLE_CLIENT_SECRET'],
  GOOGLE_CALLBACK_URL: process.env['GOOGLE_CALLBACK_URL'],
  SESSION_SECRET: process.env['SESSION_SECRET'],
  LOG_LEVEL: process.env['LOG_LEVEL'],
  POSTGRES_HOST: process.env['POSTGRES_HOST'],
  POSTGRES_PORT: process.env['POSTGRES_PORT'] ? parseInt(process.env['POSTGRES_PORT']) : undefined,
  POSTGRES_DB: process.env['POSTGRES_DB'],
  POSTGRES_USER: process.env['POSTGRES_USER'],
  POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD'],
  POSTGRES_URI: process.env['POSTGRES_URI'],
  DATABASE_URL: process.env['DATABASE_URL'],
};
