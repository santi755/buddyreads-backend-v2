import { pgTable, uuid, varchar, timestamp, text, boolean } from 'drizzle-orm/pg-core';
import { users } from './User.schema';

export const refreshTokens = pgTable('refresh_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' }) 
    .notNull(), 
  tokenHash: varchar('token_hash', { length: 255 }).notNull().unique(),
  device: varchar('device', { length: 255 }).notNull(),
  ip: varchar('ip', { length: 45 }).notNull(),
  userAgent: text('user_agent'),
  expiresAt: timestamp('expires_at').notNull(),
  revokedAt: timestamp('revoked_at'),
  isActive: boolean('is_active').notNull().default(true), 
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(), 
});