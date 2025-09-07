import { injectable } from 'inversify';
import { eq } from 'drizzle-orm';
import { getPostgresConnection } from '#root/src/Shared/infrastructure/persistence/postgresdb/PostgresClientFactory.ts';
import { RefreshTokenRepository } from '#root/src/AuthContext/domain/refreshToken/RefreshTokenRepository';
import { refreshTokens } from '../schema/RefreshToken.schema';
import { RefreshTokenTransformer } from '../transformer/RefreshTokenTransformer';
import { RefreshToken } from '#root/src/AuthContext/domain/refreshToken/RefreshToken';

@injectable()
export class DrizzleRefreshTokenRepository implements RefreshTokenRepository {
  private db = getPostgresConnection();

  async save(refreshToken: RefreshToken): Promise<void> {
    await this.db.insert(refreshTokens).values(RefreshTokenTransformer.toPersistence(refreshToken));
  }

  async findByTokenHash(tokenHash: string): Promise<RefreshToken | null> {
    const result = await this.db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.tokenHash, tokenHash))
      .limit(1);
  

  if (result.length === 0) {
        return null;
  }

  const refreshToken = result[0];

  return RefreshTokenTransformer.toDomain(refreshToken);
  
}
}