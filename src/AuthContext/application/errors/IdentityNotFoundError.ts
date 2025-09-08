import { ApplicationError } from "#root/src/Shared/application/errors/ApplicationError.ts";

export class IdentityNotFoundError extends ApplicationError {
  readonly code = 'IDENTITY_NOT_FOUND';
  readonly statusCode = 404;

  constructor(context?: Record<string, unknown>) {
    super('Identity not found', context);
  }
}