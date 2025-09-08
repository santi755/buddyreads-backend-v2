import { ApplicationError } from "#root/src/Shared/application/errors/ApplicationError";

export class PasswordNotValidError extends ApplicationError {
  readonly code = 'PASSWORD_NOT_VALID';
  readonly statusCode = 401;

  constructor(context?: Record<string, unknown>) {
    super('Password not valid', context);
  }
}