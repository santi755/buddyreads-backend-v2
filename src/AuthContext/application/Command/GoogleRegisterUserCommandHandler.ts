import { inject, injectable } from 'inversify';
import { TYPES } from '#root/src/AuthContext/infrastructure/dependency-injection/Tokens.ts';
import { GoogleRegisterUserCommand } from '#root/src/AuthContext/application/Command/GoogleRegisterUserCommand.ts';
import { UserRepository } from '#root/src/AuthContext/domain/user/UserRepository.ts';
import { User } from '#root/src/AuthContext/domain/user/User';
import { UserId } from '#root/src/AuthContext/domain/user/UserId.ts';
import { IdentityRepository } from '#root/src/AuthContext/domain/identity/IdentityRepository.ts';
import { Identity } from '#root/src/AuthContext/domain/identity/Identity.ts';
import { UserDatetime } from '#root/src/AuthContext/domain/user/UserDatetime.ts';
import { UserEmail } from '#root/src/AuthContext/domain/user/UserEmail.ts';
import { IdentityProvider } from '#root/src/AuthContext/domain/identity/IdentityProvider.ts';
import { IdentityId } from '#root/src/AuthContext/domain/identity/IdentityId.ts';
import { EmailAlreadyRegisteredError } from '#root/src/AuthContext/application/errors/EmailAlreadyRegisteredError.ts';
import { IdentityEmail } from '#root/src/AuthContext/domain/identity/IdentityEmail.ts';

@injectable()
export class GoogleRegisterUserCommandHandler {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository,
    @inject(TYPES.IdentityRepository)
    private readonly identityRepository: IdentityRepository
  ) {}

  async handle(command: GoogleRegisterUserCommand): Promise<User> {
    const existingIdentity = await this.identityRepository.findByGoogleId(command.googleId);
    if (existingIdentity) {
      await this.updateLastUsedAt(existingIdentity);

      const user = await this.userRepository.findById(existingIdentity.userId.value);
      if (!user) {
        throw new Error('User not found for existing identity');
      }
      return user;
    }

    const existingEmailIdentity = await this.identityRepository.findByEmail(command.getEmail());
    if (existingEmailIdentity) {
      throw new EmailAlreadyRegisteredError({
        email: command.email,
      });
    }

    const user = await this.getOrCreateUser(command);

    const identity = Identity.createFromGoogle(
      IdentityId.generate(),
      user.id,
      command.getEmail(),
      IdentityProvider.fromProvider('google'),
      command.googleId
    );

    await this.identityRepository.save(identity);

    return user;
  }

  private async updateLastUsedAt(identity: Identity): Promise<void> {
    identity = identity.updateLastUsed();
    await this.identityRepository.update(identity);
  }

  private async getOrCreateUser(command: GoogleRegisterUserCommand): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(command.getEmail());
    if (existingUser) {
      return existingUser;
    }

    const user = User.create(
      UserId.generate(),
      command.name,
      command.avatar,
      command.getEmail(),
      [],
      true,
      false,
      null,
      UserDatetime.now(),
      UserDatetime.now(),
    );

    await this.userRepository.save(user);

    return user;
  }
}
