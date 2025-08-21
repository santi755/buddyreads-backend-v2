import winston from 'winston';
import { injectable } from 'inversify';
import { env } from '#root/config/env.ts';
import { Logger } from '#root/src/Shared/domain/Logger.ts';

@injectable()
export class WinstonLogger implements Logger {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      defaultMeta: { service: 'buddyreads-backend' },
      transports: [
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({
          filename: 'logs/combined.log',
        }),
      ],
    });

    // En desarrollo, también log a consola
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        })
      );
    }
  }

  info(message: string, meta?: Record<string, any>): void {
    this.logger.info(message, meta);
  }

  warn(message: string, meta?: Record<string, any>): void {
    this.logger.warn(message, meta);
  }

  error(message: string, meta?: Record<string, any>): void {
    this.logger.error(message, meta);
  }

  debug(message: string, meta?: Record<string, any>): void {
    this.logger.debug(message, meta);
  }

  logError(error: Error, context?: Record<string, any>): void {
    this.logger.error('Error occurred', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      context,
    });
  }

  logAuth(event: string, userId?: string, extra?: Record<string, any>): void {
    this.logger.info('Auth event', {
      event,
      userId,
      timestamp: new Date().toISOString(),
      ...extra,
    });
  }

  logRequest(
    method: string,
    url: string,
    statusCode: number,
    duration?: number
  ): void {
    this.logger.info('HTTP Request', {
      method,
      url,
      statusCode,
      duration,
      timestamp: new Date().toISOString(),
    });
  }
}
