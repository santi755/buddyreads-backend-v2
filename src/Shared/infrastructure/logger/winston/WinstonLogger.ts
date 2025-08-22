import winston from 'winston';
import { injectable } from 'inversify';
import { env } from '#root/config/env.ts';
import { Logger } from '#root/src/Shared/domain/Logger.ts';

@injectable()
export class WinstonLogger implements Logger {
  private readonly logger: winston.Logger;

  constructor() {
    // Formato específico para Loki
    const lokiFormat = winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json(),
      winston.format.printf((info) => {
        // Asegurar que todos los campos estén en el nivel raíz para Loki
        const logEntry = {
          timestamp: info.timestamp,
          level: info.level,
          service: info.service || 'buddyreads-backend',
          environment: process.env.NODE_ENV || 'development',
          message: info.message,
          ...info,
        };

        return JSON.stringify(logEntry);
      })
    );
    this.logger = winston.createLogger({
      level: env.LOG_LEVEL || 'info',
      format: lokiFormat,
      defaultMeta: {
        service: 'buddyreads-backend',
        version: process.env.npm_package_version || '1.0.0',
      },
      transports: [
        // ✅ Archivo específico para errores (para Loki)
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        // ✅ Archivo para todos los logs
        new winston.transports.File({
          filename: 'logs/combined.log',
        }),
        // ✅ Archivo específico para access logs
        new winston.transports.File({
          filename: 'logs/access.log',
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.printf((info) => {
              // Solo logs HTTP
              if (info.message === 'HTTP Request' || info.http_method) {
                return JSON.stringify({
                  timestamp: info.timestamp,
                  level: info.level,
                  service: 'buddyreads-backend',
                  log_type: 'access',
                  ...info,
                });
              }
              return ''; // No escribir otros logs en access.log
            })
          ),
        }),
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'HH:mm:ss' }),
            winston.format.printf(({ timestamp, level, message, ...meta }) => {
              const metaStr = Object.keys(meta).length
                ? `\n${JSON.stringify(meta, null, 2)}`
                : '';
              return `${timestamp} [${level}]: ${message}${metaStr}`;
            })
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

  logStructured(
    level: string,
    message: string,
    data: Record<string, any>
  ): void {
    this.logger.log(level, message, {
      ...data,
      timestamp: new Date().toISOString(),
      log_type: 'structured',
    });
  }
}
