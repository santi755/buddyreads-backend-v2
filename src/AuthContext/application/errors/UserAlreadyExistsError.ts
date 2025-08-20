import { ApplicationError } from '#root/src/Shared/application/errors/ApplicationError.ts';

export class UserAlreadyExistsError extends ApplicationError {
  readonly code = 'USER_ALREADY_EXISTS';
  readonly statusCode = 400;

  constructor(context?: Record<string, unknown>) {
    super('User already exists', context);
  }
}
