import { Request, Response, NextFunction } from 'express';
import type { Container } from 'inversify';
import { TYPES } from '#root/src/Shared/infrastructure/dependency-injection/Tokens.ts';
import { Logger } from '#root/src/Shared/domain/Logger.ts';
import { DomainError } from '#root/src/Shared/domain/errors/DomainError.ts';
import { ApplicationError } from '#root/src/Shared/application/errors/ApplicationError.ts';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    provider: string;
  };
}

export function createErrorLoggingMiddleware(container: Container) {
  const logger = container.get<Logger>(TYPES.Logger);

  console.log('--- Le casco el middleware de error 1');

  // ✅ La firma correcta para error middleware: (error, req, res, next)
  return function errorLoggingMiddleware(
    error: Error,
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void {
    console.log('--- Le casco el middleware de error 2');
    // Extraer información relevante del request
    const requestInfo = {
      method: req.method,
      url: req.originalUrl || req.url,
      path: req.path,
      query: req.query,
      params: req.params,
      headers: {
        'user-agent': req.get('User-Agent'),
        'content-type': req.get('Content-Type'),
        authorization: req.get('Authorization')
          ? 'Bearer [REDACTED]'
          : undefined,
        'x-forwarded-for': req.get('X-Forwarded-For'),
        'x-real-ip': req.get('X-Real-IP'),
      },
      ip: req.ip || req.connection.remoteAddress,
      user: req.user
        ? {
            userId: req.user.userId,
            email: req.user.email,
            provider: req.user.provider,
          }
        : undefined,
    };

    // Extraer información del error
    const errorInfo = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      // Información específica según tipo de error
      ...(error instanceof DomainError && {
        code: error.code,
        statusCode: error.statusCode,
        context: error.context,
        errorType: 'domain',
      }),
      ...(error instanceof ApplicationError && {
        code: error.code,
        statusCode: error.statusCode,
        context: error.context,
        errorType: 'application',
      }),
      // Para otros errores
      ...(!(error instanceof DomainError) &&
        !(error instanceof ApplicationError) && {
          errorType: 'system',
        }),
    };

    // Crear el log estructurado
    const logEntry = {
      level: 'error',
      timestamp: new Date().toISOString(),
      service: 'buddyreads-backend',
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',

      // Labels para Loki (flat structure)
      error_type: errorInfo.errorType,
      error_name: error.name,
      error_code: (error as any).code || 'unknown',
      http_method: req.method,
      http_path: req.path,
      http_status: (error as any).statusCode || 500,
      user_id: req.user?.userId || 'anonymous',

      // Datos detallados
      error: errorInfo,
      request: requestInfo,

      // Trace ID para correlación
      trace_id:
        req.headers['x-trace-id'] ||
        `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    // Log del error
    logger.error('HTTP Error', logEntry);

    // ✅ IMPORTANTE: Continuar con el siguiente middleware
    next(error);
  };
}
