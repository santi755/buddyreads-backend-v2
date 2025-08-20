import { ApplicationError } from '#root/src/Shared/application/errors/ApplicationError.ts';

export class UserIdAlreadyExistsError extends ApplicationError {
  readonly code = 'USER_ID_ALREADY_EXISTS';
  readonly statusCode = 400;

  constructor(context?: Record<string, unknown>) {
    super('User ID already exists', context);
  }
}
