import { injectable } from 'inversify';
import { eq } from 'drizzle-orm';
import { getPostgresConnection } from '#root/src/Shared/infrastructure/persistence/postgresdb/PostgresClientFactory.ts';
import { IdentityRepository } from '#root/src/AuthContext/domain/identity/IdentityRepository';
import { IdentityTransformer } from '../transformer/IdentityTransformer';
import { identities } from '../schema/Identity.schema';
import { Identity } from '#root/src/AuthContext/domain/identity/Identity';

@injectable()
export class DrizzleIdentityRepository implements IdentityRepository {
  private db = getPostgresConnection();

  async save(identity: Identity): Promise<void> {
    await this.db.insert(identities).values(IdentityTransformer.toPersistence(identity));
  }

  async findByEmail(email: string): Promise<Identity | null> {
    const result = await this.db
      .select()
      .from(identities)
      .where(eq(identities.email, email))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const identity = result[0];

    return IdentityTransformer.toDomain(identity);
  }

  async findByGoogleId(googleId: string): Promise<Identity | null> {
    const result = await this.db
      .select()
      .from(identities)
      .where(eq(identities.providerId, googleId))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const identity = result[0];

    return IdentityTransformer.toDomain(identity);
  }
}