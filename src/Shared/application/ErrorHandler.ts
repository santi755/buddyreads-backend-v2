import type { Request, Response, NextFunction } from 'express';
import { DomainError } from '#root/src/Shared/domain/errors/DomainError.ts';
import { ApplicationError } from '#root/src/Shared/application/errors/ApplicationError.ts';
import { ZodError, ZodIssue } from 'zod';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('🔥 Error caught by handler:', error);

  console.log('--- DomainError ---', error instanceof DomainError || error instanceof ApplicationError);

  // Errores de dominio y aplicación
  if (error instanceof DomainError || error instanceof ApplicationError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        context: error.context,
      },
    });
  }

  console.log('--- ZodError ---', error instanceof ZodError);

  // Errores de validación Zod
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: error.issues.map((err: ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      },
    });
  }

  return res.status(400).json({
    success: false,
    error: {
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      details: error.issues.map((err: ZodIssue) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    },
  });
}

/*
  // Error no controlado (ESTO SE DEJA AL FINAL)
  console.error('❌ Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error',
    },
  });
}
*/