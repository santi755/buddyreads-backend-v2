import { injectable } from 'inversify';
import { eq } from 'drizzle-orm';
import { User as DomainUser } from '#root/src/AuthContext/domain/user/User.ts';
import { users } from '#root/src/AuthContext/infrastructure/persistence/schema/User.schema.ts';
import { getPostgresConnection } from '#root/src/Shared/infrastructure/persistence/postgresdb/PostgresClientFactory.ts';
import type { UserRepository } from '#root/src/AuthContext/domain/user/UserRepository.ts';
import { UserTransformer } from '#root/src/AuthContext/infrastructure/persistence/transformer/UserTransformer.ts';

@injectable()
export class DrizzleUserRepository implements UserRepository {
  private db = getPostgresConnection();

  async save(user: DomainUser): Promise<void> {
    await this.db.insert(users).values(UserTransformer.toPersistence(user));
  }

  async findByEmail(email: string): Promise<DomainUser | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.primaryEmail, email))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const user = result[0];

    return UserTransformer.toDomain(user);
  }

  async findByGoogleId(googleId: string): Promise<DomainUser | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.primaryEmail, googleId))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const user = result[0];

    return UserTransformer.toDomain(user);
  }
}