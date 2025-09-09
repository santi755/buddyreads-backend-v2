import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { RequestContextService } from '#root/src/Shared/domain/services/RequestContextService.ts';
import { TYPES } from '#root/src/Shared/infrastructure/dependency-injection/Tokens.ts';
import { Uuid } from '#root/src/Shared/domain/value-object/Uuid.ts';

@injectable()
export class RequestContextMiddleware {
  constructor(
    @inject(TYPES.RequestContextService)
    private readonly requestContextService: RequestContextService
  ) {}

  extractContext = (req: Request, res: Response, next: NextFunction) => {
    const ip = this.extractIp(req);
    const userAgent = req.get('User-Agent') || null;
    const device = this.extractDevice(userAgent);

    const context = {
      ip,
      userAgent,
      device,
      timestamp: new Date(),
      requestId: Uuid.generate().value // TODO: Check if using this Uuid follws ddd best practices
    };

    if (process.env.NODE_ENV === 'development') {
      console.log(`🔧 Request ${context.requestId} - Contexto:`, context);
    }

    RequestContextService.runWithContext(context, () => {
      next();
    });
  };

  private extractIp(req: Request): string {
    return req.ip || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress ||
           (req.connection as any).socket?.remoteAddress ||
           '127.0.0.1';
  }

  private extractDevice(userAgent: string | null): string {
    if (!userAgent) return 'Unknown';
    
    if (userAgent.includes('Mobile')) return 'Mobile';
    if (userAgent.includes('Tablet')) return 'Tablet';
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'Mac';
    if (userAgent.includes('Linux')) return 'Linux';
    
    return 'Desktop';
  }
}
