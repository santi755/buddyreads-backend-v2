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
    console.log('🔐 Iniciando autenticación con Google...');
    console.log(
      '🔗 URL base del servidor:',
      `${req.protocol}://${req.get('host')}`
    );

    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })(req, res);
  }

  async callback(req: Request, res: Response) {
    console.log('📥 Callback de Google recibido');
    passport.authenticate(
      'google',
      { session: false },
      (err: any, user: any) => {
        if (err) {
          console.error('❌ Error en callback:', err);
          return res.status(400).json({
            success: false,
            error: err.message,
          });
        }

        if (!user) {
          console.error('❌ No se recibió usuario');
          return res.status(400).json({
            success: false,
            error: 'Authentication failed',
          });
        }

        console.log('✅ Usuario autenticado:', user);
        const token = this.jwtService.generateToken(user);

        // Para desarrollo, devolver JSON en lugar de redirect
        res.json({
          success: true,
          token,
          user: {
            id: user.id.value,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            provider: user.provider,
          },
        });
      }
    )(req, res);
  }
}
