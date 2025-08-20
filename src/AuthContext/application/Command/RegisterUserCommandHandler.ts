import { inject, injectable } from 'inversify';
import type { UserRepository } from '#root/src/AuthContext/domain/UserRepository.ts';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';
import { RegisterUserCommand } from '#root/src/AuthContext/application/Command/RegisterUserCommand.ts';
import { User } from '#root/src/AuthContext/domain/user/User';
import { UserAlreadyExistsError } from '#root/src/AuthContext/application/errors/UserAlreadyExistsError.ts';

@injectable()
export class RegisterUserCommandHandler {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async handle(command: RegisterUserCommand): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(command.email);
    if (existingUser) {
      throw new UserAlreadyExistsError({
        email: command.email,
      });
    }

    const user = User.create(
      command.getUserId(),
      command.email,
      command.password
    );
    await this.userRepository.save(user);
  }
}
