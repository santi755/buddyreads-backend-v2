import { ApplicationError } from "#root/src/Shared/application/errors/ApplicationError.ts";

export class UserNotFoundError extends ApplicationError {
  readonly code = 'USER_NOT_FOUND';
  readonly statusCode = 404;

  constructor(userId: string) {
    super(`User with id ${userId} not found`);
  }
}