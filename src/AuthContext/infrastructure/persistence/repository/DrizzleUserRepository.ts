import { injectable } from 'inversify';
import { eq } from 'drizzle-orm';
import { User as DomainUser } from '#root/src/AuthContext/domain/user/User.ts';
import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';
import { users } from '../schema/UserSchema.ts';
import { getPostgresConnection } from '#root/src/Shared/infrastructure/persistence/postgresdb/PostgresClientFactory.ts';
import type { UserRepository } from '#root/src/AuthContext/domain/UserRepository.ts';

@injectable()
export class DrizzleUserRepository implements UserRepository {
  private db = getPostgresConnection();

  async save(user: DomainUser): Promise<void> {
    await this.db.insert(users).values({
      id: user.id.value,
      email: user.email,
      password: user.password,
      googleId: user.googleId,
      name: user.name,
      avatar: user.avatar,
      provider: user.provider,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async findByEmail(email: string): Promise<DomainUser | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const user = result[0];

    // TODO: Fix this ñapa de undefined
    return DomainUser.create(
      UserId.fromString(user?.id ?? ''),
      user?.email ?? '',
      user?.password ?? null,
      user?.googleId ?? null,
      user?.name ?? null,
      user?.avatar ?? null,
      user?.provider ?? '',
      user?.createdAt ?? new Date(),
      user?.updatedAt ?? new Date()
    );
  }

  async findByGoogleId(googleId: string): Promise<DomainUser | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.googleId, googleId))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const user = result[0];

    // TODO: Fix this ñapa de undefined
    return DomainUser.create(
      UserId.fromString(user?.id ?? ''),
      user?.email ?? '',
      user?.password ?? null,
      user?.googleId ?? null,
      user?.name ?? null,
      user?.avatar ?? null,
      user?.provider ?? '',
      user?.createdAt ?? new Date(),
      user?.updatedAt ?? new Date()
    );
  }
}