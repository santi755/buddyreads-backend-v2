import { RefreshTokenId } from './RefreshTokenId';
import { RefreshTokenDatetime } from './RefreshTokenDatetime';
import { UserId } from './UserId';

export class RefreshToken {
  constructor(
    public readonly id: RefreshTokenId,
    public readonly userId: UserId,
    public readonly tokenHash: string,
    public readonly device: string,
    public readonly ip: string,
    public readonly expiresAt: RefreshTokenDatetime,
    public readonly revokedAt: RefreshTokenDatetime | null,
    public readonly createdAt: RefreshTokenDatetime,
  ) {
  }

  static create(id: RefreshTokenId, userId: UserId, tokenHash: string, device: string, ip: string, expiresAt: RefreshTokenDatetime): RefreshToken {
    const createdAt = RefreshTokenDatetime.now();
    return new RefreshToken(id, userId, tokenHash, device, ip, expiresAt, null, createdAt);
  }

  static revoke(id: RefreshTokenId, userId: UserId, tokenHash: string, device: string, ip: string, expiresAt: RefreshTokenDatetime, createdAt: RefreshTokenDatetime): RefreshToken {
    const revokedAt = RefreshTokenDatetime.now();
    return new RefreshToken(id, userId, tokenHash, device, ip, expiresAt, revokedAt, createdAt);
  }
}