import { ApplicationError } from "#root/src/Shared/application/errors/ApplicationError.ts";

export class IdentityAlreadyExistsError extends ApplicationError {
  readonly code = 'IDENTITY_ALREADY_EXISTS';
  readonly statusCode = 400;

  constructor(context?: Record<string, unknown>) {
    super('Identity already exists', context);
  }
}
