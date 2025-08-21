import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import passport from 'passport';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';
import { JwtService } from '#root/src/AuthContext/infrastructure/services/JwtService.ts';

@injectable()
export class GoogleAuthController {
  constructor(
    @inject(TYPES.JwtService)
    private readonly jwtService: JwtService
  ) {}

  async login(req: Request, res: Response) {
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })(req, res);
  }

  async callback(req: Request, res: Response) {
    passport.authenticate(
      'google',
      { session: false },
      (err: any, user: any) => {
        if (err) {
          return res.status(400).json({
            success: false,
            error: err.message,
          });
        }

        if (!user) {
          return res.status(400).json({
            success: false,
            error: 'Authentication failed',
          });
        }

        const token = this.jwtService.generateToken(user);

        res.json({
          success: true,
          token,
          user,
        });
      }
    )(req, res);
  }
}
