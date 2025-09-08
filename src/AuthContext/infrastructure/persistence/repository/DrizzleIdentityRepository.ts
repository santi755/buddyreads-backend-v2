import { injectable } from 'inversify';
import { and, eq } from 'drizzle-orm';
import { getPostgresConnection } from '#root/src/Shared/infrastructure/persistence/postgresdb/PostgresClientFactory.ts';
import { IdentityRepository } from '#root/src/AuthContext/domain/identity/IdentityRepository';
import { IdentityTransformer } from '../transformer/IdentityTransformer';
import { identities } from '../schema/Identity.schema';
import { Identity } from '#root/src/AuthContext/domain/identity/Identity';
import { IdentityProvider } from '#root/src/AuthContext/domain/identity/IdentityProvider';
import { IdentityEmail } from '#root/src/AuthContext/domain/identity/IdentityEmail.ts';

@injectable()
export class DrizzleIdentityRepository implements IdentityRepository {
  private db = getPostgresConnection();

  async save(identity: Identity): Promise<void> {
    await this.db.insert(identities).values(IdentityTransformer.toPersistence(identity));
  }

  async update(identity: Identity): Promise<void> {
    await this.db.update(identities).set(IdentityTransformer.toPersistence(identity)).where(eq(identities.id, identity.id.value));
  }

  async findByEmail(email: IdentityEmail): Promise<Identity | null> {
    const result = await this.db
      .select()
      .from(identities)
      .where(eq(identities.email, email.value))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const identity = result[0];

    return IdentityTransformer.toDomain(identity);
  }

  async findByGoogleId(googleId: string): Promise<Identity | null> {
    const provider = IdentityProvider.fromProvider('google');
    const result = await this.db
      .select()
      .from(identities)
      .where(
        and(
          eq(identities.providerId, googleId),
          eq(identities.provider, provider.value)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const identity = result[0];

    return IdentityTransformer.toDomain(identity);
  }
}