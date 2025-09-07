import { pgTable, uuid, varchar, timestamp, text, boolean, index } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }),
  avatar: text('avatar'),
  primaryEmail: varchar('primary_email', { length: 255 }).notNull().unique(), 
  isActive: boolean('is_active').notNull().default(true), 
  isEmailVerified: boolean('is_email_verified').notNull().default(false), 
  lastLoginAt: timestamp('last_login_at'), 
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  primaryEmailIdx: index('users_primary_email_idx').on(table.primaryEmail),
  isActiveIdx: index('users_is_active_idx').on(table.isActive),
  lastLoginAtIdx: index('users_last_login_at_idx').on(table.lastLoginAt),
}));