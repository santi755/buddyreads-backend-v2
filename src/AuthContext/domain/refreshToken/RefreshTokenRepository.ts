import { RefreshToken } from "./RefreshToken";

export interface RefreshTokenRepository {
  save(refreshToken: RefreshToken): Promise<void>;
  findByTokenHash(tokenHash: string): Promise<RefreshToken | null>;
}