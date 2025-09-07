import { pgTable, uuid, varchar, timestamp, text, boolean, index, unique } from 'drizzle-orm/pg-core';

import { users } from './User.schema';

export const identities = pgTable('identities', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  provider: varchar('provider', { length: 50 }).notNull(),
  providerId: varchar('provider_id', { length: 255 }),
  password: text('password'),
  isVerified: boolean('is_verified').notNull().default(false),
  isPrimary: boolean('is_primary').notNull().default(false),
  lastUsedAt: timestamp('last_used_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('identities_user_id_idx').on(table.userId),
  emailIdx: index('identities_email_idx').on(table.email),
  providerIdx: index('identities_provider_idx').on(table.provider),
  providerIdIdx: index('identities_provider_id_idx').on(table.providerId),
  
  emailProviderUnique: unique('identities_email_provider_unique').on(table.email, table.provider),
  userProviderUnique: unique('identities_user_provider_unique').on(table.userId, table.provider),
}));