import { RefreshTokenId } from './RefreshTokenId';
import { RefreshTokenDatetime } from './RefreshTokenDatetime';
import { UserId } from '../user/UserId';

export class RefreshToken {
  constructor(
    public readonly id: RefreshTokenId,
    public readonly userId: UserId,
    public readonly tokenHash: string,
    public readonly device: string,
    public readonly ip: string,
    public readonly userAgent: string | null,
    public readonly expiresAt: RefreshTokenDatetime,
    public readonly revokedAt: RefreshTokenDatetime | null,
    public readonly isActive: boolean,
    public readonly createdAt: RefreshTokenDatetime,
    public readonly updatedAt: RefreshTokenDatetime,
  ) {
  }

  static create(id: RefreshTokenId, userId: UserId, tokenHash: string, device: string, ip: string, userAgent: string | null, expiresAt: RefreshTokenDatetime): RefreshToken {
    const createdAt = RefreshTokenDatetime.now();
    return new RefreshToken(id, userId, tokenHash, device, ip, userAgent, expiresAt, null, true, createdAt, createdAt);
  }

  static revoke(id: RefreshTokenId, userId: UserId, tokenHash: string, device: string, ip: string, userAgent: string | null, expiresAt: RefreshTokenDatetime, createdAt: RefreshTokenDatetime): RefreshToken {
    const revokedAt = RefreshTokenDatetime.now();
    return new RefreshToken(id, userId, tokenHash, device, ip, userAgent, expiresAt, revokedAt, false, createdAt, revokedAt);
  }

  static update(id: RefreshTokenId, userId: UserId, tokenHash: string, device: string, ip: string, userAgent: string | null, expiresAt: RefreshTokenDatetime, createdAt: RefreshTokenDatetime): RefreshToken {
    const updatedAt = RefreshTokenDatetime.now();
    return new RefreshToken(id, userId, tokenHash, device, ip, userAgent, expiresAt, null, true, createdAt, updatedAt);
  }

  static activate(id: RefreshTokenId, userId: UserId, tokenHash: string, device: string, ip: string, userAgent: string | null, expiresAt: RefreshTokenDatetime, createdAt: RefreshTokenDatetime): RefreshToken {
    const updatedAt = RefreshTokenDatetime.now();
    return new RefreshToken(id, userId, tokenHash, device, ip, userAgent, expiresAt, null, true, createdAt, updatedAt);
  }

  static deactivate(id: RefreshTokenId, userId: UserId, tokenHash: string, device: string, ip: string, userAgent: string | null, expiresAt: RefreshTokenDatetime, createdAt: RefreshTokenDatetime): RefreshToken {
    const updatedAt = RefreshTokenDatetime.now();
    return new RefreshToken(id, userId, tokenHash, device, ip, userAgent, expiresAt, null, false, createdAt, updatedAt);
  }
}