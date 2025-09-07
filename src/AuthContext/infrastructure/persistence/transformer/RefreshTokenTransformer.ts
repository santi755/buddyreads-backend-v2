import { RefreshToken } from '#root/src/AuthContext/domain/refreshToken/RefreshToken';
import { RefreshTokenId } from '#root/src/AuthContext/domain/refreshToken/RefreshTokenId';
import { RefreshTokenDatetime } from '#root/src/AuthContext/domain/refreshToken/RefreshTokenDatetime';
import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';

export class RefreshTokenTransformer {
  static toDomain(refreshToken: any): RefreshToken {
    return new RefreshToken(
      RefreshTokenId.fromString(refreshToken.id),
      UserId.fromString(refreshToken.userId),
      refreshToken.tokenHash,
      refreshToken.device,
      refreshToken.ip,
      refreshToken.userAgent,
      RefreshTokenDatetime.fromDate(new Date(refreshToken.expiresAt)),
      refreshToken.revokedAt ? RefreshTokenDatetime.fromDate(new Date(refreshToken.revokedAt)) : null,
      refreshToken.isActive,
      RefreshTokenDatetime.fromDate(new Date(refreshToken.createdAt)),
      RefreshTokenDatetime.fromDate(new Date(refreshToken.updatedAt))
    );
  }

  static toPersistence(refreshToken: RefreshToken): any {
    return {
      id: refreshToken.id.value,
      userId: refreshToken.userId.value,
      tokenHash: refreshToken.tokenHash,
      device: refreshToken.device,
      ip: refreshToken.ip,
      userAgent: refreshToken.userAgent,
      expiresAt: refreshToken.expiresAt.value,
      revokedAt: refreshToken.revokedAt?.value || null,
      isActive: refreshToken.isActive,
      createdAt: refreshToken.createdAt.value,
      updatedAt: refreshToken.updatedAt.value,
    };
  }
}