import { inject, injectable } from 'inversify';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';
import { GoogleLoginCommand } from '#root/src/AuthContext/application/Command/GoogleLoginCommand.ts';
import { UserRepository } from '#root/src/AuthContext/domain/UserRepository.ts';
import { User } from '#root/src/AuthContext/domain/user/User';
import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';

@injectable()
export class GoogleLoginCommandHandler {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async handle(command: GoogleLoginCommand): Promise<User> {
    let user = await this.userRepository.findByGoogleId(command.googleId);

    console.log('--- Antes de petar');
    throw new Error('test');

    if (user) {
      return user;
    }

    user = await this.userRepository.findByEmail(command.email);

    if (user) {
      return user;
    }

    user = User.createFromGoogle(
      UserId.generate(),
      command.email,
      command.googleId,
      command.name,
      command.avatar
    );

    await this.userRepository.save(user);

    return user;
  }
}
