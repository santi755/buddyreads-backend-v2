import { ApplicationError } from "#root/src/Shared/application/errors/ApplicationError";

export class EmailAlreadyRegisteredError extends ApplicationError {
  readonly code = 'EMAIL_ALREADY_REGISTERED';
  readonly statusCode = 400;

  constructor(context?: Record<string, unknown>) {
    super('Email already registered', context);
  }
}