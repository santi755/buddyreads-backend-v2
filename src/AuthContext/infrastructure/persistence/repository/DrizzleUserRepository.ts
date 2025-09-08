import { injectable } from 'inversify';
import { eq } from 'drizzle-orm';
import { User as DomainUser } from '#root/src/AuthContext/domain/user/User.ts';
import { users } from '#root/src/AuthContext/infrastructure/persistence/schema/User.schema.ts';
import { getPostgresConnection } from '#root/src/Shared/infrastructure/persistence/postgresdb/PostgresClientFactory.ts';
import type { UserRepository } from '#root/src/AuthContext/domain/user/UserRepository.ts';
import { UserTransformer } from '#root/src/AuthContext/infrastructure/persistence/transformer/UserTransformer.ts';
import { UserEmail } from '#root/src/AuthContext/domain/user/UserEmail';

@injectable()
export class DrizzleUserRepository implements UserRepository {
  private db = getPostgresConnection();

  async save(user: DomainUser): Promise<void> {
    await this.db.insert(users).values(UserTransformer.toPersistence(user));
  }

  async findById(id: string): Promise<DomainUser | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const user = result[0];

    return UserTransformer.toDomain(user);
  }

  async findByEmail(email: UserEmail): Promise<DomainUser | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.primaryEmail, email.value))
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