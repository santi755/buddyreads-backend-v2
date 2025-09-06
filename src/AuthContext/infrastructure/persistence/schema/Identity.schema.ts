import { pgTable, uuid, varchar, timestamp, text } from 'drizzle-orm/pg-core';
import { users } from './User.schema';

export const identities = pgTable('identities', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  email: varchar('email', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});