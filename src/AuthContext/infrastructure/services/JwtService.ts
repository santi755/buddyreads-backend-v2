import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { env } from '#root/config/env.ts';
import { User } from '#root/src/AuthContext/domain/user/User';

@injectable()
export class JwtService {
  private readonly secret = env.SESSION_SECRET || 'your-secret-key';

  generateToken(user: User): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        provider: user.provider,
        name: user.name,
        avatar: user.avatar,
      },
      this.secret,
      { expiresIn: '7d' }
    );
  }

  verifyToken(token: string): unknown {
    return jwt.verify(token, this.secret);
  }
}
