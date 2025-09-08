import { RefreshToken } from "../refreshToken/RefreshToken";

export interface RefreshTokenService {
    generate(userId: string, device: string, ip: string, userAgent: string): Promise<RefreshToken>;
    rotate(currentToken: RefreshToken): Promise<RefreshToken>;
  }