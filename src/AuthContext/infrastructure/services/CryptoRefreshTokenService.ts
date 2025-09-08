import { injectable } from 'inversify';

import crypto from 'crypto';
import argon2 from 'argon2';

import { RefreshTokenService } from '#root/src/AuthContext/domain/services/RefreshTokenService.ts';
import { RefreshToken } from '#root/src/AuthContext/domain/refreshToken/RefreshToken.ts';
import { RefreshTokenId } from '#root/src/AuthContext/domain/refreshToken/RefreshTokenId.ts';
import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';
import { RefreshTokenDatetime } from '#root/src/AuthContext/domain/refreshToken/RefreshTokenDatetime.ts';

@injectable()
export class CryptoRefreshTokenService implements RefreshTokenService {
    private readonly tokenLength: number = 32;
    private readonly expirationDays: number = 30; 

  async generate(userId: string, device: string, ip: string, userAgent: string): Promise<RefreshToken> {
    const tokenValue = this.generateSecureToken();
    const tokenHash = await this.hashToken(tokenValue);
    const expirationDate = this.calculateExpirationDate();
    return new RefreshToken(
        RefreshTokenId.generate(), 
        UserId.fromString(userId), 
        tokenHash, 
        device, 
        ip, 
        userAgent, 
        RefreshTokenDatetime.fromDate(expirationDate), 
        null, 
        true, 
        RefreshTokenDatetime.now(), 
        RefreshTokenDatetime.now()
    );
  }

  async rotate(currentToken: RefreshToken): Promise<RefreshToken> {
    const refreshToken = await argon2.hash(currentToken.userId.value);
    return new RefreshToken(
        RefreshTokenId.generate(), 
        currentToken.userId, 
        refreshToken, 
        currentToken.device, 
        currentToken.ip, 
        currentToken.userAgent, 
        currentToken.expiresAt, 
        null, 
        true,
        currentToken.createdAt, 
        currentToken.updatedAt
    );
  }

  private generateSecureToken(): string {
    // Generar bytes aleatorios criptográficamente seguros
    const buffer = crypto.randomBytes(this.tokenLength);
    // Convertir a base64url (URL-safe)
    return buffer
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private async hashToken(token: string): Promise<string> {
    // Usar argon2 para hashear el token
    return await argon2.hash(token, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16, // 64 MB
      timeCost: 3,         // 3 iteraciones
      parallelism: 1,      // 1 hilo
    });
  }

  private calculateExpirationDate(): Date {
    const now = new Date();
    const expirationDate = new Date(now);
    expirationDate.setDate(now.getDate() + this.expirationDays);
    return expirationDate;
  }
}