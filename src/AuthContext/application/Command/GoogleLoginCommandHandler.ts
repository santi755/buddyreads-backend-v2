import { inject, injectable } from 'inversify';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';
import { GoogleLoginCommand } from '#root/src/AuthContext/application/Command/GoogleLoginCommand.ts';
import { UserRepository } from '#root/src/AuthContext/domain/UserRepository.ts';

@injectable()
export class GoogleLoginCommandHandler {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async handle(command: GoogleLoginCommand): Promise<void> {
    console.log('--- Login with Google ---', command);
  }
}
