export interface Logger {
  info(message: string, meta?: Record<string, any>): void;
  warn(message: string, meta?: Record<string, any>): void;
  error(message: string, meta?: Record<string, any>): void;
  debug(message: string, meta?: Record<string, any>): void;

  // Métodos específicos para tu dominio
  logError(error: Error, context?: Record<string, any>): void;
  logAuth(event: string, userId?: string, extra?: Record<string, any>): void;
  logRequest(
    method: string,
    url: string,
    statusCode: number,
    duration?: number
  ): void;

  // ✅ Nuevo método para logs estructurados
  logStructured(
    level: string,
    message: string,
    data: Record<string, any>
  ): void;
}
