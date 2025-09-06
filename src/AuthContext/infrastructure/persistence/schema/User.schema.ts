import { pgTable, uuid, varchar, timestamp, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password'),
  googleId: varchar('google_id', { length: 255 }).unique(),
  name: varchar('name', { length: 255 }),
  avatar: text('avatar'),
  provider: varchar('provider', { length: 50 }).notNull().default('local'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});